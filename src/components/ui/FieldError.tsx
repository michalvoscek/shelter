"use client";

import styled from "styled-components";

const ErrorText = styled.p<{ $visible: boolean }>`
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
