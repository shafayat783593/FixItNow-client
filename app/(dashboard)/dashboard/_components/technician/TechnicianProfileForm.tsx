"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Briefcase, MapPin, Phone, Image as ImageIcon, FileText, Loader2, Save, CheckCircle2, AlertCircle } from "lucide-react";
import { updateTechnicianProfile } from "@/lib/api/technician";
import { ITechnicianProfileInput, technicianProfileSchema } from "@/lib/validations/technician";

interface TechnicianProfileFormProps {
  initialData: any; // User object returning from getCurrentLoginUser
}

export default function TechnicianProfileForm({ initialData }: TechnicianProfileFormProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [statusMessage, setStatusMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const profile = initialData?.technicianProfile || {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ITechnicianProfileInput>({
    resolver: zodResolver(technicianProfileSchema),
    defaultValues: {
      name: initialData?.name || "",
      phone: initialData?.phone || "",
      avatar: initialData?.avatar || "",
      bio: profile?.bio || "",
      experience: profile?.experience ?? 0,
      address: profile?.location || "",
      skills: Array.isArray(profile?.skills) ? profile.skills.join(", ") : profile?.skills || "",
    },
  });

  const onSubmit = async (data: ITechnicianProfileInput) => {
    try {
      setSubmitting(true);
      setStatusMessage(null);

      const res = await updateTechnicianProfile(data);

      if (res?.success) {
        setStatusMessage({ type: "success", text: "Profile updated successfully!" });
      } else {
        throw new Error(res?.message || "Failed to update profile.");
      }
    } catch (error: any) {
      setStatusMessage({
        type: "error",
        text: error.message || "An unexpected error occurred while saving.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {statusMessage && (
        <div
          className={`p-4 rounded-lg flex items-center gap-3 ${
            statusMessage.type === "success"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-red-50 text-red-700 border border-red-200"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
          )}
          <span className="text-sm font-medium">{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                {...register("name")}
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                {...register("phone")}
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="+8801700000000"
              />
            </div>
            {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
          </div>

          {/* Experience */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Years of Experience
            </label>
            <div className="relative">
              <Briefcase className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="number"
                {...register("experience")}
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="e.g. 5"
              />
            </div>
            {errors.experience && <p className="text-xs text-red-500 mt-1">{errors.experience.message}</p>}
          </div>

          {/* Location / Address */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Address / Location
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                {...register("address")}
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Dhaka, Bangladesh"
              />
            </div>
            {errors.address && <p className="text-xs text-red-500 mt-1">{errors.address.message}</p>}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Skills (comma separated)
          </label>
          <input
            type="text"
            {...register("skills")}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
            placeholder="Wiring, AC Repair, Plumbing"
          />
          {errors.skills && <p className="text-xs text-red-500 mt-1">{errors.skills.message}</p>}
        </div>

        {/* Avatar */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Avatar URL
          </label>
          <div className="relative">
            <ImageIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              {...register("avatar")}
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>
          {errors.avatar && <p className="text-xs text-red-500 mt-1">{errors.avatar.message}</p>}
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Bio / Overview
          </label>
          <div className="relative">
            <FileText className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <textarea
              {...register("bio")}
              rows={4}
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              placeholder="Describe your expertise..."
            />
          </div>
          {errors.bio && <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end pt-4 border-t">
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-6 py-2.5 rounded-lg shadow transition disabled:opacity-50 cursor-pointer"
          >
            {submitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Saving...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" /> Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}