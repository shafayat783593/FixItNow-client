import { serverFetch } from "@/lib/api/serverFetch";



export const adminApi = {
 

};



 export const getAllUsers= (params?: Record<string, string>) => {
    return serverFetch.get("/admin/users", { params });
  }

  export const updateUser= (id: string,data: { role?: string; status?: string }) => {
    return serverFetch.patch(`/admin/users/${id}`, data);
  }

   export const getAllBookings= (params?: Record<string, string>) => {
    return serverFetch.get("/admin/bookings", { params });
  }

  export const createCategory= (data: { name: string; description?: string }) => {
    return serverFetch.post("/admin/categories", data);
  }

