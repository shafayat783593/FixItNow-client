// "use server";

// import { loginSchema, registerSchema } from "@/lib/validations/auth";
// import { JwtPayload } from "jsonwebtoken";
// import jwt from "jsonwebtoken";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";

// export interface RegisterState {
//   success: boolean;
//   error?: string | null;
// }

// export interface LoginState {
//   success: boolean;
//   message: string;
// }

// export const registerAction = async (
//   prevState: RegisterState,
//   formData: FormData
// ): Promise<RegisterState> => {
//   const raw = {
//     fullName: formData.get("fullName") as string,
//     email: formData.get("email") as string,
//     password: formData.get("password") as string,
//     role: formData.get("role") as string,
//   };

//   const parsed = registerSchema.safeParse(raw);
//   if (!parsed.success) {
//     return {
//       success: false,
//       error: parsed.error.issues[0]?.message ?? "Invalid input",
//     };
//   }

//   try {
//     const response = await fetch(`${process.env.BACKEND_API_URL}/api/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         name: parsed.data.fullName,
//         email: parsed.data.email,
//         password: parsed.data.password,
//         role: parsed.data.role,
//       }),
//     });

//     const data = await response.json();

//     if (!data.success) {
//       return {
//         success: false,
//         error: data.message || "Registration failed",
//       };
//     }

//     return { success: true, error: null };
//   } catch (err) {
//     return {
//       success: false,
//       error: err instanceof Error ? err.message : "Something went wrong.",
//     };
//   }
// };

// export const loginAction = async (
//   redirectTo: string,
//   prevState: LoginState | null,
//   formData: FormData
// ): Promise<LoginState> => {
//   const raw = {
//     email: formData.get("email"),
//     password: formData.get("password"),
//   };

//   const parsed = loginSchema.safeParse(raw);
//   if (!parsed.success) {
//     return {
//       success: false,
//       message: parsed.error.issues[0]?.message ?? "Invalid input",
//     };
//   }

//   const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(parsed.data),
//   });

//   const result = await res.json();

//   if (!result.success) {
//     return {
//       success: false,
//       message: result.message || "Invalid email or password",
//     };
//   }

//   const cookieStore = await cookies();
//   cookieStore.set("accessToken", result.data.accessToken, {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24,
//     sameSite: "lax",
//   });
//   cookieStore.set("refreshToken", result.data.refreshToken, {
//     httpOnly: true,
//     maxAge: 60 * 60 * 24 * 7,
//     sameSite: "lax",
//   });

//   const decodedToken = jwt.decode(result.data.accessToken) as JwtPayload;

//   if (redirectTo && typeof redirectTo === "string" && redirectTo.startsWith("/") && !redirectTo.startsWith("//")) {
//     redirect(redirectTo);
//   }

//   if (decodedToken.role === "CUSTOMER") {
//     redirect("/dashboard/customer");
//   } else if (decodedToken.role === "ADMIN") {
//     redirect("/dashboard/admin");
//   } else if (decodedToken.role === "TECHNICIAN") {
//     redirect("/dashboard/technician");
//   }

//   // role match না হলে fallback — silent hang আটকাতে
//   redirect("/");
// };













"use server";

import { loginSchema, registerSchema } from "@/lib/validations/auth";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface RegisterState {
  success: boolean;
  error?: string | null;
  email?: string; // carried forward so the client can route to /verify-otp?email=...
}

export interface LoginState {
  success: boolean;
  message: string;
}

export interface OtpState {
  success: boolean;
  message: string;
}

// Shared by login / verify-otp / google-login so the role→route mapping
// only lives in one place instead of being copy-pasted three times.
const setAuthCookiesAndRedirect = async (
  data: { accessToken: string; refreshToken: string },
  redirectTo?: string
) => {
  const cookieStore = await cookies();
  cookieStore.set("accessToken", data.accessToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24,
    sameSite: "lax",
  });
  cookieStore.set("refreshToken", data.refreshToken, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  const decodedToken = jwt.decode(data.accessToken) as JwtPayload;

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

  redirect("/");
};

// Step 1: sends an OTP to the email. No account exists yet.
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

    return { success: true, error: null, email: parsed.data.email };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Something went wrong.",
    };
  }
};

// Step 2: verifies the OTP. On success the account is actually created
// server-side and the user is logged straight in.
export const verifyOtpAction = async (
  email: string,
  prevState: OtpState,
  formData: FormData
): Promise<OtpState> => {
  const otp = formData.get("otp") as string;

  if (!otp || otp.length !== 6) {
    return { success: false, message: "Enter the 6-digit code" };
  }

  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const result = await res.json();

  if (!result.success) {
    return { success: false, message: result.message || "Invalid or expired OTP" };
  }

  await setAuthCookiesAndRedirect(result.data);
  return { success: true, message: "Verified" };
};

export const resendOtpAction = async (email: string): Promise<OtpState> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/resend-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const result = await res.json();

  return {
    success: !!result.success,
    message: result.message || (result.success ? "OTP resent" : "Failed to resend OTP"),
  };
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

  await setAuthCookiesAndRedirect(result.data, redirectTo);
  return { success: true, message: "Logged in" };
};

// Called from the Google button after Google Identity Services returns an ID token.
export const googleLoginAction = async (idToken: string): Promise<LoginState> => {
  const res = await fetch(`${process.env.BACKEND_API_URL}/api/auth/google`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  const result = await res.json();

  if (!result.success) {
    return {
      success: false,
      message: result.message || "Google sign-in failed",
    };
  }

  await setAuthCookiesAndRedirect(result.data);
  return { success: true, message: "Logged in" };
};