import { serverFetch } from "@/lib/api/serverFetch";


export interface IServiceQuery {
    searchItem?: string;
    page?: string | number;
    limit?: string | number;
}



export const getAllService= async (query?: IServiceQuery) => {
    console.log(query,"quary sercices..................")
  const params = new URLSearchParams();

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