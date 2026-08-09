"use client";

import React, { useEffect, useState } from "react";
import { User } from "lucide-react";
import { getMe } from "@/hooks/getMe";
import TechnicianProfileForm from "../../_components/technician/TechnicianProfileForm";
import { TableSkeleton } from "../../_components/technician/TableSkeleton";
import { ChangePasswordForm } from "../../_components/admin/Changepasswordform";

export default function TechnicianProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const res = await getMe();

        if (res?.success && res?.data) {
          setUserData(res.data);
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (err: any) {
        console.error("Error fetching me details:", err);
        setError("Error loading profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

   if (loading) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <TableSkeleton rows={5} />
        </div>
      );
    }
  if (error || !userData) {
    return (
      <div className="p-6 text-center text-red-500 bg-red-50 rounded-xl border border-red-200">
        {error || "Failed to load profile."}
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
      <div className="border-b border-border pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Technician</p>
        <h1 className="mt-2 flex items-center gap-2 text-2xl font-bold text-foreground" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
          <User className="h-6 w-6 text-primary" /> Edit Technician Profile
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your experience, skills, and personal information.
        </p>
      </div>

      <div className="mt-8 grid items-start gap-6 xl:grid-cols-2">
        <TechnicianProfileForm initialData={userData} />
        {userData?.authProvider !== "GOOGLE" && (
          <ChangePasswordForm />
        )}
      </div>
      </div>
    </main>
  );
}
