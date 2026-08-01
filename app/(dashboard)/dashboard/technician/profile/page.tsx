"use client";

import React, { useEffect, useState } from "react";
import { User, Loader2 } from "lucide-react";
import { getMe } from "@/hooks/getMe";
import TechnicianProfileForm from "../../_components/technician/TechnicianProfileForm";

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
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-gray-500">Loading profile information...</p>
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
    <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <User className="w-6 h-6 text-primary" /> Edit Technician Profile
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Update your experience, skills, and personal information.
        </p>
      </div>

      {/* Render Separate Form Component */}
      <TechnicianProfileForm
        initialData={userData} />
    </div>
  );
}