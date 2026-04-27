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
  if (!supabase) return NextResponse.json({ projects: [] });

  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ projects: data ?? [] });
}

export async function POST(req: NextRequest) {
  const supabase = getClient();
  if (!supabase) return NextResponse.json({ error: "Supabase not configured" }, { status: 503 });

  try {
    const formData = await req.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const client_name = formData.get("client_name") as string;
    const location = formData.get("location") as string;
    const project_type = formData.get("project_type") as string;
    const is_featured = formData.get("is_featured") === "true";

    const youtube_url = formData.get("youtube_url") as string || null;

    // Handle single image
    let imageUrl = "";
    const file = formData.get("image1") as File | null;
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `projects/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
        
      if (uploadError) return NextResponse.json({ error: `Upload error: ${uploadError.message}` }, { status: 400 });
      
      const { data: publicUrlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("projects").insert([{ 
      title, 
      description,
      client_name,
      location,
      project_type,
      is_featured, 
      image_url: imageUrl,
      youtube_url
    }]);

    if (error) return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 400 });
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
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const client_name = formData.get("client_name") as string;
    const location = formData.get("location") as string;
    const project_type = formData.get("project_type") as string;
    const is_featured = formData.get("is_featured") === "true";

    if (!id) return NextResponse.json({ error: "Missing Project ID" }, { status: 400 });

    const youtube_url = formData.get("youtube_url") as string || null;
    const updateData: any = { title, description, client_name, location, project_type, is_featured, youtube_url };

    // Handle single image
    let imageUrl = "";
    const file = formData.get("image1") as File | null;
    if (file && file.size > 0) {
      const fileExt = file.name.split('.').pop();
      const fileName = `projects/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from("gallery")
        .upload(fileName, file, { cacheControl: "3600", upsert: false });
        
      if (uploadError) return NextResponse.json({ error: `Upload error: ${uploadError.message}` }, { status: 400 });
      
      const { data: publicUrlData } = supabase.storage.from("gallery").getPublicUrl(fileName);
      imageUrl = publicUrlData.publicUrl;
    } else {
      // Look for existing url
      const existingUrl = formData.get("existing_image1") as string;
      if (existingUrl) imageUrl = existingUrl;
    }

    if (imageUrl) {
      updateData.image_url = imageUrl;
    }

    const { error } = await supabase.from("projects").update(updateData).eq("id", id);

    if (error) return NextResponse.json({ error: error.message, details: error.details, hint: error.hint }, { status: 400 });
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

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
