import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createLead, getAllLeads } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  leads: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        phone: z.string().min(10, "Valid phone number required"),
        inquiryType: z.string().min(1, "Inquiry type is required"),
        vehicleInterest: z.string().optional(),
        additionalInfo: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          // Create lead in database
          const lead = await createLead({
            name: input.name,
            phone: input.phone,
            inquiryType: input.inquiryType,
            vehicleInterest: input.vehicleInterest || null,
            additionalInfo: input.additionalInfo || null,
            status: "new",
          });

          // Send plain-text notification to owner
          const lines: string[] = [
            `New Lead – ${input.inquiryType}`,
            "",
            `Name: ${input.name}`,
            `Phone: ${input.phone}`,
            `Inquiry Type: ${input.inquiryType}`,
          ];
          if (input.vehicleInterest) {
            lines.push(`Vehicle: ${input.vehicleInterest}`);
          }
          if (input.additionalInfo) {
            lines.push(`Details: ${input.additionalInfo}`);
          }
          lines.push(`Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })}`);

          await notifyOwner({
            title: `New Lead – ${input.inquiryType}`,
            content: lines.join("\n"),
          });

          return {
            success: true,
            message: "Inquiry received. We'll contact you shortly.",
          };
        } catch (error) {
          console.error("[Leads] Failed to submit lead:", error);
          return {
            success: false,
            message: "Failed to submit inquiry. Please try again.",
          };
        }
      }),

    getAll: publicProcedure.query(async () => {
      const allLeads = await getAllLeads();
      return allLeads;
    }),
  }),
});

export type AppRouter = typeof appRouter;
