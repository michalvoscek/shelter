"use client";

import type { FieldPath } from "react-hook-form";
import {
  useDonationForm,
  useDonationStep,
} from "../components/donation/DonationContext";
import type { FormData } from "../components/donation/DonationContext";

export const STEP_FIELDS: FieldPath<FormData>[][] = [
  ["shelter", "amount"],
  ["firstName", "lastName", "email", "phone"],
];

export function useStepNavigation() {
  const { step, setStep } = useDonationStep();
  const { trigger } = useDonationForm();

  const goToStep = async (target: number) => {
    if (target === step) return;
    if (target < step) {
      setStep(target);
      return;
    }
    const fieldsToValidate = STEP_FIELDS.slice(0, target).flat();
    if (fieldsToValidate.length === 0 || (await trigger(fieldsToValidate))) {
      setStep(target);
    }
  };

  const goForward = async () => {
    const fieldsToValidate = STEP_FIELDS.slice(0, step + 1).flat();
    if (await trigger(fieldsToValidate)) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    setStep(Math.max(0, step - 1));
  };

  return { goToStep, goForward, goBack, step };
}
