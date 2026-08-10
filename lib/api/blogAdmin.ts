import { serverFetch } from "@/lib/api/serverFetch";
import { IBlogPost } from "@/lib/api/blog";
import { BlogPostFormValues } from "../validations/block";

export interface IBlogAdminQuery {
  searchItem?: string;
  sortBy?: "title" | "createdAt";
  sortOrder?: "asc" | "desc";
  page?: string | number;
  limit?: string | number;
}

export async function getAllBlogPostsAdminAction(query?: IBlogAdminQuery) {
  const params = new URLSearchParams();
  if (query?.searchItem) params.set("searchItem", query.searchItem);
  if (query?.sortBy) params.set("sortBy", query.sortBy);
  if (query?.sortOrder) params.set("sortOrder", query.sortOrder);
  if (query?.page) params.set("page", String(query.page));
  if (query?.limit) params.set("limit", String(query.limit));

  const res = await serverFetch(`/api/blog/admin/all?${params.toString()}`, {
    next: { tags: ["admin-blog"] },
  });

  return res?.data ?? { data: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
}

export async function getBlogPostByIdAdminAction(id: string): Promise<IBlogPost | null> {
  const res = await serverFetch(`/api/blog/admin/${id}`, {
    next: { tags: ["admin-blog", `admin-blog-${id}`] },
  });
  return res?.success ? res.data : null;
}

export async function createBlogPostAction(payload: BlogPostFormValues) {
  const res = await serverFetch("/api/blog", {
    method: "POST",
    body: payload,
  });
  return res;
}

export async function updateBlogPostAction(id: string, payload: Partial<BlogPostFormValues>) {
  const res = await serverFetch(`/api/blog/${id}`, {
    method: "PATCH",
    body: payload,
  });
  return res;
}

export async function deleteBlogPostAction(id: string) {
  const res = await serverFetch(`/api/blog/${id}`, {
    method: "DELETE",
  });
  return res;
}