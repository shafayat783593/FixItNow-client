import { getAnalyticsAction } from "@/lib/api/admin.api";
import { AnalyticsCharts } from "../../_components/admin/Analyticscharts";

export default async function AdminAnalyticsPage() {
  const data = await getAnalyticsAction();

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Bookings and revenue trends across the platform.
        </p>

        <AnalyticsCharts data={data} />
      </div>
    </main>
  );
}