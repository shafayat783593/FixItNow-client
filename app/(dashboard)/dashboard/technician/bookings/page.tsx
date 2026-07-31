"use client";

import { useState, useEffect } from "react";


// shadcn table primitives
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Loader2, Inbox } from "lucide-react";
import { BookingActions } from "../../_components/Booking/BookingActions";
import { BookingDetailsModal } from "../../_components/Booking/BookingDetailsModal";
import StatusBadge from "../../_components/Booking/BookingStatusBadge";
import { BookingStatus, IBooking,  } from "../../_components/Booking/BookingType";
import { getTechnicianBooking } from "@/lib/api/booking";

export default function TechnicianBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
  setLoading(true);
  try {
    const res = await getTechnicianBooking(); 
    console.log("all booking.............", res);

    const bookingData = res?.data || res?.result || (Array.isArray(res) ? res : []);
    
    setBookings(bookingData);
  } catch (err) {
    console.error("Failed to load bookings", err);
  } finally {
    setLoading(false);
  }
};
  const handleStatusUpdate = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  // Filtered List
  const filteredBookings = bookings.filter((b) =>
    filterStatus === "ALL" ? true : b.status === filterStatus
  );

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Booking Management
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage customer service requests and track job progression.
          </p>
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
          {["ALL", "REQUESTED", "ACCEPTED", "PAID", "IN_PROGRESS", "COMPLETED"].map(
            (status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === status
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {status}
              </button>
            )
          )}
        </div>
      </div>

      {/* Main Table Container */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden shadow-sm">
        {loading ? (
          <div className="flex h-64 items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin text-accent" />
            <span>Loading bookings...</span>
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
            <Inbox className="h-10 w-10 stroke-1 text-muted-foreground/50 mb-2" />
            <p className="font-medium text-sm">No bookings found</p>
          </div>
        ) : (
          <Table>
            <TableHeader className="bg-muted/40">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-[200px] font-semibold text-foreground">
                  Customer
                </TableHead>
                <TableHead className="font-semibold text-foreground">Service</TableHead>
                <TableHead className="font-semibold text-foreground">Scheduled Date</TableHead>
                <TableHead className="font-semibold text-foreground">Status</TableHead>
                <TableHead className="text-right font-semibold text-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking.id} className="border-border hover:bg-muted/30">
                  {/* Customer Info */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground">
                        {booking.customer?.name || "N/A"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {booking.customer?.email}
                      </span>
                    </div>
                  </TableCell>

                  {/* Service Info */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {booking.service?.title}
                      </span>
                      <span className="text-xs font-semibold text-accent">
                        ${booking.service?.price}
                      </span>
                    </div>
                  </TableCell>

                  {/* Scheduled Date */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-foreground">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      {new Date(booking.scheduledAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <StatusBadge status={booking.status} />
                  </TableCell>

                  {/* Action Buttons */}
                  <TableCell className="text-right">
                    <div className="flex justify-end">
                      <BookingActions
                        bookingId={booking.id}
                        currentStatus={booking.status}
                        onStatusUpdate={handleStatusUpdate}
                        onViewDetails={() => setSelectedBooking(booking)}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Details Modal */}
      <BookingDetailsModal
        booking={selectedBooking}
        isOpen={!!selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}