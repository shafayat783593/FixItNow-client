// app/dashboard/layout.tsx — Server Component, no 'use client'
import { getMe } from "@/hooks/getMe";
import { redirect } from "next/navigation";
import DashboardLayoutClient from "./_components/DashboardLayoutClient";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const result = await getMe();

  if (!result.success) {
    redirect("/login");
  }

  return <DashboardLayoutClient user={result.data}>
    {children}
  </DashboardLayoutClient>;
}