import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CategoryFormModal } from "./CategoryFormModal";
import { DeleteCategoryButton } from "./DeleteCategoryButton";
import { ICategory } from "@/lib/api/admin.api";

export function CategoriesTable({ categories }: { categories: ICategory[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">Description</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((c) => (
            <TableRow key={c.id}>
              <TableCell className="font-medium text-foreground">{c.name}</TableCell>
              <TableCell className="hidden text-muted-foreground sm:table-cell">
                {c.description || "—"}
              </TableCell>
              <TableCell className="hidden text-muted-foreground md:table-cell">
                {new Date(c.createdAt).toLocaleDateString("en-BD", { dateStyle: "medium" })}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                  <CategoryFormModal mode="edit" category={c} />
                  <DeleteCategoryButton id={c.id} name={c.name} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}