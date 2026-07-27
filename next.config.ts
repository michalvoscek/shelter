import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "export" : undefined,
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

if (process.env.NODE_ENV !== "production") {
  nextConfig.redirects = async () => [
    {
      source: "/",
      destination: "/shelter",
      basePath: false,
      permanent: false,
    },
  ];
}

export default nextConfig;
