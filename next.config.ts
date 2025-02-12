import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  eslint: {
    dirs: ['app', 'functions/src']
  }
};

export default nextConfig;
