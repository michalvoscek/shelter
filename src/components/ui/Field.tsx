"use client";

import styled from "styled-components";

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
