"use client";

import { useState } from "react";
import { X } from "lucide-react";
import BookingForm from "./BookingForm";

export default function BookingModal({ serviceId }: { serviceId: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center rounded-2xl bg-[#0F1B2B] py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:bg-amber-400 hover:text-[#0F1B2B]"
      >
        Book Service Now
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center sm:p-4"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:max-w-lg sm:rounded-3xl sm:p-8"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#0F1B2B]">Book this service</h3>
              <button onClick={() => setOpen(false)} className="rounded-full p-1.5 hover:bg-slate-100">
                <X size={18} />
              </button>
            </div>
            <BookingForm serviceId={serviceId} />
          </div>
        </div>
      )}
    </>
  );
}