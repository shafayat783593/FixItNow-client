"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IUser } from "@/lib/type";
import { profileSchema } from "@/lib/validations/auth";
import { updateProfileAction } from "@/hooks/getMe";
import Image from "next/image";

export function ProfileForm({ user }: { user: IUser }) {
  const router = useRouter();
  const [values, setValues] = useState({
    name: user.name ?? "",
    phone: user.phone ?? "",
      avatar: user.avatar ?? "",
  
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function setField<K extends keyof typeof values>(key: K, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const parsed = profileSchema.safeParse(values);
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
        name: parsed.data.name,
        phone: parsed.data.phone || undefined,
        avatar: parsed.data.avatar || undefined,
      };

      const res = await updateProfileAction(payload);

      if (res?.success === false) {
        toast.error(res.message ?? "Could not update profile.");
        return;
      }

      toast.success("Profile updated successfully");
      router.refresh();
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-4">
        <div className="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-muted">
  {values.avatar ? (
    <Image
      src={values.avatar}
      alt={values.name}
      fill
      className="object-cover"
      sizes="80px"
    />
  ) : (
    <User className="h-8 w-8 text-muted-foreground" />
  )}
</div>
        <div>
          <p className="font-semibold text-foreground">{user.name}</p>
          <p className="text-[13px] text-muted-foreground">{user.email}</p>
          <span className="mt-1 inline-block rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
            {user.role}
          </span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Name
          </label>
          <Input value={values.name} onChange={(e) => setField("name", e.target.value)} />
          {errors.name && <p className="mt-1 text-[12px] text-destructive">{errors.name}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Phone
          </label>
          <Input
            value={values.phone}
            onChange={(e) => setField("phone", e.target.value)}
            placeholder="01XXXXXXXXX"
          />
          {errors.phone && <p className="mt-1 text-[12px] text-destructive">{errors.phone}</p>}
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Avatar URL
          </label>
          <Input
            value={values.avatar}
            onChange={(e) => setField("avatar", e.target.value)}
            placeholder="https://..."
          />
          {errors.avatar && <p className="mt-1 text-[12px] text-destructive">{errors.avatar}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Email (read-only)
          </label>
          <Input value={user.email} disabled className="opacity-60" />
        </div>

        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save changes
        </Button>
      </form>
    </div>
  );
}