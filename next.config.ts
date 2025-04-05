import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: { reactCompiler: true },
  transpilePackages: ["mui-file-input"],
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
      hmrRefreshes: process.env.NODE_ENV === "development",
    },
  },
};

export default nextConfig;
