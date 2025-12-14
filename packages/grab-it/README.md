# grab-agent

Grab Agent provider for connecting React Grab to a remote agent server.

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

## CLI Usage

The `grab-agent` CLI connects to the remote agent server and executes tool calls:


### Recommended: Auto-start CLI from Config File

Start the CLI from your config so it runs alongside your dev server:

#### Vite
```ts
// vite.config.ts
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main(); // Connects to remote WebSocket server
}
```

#### Next.js
```ts
// next.config.ts
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main(); // Connects to remote WebSocket server
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


## Configuration

### Environment Variables

- `SERVER_URL` - WebSocket URL for the CLI to connect to (default: `wss://grab-agent-server-production.up.railway.app`)
- The client uses `https://grab-agent-server-production.up.railway.app` by default

## How It Works
```
┌─────────────────┐      HTTP/SSE      ┌──────────────────────┐      WebSocket      ┌─────────────────┐
│                 │  Railway Server    │                      │                     │                 │
│   React Grab    │ ──────────────────► │  Grab Agent Server   │ ◄─────────────────── │  grab-agent CLI │
│    (Browser)    │ ◄────────────────── │   (Remote Server)    │                     │   (Local CLI)   │
│                 │                     │                      │                     │                 │
└─────────────────┘                     └──────────────────────┘                     └─────────────────┘
      Client                                 Server                                        Agent CLI
```

1. **React Grab** (browser) sends the selected element context to the remote server via HTTP POST (`/agent` endpoint).
2. **Grab Agent Server** (remote) receives the request and forwards tool calls to connected CLI agents via WebSocket (`/rpc` endpoint).
3. **grab-agent CLI** (local) connects to the server via WebSocket, receives tool calls, executes them locally, and sends results back.
4. **Server** relays status updates and responses back to the browser client via Server-Sent Events (SSE).

The CLI must be running locally to execute tool calls (like reading files or applying patches) in your workspace.
