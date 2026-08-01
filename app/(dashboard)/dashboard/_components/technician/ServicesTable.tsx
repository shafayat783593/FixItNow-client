import Link from "next/link";
import { Pencil } from "lucide-react";
import DeleteServiceButton from "./DeleteServiceButton";
import { IService } from "@/lib/api/service";

export default function ServicesTable({ services }: { services: IService[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-muted/50 text-[11px] uppercase tracking-wide text-muted-foreground">
          <tr>
            <th className="px-4 py-3 font-semibold">Title</th>
            <th className="hidden px-4 py-3 font-semibold sm:table-cell">Category</th>
            <th className="hidden px-4 py-3 font-semibold md:table-cell">Duration</th>
            <th className="px-4 py-3 font-semibold">Price</th>
            <th className="px-4 py-3 text-right font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {services.map((s) => (
            <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/40">
              <td className="px-4 py-3 font-medium text-foreground">{s.title}</td>
              <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">{s.category?.name}</td>
              <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{s.duration} mins</td>
              <td className="px-4 py-3 font-semibold text-foreground">${s.price}</td>
              <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-2">
                  <Link
                    href={`/dashboard/technician/services/${s.id}/edit`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[12px] font-semibold text-foreground transition hover:bg-muted"
                  >
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </Link>
                  <DeleteServiceButton serviceId={s.id} title={s.title} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}