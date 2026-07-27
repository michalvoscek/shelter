"use client";

import styled from "styled-components";
import { Field, Input, PhoneField } from "../ui";
import { Section, SectionTitle } from "../donation/DonationShell";

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export default function Step2Details() {
  return (
    <>
      <Section>
        <SectionTitle>O vás</SectionTitle>
        <NameGrid>
          <Field>
            Meno
            <Input
              name="firstName"
              placeholder="Zadajte Vaše meno"
            />
          </Field>
          <Field>
            Priezvisko
            <Input
              name="lastName"
              placeholder="Zadajte Vaše priezvisko"
            />
          </Field>
        </NameGrid>
        <Field>
          E-mailová adresa
          <Input
            name="email"
            type="email"
            placeholder="Zadajte Váš e-mail"
          />
        </Field>
        <Field>
          Telefónne číslo
          <PhoneField name="phone" />
        </Field>
      </Section>
    </>
  );
}
