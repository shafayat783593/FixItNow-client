import { Users, CheckCircle2, LayoutGrid, Star } from "lucide-react";
import { getPublicStats } from "@/lib/api/stats";

export default async function StatsBar() {
  const stats = await getPublicStats();
console.log("StatsBar stats:", stats);
  if (!stats) return null;

  const items = [
    {
      icon: Users,
      label: "Verified technicians",
      value: stats.technicianCount.toLocaleString(),
    },
    {
      icon: CheckCircle2,
      label: "Jobs completed",
      value: stats.completedBookings.toLocaleString(),
    },
    {
      icon: LayoutGrid,
      label: "Service categories",
      value: stats.categoryCount.toLocaleString(),
    },
    {
      icon: Star,
      label: "Average rating",
      value: stats.averageRating ? `${stats.averageRating} / 5` : "New",
    },
  ];

  return (
    <section className="bg-brand py-10 text-brand-foreground sm:py-14">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center text-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-amber-400">
              <item.icon size={18} />
            </div>
            <p
              className="mt-3 text-2xl font-extrabold text-brand-foreground sm:text-3xl"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {item.value}
            </p>
            <p className="mt-1 text-xs font-medium text-brand-foreground/65 sm:text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
