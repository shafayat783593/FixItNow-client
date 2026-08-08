"use client";

import { useState } from "react";
import {
  UserPlus,
  Search,
  CalendarCheck,
  CreditCard,
  Wrench,
  Star,
  ClipboardList,
  CalendarClock,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const customerSteps: Step[] = [
  { icon: UserPlus, title: "Register or log in", description: "Create an account as a customer in under a minute." },
  { icon: Search, title: "Browse services", description: "Filter by service type, location, rating, and price to find the right fit." },
  { icon: CalendarCheck, title: "Pick a time slot", description: "View a technician's live availability and choose a slot that works for you." },
  { icon: ClipboardList, title: "Wait for acceptance", description: "Your request goes out as REQUESTED. The technician accepts or declines." },
  { icon: CreditCard, title: "Pay securely", description: "Once accepted, pay through Stripe or SSLCommerz to confirm the job." },
  { icon: CheckCircle2, title: "Track & review", description: "Follow status from PAID to IN_PROGRESS to COMPLETED, then leave a review." },
];

const technicianSteps: Step[] = [
  { icon: UserPlus, title: "Register or log in", description: "Create an account as a technician to start taking jobs." },
  { icon: Wrench, title: "Set up your profile", description: "Add your skills, experience, pricing, and a profile picture customers can trust." },
  { icon: CalendarClock, title: "Set your availability", description: "Use the scheduler to open time blocks and mark yourself unavailable when needed." },
  { icon: ClipboardList, title: "Review incoming requests", description: "See booking requests as they arrive and Accept or Decline each one." },
  { icon: CreditCard, title: "Get paid", description: "Once the customer pays, the booking moves to PAID and you can start the job." },
  { icon: Star, title: "Complete & get reviewed", description: "Mark the job In-Progress, then Completed. Customers can leave a review." },
];

const statusBadges = [
  { label: "REQUESTED", className: "bg-accent/15 text-accent border-accent/30" },
  { label: "ACCEPTED", className: "bg-primary/10 text-primary border-primary/30" },
  { label: "PAID", className: "bg-accent/15 text-accent border-accent/30" },
  { label: "IN_PROGRESS", className: "bg-success/15 text-success border-success/30" },
  { label: "COMPLETED", className: "bg-muted text-muted-foreground border-border" },
  { label: "DECLINED / CANCELLED", className: "bg-destructive/15 text-destructive border-destructive/30" },
];

export default function HowItWorks() {
  const [role, setRole] = useState<"customer" | "technician">("customer");

  return (
    <section className="relative overflow-hidden bg-background py-20 text-foreground">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, #E2E8F0 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="font-mono text-xs uppercase tracking-wider text-accent">
            How it works
          </span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            From request to review, in a few clear steps
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            The flow is different depending on whether you're booking a service
            or providing one. Pick your side below.
          </p>
        </div>

        <Tabs
          value={role}
          onValueChange={(v) => setRole(v as "customer" | "technician")}
          className="mt-12"
        >
          <div className="flex justify-center">
            <TabsList className="border border-border bg-card">
              <TabsTrigger
                value="customer"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                I'm a customer
              </TabsTrigger>
              <TabsTrigger
                value="technician"
                className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
              >
                I'm a technician
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="customer" className="mt-12">
            <StepGrid steps={customerSteps} />
          </TabsContent>

          <TabsContent value="technician" className="mt-12">
            <StepGrid steps={technicianSteps} />
          </TabsContent>
        </Tabs>

        {/* Booking status legend */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h3 className="text-sm font-semibold text-foreground">
            Booking status, at a glance
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Every booking moves through these states. You'll see the current
            one as a badge on your dashboard.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {statusBadges.map((badge) => (
              <Badge
                key={badge.label}
                variant="outline"
                className={`rounded-full px-3 py-1 text-xs font-medium ${badge.className}`}
              >
                {badge.label}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepGrid({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <div
            key={step.title}
            className="relative rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-mono text-xs text-muted-foreground">
                Step {index + 1}
              </span>
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
