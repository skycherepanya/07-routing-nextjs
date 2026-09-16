import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NOTEHUB_TOKEN: process.env.NOTEHUB_TOKEN,
  },
};

export default nextConfig;
