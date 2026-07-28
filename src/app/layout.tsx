import type { Metadata } from "next";
import { Open_Sans, Figtree } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RippleEffect from "@/components/RippleEffect";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Odassity — Read today. Understand tomorrow.",
    template: "%s — Odassity",
  },
  description:
    "Psychology, social dynamics, and the art of being seen online. Essays for digital creators who want to understand themselves, not just perform for everyone else.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ink text-paper font-body">
        <RippleEffect />
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
