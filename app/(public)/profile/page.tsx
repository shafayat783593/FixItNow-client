
import { Suspense } from "react";
import { ProfileForm } from "../_components/profile/ProfileForm";
import { getMe } from "@/hooks/getMe";
import { ProfileFormSkeleton } from "../_components/ProfileFormSkeleton";



async function ProfileSection() {
  const user = await getMe();
  return <ProfileForm user={user.data} />;
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-lg px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Account</p>
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          My profile
        </h1>

        <div className="mt-6">
          <Suspense fallback={<ProfileFormSkeleton />}>
            <ProfileSection />
          </Suspense>
        </div>
      </div>
    </main>
  );
}