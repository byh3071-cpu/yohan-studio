import 'server-only';

import { Resend } from 'resend';

let cached: Resend | null = null;

export function getResend(): Resend {
  if (cached) return cached;
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error(
      'Missing RESEND_API_KEY env (Vercel Settings → Environment Variables)',
    );
  }
  cached = new Resend(apiKey);
  return cached;
}

export const RESEND_FROM = process.env.RESEND_FROM_ADDRESS ?? 'onboarding@resend.dev';
export const NOTIFY_TO = process.env.CONTACT_NOTIFY_TO ?? 'byh3071@gmail.com';
