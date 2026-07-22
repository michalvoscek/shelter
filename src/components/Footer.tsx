"use client";

import Link from "next/link";
import styled from "styled-components";
import Logo from "./Logo";
import { FacebookIcon, InstagramIcon } from "./icons";

const FooterBar = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding-top: 32px;
  border-top: 1px solid var(--border);
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 32px;

  a {
    display: inline-flex;
    align-items: center;
    color: var(--text);
    font-size: 16px;
    font-weight: 500;
    transition: color 0.15s ease;

    &:hover {
      color: var(--primary);
    }
  }

  a.icon {
    color: var(--text-secondary);
  }
`;

export default function Footer() {
  return (
    <FooterBar>
      <Logo />
      <Nav>
        <a
          className="icon"
          href="https://facebook.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon size={20} />
        </a>
        <a
          className="icon"
          href="https://instagram.com"
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon size={20} />
        </a>
        <Link href="/kontakt">Kontakt</Link>
        <Link href="/o-projekte">O projekte</Link>
      </Nav>
    </FooterBar>
  );
}
