import { NextResponse } from "next/server";

/**
 * Contact form → Resend (REST API, no extra dependency).
 *
 * Env vars (.env.local locally, Project Settings → Environment Variables on Vercel):
 *   RESEND_API_KEY      required, "Sending access" key for t3xture.dev
 *   CONTACT_FROM_EMAIL  optional, defaults to hello@t3xture.dev (must be on the verified domain)
 *   CONTACT_TO_EMAIL    optional, defaults to hello@t3xture.dev (forwarded to Gmail by Email Routing)
 */

export const runtime = "nodejs";

const FROM = process.env.CONTACT_FROM_EMAIL ?? "hello@t3xture.dev";
const TO = process.env.CONTACT_TO_EMAIL ?? "hello@t3xture.dev";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort limiter: 5 messages / 10 min per IP (per server instance).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field. Pretend success for bots.
  if (clean(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = clean(body.name, 100);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);
  const phone = clean(body.phone, 30);
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid =
    !phone || (/^[+\d\s().-]+$/.test(phone) && phoneDigits.length >= 7 && phoneDigits.length <= 15);
  // A wa.me link only works with an international number (+… or 00…).
  const whatsappUrl =
    phone && (phone.startsWith("+") || phone.startsWith("00"))
      ? `https://wa.me/${phone.startsWith("00") ? phoneDigits.slice(2) : phoneDigits}`
      : "";

  if (!name || !EMAIL_RE.test(email) || !phoneValid || message.length < 10) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: `T3xture Portfolio <${FROM}>`,
      to: [TO],
      reply_to: email,
      subject: `New portfolio message from ${name.replace(/[\r\n]+/g, " ")}`,
      text: `Name: ${name}\nEmail: ${email}\n${phone ? `WhatsApp/Phone: ${phone}\n${whatsappUrl ? `Chat: ${whatsappUrl}\n` : "(no country code)\n"}` : ""}\n${message}`,
      html: `<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>
${
  phone
    ? `<p><strong>WhatsApp / Phone:</strong> ${escapeHtml(phone)}${
        whatsappUrl
          ? ` (<a href="${whatsappUrl}">Open in WhatsApp</a>)`
          : " (no country code)"
      }</p>`
    : ""
}
<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    }),
  });

  if (!response.ok) {
    console.error("[contact] Resend error", response.status, await response.text());
    return NextResponse.json({ ok: false }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
