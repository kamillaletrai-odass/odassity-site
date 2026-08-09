import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy & Cookies" };

export default function PrivacyPage() {
  return (
    <div className="px-6 pt-32 pb-24 sm:px-10">
      <div className="prose-odassity mx-auto max-w-2xl">
        <h1 className="font-display text-display text-paper">
          Privacy &amp; cookies
        </h1>

        <p>
          Odassity is a small, independent publication. We keep the data we
          collect to the minimum needed to run the site and understand who
          is reading it.
        </p>

        <h2>What we collect</h2>
        <p>
          If you accept cookies, we use Google Analytics (GA4) to see which
          stories people read, roughly where visitors come from, and general
          device/location info (never anything identifying you personally).
          If you decline, none of this is set and you are not tracked.
        </p>

        <h2>Forms</h2>
        <p>
          If you sign up for the newsletter, apply to write, or send a
          partnership inquiry, we store your email (and whatever else you
          submit) only to respond to you and, for the newsletter, to send
          future issues. We use Resend to send these emails. You can
          unsubscribe from the newsletter at any time.
        </p>

        <h2>Third parties</h2>
        <p>
          We don&rsquo;t sell or share your data. The only outside services
          involved are Google Analytics (site analytics) and Resend (email
          delivery), each bound by their own privacy policies.
        </p>

        <h2>Questions</h2>
        <p>
          Email{" "}
          <a href="mailto:kamilla@odassity.com">kamilla@odassity.com</a> for
          anything about your data or this page.
        </p>
      </div>
    </div>
  );
}
