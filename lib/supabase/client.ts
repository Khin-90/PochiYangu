// lib/supabase/client.ts

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

export const supabaseUrl = process.env.SUPABASE_URL!;
export const supabaseKey = process.env.SUPABASE_KEY!;

export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseKey);
};
