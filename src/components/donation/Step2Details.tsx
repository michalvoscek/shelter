"use client";

import styled from "styled-components";
import { Field, FieldError, Input, PhoneField } from "../ui";
import { useDonationForm } from "../donation/DonationContext";
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
  const {
    register,
    formState: { errors },
  } = useDonationForm();

  return (
    <>
      <Section>
        <SectionTitle>O vás</SectionTitle>
        <NameGrid>
          <Field>
            Meno
            <Input
              placeholder="Zadajte Vaše meno"
              errorId="firstName-error"
              $hasError={!!errors.firstName}
              {...register("firstName")}
            />
            <FieldError error={errors.firstName} id="firstName-error" />
          </Field>
          <Field>
            Priezvisko
            <Input
              placeholder="Zadajte Vaše priezvisko"
              errorId="lastName-error"
              $hasError={!!errors.lastName}
              {...register("lastName")}
            />
            <FieldError error={errors.lastName} id="lastName-error" />
          </Field>
        </NameGrid>
        <Field>
          E-mailová adresa
          <Input
            type="email"
            placeholder="Zadajte Váš e-mail"
            errorId="email-error"
            $hasError={!!errors.email}
            {...register("email")}
          />
          <FieldError error={errors.email} id="email-error" />
        </Field>
        <Field>
          Telefónne číslo
          <PhoneField />
        </Field>
      </Section>
    </>
  );
}
