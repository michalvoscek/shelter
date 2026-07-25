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
  id,
  className,
}: {
  error?: { message?: string };
  id: string;
  className?: string;
}) {
  return (
    <ErrorText
      id={id}
      role={error ? "alert" : undefined}
      $visible={!!error}
      className={className}
    >
      {error?.message || "\u00A0"}
    </ErrorText>
  );
}
