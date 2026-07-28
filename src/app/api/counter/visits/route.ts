import { NextRequest, NextResponse } from "next/server";

const COUNTER_BASE = "https://api.counterapi.dev/v1/trancongminh-portfolio";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const increment = searchParams.get("increment") === "true";

  const endpoint = increment ? `${COUNTER_BASE}/visits/up` : `${COUNTER_BASE}/visits`;

  try {
    const res = await fetch(endpoint, { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ count: 0 }, { status: 200 });
    const data = await res.json();
    return NextResponse.json({ count: data.count ?? 0 });
  } catch {
    return NextResponse.json({ count: 0 }, { status: 200 });
  }
}
