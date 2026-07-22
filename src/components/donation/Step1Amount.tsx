"use client";

import styled, { css } from "styled-components";
import { Field, Select } from "../ui";
import {
  PRESET_AMOUNTS,
  SHELTERS,
  useDonation,
} from "../donation/DonationContext";
import { Heading, Section, SectionTitle } from "../donation/DonationShell";

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

export default function Step1Amount() {
  const { data, set } = useDonation();

  return (
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
  );
}
