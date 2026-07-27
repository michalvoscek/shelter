"use client";

import { useController, useFormContext } from "react-hook-form";
import styled, { css } from "styled-components";

const ModeToggleRoot = styled.div`
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

interface ModeToggleProps {
  name: string;
}

export function ModeToggle({ name }: ModeToggleProps) {
  const { field } = useController({ name });
  const { clearErrors } = useFormContext();

  return (
    <ModeToggleRoot role="radiogroup" aria-label="Forma pomoci">
      <ModeButton
        role="radio"
        aria-checked={field.value === "shelter"}
        $active={field.value === "shelter"}
        onClick={() => field.onChange("shelter")}
      >
        Prispieť konkrétnemu útulku
      </ModeButton>
      <ModeButton
        role="radio"
        aria-checked={field.value === "foundation"}
        $active={field.value === "foundation"}
        onClick={() => {
          field.onChange("foundation");
          clearErrors("shelterID");
        }}
      >
        Prispieť celej nadácii
      </ModeButton>
    </ModeToggleRoot>
  );
}
