import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "O projekte — Good boy",
  description: "Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline.",
};

export default function OProjektePage() {
  return <AboutContent />;
}
