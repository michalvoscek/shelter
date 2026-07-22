"use client";

import styled, { css } from "styled-components";
import { CheckIcon, ChevronDownIcon } from "./icons";

export const Button = styled.button<{ $variant?: "primary" | "secondary" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  border-radius: 8px;
  padding: 18px 32px;
  font-size: 16px;
  font-weight: 600;
  line-height: 1;
  transition: background-color 0.15s ease, color 0.15s ease;

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? css`
          background: var(--primary);
          color: var(--white);
          &:hover {
            background: var(--primary-hover);
          }
        `
      : css`
          background: var(--surface);
          color: var(--text);
          &:hover {
            background: var(--border);
          }
        `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);

  span.optional {
    color: var(--text-muted);
    font-weight: 400;
  }
`;

export const Input = styled.input`
  height: 56px;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--surface);
  padding: 0 16px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  width: 100%;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--primary);
    background: var(--white);
  }
`;

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    right: 16px;
    pointer-events: none;
    color: var(--text-secondary);
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  height: 56px;
  width: 100%;
  border: 1px solid transparent;
  border-radius: 8px;
  background: var(--surface);
  padding: 0 48px 0 16px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  cursor: pointer;

  &:invalid {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--primary);
    background: var(--white);
  }

  option {
    color: var(--text);
  }
`;

export function Select({
  placeholder,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & {
  placeholder: string;
  children: React.ReactNode;
}) {
  return (
    <SelectWrapper>
      <StyledSelect required {...props}>
        <option value="" disabled hidden>
          {placeholder}
        </option>
        {children}
      </StyledSelect>
      <ChevronDownIcon size={20} />
    </SelectWrapper>
  );
}

const CheckboxBox = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  flex: 0 0 auto;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--white);
  color: transparent;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;

  input:checked + & {
    background: var(--primary-light);
    border-color: var(--primary-light);
    color: var(--primary);
  }

  input:focus-visible + & {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
`;

const CheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-size: 16px;
  font-weight: 600;
  color: var(--text);
  cursor: pointer;

  input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }
`;

export function Checkbox({
  children,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  children: React.ReactNode;
}) {
  return (
    <CheckboxLabel>
      <input type="checkbox" {...props} />
      <CheckboxBox>
        <CheckIcon size={14} strokeWidth={3} />
      </CheckboxBox>
      {children}
    </CheckboxLabel>
  );
}
