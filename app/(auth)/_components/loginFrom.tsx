'use client';

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { loginAction, LoginState } from '../_action/_authAction';

const initialState: LoginState | null = null;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') ?? '';

  const [state, action, isPending] = useActionState(
    loginAction.bind(null, redirectTo),
    initialState
  );

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message || 'Login failed. Please check credentials.');
    }
    // success কেসে কিছু করার দরকার নেই —
    // loginAction নিজেই সার্ভার-সাইড redirect() কল করে, তাই এই effect-এ
    // router.push কল কখনো পৌঁছায়ই না (redirect() throw করে থামায়)
  }, [state]);

  return (
    <div className="w-full max-w-sm mx-auto my-auto py-2">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Sign in to continue to your account</p>
      </div>

      <form action={action} className="space-y-3 font-sans">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-slate-700">Password</label>
            <Link href="/forgot-password" className="text-[11px] font-semibold text-orange-500 hover:text-orange-600">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
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

        <button
          type="submit"
          disabled={isPending}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 shadow-lg shadow-orange-500/20 active:scale-[0.99] mt-3"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Signing in...</span>
            </div>
          ) : (
            <>
              <span>Sign in</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-slate-400 font-medium">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-bold text-orange-500 hover:text-orange-600 transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}