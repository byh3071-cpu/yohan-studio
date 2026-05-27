import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Database } from '@/types/database';

let cached: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> {
  if (cached) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env (Vercel Settings → Environment Variables)',
    );
  }
  cached = createClient<Database>(url, anonKey, {
    auth: { persistSession: false },
  });
  return cached;
}

/**
 * Proxy that defers env-var resolution to first method call.
 * Use as: `supabase.from('studio_products')...`
 * Module import never throws — only the actual query fails if env is missing.
 */
export const supabase = new Proxy({} as SupabaseClient<Database>, {
  get(_target, prop, receiver) {
    const client = getSupabase();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === 'function' ? value.bind(client) : value;
  },
});
