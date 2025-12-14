import { Hono } from "hono";
import { WebSocketServer, type WebSocket } from "ws";
import { createAdaptorServer } from "@hono/node-server";
import type { Server } from "http";
import { pendingToolCalls } from "./lib/executeTool"
import { cors } from "hono/cors";
import { stepCountIs, streamText, smoothStream } from "ai";
import { SYSTEM_PROMPT } from "./lib/prompt";
import { tools } from "./tools/tools";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const app = new Hono();
app.use("/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"],
  exposeHeaders: ["Content-Type"],
}));

interface KaiAgentContext {
  content: string;
  prompt: string;
  options?: {
    model?: string;
    temperature?: number;
  };
}


export const rpcConnections = new Map<string, WebSocket>();

app.get("/", (c) => c.text("Hello grab-agent"));


app.get("/health", (c) => {
  return c.json({ status: "ok", timestamp: Date.now() });
});

app.post("/agent", async (context) => {
  try {
    const body = await context.req.json<KaiAgentContext>();
    const { content, prompt, options } = body;
    const fullPrompt = `${prompt}\n\n${content}`;

    if (!process.env.OPENROUTER_API_KEY) {
      return context.json({ error: "OpenRouter API key is not set" }, 500);
    }

    const openRouter = createOpenRouter({
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    // Create a TransformStream for SSE
    const { readable, writable } = new TransformStream();
    const writer = writable.getWriter();
    const encoder = new TextEncoder();

    const writeSSE = async (event: string, data: string) => {
      await writer.write(encoder.encode(`event: ${event}\ndata: ${data}\n\n`));
    };

    // Start streaming in background
    (async () => {
      try {
        // Immediate ping
        await writeSSE("ping", "");

        // Keep-alive interval
        const keepAlive = setInterval(async () => {
          try {
            await writeSSE("ping", "");
          } catch {
            clearInterval(keepAlive);
          }
        }, 10000);

        try {
          const result = streamText({
            prompt: fullPrompt,
            model: openRouter.chat("kwaipilot/kat-coder-pro:free"),
            system: SYSTEM_PROMPT,
            temperature: options?.temperature ?? 0.7,
            stopWhen: stepCountIs(20),
            experimental_transform: smoothStream({
              delayInMs: 10,
              chunking: "line",
            }),
            tools: tools
          });

          for await (const textChunk of result.textStream) {
            await writeSSE("message", textChunk);
          }

          await writeSSE("done", "Completed");
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          console.error(`Error: ${message}`);
          await writeSSE("error", message);
        } finally {
          clearInterval(keepAlive);
        }
      } finally {
        await writer.close();
      }
    })();

    // Return response immediately with SSE headers
    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache, no-transform",
        "Connection": "keep-alive",
        "X-Accel-Buffering": "no",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("Failed to handle /agent request", error);
    return context.text("Invalid request", 400);
  }
});


const server = createAdaptorServer({ fetch: app.fetch }) as Server;
const wss = new WebSocketServer({ server, path: '/rpc' });


wss.on('connection', (ws, _req) => {
  rpcConnections.set("", ws)
  console.log("CLI agent connected")

  ws.on('message', (data) => {
    const message = JSON.parse(data.toString())

    if (message.type === 'tool_result') {
      const callId = message.callId || message.id
      const pending = pendingToolCalls.get(callId)
      if (pending) {
        if (message.error) {
          pending.reject(new Error(message.error))
        } else {
          pending.resolve(message.result)
        }
        pendingToolCalls.delete(callId)
      }
    }
  })

  ws.on('close', () => {
    rpcConnections.delete("")
    console.log("CLI agent disconnected")
  })
})
server.listen(process.env.PORT || 5678, () => {
  console.log(`Server running on http://localhost:${process.env.PORT || 5678}`)
})




