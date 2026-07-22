import type { Metadata } from "next";
import OProjekteContent from "./OProjekteContent";

export const metadata: Metadata = {
  title: "O projekte — Good boy",
  description: "Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline.",
};

export default function OProjektePage() {
  return <OProjekteContent />;
}
