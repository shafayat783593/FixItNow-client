"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Briefcase, MapPin, Phone, Image as ImageIcon, FileText, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { updateTechnicianProfile } from "@/lib/api/technician";
import { ITechnicianProfileInput, technicianProfileSchema } from "@/lib/validations/technician";

interface TechnicianProfileFormProps {
  initialData: any; // User object returning from getCurrentLoginUser
}

export default function TechnicianProfileForm({ initialData }: TechnicianProfileFormProps) {
  const [submitting, setSubmitting] = useState<boolean>(false);

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
      location: profile?.location || "",
      skills: Array.isArray(profile?.skills) ? profile.skills.join(", ") : profile?.skills || "",
    },
  });

  const onSubmit = async (data: ITechnicianProfileInput) => {
    try {
      setSubmitting(true);

      const res = await updateTechnicianProfile(data);

      if (res?.success) {
        toast.success("Profile updated successfully!");
        setSubmitting(false);
      } else {
        throw new Error(res?.message || "Failed to update profile.");
      }
    } catch (error: any) {
      toast.error(error.message || "An unexpected error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Full Name */}
          <div>
            <label className="mb-1 block text-sm font-semibold text-foreground">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
            <label className="mb-1 block text-sm font-semibold text-foreground">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
            <label className="mb-1 block text-sm font-semibold text-foreground">
              Years of Experience
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
            <label className="mb-1 block text-sm font-semibold text-foreground">
              Address / Location
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                {...register("location")}
                className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                placeholder="Dhaka, Bangladesh"
              />
            </div>
            {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location.message}</p>}
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="mb-1 block text-sm font-semibold text-foreground">
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
          <label className="mb-1 block text-sm font-semibold text-foreground">
            Avatar URL
          </label>
          <div className="relative">
            <ImageIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
          <label className="mb-1 block text-sm font-semibold text-foreground">
            Bio / Overview
          </label>
          <div className="relative">
            <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
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
            className="flex cursor-pointer items-center gap-2 rounded-lg bg-primary px-6 py-2.5 font-medium text-primary-foreground shadow transition hover:bg-primary/90 disabled:opacity-50"
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
