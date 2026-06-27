import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security: remove X-Powered-By header
  poweredByHeader: false,

  // Image optimisation: allow local uploaded images
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "anujdigitallabs.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
