"use client";

import { useState } from "react";
import { ShieldCheck, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { getMe } from "@/hooks/getMe";
import { loginAction } from "../_action/_authAction";

const AdminQuickLogin = ({ redirectTo = "/dashboard/admin" }: { redirectTo?: string }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAdminLogin = async () => {
    try {
      setIsLoading(true);

      const credentials = {
        email: "admin1@gmail.com",
        password: "1234567890",
      };

      const formData = new FormData();
      formData.append("email", credentials.email);
      formData.append("password", credentials.password);

      // Server Action কল করা
      const response = await loginAction(redirectTo, null, formData);

      console.log("Admin quick login response:", response);

      if (!response.success) {
        toast.error(response.message || "Admin login failed");
        return;
      }

      // 2FA / OTP প্রয়োজন কিনা তা চেক
      if ((response as any)?.twoFactorRequired) {
        localStorage.setItem("temp_email", credentials.email);
        toast.success(response.message || "OTP sent to your email!");
        router.push("/verify-otp");
        return;
      }

      // ইউজার রোল ভেরিফাই করা
      const loggedInUser = await getMe();
      console.log("Logged in user after quick login:", loggedInUser);

      if (!loggedInUser) {
        toast.error("Unable to load user information.");
        return;
      }

      const role = String(loggedInUser.role).toUpperCase();

      if (role !== "ADMIN") {
        toast.error("This account does not have admin access.");
        return;
      }

      toast.success("Admin login successful!");
      router.push(redirectTo);

    } catch (error: any) {
      console.error("Admin quick login error:", error);

      if (error?.response?.data?.errorCode === "MAX_SESSIONS_REACHED") {
        toast.error("Maximum devices reached. Please logout from another device first.");
        return;
      }

      toast.error(error?.message || "Admin login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleAdminLogin}
      disabled={isLoading}
      className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        rounded-2xl
        border
        border-primary/30
        bg-primary/5
        px-6
        py-4
        font-bold
        text-primary
        transition-all
        duration-300
        hover:border-primary/50
        hover:bg-primary/10
        disabled:cursor-not-allowed
        disabled:opacity-60
      "
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          Logging in as Admin...
        </>
      ) : (
        <>
          <ShieldCheck size={20} />
          Login as Admin
        </>
      )}
    </button>
  );
};

export default AdminQuickLogin;