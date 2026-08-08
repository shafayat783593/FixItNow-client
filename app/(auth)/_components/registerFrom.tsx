"use client";

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, ArrowLeft, CheckCircle2, Wrench, ShoppingBag } from 'lucide-react';
import { toast } from "sonner";
import { registerAction, RegisterState } from '../_action/_authAction';
import GoogleSignInButton from './Googlesigninbutton ';

const initialState: RegisterState = {
  success: false,
  error: null,
};

export default function RegisterForm() {
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [role, setRole] = useState<'CUSTOMER' | 'TECHNICIAN'>('CUSTOMER');

  const router = useRouter();

  const isPasswordLongEnough = password.length >= 8;
  const hasSpecialCharOrNumber = /[0-9!@#$%^&*]/.test(password);

  const [state, action, isPending] = useActionState(registerAction, initialState);

  useEffect(() => {
    if (!state) return;
    if (state.success && state.email) {
      toast.success('Check your email for a verification code.');
      router.push(`/verify-otp?email=${encodeURIComponent(state.email)}`);
    } else if (state.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!isPasswordLongEnough || !hasSpecialCharOrNumber) {
      e.preventDefault();
      toast.error('Password must be at least 8 characters and include a number or symbol.');
      return;
    }
  };

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
        <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Register</h1>
        <p className="text-xs text-muted-foreground font-medium mt-1">Enter your details to create an account</p>
      </div>

      <div className="mb-4">
        <GoogleSignInButton />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-px bg-border" />
        <span className="text-[11px] font-bold text-muted-foreground uppercase">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>

      <form action={action} onSubmit={handleSubmit} className="space-y-3 font-sans">

        {/* Role Selector */}
        <div>
          <label className="block text-xs font-bold text-foreground mb-1.5">I want to</label>
          <input type="hidden" name="role" value={role} />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('CUSTOMER')}
              className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                role === 'CUSTOMER'
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-input bg-background text-muted-foreground hover:border-ring'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Book services
            </button>
            <button
              type="button"
              onClick={() => setRole('TECHNICIAN')}
              className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                role === 'TECHNICIAN'
                  ? 'border-accent bg-accent/15 text-accent'
                  : 'border-input bg-background text-muted-foreground hover:border-ring'
              }`}
            >
              <Wrench className="w-4 h-4" /> Offer services
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-foreground mb-1.5">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="fullName"
              required
              placeholder="John Doe"
              className="w-full rounded-xl border border-input bg-background py-2.5 pl-10 pr-4 text-sm font-medium text-foreground placeholder:text-muted-foreground transition-all focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/30"
            />
          </div>
        </div>

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
          <label className="block text-xs font-bold text-foreground mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {password && (
          <div className="space-y-1 rounded-xl border border-border bg-muted p-2.5 text-xs text-muted-foreground">
            <div className={`flex items-center gap-1.5 ${isPasswordLongEnough ? 'text-emerald-600 font-semibold' : ''}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>At least 8 characters long</span>
            </div>
            <div className={`flex items-center gap-1.5 ${hasSpecialCharOrNumber ? 'text-emerald-600 font-semibold' : ''}`}>
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Contains a number or symbol</span>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 active:scale-[0.99] hover:bg-primary/90"
        >
          {isPending ? (
            <div className="flex items-center gap-2">
              <span className="inline-block animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
              <span>Creating Account...</span>
            </div>
          ) : (
            <>
              <span>Create account</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      <p className="mt-5 text-center text-xs text-muted-foreground font-medium">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-accent hover:opacity-80 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}
