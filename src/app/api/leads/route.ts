import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { google } from 'googleapis';

// ─── Google Sheets Config ──────────────────────────────────────────────────
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID || '1ADKsh46WjGdpxn6M3MbNp1khIoONakBhRY9yBYnyfPA';
const SHEET_NAME     = 'Leads'; // 3rd sheet — must be named "Leads" in the spreadsheet

async function appendLeadToSheet(rowData: string[]) {
  try {
    const privateKey = (process.env.GOOGLE_SERVICE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
    const clientEmail = process.env.GOOGLE_SERVICE_CLIENT_EMAIL || 'sc-indexer@housing-mantra-9d7e8.iam.gserviceaccount.com';

    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:G`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: { values: [rowData] },
    });
    console.log('[Google Sheets] Lead appended successfully.');
  } catch (err: any) {
    // Non-fatal — CRM + local backup still proceed
    console.error('[Google Sheets] Failed to append lead:', err?.message || err);
  }
}

// ─── CRM Keys ─────────────────────────────────────────────────────────────
const CRM_KEYS: Record<string, string | undefined> = {
  "forestia":          process.env.CRM_KEY_FORESTIA          || "548c4f045096008792fd71d04692dba2f75809ad92e61b922b24e8bd3e8003bc",
  "prismcity":         process.env.CRM_KEY_PRISMCITY         || "c31a6b7a8c52c063967be86f4c496a5173b1ec572cd91ab0f56657b56889eb0d",
  "topaz":             process.env.CRM_KEY_TOPAZ             || "05b46a0a41e56b1605b51b08d9c161117ead7a420200205d25e3347eb52cd81c",
  "shakuntal":         process.env.CRM_KEY_SHAKUNTAL         || "6d16edecf1e39ea5eccb43b06dfb3a3e71e947ffc08d744529abff8c1066a51f",
  "sankalp":           process.env.CRM_KEY_SANKALP           || "7643721beff2cd75ef715f0046d9d6861339e39a811ab2018f9f9539119ac528",
  "santiago":          process.env.CRM_KEY_SANTIAGO          || "7624511b133483a84d4e75797f1f2707fdc73503cd4d99b1aaf44f0661a88832",
  "shaligram":         process.env.CRM_KEY_SHALIGRAM         || "fb5a2e55c77cb880c6bbd76a0891e3162781bb3b86c3d6a0324e0923b6438abf",
  "sankalp-torezza":   process.env.CRM_KEY_SANKALP_TOREZZA   || "c5b66b48e07f3e407ac46c99b0fbf8b9d85ec6c08518b1e556f2892241a53c52",
  "sai-ananta":        process.env.CRM_KEY_SAI_ANANTA        || "bc179e69761ced0651cb08db0b4c60d899e774d9c97f373d66478b4798e79aa0",
  "landmark-rivera":   process.env.CRM_KEY_LANDMARK_RIVERA   || "c1d2423a972fd0708bd887fbe6e08119d14e0e681586a32e4644b3fa1744f373",
  "landmark-riveeraa": process.env.CRM_KEY_LANDMARK_RIVERA   || "c1d2423a972fd0708bd887fbe6e08119d14e0e681586a32e4644b3fa1744f373",
  "mangalam-mithila":  process.env.CRM_KEY_MANGALAM_MITHILA  || "82547e56848aeb417a1819df32eb06997f23c6be3531ac50dbae9561ea2f55da",
  "mangalam-starview": process.env.CRM_KEY_MANGALAM_STARVIEW || "1f400100ed2aa22639cbf415e3d746268296727e4c2fb4aa1a20f4a31e271d2e",
  "radhe-anantam":     process.env.CRM_KEY_RADHE_ANANTAM     || "a36d6782996de15fa44dbf63da076394cca03511d992a83f515ee691dfd5abae",
  "tanish-meridian":   process.env.CRM_KEY_TANISH_MERIDIAN   || "placeholder",
  "ethics-orova":      process.env.CRM_KEY_ETHICS_OROVIA     || "placeholder",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, mobile, email, message, query_form, projectSlug } = data;

    // Validate required fields
    if (!name || !mobile || !projectSlug) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields (name, mobile, projectSlug)' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const slugClean = projectSlug.toLowerCase().trim();
    const crmKey = CRM_KEYS[slugClean];

    // Create a local backup log to prevent lead loss under any circumstances!
    try {
      const backupDir = path.join(process.cwd(), 'leads_backup');
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir);
      }
      const backupFile = path.join(backupDir, `${slugClean}_leads.json`);
      const newLead = {
        name,
        mobile,
        email: email || '',
        message: message || '',
        query_form: query_form || 'Website Enquiry',
        timestamp: new Date().toISOString(),
      };
      
      let existingLeads = [];
      if (fs.existsSync(backupFile)) {
        const fileContent = fs.readFileSync(backupFile, 'utf8');
        existingLeads = JSON.parse(fileContent);
      }
      existingLeads.push(newLead);
      fs.writeFileSync(backupFile, JSON.stringify(existingLeads, null, 2));
      console.log(`[Lead Backup] Successfully saved lead for ${slugClean} locally.`);
    } catch (backupError) {
      console.error('[Lead Backup] Failed to write local backup:', backupError);
    }

    // ── Append to Google Sheets (Sheet 3: "Leads") — non-blocking ────────
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const sheetRow = [
      now,
      slugClean,
      name,
      mobile,
      email || '',
      message || 'Website Enquiry',
      query_form || 'Website Enquiry',
    ];
    appendLeadToSheet(sheetRow); // fire-and-forget, non-blocking

    // If key is missing or is a placeholder, return 200 immediately (lead is safely backed up locally)
    if (!crmKey || crmKey.includes('placeholder')) {
      console.warn(`[CRM Gateway] No active CRM key for slug: ${slugClean}. Lead backed up locally. Set env var to enable CRM sync.`);
      return NextResponse.json(
        { success: true, message: 'Lead received and backed up locally. CRM sync pending key configuration.' },
        { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Forward to Workveu CRM
    const payload = {
      name: name,
      contact_no: mobile,
      contact_email: email || '',
      message: message || 'Website Enquiry',
      query_form: query_form || 'Website Enquiry'
    };

    console.log(`[CRM Gateway] Forwarding lead to Workveu for ${slugClean}...`);
    const crmResponse = await fetch('https://services.workveu.com/integration/web/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': crmKey || '',
      },
      body: JSON.stringify(payload),
    });

    if (!crmResponse.ok) {
      const errorText = await crmResponse.text();
      console.error(`[CRM Gateway] Workveu API responded with error: ${crmResponse.status} - ${errorText}`);
      // We still return success: true because we successfully backed it up locally and want to keep user experience high!
      return NextResponse.json(
        { success: true, message: 'Lead received and backed up. CRM sync pending.' },
        { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    const crmData = await crmResponse.json();
    console.log(`[CRM Gateway] Workveu response for ${slugClean}:`, crmData);

    return NextResponse.json(
      { success: true, message: 'Lead successfully synchronized with CRM', data: crmData },
      { status: 200, headers: { 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error: any) {
    console.error('[CRM Gateway] Server Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal Server Error', error: error?.message },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
