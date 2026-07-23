"use client";

import styled from "styled-components";
import { ChevronDownIcon } from "../icons";

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
