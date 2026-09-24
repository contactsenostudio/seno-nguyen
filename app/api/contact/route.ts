import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// In-memory rate limit: max 3 submissions per IP per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 3;
const WINDOW_MS = 60 * 60 * 1000; // 1 hour

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= LIMIT) return false;
  entry.count++;
  return true;
}

export async function POST(req: Request) {
  // ── Rate limiting ──
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ ok: false, reason: "rate_limit" }, { status: 429 });
  }

  const body = await req.json();
  const { prenom, nom, email, tel, type, date, message, _hp, _ts } = body;

  // ── Honeypot (bots remplissent ce champ caché, humains non) ──
  if (_hp) {
    return NextResponse.json({ ok: false }, { status: 200 }); // faux succès pour ne pas alerter le bot
  }

  // ── Timing check : moins de 4 secondes = bot ──
  const elapsed = Date.now() - Number(_ts);
  if (!_ts || elapsed < 4000) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
  });

  const html = `
    <h2>Nouvelle demande — Seno Studio</h2>
    <table cellpadding="8" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">
      <tr><td><b>Prénom</b></td><td>${prenom}</td></tr>
      <tr><td><b>Nom</b></td><td>${nom}</td></tr>
      <tr><td><b>Email</b></td><td>${email}</td></tr>
      ${tel ? `<tr><td><b>Téléphone</b></td><td>${tel}</td></tr>` : ""}
      ${type ? `<tr><td><b>Type</b></td><td>${type}</td></tr>` : ""}
      ${date ? `<tr><td><b>Date</b></td><td>${date}</td></tr>` : ""}
      ${message ? `<tr><td><b>Message</b></td><td style="white-space:pre-wrap">${message}</td></tr>` : ""}
    </table>
  `;

  try {
    await transporter.sendMail({
      from: `"Seno Studio" <${process.env.GMAIL_USER}>`,
      to: "contact.senostudio@gmail.com",
      replyTo: email,
      subject: `Nouvelle demande — ${prenom} ${nom}${type ? ` · ${type}` : ""}`,
      html,
    });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Mail error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
