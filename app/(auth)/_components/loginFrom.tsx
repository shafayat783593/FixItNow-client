'use client';

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import { loginAction, LoginState } from '../_action/_authAction';
import GoogleSignInButton from './Googlesigninbutton ';

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
   
  }, [state]);

  return (
    <div className="w-full max-w-sm mx-auto my-auto py-2">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Welcome back</h1>
        <p className="text-xs text-muted-foreground font-medium mt-1">Sign in to continue to your account</p>
      </div>

      <div className="mb-4">
        <GoogleSignInButton />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] font-bold text-muted-foreground uppercase">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form action={action} className="space-y-3 font-sans">
        <div>
          <label className="block text-xs font-bold text-foreground mb-1.5">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              name="email"
              required
              placeholder="name@company.com"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold text-foreground">Password</label>
            <Link href="/forgot-password" className="text-[11px] font-semibold text-accent hover:opacity-80">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              placeholder="••••••••"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 active:scale-[0.99] hover:bg-primary/90"
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

      <p className="mt-5 text-center text-xs text-muted-foreground font-medium">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="font-bold text-accent hover:opacity-80 transition-colors">
          Create one
        </Link>
      </p>
    </div>
  );
}
