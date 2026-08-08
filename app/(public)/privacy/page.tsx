import Link from "next/link";
import { ShieldCheck } from "lucide-react";

const sections = [
  ["Information we collect", "We collect information you provide when creating an account, making bookings, submitting reviews, or contacting us. This can include your name, email address, phone number, and service-related details."],
  ["How we use information", "We use your information to operate the platform, manage bookings, process payments, communicate with you, improve the service, and help maintain platform safety."],
  ["Sharing information", "We share only the information needed to complete a booking between customers and technicians, process payments, comply with legal obligations, or protect the platform from misuse."],
  ["Data security", "We use reasonable technical and organizational safeguards to protect personal information. No online service can guarantee absolute security, so please protect your account credentials."],
  ["Your choices", "You can update your profile information from your dashboard. To ask about your data or this policy, contact our support team."],
];

export default function PrivacyPage() {
  return <main className="min-h-screen bg-background py-16 sm:py-24"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent"><ShieldCheck className="h-6 w-6" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent">FixItNow</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">Privacy Policy</h1><p className="mt-4 text-base leading-relaxed text-muted-foreground">How FixItNow handles the personal information needed to provide a reliable home-service platform.</p><p className="mt-3 text-sm text-muted-foreground">Last updated: August 8, 2026</p><div className="mt-10 space-y-8">{sections.map(([heading, text], index) => <section key={heading} className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-lg font-bold text-foreground">{index + 1}. {heading}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></section>)}</div><p className="mt-10 text-sm text-muted-foreground">Privacy question? <Link href="/contact" className="font-semibold text-accent hover:opacity-80">Contact us</Link>.</p></div></main>;
}
