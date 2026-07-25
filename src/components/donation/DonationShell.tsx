"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Transition, type MantineTransition } from "@mantine/core";
import { useReducedMotion } from "@mantine/hooks";
import { DonationProvider, useDonationForm } from "./DonationContext";
import { useStepNavigation, STEP_FIELDS } from "../../hooks/useStepNavigation";
import {
  useSubmitDonation,
  SubmissionError,
  type ApiMessage,
  type SubmitDonationPayload,
} from "../../hooks/useSubmitDonation";
import Step1Amount from "./Step1Amount";
import Step2Details from "./Step2Details";
import Step3Summary from "./Step3Summary";
import Stepper from "../Stepper";
import PageLayout from "../PageLayout";
import { Button } from "../ui";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "../icons";

const STEP_TITLES = [
  "Vyberte si možnosť, ako chcete pomôcť",
  "Potrebujeme od Vás zopár informácií",
  "Skontrolujte si zadané údaje",
];

const DogPanel = styled.aside`
  position: sticky;
  top: 28px;
  height: calc(100dvh - 56px);
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 960px) {
    position: relative;
    top: 0;
    height: 320px;
    order: -1;
  }
`;

const ImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  img {
    object-fit: cover;
  }
`;

export const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
`;

const AlertWrap = styled.section<{ $variant: "error" | "success" }>`
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid
    ${({ $variant }) => ($variant === "error" ? "var(--danger)" : "var(--success)")};
  background: ${({ $variant }) =>
    $variant === "error" ? "var(--danger-light)" : "var(--success-light)"};
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const AlertHeading = styled.h2`
  font-size: 18px;
  font-weight: 700;

  &:focus {
    outline: none;
  }
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--text);

  &:hover {
    background: rgba(17, 24, 39, 0.08);
  }

  &:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 2px;
  }
`;

const AlertList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.4;
`;

const SlideArea = styled.div`
  position: relative;
  width: 100%;
`;

const StepPanel = styled.div<{ $active: boolean }>`
  ${({ $active }) =>
    !$active &&
    `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    pointer-events: none;
  `}
`;

function pickTransition(
  stepIndex: number,
  currentStep: number,
  dir: "forward" | "backward",
): MantineTransition {
  if (stepIndex === currentStep) return dir === "forward" ? "slide-left" : "slide-right";
  return dir === "forward" ? "slide-right" : "slide-left";
}

function SubmitAlert({
  status,
  messages,
  onClose,
}: {
  status: "error" | "success";
  messages: ApiMessage[];
  onClose: () => void;
}) {
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    headingRef.current?.focus();
  }, []);

  return (
    <AlertWrap
      $variant={status}
      role={status === "error" ? "alert" : "status"}
      aria-live={status === "error" ? "assertive" : "polite"}
    >
      <AlertHeader>
        <AlertHeading ref={headingRef} tabIndex={-1}>
          {status === "error"
            ? "Formulár sa nepodarilo odoslať"
            : "Príspevok bol úspešne zaznamenaný"}
        </AlertHeading>
        <CloseButton type="button" aria-label="Zavrieť oznámenie" onClick={onClose}>
          <CloseIcon size={18} />
        </CloseButton>
      </AlertHeader>
      <AlertList>
        {messages.map((m, i) => (
          <li key={i}>{m.message}</li>
        ))}
      </AlertList>
    </AlertWrap>
  );
}

function DonationChrome() {
  const { goToStep, goForward, goBack, step } = useStepNavigation();
  const { handleSubmit } = useDonationForm();
  const mutation = useSubmitDonation();
  const router = useRouter();

  const reducedMotion = useReducedMotion();
  const slideRef = useRef<HTMLDivElement>(null);
  const prevStepRef = useRef(step);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  useEffect(() => {
    if (step > prevStepRef.current) setDirection("forward");
    else if (step < prevStepRef.current) setDirection("backward");
    prevStepRef.current = step;
  }, [step]);

  useEffect(() => {
    const el = slideRef.current;
    if (!el) return;
    const h = el.offsetHeight;
    el.style.minHeight = `${h}px`;
    const t = setTimeout(() => {
      el.style.minHeight = "";
    }, reducedMotion ? 0 : 300);
    return () => clearTimeout(t);
  }, [step, reducedMotion]);

  const submit = handleSubmit(
    (data) => {
      const payload: SubmitDonationPayload = {
        contributors: [
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
          },
        ],
        shelterID: data.mode === "shelter" ? data.shelterID : null,
        value: data.amount,
      };
      mutation.reset();
      mutation.mutate(payload, {
        onSuccess: () => {
          router.push("/thank-you");
        },
      });
    },
    (errors) => {
      const invalidStep = STEP_FIELDS.findIndex((fields) =>
        fields.some((field) => errors[field]),
      );
      if (invalidStep !== -1) {
        goToStep(invalidStep);
      }
    },
  );

  const errorMessages =
    mutation.error instanceof SubmissionError ? mutation.error.messages : [];

  return (
    <PageLayout
      header={<Stepper />}
      title={STEP_TITLES[step]}
      image={
        <DogPanel>
          <ImageWrap>
            <Image
              src="/images/dog-portrait.jpg"
              alt="Šteniatko sediace na pláži"
              fill
              priority
              sizes="(max-width: 960px) 100vw, 42vw"
            />
          </ImageWrap>
        </DogPanel>
      }
    >
      {mutation.isError && (
        <SubmitAlert
          status="error"
          messages={errorMessages}
          onClose={mutation.reset}
        />
      )}

      <SlideArea ref={slideRef}>
        <Transition
          mounted={step === 0}
          transition={pickTransition(0, step, direction)}
          duration={reducedMotion ? 0 : 300}
          keepMounted
        >
          {(styles) => (
            <StepPanel $active={step === 0} style={styles}>
              <Step1Amount />
            </StepPanel>
          )}
        </Transition>
        <Transition
          mounted={step === 1}
          transition={pickTransition(1, step, direction)}
          duration={reducedMotion ? 0 : 300}
          keepMounted
        >
          {(styles) => (
            <StepPanel $active={step === 1} style={styles}>
              <Step2Details />
            </StepPanel>
          )}
        </Transition>
        <Transition
          mounted={step === 2}
          transition={pickTransition(2, step, direction)}
          duration={reducedMotion ? 0 : 300}
          keepMounted
        >
          {(styles) => (
            <StepPanel $active={step === 2} style={styles}>
              <Step3Summary />
            </StepPanel>
          )}
        </Transition>
      </SlideArea>

      <Actions>
        <Button
          $variant="secondary"
          onClick={goBack}
          disabled={step === 0}
          aria-label="Späť"
        >
          <ArrowLeftIcon size={20} /> Späť
        </Button>
        {step < 2 ? (
          <Button onClick={goForward}>
            Pokračovať <ArrowRightIcon size={20} />
          </Button>
        ) : (
          <Button onClick={submit} disabled={mutation.isPending || mutation.isSuccess}>
            {mutation.isPending ? "Odosielam…" : "Odoslať formulár"}
          </Button>
        )}
      </Actions>
    </PageLayout>
  );
}

export default function DonationShell() {
  return (
    <DonationProvider>
      <DonationChrome />
    </DonationProvider>
  );
}
