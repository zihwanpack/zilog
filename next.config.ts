import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.join(__dirname),
  },
  reactCompiler: true,
  cacheComponents: true,
};

export default nextConfig;
