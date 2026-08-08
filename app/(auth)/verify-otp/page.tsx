import { Suspense } from "react";
import VerifyOtpForm from "../_components/Verifyotpform";

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
          Loading...
        </div>
      }
    >
      <VerifyOtpForm />
    </Suspense>
  );
}