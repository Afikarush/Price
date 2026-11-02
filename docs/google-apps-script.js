// Paste this whole file into Google Apps Script (Extensions → Apps Script)
// inside the Google Sheet where you want signups saved. See README step 2.

const SHEET_NAME = 'Waitlist';

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const email = String(data.email || '').trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      return reply({ ok: false, error: 'Invalid email' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(['Date', 'Email', 'How they price today', 'Time zone', 'Source']);
      sheet.setFrozenRows(1);
    }

    // Skip duplicates: same email signing up twice is saved once.
    const existing = sheet.getRange(1, 2, sheet.getLastRow(), 1).getValues().flat();
    if (existing.indexOf(email) === -1) {
      sheet.appendRow([
        new Date(),
        email,
        String(data.pricingMethod || '').slice(0, 100),
        String(data.timezone || '').slice(0, 60),
        String(data.source || '').slice(0, 20),
      ]);
    }
    return reply({ ok: true });
  } catch (err) {
    return reply({ ok: false, error: 'Server error' });
  }
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
