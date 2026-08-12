import { serverFetch } from "@/lib/api/serverFetch";

export async function createCheckoutSessionAction(bookingId: string) {
  const res = await serverFetch("/api/payments/checkout", {
    method: "POST",
    body: { bookingId },
  });
  return res; 
}


export async function getMyPaymentsAction(query?: { status?: string; page?: string | number; limit?: string | number }) {
    const params = new URLSearchParams();
    if (query?.status) params.set("status", query.status);
    if (query?.page) params.set("page", String(query.page));
    if (query?.limit) params.set("limit", String(query.limit));

    const res = await serverFetch(`/api/payments?${params.toString()}`, {
    next: { tags: ["payments"] },
    });
  return res?.data ?? { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
}

export async function getPaymentByIdAction(id: string) {
  const res = await serverFetch(`/api/payments/${id}`, {
    next: { tags: ["payments", `payment-${id}`] },
  });
  return res?.success ? res.data : null;
}