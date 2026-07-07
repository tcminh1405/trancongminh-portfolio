import { describe, it, expect } from "vitest";
import { formatDate, truncate } from "@/lib/utils";

describe("formatDate", () => {
  it("formats a normal date correctly", () => {
    expect(formatDate("2024-01-15")).toBe("15/01/2024");
  });

  it("formats the first day of a month", () => {
    expect(formatDate("2024-03-01")).toBe("01/03/2024");
  });

  it("formats the last day of a month", () => {
    expect(formatDate("2024-01-31")).toBe("31/01/2024");
  });

  it("formats a leap year date (Feb 29)", () => {
    expect(formatDate("2024-02-29")).toBe("29/02/2024");
  });

  it("pads single-digit day and month with leading zeros", () => {
    expect(formatDate("2024-05-07")).toBe("07/05/2024");
  });
});

describe("truncate", () => {
  it("returns text unchanged when shorter than max", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("returns text unchanged when equal to max", () => {
    expect(truncate("hello", 5)).toBe("hello");
  });

  it("truncates and appends '...' when text is longer than max", () => {
    expect(truncate("hello world", 5)).toBe("hello...");
  });

  it("returns empty string when max is 0", () => {
    expect(truncate("hello", 0)).toBe("");
  });

  it("truncated result length equals max + 3", () => {
    const max = 8;
    const result = truncate("this is a long string", max);
    expect(result.length).toBe(max + 3);
  });
});
