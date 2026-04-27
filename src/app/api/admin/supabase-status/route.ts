import { NextResponse } from "next/server";
import { getSupabaseClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = getSupabaseClient();

  if (!supabase) {
    return NextResponse.json({
      connected: false,
      error: "Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY) are not set.",
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Set" : "Missing",
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "Set" : "Missing",
    }, { status: 503 });
  }

  try {
    // A lightweight ping — just check auth works 
    const { error } = await supabase.from("projects").select("id").limit(1);

    if (error && error.code !== "PGRST116") {
      // PGRST116 = no rows found, which is fine
      return NextResponse.json({
        connected: false,
        error: error.message,
        url: "Set",
        key: "Set",
      }, { status: 503 });
    }

    return NextResponse.json({
      connected: true,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
      key: "Set (hidden)",
    });
  } catch (err) {
    return NextResponse.json({
      connected: false,
      error: String(err),
      url: "Set",
      key: "Set",
    }, { status: 503 });
  }
}
