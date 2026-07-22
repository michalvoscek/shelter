import DonationShell from "@/components/donation/DonationShell";

export default function DonationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DonationShell>{children}</DonationShell>;
}
