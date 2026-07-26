"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { CloseIcon } from "../icons";

const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  width: 100%;
  max-width: 480px;
`;

const AlertWrap = styled.section<{ $variant: "error" | "success" }>`
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid
    ${({ $variant }) => ($variant === "error" ? "var(--danger)" : "var(--success)")};
  background: ${({ $variant }) =>
    $variant === "error" ? "var(--danger-light)" : "var(--success-light)"};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`;

const AlertHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
`;

const AlertHeading = styled.h2`
  font-size: 18px;
  font-weight: 700;

  &:focus {
    outline: none;
  }
`;

const CloseButton = styled.button`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: 6px;
  color: var(--text);

  &:hover {
    background: rgba(17, 24, 39, 0.08);
  }

  &:focus-visible {
    outline: 2px solid var(--text);
    outline-offset: 2px;
  }
`;

const AlertList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-left: 20px;
  font-size: 15px;
  line-height: 1.4;
`;

export type ToastVariant = "error" | "success";

export function Toast({
  variant,
  title,
  messages,
  onClose,
}: {
  variant: ToastVariant;
  title: string;
  messages: { message: string }[];
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    headingRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    headingRef.current?.focus();
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [mounted, onClose]);

  if (!mounted) return null;

  return createPortal(
    <ToastContainer>
      <AlertWrap
        $variant={variant}
        role="alert"
        aria-live="assertive"
      >
        <AlertHeader>
          <AlertHeading ref={headingRef} tabIndex={-1}>
            {title}
          </AlertHeading>
          <CloseButton type="button" aria-label="Zavrieť oznámenie" onClick={onClose}>
            <CloseIcon size={18} />
          </CloseButton>
        </AlertHeader>
        <AlertList>
          {messages.map((m, i) => (
            <li key={i}>{m.message}</li>
          ))}
        </AlertList>
      </AlertWrap>
    </ToastContainer>,
    document.body,
  );
}
