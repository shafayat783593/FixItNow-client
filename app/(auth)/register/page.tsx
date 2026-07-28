"use client";

import { Suspense } from "react";
import RegisterFrom from "../_components/registerFrom";
import RegisterForm from "../_components/registerFrom";

export default function RegisterPage() {
  // TODO: role select (CUSTOMER/TECHNICIAN), react-hook-form + zod, call authApi.register()
  return (
       <Suspense fallback={
        <div className="py-12 text-center text-xs text-slate-400 animate-pulse">
          Loading registration form...
        </div>
      }>
        <RegisterForm />
      </Suspense>
  );
}
