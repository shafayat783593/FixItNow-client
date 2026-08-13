import Link from "next/link";
import {
  CalendarCheck,
  Activity,
  CheckCircle2,
  Wallet,
  ArrowUpRight,
} from "lucide-react";

import { StatCard } from "../_components/admin/StatCard";
import { RecentBookingsList } from "../_components/Booking/RecentBookingsList";
import {
  getCustomerAnalyticsAction,
  getCustomerDashboardStatsAction,
} from "@/lib/api/booking";
import { CustomerCharts } from "../_components/Booking/Customercharts";

export default async function CustomerDashboardPage() {
  const [stats, analytics] = await Promise.all([
    getCustomerDashboardStatsAction(),
    getCustomerAnalyticsAction(),
  ]);

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-full px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Dashboard
        </p>

        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Your overview
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Track your bookings and spending in one place.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-5 sm:grid-cols-4">
          <StatCard
            label="Total bookings"
            value={String(stats?.totalBookings ?? 0)}
            icon={CalendarCheck}
            accent="bg-blue-50 text-blue-600"
          />

          <StatCard
            label="Active"
            value={String(stats?.activeBookings ?? 0)}
            icon={Activity}
            accent="bg-amber-50 text-amber-600"
          />

          <StatCard
            label="Completed"
            value={String(stats?.completedBookings ?? 0)}
            icon={CheckCircle2}
            accent="bg-emerald-50 text-emerald-600"
          />

          <StatCard
            label="Total spent"
            value={`$${Number(stats?.totalSpent ?? 0).toLocaleString()}`}
            icon={Wallet}
            accent="bg-purple-50 text-purple-600"
          />
        </div>

        <CustomerCharts data={analytics} />

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">
            Recent bookings
          </h2>

          <Link
            href="/dashboard/customer/my-bookings"
            className="flex items-center gap-1 text-[13px] font-semibold text-accent hover:opacity-80"
          >
            View all
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4">
          <RecentBookingsList bookings={stats?.recentBookings ?? []} />
        </div>
      </div>
    </main>
  );
}