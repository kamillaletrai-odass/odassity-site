import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import AboutContent from "@/components/AboutContent";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutContent />
    </>
  );
}
