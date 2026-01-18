import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-devicons",
      "react-hot-toast",
    ],
  },
  reactCompiler: true,
  images: {
    remotePatterns: [new URL("https://img.clerk.com/*")],
  },
};

export default nextConfig;
