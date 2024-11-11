import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kefusion/market-research"],
  webpack: (config, { isServer }) => {
    // Add support for importing from outside the app directory
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    return config;
  },
};

export default nextConfig;
