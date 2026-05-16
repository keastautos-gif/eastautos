import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { adminProcedure, publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead,
  getLeadsFiltered,
  addLeadStatusHistory,
  getLeadStatusHistory,
  createBooking,
  getAllBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
  getBookingsFiltered,
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  getClientBookings,
  getDashboardStats,
  getProfitReport,
  getMonthlyProfitSummary,
} from "./db";
import { notifyOwner } from "./_core/notification";
import { sendSmsAlert } from "./sms";
import { getAirtableVehicles } from "./airtable";
import { createAirtableLead } from "./airtable-leads";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query((opts) => opts.ctx.user),
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
      .input(
        z.object({
          name: z.string().min(1, "Name is required"),
          phone: z.string().min(10, "Valid phone number required"),
          inquiryType: z.string().min(1, "Inquiry type is required"),
          vehicleInterest: z.string().optional(),
          additionalInfo: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        try {
          const lead = await createLead({
            name: input.name,
            phone: input.phone,
            inquiryType: input.inquiryType,
            vehicleInterest: input.vehicleInterest || null,
            additionalInfo: input.additionalInfo || null,
            status: "new",
          });

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
          lines.push(
            `Submitted: ${new Date().toLocaleString("en-US", { timeZone: "America/New_York", dateStyle: "medium", timeStyle: "short" })}`
          );

          await notifyOwner({
            title: `New Lead – ${input.inquiryType}`,
            content: lines.join("\n"),
          });

          const smsText = lines.join("\n");
          await sendSmsAlert(smsText);

          // Sync lead to Airtable Leads table
          await createAirtableLead({
            fullName: input.name,
            phoneNumber: input.phone,
            vehicleRequested: input.vehicleInterest || undefined,
            message: input.additionalInfo || undefined,
            leadSource: "Website",
            leadStatus: "New Inquiry",
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

  // ─── Admin Routes ────────────────────────────────────────────────────────

  admin: router({
    // Dashboard stats
    dashboard: router({
      stats: adminProcedure.query(async () => {
        return getDashboardStats();
      }),
      recentLeads: adminProcedure.query(async () => {
        const all = await getAllLeads();
        return all.slice(0, 5);
      }),
      upcomingBookings: adminProcedure.query(async () => {
        const all = await getBookingsFiltered({ status: "upcoming" });
        return all.slice(0, 5);
      }),
    }),

    // Leads CRUD
    leads: router({
      list: adminProcedure
        .input(
          z
            .object({
              status: z.string().optional(),
              search: z.string().optional(),
              dateFrom: z.string().optional(),
              dateTo: z.string().optional(),
            })
            .optional()
        )
        .query(async ({ input }) => {
          if (input?.status || input?.search || input?.dateFrom || input?.dateTo) {
            return getLeadsFiltered(input);
          }
          return getAllLeads();
        }),

      get: adminProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
          return getLeadById(input.id);
        }),

      create: adminProcedure
        .input(
          z.object({
            name: z.string().min(1),
            phone: z.string().min(1),
            email: z.string().optional(),
            instagram: z.string().optional(),
            inquiryType: z.string().min(1),
            vehicleInterest: z.string().optional(),
            additionalInfo: z.string().optional(),
            budget: z.string().optional(),
            dateNeeded: z.string().optional(),
            source: z.string().optional(),
            status: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createLead({
            ...input,
            status: (input.status as any) || "new",
          });
          return { success: true };
        }),

      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            name: z.string().optional(),
            phone: z.string().optional(),
            email: z.string().optional(),
            instagram: z.string().optional(),
            inquiryType: z.string().optional(),
            vehicleInterest: z.string().optional(),
            additionalInfo: z.string().optional(),
            budget: z.string().optional(),
            dateNeeded: z.string().optional(),
            source: z.string().optional(),
            status: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateLead(id, data as any);
          return { success: true };
        }),

      updateStatus: adminProcedure
        .input(
          z.object({
            id: z.number(),
            fromStatus: z.string(),
            toStatus: z.string(),
            note: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await updateLead(input.id, { status: input.toStatus as any });
          await addLeadStatusHistory({
            leadId: input.id,
            fromStatus: input.fromStatus,
            toStatus: input.toStatus,
            note: input.note || null,
          });
          return { success: true };
        }),

      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteLead(input.id);
          return { success: true };
        }),

      history: adminProcedure
        .input(z.object({ leadId: z.number() }))
        .query(async ({ input }) => {
          return getLeadStatusHistory(input.leadId);
        }),
    }),

    // Bookings CRUD
    bookings: router({
      list: adminProcedure
        .input(
          z
            .object({
              status: z.string().optional(),
              car: z.string().optional(),
              dateFrom: z.string().optional(),
              dateTo: z.string().optional(),
              clientName: z.string().optional(),
            })
            .optional()
        )
        .query(async ({ input }) => {
          if (
            input?.status ||
            input?.car ||
            input?.dateFrom ||
            input?.dateTo ||
            input?.clientName
          ) {
            return getBookingsFiltered(input);
          }
          return getAllBookings();
        }),

      get: adminProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
          return getBookingById(input.id);
        }),

      create: adminProcedure
        .input(
          z.object({
            clientName: z.string().min(1),
            car: z.string().min(1),
            pickupDate: z.string().min(1),
            returnDate: z.string().min(1),
            clientCharge: z.string(),
            supplierCost: z.string(),
            supplierName: z.string().optional(),
            status: z.string().optional(),
            notes: z.string().optional(),
            linkedLeadId: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createBooking({
            ...input,
            supplierName: input.supplierName || null,
            notes: input.notes || null,
            linkedLeadId: input.linkedLeadId || null,
            status: (input.status as any) || "upcoming",
          });
          return { success: true };
        }),

      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            clientName: z.string().optional(),
            car: z.string().optional(),
            pickupDate: z.string().optional(),
            returnDate: z.string().optional(),
            clientCharge: z.string().optional(),
            supplierCost: z.string().optional(),
            supplierName: z.string().optional(),
            status: z.string().optional(),
            notes: z.string().optional(),
            linkedLeadId: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateBooking(id, data as any);
          return { success: true };
        }),

      delete: adminProcedure
        .input(z.object({ id: z.number() }))
        .mutation(async ({ input }) => {
          await deleteBooking(input.id);
          return { success: true };
        }),
    }),

    // Clients
    clients: router({
      list: adminProcedure.query(async () => {
        return getAllClients();
      }),

      get: adminProcedure
        .input(z.object({ id: z.number() }))
        .query(async ({ input }) => {
          return getClientById(input.id);
        }),

      create: adminProcedure
        .input(
          z.object({
            name: z.string().min(1),
            phone: z.string().min(1),
            email: z.string().optional(),
            instagram: z.string().optional(),
            notes: z.string().optional(),
          })
        )
        .mutation(async ({ input }) => {
          await createClient({
            ...input,
            email: input.email || null,
            instagram: input.instagram || null,
            notes: input.notes || null,
          });
          return { success: true };
        }),

      update: adminProcedure
        .input(
          z.object({
            id: z.number(),
            name: z.string().optional(),
            phone: z.string().optional(),
            email: z.string().optional(),
            instagram: z.string().optional(),
            notes: z.string().optional(),
            totalSpend: z.string().optional(),
            totalBookings: z.number().optional(),
          })
        )
        .mutation(async ({ input }) => {
          const { id, ...data } = input;
          await updateClient(id, data as any);
          return { success: true };
        }),

      bookings: adminProcedure
        .input(z.object({ clientName: z.string() }))
        .query(async ({ input }) => {
          return getClientBookings(input.clientName);
        }),
    }),

    // Profit Reports
    reports: router({
      profit: adminProcedure
        .input(
          z
            .object({
              dateFrom: z.string().optional(),
              dateTo: z.string().optional(),
            })
            .optional()
        )
        .query(async ({ input }) => {
          return getProfitReport(input || {});
        }),

      monthly: adminProcedure.query(async () => {
        return getMonthlyProfitSummary();
      }),
    }),
  }),

  // ─── Public Vehicles (Airtable) ──────────────────────────────────────────

  vehicles: router({
    getAvailable: publicProcedure.query(async () => {
      return getAirtableVehicles();
    }),
  }),
});

export type AppRouter = typeof appRouter;
