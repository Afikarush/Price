// Settings you may want to change. Everything here is plain text.

// Product name shown at the top of the page and in the browser tab.
export const BRAND = 'QuoteBench';

// Where signups are sent. Paste your Google Apps Script "Web app" URL into the
// EXPO_PUBLIC_WAITLIST_URL setting (see README). Left empty, the form still
// works on screen but nothing is saved — handy for testing.
export const WAITLIST_URL = process.env.EXPO_PUBLIC_WAITLIST_URL ?? '';

// Answers for "How do you price your jobs today?"
export const PRICING_METHODS = [
  'By gut feel',
  'A spreadsheet',
  'Materials × a multiplier',
  'Hourly rate + materials',
  'An app or software',
  'Other',
] as const;
