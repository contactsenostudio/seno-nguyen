import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { prenom, nom, email, tel, type, date, message } = await req.json();

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
