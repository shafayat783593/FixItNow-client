

export type Role = "CUSTOMER" | "TECHNICIAN" | "ADMIN";
export type UserStatus = "ACTIVE" | "BANNED";

export interface IUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: UserStatus;
  createdAt: string;
  technicianProfile?: {
    location?: string;
    rating?: number;
  } | null;
}


export interface IAdminBooking {
  id: string;
  status: string;
  scheduledAt: string;
  createdAt: string;
  customer: { id: string; name: string; email: string; phone?: string };
  technician: { id: string; user: { id: string; name: string; email: string } };
  service: { id: string; title: string; price: number; category?: { name: string } };
  payment?: { status: string; amount: number } | null;
  review?: { rating: number } | null;
}
export interface ICategory {
  id: string;
  name: string;
  description?: string;
  createdAt:Date
}


import { serverFetch } from "@/lib/api/serverFetch";
import { CategoryFormValues } from "../validations/category.schema";

export interface IAdminQuery {
  searchItem?: string; // UniversalSearchBar এর URL param নাম
  role?: string;
  status?: string;
  page?: string | number;
  limit?: string | number;
}

export async function getAllUsersAction(query?: IAdminQuery) {
  const params = new URLSearchParams();

  // ⚠️ frontend "searchItem" কে backend "searchUser" এ ম্যাপ করা হচ্ছে
  if (query?.searchItem) params.set("searchItem", query.searchItem);
  if (query?.role) params.set("role", query.role);
  if (query?.status) params.set("status", query.status);
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const res = await serverFetch(`/api/admin/users?${params.toString()}`, {
    next: { tags: ["admin-users"] },
  });
  return res.data; // { data, meta } envelope এর ভেতরের অংশ backend এ যেভাবে wrap হয়
}

export async function updateUserStatusAction(id: string, status: "ACTIVE" | "BANNED") {
  const res = await serverFetch(`/api/admin/users/${id}`, {
    method: "PUT",
    body: { status },
  });
  return res.data;
}




export async function getAllBookingsAction(query?: IAdminQuery) {
  const params = new URLSearchParams();
  if (query?.searchItem) params.set("searchItem", query.searchItem);
  if (query?.status) params.set("status", query.status);
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const res = await serverFetch(`/api/admin/bookings?${params.toString()}`, {
    next: { tags: ["admin-bookings"] },
  });
  return res.data;
}




export interface ICategoryQuery {
  searchItem?: string;
  sortBy?: "name" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: string | number;
  limit?: string | number;
}

export async function getAllCategoriesAction(query?: ICategoryQuery) {
  const params = new URLSearchParams();
  if (query?.searchItem) params.set("searchItem", query.searchItem);
  if (query?.sortBy) params.set("sortBy", query.sortBy);
  if (query?.sortOrder) params.set("sortOrder", query.sortOrder);
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const res = await serverFetch(`/api/categories?${params.toString()}`, {
    next: { tags: ["admin-categories"] },
  });


  
  return res.data
}

export async function createCategoryAction(payload: CategoryFormValues) {
  const res = await serverFetch("/api/admin/categories", {
    method: "POST",
    body: payload,
  });
  return res;
}

export async function updateCategoryAction(id: string, payload: CategoryFormValues) {
  const res = await serverFetch(`/api/admin/categories/${id}`, {
    method: "PUT",
    body: payload,
  });
  return res;
}

export async function deleteCategoryAction(id: string) {
  const res = await serverFetch(`/api/admin/categories/${id}`, {
    method: "DELETE",
  });
  return res;
}