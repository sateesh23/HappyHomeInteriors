"use server";

import { getSupabaseClient } from "@/lib/supabase";

export async function submitLead(formData: FormData) {
  const name = formData.get("name") as string;
  const phone = formData.get("phone") as string;
  const project = formData.get("project") as string;

  if (!name || !phone || !project) {
    return { success: false, message: "All fields are required." };
  }

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase.from("enquiries").insert([{
        name,
        phone,
        project_type: project,
        status: "new",
      }]);
    } catch {
      // Silently continue — lead is still acknowledged to the user
    }
  }

  return { success: true, message: "Thanks! We'll get back to you in 24 hours." };
}
