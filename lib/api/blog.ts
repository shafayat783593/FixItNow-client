import { serverFetch } from "@/lib/api/serverFetch";

export interface IBlogAuthor {
  id: string;
  name: string;
  avatar?: string | null;
}

export interface IBlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  published: boolean;
  author: IBlogAuthor;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogQuery {
  searchItem?: string;
  page?: string | number;
  limit?: string | number;
  sortBy?: "title" | "createdAt";
  sortOrder?: "asc" | "desc";
}

export interface IBlogListResponse {
  data: IBlogPost[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export async function getAllBlogPosts(query?: IBlogQuery): Promise<IBlogListResponse> {
  const params = new URLSearchParams();

  if (query?.searchItem) params.set("searchItem", query.searchItem);
  if (query?.sortBy) params.set("sortBy", query.sortBy);
  if (query?.sortOrder) params.set("sortOrder", query.sortOrder);
  if (query?.page) params.set("page", query.page.toString());
  if (query?.limit) params.set("limit", query.limit.toString());

  const res = await serverFetch(`/api/blog?${params.toString()}`, {
    next: { revalidate: 300, tags: ["blog"] },
  });

  return res?.data ?? { data: [], meta: { total: 0, page: 1, limit: 9, totalPages: 0 } };
}

export async function getBlogPostBySlug(slug: string): Promise<IBlogPost | null> {
  const res = await serverFetch(`/api/blog/${slug}`, {
    next: { revalidate: 300, tags: ["blog", `blog-${slug}`] },
  });

  return res?.success ? res.data : null;
}