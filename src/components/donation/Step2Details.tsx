"use client";

import { useState } from "react";
import styled from "styled-components";
import { Field, Input } from "../ui";
import { CzechFlag, SlovakFlag, ChevronDownIcon } from "../icons";
import { useDonationForm } from "../donation/DonationContext";
import { Heading, Section, SectionTitle } from "../donation/DonationShell";

const NameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const PhoneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid transparent;
  border-radius: 8px;
  padding: 6px;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:focus-within {
    border-color: var(--primary);
    background: var(--white);
  }

  input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    height: 44px;
    font-size: 16px;
    color: var(--text);
    padding: 0 10px 0 4px;

    &::placeholder {
      color: var(--text-muted);
    }
  }
`;

const PrefixButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--white);
  border-radius: 6px;
  padding: 10px 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
  color: var(--text-secondary);
`;

const PrefixMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.12);

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 15px;
    color: var(--text);

    &:hover {
      background: var(--surface);
    }
  }
`;

const PrefixWrap = styled.div`
  position: relative;
`;

export default function Step2Details() {
  const { register, watch, setValue } = useDonationForm();
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
              {...register("firstName")}
            />
          </Field>
          <Field>
            Priezvisko
            <Input
              placeholder="Zadajte Vaše priezvisko"
              {...register("lastName")}
            />
          </Field>
        </NameGrid>
        <Field>
          E-mailová adresa
          <Input
            type="email"
            placeholder="Zadajte Váš e-mail"
            {...register("email")}
          />
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
                  <SlovakFlag size={22} />
                ) : (
                  <CzechFlag size={22} />
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
                    <SlovakFlag size={22} /> +421
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setValue("phonePrefix", "+420");
                      setPrefixOpen(false);
                    }}
                  >
                    <CzechFlag size={22} /> +420
                  </button>
                </PrefixMenu>
              )}
            </PrefixWrap>
            <input
              type="tel"
              placeholder="+ 420 123 321 123"
              {...register("phone")}
            />
          </PhoneRow>
        </Field>
      </Section>
    </>
  );
}
