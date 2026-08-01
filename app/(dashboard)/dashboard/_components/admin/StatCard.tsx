import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  accent: string; // e.g. "text-blue-600 bg-blue-50"
}

export function StatCard({ label, value, icon: Icon, accent }: StatCardProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6">
      <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${accent}`}>
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-5 text-[13px] font-medium text-muted-foreground">{label}</p>
      <p
        className="mt-1 text-3xl font-bold text-foreground"
        style={{ fontFamily: "Space Grotesk, sans-serif" }}
      >
        {value}
      </p>
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-[0.06]"
        style={{ background: "currentColor" }}
      />
    </div>
  );
}