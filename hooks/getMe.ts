

"use server"

import { serverFetch } from "@/lib/api/serverFetch";
import { ProfileFormValues } from "@/lib/validations/auth";

export const getMe = async () => {
    const res = await serverFetch("/api/auth/me",
        {
           cache: "no-store", 
          
        }
    )
  
    return res
}





export async function updateProfileAction(payload: Partial<ProfileFormValues>) {
  const res = await serverFetch("/api/auth/profile-update", {
    method: "PATCH",
    body: payload,
  });
  return res;
}