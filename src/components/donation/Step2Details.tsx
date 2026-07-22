"use client";

import { useState } from "react";
import styled from "styled-components";
import { Field, Input } from "../ui";
import { CzechFlag, SlovakFlag, ChevronDownIcon } from "../icons";
import { useDonation } from "../donation/DonationContext";
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
  const { data, set } = useDonation();
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
              value={data.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
          </Field>
          <Field>
            Priezvisko
            <Input
              placeholder="Zadajte Vaše priezvisko"
              value={data.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </Field>
        </NameGrid>
        <Field>
          E-mailová adresa
          <Input
            type="email"
            placeholder="Zadajte Váš e-mail"
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
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
                {data.phonePrefix === "+421" ? (
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
                      set("phonePrefix", "+421");
                      setPrefixOpen(false);
                    }}
                  >
                    <SlovakFlag size={22} /> +421
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      set("phonePrefix", "+420");
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
              value={data.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </PhoneRow>
        </Field>
      </Section>
    </>
  );
}
