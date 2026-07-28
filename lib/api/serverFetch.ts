// service/serverFetch.ts
"use server"

import { getAccessToken } from "@/service/getAccessToken";



type FetchOptions = Omit<RequestInit, "body"> & {
    body?: Record<string, any>
    next?: { revalidate?: number; tags?: string[] }
    cache?: RequestCache
}

export async function serverFetch<T = any>(
    path: string,
    options: FetchOptions = {}
): Promise<T> {
    const accessData = await getAccessToken()
    
    const accessToken = accessData.data.accessToken
    
    if (typeof accessToken !== "string") {
        return { success: false, message: "User not logged in" } as T
    }

    const res = await fetch(`${process.env.BACKEND_API_URL}${path}`, {
        method: options.method ?? "GET",
        headers: {
            cookie: `accessToken=${accessToken}`,
            ...(options.body ? { "Content-Type": "application/json" } : {}),
            ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: options.cache,
        next: options.next,
    })
    const result = await res.json()

    return result
}