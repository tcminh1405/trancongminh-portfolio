import type { ExperienceItem } from "@/types";

/**
 * Converts an ISO 8601 date string to DD/MM/YYYY format.
 * @param iso - ISO 8601 date string (e.g. "2024-01-15")
 * @returns Formatted date string (e.g. "15/01/2024")
 */
export function formatDate(iso: string): string {
  const date = new Date(iso);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
}

/**
 * Truncates text to a maximum number of characters.
 * If text exceeds max, returns text.slice(0, max) + "..."
 * @param text - The input string
 * @param max - Maximum character count before truncation
 * @returns Original text or truncated text with "..." appended
 */
export function truncate(text: string, max: number): string {
  if (max === 0) return "";
  if (text.length <= max) return text;
  return text.slice(0, max) + "...";
}

/**
 * Sorts ExperienceItem array by `order` ascending (lower order = newer = first).
 * Does not mutate the original array.
 * @param items - Array of ExperienceItem
 * @returns New sorted array
 */
export function sortExperience(items: ExperienceItem[]): ExperienceItem[] {
  return [...items].sort((a, b) => a.order - b.order);
}

