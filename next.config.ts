import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "static.arasaac.org",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "imaginac.vercel.app",
          },
        ],
        destination: "https://imaginac.es/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
