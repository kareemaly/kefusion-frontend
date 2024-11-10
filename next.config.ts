import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@kefusion/market-research"],
  webpack: (config, { isServer }) => {
    // Add support for importing from outside the app directory
    config.resolve.alias = {
      ...config.resolve.alias,
      "@kefusion/market-research": require.resolve(
        "/Users/kareemelbahrawy/ai/microapps/market-research"
      ),
    };

    return config;
  },
};

export default nextConfig;
