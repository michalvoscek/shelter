"use client";

import styled, { css } from "styled-components";
import { FieldError, Field } from "../ui";
import {
  PRESET_AMOUNTS,
  useDonationForm,
} from "../donation/DonationContext";
import { Heading, Section, SectionTitle } from "../donation/DonationShell";
import ShelterCombobox from "./ShelterCombobox";

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

const AmountError = styled(FieldError)`
  text-align: center;
`;

export default function Step1Amount() {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useDonationForm();
  const mode = watch("mode");
  const amount = watch("amount");
  const shelterID = watch("shelterID");

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
          aria-selected={mode === "shelter"}
          $active={mode === "shelter"}
          onClick={() => setValue("mode", "shelter")}
        >
          Prispieť konkrétnemu útulku
        </ModeButton>
        <ModeButton
          role="tab"
          aria-selected={mode === "foundation"}
          $active={mode === "foundation"}
          onClick={() => {
            setValue("mode", "foundation");
            clearErrors("shelterID");
          }}
        >
          Prispieť celej nadácii
        </ModeButton>
      </ModeToggle>

      <Section>
        <SectionTitle>O projekte</SectionTitle>
        <Field>
          <span>
            Útulok{" "}
            {mode === "foundation" ? (
              <span className="optional">(Nepovinné)</span>
            ) : null}
          </span>
          <ShelterCombobox
            value={shelterID}
            onChange={(id) => setValue("shelterID", id, { shouldValidate: true })}
            placeholder="Vyberte útulok zo zoznamu"
            error={errors.shelterID}
          />
          <FieldError error={errors.shelterID} />
        </Field>
      </Section>

      <Section>
        <SectionTitle>Suma, ktorou chcem prispieť</SectionTitle>
        <AmountInputRow>
          <input
            type="text"
            inputMode="numeric"
            aria-label="Suma v eurách"
            aria-invalid={!!errors.amount}
            placeholder="0"
            value={amount}
            onChange={(e) =>
              setValue("amount", e.target.value.replace(/[^0-9]/g, ""), {
                shouldValidate: true,
              })
            }
          />
          <AmountCurrency>€</AmountCurrency>
        </AmountInputRow>
        <AmountError error={errors.amount} />
        <Chips>
          {PRESET_AMOUNTS.map((a) => (
            <Chip
              key={a}
              $active={amount === String(a)}
              onClick={() =>
                setValue("amount", String(a), { shouldValidate: true })
              }
            >
              {a} €
            </Chip>
          ))}
        </Chips>
      </Section>
    </>
  );
}
