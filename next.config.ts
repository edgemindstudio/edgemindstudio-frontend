// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps catch potential problems during development

  // Optional: Enable URL-based network testing during local LAN/mobile testing
  // Uncomment if needed:
  /*
  experimental: {
    allowedDevOrigins: ['http://192.168.6.27:3000'], // Replace with your local network IP for device testing
  },
  */

  // Optionally add other configurations here (e.g., images, webpack, redirects)
};

export default nextConfig;
