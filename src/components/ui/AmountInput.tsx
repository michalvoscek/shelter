"use client";

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
  amount: number | undefined;
  onChange: (amount: number) => void;
  error?: { message?: string };
  errorId: string;
}

export function AmountInput({
  amount,
  onChange,
  error,
  errorId,
}: AmountInputProps) {
  return (
    <>
      <AmountInputRow>
        <NumericFormat
          name="amount"
          inputMode="decimal"
          aria-label="Suma v eurách"
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          aria-errormessage={error ? errorId : undefined}
          placeholder="0"
          thousandSeparator=" "
          decimalSeparator=","
          decimalScale={2}
          allowNegative={false}
          value={amount}
          onValueChange={(values) => onChange(values.floatValue as number)}
        />
        <AmountCurrency>€</AmountCurrency>
      </AmountInputRow>
      <AmountError error={error} id={errorId} />
      <Chips>
        {PRESET_AMOUNTS.map((a) => (
          <Chip
            key={a}
            $active={amount === a}
            onClick={() => onChange(a)}
          >
            {a} €
          </Chip>
        ))}
      </Chips>
    </>
  );
}
