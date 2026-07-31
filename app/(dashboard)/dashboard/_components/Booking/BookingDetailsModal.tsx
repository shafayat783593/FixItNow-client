"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar, MapPin, User, FileText, DollarSign } from "lucide-react";
import StatusBadge from "./BookingStatusBadge";
import { IBooking } from "./BookingType";

interface BookingDetailsModalProps {
  booking: IBooking | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BookingDetailsModal({
  booking,
  isOpen,
  onClose,
}: BookingDetailsModalProps) {
  if (!booking) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md rounded-2xl bg-card border-border p-6 shadow-2xl">
        <DialogHeader className="flex flex-row items-center justify-between border-b border-border pb-4">
          <div>
            <DialogTitle className="text-lg font-bold text-foreground">
              Booking Details
            </DialogTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              ID: {booking.id}
            </p>
          </div>
          <StatusBadge status={booking.status} />
        </DialogHeader>

        <div className="space-y-4 pt-4 text-sm">
          {/* Customer */}
          <div className="flex items-start gap-3">
            <User className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">{booking.customer?.name}</p>
              <p className="text-xs text-muted-foreground">{booking.customer?.email}</p>
              {booking.customer?.phone && (
                <p className="text-xs text-muted-foreground">{booking.customer?.phone}</p>
              )}
            </div>
          </div>

          {/* Service & Date */}
          <div className="flex items-start gap-3">
            <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-semibold text-foreground">{booking.service?.title}</p>
              <p className="text-xs text-muted-foreground">
                {new Date(booking.scheduledAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Address</p>
              <p className="text-xs text-muted-foreground">{booking.address}</p>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Customer Notes</p>
                <p className="text-xs text-muted-foreground bg-muted p-2.5 rounded-lg mt-1">
                  {booking.notes}
                </p>
              </div>
            </div>
          )}

          {/* Payment Info */}
          <div className="flex items-start gap-3 border-t border-border pt-4">
            <DollarSign className="h-5 w-5 text-accent mt-0.5" />
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="font-semibold text-foreground">Total Price</p>
                <p className="text-xs text-muted-foreground">
                  Status: {booking.payment?.status || "UNPAID"}
                </p>
              </div>
              <p className="text-lg font-bold text-accent">
                ${booking.service?.price}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}