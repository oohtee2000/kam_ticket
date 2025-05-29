import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost', 
      'kam-ticket-express-api.onrender.com',
      'via.placeholder.com'  // <--- Add this line
    ],
  },
  webpack(config) {
    config.module?.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
