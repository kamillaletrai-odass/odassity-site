import type { Metadata } from "next";
import AboutHero from "@/components/AboutHero";
import Partnerships from "@/components/Partnerships";
import ScrollReveal from "@/components/ScrollReveal";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <AboutHero />

      <section className="px-6 py-16 sm:px-10 sm:py-20">
        <ScrollReveal className="mx-auto max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-paper-faint uppercase">
            [ About ]
          </span>
          <div className="prose-odassity mt-6">
            <p>
              I market for a living, write because I have to, and spend most
              of my free hours somewhere in between. Mostly here. I grew up
              between languages and countries, which maybe explains why
              I&rsquo;ve never fully trusted the easy, agreed-upon version of
              anything. I&rsquo;m the person who reads philosophy for fun and
              still can&rsquo;t stop rearranging a room until the light hits
              it right.
            </p>
          </div>
        </ScrollReveal>
      </section>

      <section className="border-t border-paper-faint/10 px-6 py-16 sm:px-10 sm:py-20">
        <ScrollReveal className="mx-auto max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-paper-faint uppercase">
            [ Why Odassity ]
          </span>
          <div className="prose-odassity mt-6">
            <p>
              There&rsquo;s a breath everyone takes right before they do
              something bold, right before they say the true thing instead of
              the easy thing. Most of modern life is built to make you skip
              that breath entirely. Odassity is built to make you take it.
            </p>
            <p>
              I wanted a little world of my own, a bit ethereal, a bit
              utopian, entirely mine, and then I wanted to open the door and
              let other people in. Not to follow me. To find their own
              version of that same breath. To become a little more
              intentional in a life that&rsquo;s mostly designed to keep you
              reactive instead.
            </p>
            <blockquote>
              This isn&rsquo;t a brand I&rsquo;m building. It&rsquo;s a world
              I wanted to live inside, so I made it. And I&rsquo;d rather not
              live in it alone.
            </blockquote>
          </div>
        </ScrollReveal>
      </section>

      <section className="border-t border-paper-faint/10 px-6 py-16 sm:px-10 sm:py-20">
        <ScrollReveal className="mx-auto max-w-2xl">
          <span className="font-mono text-xs tracking-[0.2em] text-paper-faint uppercase">
            [ What You&rsquo;ll Find Here ]
          </span>
          <div className="prose-odassity mt-6">
            <p>
              New every season, never fast. Ideas you sit with, not scroll
              past. Writing meant to feed the mind in a way a five-second
              video never will. Recurring series designed to make you come
              back on purpose, not out of habit. Every piece ends the same
              way, a small, strange fable, never explained, yours to finish
              however you like.
            </p>
            <p>
              This is a place to have a conversation with yourself. To
              wrestle with an idea instead of just agreeing with it. For
              creators to share what they&rsquo;re actually thinking, not
              just what performs. A little whimsy dropped into an adult life
              that doesn&rsquo;t leave much room for it.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal
          delay={0.1}
          className="mx-auto mt-12 max-w-xl text-center"
        >
          <p className="font-display text-2xl text-paper italic sm:text-3xl">
            Read today. Understand tomorrow.
          </p>
          <p className="mt-3 text-paper-dim">
            That&rsquo;s what I work towards. A feed that feeds your brain.
          </p>
        </ScrollReveal>
      </section>

      <Partnerships />
    </>
  );
}
