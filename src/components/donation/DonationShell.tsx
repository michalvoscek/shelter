"use client";

import Image from "next/image";
import styled from "styled-components";
import { DonationProvider, useDonationForm } from "./DonationContext";
import { useStepNavigation, STEP_FIELDS } from "../../hooks/useStepNavigation";
import Step1Amount from "./Step1Amount";
import Step2Details from "./Step2Details";
import Step3Summary from "./Step3Summary";
import Stepper from "../Stepper";
import Footer from "../Footer";
import { Button } from "../ui";
import { ArrowLeftIcon, ArrowRightIcon } from "../icons";

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

function DonationChrome() {
  const { goToStep, goForward, goBack, step } = useStepNavigation();
  const { handleSubmit } = useDonationForm();

  const submit = handleSubmit(
    (data) => {
      // TODO: POST https://frontend-assignment-api.goodrequest.dev
      console.log("Odosielam formulár:", data);
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

  return (
    <Layout>
      <Column>
        <Stepper />

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
            <Button onClick={submit}>Odoslať formulár</Button>
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
