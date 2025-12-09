import type { NextConfig } from "next";
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:4001";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/auth/:path*",
        destination: `${BACKEND_URL}/auth/:path*`,
      },
      {
        source: "/auth/:path*/",
        destination: `${BACKEND_URL}/auth/:path*`,
      },
    ];
  },
  // output: 'export',
  trailingSlash: true,

  // If you are using the <Image> component, you might also need this:
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
