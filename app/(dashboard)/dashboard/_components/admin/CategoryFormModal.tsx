"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Plus, Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categorySchema } from "@/lib/validations/category.schema";
import { createCategoryAction, ICategory, updateCategoryAction } from "@/lib/api/admin.api";



interface CategoryFormModalProps {
  mode: "create" | "edit";
  category?: ICategory;
}

export function CategoryFormModal({ mode, category }: CategoryFormModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(category?.name ?? "");
  const [description, setDescription] = useState(category?.description ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const isEdit = mode === "edit";



async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  setErrors({});

  const parsed = categorySchema.safeParse({ name, description });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[issue.path[0] as string] = issue.message;
    }
    setErrors(fieldErrors);
    return;
  }

  setLoading(true);
  try {
    const payload = {
      ...parsed.data,
      description: parsed.data.description || undefined,
    };

    const res = isEdit
      ? await updateCategoryAction(category!.id, payload)
      : await createCategoryAction(payload);

    if (res?.success === false) {
      toast.error(res.message ?? "Could not save category.");
      return;
    }

    toast.success(isEdit ? "Category updated" : "Category created");
    setOpen(false);

    if (!isEdit) {
      setName("");
      setDescription("");

      // Redirect after create
      router.push("/dashboard/admin/categories");
      return;
    }

    router.refresh();
  } catch {
    toast.error("Something went wrong. Try again.");
  } finally {
    setLoading(false);
  }
}

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {isEdit ? (
          <button className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[12px] font-semibold text-foreground transition hover:bg-muted">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
        ) : (
          <Button>
            <Plus className="mr-1.5 h-4 w-4" /> Create category
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit category" : "Create category"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Name
            </label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Plumbing" />
            {errors.name && <p className="mt-1 text-[12px] text-destructive">{errors.name}</p>}
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Description (optional)
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="What kind of services fall under this category?"
            />
            {errors.description && <p className="mt-1 text-[12px] text-destructive">{errors.description}</p>}
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isEdit ? "Save changes" : "Create category"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}