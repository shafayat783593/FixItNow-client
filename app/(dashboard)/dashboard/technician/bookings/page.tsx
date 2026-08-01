"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner"; // আপনার প্রোজেক্টে react-hot-toast থাকলে 'react-hot-toast' ইম্পোর্ট করতে পারেন

// shadcn table primitives
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Calendar, Inbox } from "lucide-react";
import { BookingActions } from "../../_components/Booking/BookingActions";
import { BookingDetailsModal } from "../../_components/Booking/BookingDetailsModal";
import StatusBadge from "../../_components/Booking/BookingStatusBadge";
import { BookingStatus, IBooking } from "../../_components/Booking/BookingType";
import { getTechnicianBooking } from "@/lib/api/booking";
import { BookingStatusFilter } from "../../_components/technician/BookingStatusFilter";
import { TableSkeleton } from "../../_components/technician/TableSkeleton";


export default function TechnicianBookingsPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [selectedBooking, setSelectedBooking] = useState<IBooking | null>(null);

  // Fetch bookings with dynamic status query
  const fetchBookings = useCallback(async (status: string) => {
    setLoading(true);
    try {
      const res = await getTechnicianBooking({ status});
    
      setBookings(res.data.data || []);
     
    } catch (err: any) {
      toast.error(err?.message || "Failed to load bookings");
      console.error("Failed to load bookings", err);
    } finally {
      setLoading(false);
    }
  }, []);

  

  useEffect(() => {
    fetchBookings(filterStatus);
  }, [filterStatus, fetchBookings]);

  const handleStatusChange = (newStatus: string) => {
    setFilterStatus(newStatus);
  };

  const handleStatusUpdate = (bookingId: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
    toast.success(`Booking status updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1
            className="text-2xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Booking Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            Manage customer service requests and track job progression.
          </p>
        </div>

        {/* Separated Status Filter Component */}
        <BookingStatusFilter
          currentStatus={filterStatus}
          onStatusChange={handleStatusChange}
          disabled={loading}
        />
      </div>

      {/* Main Table Container */}
      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow className="border-border hover:bg-transparent">
              <TableHead className="w-[220px] font-semibold text-foreground">
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
            {loading ? (
              <TableSkeleton rows={5} />
            ) : bookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center text-muted-foreground">
                    <Inbox className="h-10 w-10 stroke-1 text-muted-foreground/50 mb-2" />
                    <p className="font-medium text-sm text-foreground">No bookings found</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      No customer requests under the "{filterStatus}" filter.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              bookings.map((booking) => (
                <TableRow key={booking.id} className="border-border hover:bg-muted/30">
                  {/* Customer Info */}
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-foreground text-sm">
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
                      <span className="font-medium text-foreground text-sm">
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
                      {new Date(booking.scheduledAt).toLocaleString("en-BD", {
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
              ))
            )}
          </TableBody>
        </Table>
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