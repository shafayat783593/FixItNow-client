



import { serverFetch } from "@/lib/api/serverFetch";

export interface ITechnicianQuery {
    searchItem?: string;
    page?: string | number;
    limit?: string | number;
}

export const getAllTechnicians = async (query?: ITechnicianQuery) => {
    console.log(query,"quary tecnicinls..................")
  const params = new URLSearchParams();

  // খালি স্ট্রিং না থাকলে এবং ট্রিম করার পর ডাটা থাকলে সার্চটার্ম সেট হবে
  if (query?.searchItem && query.searchItem.trim() !== "") {
    params.set("searchItem", query.searchItem.trim());
  }

  if (query?.page) {
    params.set("page", query.page.toString());
  }

  if (query?.limit) {
    params.set("limit", query.limit.toString());
  }

  const queryString = params.toString();
// 
  const res = await serverFetch(`/api/technician?${queryString}`, {
    cache: "force-cache",
    next: {
      revalidate: 3600,
      tags: ["technician"],
    },
  });

  return res.data;
};

export const getTechnicianById = async (id: string) => {
    console.log(id)
    const res = await serverFetch(`/api/technician/${id}`, {
        next: {
            tags: ["single-technician"],
        },
    }
    )
    console.log(res.data,"single techinican")
    return res.data
}