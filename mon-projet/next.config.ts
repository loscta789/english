// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

// Configuration PWA
const withPWANextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Ajoute ici d'autres options Next.js si nécessaire
};

export default withPWANextConfig(nextConfig);
