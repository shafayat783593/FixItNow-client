import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";
import StatusBadge from "../Booking/BookingStatusBadge";

interface Job {
  id: string;
  scheduledAt: string;
  status: string;
  customer: { name: string; phone?: string };
  service: { title: string; price: number };
}

export function UpcomingJobsList({ jobs }: { jobs: Job[] }) {
  if (jobs.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-card py-12 text-center">
        <Calendar className="mx-auto h-7 w-7 text-muted-foreground/40" />
        <p className="mt-3 text-sm text-muted-foreground">No upcoming jobs scheduled.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => (
        <Link
          key={job.id}
          href={`/dashboard/technician/bookings/${job.id}`}
          className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 transition hover:border-accent/40"
        >
          <div>
            <p className="font-semibold text-foreground">{job.service.title}</p>
            <div className="mt-1 flex items-center gap-3 text-[13px] text-muted-foreground">
              <span className="flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> {job.customer.name}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(job.scheduledAt).toLocaleString("en-BD", { dateStyle: "medium", timeStyle: "short" })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={job.status as any} />
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Link>
      ))}
    </div>
  );
}