

"use server"

import { serverFetch } from "@/lib/api/axios";

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
console.log(res,"User login.................................................")
    return res
}







// "use server"

// import { cookies } from "next/headers"

// export const getMe = async () => {
//     const cookieStore = await cookies();
//     const accessToken = cookieStore.get("accessToken")?.value
//     if (!accessToken) {
//         // throw new Error("User Not Logged In !")

//         return {
//             success: false,
//             message: "User not logged in"
//         }
//     }
//     const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/me`,
//         {
//             headers: {
//                 // Authorization: accessToken as string
//                 cookie: `accessToken=${accessToken}`

//             },
//             cache: "force-cache",
//             next: {
//                 revalidate: 60 * 60 * 24,
//                 tags: ["user"]
//             },
//         }
//     )
    
//     const result = await res.json()

//     return result
// }