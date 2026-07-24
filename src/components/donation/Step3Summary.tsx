"use client";

import styled from "styled-components";
import { Checkbox, FieldError } from "../ui";
import { useDonationForm } from "../donation/DonationContext";
import {
  Section,
  SectionTitle,
  Divider,
} from "../donation/DonationShell";
import { useShelters } from "../../hooks/useShelters";

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

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 4px;

    dd {
      text-align: left;
    }
  }
`;

export default function Step3Summary() {
  const {
    register,
    watch,
    formState: { errors },
  } = useDonationForm();
  const data = watch();
  const { data: shelters } = useShelters("");
  const shelterName = shelters?.find((s) => s.id === data.shelterID)?.name;

  return (
    <>
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
            <dd>{shelterName || "—"}</dd>
          </SummaryRow>
          <SummaryRow>
            <dt>Suma príspevku</dt>
            <dd>
              {data.amount
                ? `${data.amount.toLocaleString("sk-SK", { maximumFractionDigits: 2 })} €`
                : "—"}
            </dd>
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
        <Checkbox aria-invalid={!!errors.gdpr} {...register("gdpr")}>
          Súhlasím so spracovaním mojich osobných údajov
        </Checkbox>
        <FieldError error={errors.gdpr} />
      </Section>
    </>
  );
}
