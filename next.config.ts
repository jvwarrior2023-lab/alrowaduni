import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed static export for better Vercel performance
  // If you need static export, uncomment the line below and add images: { unoptimized: true }
  // output: "export",
  images: {
    // Enable image optimization for Vercel
    // unoptimized: true, // Only needed for static export
  },
  typescript: {
    // ignoreBuildErrors: true,
  },
};

export default nextConfig;
