"use client";

import Image from "next/image";
import styled from "styled-components";
import SubPage from "@/components/SubPage";
import { MailIcon, MapPinIcon, PhoneIcon } from "@/components/icons";

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  h2 {
    font-size: 20px;
    font-weight: 700;
  }

  p {
    color: var(--text-secondary);
    font-size: 16px;
  }

  a {
    color: var(--primary);
    font-size: 16px;
    font-weight: 600;
    margin-top: 8px;

    &:hover {
      color: var(--primary-hover);
      text-decoration: underline;
    }
  }
`;

const IconBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background: var(--primary-lighter);
  color: var(--primary);
  margin-bottom: 8px;
`;

const Photo = styled.div`
  position: relative;
  height: 480px;
  border-radius: 24px;
  overflow: hidden;

  @media (max-width: 960px) {
    height: 280px;
  }
`;

export default function KontaktContent() {
  return (
    <SubPage title="Kontakt">
      <Cards>
        <Card>
          <IconBadge>
            <MailIcon size={24} />
          </IconBadge>
          <h2>Email</h2>
          <p>Our friendly team is here to help.</p>
          <a href="mailto:hello@goodrequest.com">hello@goodrequest.com</a>
        </Card>
        <Card>
          <IconBadge>
            <MapPinIcon size={24} />
          </IconBadge>
          <h2>Office</h2>
          <p>Come say hello at our office HQ.</p>
          <a
            href="https://maps.google.com/?q=Obchodná 3D, 010 08 Žilina, Slovakia"
            target="_blank"
            rel="noreferrer"
          >
            Obchodná 3D, 010 08 Žilina, Slovakia
          </a>
        </Card>
        <Card>
          <IconBadge>
            <PhoneIcon size={24} />
          </IconBadge>
          <h2>Phone</h2>
          <p>Mon-Fri from 8am to 5pm.</p>
          <a href="tel:+421911750750">+421 911 750 750</a>
        </Card>
      </Cards>
      <Photo>
        <Image
          src="/images/dog-landscape.jpg"
          alt="Zlatý retriever na pláži pri západe slnka"
          fill
          loading="eager"
          sizes="(max-width: 960px) 100vw, 1220px"
          style={{ objectFit: "cover" }}
        />
      </Photo>
    </SubPage>
  );
}
