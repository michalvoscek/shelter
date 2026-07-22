"use client";

import { useState } from "react";
import Image from "next/image";
import styled, { css } from "styled-components";
import Stepper from "./Stepper";
import Footer from "./Footer";
import { Button, Field, Input, Select, Checkbox } from "./ui";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  CzechFlag,
  SlovakFlag,
} from "./icons";

const SHELTERS = [
  "Mestský útulok, Žilina",
  "Útulok Bratislava – Polianky",
  "Útulok Sloboda zvierat, Bratislava",
  "Mestský útulok, Košice",
  "Útulok Prešov",
];

const PRESET_AMOUNTS = [5, 10, 20, 30, 50, 100];

type FormData = {
  mode: "shelter" | "foundation";
  shelter: string;
  amount: string;
  firstName: string;
  lastName: string;
  email: string;
  phonePrefix: "+421" | "+420";
  phone: string;
  gdpr: boolean;
};

const initialData: FormData = {
  mode: "foundation",
  shelter: "",
  amount: "50",
  firstName: "",
  lastName: "",
  email: "",
  phonePrefix: "+421",
  phone: "",
  gdpr: false,
};

const Layout = styled.main`
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

const Column = styled.div`
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

  img {
    object-fit: cover;
  }

  @media (max-width: 960px) {
    position: relative;
    top: 0;
    height: 320px;
    order: -1;
  }
`;

const Heading = styled.h1`
  font-size: 48px;
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.02em;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  font-weight: 700;
`;

const ModeToggle = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid var(--border);
  border-radius: 8px;
`;

const ModeButton = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 14px 16px;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: var(--primary);
          color: var(--white);
          box-shadow: 0 4px 12px rgba(79, 70, 229, 0.35);
        `
      : css`
          background: var(--white);
          color: var(--text);

          &:hover {
            background: var(--surface);
          }
        `}
`;

const AmountInputRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  width: 200px;
  margin: 16px auto 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary);

  input {
    width: 110px;
    border: none;
    background: none;
    outline: none;
    text-align: right;
    font-size: 44px;
    font-weight: 300;
    color: var(--text);
    padding: 0;

    &::placeholder {
      color: var(--text-muted);
    }
  }
`;

const AmountCurrency = styled.span`
  font-size: 22px;
  font-weight: 500;
  color: var(--text-secondary);
  padding-bottom: 10px;
`;

const Chips = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Chip = styled.button<{ $active: boolean }>`
  flex: 1 1 0;
  min-width: 96px;
  padding: 14px 12px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.15s ease, color 0.15s ease;

  ${({ $active }) =>
    $active
      ? css`
          background: var(--primary);
          color: var(--white);
        `
      : css`
          background: var(--surface);
          color: var(--text);

          &:hover {
            background: var(--border);
          }
        `}
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
`;

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

const SummaryList = styled.dl`
  display: flex;
  flex-direction: column;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding: 14px 0;

  dt {
    color: var(--text-secondary);
    font-size: 16px;
  }

  dd {
    font-size: 16px;
    font-weight: 700;
    text-align: right;
  }
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
`;

export default function DonationForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(initialData);
  const [prefixOpen, setPrefixOpen] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setData((d) => ({ ...d, [key]: value }));

  const back = () => setStep((s) => Math.max(0, s - 1));
  const next = () => setStep((s) => Math.min(2, s + 1));

  const submit = () => {
    // TODO: POST https://frontend-assignment-api.goodrequest.dev
    console.log("Odosielam formulár:", data);
  };

  return (
    <Layout>
      <Column>
        <Stepper current={step} />

        {step === 0 && (
          <>
            <Heading>
              Vyberte si možnosť, ako
              <br />
              chcete pomôcť
            </Heading>

            <ModeToggle role="tablist" aria-label="Forma pomoci">
              <ModeButton
                role="tab"
                aria-selected={data.mode === "shelter"}
                $active={data.mode === "shelter"}
                onClick={() => set("mode", "shelter")}
              >
                Prispieť konkrétnemu útulku
              </ModeButton>
              <ModeButton
                role="tab"
                aria-selected={data.mode === "foundation"}
                $active={data.mode === "foundation"}
                onClick={() => set("mode", "foundation")}
              >
                Prispieť celej nadácii
              </ModeButton>
            </ModeToggle>

            <Section>
              <SectionTitle>O projekte</SectionTitle>
              <Field>
                Útulok{" "}
                {data.mode === "foundation" ? (
                  <span className="optional">(Nepovinné)</span>
                ) : null}
                <Select
                  placeholder="Vyberte útulok zo zoznamu"
                  value={data.shelter}
                  onChange={(e) => set("shelter", e.target.value)}
                >
                  {SHELTERS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Select>
              </Field>
            </Section>

            <Section>
              <SectionTitle>Suma, ktorou chcem prispieť</SectionTitle>
              <AmountInputRow>
                <input
                  type="text"
                  inputMode="numeric"
                  aria-label="Suma v eurách"
                  placeholder="0"
                  value={data.amount}
                  onChange={(e) =>
                    set("amount", e.target.value.replace(/[^0-9]/g, ""))
                  }
                />
                <AmountCurrency>€</AmountCurrency>
              </AmountInputRow>
              <Chips>
                {PRESET_AMOUNTS.map((a) => (
                  <Chip
                    key={a}
                    $active={data.amount === String(a)}
                    onClick={() => set("amount", String(a))}
                  >
                    {a} €
                  </Chip>
                ))}
              </Chips>
            </Section>
          </>
        )}

        {step === 1 && (
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
        )}

        {step === 2 && (
          <>
            <Heading>Skontrolujte si zadané údaje</Heading>

            <Section>
              <SectionTitle>Zhrnutie</SectionTitle>
              <SummaryList>
                <SummaryRow>
                  <dt>Forma pomoci</dt>
                  <dd>
                    {data.mode === "foundation"
                      ? "Finančný príspevok celej nadácii"
                      : "Finančný príspevok konkrétnemu útulku"}
                  </dd>
                </SummaryRow>
                <SummaryRow>
                  <dt>Útulok</dt>
                  <dd>{data.shelter || "—"}</dd>
                </SummaryRow>
                <SummaryRow>
                  <dt>Suma príspevku</dt>
                  <dd>{data.amount ? `${data.amount} €` : "—"}</dd>
                </SummaryRow>
              </SummaryList>
              <Divider />
              <SummaryList>
                <SummaryRow>
                  <dt>Meno a priezvisko</dt>
                  <dd>
                    {[data.firstName, data.lastName].filter(Boolean).join(" ") ||
                      "—"}
                  </dd>
                </SummaryRow>
                <SummaryRow>
                  <dt>E-mail</dt>
                  <dd>{data.email || "—"}</dd>
                </SummaryRow>
                <SummaryRow>
                  <dt>Telefónne číslo</dt>
                  <dd>{data.phone || "—"}</dd>
                </SummaryRow>
              </SummaryList>
              <Divider />
              <Checkbox
                checked={data.gdpr}
                onChange={(e) => set("gdpr", e.target.checked)}
              >
                Súhlasím so spracovaním mojich osobných údajov
              </Checkbox>
            </Section>
          </>
        )}

        <Actions>
          <Button
            $variant="secondary"
            onClick={back}
            disabled={step === 0}
            aria-label="Späť"
          >
            <ArrowLeftIcon size={20} /> Späť
          </Button>
          {step < 2 ? (
            <Button onClick={next}>
              Pokračovať <ArrowRightIcon size={20} />
            </Button>
          ) : (
            <Button onClick={submit}>Odoslať formulár</Button>
          )}
        </Actions>

        <Footer />
      </Column>

      <DogPanel>
        <Image
          src="/images/dog-portrait.jpg"
          alt="Šteniatko sediace na pláži"
          fill
          priority
          sizes="(max-width: 960px) 100vw, 42vw"
        />
      </DogPanel>
    </Layout>
  );
}
