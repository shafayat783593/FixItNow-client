"use client";

interface BookingStatusFilterProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  disabled?: boolean;
}

const STATUSES = [
  "ALL",
  "REQUESTED",
  "ACCEPTED",
  "PAID",
  "IN_PROGRESS",
  "COMPLETED",
  "CANCELLED",
];

export function BookingStatusFilter({
  currentStatus,
  onStatusChange,
  disabled = false,
}: BookingStatusFilterProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
      {STATUSES.map((status) => (
        <button
          key={status}
          disabled={disabled}
          onClick={() => onStatusChange(status)}
          className={`shrink-0 rounded-xl px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-all ${
            currentStatus === status
              ? "bg-primary text-primary-foreground shadow-sm ring-1 ring-primary"
              : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
          } disabled:opacity-50`}
        >
          {status}
        </button>
      ))}
    </div>
  );
}