"use client";

import Link from "next/link";
import styled from "styled-components";
import Footer from "./Footer";
import { ArrowLeftIcon } from "./icons";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  gap: 48px;
  max-width: 1440px;
  margin: 0 auto;
  padding: 48px 110px 40px;
  min-height: 100dvh;

  @media (max-width: 960px) {
    padding: 32px 24px;
  }
`;

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

const Content = styled.div`
  flex: 1;
`;

export default function SubPage({ children }: { children: React.ReactNode }) {
  return (
    <Wrapper>
      <BackLink href="/">
        <ArrowLeftIcon size={18} /> Späť
      </BackLink>
      <Content>{children}</Content>
      <Footer />
    </Wrapper>
  );
}
