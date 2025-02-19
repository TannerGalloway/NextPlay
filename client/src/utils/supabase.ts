import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with the database or auth
const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY);

export default supabase;