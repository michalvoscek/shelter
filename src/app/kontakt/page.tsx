import type { Metadata } from "next";
import KontaktContent from "./KontaktContent";

export const metadata: Metadata = {
  title: "Kontakt — Good boy",
  description: "Kontaktujte Nadáciu Good Boy.",
};

export default function KontaktPage() {
  return <KontaktContent />;
}
