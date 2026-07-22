import type { Metadata } from "next";
import Step2Details from "@/components/donation/Step2Details";

export const metadata: Metadata = {
  title: "Osobné údaje — Good boy",
  description: "Vyplňte Vaše osobné údaje.",
};

export default function Step2Page() {
  return <Step2Details />;
}
