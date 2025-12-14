# grab-agent

Grab Agent provider for connecting React Grab to a remote agent server.

## Demo

[![Demo Video](https://img.shields.io/badge/Watch%20Demo-Twitter-blue)](https://x.com/shujanshaikh/status/2000073600423059540?s=20)

## Quick Start

### Installation

```bash
npm install grab-agent
# or
pnpm add grab-agent
# or
bun add grab-agent
```

### Setup

#### Next.js

Add to your `next.config.ts`:

```ts
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main(); // Connects to remote WebSocket server
}
```

#### Vite

Add to your `vite.config.ts`:

```ts
import { main } from "grab-agent/server";

if (process.env.NODE_ENV === "development") {
  main(); // Connects to remote WebSocket server
}
```

### Client Integration

#### Next.js (Script component)

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

#### ES Module

```tsx
import { attachAgent } from "grab-agent/client";

attachAgent();
```

For detailed documentation, see [packages/grab-it/README.md](./packages/grab-it/README.md).
