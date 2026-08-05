import type { Metadata } from "next";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDonationStatus } from "@/lib/donationStatus";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "O projekte — Good boy",
  description: "Nadácia Good Boy sa venuje zlepšovaniu života psov v Žiline.",
};

export default async function OProjektePage() {
  const queryClient = new QueryClient();
  try {
    await queryClient.prefetchQuery({
      queryKey: ["donation-status"],
      queryFn: getDonationStatus,
    });
  } catch {
    // The client hook fetches and surfaces the error state.
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AboutContent />
    </HydrationBoundary>
  );
}
