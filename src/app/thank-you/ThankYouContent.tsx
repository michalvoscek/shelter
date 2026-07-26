"use client";

import { useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import SubPage from "@/components/SubPage";
import { CheckIcon } from "@/components/icons";

const Card = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 24px;
  max-width: 560px;
  margin: 80px auto 0;

  @media (max-width: 640px) {
    margin-top: 40px;
  }
`;

const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: var(--success-light);
  color: var(--success);
`;

const Heading = styled.h1`
  font-size: 32px;
  font-weight: 800;
  line-height: 1.15;

  &:focus {
    outline: none;
  }
`;

const AboutLink = styled(Link)`
  color: var(--primary);
  font-weight: 600;
  font-size: 16px;

  &:hover {
    color: var(--primary-hover);
  }

  &:focus-visible {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
    border-radius: 4px;
  }
`;

export default function ThankYouContent() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  return (
    <SubPage>
      <Card role="status" aria-live="polite">
        <IconWrap>
          <CheckIcon size={32} />
        </IconWrap>
        <Heading ref={headingRef} tabIndex={-1}>
          Príspevok bol úspešne zaznamenaný
        </Heading>
        <AboutLink href="/about">Viac o projekte</AboutLink>
      </Card>
    </SubPage>
  );
}
