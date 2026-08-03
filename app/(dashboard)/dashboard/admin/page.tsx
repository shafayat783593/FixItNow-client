import { Users, Activity, Wallet, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StatCard } from "../_components/admin/StatCard";
import { getDashboardStatsAction } from "@/lib/api/admin.api";


export default async function AdminDashboardPage() {
const stats = await getDashboardStatsAction();

const dashboardStats = {
  totalUsers: stats?.totalUsers ?? 0,
  activeBookings: stats?.activeBookings ?? 0,
  totalRevenue: stats?.totalRevenue ?? 0,
};
  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Platform overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A snapshot of everything happening on FixItNow right now.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard
            label="Total users"
value={dashboardStats.totalUsers.toLocaleString()}
            icon={Users}
            accent="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Active bookings"
value={dashboardStats.activeBookings.toLocaleString()}
            icon={Activity}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Total revenue"
            value={`$${dashboardStats.totalRevenue.toLocaleString()}`}
            icon={Wallet}
            accent="bg-emerald-50 text-emerald-600"
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Link
            href="/dashboard/admin/users"
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-accent/40"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">Manage users</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Ban / unban customers &amp; technicians</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
          </Link>

          <Link
            href="/dashboard/admin/bookings"
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-accent/40"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">All bookings</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Monitor status across the platform</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
          </Link>

          <Link
            href="/dashboard/admin/categories"
            className="group flex items-center justify-between rounded-2xl border border-border bg-card p-5 transition hover:border-accent/40"
          >
            <div>
              <p className="text-sm font-semibold text-foreground">Categories</p>
              <p className="mt-0.5 text-[13px] text-muted-foreground">Add or edit service categories</p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:text-accent" />
          </Link>
        </div>
      </div>
    </main>
  );
}