"use client";

import {
  BarChart,
  Bar,
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
import { IAnalytics } from "@/lib/api/admin.api";

const CHART_COLORS = {
  accent: "hsl(var(--accent))",
  accentSoft: "hsl(var(--accent) / 0.18)",
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
    <div className="flex h-[260px] items-center justify-center rounded-2xl border border-dashed border-border bg-muted/30 text-sm text-muted-foreground">
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

export function AnalyticsCharts({ data }: { data: IAnalytics }) {
  const monthData = data.bookingsByMonth.map((d) => ({
    month: monthLabel(d.month),
    bookings: d.count,
  }));

  const revenueData = data.revenueByCategory.map((d) => ({
    category: d.category,
    revenue: d.revenue,
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
            <p className="text-sm font-semibold text-foreground">Bookings over time</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Last 12 months</p>
          </div>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-foreground">Monthly</span>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
        <div className="mt-4 h-[260px]">
          {monthData.length === 0 ? (
            <EmptyState label="booking" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthData} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="bookingsLine" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor={CHART_COLORS.accent} stopOpacity={0.5} />
                    <stop offset="100%" stopColor={CHART_COLORS.accent} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 4" stroke={CHART_COLORS.border} />
                <XAxis axisLine={false} dataKey="month" tickLine={false} tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} allowDecimals={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: CHART_COLORS.accent, strokeDasharray: "4 4" }} />
                <Line type="monotone" dataKey="bookings" name="Bookings" stroke="url(#bookingsLine)" strokeWidth={3} dot={{ r: 3, fill: CHART_COLORS.accent, strokeWidth: 2, stroke: CHART_COLORS.card }} activeDot={{ r: 5, fill: CHART_COLORS.accent, stroke: CHART_COLORS.card, strokeWidth: 3 }} />
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
            <p className="mt-0.5 text-[13px] text-muted-foreground">Current distribution</p>
          </div>
          <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">Live mix</span>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
        <div className="mt-4 h-[260px]">
          {statusData.length === 0 ? (
            <EmptyState label="status" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={58} outerRadius={88} paddingAngle={3} stroke={CHART_COLORS.card} strokeWidth={3}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#94a3b8"} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} iconType="circle" iconSize={8} wrapperStyle={{ color: CHART_COLORS.muted, fontSize: 12, paddingTop: 8 }} />
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_12px_32px_hsl(213_45%_12%_/_0.05)] lg:col-span-2">
        <div className="flex items-start justify-between border-b border-border bg-gradient-to-r from-success/10 via-transparent to-transparent px-6 py-5">
          <div>
            <p className="text-sm font-semibold text-foreground">Revenue by category</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">Completed payments only</p>
          </div>
          <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">Revenue</span>
        </div>
        <div className="px-4 pb-4 pt-3 sm:px-6">
        <div className="mt-4 h-[280px]">
          {revenueData.length === 0 ? (
            <EmptyState label="revenue" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 8, right: 4, left: 4, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueBars" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--success))" />
                    <stop offset="100%" stopColor="hsl(var(--success) / 0.62)" />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="4 4" stroke={CHART_COLORS.border} />
                <XAxis axisLine={false} dataKey="category" tickLine={false} tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: CHART_COLORS.muted, fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [`$${Number(value ?? 0).toLocaleString()}`, "Revenue"]}
                  contentStyle={tooltipStyle}
                  cursor={{ fill: CHART_COLORS.accentSoft }}
                />
                <Bar dataKey="revenue" name="Revenue" fill="url(#revenueBars)" radius={[8, 8, 2, 2]} maxBarSize={56} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
