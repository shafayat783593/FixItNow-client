"use client";

import React, { useActionState, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { verifyOtpAction, resendOtpAction, OtpState } from "../_action/_authAction";

const initialState: OtpState = { success: false, message: "" };

export default function VerifyOtpForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email") ?? "";

  const [cooldown, setCooldown] = useState(60);
  const [resending, setResending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const boundAction = verifyOtpAction.bind(null, email);
  const [state, action, isPending] = useActionState(boundAction, initialState);

  useEffect(() => {
    if (!email) {
      toast.error("Missing email. Please register again.");
      router.push("/register");
    }
  }, [email, router]);

  useEffect(() => {
    if (state?.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const handleResend = async () => {
    setResending(true);
    const res = await resendOtpAction(email);
    setResending(false);
    if (res.success) {
      toast.success("A new code has been sent.");
      setCooldown(60);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto my-auto py-2">
      <div className="mb-4">
        <Link
          href="/register"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="text-center mb-6">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent/15">
          <ShieldCheck className="h-6 w-6 text-accent" />
        </div>
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Verify your email</h1>
        <p className="text-xs text-muted-foreground font-medium mt-1">
          We sent a 6-digit code to <span className="font-bold text-foreground">{email}</span>
        </p>
      </div>

      <form action={action} className="space-y-3 font-sans">
        <div>
          <label className="block text-xs font-bold text-foreground mb-1.5">Verification Code</label>
          <input
            ref={inputRef}
            type="text"
            name="otp"
            inputMode="numeric"
            maxLength={6}
            required
            placeholder="••••••"
            className="w-full rounded-xl border border-input bg-background py-3 text-center text-lg font-bold tracking-[0.5em] text-foreground placeholder:text-muted-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 active:scale-[0.99] hover:bg-primary/90"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Verifying...</span>
            </div>
          ) : (
            <span>Verify & Continue</span>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground font-medium">
        Didn&apos;t get the code?{" "}
        {cooldown > 0 ? (
          <span className="font-bold text-muted-foreground">Resend in {cooldown}s</span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="font-bold text-accent transition-colors hover:opacity-80 disabled:opacity-50"
          >
            {resending ? "Sending..." : "Resend code"}
          </button>
        )}
      </p>
    </div>
  );
}
