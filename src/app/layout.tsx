import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "@/lib/registry";
import Providers from "@/lib/providers";
import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core';
import "./globals.css";
import '@mantine/core/styles.layer.css';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Good boy — Nadácia Good Boy",
  description: "Podporte slovenské útulky pre psov.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sk" className={inter.variable} {...mantineHtmlProps}>
      <head><ColorSchemeScript /></head>
      <body>
        <a href="#main-content" className="skip-link">
          Preskočiť na hlavný obsah
        </a>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
