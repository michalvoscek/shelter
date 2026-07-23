"use client";

import { useMutation } from "@tanstack/react-query";

export type ApiMessageType = "ERROR" | "WARNING" | "INFO" | "SUCCESS";

export type ApiMessage = {
  message: string;
  type: ApiMessageType;
};

export type SubmitDonationPayload = {
  contributors: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }[];
  shelterID: number | null;
  value: number;
};

type ContributeResponse = {
  messages?: ApiMessage[];
};

export class SubmissionError extends Error {
  messages: ApiMessage[];

  constructor(messages: ApiMessage[]) {
    super(messages[0]?.message ?? "Formulár sa nepodarilo odoslať.");
    this.name = "SubmissionError";
    this.messages = messages;
  }
}

export function useSubmitDonation() {
  return useMutation<ApiMessage[], SubmissionError, SubmitDonationPayload>({
    mutationFn: async (payload) => {
      const body: Record<string, unknown> = {
        contributors: payload.contributors,
        value: payload.value,
      };
      if (payload.shelterID !== null) {
        body.shelterID = payload.shelterID;
      }

      let res: Response;
      try {
        res = await fetch(
          "https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/contribute",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              accept: "application/json",
            },
            body: JSON.stringify(body),
          },
        );
      } catch {
        throw new SubmissionError([
          {
            message: "Nepodarilo sa nadviazať spojenie so serverom. Skúste to znova.",
            type: "ERROR",
          },
        ]);
      }

      const data: ContributeResponse = await res.json().catch(() => ({}));
      const messages = data.messages ?? [];

      if (!res.ok) {
        throw new SubmissionError(
          messages.length
            ? messages
            : [
                {
                  message: "Formulár sa nepodarilo odoslať. Skúste to znova.",
                  type: "ERROR",
                },
              ],
        );
      }

      return messages;
    },
  });
}