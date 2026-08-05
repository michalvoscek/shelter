export type ApiMessageType = "ERROR" | "WARNING" | "INFO" | "SUCCESS";

export type ApiMessage = {
  message: string;
  type: ApiMessageType;
};

export type DonationStatus = {
  contribution: number;
  contributors: number;
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

export class SubmissionError extends Error {
  messages: ApiMessage[];

  constructor(messages: ApiMessage[]) {
    super(messages[0]?.message ?? "Formulár sa nepodarilo odoslať.");
    this.name = "SubmissionError";
    this.messages = messages;
  }
}
