"use client";

import { useQuery } from "@tanstack/react-query";
import type { DonationStatus } from "@/lib/types/apiTypes";

export function useDonationStatus() {
  return useQuery<DonationStatus>({
    queryKey: ["donation-status"],
    queryFn: async () => {
      const res = await fetch("/api/donation-status");
      if (!res.ok) throw new Error("Nepodarilo sa načítať stav zbierky");
      return res.json();
    },
    refetchOnMount: "always",
    refetchInterval: 60_000,
  });
}
