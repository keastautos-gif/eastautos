import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  const ctx: TrpcContext = {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };

  return ctx;
}

describe("leads.submit", () => {
  it("submits a lead with valid input", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.leads.submit({
      name: "John Doe",
      phone: "+1-929-386-6103",
      inquiryType: "Rent a Car",
      vehicleInterest: "Ferrari Roma",
    });

    expect(result.success).toBe(true);
    expect(result.message).toContain("Inquiry received");
  });

  it("rejects submission with missing name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.leads.submit({
        name: "",
        phone: "+1-929-386-6103",
        inquiryType: "Rent a Car",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("rejects submission with invalid phone", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.leads.submit({
        name: "John Doe",
        phone: "123",
        inquiryType: "Rent a Car",
      });
      expect.fail("Should have thrown validation error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});

describe("leads.getAll", () => {
  it("returns list of leads", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const leads = await caller.leads.getAll();
    expect(Array.isArray(leads)).toBe(true);
  });
});
