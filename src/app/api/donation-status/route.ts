import { getDonationStatus } from "@/lib/donationStatus";

export async function GET() {
  try {
    const status = await getDonationStatus();
    return Response.json(status);
  } catch {
    return Response.json(
      { error: "Donation status is currently unavailable." },
      { status: 502 },
    );
  }
}
