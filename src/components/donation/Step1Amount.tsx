"use client";

import { Field, FieldError, ShelterCombobox, ModeToggle, AmountInput } from "../ui";
import { useDonationForm } from "../donation/DonationContext";
import { Section, SectionTitle } from "../donation/DonationShell";

export default function Step1Amount() {
  const {
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useDonationForm();
  const mode = watch("mode");
  const amount = watch("amount");
  const shelterID = watch("shelterID");

  return (
    <>
      <ModeToggle
        mode={mode}
        onChange={(newMode) => setValue("mode", newMode)}
        onChangeFoundation={() => clearErrors("shelterID")}
      />

      <Section>
        <SectionTitle>O projekte</SectionTitle>
        <Field>
          <span>
            Útulok{" "}
            {mode === "foundation" ? (
              <span className="optional">(Nepovinné)</span>
            ) : null}
          </span>
          <ShelterCombobox
            value={shelterID}
            onChange={(id) => setValue("shelterID", id, { shouldValidate: true })}
            placeholder="Vyberte útulok zo zoznamu"
            error={errors.shelterID}
          />
          <FieldError error={errors.shelterID} />
        </Field>
      </Section>

      <Section>
        <SectionTitle>Suma, ktorou chcem prispieť</SectionTitle>
        <AmountInput
          amount={amount}
          onChange={(newAmount) => setValue("amount", newAmount, { shouldValidate: true })}
          error={errors.amount}
        />
      </Section>
    </>
  );
}
