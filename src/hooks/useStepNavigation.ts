"use client";

import { useRouter, usePathname } from "next/navigation";
import type { FieldPath } from "react-hook-form";
import { useDonationForm } from "../components/donation/DonationContext";
import type { FormData } from "../components/donation/DonationContext";

export const STEP_PATHS = ["/", "/personal-data", "/confirmation"];

export const STEP_FIELDS: FieldPath<FormData>[][] = [
  ["shelter", "amount"],
  ["firstName", "lastName", "email", "phone"],
];

function pathToStep(pathname: string): number {
  const i = STEP_PATHS.indexOf(pathname);
  return i === -1 ? 0 : i;
}

export function useStepNavigation() {
  const router = useRouter();
  const pathname = usePathname();
  const step = pathToStep(pathname);
  const { trigger } = useDonationForm();

  const goToStep = async (target: number) => {
    if (target === step) return;
    if (target < step) {
      router.push(STEP_PATHS[target]);
      return;
    }
    const fieldsToValidate = STEP_FIELDS.slice(0, target).flat();
    if (fieldsToValidate.length === 0 || (await trigger(fieldsToValidate))) {
      router.push(STEP_PATHS[target]);
    }
  };

  const goForward = async () => {
    const fieldsToValidate = STEP_FIELDS.slice(0, step + 1).flat();
    if (await trigger(fieldsToValidate)) {
      router.push(STEP_PATHS[Math.min(STEP_PATHS.length - 1, step + 1)]);
    }
  };

  const goBack = () => {
    router.push(STEP_PATHS[Math.max(0, step - 1)]);
  };

  return { goToStep, goForward, goBack, step };
}
