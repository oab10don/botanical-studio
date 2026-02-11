import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Header from "@/components/Header";
import FixedFooter from "@/components/FixedFooter";
import DisclaimerModal from "@/components/DisclaimerModal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Botanical Studio",
  description: "植物と暮らす、新しい体験。3Dで植物を間近に感じてください。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} antialiased`}>
        <DisclaimerModal />
        <Header />
        <main className="pb-14">{children}</main>
        <FixedFooter />
      </body>
    </html>
  );
}
