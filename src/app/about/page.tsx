import type { Metadata } from "next";
import { LENS_ORDER, LENSES } from "@/lib/lenses";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="font-display text-display text-paper">About</h1>

      <div className="prose-odassity mt-10">
        <p>
          Odassity started as a passion project — a place to explore how we
          show up online, how we&rsquo;re perceived, and what it actually
          means to be socially aware when most of our lives are happening on
          a screen.
        </p>
        <p>
          I have been called socially awkward. Being conscious of how you
          come across hasn&rsquo;t been talked about enough. And that was
          before every post, comment, and repost started leaving a permanent
          digital impression of you.
        </p>
        <p>
          So I built this space — to share ideas, reflect, and dig into the
          nuances of human interaction, perception, and influence, for a
          generation chronically online.
        </p>
        <blockquote>
          Odassity is a mirror. A lab. A (deep) conversation starter.
        </blockquote>
      </div>

      <h2 className="mt-16 font-display text-2xl text-paper">
        The three lenses
      </h2>
      <p className="mt-2 text-paper-dim">
        As you explore our stories, you&rsquo;ll come across essays that fall
        into one of these three categories.
      </p>
      <div className="mt-6 flex flex-col gap-6">
        {LENS_ORDER.map((lens) => {
          const meta = LENSES[lens];
          return (
            <div key={lens} className="rounded-2xl border border-paper-faint/10 p-6">
              <span className={`text-xs font-medium uppercase tracking-[0.18em] ${meta.text}`}>
                {meta.label}
              </span>
              <p className="mt-2 font-display text-lg text-paper">{meta.tagline}</p>
              <p className="mt-2 text-sm text-paper-dim">{meta.description}</p>
            </div>
          );
        })}
      </div>

      <div className="prose-odassity mt-16">
        <h2>Empowering creators to become more confident in their own voice</h2>
        <p>
          Erving Goffman said we&rsquo;re all performing — managing
          impressions, reading rooms, adjusting our masks. He just
          didn&rsquo;t account for the internet, where the stage never
          closes, and the audience never leaves.
        </p>
        <p>
          The goal is simple: we&rsquo;re gathering writers, thinkers, and
          creators who are passionate about social perception, human
          behavior, and the nuances of online communication, to build a new
          creator habit — <strong>Odass</strong>.
        </p>
      </div>
    </div>
  );
}
