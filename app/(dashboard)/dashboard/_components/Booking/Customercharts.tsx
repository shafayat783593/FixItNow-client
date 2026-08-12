"use client";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CHART_COLORS = {
  accent: "hsl(var(--accent))",
  border: "hsl(var(--border))",
  muted: "hsl(var(--muted-foreground))",
  card: "hsl(var(--card))",
  foreground: "hsl(var(--foreground))",
};

const STATUS_COLORS: Record<string, string> = {
  REQUESTED: "#f59e0b",
  ACCEPTED: "#3b82f6",
  DECLINED: "#ef4444",
  PAID: "#8b5cf6",
  IN_PROGRESS: "#06b6d4",
  COMPLETED: "#10b981",
  CANCELLED: "#94a3b8",
};

const monthLabel = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", year: "2-digit" });

function EmptyState({ label }: { label: string }) {
  return (
    <div className="flex h-[240px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
      No {label} data available yet
    </div>
  );
}

const tooltipStyle = {
  background: CHART_COLORS.card,
  border: `1px solid ${CHART_COLORS.border}`,
  borderRadius: 14,
  boxShadow: "0 14px 32px hsl(213 45% 12% / 0.12)",
  color: CHART_COLORS.foreground,
  fontSize: 13,
  padding: "10px 12px",
};

export function CustomerCharts({ data }: { data: ICustomerAnalytics }) {
  const spendingData = data.spendingByMonth.map((d) => ({
    month: monthLabel(d.month),
    spent: d.total,
  }));

  const statusData = data.bookingsByStatus.map((d) => ({
    name: d.status,
    value: d.count,
  }));

  return (
    <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_12px_32px_hsl(213_45%_12%_/_0.05)]">
        <div className="flex items-start justify-between border-b border-border bg-gradient-to-r from-accent/10 via-transparent to-transparent px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Spending over time</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Last 12 months</p>
          </div>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-foreground">
            Monthly
          </span>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
          <div className="mt-4 h-[260px]">
            {spendingData.length === 0 ? (
              <EmptyState label="spending data" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={spendingData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                  <CartesianGrid vertical={false} strokeDasharray="4 4" stroke={CHART_COLORS.border} />
                  <XAxis
                    axisLine={false}
                    dataKey="month"
                    tickLine={false}
                    tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: CHART_COLORS.muted, fontSize: 12 }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    formatter={(value: number) => [`$${value.toLocaleString()}`, "Spent"]}
                    contentStyle={tooltipStyle}
                    cursor={{ stroke: CHART_COLORS.accent, strokeDasharray: "4 4" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="spent"
                    stroke={CHART_COLORS.accent}
                    strokeWidth={3}
                    dot={{ r: 3, fill: CHART_COLORS.accent, strokeWidth: 2, stroke: CHART_COLORS.card }}
                    activeDot={{ r: 5, fill: CHART_COLORS.accent, stroke: CHART_COLORS.card, strokeWidth: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_12px_32px_hsl(213_45%_12%_/_0.05)]">
        <div className="flex items-start justify-between border-b border-border bg-gradient-to-r from-primary/5 via-transparent to-transparent px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Bookings by status</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">All-time distribution</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
            Live mix
          </span>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
          <div className="mt-4 h-[260px]">
            {statusData.length === 0 ? (
              <EmptyState label="bookings" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={58}
                    outerRadius={88}
                    paddingAngle={3}
                    stroke={CHART_COLORS.card}
                    strokeWidth={3}
                  >
                    {statusData.map((entry) => (
                      <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#94a3b8"} />
                    ))}
                  </Pie>
                  <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    iconSize={8}
                    wrapperStyle={{ color: CHART_COLORS.muted, fontSize: 12, paddingTop: 8 }}
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
