"use client";

import styled from "styled-components";

export const NameGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
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

export const ErrorText = styled.p<{ $visible: boolean }>`
  font-size: 14px;
  font-weight: 500;
  color: var(--danger);
  visibility: ${({ $visible }) => ($visible ? "visible" : "hidden")};
`;

export function FieldError({
  error,
  className,
}: {
  error?: { message?: string };
  className?: string;
}) {
  return (
    <ErrorText
      role={error ? "alert" : undefined}
      $visible={!!error}
      className={className}
    >
      {error?.message || "\u00A0"}
    </ErrorText>
  );
}

export const Input = styled.input<{ $hasError: boolean }>`
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
