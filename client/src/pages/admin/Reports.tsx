import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DollarSign, TrendingUp, TrendingDown, BarChart3 } from "lucide-react";
import { useState } from "react";

export default function AdminReports() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const report = trpc.admin.reports.profit.useQuery(
    dateFrom || dateTo ? { dateFrom: dateFrom || undefined, dateTo: dateTo || undefined } : undefined
  );
  const monthly = trpc.admin.reports.monthly.useQuery();

  const summary = report.data?.summary;
  const deals = report.data?.deals || [];

  const summaryCards = [
    {
      label: "Total Revenue",
      value: summary ? `$${Number(summary.revenue).toLocaleString()}` : "—",
      icon: DollarSign,
      color: "text-primary",
    },
    {
      label: "Total Costs",
      value: summary ? `$${Number(summary.costs).toLocaleString()}` : "—",
      icon: TrendingDown,
      color: "text-red-400",
    },
    {
      label: "Total Profit",
      value: summary ? `$${Number(summary.profit).toLocaleString()}` : "—",
      icon: TrendingUp,
      color: "text-green-400",
    },
    {
      label: "Avg Profit / Deal",
      value: summary ? `$${Number(summary.avgProfit).toLocaleString()}` : "—",
      icon: BarChart3,
      color: "text-purple-400",
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-bold tracking-wider uppercase">
        Profit Reports
      </h1>

      {/* Date Range Filter */}
      <div className="flex gap-2 items-end">
        <div className="flex-1">
          <label className="text-[10px] text-muted-foreground mb-1 block">
            From
          </label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="bg-card border-border"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-muted-foreground mb-1 block">
            To
          </label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="bg-card border-border"
          />
        </div>
        {(dateFrom || dateTo) && (
          <button
            onClick={() => {
              setDateFrom("");
              setDateTo("");
            }}
            className="px-3 py-2 text-xs text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {summaryCards.map((s) => (
          <Card key={s.label} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Monthly Summary */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-bold tracking-wider uppercase">
            Monthly Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {monthly.isLoading ? (
            <div className="p-4 text-muted-foreground text-sm">Loading...</div>
          ) : monthly.data?.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm">No data yet</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-3 text-xs text-muted-foreground font-medium">
                      Month
                    </th>
                    <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                      Revenue
                    </th>
                    <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                      Costs
                    </th>
                    <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                      Profit
                    </th>
                    <th className="text-right p-3 text-xs text-muted-foreground font-medium">
                      Deals
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {monthly.data?.map((row) => (
                    <tr
                      key={row.month}
                      className="border-b border-border/50 hover:bg-muted/20"
                    >
                      <td className="p-3 font-medium">{row.month}</td>
                      <td className="p-3 text-right">
                        ${Number(row.revenue).toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-red-400">
                        ${Number(row.costs).toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-green-400 font-medium">
                        ${Number(row.profit).toLocaleString()}
                      </td>
                      <td className="p-3 text-right text-muted-foreground">
                        {row.count}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Per-Deal Breakdown */}
      <Card className="bg-card border-border">
        <CardHeader className="pb-3">
          <CardTitle className="font-display text-base font-bold tracking-wider uppercase">
            Per-Deal Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {report.isLoading ? (
            <div className="p-4 text-muted-foreground text-sm">Loading...</div>
          ) : deals.length === 0 ? (
            <div className="p-4 text-muted-foreground text-sm">No deals found</div>
          ) : (
            <div className="divide-y divide-border">
              {deals.map((deal) => (
                <div
                  key={deal.id}
                  className="px-4 py-3 hover:bg-muted/20 transition-colors"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">
                        {deal.clientName} — {deal.car}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {deal.pickupDate} → {deal.returnDate}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-medium">
                        ${Number(deal.clientCharge).toLocaleString()}
                      </p>
                      <p className="text-xs text-green-400">
                        +${Number(deal.profit).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
