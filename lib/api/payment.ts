import { serverFetch } from "@/lib/api/serverFetch";

export async function createCheckoutSessionAction(bookingId: string) {
  const res = await serverFetch("/api/payments/checkout", {
    method: "POST",
    body: { bookingId },
  });
  return res; 
}


export async function getMyPaymentsAction() {
    const res = await serverFetch("/api/payments", {
    next: { tags: ["payments"] },
    });
    console.log("paymet data ",res)
  return res; // { data: IPayment[] }
}