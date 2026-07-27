"use client";

import { Field, ShelterCombobox, ModeToggle, AmountInput } from "../ui";
import { useDonationForm } from "../donation/DonationContext";
import { Section, SectionTitle } from "../donation/DonationShell";

export default function Step1Amount() {
  const { watch } = useDonationForm();
  const mode = watch("mode");

  return (
    <>
      <Section>
        <ModeToggle name="mode" />
        <SectionTitle>O projekte</SectionTitle>
        <Field>
          <span>
            Útulok{" "}
            {mode === "foundation" ? (
              <span className="optional">(Nepovinné)</span>
            ) : null}
          </span>
          <ShelterCombobox
            name="shelterID"
            placeholder="Vyberte útulok zo zoznamu"
          />
        </Field>
      </Section>

      <Section>
        <SectionTitle>Suma, ktorou chcem prispieť</SectionTitle>
        <AmountInput name="amount" />
      </Section>
    </>
  );
}
