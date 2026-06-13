"use server";

import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";
import { headers } from "next/headers";
import type { ContactFormState, ContactFormData } from "@/types";

interface RateLimitRecord {
  timestamps: number[];
  blockedUntil?: number;
}

// Rate limiting: In-memory store (IP -> RateLimitRecord)
const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 60 giây
const MAX_REQUESTS_PER_WINDOW = 3; // Cho phép tối đa 3 lượt trong 60s
const COOLDOWN_MS = 5 * 60 * 1000; // Phạt khóa 5 phút nếu spam quá 3 lượt

function checkRateLimit(ip: string): { allowed: boolean; remainingSeconds?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip) || { timestamps: [] };

  // Nếu đang trong thời gian bị khóa
  if (record.blockedUntil && now < record.blockedUntil) {
    const remainingSeconds = Math.ceil((record.blockedUntil - now) / 1000);
    return { allowed: false, remainingSeconds };
  }

  // Lọc các lượt gửi trong cửa sổ 60s
  const recentTimestamps = record.timestamps.filter(
    (t) => now - t < RATE_LIMIT_WINDOW_MS
  );

  // Nếu vượt quá 3 lượt trong 60s -> Khóa 5 phút
  if (recentTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    record.blockedUntil = now + COOLDOWN_MS;
    rateLimitMap.set(ip, record);
    return { allowed: false, remainingSeconds: Math.ceil(COOLDOWN_MS / 1000) };
  }

  recentTimestamps.push(now);
  record.timestamps = recentTimestamps;
  record.blockedUntil = undefined;
  rateLimitMap.set(ip, record);

  return { allowed: true };
}

export async function sendContactEmail(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const timestamp = Date.now();

  // Rate limiting check
  const headerList = await headers();
  const clientIp = headerList.get("x-forwarded-for")?.split(",")[0] || "global-client";
  const rateLimitResult = checkRateLimit(clientIp);

  if (!rateLimitResult.allowed) {
    const minutes = Math.ceil((rateLimitResult.remainingSeconds || 300) / 60);
    return {
      status: "error",
      message: `Too many requests. You have exceeded 3 attempts. Please wait ${minutes} minute(s) before trying again.`,
      timestamp,
    };
  }

  const rawData = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    subject: formData.get("subject") as string,
    message: formData.get("message") as string,
  };

  // 1. Validate với Zod (server-side)
  const result = contactSchema.safeParse(rawData);
  if (!result.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof ContactFormData;
      if (field && !fieldErrors[field]) {
        fieldErrors[field] = issue.message;
      }
    });
    return { status: "error", errors: fieldErrors, timestamp };
  }

  // 2. Gửi email qua Resend (Lazy init & Check API key)
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn("⚠️ RESEND_API_KEY is not defined in environment variables.");
    return {
      status: "success",
      message: "Thank you for your message! Your message has been received.",
      timestamp,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: process.env.CONTACT_EMAIL || "admin@example.com",
      subject: `[Portfolio] ${result.data.subject}`,
      html: `
        <h2>New Message from Portfolio</h2>
        <p><strong>Name:</strong> ${result.data.name}</p>
        <p><strong>Email:</strong> ${result.data.email}</p>
        <p><strong>Subject:</strong> ${result.data.subject}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${result.data.message.replace(/\n/g, "<br />")}</p>
      `,
      replyTo: result.data.email,
    });

    if (error) {
      console.error("❌ Resend API Error:", error);
      return {
        status: "error",
        message: `Resend Error: ${error.message}`,
        timestamp,
      };
    }

    console.log("✅ Email sent successfully via Resend. ID:", data?.id);
    return {
      status: "success",
      message: "Your message has been sent successfully!",
      timestamp,
    };
  } catch (err: unknown) {
    console.error("❌ Unexpected Error sending email:", err);
    const errorMessage =
      err instanceof Error ? err.message : "Could not send message. Please try again later.";
    return {
      status: "error",
      message: errorMessage,
      timestamp,
    };
  }
}
