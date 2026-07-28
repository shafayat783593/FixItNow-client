import { axiosInstance } from "./serverFetch";

export const adminApi = {
  getAllUsers: (params?: Record<string, string>) => {
    return axiosInstance.get("/admin/users", { params });
  },

  updateUser: (
    id: string,
    data: { role?: string; status?: string }
  ) => {
    return axiosInstance.patch(`/admin/users/${id}`, data);
  },

  getAllBookings: (params?: Record<string, string>) => {
    return axiosInstance.get("/admin/bookings", { params });
  },

  createCategory: (data: { name: string; description?: string }) => {
    return axiosInstance.post("/admin/categories", data);
  },


};

