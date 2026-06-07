import { z } from "zod";

// Danh sách các domain email rác / disposable email bị cấm
const DISPOSABLE_EMAIL_DOMAINS = [
  "tempmail.com",
  "10minutemail.com",
  "mailinator.com",
  "guerrillamail.com",
  "trashmail.com",
  "yopmail.com",
  "dispostable.com",
  "sharklasers.com",
  "getnada.com",
  "throwawaymail.com",
  "temp-mail.org",
  "maildrop.cc",
];

// Strict Email Regex: username@domain.extension (yêu cầu TLD ít nhất 2 ký tự như .com, .vn, .dev)
const STRICT_EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Name is required")
    .max(100, "Name cannot exceed 100 characters"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Email is required")
    .max(254, "Email address is too long")
    .regex(STRICT_EMAIL_REGEX, "Please enter a valid email address (e.g. name@example.com)")
    .refine((val) => !val.includes(".."), {
      message: "Email cannot contain consecutive dots (..)",
    })
    .refine(
      (val) => {
        const domain = val.split("@")[1];
        return domain ? !DISPOSABLE_EMAIL_DOMAINS.includes(domain) : true;
      },
      {
        message: "Disposable temporary email addresses are not allowed",
      }
    ),
  subject: z
    .string()
    .trim()
    .min(1, "Subject is required")
    .max(200, "Subject cannot exceed 200 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required"),
});

export type ContactInput = z.infer<typeof contactSchema>;
