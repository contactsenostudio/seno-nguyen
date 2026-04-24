import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/prestations", destination: "/particulier", permanent: true },
    ];
  },
};

export default nextConfig;
