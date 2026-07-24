import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Kontakt — Good boy",
  description: "Kontaktujte Nadáciu Good Boy.",
};

export default function KontaktPage() {
  return <ContactContent />;
}
