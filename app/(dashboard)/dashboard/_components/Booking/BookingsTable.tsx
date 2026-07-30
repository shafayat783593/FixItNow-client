import Link from "next/link";
import { Calendar } from "lucide-react";
import StatusBadge from "./BookingStatusBadge";
import { IBooking } from "./BookingType";


export default function BookingsTable({ bookings }: { bookings: IBooking[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-[11px] uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Service</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Technician</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Scheduled</th>
            <th className="px-4 py-3 font-semibold">Status</th>
            <th className="px-4 py-3 text-right font-semibold">Price</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id} className="border-b border-border transition last:border-0 hover:bg-muted/40">
              <td className="px-4 py-3">
                <Link href={`/dashboard/customer/my-bookings/${b.id}`} className="font-medium text-foreground hover:text-accent">
                  {b.service?.title}
                </Link>
                <p className="text-[12px] text-muted-foreground">{b.service?.category?.name}</p>
              </td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{b.technician?.user?.name ?? "—"}</td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(b.scheduledAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
                </span>
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={b.status} />
              </td>
              <td className="px-4 py-3 text-right font-semibold text-foreground">৳{b.service?.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}