import { eq, desc, sql, and, gte, lte, like, or } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import {
  InsertUser,
  users,
  leads,
  InsertLead,
  bookings,
  InsertBooking,
  clients,
  InsertClient,
  leadStatusHistory,
  InsertLeadStatusHistory,
} from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db
    .select()
    .from(users)
    .where(eq(users.openId, openId))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ─── Leads ───────────────────────────────────────────────────────────────────

export async function createLead(lead: InsertLead) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create lead: database not available");
    return undefined;
  }

  try {
    const result = await db.insert(leads).values(lead);
    return result;
  } catch (error) {
    console.error("[Database] Failed to create lead:", error);
    throw error;
  }
}

export async function getAllLeads() {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get leads: database not available");
    return [];
  }

  try {
    const result = await db
      .select()
      .from(leads)
      .orderBy(desc(leads.createdAt));
    return result;
  } catch (error) {
    console.error("[Database] Failed to get leads:", error);
    return [];
  }
}

export async function getLeadById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(leads).where(eq(leads.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateLead(
  id: number,
  data: Partial<InsertLead>
) {
  const db = await getDb();
  if (!db) return;
  await db.update(leads).set(data).where(eq(leads.id, id));
}

export async function deleteLead(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(leads).where(eq(leads.id, id));
}

export async function getLeadsFiltered(filters: {
  status?: string;
  search?: string;
  dateFrom?: string;
  dateTo?: string;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];
  if (filters.status) {
    conditions.push(eq(leads.status, filters.status as any));
  }
  if (filters.search) {
    const s = `%${filters.search}%`;
    conditions.push(
      or(
        like(leads.name, s),
        like(leads.phone, s),
        like(leads.vehicleInterest, s)
      )
    );
  }
  if (filters.dateFrom) {
    conditions.push(gte(leads.createdAt, new Date(filters.dateFrom)));
  }
  if (filters.dateTo) {
    conditions.push(lte(leads.createdAt, new Date(filters.dateTo)));
  }

  const result = await db
    .select()
    .from(leads)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(leads.createdAt));
  return result;
}

// ─── Lead Status History ─────────────────────────────────────────────────────

export async function addLeadStatusHistory(entry: InsertLeadStatusHistory) {
  const db = await getDb();
  if (!db) return;
  await db.insert(leadStatusHistory).values(entry);
}

export async function getLeadStatusHistory(leadId: number) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(leadStatusHistory)
    .where(eq(leadStatusHistory.leadId, leadId))
    .orderBy(desc(leadStatusHistory.timestamp));
}

// ─── Bookings ────────────────────────────────────────────────────────────────

export async function createBooking(booking: InsertBooking) {
  const db = await getDb();
  if (!db) return undefined;
  const profit =
    parseFloat(String(booking.clientCharge)) -
    parseFloat(String(booking.supplierCost));
  const result = await db.insert(bookings).values({
    ...booking,
    profit: profit.toFixed(2),
  });
  return result;
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(bookings).orderBy(desc(bookings.createdAt));
}

export async function getBookingById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(bookings)
    .where(eq(bookings.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateBooking(
  id: number,
  data: Partial<InsertBooking>
) {
  const db = await getDb();
  if (!db) return;
  const updateData: any = { ...data };
  if (data.clientCharge !== undefined && data.supplierCost !== undefined) {
    updateData.profit = (
      parseFloat(String(data.clientCharge)) -
      parseFloat(String(data.supplierCost))
    ).toFixed(2);
  }
  await db.update(bookings).set(updateData).where(eq(bookings.id, id));
}

export async function deleteBooking(id: number) {
  const db = await getDb();
  if (!db) return;
  await db.delete(bookings).where(eq(bookings.id, id));
}

export async function getBookingsFiltered(filters: {
  status?: string;
  car?: string;
  dateFrom?: string;
  dateTo?: string;
  clientName?: string;
}) {
  const db = await getDb();
  if (!db) return [];

  const conditions = [];
  if (filters.status) {
    conditions.push(eq(bookings.status, filters.status as any));
  }
  if (filters.car) {
    conditions.push(like(bookings.car, `%${filters.car}%`));
  }
  if (filters.clientName) {
    conditions.push(like(bookings.clientName, `%${filters.clientName}%`));
  }
  if (filters.dateFrom) {
    conditions.push(gte(bookings.pickupDate, filters.dateFrom));
  }
  if (filters.dateTo) {
    conditions.push(lte(bookings.returnDate, filters.dateTo));
  }

  return db
    .select()
    .from(bookings)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(bookings.createdAt));
}

// ─── Clients ─────────────────────────────────────────────────────────────────

export async function createClient(client: InsertClient) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.insert(clients).values(client);
  return result;
}

export async function getAllClients() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(clients).orderBy(desc(clients.createdAt));
}

export async function getClientById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db
    .select()
    .from(clients)
    .where(eq(clients.id, id))
    .limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateClient(
  id: number,
  data: Partial<InsertClient>
) {
  const db = await getDb();
  if (!db) return;
  await db.update(clients).set(data).where(eq(clients.id, id));
}

export async function getClientBookings(clientName: string) {
  const db = await getDb();
  if (!db) return [];
  return db
    .select()
    .from(bookings)
    .where(like(bookings.clientName, `%${clientName}%`))
    .orderBy(desc(bookings.createdAt));
}

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export async function getDashboardStats() {
  const db = await getDb();
  if (!db)
    return {
      leadsThisMonth: 0,
      activeBookings: 0,
      totalRevenue: "0",
      totalProfit: "0",
      totalBookings: 0,
    };

  const now = new Date();
  const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const [leadsThisMonthResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(leads)
    .where(gte(leads.createdAt, firstOfMonth));

  const [activeBookingsResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(bookings)
    .where(eq(bookings.status, "active"));

  const [revenueResult] = await db
    .select({
      total: sql<string>`COALESCE(SUM(clientCharge), 0)`,
    })
    .from(bookings)
    .where(
      or(eq(bookings.status, "completed"), eq(bookings.status, "active"))
    );

  const [profitResult] = await db
    .select({
      total: sql<string>`COALESCE(SUM(profit), 0)`,
    })
    .from(bookings)
    .where(
      or(eq(bookings.status, "completed"), eq(bookings.status, "active"))
    );

  const [totalBookingsResult] = await db
    .select({ count: sql<number>`count(*)` })
    .from(bookings);

  return {
    leadsThisMonth: leadsThisMonthResult?.count ?? 0,
    activeBookings: activeBookingsResult?.count ?? 0,
    totalRevenue: revenueResult?.total ?? "0",
    totalProfit: profitResult?.total ?? "0",
    totalBookings: totalBookingsResult?.count ?? 0,
  };
}

export async function getProfitReport(filters: {
  dateFrom?: string;
  dateTo?: string;
}) {
  const db = await getDb();
  if (!db) return { deals: [], summary: { revenue: "0", costs: "0", profit: "0", count: 0, avgProfit: "0" } };

  const conditions = [];
  conditions.push(
    or(eq(bookings.status, "completed"), eq(bookings.status, "active"))
  );
  if (filters.dateFrom) {
    conditions.push(gte(bookings.pickupDate, filters.dateFrom));
  }
  if (filters.dateTo) {
    conditions.push(lte(bookings.returnDate, filters.dateTo));
  }

  const deals = await db
    .select()
    .from(bookings)
    .where(and(...conditions))
    .orderBy(desc(bookings.pickupDate));

  let revenue = 0;
  let costs = 0;
  for (const d of deals) {
    revenue += parseFloat(String(d.clientCharge));
    costs += parseFloat(String(d.supplierCost));
  }
  const profit = revenue - costs;
  const count = deals.length;
  const avgProfit = count > 0 ? profit / count : 0;

  return {
    deals,
    summary: {
      revenue: revenue.toFixed(2),
      costs: costs.toFixed(2),
      profit: profit.toFixed(2),
      count,
      avgProfit: avgProfit.toFixed(2),
    },
  };
}

export async function getMonthlyProfitSummary() {
  const db = await getDb();
  if (!db) return [];

  const result = await db
    .select({
      month: sql<string>`DATE_FORMAT(pickupDate, '%Y-%m')`,
      revenue: sql<string>`COALESCE(SUM(clientCharge), 0)`,
      costs: sql<string>`COALESCE(SUM(supplierCost), 0)`,
      profit: sql<string>`COALESCE(SUM(profit), 0)`,
      count: sql<number>`count(*)`,
    })
    .from(bookings)
    .where(
      or(eq(bookings.status, "completed"), eq(bookings.status, "active"))
    )
    .groupBy(sql`DATE_FORMAT(pickupDate, '%Y-%m')`)
    .orderBy(sql`DATE_FORMAT(pickupDate, '%Y-%m')`);

  return result;
}
