import type { Metadata } from "next";
import ThankYouContent from "./ThankYouContent";

export const metadata: Metadata = {
  title: "Thank you — Good boy",
  description: "Príspevok bol úspešne zaznamenaný.",
};

export default function ThankYouPage() {
  return <ThankYouContent />;
}
