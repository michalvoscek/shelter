"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export type Shelter = {
  id: number;
  name: string;
};

type SheltersResponse = {
  shelters: Shelter[];
};

export function useShelters(search: string) {
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(timer);
  }, [search]);

  return useQuery<Shelter[]>({
    queryKey: ["shelters", debouncedSearch],
    queryFn: async () => {
      const params = debouncedSearch ? `?search=${encodeURIComponent(debouncedSearch)}` : "";
      const res = await fetch(
        `https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/${params}`,
      );
      if (!res.ok) throw new Error("Nepodarilo sa načítať útulky");
      const data: SheltersResponse = await res.json();
      return data.shelters;
    },
    staleTime: 60_000,
  });
}
