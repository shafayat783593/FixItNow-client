import { serverFetch } from "@/lib/api/serverFetch";

export interface IReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}

export async function createReviewAction(payload: IReviewPayload) {
  const res = await serverFetch("/api/reviews", {
    method: "POST",
    body: payload,
  });
  return res;
}

export async function deleteReviewAction(reviewId: string) {
  const res = await serverFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  return res;
}