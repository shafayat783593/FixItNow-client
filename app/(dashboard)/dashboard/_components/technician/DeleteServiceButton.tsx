"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
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
import { toast } from "sonner";
import { deleteServiceAction } from "@/lib/api/technician";

export default function DeleteServiceButton({ serviceId, title }: { serviceId: string; title: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
function handleDelete() {
  startTransition(async () => {
    const res = await deleteServiceAction(serviceId);
    if (res?.success === false) {
      toast.error(res.error ?? "Could not delete service.");
      return;
    }
    toast.success("Service deleted successfully");
    router.refresh();
  });
}
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 px-3 py-1.5 text-[12px] font-semibold text-destructive transition hover:bg-destructive/10">
          {isPending ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete &quot;{title}&quot;?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently remove the service. Existing bookings tied to it won&apos;t be affected, but customers won&apos;t be able to book it again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}