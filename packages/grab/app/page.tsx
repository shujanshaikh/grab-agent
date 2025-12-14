import { Star } from "lucide-react";
import { Kbd } from "@/components/ui/kbd";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/code-block";
import { GrabLogo } from "@/components/grab-logo";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const installCode = `npm install grab-agent`;

const nextjsConfig = `// next.config.ts
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main();
}

export default {
  // your config
};`;

const nextjsClient = `// app/layout.tsx
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        {process.env.NODE_ENV === "development" && (
          <>
            <Script
              src="//unpkg.com/react-grab/dist/index.global.js"
              strategy="beforeInteractive"
            />
            <Script
              src="//unpkg.com/grab-agent/dist/client.global.js"
              strategy="lazyOnload"
            />
          </>
        )}
      </head>
      <body>{children}</body>
    </html>
  );
}`;

const viteConfig = `// vite.config.ts
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main();
}

export default {
  // your config
};`;

const viteClient = `<!-- index.html -->
<script src="//unpkg.com/react-grab/dist/index.global.js"></script>
<script src="//unpkg.com/grab-agent/dist/client.global.js"></script>`;

const esmConfig = `// main entry file
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main();
}`;

const esmClient = `// client
import { attachAgent } from "grab-agent/client";

attachAgent();`;

export default async function Home() {
  return (
    <main className="min-h-screen bg-background">
      <section className="pt-8 pb-10 px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center justify-between mb-12">
            <div className="flex items-center gap-2">
              <GrabLogo className="w-6 h-6 text-foreground" />
              <span className="font-semibold">Grab Agent</span>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" asChild>
              <a href="https://github.com/shujanshaikh/grab-it" target="_blank">
                <Star className="w-4 h-4" />
                Star
              </a>
            </Button>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <GrabLogo className="w-14 h-14 text-primary" />
            </div>

            <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
              Grab. Prompt. Transform.
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Select any UI element in your browser, describe the change you want,
              and watch your local codebase update instantly.
            </p>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border">
                <Kbd>⌘</Kbd><span>+</span><Kbd>C</Kbd>
                <span className="text-xs ml-1">select</span>
              </div>
              <span>→</span>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border">
                <Kbd>Enter</Kbd>
                <span className="text-xs ml-1">prompt</span>
              </div>
              <span>→</span>
              <div className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                done ✓
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <Button asChild>
                <a href="#setup">Get Started</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://www.npmjs.com/package/grab-agent" target="_blank">
                  npm
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="setup" className="py-12 px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-2xl font-semibold text-center mb-8">Quick Setup</h2>

          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                1
              </div>
              <h3 className="font-medium">Install the package</h3>
            </div>
            <div className="ml-10">
              <CodeBlock code={installCode} lang="bash" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                2
              </div>
              <h3 className="font-medium">Configure your project</h3>
            </div>

            <div className="ml-10">
              <Tabs defaultValue="nextjs" className="w-full">
                <TabsList className="w-full justify-start mb-4 bg-secondary/50">
                  <TabsTrigger value="nextjs">Next.js</TabsTrigger>
                  <TabsTrigger value="vite">Vite</TabsTrigger>
                  <TabsTrigger value="esm">ES Module</TabsTrigger>
                </TabsList>

                <TabsContent value="nextjs" className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Server Configuration</p>
                    <CodeBlock code={nextjsConfig} lang="typescript" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Client Integration</p>
                    <CodeBlock code={nextjsClient} lang="tsx" />
                  </div>
                </TabsContent>

                <TabsContent value="vite" className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Server Configuration</p>
                    <CodeBlock code={viteConfig} lang="typescript" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Client Integration</p>
                    <CodeBlock code={viteClient} lang="html" />
                  </div>
                </TabsContent>

                <TabsContent value="esm" className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-2">Server</p>
                    <CodeBlock code={esmConfig} lang="typescript" />
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-2">Client</p>
                    <CodeBlock code={esmClient} lang="typescript" />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="mt-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                3
              </div>
              <h3 className="font-medium">Start using</h3>
            </div>
            <div className="ml-10 p-4 rounded-xl bg-secondary/50 text-sm text-muted-foreground">
              Run your dev server and hold <Kbd>⌘+C</Kbd> to select elements. Press <Kbd>Enter</Kbd> to prompt.
            </div>
          </div>
        </div>
      </section>

      <footer className="py-10 px-6 text-center text-sm text-muted-foreground">
        <p>MIT License © {new Date().getFullYear()}</p>
        <p className="mt-2">
          Made by{" "}
          <a href="https://x.com/shujanshaikh" className="text-foreground hover:underline">
            @shujanshaikh
          </a>
        </p>
      </footer>
    </main>
  );
}
