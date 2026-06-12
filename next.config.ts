import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [],
  },
  webpack: (config) => {
    // pg tries to load pg-native as an optional native addon; suppress the warning
    config.externals = [...(config.externals as string[]), { "pg-native": "pg-native" }]
    return config
  },
};

export default nextConfig;
