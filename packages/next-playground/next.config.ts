import type { NextConfig } from "next";

// Initialize grab-agent in development mode
if (process.env.NODE_ENV === "development") {
  import("grab-agent/server")
    .then(({ main }) => {
      main();
    })
    .catch((error) => {
      // Silently fail if grab-agent is not available during build
      console.warn("grab-agent not available:", error);
    });
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
