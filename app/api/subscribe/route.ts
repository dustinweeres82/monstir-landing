import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";
import WaitlistConfirmation from "@/emails/WaitlistConfirmation";

const resend = new Resend(process.env.RESEND_API_KEY);
const audienceId = process.env.RESEND_AUDIENCE_ID!;

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  try {
    // Add to audience
    await resend.contacts.create({ email, audienceId, unsubscribed: false });

    // Send confirmation email
    await resend.emails.send({
      from: "BITBOT from Monstir <hello@monstirapp.com>",
      to: email,
      subject: "⚔️ Quest accepted — you're on the Monstir waitlist!",
      react: WaitlistConfirmation({ email }),
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
