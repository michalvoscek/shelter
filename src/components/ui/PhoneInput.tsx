"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { useController } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { CZ, SK } from "country-flag-icons/react/3x2";
import { ChevronDownIcon } from "../icons";
import { FieldError } from "./FieldError";

export const PhoneRow = styled.div<{ $hasError: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid ${({ $hasError }) => ($hasError ? "var(--danger)" : "transparent")};
  border-radius: 8px;
  padding: 6px;
  transition: border-color 0.15s ease, background-color 0.15s ease;

  &:focus-within {
    border-color: var(--primary);
    background: var(--white);
  }

  input {
    flex: 1;
    border: none;
    background: none;
    outline: none;
    height: 44px;
    font-size: 16px;
    color: var(--text);
    padding: 0 10px 0 4px;

    &::placeholder {
      color: var(--text-muted);
    }
  }
`;

export const PrefixButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--white);
  border-radius: 6px;
  padding: 10px 12px;
  box-shadow: 0 1px 2px rgba(16, 24, 40, 0.08);
  color: var(--text-secondary);
`;

export const PrefixMenu = styled.div`
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 2px;
  background: var(--white);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 4px;
  box-shadow: 0 8px 24px rgba(16, 24, 40, 0.12);

  button {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 15px;
    color: var(--text);

    &:hover {
      background: var(--surface);
    }
  }
`;

export const PrefixWrap = styled.div`
  position: relative;
`;

interface PhoneFieldProps {
  phoneName?: string;
}

export function PhoneField({ phoneName = "phone" }: PhoneFieldProps) {
  const { field, fieldState } = useController({ name: phoneName });
  const [prefixOpen, setPrefixOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const prefixWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!prefixOpen) return;
    const handler = (e: MouseEvent) => {
      if (prefixWrapRef.current && !prefixWrapRef.current.contains(e.target as Node)) {
        setPrefixOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [prefixOpen]);

  const phoneError = !!fieldState.error;
  const errorId = `${phoneName}-error`;

  const flag = field.value?.startsWith("+421")
    ? "SK"
    : field.value?.startsWith("+420")
      ? "CZ"
      : null;

  const changePrefix = (prefix: "+421" | "+420") => {
    field.onChange(prefix);
    setPrefixOpen(false);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleValueChange = ({ formattedValue }: { formattedValue: string }) => {
    field.onChange(formattedValue);
  };

  return (
    <>
      <PhoneRow $hasError={phoneError}>
        <PrefixWrap ref={prefixWrapRef}>
          <PrefixButton
            type="button"
            aria-label="Predvoľba krajiny"
            onClick={() => setPrefixOpen((o) => !o)}
          >
            {flag === "SK" && <SK title="Slovensko" style={{ width: 22 }} />}
            {flag === "CZ" && <CZ title="Česko" style={{ width: 22 }} />}
            <ChevronDownIcon size={16} />
          </PrefixButton>
          {prefixOpen && (
            <PrefixMenu>
              <button type="button" onClick={() => changePrefix("+421")}>
                <SK title="Slovensko" style={{ width: 22 }} /> +421
              </button>
              <button type="button" onClick={() => changePrefix("+420")}>
                <CZ title="Česko" style={{ width: 22 }} /> +420
              </button>
            </PrefixMenu>
          )}
        </PrefixWrap>
        <PatternFormat
          format="+### ### ### ###"
          allowEmptyFormatting
          value={field.value}
          onValueChange={handleValueChange}
          getInputRef={(el: HTMLInputElement | null) => {
            field.ref(el);
            inputRef.current = el;
          }}
          type="tel"
          name={field.name}
          onBlur={field.onBlur}
          placeholder="+421 123 456 789"
          aria-invalid={phoneError}
          aria-describedby={phoneError ? errorId : undefined}
          aria-errormessage={phoneError ? errorId : undefined}
          autoComplete="tel"
        />
      </PhoneRow>
      <FieldError error={fieldState.error} id={errorId} />
    </>
  );
}
