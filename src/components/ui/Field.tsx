"use client";

import { useController } from "react-hook-form";
import styled from "styled-components";
import { FieldError } from "./FieldError";

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

const StyledInput = styled.input<{ $hasError: boolean }>`
  height: 56px;
  border: 1px solid ${({ $hasError }) => ($hasError ? "var(--danger)" : "transparent")};
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

export function Input({
  name,
  ...props
}: { name: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  const { field, fieldState } = useController({ name });
  const hasError = !!fieldState.error;
  const errorId = `${name}-error`;

  return (
    <>
      <StyledInput
        $hasError={hasError}
        aria-invalid={hasError || undefined}
        aria-describedby={hasError ? errorId : undefined}
        aria-errormessage={hasError ? errorId : undefined}
        {...props}
        {...field}
      />
      <FieldError error={fieldState.error} id={errorId} />
    </>
  );
}
