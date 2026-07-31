"use client";

import React, { useActionState, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft, AlertCircle } from 'lucide-react';
import { toast } from "sonner";
import { loginAction } from "../_action/_authAction";




const LoginForm = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get("redirectTo") ?? "";

    const [state, action, pending] = useActionState(loginAction.bind(null, redirectTo), null);

    useEffect(() => {
        if (!state) return;
        if (state.success) {
            toast.success(state.message || "Login successfully!");
            router.push(redirectTo);
        }
        if (!state.success) {
            setErrorMessage(state.message || "Login failed. Please check credentials.");
            toast.error(state.message || "Login failed");
        }
    }, [state, redirectTo, router]);

    return (
        <div className="w-full max-w-sm mx-auto my-auto py-4">
            
            {/* Top Back Button */}
            <div className="mb-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back</span>
                </Link>
            </div>

            {/* Title & Subtitle */}
            <div className="text-center mb-8">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Login</h1>
                <p className="text-xs text-slate-500 font-medium mt-1.5">Enter your details to proceed</p>
            </div>

            {/* Error Banner */}
            {errorMessage && (
                <div className="mb-6 p-3.5 rounded-xl bg-red-50 text-red-600 border border-red-100 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                </div>
            )}

            {/* Form */}
            <form action={action} className="space-y-5">
                {/* Email Address */}
                <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                        </div>
                        <input
                            type="email"
                            required
                            name="email"
                            placeholder="admin@example.com"
                            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                        />
                    </div>
                </div>

                {/* Password */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-xs font-bold text-slate-700">
                            Password
                        </label>
                        <Link href="/forgot-password" className="text-xs font-semibold text-slate-400 hover:text-orange-500 transition-colors">
                            Forgot?
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Lock className="w-4 h-4" />
                        </div>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            required
                            name="password"
                            placeholder="••••••••"
                            className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Submit Action Button */}
                <button
                    type="submit"
                    disabled={pending}
                    className="w-full flex items-center justify-center gap-2 py-3.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 shadow-lg shadow-orange-500/20 active:scale-[0.99] mt-2"
                >
                    {pending ? (
                        <div className="flex items-center gap-2">
                            <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                            <span>Signing In...</span>
                        </div>
                    ) : (
                        <>
                            <span>Sign In</span>
                            <ArrowRight className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>

            {/* Footer */}
            <p className="mt-8 text-center text-xs text-slate-400 font-medium">
                Don&apos;t have an account?{' '}
                <Link href="/register" className="font-bold text-orange-500 hover:text-orange-600 transition-colors">
                    Register here
                </Link>
            </p>
        </div>
    );
};

export default LoginForm;
