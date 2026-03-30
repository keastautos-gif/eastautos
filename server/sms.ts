import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID ?? "";
const authToken = process.env.TWILIO_AUTH_TOKEN ?? "";
const twilioPhone = process.env.TWILIO_PHONE_NUMBER ?? "";
const ownerPhone = process.env.OWNER_PHONE_NUMBER ?? "";

/**
 * Send an SMS alert to the owner's phone number via Twilio.
 * Returns true on success, false if credentials are missing or the send fails.
 */
export async function sendSmsAlert(message: string): Promise<boolean> {
  if (!accountSid || !authToken || !twilioPhone || !ownerPhone) {
    console.warn("[SMS] Twilio credentials or phone numbers not configured — skipping SMS.");
    return false;
  }

  try {
    const client = twilio(accountSid, authToken);
    await client.messages.create({
      body: message,
      from: twilioPhone,
      to: ownerPhone,
    });
    console.log("[SMS] Alert sent successfully.");
    return true;
  } catch (error) {
    console.error("[SMS] Failed to send alert:", error);
    return false;
  }
}
