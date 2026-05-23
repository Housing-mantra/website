import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Mapping of project slugs to their Workveu CRM API Authorization keys.
// These can be overridden in production using environment variables.
const CRM_KEYS: Record<string, string | undefined> = {
  "forestia": process.env.CRM_KEY_FORESTIA || "548c4f045096008792fd71d04692dba2f75809ad92e61b922b24e8bd3e8003bc",
  "prismcity": process.env.CRM_KEY_PRISMCITY || "c31a6b7a8c52c063967be86f4c496a5173b1ec572cd91ab0f56657b56889eb0d",
  "topaz": process.env.CRM_KEY_TOPAZ || "05b46a0a41e56b1605b51b08d9c161117ead7a420200205d25e3347eb52cd81c",
  "shakuntal": process.env.CRM_KEY_SHAKUNTAL || "6d16edecf1e39ea5eccb43b06dfb3a3e71e947ffc08d744529abff8c1066a51f",
  // Simulated or empty projects: Add placeholders so they don't break
  "sankalp": process.env.CRM_KEY_SANKALP || "7643721beff2cd75ef715f0046d9d6861339e39a811ab2018f9f9539119ac528",
  "santiago": process.env.CRM_KEY_SANTIAGO || "7624511b133483a84d4e75797f1f2707fdc73503cd4d99b1aaf44f0661a88832",
  "shaligram": process.env.CRM_KEY_SHALIGRAM || "fb5a2e55c77cb880c6bbd76a0891e3162781bb3b86c3d6a0324e0923b6438abf",
  "kamalraj": process.env.CRM_KEY_KAMALRAJ || "kamalraj_key_placeholder",
  "sankalp-torezza": process.env.CRM_KEY_SANKALP_TOREZZA || "0540ca58c605eec7eee431849fa754f04957f1088eeb2a2c7bd777b9525316f8",
  "sai-ananta": process.env.CRM_KEY_SAI_ANANTA || "9e41d8bd5cb690b08150bacc6b81512c5038d35ef104029cfe108c62871bd233",
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

    // If key is missing or is a placeholder, log it and return success (fail-safe for UI)
    if (!crmKey || crmKey.includes('placeholder')) {
      console.warn(`[CRM Gateway] No active key configured for project slug: ${slugClean}. Saved locally.`);
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
