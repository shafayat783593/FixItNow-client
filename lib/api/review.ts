import { serverFetch } from "@/lib/api/serverFetch";

export interface IReviewPayload {
  bookingId: string;
  rating: number;
  comment?: string;
}


export interface IFeaturedReview {
  id: string;
  rating: number;
  comment: string | null;
  createdAt: string;
  customer: {
    id: string;
    name: string;
    avatar?: string | null
  };
  technician: {
    id: string;
    user: { name: string }
  };
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


export async function getFeaturedReviews(limit = 8): Promise<IFeaturedReview[]> {
  const res = await serverFetch(`/api/reviews/featured?limit=${limit}`, {
    next: { revalidate: 600, tags: ["reviews-featured"] },
  });
  return res?.data ?? [];
}
 