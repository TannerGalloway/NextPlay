import "@dotenvx/dotenvx/config";
import { createClient } from "@supabase/supabase-js";


// Create a single supabase client for interacting with the database or auth
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false
    }
  });

export default supabase;