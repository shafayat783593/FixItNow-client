
"use server"

import { JwtPayload } from "jsonwebtoken"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

type LoginState = {
    success: true,
    statusCode: number,
    message: string,
    data: {
        accessToken: string,
        refreshToken: string
    }
}


export interface RegisterState {
    success: boolean;
    error?: string | null;
}



export const registerAction = async (prevState: RegisterState, formData: FormData) => {
    const name = formData.get('fullName') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    try {

        const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        });
        const data = await response.json();
        if (!data.success) {
            return {
                success: false,
                error: data.error || data.message || "Registration failed",
            };
        }

        return { success: true, error: null };
    } catch (err) {
        return {
            success: false,
            error: err instanceof Error ? err.message : 'Something went wrong.'
        };
    }
};




export const loginAction = async (redirectTo: string, prevState: LoginState, formData: FormData) => {


    const email = formData.get("email")
    const password = formData.get("password")
    const payload = {
        email,
        password
    }
    const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    })
    const result = await res.json()
    if (result.success) {
        const cookieStore = await cookies()
        cookieStore.set("accessToken", result.data.accessToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24,
            sameSite: "lax"
        })
        cookieStore.set("refreshToken", result.data.refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "lax"
        })
        const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload

        if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
            redirect(redirectTo)
        }


        if (decodedToken.role === "CUSTOMER") {

            redirect("/dashboard/customer")
        }
        else if (decodedToken.role === "ADMIN") {
            redirect("/dashboard/admin")

        }
        else if (decodedToken.role === "TECHNICIAN") {
            redirect("/dashboard/technician")

        }
        // redirect("/dashboard")
        // redirect("/dashboard", "replace")
    }
    return result
}
