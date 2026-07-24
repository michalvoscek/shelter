"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import Footer from "./Footer";
import { Main } from "./Layout";

const SingleColumn = styled(Main)`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media (max-width: 960px) {
    padding: 20px 24px;
  }
`;

const HeaderSlot = styled.div`
  height: 56px;
  display: flex;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 56px;
  font-weight: 800;
  letter-spacing: -0.02em;

  @media (max-width: 960px) {
    font-size: 48px;
  }

  @media (max-width: 640px) {
    font-size: 36px;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 48px;
`;

const TwoColumn = styled(Main)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 42%);
  gap: 48px;
  padding: 24px 40px 24px 110px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    padding: 20px 24px;
  }
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 912px;
  width: 100%;
`;

export default function PageLayout({
  header,
  title,
  image,
  children,
}: {
  header?: ReactNode;
  title?: ReactNode;
  image?: ReactNode;
  children: ReactNode;
}) {
  const headerElement = header ? <HeaderSlot>{header}</HeaderSlot> : null;

  if (image) {
    return (
      <TwoColumn>
        <Column>
          {headerElement}
          {title && <Title>{title}</Title>}
          {children}
          <Footer />
        </Column>
        {image}
      </TwoColumn>
    );
  }

  return (
    <SingleColumn>
      {headerElement}
      {title && <Title>{title}</Title>}
      <Content>{children}</Content>
      <Footer />
    </SingleColumn>
  );
}
