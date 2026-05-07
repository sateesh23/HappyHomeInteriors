import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminAuthenticated } from "@/lib/adminAuth";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ videos: [] });

  const { data, error } = await supabase
    .from("video_testimonials")
    .select("id, youtube_url, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    if (error.code === '42P01') {
      return NextResponse.json({ error: "missing_table", message: "Table 'video_testimonials' does not exist in Supabase yet. Please create it: id (uuid, default gen_random_uuid()), youtube_url (text), created_at (timestamp)." });
    }
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
  
  return NextResponse.json({ videos: data ?? [] });
}

export async function POST(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  try {
    const { youtube_url } = await req.json();
    if (!youtube_url) return NextResponse.json({ error: "Missing YouTube URL" }, { status: 400 });

    const { error } = await supabase.from("video_testimonials").insert([{ youtube_url }]);
    
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!(await isAdminAuthenticated())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const { error } = await supabase.from("video_testimonials").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
