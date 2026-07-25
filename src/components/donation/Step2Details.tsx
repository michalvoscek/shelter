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
              aria-invalid={!!errors.firstName}
              $hasError={!!errors.firstName}
              {...register("firstName")}
            />
            <FieldError error={errors.firstName} />
          </Field>
          <Field>
            Priezvisko
            <Input
              placeholder="Zadajte Vaše priezvisko"
              aria-invalid={!!errors.lastName}
              $hasError={!!errors.lastName}
              {...register("lastName")}
            />
            <FieldError error={errors.lastName} />
          </Field>
        </NameGrid>
        <Field>
          E-mailová adresa
          <Input
            type="email"
            placeholder="Zadajte Váš e-mail"
            aria-invalid={!!errors.email}
            $hasError={!!errors.email}
            {...register("email")}
          />
          <FieldError error={errors.email} />
        </Field>
        <Field>
          Telefónne číslo
          <PhoneField />
        </Field>
      </Section>
    </>
  );
}
