import React from "react";
import { notFound } from "next/navigation";
import { Star, MapPin, Briefcase, BadgeCheck } from "lucide-react";
import { getTechnicianById } from "@/lib/api/technician";
import { ServiceCard } from "../../_components/technician/technicianServiceCard";
import { TechnicianReviews } from "../../_components/technician/TechnicianReviews";
import Image from "next/image";

export default async function TechnicianDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const technician = await getTechnicianById(id);

  if (!technician) return notFound();

  const name = technician?.user?.name || "Technician";
  const avatar = technician?.user?.avatar || technician?.user?.image;
  const services = technician?.services || [];
  const reviews = technician?.reviews || [];

  return (
    <section className="bg-background pb-20">
      {/* Header / Hero */}
      <div className="relative overflow-hidden bg-primary pb-24 pt-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, #ffffff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-8">
          <div className="relative mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-3xl border-4 border-card bg-muted text-3xl font-bold text-muted-foreground shadow-lg">
            {avatar ? (
              <Image
                src={avatar}
                alt={name}
                fill
                sizes="112px"
                className="object-cover"
                priority
              />
            ) : (
              <span>{name.trim().charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="mt-4 flex items-center justify-center gap-1.5">
            <h1 className="text-2xl font-extrabold text-primary-foreground sm:text-3xl">
              {name.trim()}
            </h1>
            <BadgeCheck size={20} className="text-accent" />
          </div>
          {technician?.location && (
            <p className="mt-1 flex items-center justify-center gap-1 text-sm text-primary-foreground/70">
              <MapPin size={14} />
              {technician.location}
            </p>
          )}
        </div>
      </div>

      {/* Stats Card */}
      <div className="relative mx-auto -mt-14 max-w-5xl px-6 lg:px-8">
        <div className="grid grid-cols-3 divide-x divide-border rounded-2xl border border-border bg-card p-6 shadow-xl">
          <div className="flex flex-col items-center gap-1">
            <span className="flex items-center gap-1 text-xl font-extrabold text-foreground">
              <Star size={18} className="fill-accent text-accent" />
              {technician?.rating?.toFixed?.(1) ?? "0.0"}
            </span>
            <span className="text-xs text-muted-foreground">
              {technician?.totalReviews ?? 0} reviews
            </span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="flex items-center gap-1 text-xl font-extrabold text-foreground">
              <Briefcase size={18} />
              {technician?.experience ?? 0}
            </span>
            <span className="text-xs text-muted-foreground">years experience</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-xl font-extrabold text-foreground">{services.length}</span>
            <span className="text-xs text-muted-foreground">services offered</span>
          </div>
        </div>

        {/* Bio */}
        {technician?.bio && (
          <div className="mt-10">
            <h2 className="text-lg font-bold text-foreground">About</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {technician.bio}
            </p>
          </div>
        )}

        {/* Services */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-foreground">Services Offered</h2>

          {services.length > 0 ? (
            <div className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((service: any) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="mt-4 rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-muted-foreground">No services listed yet.</p>
            </div>
          )}
        </div>

        {/* Reviews */}
        <div className="mt-10">
          <h2 className="text-lg font-bold text-foreground">
            Reviews {technician?.totalReviews ? `(${technician.totalReviews})` : ""}
          </h2>
          <TechnicianReviews reviews={reviews} />
        </div>
      </div>
    </section>
  );
}