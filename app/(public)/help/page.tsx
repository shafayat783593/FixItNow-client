import Link from "next/link";
import { BookOpen, CalendarCheck, CircleHelp, CreditCard, Search, ShieldCheck } from "lucide-react";

const helpTopics = [
  { icon: Search, title: "Find a service", description: "Search services, compare profiles, and use filters to find the right technician." },
  { icon: CalendarCheck, title: "Manage a booking", description: "Track booking status, view appointments, and review completed work from your dashboard." },
  { icon: CreditCard, title: "Payments", description: "Pay only after a booking is accepted and keep payment details in your dashboard." },
  { icon: ShieldCheck, title: "Account & safety", description: "Learn how accounts, verified technicians, and reviews help keep the platform trusted." },
];

export default function HelpPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background py-16 sm:py-24">
      <Pattern />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-accent">
            <CircleHelp className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Help Center</span>
          </div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">How can we help?</h1>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">Quick answers for booking services, managing appointments, payments, and your account.</p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {helpTopics.map(({ icon: Icon, title, description }) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-accent/50">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></span>
              <h2 className="mt-5 text-lg font-bold text-foreground">{title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-border bg-card p-6 sm:flex-row">
          <div className="flex items-center gap-3"><BookOpen className="h-5 w-5 text-accent" /><p className="text-sm text-muted-foreground">Still need help? Our team is ready to assist.</p></div>
          <Link href="/contact" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90">Contact support</Link>
        </div>
      </div>
    </main>
  );
}

function Pattern() {
  return <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />;
}
