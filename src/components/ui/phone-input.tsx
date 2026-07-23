"use client";

import styled from "styled-components";

export const PhoneRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--surface);
  border: 1px solid transparent;
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

export const PhoneInputWrap = styled.div`
  position: relative;
  flex: 1;

  input {
    padding-left: 56px;
  }
`;

export const PrefixVisual = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text);
  font-size: 16px;
  pointer-events: none;
  z-index: 1;
`;
