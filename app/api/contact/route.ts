import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { prenom, nom, email, type, date, lieu, message } = await req.json();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const html = `
    <h2>Nouvelle demande de contact — Seno Studio</h2>
    <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:15px">
      <tr><td><strong>Prénom</strong></td><td>${prenom}</td></tr>
      <tr><td><strong>Nom</strong></td><td>${nom}</td></tr>
      <tr><td><strong>Email</strong></td><td>${email}</td></tr>
      ${type  ? `<tr><td><strong>Type d'événement</strong></td><td>${type}</td></tr>` : ""}
      ${date  ? `<tr><td><strong>Date</strong></td><td>${date}</td></tr>` : ""}
      ${lieu  ? `<tr><td><strong>Lieu</strong></td><td>${lieu}</td></tr>` : ""}
      ${message ? `<tr><td><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>` : ""}
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
