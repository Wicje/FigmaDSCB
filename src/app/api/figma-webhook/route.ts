import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Verify Figma Webhook passcode header if configured
    const passcode = req.headers.get('X-Figma-Passcode');
    const expectedPasscode = process.env.FIGMA_WEBHOOK_PASSCODE;

    if (expectedPasscode && passcode !== expectedPasscode) {
      return NextResponse.json({ error: 'Unauthorized Figma passcode' }, { status: 401 });
    }

    // Figma Webhook event types: 'FILE_UPDATE', 'LIBRARY_PUBLISHED'
    const eventType = payload.event_type;
    const fileKey = payload.file_key;
    const timestamp = payload.timestamp || new Date().toISOString();

    console.log(`[Figma Webhook Received] Event: ${eventType}, File: ${fileKey}, Time: ${timestamp}`);

    return NextResponse.json(
      {
        success: true,
        message: 'Figma Webhook received and queued for token sync processing',
        event_type: eventType,
        file_key: fileKey,
        processed_at: timestamp,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Invalid Webhook payload', details: error.message },
      { status: 400 }
    );
  }
}
