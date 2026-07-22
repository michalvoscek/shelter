"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { donationSchema, type FormData } from "./donationSchema";

export const SHELTERS = [
  "Mestský útulok, Žilina",
  "Útulok Bratislava – Polianky",
  "Útulok Sloboda zvierat, Bratislava",
  "Mestský útulok, Košice",
  "Útulok Prešov",
];

export const PRESET_AMOUNTS = [5, 10, 20, 30, 50, 100];

export type { FormData };

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

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormData>({
    defaultValues: initialData,
    resolver: zodResolver(donationSchema),
    mode: "onTouched",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}

export function useDonationForm() {
  const ctx = useFormContext<FormData>();
  if (!ctx) {
    throw new Error("useDonationForm must be used within DonationProvider");
  }
  return ctx;
}
