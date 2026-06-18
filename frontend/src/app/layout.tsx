import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/src/components/shared/Footer";
import { Header } from "@/src/components/shared/navbar/navbar";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dinamo tbilisi",
  description: "თბილისის დინამოს ოფიციალური ფან-პლატფორმა",
  icons: {
    icon: "https://erovnuliliga.ge/sites/default/files/2018-02/dinamo-tbilisi-en.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0e0e0e]">
        <Header />
        <main className="pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
