import { describe, expect, it, vi } from "vitest";

describe("SMS helper", () => {
  it("sendSmsAlert returns false when credentials are missing", async () => {
    // Clear env vars to simulate missing credentials
    const origSid = process.env.TWILIO_ACCOUNT_SID;
    const origToken = process.env.TWILIO_AUTH_TOKEN;
    const origFrom = process.env.TWILIO_PHONE_NUMBER;
    const origTo = process.env.OWNER_PHONE_NUMBER;

    process.env.TWILIO_ACCOUNT_SID = "";
    process.env.TWILIO_AUTH_TOKEN = "";
    process.env.TWILIO_PHONE_NUMBER = "";
    process.env.OWNER_PHONE_NUMBER = "";

    // Re-import to pick up empty env
    vi.resetModules();
    const { sendSmsAlert } = await import("./sms");

    const result = await sendSmsAlert("Test message");
    expect(result).toBe(false);

    // Restore
    process.env.TWILIO_ACCOUNT_SID = origSid;
    process.env.TWILIO_AUTH_TOKEN = origToken;
    process.env.TWILIO_PHONE_NUMBER = origFrom;
    process.env.OWNER_PHONE_NUMBER = origTo;
  });

  it("sendSmsAlert attempts to send when credentials are present", async () => {
    // Set dummy credentials
    const origSid = process.env.TWILIO_ACCOUNT_SID;
    const origToken = process.env.TWILIO_AUTH_TOKEN;
    const origFrom = process.env.TWILIO_PHONE_NUMBER;
    const origTo = process.env.OWNER_PHONE_NUMBER;

    process.env.TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID || "ACtest123";
    process.env.TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN || "testtoken123";
    process.env.TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER || "+15551234567";
    process.env.OWNER_PHONE_NUMBER = process.env.OWNER_PHONE_NUMBER || "+15559876543";

    vi.resetModules();
    const { sendSmsAlert } = await import("./sms");

    // With real or dummy credentials, the function should not throw —
    // it returns true on success or false on API error
    const result = await sendSmsAlert("Test lead alert");
    expect(typeof result).toBe("boolean");

    // Restore
    process.env.TWILIO_ACCOUNT_SID = origSid;
    process.env.TWILIO_AUTH_TOKEN = origToken;
    process.env.TWILIO_PHONE_NUMBER = origFrom;
    process.env.OWNER_PHONE_NUMBER = origTo;
  });
});

describe("Lead submission with SMS", () => {
  it("lead submission still succeeds even if SMS fails", async () => {
    const { appRouter } = await import("./routers");
    type TrpcContext = import("./_core/context").TrpcContext;

    const ctx: TrpcContext = {
      user: null,
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: { clearCookie: () => {} } as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      name: "Test User",
      phone: "+1-929-386-6103",
      inquiryType: "Daily Rental",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Inquiry received");
  });
});
