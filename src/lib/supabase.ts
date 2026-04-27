/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClient as createSupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// Returns null if env vars are not set (graceful fallback to hardcoded data)
export function createClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  return createSupabaseClient<any>(supabaseUrl, supabaseKey);
}

let _client: ReturnType<typeof createSupabaseClient<any>> | null = null;

export function getSupabaseClient() {
  if (!supabaseUrl || !supabaseKey) return null;
  if (!_client) {
    _client = createSupabaseClient<any>(supabaseUrl, supabaseKey);
  }
  return _client;
}
