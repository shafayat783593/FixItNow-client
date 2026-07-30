import { serverFetch } from "@/lib/api/serverFetch";
import { number } from "framer-motion";


export interface IServiceQuery {
  searchItem?: string;
  category?: string;
  minPrice?: number | string;
  maxPrice?: number | string;
  rating?: number | string;
  location?: string;
  page?: string | number;
  limit?: string | number;
}



export const getAllService = async (query?: IServiceQuery) => {

  console.log(query, "quary sercices..................")
  const params = new URLSearchParams();
if (query?.searchItem && query.searchItem.trim() !== "") {
    params.set("searchItem", query.searchItem.trim());
  }

  if (query?.category && query.category.trim() !== "") {
    params.set("category", query.category.trim());
  }

  if (query?.location && query.location.trim() !== "") {
    params.set("location", query.location.trim());
  }

  if (query?.minPrice !== undefined && query.minPrice !== null && query.minPrice !== "") {
    params.set("minPrice", query.minPrice.toString());
  }

  if (query?.maxPrice !== undefined && query.maxPrice !== null && query.maxPrice !== "") {
    params.set("maxPrice", query.maxPrice.toString());
  }

  if (query?.rating !== undefined && query.rating !== null && query.rating !== "") {
    params.set("rating", query.rating.toString());
  }

  if (query?.page) {
    params.set("page", query.page.toString());
  }

  if (query?.limit) {
    params.set("limit", query.limit.toString());
  }

  const queryString = params.toString();
  //   const url = queryString ? `/api/technician?${queryString}` : "/api/technician";

  const res = await serverFetch(`/api/services?${queryString}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: ["services"],
    },
  });

  return res.data;
};


export async function getSingleService(id: string) {
  if (!id) return null;

  const res = await serverFetch(`/api/services/${id}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: [`service-${id}`, "services"],
    },
  });

  console.log()
  return res?.data || res || null;
}