import { cookies } from "next/headers"

export const getAccessToken = async () => {

    const cookiStore = await cookies()
    const refreshToken = await cookiStore.get("refreshToken")?.value
    if (!refreshToken) {
        return {
            success: false,
            message:"Refresh token not found!"
        }  
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: {
        Cookie : `refreshToken=${refreshToken}`
        },
         cache : "no-cache",
    })
    const result = await res.json()
  
    return result

    
}