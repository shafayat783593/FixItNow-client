import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getAllCategoriesAction } from "@/lib/api/service";
import ServiceForm from "../../../_components/technician/ServiceForm";


export default async function CreateServicePage() {
  const { data: categories } = await getAllCategoriesAction();

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-lg px-6">
        <Link
          href="/dashboard/technician/services"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-accent"
        >
          <ArrowLeft size={16} /> Back to services
        </Link>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">New service</p>
        <h1 className="mt-1 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          Create a service
        </h1>

        <div className="mt-6">
          <ServiceForm categories={categories} />
        </div>
      </div>
    </main>
  );
}