import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "react-icons", "@base-ui/react"],
  },
  // Ensure heavy node modules aren't duplicated in bundle if possible
  serverExternalPackages: ["mongoose", "cloudinary"],
};

export default nextConfig;
