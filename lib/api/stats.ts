import { serverFetch } from "@/lib/api/serverFetch";

export interface IPublicStats {
  technicianCount: number;
  completedBookings: number;
  categoryCount: number;
  averageRating: number | null;
  reviewCount: number;
}

export async function getPublicStats(): Promise<IPublicStats | null> {
  const res = await serverFetch(`/api/stats`, {
    next: { revalidate: 600, tags: ["public-stats"] },
  });
  return res?.data ?? null;
}