import Link from "next/link";
import { Briefcase, Wallet, Clock, ArrowUpRight } from "lucide-react";
import { getTechnicianDashboardStatsAction } from "@/lib/api/technician";
import { StatCard } from "../_components/admin/StatCard";
import { UpcomingJobsList } from "../_components/technician/UpcomingJobsList";


export default async function TechnicianDashboardPage() {
  const stats = await getTechnicianDashboardStatsAction();

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Technician</p> */}
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Your overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Track your jobs, requests, and earnings in one place.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <StatCard
            label="Upcoming jobs"
            value={stats.upcomingJobs.length.toString()}
            icon={Briefcase}
            accent="bg-blue-50 text-blue-600"
          />
          <StatCard
            label="Pending requests"
            value={stats.pendingRequestsCount.toString()}
            icon={Clock}
            accent="bg-amber-50 text-amber-600"
          />
          <StatCard
            label="Total earnings"
            value={`৳${stats.totalEarnings.toLocaleString()}`}
            icon={Wallet}
            accent="bg-emerald-50 text-emerald-600"
          />
        </div>

        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Upcoming jobs</h2>
          <Link
            href="/dashboard/technician/bookings"
            className="flex items-center gap-1 text-[13px] font-semibold text-accent hover:opacity-80"
          >
            View all bookings <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-4">
          <UpcomingJobsList jobs={stats.upcomingJobs} />
        </div>

        {stats.pendingRequestsCount > 0 && (
          <Link
            href="/dashboard/technician/bookings?status=REQUESTED"
            className="mt-6 flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-5 transition hover:border-amber-300"
          >
            <div>
              <p className="text-sm font-semibold text-amber-800">
                {stats.pendingRequestsCount} request{stats.pendingRequestsCount > 1 ? "s" : ""} waiting for your response
              </p>
              <p className="mt-0.5 text-[13px] text-amber-700/80">
                Accept or decline before customers look elsewhere.
              </p>
            </div>
            <ArrowUpRight className="h-4 w-4 text-amber-700" />
          </Link>
        )}
      </div>
    </main>
  );
}