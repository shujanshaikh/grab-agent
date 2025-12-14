import pc from "picocolors";
import { main } from "./server";

const VERSION = process.env.VERSION ?? "0.0.1";

// Parse command line arguments
const args = process.argv.slice(2);

for (let i = 0; i < args.length; i++) {
  if (args[i] === "--help" || args[i] === "-h") {
    console.log(`
${pc.bold("Grab Agent CLI")} ${pc.gray(VERSION)}

Usage: grab-agent [options]

Options:
  --help, -h            Show this help message

Environment Variables:
  SERVER_URL         Server URL to connect to

Example:
  grab-agent --server-url wss://grab-agent-server.onrender.com
    `);
    process.exit(0);
  }
}

main();