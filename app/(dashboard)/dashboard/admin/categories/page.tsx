import { Suspense } from "react";
import { LayoutGrid } from "lucide-react";
import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";
import { getAllCategoriesAction } from "@/lib/api/admin.api";
import { CategoriesTable } from "../../_components/admin/CategoriesTable";
import { Pagination } from "@/app/(public)/_components/pagenation";
import { CategoryFormModal } from "../../_components/admin/CategoryFormModal";
import { CategorySortFilter } from "../../_components/admin/CategorySortFilter";
import { CategoriesTableSkeleton } from "../../_components/admin/CategoriesTableSkeleton";


interface CategoriesPageSearchParams {
  searchItem?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: string;
}

async function CategoriesTableSection({ searchParams }: { searchParams: CategoriesPageSearchParams }) {
  const {  data:categories, meta } = await getAllCategoriesAction({
    ...searchParams,
    limit: 10,
  });

  console.log("category ..................",categories)
  return (
    <>
      {categories.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
          <LayoutGrid className="mx-auto h-8 w-8 text-muted-foreground/40" />
          <p className="mt-3 text-sm text-muted-foreground">No categories match your search.</p>
        </div>
      ) : (
        <div className="mt-6">
          <CategoriesTable categories={categories} />
        </div>
      )}
      <Pagination meta={meta} />
    </>
  );
}

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<CategoriesPageSearchParams>;
}) {
  const resolvedSearchParams = await searchParams;

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Category management
            </h1>
          </div>
          <CategoryFormModal mode="create" />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <UniversalSearchBar />
          <CategorySortFilter />
        </div>

        {/* <Suspense fallback={<CategoriesTableSkeleton />} key={JSON.stringify(resolvedSearchParams)}> */}
          <CategoriesTableSection searchParams={resolvedSearchParams} />
        {/* </Suspense> */}
      </div>
    </main>
  );
}