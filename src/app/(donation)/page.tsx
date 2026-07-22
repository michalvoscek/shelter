import type { Metadata } from "next";
import Step1Amount from "@/components/donation/Step1Amount";

export const metadata: Metadata = {
  title: "Výber útulku — Good boy",
  description: "Vyberte si možnosť, ako chcete pomôcť.",
};

export default function Step1Page() {
  return <Step1Amount />;
}
