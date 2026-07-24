"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import styled from "styled-components";
import PageLayout from "./PageLayout";
import { ArrowLeftIcon } from "./icons";

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  align-self: flex-start;
  color: var(--primary);
  font-size: 16px;
  font-weight: 600;

  &:hover {
    color: var(--primary-hover);
  }
`;

export default function SubPage({
  title,
  children,
}: {
  title?: ReactNode;
  children: ReactNode;
}) {
  return (
    <PageLayout
      header={
        <BackLink href="/">
          <ArrowLeftIcon size={18} /> Späť
        </BackLink>
      }
      title={title}
    >
      {children}
    </PageLayout>
  );
}
