import type { DonationStatus } from "@/lib/types/apiTypes";

const UPSTREAM_URL =
  "https://frontend-assignment-api.goodrequest.dev/api/v1/shelters/results";

export async function getDonationStatus(): Promise<DonationStatus> {
  const res = await fetch(UPSTREAM_URL, {
    next: { tags: ["donation-status"], revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Donation status upstream responded with ${res.status}`);
  }

  const data = (await res.json()) as Partial<DonationStatus>;
  if (
    typeof data.contribution !== "number" ||
    typeof data.contributors !== "number"
  ) {
    throw new Error("Donation status upstream returned an unexpected shape");
  }

  return { contribution: data.contribution, contributors: data.contributors };
}
