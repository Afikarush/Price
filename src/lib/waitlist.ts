import { Platform } from 'react-native';
import { WAITLIST_URL } from './config';

export type Signup = {
  email: string;
  pricingMethod: string;
};

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

// Sends one signup to the Google Sheet. Throws if it could not be saved.
export async function joinWaitlist({ email, pricingMethod }: Signup) {
  if (!WAITLIST_URL) {
    console.warn('EXPO_PUBLIC_WAITLIST_URL is not set — signup was not saved.');
    return;
  }

  let timezone = '';
  try {
    timezone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? '';
  } catch {}

  const res = await fetch(WAITLIST_URL, {
    method: 'POST',
    // Plain text keeps the browser from blocking the request to Google.
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      pricingMethod,
      timezone, // tells us roughly which country (US / UK / CA / AU)
      source: Platform.OS,
    }),
  });

  const data = await res.json().catch(() => null);
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error ?? 'Could not save signup');
  }
}
