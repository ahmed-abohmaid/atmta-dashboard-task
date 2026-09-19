import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "لوحة التحكم | منصة أتمتة",
  description: "لوحة التحكم الإدارية لمنصة أتمتة",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`dark ${cairo.variable} h-full antialiased`}>
      <body className="bg-background text-foreground flex min-h-full flex-col font-sans">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
