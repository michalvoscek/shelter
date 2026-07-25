"use client";

import styled from "styled-components";
import { CheckIcon } from "../icons";

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
  errorId,
  hasError,
  ...props
}: {
  errorId: string;
  hasError: boolean;
  children: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <CheckboxLabel>
      <input
        type="checkbox"
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        aria-errormessage={hasError ? errorId : undefined}
        {...props}
      />
      <CheckboxBox>
        <CheckIcon size={14} strokeWidth={3} />
      </CheckboxBox>
      {children}
    </CheckboxLabel>
  );
}
