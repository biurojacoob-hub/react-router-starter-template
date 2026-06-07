import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Core settings */
  reactStrictMode: true,
  /* Future: image domains for avatars / CDN */
  images: {
    remotePatterns: [],
  },
};

export default nextConfig;
