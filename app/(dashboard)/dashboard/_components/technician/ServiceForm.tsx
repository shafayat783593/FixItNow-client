"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ServiceFormValues, serviceSchema } from "@/lib/validations/technician";
import { createServiceAction, ICategory, IService, updateServiceAction } from "@/lib/api/service";

interface ServiceFormProps {
  categories: ICategory[];
  initialData?: IService;
}

export default function ServiceForm({ categories, initialData }: ServiceFormProps) {
  const router = useRouter();
  const isEdit = Boolean(initialData);

  const [values, setValues] = useState({
    title: initialData?.title ?? "",
    description: initialData?.description ?? "",
    categoryId: initialData?.categoryId ?? "",
    price: initialData?.price?.toString() ?? "",
    duration: initialData?.duration?.toString() ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof values>(key: K, value: (typeof values)[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = serviceSchema.safeParse(values);
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
      const payload: ServiceFormValues = {
        ...parsed.data,
        description: parsed.data.description || undefined,
      };

      const res = isEdit
        ? await updateServiceAction(initialData!.id, payload)
        : await createServiceAction(payload);

      if (res?.success === false) {
        toast.error(res.message ?? "Could not save service.");
        return;
      }

      toast.success(isEdit ? "Service updated successfully" : "Service created successfully");
      router.push("/dashboard/technician/services");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Title
        </label>
        <Input
          value={values.title}
          onChange={(e) => setField("title", e.target.value)}
          placeholder="e.g. AC repair & maintenance"
        />
        {errors.title && <p className="mt-1 text-[12px] text-destructive">{errors.title}</p>}
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Category
        </label>
        <Select value={values.categoryId} onValueChange={(v) => setField("categoryId", v)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.categoryId && <p className="mt-1 text-[12px] text-destructive">{errors.categoryId}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Price ($)
          </label>
          <Input
            type="number"
            value={values.price}
            onChange={(e) => setField("price", e.target.value)}
            placeholder="500"
          />
          {errors.price && <p className="mt-1 text-[12px] text-destructive">{errors.price}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Duration (mins)
          </label>
          <Input
            type="number"
            value={values.duration}
            onChange={(e) => setField("duration", e.target.value)}
            placeholder="60"
          />
          {errors.duration && <p className="mt-1 text-[12px] text-destructive">{errors.duration}</p>}
        </div>
      </div>

      <div>
        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Description
        </label>
        <Textarea
          value={values.description}
          onChange={(e) => setField("description", e.target.value)}
          rows={4}
          placeholder="What does this service include?"
        />
        {errors.description && <p className="mt-1 text-[12px] text-destructive">{errors.description}</p>}
      </div>

      <Button type="submit" disabled={loading} className="w-full">
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isEdit ? "Save changes" : "Create service"}
      </Button>
    </form>
  );
}