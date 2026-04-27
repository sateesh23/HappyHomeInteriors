import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Use Service Role key if available to bypass RLS for Admin operations, otherwise fallback to ANON
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function GET() {
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ testimonials: [] });

  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ testimonials: data ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  try {
    const formData = await req.formData();
    const file = formData.get("image") as File | null;
    const client_name = formData.get("client_name") as string;
    const location = formData.get("location") as string;
    const project_name = formData.get("project_name") as string;
    const text = formData.get("text") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;
    const is_active = formData.get("is_active") === "true";

    let image_url = "";

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `testimonials/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
        
      if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
      
      const { data: publicUrlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
      image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("testimonials").insert([{ 
      client_name, 
      location,
      project_name,
      text, 
      rating,
      is_active, 
      image_url 
    }]);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  try {
    const formData = await req.formData();
    const id = formData.get("id") as string;
    const file = formData.get("image") as File | null;
    const client_name = formData.get("client_name") as string;
    const location = formData.get("location") as string;
    const project_name = formData.get("project_name") as string;
    const text = formData.get("text") as string;
    const rating = parseInt(formData.get("rating") as string) || 5;
    const is_active = formData.get("is_active") === "true";

    if (!id) return NextResponse.json({ error: "Missing Testimonial ID" }, { status: 400 });

    const updateData: any = { client_name, location, project_name, text, rating, is_active };

    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `testimonials/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
        
      if (uploadError) return NextResponse.json({ error: uploadError.message }, { status: 400 });
      
      const { data: publicUrlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
      updateData.image_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("testimonials").update(updateData).eq("id", id);

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

    const { error } = await supabase.from("testimonials").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
