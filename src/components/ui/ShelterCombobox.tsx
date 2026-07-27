"use client";

import { useEffect, useRef, useState } from "react";
import { useController } from "react-hook-form";
import styled from "styled-components";
import { useShelters, type Shelter } from "../../hooks/useShelters";
import { CheckIcon, ChevronDownIcon, CloseIcon } from "../icons";
import { FieldError } from "./FieldError";

const Wrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input<{ $hasError: boolean; $hasValue: boolean }>`
  height: 56px;
  width: 100%;
  border: 1px solid ${({ $hasError }) => ($hasError ? "var(--danger)" : "transparent")};
  border-radius: 8px;
  background: var(--surface);
  padding: 0 ${({ $hasValue }) => ($hasValue ? "76px" : "48px")} 0 16px;
  font-size: 16px;
  color: var(--text);
  outline: none;
  cursor: text;

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
  top: 0;
  height: 56px;
  display: flex;
  align-items: center;
  pointer-events: none;
  color: var(--text-secondary);
`;

const ClearButton = styled.button`
  position: absolute;
  right: 44px;
  top: 0;
  height: 56px;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;

  &:hover {
    color: var(--text);
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
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
  const [isFocused, setIsFocused] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const justFocusedRef = useRef(false);

  const hasValue = field.value !== null;
  const selectedName: string = field.value?.name ?? "";
  // Untouched selected name in the input means "show everything", not a filter.
  const query = search === selectedName ? "" : search;
  const { data: shelters, isLoading, isError } = useShelters(query);

  const items = shelters ?? [];
  const listboxId = `${name}-listbox`;
  const activeDescendant =
    highlightedIndex >= 0 && highlightedIndex < items.length
      ? `${name}-option-${items[highlightedIndex].id}`
      : undefined;

  useEffect(() => {
    if (activeDescendant) {
      document
        .getElementById(activeDescendant)
        ?.scrollIntoView({ block: "nearest" });
    }
  }, [activeDescendant]);

  const open = () => {
    setIsOpen(true);
    setHighlightedIndex(-1);
  };

  const close = () => {
    setIsOpen(false);
  };

  const select = (shelter: Shelter) => {
    field.onChange({ id: shelter.id, name: shelter.name });
    setSearch(shelter.name);
    setIsOpen(false);
  };

  const handleClear = () => {
    // Focus first: the resulting focus event still sees the old value and
    // pre-fills the search with the selected name, so clearing the search
    // must happen afterwards to win.
    inputRef.current?.focus();
    field.onChange(null);
    setSearch("");
    open();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (!isOpen) setIsOpen(true);
    setHighlightedIndex(-1);
    if (value === "" && hasValue) {
      field.onChange(null);
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    open();
    if (hasValue) {
      // Pre-fill with the selected name and select it, so typing replaces it
      // and the dropdown opens unfiltered.
      setSearch(selectedName);
      justFocusedRef.current = true;
      e.target.select();
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    // Keep the select-all from the focus event for the first mouse click.
    if (justFocusedRef.current) {
      e.preventDefault();
      justFocusedRef.current = false;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        open();
        e.preventDefault();
      }
      return;
    }

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
        if (hasValue) setSearch(selectedName);
        close();
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (containerRef.current?.contains(e.relatedTarget as Node)) {
      return;
    }
    setIsFocused(false);
    field.onBlur();
    close();
  };

  return (
    <Wrapper ref={containerRef} onBlur={handleBlur}>
      <StyledInput
        ref={(el) => {
          inputRef.current = el;
          field.ref(el);
        }}
        type="text"
        value={isFocused ? search : selectedName}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onMouseUp={handleMouseUp}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        aria-errormessage={error ? `${name}-error` : undefined}
        aria-expanded={isOpen}
        aria-controls={listboxId}
        aria-activedescendant={activeDescendant}
        aria-autocomplete="list"
        role="combobox"
        $hasError={!!error}
        $hasValue={hasValue}
      />
      {hasValue && (
        <ClearButton
          type="button"
          aria-label="Zmazať výber"
          onClick={handleClear}
        >
          <CloseIcon size={18} />
        </ClearButton>
      )}
      <IconWrapper>
        <ChevronDownIcon size={20} />
      </IconWrapper>

      {isOpen && (
        <Dropdown role="listbox" id={listboxId}>
          {isLoading && <StatusMessage>Načítavam…</StatusMessage>}
          {isError && <ErrorMsg>Chyba pri načítavaní útulkov</ErrorMsg>}
          {!isLoading && !isError && items.length === 0 && (
            <StatusMessage>Nenašiel sa žiadny útulok</StatusMessage>
          )}
          {!isLoading &&
            !isError &&
            items.map((shelter, index) => {
              const isSelected = hasValue && shelter.id === field.value.id;
              return (
                <Option
                  key={shelter.id}
                  id={`${name}-option-${shelter.id}`}
                  role="option"
                  aria-selected={isSelected}
                  $highlighted={index === highlightedIndex}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    select(shelter);
                  }}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  {shelter.name}
                  {isSelected && (
                    <CheckIcon size={18} color="var(--primary)" />
                  )}
                </Option>
              );
            })}
        </Dropdown>
      )}
      <FieldError error={error} id={`${name}-error`} />
    </Wrapper>
  );
}
