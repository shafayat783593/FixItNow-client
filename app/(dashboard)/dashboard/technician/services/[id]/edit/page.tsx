import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCategoriesAction, getSingleService } from "@/lib/api/service";
import ServiceForm from "@/app/(dashboard)/dashboard/_components/technician/ServiceForm";


export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [service, { data: categories }] = await Promise.all([
    getSingleService(id),
    getAllCategoriesAction(),
  ]);

  if (!service) notFound();

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-lg px-6">
        <Link
          href="/dashboard/technician/services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to services
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Edit service</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          {service.title}
        </h1>

        <div className="mt-6">
          <ServiceForm categories={categories} initialData={service} />
        </div>
      </div>
    </main>
  );
}