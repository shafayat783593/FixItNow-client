"use client";

import React, { useActionState, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, ArrowLeft, CheckCircle2, Wrench, ShoppingBag } from 'lucide-react';
import { toast } from "sonner";
import { registerAction, RegisterState } from '../_action/_authAction';

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
    if (state.success) {
      toast.success('Account created successfully! Redirecting...');
      setTimeout(() => {
        router.push('/login');
      }, 1000);
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
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </Link>
      </div>

      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Register</h1>
        <p className="text-xs text-slate-500 font-medium mt-1">Enter your details to create an account</p>
      </div>

      <form action={action} onSubmit={handleSubmit} className="space-y-3 font-sans">

        {/* Role Selector */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">I want to</label>
          <input type="hidden" name="role" value={role} />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setRole('CUSTOMER')}
              className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                role === 'CUSTOMER'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> Book services
            </button>
            <button
              type="button"
              onClick={() => setRole('TECHNICIAN')}
              className={`flex items-center justify-center gap-2 rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                role === 'TECHNICIAN'
                  ? 'border-orange-500 bg-orange-50 text-orange-600'
                  : 'border-slate-200 bg-slate-50 text-slate-500 hover:border-slate-300'
              }`}
            >
              <Wrench className="w-4 h-4" /> Offer services
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="fullName"
              required
              placeholder="John Doe"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition-all"
            />
          </div>
        </div>

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
          <label className="block text-xs font-bold text-slate-700 mb-1.5">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        {password && (
          <div className="p-2.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs text-slate-500">
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
          className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all disabled:opacity-50 shadow-lg shadow-orange-500/20 active:scale-[0.99] mt-3"
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

      <p className="mt-5 text-center text-xs text-slate-400 font-medium">
        Already have an account?{' '}
        <Link href="/login" className="font-bold text-orange-500 hover:text-orange-600 transition-colors">
          Sign in
        </Link>
      </p>
    </div>
  );
}