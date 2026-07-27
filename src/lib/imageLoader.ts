import type { ImageLoaderProps } from "next/image";

const basePath = "/shelter";

export default function imageLoader({ src }: ImageLoaderProps) {
  return `${basePath}${src}`;
}
