"use client";

import { Fragment } from "react";
import styled, { css } from "styled-components";
import { CheckIcon } from "./icons";
import { useStepNavigation } from "../hooks/useStepNavigation";

const STEPS = [{ label: "Výber útulku" }, { label: "Osobné údaje" }, { label: "Potvrdenie" }];

const Wrapper = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  width: 100%;
`;

const Connector = styled.li`
  flex: 1 1 48px;
  height: 1px;
  background: var(--border);
  margin: 0 16px;
`;

const Step = styled.li<{ $state: "done" | "active" | "todo" }>`
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;

  ${({ $state }) =>
    $state === "todo"
      ? css`
          color: var(--text-muted);
        `
      : css`
          color: var(--text);
        `}
`;

const StepLink = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  color: inherit;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
  padding: 0;
`;

const Circle = styled.span<{ $state: "done" | "active" | "todo" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  border-radius: 50%;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;

  ${({ $state }) => {
    switch ($state) {
      case "active":
        return css`
          background: var(--primary);
          color: var(--white);
          border: 1px solid var(--primary);
        `;
      case "done":
        return css`
          background: var(--white);
          color: var(--primary);
          border: 1px solid var(--primary);
        `;
      default:
        return css`
          background: var(--white);
          color: var(--text-muted);
          border: 1px solid var(--border);
        `;
    }
  }}
`;

export default function Stepper() {
  const { goToStep, step: currentStep } = useStepNavigation();

  return (
    <Wrapper aria-label="Postup formulára">
      {STEPS.map((step, i) => {
        const state = i < currentStep ? "done" : i === currentStep ? "active" : "todo";
        return (
          <Fragment key={step.label}>
            {i > 0 && <Connector aria-hidden />}
            <Step
              $state={state}
              aria-current={i === currentStep ? "step" : undefined}
            >
              <StepLink onClick={() => goToStep(i)} type="button">
                <Circle $state={state}>
                  {state === "done" ? <CheckIcon size={18} /> : i + 1}
                </Circle>
                {step.label}
              </StepLink>
            </Step>
          </Fragment>
        );
      })}
    </Wrapper>
  );
}
