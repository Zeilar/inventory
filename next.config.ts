import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
      hmrRefreshes: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
