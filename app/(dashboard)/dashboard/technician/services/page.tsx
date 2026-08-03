import Link from "next/link";
import { Plus, Wrench } from "lucide-react";
import { UniversalSearchBar } from "@/components/shared/UniversalSearchBar";

import { Button } from "@/components/ui/button";
import { getAllCategoriesAction, getMyServicesAction } from "@/lib/api/service";
import { ServiceFilter } from "../../_components/technician/ServiceFilter";
import ServicesTable from "../../_components/technician/ServicesTable";
import { Pagination } from "@/app/(public)/_components/pagenation";

export default async function ManageServicesPage({
  searchParams,
}: {
  searchParams: Promise<{ searchItem?: string; category?: string; page?: string }>;
}) {
  const { searchItem, category, page } = await searchParams;

  // const [services , categoriesRes] = await Promise.all([
  //   getMyServicesAction(),
  //   getAllCategoriesAction(),
  // ]);

  const services = await getMyServicesAction()
   const categoriesRes = await getAllCategoriesAction()



  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Technician</p>
            <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              My services
            </h1>
          </div>
          <Button asChild>
            <Link href="/dashboard/technician/services/create">
              <Plus className="mr-1.5 h-4 w-4" /> Create service
            </Link>
          </Button>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <UniversalSearchBar />
          <ServiceFilter categories={categoriesRes.data} />
        </div>

        {services?.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-border bg-card py-16 text-center">
            <Wrench className="mx-auto h-8 w-8 text-muted-foreground/40" />
            <p className="mt-3 text-sm text-muted-foreground">You haven&apos;t created any services yet.</p>
            <Button asChild className="mt-4">
              <Link href="/dashboard/technician/services/create">Create your first service</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-6">
            <ServicesTable services={services.data} />
          </div>
        )}

        {/* <Pagination meta={meta} /> */}
      </div>
    </main>
  );
}