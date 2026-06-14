import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Prevent Prisma from being bundled — load as native Node.js module
  serverExternalPackages: ["@prisma/client"],
  // Ensure Prisma native binaries are included in serverless bundle
  outputFileTracingIncludes: {
    "/**": ["./node_modules/.prisma/**/*"],
  },
};

export default nextConfig;
