import { Hono } from "hono";
import { streamText, stepCountIs, smoothStream } from "ai";
import net from "node:net";
import { DEFAULT_PORT } from "./constant";
import { serve } from "@hono/node-server";
import { streamSSE } from "hono/streaming";
import pc from "picocolors";
import { pathToFileURL } from "node:url";
import { cors } from "hono/cors";
import { SYSTEM_PROMPT } from "./lib/prompt";
import { tools } from "./tools";

interface KaiAgentContext {
    content: string;
    prompt: string;
    options?: {
        model?: string;
        temperature?: number;
    };
}

const VERSION = "0.0.1";

export const createServer = () => {
    const app = new Hono();

    app.use("/*", cors());  

    app.post("/agent", async (context) => {
        try {
            const body = await context.req.json<KaiAgentContext>();
            const { content, prompt, options } = body;
            console.log(body);

            const fullPrompt = `${prompt}\n\n${content}`;
            

            return streamSSE(context, async (stream) => {

                 try {
                    const result = streamText({
                        prompt: fullPrompt,
                        model: "anthropic/claude-haiku-4.5",
                        system: SYSTEM_PROMPT,
                        temperature: options?.temperature ?? 0.3,
                        stopWhen: stepCountIs(20),
                        experimental_transform: smoothStream({
                            delayInMs: 10,
                            chunking: "line",
                        }),
                        maxRetries: 3,
                        tools: tools
                    });

                    for await (const textChunk of result.textStream) {
                        await stream.writeSSE({
                            event: "message",
                            data: textChunk,
                        });
                    }

                    await stream.writeSSE({ event: "done", data: "" });
                } catch (error) {
                    const message =
                    error instanceof Error ? error.message : String(error);
                    console.error(`Error : ${message}`);
                    await stream.writeSSE({ event: "error", data: message });
                }
            });
        } catch (error) {
            console.error("Failed to handle /agent request", error);
            return context.text("Invalid request", 400);
        }
    });

    app.get("/health", (context) => {
        return context.json({ status: "ok", provider: "kai" });
    });


    return app;
};


const isPortInUse = (port: number): Promise<boolean> =>
    new Promise((resolve) => {
        const server = net.createServer();
        server.once("error", () => resolve(true));
        server.once("listening", () => {
            server.close();
            resolve(false);
        });
        server.listen(port);
    });

export const startServer = async (port: number = DEFAULT_PORT) => {
    if (await isPortInUse(port)) {
        return
    }
    const app = createServer()
    serve({ fetch: app.fetch, port });
    console.log(`${pc.magenta("⚛")} ${pc.bold("Grab It")} ${pc.gray(VERSION)} ${pc.dim("(Kai)")}`);
    console.log(`- Local:    ${pc.cyan(`http://localhost:${port}`)}`);
};

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
    startServer(DEFAULT_PORT).catch(console.error);
}