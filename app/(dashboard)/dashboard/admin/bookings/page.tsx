import { Suspense } from "react";
import { PackageSearch } from "lucide-react";
import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";
import { getAllBookingsAction } from "@/lib/api/admin.api";
import { AdminBookingsTable } from "../../_components/admin/AdminBookingsTable";
import { Pagination } from "@/app/(public)/_components/pagenation";
import { BookingFilter } from "../../_components/admin/BookingFilter";
import { BookingsTableSkeleton } from "../../_components/admin/BookingsTableSkeleton";


interface BookingsPageSearchParams {
  searchItem?: string;
  status?: string;
  page?: string;
}

async function BookingsTableSection({ searchParams }: { searchParams: BookingsPageSearchParams }) {
  const { data: bookings, meta } = await getAllBookingsAction({
    ...searchParams,
    limit: 10,
  });

  return (
    <>
      {bookings.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <PackageSearch className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No bookings match your filters.</p>
        </div>
      ) : (
        <div className="mt-6">
          <AdminBookingsTable bookings={bookings} />
        </div>
      )}
      <Pagination meta={meta} />
    </>
  );
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<BookingsPageSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Booking management
        </h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <UniversalSearchBar />
          <BookingFilter />
        </div>

          <BookingsTableSection searchParams={resolvedSearchParams} />
      </div>
    </main>
  );
}