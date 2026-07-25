"use client";

import styled, { css } from "styled-components";

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
