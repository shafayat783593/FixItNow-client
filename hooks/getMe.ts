

"use server"

import { serverFetch } from "@/lib/api/serverFetch";
import { ProfileFormValues } from "@/lib/validations/auth";

export const getMe = async () => {
    const res = await serverFetch("/api/auth/me",
        {
          cache: "force-cache",
            next: {
                revalidate: 3600,
                tags: ["user"]
            },
        }
    )
    console.log(res)
    return res
}





export async function updateProfileAction(payload: Partial<ProfileFormValues>) {
  const res = await serverFetch("/api/auth/profile-update", {
    method: "PATCH",
    body: payload,
  });
  return res;
}