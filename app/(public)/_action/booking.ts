import { serverFetch } from "@/lib/api/serverFetch";


export interface IBookingPayload {
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes?: string;
}

export interface IBookingQuery {
  searchItem?: string;
  status?: string;
  page?: string | number;
  limit?: string | number;
}

export async function createBookingAction(payload: IBookingPayload) {
  const res = await serverFetch("/api/bookings", {
    method: "POST",
    body: payload,
  });

  return res;
}


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