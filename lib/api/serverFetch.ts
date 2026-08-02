"use server";

import { getAccessToken } from "@/service/getAccessToken";

type FetchOptions = Omit<RequestInit, "body"> & {
  body?: Record<string, any>;
  next?: { revalidate?: number; tags?: string[] };
  cache?: RequestCache;
};

export async function serverFetch <T = any>(
  path: string,
  options: FetchOptions = {}
): Promise<T> {
  const accessData = await getAccessToken().catch(() => null);
  const accessToken = accessData?.data?.accessToken;

  const headers: Record<string, string> = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(options.headers as Record<string, string>),
  };

  if (typeof accessToken === "string" && accessToken) {
    headers["cookie"] = `accessToken=${accessToken}`;
  }

  try {
    const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
      method: options.method ?? "GET",
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      cache: options.cache,
      next: options.next,
    });

    const result = await res.json();
    return result as T;
  } catch (error: any) {
    console.error(`Error in publicServerFetch [${path}]:`, error);
    return {
      success: false,
      message: error?.message || "Failed to fetch public data",
    } as T;
  }
}