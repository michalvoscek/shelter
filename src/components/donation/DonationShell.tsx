"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styled from "styled-components";
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
import Footer from "../Footer";
import { Button } from "../ui";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from "../icons";

export const Layout = styled.main`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 42%);
  gap: 48px;
  padding: 24px 40px 24px 110px;
  min-height: 100dvh;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 20px 24px;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 912px;
  width: 100%;
`;

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

export const Heading = styled.h1`
  font-size: 48px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
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

function SubmitAlert({
  status,
  messages,
  onRetry,
  onClose,
}: {
  status: "error" | "success";
  messages: ApiMessage[];
  onRetry: () => void;
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
      {status === "error" && <Button onClick={onRetry}>Skúsiť znova</Button>}
    </AlertWrap>
  );
}

function DonationChrome() {
  const { goToStep, goForward, goBack, step } = useStepNavigation();
  const { handleSubmit } = useDonationForm();
  const mutation = useSubmitDonation();

  const submit = handleSubmit(
    (data) => {
      const payload: SubmitDonationPayload = {
        contributors: [
          {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: `${data.phonePrefix} ${data.phone}`,
          },
        ],
        shelterID: data.mode === "shelter" ? data.shelterID : null,
        value: Number(data.amount),
      };
      mutation.reset();
      mutation.mutate(payload);
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
    <Layout>
      <Column>
        <Stepper />

        {mutation.isError && (
          <SubmitAlert
            status="error"
            messages={errorMessages}
            onRetry={submit}
            onClose={mutation.reset}
          />
        )}
        {mutation.isSuccess && mutation.data && (
          <SubmitAlert
            status="success"
            messages={mutation.data}
            onRetry={submit}
            onClose={mutation.reset}
          />
        )}

        {step === 0 ? <Step1Amount /> : step === 1 ? <Step2Details /> : <Step3Summary />}

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
            <Button onClick={submit} disabled={mutation.isPending}>
              {mutation.isPending ? "Odosielam…" : "Odoslať formulár"}
            </Button>
          )}
        </Actions>

        <Footer />
      </Column>

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
    </Layout>
  );
}

export default function DonationShell() {
  return (
    <DonationProvider>
      <DonationChrome />
    </DonationProvider>
  );
}
