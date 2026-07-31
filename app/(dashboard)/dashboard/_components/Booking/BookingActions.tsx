"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X, Play, CheckCircle2, Clock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateBookingStatus } from "@/lib/api/booking";
import { BookingStatus } from "./BookingType";

interface BookingActionsProps {
  bookingId: string;
  currentStatus: BookingStatus;
  onStatusUpdate: (bookingId: string, newStatus: BookingStatus) => void;
  onViewDetails: () => void;
}

export function BookingActions({
  bookingId,
  currentStatus,
  onStatusUpdate,
  onViewDetails,
}: BookingActionsProps) {
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const handleAction = async (actionStatus: BookingStatus) => {
    setLoadingAction(actionStatus);
    try {
      // API call from lib/api/booking
      await updateBookingStatus(bookingId, actionStatus);

      toast.success(`Booking marked as ${actionStatus.replace("_", " ")}`);
      onStatusUpdate(bookingId, actionStatus);
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Dynamic Status Action Buttons */}
      {currentStatus === "REQUESTED" && (
        <>
          <Button
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            disabled={!!loadingAction}
            onClick={() => handleAction("ACCEPTED")}
          >
            {loadingAction === "ACCEPTED" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Check className="mr-1 h-3.5 w-3.5" /> Accept
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-destructive/30 text-destructive hover:bg-destructive/10"
            disabled={!!loadingAction}
            onClick={() => handleAction("DECLINED")}
          >
            {loadingAction === "DECLINED" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <X className="mr-1 h-3.5 w-3.5" /> Decline
              </>
            )}
          </Button>
        </>
      )}

      {currentStatus === "ACCEPTED" && (
        <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/20">
          <Clock className="h-3.5 w-3.5 animate-spin" /> Waiting Payment
        </span>
      )}

      {currentStatus === "PAID" && (
        <Button
          size="sm"
          className="bg-[hsl(var(--accent))] text-[hsl(var(--accent-foreground))] hover:opacity-90 font-semibold"
          disabled={!!loadingAction}
          onClick={() => handleAction("IN_PROGRESS")}
        >
          {loadingAction === "IN_PROGRESS" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Play className="mr-1 h-3.5 w-3.5 fill-current" /> Start Job
            </>
          )}
        </Button>
      )}

      {currentStatus === "IN_PROGRESS" && (
        <Button
          size="sm"
          className="bg-[hsl(var(--success))] text-[hsl(var(--success-foreground))] hover:opacity-90 font-semibold"
          disabled={!!loadingAction}
          onClick={() => handleAction("COMPLETED")}
        >
          {loadingAction === "COMPLETED" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CheckCircle2 className="mr-1 h-3.5 w-3.5" /> Complete
            </>
          )}
        </Button>
      )}

      {/* Details Dialog Trigger */}
      <Button size="sm" variant="outline" className="border-border" onClick={onViewDetails}>
        Details
      </Button>
    </div>
  );
}