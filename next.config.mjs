/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  serverExternalPackages: ["@prisma/client"],
  outputFileTracingIncludes: {
    "/**": ["./node_modules/.prisma/**/*"],
  },
};

export default nextConfig;
