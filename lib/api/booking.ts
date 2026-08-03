import { serverFetch } from "@/lib/api/serverFetch";


export interface IBookingPayload {
  serviceId: string;
  date: string;
  time: string;
  address: string;
  note?: string;
}

export interface IBookingQuery {
  searchItem?: string;
  status?: string;
  page?: string | number;
  limit?: string | number;
}

export interface IAvailableSlot {
  startTime: string; // "09:00"
  endTime: string;   // "10:00"
}



export interface ICreateBookingPayload {
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes?: string;
}

export type BookingStatus =
  | "REQUESTED"
  | "ACCEPTED"
  | "DECLINED"
  | "PAID"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "CANCELLED";

export const createBooking = async (payload: ICreateBookingPayload) => {
  const res = await serverFetch("/api/bookings", {
   method: "POST",
    body: payload,
  });


  return res;
};

export async function getMyBookingsAction(query?: IBookingQuery) {
  const params = new URLSearchParams();
  if (query?.searchItem) params.set("searchItem", query.searchItem);
  if (query?.status) params.set("status", query.status);
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const res = await serverFetch(`/api/bookings?${params.toString()}`, {
    next: { tags: ["bookings"] },
  });
  return res;
}


export async function getBookingByIdAction(id: string) {
  const res = await serverFetch(`/api/bookings/${id}`, {
    next: { tags: [`booking-${id}`] },
  });
  return res;
}

export async function cancelBookingAction(bookingId: string) {
  const res = await serverFetch(`/api/bookings/${bookingId}/cancel`, {
    method: "PATCH",
  });
  return res;
}



export const getAvailableSlots = async (technicianId: string, date: string, serviceId: string): Promise<IAvailableSlot[]> => {
  const params = new URLSearchParams({ date, serviceId });

  const res = await serverFetch(`/api/technician/${technicianId}/available-slots?${params.toString()}`,
    { credentials: "include" }
  );



  return res.data || [];
};





export const getTechnicianBooking = async (query?: IBookingQuery) => {
  const params = new URLSearchParams();

  if (query?.status && query.status !== "ALL") {
    params.set("status", query.status);
  }
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const queryString = params.toString();
  const url = `/api/technician/bookings${queryString ? `?${queryString}` : ""}`;


  const res = await serverFetch(url);
  return res;
};




export const updateBookingStatus = async (bookingId: string, actionStatus: BookingStatus) => {
  const res = await serverFetch(`/api/technician/bookings/${bookingId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: { action: actionStatus }
  });
  return res;
};



export interface ICustomerDashboardStats {
  totalBookings: number;
  activeBookings: number;
  completedBookings: number;
  totalSpent: number;
  recentBookings: {
    id: string;
    status: string;
    scheduledAt: string;
    createdAt: string;
    service: { id: string; title: string; price: number };
    technician: { user: { name: string } };
  }[];
}

export async function getCustomerDashboardStatsAction() {
  const res = await serverFetch("/api/bookings/dashboard/stats", {
    next: { tags: ["customer-stats"] },
  });
  return res?.data ?? res;
}