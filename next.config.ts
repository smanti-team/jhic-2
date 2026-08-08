import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*vigilant-halibut-49qp9gwx999fqvg5-3000.app.github.dev/'], // Add your domain here
    },
  },
};

export default nextConfig;
