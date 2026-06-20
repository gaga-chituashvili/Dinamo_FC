import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/src/components/shared/Footer";
import { Header } from "@/src/components/shared/navbar/navbar";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dinamo-fc.vercel.app"),
  title: {
    default: "Dinamo Tbilisi FC — დინამო თბილისის ფან პლატფორმა",
    template: "%s | Dinamo Tbilisi FC",
  },
  description:
    "დინამო თბილისის არაოფიციალური ფან პლატფორმა — შემადგენლობა, მატჩები, სატურნირო ცხრილი, სიახლეები და კლუბის ისტორია.",
  keywords: [
    "Dinamo Tbilisi",
    "დინამო თბილისი",
    "FC Dinamo Tbilisi",
    "ფეხბურთი საქართველო",
    "ეროვნული ლიგა",
  ],
  icons: {
    icon: "https://erovnuliliga.ge/sites/default/files/2018-02/dinamo-tbilisi-en.png",
  },
  openGraph: {
    title: "Dinamo Tbilisi FC",
    description:
      "დინამო თბილისის ფან პლატფორმა — შემადგენლობა, მატჩები, ცხრილი, სიახლეები",
    url: "https://dinamo-fc.vercel.app",
    siteName: "Dinamo Tbilisi FC",
    locale: "ka_GE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dinamo Tbilisi FC",
    description: "დინამო თბილისის ფან პლატფორმა",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ka"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0e0e0e]">
        <Header />
        <main className="pt-14">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
