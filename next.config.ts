import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/shelter",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/imageLoader.ts",
  },
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
};

export default nextConfig;
