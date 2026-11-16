import { NextResponse } from "next/server";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import nodemailer from "nodemailer";

// Receives the booking form: keeps a copy in data/inquiries.json and, when SMTP is set
// in .env.local, emails it to the studio.
const clean = (v: unknown, max: number) => (typeof v === "string" ? v.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "").trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (body.website) return NextResponse.json({ ok: true }); // bot

  const inquiry = {
    id: `AL-${Date.now().toString(36).toUpperCase()}`,
    receivedAt: new Date().toISOString(),
    name: clean(body.name, 120),
    email: clean(body.email, 160).replace(/[\r\n]/g, ""),
    phone: clean(body.phone, 40),
    date: clean(body.date, 20),
    venue: clean(body.venue, 160),
    guests: clean(body.guests, 10),
    collection: clean(body.collection, 30),
    message: clean(body.message, 3000),
    privateOnly: body.privateOnly === true,
    locale: clean(body.locale, 5),
  };
  if (inquiry.name.length < 2 || !/^\S+@\S+\.\S+$/.test(inquiry.email) || !inquiry.date) {
    return NextResponse.json({ error: "Please check the form." }, { status: 400 });
  }

  const dir = join(process.cwd(), "data");
  const file = join(dir, "inquiries.json");
  await mkdir(dir, { recursive: true });
  const list = JSON.parse(await readFile(file, "utf8").catch(() => "[]"));
  list.push(inquiry);
  await writeFile(file, JSON.stringify(list, null, 2));

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, INQUIRY_NOTIFY_TO } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS && INQUIRY_NOTIFY_TO) {
    try {
      const mail = nodemailer.createTransport({ host: SMTP_HOST, port: Number(SMTP_PORT || 587), auth: { user: SMTP_USER, pass: SMTP_PASS } });
      const lines = Object.entries(inquiry).map(([k, v]) => `${k}: ${v}`).join("\n");
      await mail.sendMail({
        from: SMTP_USER,
        to: INQUIRY_NOTIFY_TO,
        replyTo: inquiry.email,
        subject: `New inquiry ${inquiry.id} — ${inquiry.name} (${inquiry.date})`,
        text: lines,
      });
    } catch (err) {
      console.error("Inquiry email failed", err);
    }
  }
  return NextResponse.json({ ok: true, id: inquiry.id });
}
