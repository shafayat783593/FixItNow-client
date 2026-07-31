import { serverFetch } from "@/lib/api/serverFetch";

export interface ITechnicianQuery {
  searchItem?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: "rating" | "experience" | "newest";
  location?: string;
  minRating?: string | number;
}

export interface IAvailabilitySlot {
  id?: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  isAvailable?: boolean;
}

export const getAllTechnicians = async (query?: ITechnicianQuery) => {
  const params = new URLSearchParams();

  if (query?.searchItem && query.searchItem.trim() !== "") {
    params.set("searchItem", query.searchItem.trim());
  }
  if (query?.page) params.set("page", query.page.toString());
  if (query?.limit) params.set("limit", query.limit.toString());
  if (query?.sortBy) params.set("sortBy", query.sortBy);
  if (query?.location && query.location.trim() !== "") {
    params.set("location", query.location.trim());
  }
  if (query?.minRating) params.set("minRating", query.minRating.toString());

  const queryString = params.toString();

  const res = await serverFetch(`/api/technician?${queryString}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: ["technician"],
    },
  });

  return res.data;
};

export const  getTechnicianById = async (id: string) => {
  const res = await serverFetch(`/api/technician/${id}`, {
    next: {
      tags: ["single-technician"],
    },
  });
  return res.data;
};




export const getTechnicianAvailability = async () => {
  const res = await serverFetch("/api/technician/availability");
  return res;
};

// 2. Update technician availability
export const updateTechnicianAvailability = async (slots: IAvailabilitySlot[]) => {
  const res = await serverFetch("/api/technician/availability", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: { slots }, // JSON.stringify বাদ দেওয়া হয়েছে
  });

  return res;
};