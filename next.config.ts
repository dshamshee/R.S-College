import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "@base-ui/react"],
  },
  // Ensure heavy node modules aren't duplicated in bundle if possible
  serverExternalPackages: ["mongoose", "cloudinary"],
};

export default nextConfig;

