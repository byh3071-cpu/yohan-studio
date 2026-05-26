import 'server-only';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';

let cached: SupabaseClient<Database> | null = null;

export function getSupabaseServer(): SupabaseClient<Database> {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY env (Vercel Settings → Environment Variables)',
    );
  }
  cached = createClient<Database>(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
  return cached;
}
