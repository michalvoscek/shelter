import { z } from "zod";

const baseFields = {
  amount: z
    .number({ message: "Zadajte sumu, ktorou chcete prispieť" })
    .positive("Suma musí byť väčšia ako 0 €"),
  firstName: z
    .string()
    .min(2, "Meno musí mať 2 až 20 znakov")
    .max(20, "Meno musí mať 2 až 20 znakov")
    .or(z.literal("")),
  lastName: z
    .string()
    .min(2, "Priezvisko musí mať 2 až 30 znakov")
    .max(30, "Priezvisko musí mať 2 až 30 znakov"),
  email: z.email("Zadajte platnú e-mailovú adresu"),
  phonePrefix: z.enum(["+421", "+420"]),
  phone: z
    .string()
    .regex(
      /^\d{3}\s?\d{3}\s?\d{3}$/,
      "Zadajte platné telefónne číslo (9 číslic)",
    ),
  gdpr: z
    .boolean()
    .refine((value) => value, "Potvrďte súhlas so spracovaním osobných údajov"),
};

export const donationSchema = z.discriminatedUnion("mode", [
  z.object({
    mode: z.literal("shelter"),
    shelterID: z.number({ message: "Vyberte útulok zo zoznamu" }),
    ...baseFields,
  }),
  z.object({
    mode: z.literal("foundation"),
    shelterID: z.number().nullable(),
    ...baseFields,
  }),
]);

export type FormData = z.infer<typeof donationSchema>;
