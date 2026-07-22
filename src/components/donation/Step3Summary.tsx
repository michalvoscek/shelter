"use client";

import styled from "styled-components";
import { Checkbox } from "../ui";
import { useDonation } from "../donation/DonationContext";
import {
  Heading,
  Section,
  SectionTitle,
  Divider,
} from "../donation/DonationShell";

const SummaryList = styled.dl`
  display: flex;
  flex-direction: column;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 24px;
  padding: 14px 0;

  dt {
    color: var(--text-secondary);
    font-size: 16px;
  }

  dd {
    font-size: 16px;
    font-weight: 700;
    text-align: right;
  }
`;

export default function Step3Summary() {
  const { data, set } = useDonation();

  return (
    <>
      <Heading>Skontrolujte si zadané údaje</Heading>

      <Section>
        <SectionTitle>Zhrnutie</SectionTitle>
        <SummaryList>
          <SummaryRow>
            <dt>Forma pomoci</dt>
            <dd>
              {data.mode === "foundation"
                ? "Finančný príspevok celej nadácii"
                : "Finančný príspevok konkrétnemu útulku"}
            </dd>
          </SummaryRow>
          <SummaryRow>
            <dt>Útulok</dt>
            <dd>{data.shelter || "—"}</dd>
          </SummaryRow>
          <SummaryRow>
            <dt>Suma príspevku</dt>
            <dd>{data.amount ? `${data.amount} €` : "—"}</dd>
          </SummaryRow>
        </SummaryList>
        <Divider />
        <SummaryList>
          <SummaryRow>
            <dt>Meno a priezvisko</dt>
            <dd>
              {[data.firstName, data.lastName].filter(Boolean).join(" ") || "—"}
            </dd>
          </SummaryRow>
          <SummaryRow>
            <dt>E-mail</dt>
            <dd>{data.email || "—"}</dd>
          </SummaryRow>
          <SummaryRow>
            <dt>Telefónne číslo</dt>
            <dd>{data.phone || "—"}</dd>
          </SummaryRow>
        </SummaryList>
        <Divider />
        <Checkbox
          checked={data.gdpr}
          onChange={(e) => set("gdpr", e.target.checked)}
        >
          Súhlasím so spracovaním mojich osobných údajov
        </Checkbox>
      </Section>
    </>
  );
}
