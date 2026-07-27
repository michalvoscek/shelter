"use client";

import { useRef, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { useShelters, type Shelter } from "../../hooks/useShelters";
import { ChevronDownIcon } from "../icons";
import { FieldError } from "./FieldError";

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  height: 56px;
  width: 100%;
  border: 1px solid ${({ $hasError }) => ($hasError ? "var(--danger)" : "transparent")};
  border-radius: 8px;
  background: var(--surface);
  padding: 0 48px 0 16px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  cursor: pointer;

  &::placeholder {
    color: var(--text-muted);
  }

  &:focus {
    border-color: var(--primary);
    background: var(--white);
  }
`;

const IconWrapper = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--text-secondary);
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  max-height: 256px;
  overflow-y: auto;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--white);
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Option = styled.button<{ $highlighted: boolean }>`
  display: block;
  width: 100%;
  padding: 12px 16px;
  text-align: left;
  font-size: 16px;
  color: var(--text);
  background: ${({ $highlighted }) => ($highlighted ? "var(--surface)" : "transparent")};
  border: none;
  cursor: pointer;

  &:hover {
    background: var(--surface);
  }
`;

const StatusMessage = styled.div`
  padding: 12px 16px;
  font-size: 16px;
  color: var(--text-muted);
`;

const ErrorMsg = styled(StatusMessage)`
  color: var(--danger);
`;

type ShelterComboboxProps = {
  name: string;
  placeholder: string;
};

export function ShelterCombobox({
  name,
  placeholder,
}: ShelterComboboxProps) {
  const { field, fieldState } = useController({ name });
  const error = fieldState.error;
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);

  const { data: shelters, isLoading, isError } = useShelters(search);

  const currentShelter = shelters?.find((s) => s.id === field.value);

  const open = () => {
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const close = () => {
    setIsOpen(false);
    if (field.value !== null && currentShelter) {
      setSearch(currentShelter.name);
    }
  };

  const select = (shelter: Shelter) => {
    field.onChange(shelter.id);
    setSearch(shelter.name);
    setIsOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (!isOpen) setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        open();
        e.preventDefault();
      }
      return;
    }

    const items = shelters ?? [];

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < items.length - 1 ? prev + 1 : 0,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : items.length - 1,
        );
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < items.length) {
          select(items[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    close();
  };

  return (
    <Wrapper ref={containerRef}>
      <StyledInput
        type="text"
        value={search}
        onChange={handleInputChange}
        onFocus={open}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-errormessage={error ? `${name}-error` : undefined}
        aria-expanded={isOpen}
        aria-autocomplete="list"
        role="combobox"
        $hasError={!!error}
      />
      <IconWrapper>
        <ChevronDownIcon size={20} />
      </IconWrapper>

      {isOpen && (
        <Dropdown role="listbox">
          {isLoading && <StatusMessage>Načítavam…</StatusMessage>}
          {isError && <ErrorMsg>Chyba pri načítavaní útulkov</ErrorMsg>}
          {!isLoading && !isError && shelters?.length === 0 && (
            <StatusMessage>Nenašiel sa žiadny útulok</StatusMessage>
          )}
          {!isLoading &&
            !isError &&
            shelters?.map((shelter, index) => (
              <Option
                key={shelter.id}
                role="option"
                aria-selected={shelter.id === field.value}
                $highlighted={index === highlightedIndex}
                onMouseDown={(e) => {
                  e.preventDefault();
                  select(shelter);
                }}
                onMouseEnter={() => setHighlightedIndex(index)}
              >
                {shelter.name}
              </Option>
            ))}
        </Dropdown>
      )}
      <FieldError error={error} id={`${name}-error`} />
    </Wrapper>
  );
}
