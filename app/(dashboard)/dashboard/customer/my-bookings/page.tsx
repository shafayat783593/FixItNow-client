
import { getMyBookingsAction } from "@/app/(public)/_action/booking";
import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";
import { PackageSearch } from "lucide-react";
import Link from "next/link";
import { BookingFilter } from "../../_components/Booking/BookingFilter";
import BookingsTable from "../../_components/Booking/BookingsTable";
import { Pagination } from "@/app/(public)/_components/pagenation";

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
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Dashboard</p>
        <h1 className="mt-2 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          My bookings
        </h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <UniversalSearchBar />
          <BookingFilter/>
        </div>

        {bookings.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <PackageSearch className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">No bookings match your search.</p>
            <Link href="/services" className="mt-4 inline-block rounded-full bg-primary px-5 py-2 text-[13px] font-semibold text-primary-foreground transition hover:opacity-90">
              Browse services
            </Link>
          </div>
        ) : (
          <div className="mt-6">
            <BookingsTable bookings={bookings} />
          </div>
        )}

        <Pagination meta={meta} />
      </div>
    </main>
  );
}