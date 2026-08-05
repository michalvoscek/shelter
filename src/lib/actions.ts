"use server";

import { updateTag } from "next/cache";

export async function refreshDonationStatus() {
  updateTag("donation-status");
}
