/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  // Keep Prisma, adapter and pg outside webpack bundle — loaded as native Node.js modules
  // outputFileTracingIncludes is intentionally omitted: let Vercel auto-trace dependencies
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-pg", "pg"],
};

module.exports = nextConfig;
