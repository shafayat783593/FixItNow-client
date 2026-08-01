import Link from "next/link";
import { Calendar, User, ArrowRight, PackageSearch } from "lucide-react";
import StatusBadge from "./BookingStatusBadge";

interface Booking {
  id: string;
  status: string;
  scheduledAt: string;
  service: { title: string; price: number };
  technician: { user: { name: string } };
}

export function RecentBookingsList({ bookings }: { bookings: Booking[] }) {
  if (bookings.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card py-12 text-center">
        <PackageSearch className="mx-auto h-7 w-7 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">No bookings yet.</p>
        <Link
          href="/services"
          className="mt-3 inline-block rounded-full bg-primary px-4 py-1.5 text-[13px] font-semibold text-primary-foreground transition hover:opacity-90"
        >
          Browse services
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <Link
          key={b.id}
          href={`/dashboard/customer/my-bookings/${b.id}`}
          className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-accent/40"
        >
          <div>
            <p className="font-semibold text-foreground">{b.service.title}</p>
            <div className="mt-1 flex items-center gap-3 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> {b.technician?.user?.name ?? "—"}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(b.scheduledAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={b.status as any} />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
}