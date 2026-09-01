import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json({ configured: false, url: null, anonKey: null });
  }

  return NextResponse.json({ configured: true, url, anonKey });
}
