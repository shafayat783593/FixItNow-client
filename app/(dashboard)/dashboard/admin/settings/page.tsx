import { getMe } from "@/hooks/getMe";
import { ProfileForm } from "@/app/(public)/_components/profile/ProfileForm";
import { redirect } from "next/navigation";
import { ChangePasswordForm } from "../../_components/admin/Changepasswordform";
import { KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";

export default async function AdminSettingsPage() {
  const res = await getMe();
  const user = res?.data;

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="min-h-screen bg-background py-10">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Admin</p>
        <h1
          className="mt-1 text-2xl font-bold text-foreground"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your account information.
        </p>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_12px_32px_hsl(213_45%_12%_/_0.05)] lg:sticky lg:top-6">
            <div className="bg-gradient-to-br from-primary to-primary/85 px-6 pb-6 pt-7 text-primary-foreground">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground shadow-lg shadow-black/10">
                <UserRound className="h-6 w-6" />
              </div>
              <p className="mt-5 text-lg font-bold">Account settings</p>
              <p className="mt-1 text-sm leading-5 text-primary-foreground/70">
                Manage your profile and keep your account secure.
              </p>
            </div>

            <div className="space-y-1 p-3">
              <div className="flex items-center gap-3 rounded-2xl bg-accent/15 px-4 py-3 text-sm font-semibold text-foreground">
                <UserRound className="h-4 w-4 text-accent" />
                Profile details
              </div>
              {user.authProvider !== "GOOGLE" && (
                <div className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-muted-foreground">
                  <KeyRound className="h-4 w-4" />
                  Password & security
                </div>
              )}
            </div>

            <div className="border-t border-border p-5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                <div>
                  <p className="text-sm font-semibold text-foreground">Account protected</p>
                  <p className="mt-1 text-xs leading-5 text-muted-foreground">
                    Your account information is private and securely managed.
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                <Mail className="h-3.5 w-3.5" />
                <span className="truncate">{user.email}</span>
              </div>
            </div>
          </aside>

          <section>
            <div className="rounded-3xl border border-border bg-card px-6 py-5 shadow-[0_12px_32px_hsl(213_45%_12%_/_0.05)]">
              <p className="text-sm font-semibold text-foreground">Personal information</p>
              <p className="mt-1 text-[13px] text-muted-foreground">
                Keep your contact details and profile image up to date.
              </p>
            </div>
            <div className="mt-6 grid items-start gap-6 xl:grid-cols-2">
              <ProfileForm user={user} />
              {user.authProvider !== "GOOGLE" && <ChangePasswordForm />}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
