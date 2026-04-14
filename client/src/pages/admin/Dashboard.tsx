import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  CalendarDays,
  DollarSign,
  TrendingUp,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useLocation } from "wouter";

const statusColors: Record<string, string> = {
  new: "bg-blue-500/20 text-blue-400",
  contacted: "bg-yellow-500/20 text-yellow-400",
  negotiating: "bg-purple-500/20 text-purple-400",
  confirmed: "bg-green-500/20 text-green-400",
  completed: "bg-emerald-500/20 text-emerald-400",
  lost: "bg-red-500/20 text-red-400",
  upcoming: "bg-blue-500/20 text-blue-400",
  active: "bg-green-500/20 text-green-400",
  cancelled: "bg-red-500/20 text-red-400",
};

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const stats = trpc.admin.dashboard.stats.useQuery();
  const recentLeads = trpc.admin.dashboard.recentLeads.useQuery();
  const upcomingBookings = trpc.admin.dashboard.upcomingBookings.useQuery();

  const statCards = [
    {
      label: "Leads This Month",
      value: stats.data?.leadsThisMonth ?? "—",
      icon: Users,
      color: "text-blue-400",
    },
    {
      label: "Active Bookings",
      value: stats.data?.activeBookings ?? "—",
      icon: CalendarDays,
      color: "text-green-400",
    },
    {
      label: "Total Revenue",
      value: stats.data
        ? `$${Number(stats.data.totalRevenue).toLocaleString()}`
        : "—",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "Total Profit",
      value: stats.data
        ? `$${Number(stats.data.totalProfit).toLocaleString()}`
        : "—",
      icon: TrendingUp,
      color: "text-emerald-400",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {statCards.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <button
          onClick={() => setLocation("/admin/leads?action=new")}
          className="flex items-center gap-2 p-3 rounded bg-primary/10 border border-primary/20 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Lead
        </button>
        <button
          onClick={() => setLocation("/admin/bookings?action=new")}
          className="flex items-center gap-2 p-3 rounded bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Booking
        </button>
        <button
          onClick={() => setLocation("/admin/reports")}
          className="flex items-center gap-2 p-3 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium hover:bg-purple-500/20 transition-colors"
        >
          <TrendingUp className="w-4 h-4" />
          View Reports
        </button>
      </div>

      {/* Recent Leads */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base font-bold tracking-wider uppercase">
              Recent Leads
            </CardTitle>
            <button
              onClick={() => setLocation("/admin/leads")}
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {recentLeads.isLoading ? (
            <div className="p-4 text-muted-foreground text-sm">Loading...</div>
          ) : recentLeads.data?.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm">No leads yet</div>
          ) : (
            <div className="divide-y divide-border">
              {recentLeads.data?.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setLocation("/admin/leads")}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">{lead.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {lead.inquiryType} · {lead.phone}
                    </p>
                  </div>
                  <Badge
                    className={`text-[10px] shrink-0 ml-2 ${statusColors[lead.status] || ""}`}
                    variant="secondary"
                  >
                    {lead.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Bookings */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="font-display text-base font-bold tracking-wider uppercase">
              Upcoming Bookings
            </CardTitle>
            <button
              onClick={() => setLocation("/admin/bookings")}
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {upcomingBookings.isLoading ? (
            <div className="p-4 text-muted-foreground text-sm">Loading...</div>
          ) : upcomingBookings.data?.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm">
              No upcoming bookings
            </div>
          ) : (
            <div className="divide-y divide-border">
              {upcomingBookings.data?.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between px-4 py-3 hover:bg-muted/30 transition-colors cursor-pointer"
                  onClick={() => setLocation("/admin/bookings")}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium truncate">
                      {b.clientName} — {b.car}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {b.pickupDate} → {b.returnDate}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-primary shrink-0 ml-2">
                    ${Number(b.clientCharge).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
