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
import { ICustomerAnalytics } from "@/lib/api/booking";

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
    <div className="flex h-[240px] items-center justify-center text-sm text-muted-foreground">
      No {label} yet
    </div>
  );
}

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
      <div className="rounded-3xl border border-border bg-card p-6">
        <p className="text-sm font-semibold text-foreground">Spending over time</p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">Last 12 months</p>
        <div className="mt-4 h-[240px]">
          {spendingData.length === 0 ? (
            <EmptyState label="spending data" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                <Tooltip
                  formatter={(value) => [`$${Number(value).toLocaleString()}`, "Spent"]}
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                />
                <Line type="monotone" dataKey="spent" stroke="var(--accent)" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      <div className="rounded-3xl border border-border bg-card p-6">
        <p className="text-sm font-semibold text-foreground">Bookings by status</p>
        <p className="mt-0.5 text-[13px] text-muted-foreground">All-time distribution</p>
        <div className="mt-4 h-[240px]">
          {statusData.length === 0 ? (
            <EmptyState label="bookings" />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={85} paddingAngle={2}>
                  {statusData.map((entry) => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#94a3b8"} />
                  ))}
                </Pie>
                <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: 12,
                    fontSize: 13,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}