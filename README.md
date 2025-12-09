# grab-agent

Grab Agent provider for local server/CLI.

## Installation

```bash
npm install grab-agent
# or
pnpm add grab-agent
# or
bun add grab-agent
# or
yarn add grab-agent
```

## Environment

Create a `.env.local` file in your project root and set your API key:

```bash
AI_GATEWAY_API_KEY="your-api-key"
```

This key is required for the agent to make gateway calls.

## Server Setup

The server runs on port `5678` by default.

### Quick Start (CLI)

Start the server in the background before running your dev server:

```bash
npx grab-agent@latest && pnpm run dev
```

The server runs as a detached background process. Stopping your dev server (Ctrl+C) does **not** stop the Grab Agent server. To stop it:

```bash
pkill -f "grab-agent.*server"
# or, by port:
# lsof -ti:5678 | xargs kill -9
```

### Recommended: Config File (Automatic Lifecycle)

Start the server from your config so it stops when your dev server stops:

#### Vite
```ts
// vite.config.ts
import { startServer } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  startServer();
}
```

#### Next.js
```ts
// next.config.ts
import { startServer } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  startServer();
}
```

## Client Usage

### Script Tag
```html
<script src="//unpkg.com/react-grab/dist/index.global.js"></script>
<script src="//unpkg.com/grab-agent/dist/client.global.js"></script>
```

### Next.js (Script component)
```jsx
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
}
```

### ES Module
```tsx
import { attachAgent } from "grab-agent/client";

attachAgent();
```

## How It Works
```
┌─────────────────┐      HTTP       ┌─────────────────┐     stdin      ┌─────────────────┐
│                 │  localhost:5678 │                 │                │                 │
│   React Grab    │ ──────────────► │ Grab Agent Server│ ─────────────► │  grab-agent CLI │
│    (Browser)    │ ◄────────────── │   (Node.js)     │ ◄───────────── │    (Agent)      │
│                 │       SSE       │                 │     stdout     │                 │
└─────────────────┘                 └─────────────────┘                └─────────────────┘
      Client                              Server                            Agent
```

1. **React Grab** sends the selected element context to the server via HTTP POST.
2. **Grab Agent server** receives the request and spawns the local `grab-agent` agent process.
3. **grab-agent agent** processes the request and streams JSON responses to stdout.
4. **Server** relays status updates to the client via Server-Sent Events (SSE).
