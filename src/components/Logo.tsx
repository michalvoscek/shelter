"use client";

import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: var(--text);
`;

export default function Logo() {
  return (
    <LogoLink href="/" aria-label="Good boy — domov">
      <Image src="/images/logo-dog.png" alt="" width={31} height={32} priority />
      Good boy
    </LogoLink>
  );
}
