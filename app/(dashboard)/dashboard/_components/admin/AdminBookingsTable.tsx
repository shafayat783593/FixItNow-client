import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusBadge from "../Booking/BookingStatusBadge";
import { IAdminBooking } from "@/lib/api/admin.api";

export function AdminBookingsTable({ bookings }: { bookings: IAdminBooking[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Service</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">Technician</TableHead>
            <TableHead className="hidden md:table-cell">Scheduled</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden lg:table-cell">Payment</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((b) => (
            <TableRow key={b.id}>
              <TableCell className="font-medium text-foreground">
                {b.service?.title}
                <p className="text-[12px] font-normal text-muted-foreground">{b.service?.category?.name}</p>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {b.customer?.name}
                <p className="text-[12px] text-muted-foreground/70">{b.customer?.email}</p>
              </TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {b.technician?.user?.name ?? "—"}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {new Date(b.scheduledAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
              </TableCell>
              <TableCell>
                <StatusBadge status={b.status as any} />
              </TableCell>
              <TableCell className="hidden text-muted-foreground lg:table-cell">
                {b.payment?.status ?? "—"}
              </TableCell>
              <TableCell className="text-right font-semibold text-foreground">৳{b.service?.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}