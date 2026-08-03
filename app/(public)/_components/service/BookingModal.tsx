"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { getMe } from "@/hooks/getMe";
import BookingForm from "./BookingForm";

export default function BookingModal({ serviceId, technicianId }: { serviceId: string, technicianId: string }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [checking, setChecking] = useState(false);

  const handleOpen = async () => {
    setChecking(true);
    try {
      const res = await getMe();
      const currentUser = res.data.profile || res.data || res;


      if (!currentUser) {
        toast.error("Please log in to book a service.");
        router.push(`/login?redirectTo=/services/${serviceId}`);
        return;
      }

      setOpen(true);
    } catch (err) {
      toast.error("Please log in to book a service.");
      router.push(`/login?redirectTo=/services/${serviceId}`);
    } finally {
      setChecking(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpen}
        disabled={checking}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all duration-200 hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
      >
        {checking ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            Checking...
          </>
        ) : (
          "Book Service Now"
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-card p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-foreground">Book this service</h3>
              <button onClick={() => setOpen(false)} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
                <X size={18} />
              </button>
            </div>
            <BookingForm
              serviceId={serviceId}
              technicianId={technicianId}
              onSuccess={() => setOpen(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}