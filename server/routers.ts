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

          // Send notification to owner
          const emailContent = `
            <h2>New Lead Submission</h2>
            <p><strong>Name:</strong> ${input.name}</p>
            <p><strong>Phone:</strong> ${input.phone}</p>
            <p><strong>Inquiry Type:</strong> ${input.inquiryType}</p>
            ${input.vehicleInterest ? `<p><strong>Vehicle Interest:</strong> ${input.vehicleInterest}</p>` : ""}
            ${input.additionalInfo ? `<p><strong>Additional Info:</strong> ${input.additionalInfo}</p>` : ""}
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `;

          await notifyOwner({
            title: `New Lead: ${input.name} - ${input.inquiryType}`,
            content: emailContent,
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
