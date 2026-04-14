import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Leads table — expanded with email, instagram, budget, dateNeeded, source
 */
export const leads = mysqlTable("leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  instagram: varchar("instagram", { length: 100 }),
  inquiryType: varchar("inquiryType", { length: 100 }).notNull(),
  vehicleInterest: text("vehicleInterest"),
  additionalInfo: text("additionalInfo"),
  budget: varchar("budget", { length: 100 }),
  dateNeeded: varchar("dateNeeded", { length: 100 }),
  source: varchar("source", { length: 100 }),
  status: mysqlEnum("status", [
    "new",
    "contacted",
    "negotiating",
    "confirmed",
    "completed",
    "lost",
    "archived",
  ]).default("new").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Lead = typeof leads.$inferSelect;
export type InsertLead = typeof leads.$inferInsert;

/**
 * Bookings table — tracks rental/service bookings with profit calculation
 */
export const bookings = mysqlTable("bookings", {
  id: int("id").autoincrement().primaryKey(),
  clientName: varchar("clientName", { length: 255 }).notNull(),
  car: varchar("car", { length: 255 }).notNull(),
  pickupDate: varchar("pickupDate", { length: 50 }).notNull(),
  returnDate: varchar("returnDate", { length: 50 }).notNull(),
  clientCharge: decimal("clientCharge", { precision: 10, scale: 2 }).notNull(),
  supplierCost: decimal("supplierCost", { precision: 10, scale: 2 }).notNull(),
  supplierName: varchar("supplierName", { length: 255 }),
  profit: decimal("profit", { precision: 10, scale: 2 }),
  status: mysqlEnum("status", [
    "upcoming",
    "active",
    "completed",
    "cancelled",
  ]).default("upcoming").notNull(),
  notes: text("notes"),
  linkedLeadId: int("linkedLeadId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

/**
 * Clients table — auto-populated from leads, tracks customer relationships
 */
export const clients = mysqlTable("clients", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 320 }),
  instagram: varchar("instagram", { length: 100 }),
  totalSpend: decimal("totalSpend", { precision: 12, scale: 2 }).default("0"),
  totalBookings: int("totalBookings").default(0),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Client = typeof clients.$inferSelect;
export type InsertClient = typeof clients.$inferInsert;

/**
 * Lead status history — tracks all status changes for audit trail
 */
export const leadStatusHistory = mysqlTable("lead_status_history", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  fromStatus: varchar("fromStatus", { length: 50 }).notNull(),
  toStatus: varchar("toStatus", { length: 50 }).notNull(),
  note: text("note"),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
});

export type LeadStatusHistory = typeof leadStatusHistory.$inferSelect;
export type InsertLeadStatusHistory = typeof leadStatusHistory.$inferInsert;
