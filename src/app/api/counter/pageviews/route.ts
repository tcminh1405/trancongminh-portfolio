import { NextResponse } from "next/server";

const COUNTER_BASE = "https://api.counterapi.dev/v1/trancongminh-portfolio";

export async function GET() {
  try {
    const res = await fetch(`${COUNTER_BASE}/pageviews/up`, {
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ count: 0 }, { status: 200 });
    const data = await res.json();
    return NextResponse.json({ count: data.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
