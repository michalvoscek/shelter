import type { Metadata } from "next";
import Step3Summary from "@/components/donation/Step3Summary";

export const metadata: Metadata = {
  title: "Potvrdenie — Good boy",
  description: "Skontrolujte si zadané údaje.",
};

export default function Step3Page() {
  return <Step3Summary />;
}
