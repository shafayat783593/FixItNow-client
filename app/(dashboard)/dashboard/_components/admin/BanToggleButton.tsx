"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Ban, CheckCircle2, Loader2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { updateUserStatusAction } from "@/lib/api/admin.api";

export function BanToggleButton({ userId, name, status }: { userId: string; name: string; status: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isActive = status === "ACTIVE";
  const nextStatus = isActive ? "BANNED" : "ACTIVE";

  function handleToggle() {
    startTransition(async () => {
      const res = await updateUserStatusAction(userId, nextStatus);
      if (res?.success === false) {
        toast.error(res.message ?? "Could not update user status.");
        return;
      }
      toast.success(isActive ? `${name} has been banned` : `${name} has been unbanned`);
      router.refresh();
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          disabled={isPending}
          className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition disabled:opacity-50 ${
            isActive
              ? "border-destructive/30 text-destructive hover:bg-destructive/10"
              : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : isActive ? (
            <Ban className="h-3.5 w-3.5" />
          ) : (
            <CheckCircle2 className="h-3.5 w-3.5" />
          )}
          {isActive ? "Ban" : "Unban"}
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isActive ? `Ban ${name}?` : `Unban ${name}?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isActive
              ? "This user won't be able to log in or use the platform until unbanned."
              : "This user will regain full access to the platform."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleToggle}
            className={isActive ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
          >
            {isActive ? "Ban" : "Unban"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}