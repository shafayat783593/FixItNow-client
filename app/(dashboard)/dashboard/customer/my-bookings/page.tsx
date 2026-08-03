import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { BookingFilter } from "../../_components/Booking/BookingFilter";
import BookingsTable from "../../_components/Booking/BookingsTable";
import { Pagination } from "@/app/(public)/_components/pagenation";
import { getMyBookingsAction } from "@/lib/api/booking";

export default async function MyBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ searchItem?: string; status?: string; page?: string }>;
}) {
  const { searchItem, status, page } = await searchParams;
  const { data: bookings, meta } = await getMyBookingsAction({
    searchItem,
    status,
    page: page ?? 1,
    limit: 10,
  });
  return (
    <main className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-7xl px-6 space-y-6">
        {/* Header */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Customer Dashboard
          </p>
          <h1
            className="mt-1 text-2xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            My Bookings
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Track your service requests, payment statuses, and schedule details.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
          <UniversalSearchBar />
          <BookingFilter />
        </div>

        {/* Content Section */}
        {!bookings || bookings.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border bg-card py-16 text-center shadow-sm">
            <PackageSearch className="mx-auto h-10 w-10 text-muted-foreground/40" />
            <p className="mt-3 text-sm font-medium text-foreground">
              No bookings match your criteria.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Explore our services and book your required technician today.
            </p>
            <Link
              href="/services"
              className="mt-5 inline-block rounded-xl bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition hover:opacity-90 shadow-sm"
            >
              Browse Services
            </Link>
          </div>
        ) : (
          <BookingsTable bookings={bookings} />
        )}

        {/* Pagination */}
        {meta && <Pagination meta={meta} />}
      </div>
    </main>
  );
}