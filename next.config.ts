import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Prevent Prisma from being bundled into edge/serverless bundles
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
