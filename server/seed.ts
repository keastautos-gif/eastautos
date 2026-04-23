import "dotenv/config";
import { drizzle } from "drizzle-orm/mysql2";
import { leads, bookings, clients, leadStatusHistory } from "../drizzle/schema";

async function seed() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    console.error("DATABASE_URL is required");
    process.exit(1);
  }

  const db = drizzle(url);
  console.log("Seeding database...");

  // Seed Leads
  const demoLeads = [
    {
      name: "Marcus Johnson",
      phone: "(305) 555-0101",
      email: "marcus.j@gmail.com",
      instagram: "@marcusj_miami",
      inquiryType: "rental",
      vehicleInterest: "Lamborghini Urus",
      additionalInfo: "Birthday weekend rental",
      budget: "$3,000-$5,000",
      dateNeeded: "2026-05-15",
      source: "instagram",
      status: "new" as const,
    },
    {
      name: "Sofia Rodriguez",
      phone: "(786) 555-0202",
      email: "sofia.r@outlook.com",
      instagram: "@sofiarod",
      inquiryType: "rental",
      vehicleInterest: "Rolls Royce Cullinan",
      additionalInfo: "Wedding day car",
      budget: "$5,000+",
      dateNeeded: "2026-06-20",
      source: "referral",
      status: "contacted" as const,
    },
    {
      name: "James Chen",
      phone: "(954) 555-0303",
      email: "jchen@techcorp.com",
      instagram: "@jamesc",
      inquiryType: "purchase",
      vehicleInterest: "Ferrari 488 GTB",
      additionalInfo: "Looking for 2020+, low miles",
      budget: "$250,000-$300,000",
      dateNeeded: "2026-04-30",
      source: "website",
      status: "negotiating" as const,
    },
    {
      name: "Aaliyah Williams",
      phone: "(305) 555-0404",
      email: "aaliyah.w@gmail.com",
      instagram: "@aaliyahw",
      inquiryType: "photoshoot",
      vehicleInterest: "McLaren 720S",
      additionalInfo: "Music video shoot, 4 hours",
      budget: "$2,000",
      dateNeeded: "2026-04-25",
      source: "instagram",
      status: "confirmed" as const,
    },
    {
      name: "David Kim",
      phone: "(561) 555-0505",
      email: "dkim@finance.com",
      inquiryType: "vehicle-management",
      vehicleInterest: "Porsche 911 GT3",
      additionalInfo: "Need full management for my GT3",
      budget: "Monthly retainer",
      source: "referral",
      status: "contacted" as const,
    },
    {
      name: "Isabella Torres",
      phone: "(305) 555-0606",
      email: "bella.t@hotmail.com",
      instagram: "@bellatorres",
      inquiryType: "chauffeur",
      vehicleInterest: "Mercedes S-Class",
      additionalInfo: "Airport pickup + Art Basel events",
      budget: "$1,500",
      dateNeeded: "2026-05-01",
      source: "website",
      status: "new" as const,
    },
    {
      name: "Tyler Brooks",
      phone: "(786) 555-0707",
      inquiryType: "rental",
      vehicleInterest: "Lamborghini Huracan",
      additionalInfo: "Weekend rental for Miami trip",
      budget: "$2,500",
      dateNeeded: "2026-05-10",
      source: "phone",
      status: "new" as const,
    },
    {
      name: "Priya Patel",
      phone: "(954) 555-0808",
      email: "priya.p@startup.io",
      instagram: "@priyap",
      inquiryType: "trade-in",
      vehicleInterest: "BMW M5 → Porsche Cayenne",
      additionalInfo: "2022 M5 Competition, 15k miles",
      budget: "$80,000 trade value",
      source: "website",
      status: "negotiating" as const,
    },
    {
      name: "Andre Mitchell",
      phone: "(305) 555-0909",
      email: "andre.m@gmail.com",
      inquiryType: "rental",
      vehicleInterest: "Bentley Continental GT",
      additionalInfo: "Anniversary surprise",
      budget: "$4,000",
      dateNeeded: "2026-05-20",
      source: "instagram",
      status: "completed" as const,
    },
    {
      name: "Rachel Green",
      phone: "(786) 555-1010",
      email: "rachel.g@design.co",
      inquiryType: "rental",
      vehicleInterest: "Range Rover Sport",
      additionalInfo: "1 week rental",
      budget: "$3,500",
      dateNeeded: "2026-04-15",
      source: "website",
      status: "lost" as const,
    },
  ];

  await db.insert(leads).values(demoLeads);
  console.log(`Inserted ${demoLeads.length} leads`);

  // Seed Clients
  const demoClients = [
    {
      name: "Marcus Johnson",
      phone: "(305) 555-0101",
      email: "marcus.j@gmail.com",
      instagram: "@marcusj_miami",
      totalSpend: "8500.00",
      totalBookings: 2,
      notes: "VIP client, repeat renter",
    },
    {
      name: "Sofia Rodriguez",
      phone: "(786) 555-0202",
      email: "sofia.r@outlook.com",
      instagram: "@sofiarod",
      totalSpend: "12000.00",
      totalBookings: 3,
      notes: "Wedding planner referral network",
    },
    {
      name: "James Chen",
      phone: "(954) 555-0303",
      email: "jchen@techcorp.com",
      instagram: "@jamesc",
      totalSpend: "4500.00",
      totalBookings: 1,
      notes: "High-net-worth, interested in purchases",
    },
    {
      name: "Aaliyah Williams",
      phone: "(305) 555-0404",
      email: "aaliyah.w@gmail.com",
      instagram: "@aaliyahw",
      totalSpend: "6000.00",
      totalBookings: 3,
      notes: "Music industry, frequent photoshoots",
    },
    {
      name: "Andre Mitchell",
      phone: "(305) 555-0909",
      email: "andre.m@gmail.com",
      totalSpend: "15000.00",
      totalBookings: 4,
      notes: "Loyal client since 2024",
    },
    {
      name: "David Kim",
      phone: "(561) 555-0505",
      email: "dkim@finance.com",
      totalSpend: "3200.00",
      totalBookings: 1,
      notes: "Vehicle management prospect",
    },
  ];

  await db.insert(clients).values(demoClients);
  console.log(`Inserted ${demoClients.length} clients`);

  // Seed Bookings
  const demoBookings = [
    {
      clientName: "Marcus Johnson",
      car: "Lamborghini Urus",
      pickupDate: "2026-05-15",
      returnDate: "2026-05-18",
      clientCharge: "4500.00",
      supplierCost: "2800.00",
      supplierName: "Prestige Auto Group",
      profit: "1700.00",
      status: "upcoming" as const,
      notes: "Birthday weekend — VIP treatment",
    },
    {
      clientName: "Sofia Rodriguez",
      car: "Rolls Royce Cullinan",
      pickupDate: "2026-06-20",
      returnDate: "2026-06-21",
      clientCharge: "5500.00",
      supplierCost: "3500.00",
      supplierName: "Luxury Fleet Miami",
      profit: "2000.00",
      status: "upcoming" as const,
      notes: "Wedding day — white exterior requested",
    },
    {
      clientName: "Aaliyah Williams",
      car: "McLaren 720S",
      pickupDate: "2026-04-25",
      returnDate: "2026-04-25",
      clientCharge: "2000.00",
      supplierCost: "1200.00",
      supplierName: "Exotic Dreams Rental",
      profit: "800.00",
      status: "upcoming" as const,
      notes: "Music video shoot, 4 hours",
    },
    {
      clientName: "Andre Mitchell",
      car: "Bentley Continental GT",
      pickupDate: "2026-03-20",
      returnDate: "2026-03-22",
      clientCharge: "4000.00",
      supplierCost: "2500.00",
      supplierName: "Prestige Auto Group",
      profit: "1500.00",
      status: "completed" as const,
      notes: "Anniversary rental — went great",
    },
    {
      clientName: "Marcus Johnson",
      car: "Ferrari 488 Spider",
      pickupDate: "2026-02-14",
      returnDate: "2026-02-16",
      clientCharge: "5000.00",
      supplierCost: "3200.00",
      supplierName: "Exotic Dreams Rental",
      profit: "1800.00",
      status: "completed" as const,
      notes: "Valentine's Day weekend",
    },
    {
      clientName: "Sofia Rodriguez",
      car: "Mercedes G-Wagon",
      pickupDate: "2026-01-10",
      returnDate: "2026-01-14",
      clientCharge: "3500.00",
      supplierCost: "2000.00",
      supplierName: "Luxury Fleet Miami",
      profit: "1500.00",
      status: "completed" as const,
      notes: "Event week rental",
    },
    {
      clientName: "Tyler Brooks",
      car: "Lamborghini Huracan",
      pickupDate: "2026-05-10",
      returnDate: "2026-05-12",
      clientCharge: "3800.00",
      supplierCost: "2400.00",
      supplierName: "Prestige Auto Group",
      profit: "1400.00",
      status: "upcoming" as const,
      notes: "First-time client",
    },
    {
      clientName: "Aaliyah Williams",
      car: "Lamborghini Urus",
      pickupDate: "2026-04-10",
      returnDate: "2026-04-11",
      clientCharge: "1800.00",
      supplierCost: "1100.00",
      supplierName: "Exotic Dreams Rental",
      profit: "700.00",
      status: "active" as const,
      notes: "Instagram content creation",
    },
    {
      clientName: "Andre Mitchell",
      car: "Porsche 911 Turbo S",
      pickupDate: "2026-03-01",
      returnDate: "2026-03-03",
      clientCharge: "3200.00",
      supplierCost: "2000.00",
      supplierName: "Prestige Auto Group",
      profit: "1200.00",
      status: "completed" as const,
    },
    {
      clientName: "David Kim",
      car: "Range Rover Autobiography",
      pickupDate: "2026-02-20",
      returnDate: "2026-02-25",
      clientCharge: "3200.00",
      supplierCost: "1800.00",
      supplierName: "Luxury Fleet Miami",
      profit: "1400.00",
      status: "completed" as const,
      notes: "Business trip",
    },
  ];

  await db.insert(bookings).values(demoBookings);
  console.log(`Inserted ${demoBookings.length} bookings`);

  // Seed Lead Status History
  const demoHistory = [
    { leadId: 2, fromStatus: "new", toStatus: "contacted", note: "Called, left voicemail" },
    { leadId: 3, fromStatus: "new", toStatus: "contacted", note: "Initial call" },
    { leadId: 3, fromStatus: "contacted", toStatus: "negotiating", note: "Interested in Ferrari, discussing price" },
    { leadId: 4, fromStatus: "new", toStatus: "contacted", note: "DM on Instagram" },
    { leadId: 4, fromStatus: "contacted", toStatus: "negotiating", note: "Discussing shoot details" },
    { leadId: 4, fromStatus: "negotiating", toStatus: "confirmed", note: "Deposit received" },
    { leadId: 5, fromStatus: "new", toStatus: "contacted", note: "Phone consultation scheduled" },
    { leadId: 8, fromStatus: "new", toStatus: "contacted", note: "Email sent with trade-in valuation" },
    { leadId: 8, fromStatus: "contacted", toStatus: "negotiating", note: "Counter-offer on trade value" },
    { leadId: 9, fromStatus: "new", toStatus: "completed", note: "Quick deal, completed same week" },
    { leadId: 10, fromStatus: "new", toStatus: "contacted", note: "Called twice, no response" },
    { leadId: 10, fromStatus: "contacted", toStatus: "lost", note: "Went with competitor" },
  ];

  await db.insert(leadStatusHistory).values(demoHistory);
  console.log(`Inserted ${demoHistory.length} status history entries`);

  console.log("Seeding complete!");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
