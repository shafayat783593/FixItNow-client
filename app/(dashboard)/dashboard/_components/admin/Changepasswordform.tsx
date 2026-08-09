"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2, KeyRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { serverFetch } from "@/lib/api/serverFetch";

export function ChangePasswordForm() {
  const [values, setValues] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  function setField(key: keyof typeof values, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors({});

    const nextErrors: Record<string, string> = {};
    if (!values.oldPassword) nextErrors.oldPassword = "Enter your current password";
    if (values.newPassword.length < 8) nextErrors.newPassword = "Must be at least 8 characters";
    if (values.newPassword !== values.confirmPassword) nextErrors.confirmPassword = "Passwords do not match";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await serverFetch("/api/auth/change-password", {
        method: "PATCH",
        body: { oldPassword: values.oldPassword, newPassword: values.newPassword },
      });

      if (!res?.success) {
        toast.error(res?.message ?? "Could not change password.");
        return;
      }

      toast.success("Password changed successfully");
      setValues({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch {
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
      <div className="flex items-center gap-2">
        <KeyRound className="h-4 w-4 text-muted-foreground" />
        <p className="font-semibold text-foreground">Change password</p>
      </div>
      <p className="mt-1 text-[13px] text-muted-foreground">
        Choose a strong password you don&apos;t use elsewhere.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Current password
          </label>
          <Input
            type="password"
            value={values.oldPassword}
            onChange={(e) => setField("oldPassword", e.target.value)}
          />
          {errors.oldPassword && <p className="mt-1 text-[12px] text-destructive">{errors.oldPassword}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            New password
          </label>
          <Input
            type="password"
            value={values.newPassword}
            onChange={(e) => setField("newPassword", e.target.value)}
          />
          {errors.newPassword && <p className="mt-1 text-[12px] text-destructive">{errors.newPassword}</p>}
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Confirm new password
          </label>
          <Input
            type="password"
            value={values.confirmPassword}
            onChange={(e) => setField("confirmPassword", e.target.value)}
          />
          {errors.confirmPassword && <p className="mt-1 text-[12px] text-destructive">{errors.confirmPassword}</p>}
        </div>

        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Update password
        </Button>
      </form>
    </div>
  );
}