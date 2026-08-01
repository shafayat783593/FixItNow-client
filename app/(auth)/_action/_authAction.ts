"use server";

import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface RegisterState {
  success: boolean;
  error?: string | null;
}

export interface LoginState {
  success: boolean;
  message: string;
}

export const registerAction = async (
  prevState: RegisterState,
  formData: FormData
): Promise<RegisterState> => {
  const raw = {
    fullName: formData.get("fullName") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    role: formData.get("role") as string,
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  try {
    const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: parsed.data.fullName,
        email: parsed.data.email,
        password: parsed.data.password,
        role: parsed.data.role,
      }),
    });

    const data = await response.json();

    if (!data.success) {
      return {
        success: false,
        error: data.message || "Registration failed",
      };
    }

    return { success: true, error: null };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong.",
    };
  }
};

export const loginAction = async (
  redirectTo: string,
  prevState: LoginState | null,
  formData: FormData
): Promise<LoginState> => {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: parsed.error.issues[0]?.message ?? "Invalid input",
    };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Invalid email or password",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set("accessToken", result.data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", result.data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

  if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
    redirect(redirectTo);
  }

  if (decodedToken.role === "CUSTOMER") {
    redirect("/dashboard/customer");
  } else if (decodedToken.role === "ADMIN") {
    redirect("/dashboard/admin");
  } else if (decodedToken.role === "TECHNICIAN") {
    redirect("/dashboard/technician");
  }

  // role match না হলে fallback — silent hang আটকাতে
  redirect("/");
};