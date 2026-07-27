"use client";

import { useController } from "react-hook-form";
import styled, { css } from "styled-components";
import { NumericFormat } from "react-number-format";
import { FieldError } from "./FieldError";

const PRESET_AMOUNTS = [5, 10, 20, 30, 50, 100];

const AmountInputRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: 12px;
  max-width: 260px;
  width: 100%;
  margin: 16px auto 0;
  padding-bottom: 8px;
  border-bottom: 2px solid var(--primary);

  input {
    width: 160px;
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

interface AmountInputProps {
  name: string;
}

export function AmountInput({ name }: AmountInputProps) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;
  console.log('value', field.value)
  return (
    <>
      <AmountInputRow>
        <NumericFormat
          name="amount"
          inputMode="decimal"
          aria-label="Suma v eurách"
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-errormessage={error ? `${name}-error` : undefined}
          placeholder="0"
          thousandSeparator=" "
          decimalSeparator=","
          decimalScale={2}
          allowNegative={false}
          value={field.value}
          onValueChange={(values) => {
            field.onChange(values.floatValue ?? null)
          }}
          onBlur={field.onBlur}
          getInputRef={field.ref}
        />
        <AmountCurrency>€</AmountCurrency>
      </AmountInputRow>
      <AmountError error={error} id={`${name}-error`} />
      <Chips>
        {PRESET_AMOUNTS.map((a) => (
          <Chip
            key={a}
            $active={field.value === a}
            onClick={() => field.onChange(a)}
          >
            {a} €
          </Chip>
        ))}
      </Chips>
    </>
  );
}
