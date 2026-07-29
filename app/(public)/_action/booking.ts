import { serverFetch } from "@/lib/api/serverFetch";


export interface IBookingPayload {
  serviceId: string;
  scheduledAt: string;
  address: string;
  notes?: string;
}

export async function createBookingAction(payload: IBookingPayload) {
  const res = await serverFetch("/api/bookings", {
    method: "POST",
    body: payload,
  });

  return res;
}