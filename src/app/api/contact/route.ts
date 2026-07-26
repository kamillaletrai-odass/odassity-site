import { NextResponse } from "next/server";
import { Resend } from "resend";

const TO_EMAIL = "kamilla@odassity.com";
const FROM_EMAIL = "Odassity <onboarding@resend.dev>";

type NewsletterPayload = { type: "newsletter"; email: string };
type WriterPayload = {
  type: "writer";
  name: string;
  email: string;
  why: string;
  experience?: string;
  substack?: string;
  linkedin?: string;
};

function isNewsletter(body: unknown): body is NewsletterPayload {
  return (
    !!body &&
    typeof body === "object" &&
    (body as { type?: unknown }).type === "newsletter" &&
    typeof (body as { email?: unknown }).email === "string"
  );
}

function isWriter(body: unknown): body is WriterPayload {
  return (
    !!body &&
    typeof body === "object" &&
    (body as { type?: unknown }).type === "writer" &&
    typeof (body as { name?: unknown }).name === "string" &&
    typeof (body as { email?: unknown }).email === "string" &&
    typeof (body as { why?: unknown }).why === "string"
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  let subject: string;
  let text: string;

  if (isNewsletter(body)) {
    subject = "New newsletter signup";
    text = `New subscriber: ${body.email}`;
  } else if (isWriter(body)) {
    subject = `New writer submission: ${body.name}`;
    text = [
      `Name: ${body.name}`,
      `Email: ${body.email}`,
      `Why: ${body.why}`,
      body.experience ? `Experience: ${body.experience}` : null,
      body.substack ? `Substack: ${body.substack}` : null,
      body.linkedin ? `LinkedIn: ${body.linkedin}` : null,
    ]
      .filter(Boolean)
      .join("\n");
  } else {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn(
      "[api/contact] RESEND_API_KEY not set — skipping email send.\n" +
        `Would have sent: ${subject}\n${text}`,
    );
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      text,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[api/contact] Resend send failed", err);
    return NextResponse.json({ error: "Send failed" }, { status: 502 });
  }
}
