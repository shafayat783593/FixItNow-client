import { BookingStatus } from "@/lib/api/booking.type";

const statusStyles: Record<BookingStatus, string> = {
  REQUESTED: "bg-amber-50 text-amber-700 border-amber-200",
  ACCEPTED: "bg-blue-50 text-blue-700 border-blue-200",
  DECLINED: "bg-red-50 text-red-700 border-red-200",
  PAID: "bg-purple-50 text-purple-700 border-purple-200",
  IN_PROGRESS: "bg-emerald-50 text-emerald-700 border-emerald-200",
  COMPLETED: "bg-slate-100 text-slate-600 border-slate-200",
  CANCELLED: "bg-red-100 text-red-800 border-red-300",
};

const statusLabels: Record<BookingStatus, string> = {
  REQUESTED: "Requested",
  ACCEPTED: "Accepted",
  DECLINED: "Declined",
  PAID: "Paid",
  IN_PROGRESS: "In progress",
  COMPLETED: "Completed",
  CANCELLED: "Cancelled",
};

export default function StatusBadge({ status }: { status: BookingStatus }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${statusStyles[status]}`}>
      {statusLabels[status]}
    </span>
  );
}