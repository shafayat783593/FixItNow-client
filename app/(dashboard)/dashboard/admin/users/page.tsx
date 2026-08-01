import { Suspense } from "react";
import { Users } from "lucide-react";
import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";
import { getAllUsersAction } from "@/lib/api/admin.api";
import { UsersTable } from "../../_components/admin/UsersTable";
import { Pagination } from "@/app/(public)/_components/pagenation";
import { UserFilter } from "../../_components/admin/UserFilter";
import { UsersTableSkeleton } from "../../_components/admin/UsersTableSkeleton";



interface UsersPageSearchParams {
  searchItem?: string;
  role?: string;
  status?: string;
  page?: string;
}

async function UsersTableSection({ searchParams }: { searchParams: UsersPageSearchParams }) {
  const { data: users, meta } = await getAllUsersAction({...searchParams,limit: 10,
  });
  return (
    <>
      {users.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <Users className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No users match your filters.</p>
        </div>
      ) : (
        <div className="mt-6">
          <UsersTable users={users} />
        </div>
      )}
      <Pagination meta={meta} />
    </>
  );
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<UsersPageSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        {/* <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p> */}
        <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          User management
        </h1>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <UniversalSearchBar />
          <UserFilter />
        </div>

        <Suspense fallback={<UsersTableSkeleton />} key={JSON.stringify(resolvedSearchParams)}>
          <UsersTableSection searchParams={resolvedSearchParams} />
        </Suspense>
      </div>
    </main>
  );
}