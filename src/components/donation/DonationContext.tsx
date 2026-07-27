"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, useContext, useState } from "react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { donationSchema, type FormData } from "@/lib/types/donationSchema";

export type { FormData };

export const initialData: FormData = {
  mode: "foundation",
  shelterID: null,
  amount: 50,
  firstName: "",
  lastName: "",
  email: "",
  phone: "+421",
  gdpr: false,
};

interface StepState {
  step: number;
  setStep: (step: number) => void;
}

const StepContext = createContext<StepState | null>(null);

export function DonationProvider({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormData>({
    defaultValues: initialData,
    resolver: zodResolver(donationSchema),
    mode: "onTouched",
  });
  const [step, setStep] = useState(0);

  return (
    <FormProvider {...methods}>
      <StepContext.Provider value={{ step, setStep }}>
        {children}
      </StepContext.Provider>
    </FormProvider>
  );
}

export function useDonationForm() {
  const ctx = useFormContext<FormData>();
  if (!ctx) {
    throw new Error("useDonationForm must be used within DonationProvider");
  }
  return ctx;
}

export function useDonationStep() {
  const ctx = useContext(StepContext);
  if (!ctx) {
    throw new Error("useDonationStep must be used within DonationProvider");
  }
  return ctx;
}
