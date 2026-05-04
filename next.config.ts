import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 85, 90],
    formats: ['image/webp', 'image/avif'],
  },
};

export default nextConfig;
