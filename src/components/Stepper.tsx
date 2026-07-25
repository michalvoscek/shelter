"use client";

import styled from "styled-components";
import { useStepNavigation } from "../hooks/useStepNavigation";
import { Stepper } from '@mantine/core';


const Wrapper = styled.ol`
  display: flex;
  align-items: center;
  list-style: none;
  width: 100%;
`;

export default function Stepper2() {
  const { goToStep, step: currentStep } = useStepNavigation();

  return (
    <Wrapper aria-label="Postup formulára">
      <Stepper
        color="violet"
        active={currentStep}
        onStepClick={goToStep}
        styles={{
          separator: {
            marginLeft: 10,
            marginRight: 10,
            height: 2,
            width: 100,
          },
          step: {
            gap: 12
          }
        }}>
        <Stepper.Step label="Výber útulku">
        </Stepper.Step>
        <Stepper.Step label="Osobné údaje">
        </Stepper.Step>
        <Stepper.Step label="Potvrdenie">
        </Stepper.Step>
      </Stepper>
    </Wrapper>
  );
}
