"use client";

import { createContext, useContext, useState } from "react";

export const SHELTERS = [
  "Mestský útulok, Žilina",
  "Útulok Bratislava – Polianky",
  "Útulok Sloboda zvierat, Bratislava",
  "Mestský útulok, Košice",
  "Útulok Prešov",
];

export const PRESET_AMOUNTS = [5, 10, 20, 30, 50, 100];

export type FormData = {
  mode: "shelter" | "foundation";
  shelter: string;
  amount: string;
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: "+421" | "+420";
  phone: string;
  gdpr: boolean;
};

export const initialData: FormData = {
  mode: "foundation",
  shelter: "",
  amount: "50",
  firstName: "",
  lastName: "",
  email: "",
  phonePrefix: "+421",
  phone: "",
  gdpr: false,
};

type DonationContextValue = {
  data: FormData;
  set: <K extends keyof FormData>(key: K, value: FormData[K]) => void;
};

const DonationContext = createContext<DonationContextValue | null>(null);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<FormData>(initialData);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  return (
    <DonationContext.Provider value={{ data, set }}>
      {children}
    </DonationContext.Provider>
  );
}

export function useDonation() {
  const ctx = useContext(DonationContext);
  if (!ctx) {
    throw new Error("useDonation must be used within DonationProvider");
  }
  return ctx;
}
