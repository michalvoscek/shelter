"use client";

import { useState } from "react";
import { FieldError, Field, Input, NameGrid } from "../ui";
import { PhoneRow, PrefixButton, PrefixMenu, PrefixWrap } from "../ui";
import { CZ, SK } from "country-flag-icons/react/3x2";
import { ChevronDownIcon } from "../icons";
import { useDonationForm } from "../donation/DonationContext";
import { Heading, Section, SectionTitle } from "../donation/DonationShell";

export default function Step2Details() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useDonationForm();
  const phonePrefix = watch("phonePrefix");
  const [prefixOpen, setPrefixOpen] = useState(false);

  return (
    <>
      <Heading>
        Potrebujeme od Vás zopár
        <br />
        informácií
      </Heading>

      <Section>
        <SectionTitle>O vás</SectionTitle>
        <NameGrid>
          <Field>
            Meno
            <Input
              placeholder="Zadajte Vaše meno"
              aria-invalid={!!errors.firstName}
              {...register("firstName")}
            />
            <FieldError error={errors.firstName} />
          </Field>
          <Field>
            Priezvisko
            <Input
              placeholder="Zadajte Vaše priezvisko"
              aria-invalid={!!errors.lastName}
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
            {...register("email")}
          />
          <FieldError error={errors.email} />
        </Field>
        <Field>
          Telefónne číslo
          <PhoneRow>
            <PrefixWrap>
              <PrefixButton
                type="button"
                aria-label="Predvoľba krajiny"
                onClick={() => setPrefixOpen((o) => !o)}
              >
                {phonePrefix === "+421" ? (
                  <SK title="Slovensko" style={{ width: 22 }} />
                ) : (
                  <CZ title="Česko" style={{ width: 22 }} />
                )}
                <ChevronDownIcon size={16} />
              </PrefixButton>
              {prefixOpen && (
                <PrefixMenu>
                  <button
                    type="button"
                    onClick={() => {
                      setValue("phonePrefix", "+421");
                      setPrefixOpen(false);
                    }}
                  >
                    <SK title="Slovensko" style={{ width: 22 }} /> +421
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setValue("phonePrefix", "+420");
                      setPrefixOpen(false);
                    }}
                  >
                    <CZ title="Česko" style={{ width: 22 }} /> +420
                  </button>
                </PrefixMenu>
              )}
            </PrefixWrap>
            <input
              type="tel"
              placeholder="+ 420 123 321 123"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
          </PhoneRow>
          <FieldError error={errors.phone} />
        </Field>
      </Section>
    </>
  );
}
