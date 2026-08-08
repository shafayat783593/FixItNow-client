import Link from "next/link";
import { FileText } from "lucide-react";

const sections = [
  ["Using FixItNow", "Use the platform lawfully and provide accurate account and booking information. Keep your login details secure and notify us if you suspect unauthorized access."],
  ["Bookings and services", "Service details, availability, and pricing are provided by technicians. Review the booking information before confirming, and communicate changes through the platform."],
  ["Payments", "Payment is collected through the available secure payment methods after a booking is accepted. Any applicable refunds are handled according to the booking and payment terms shown at checkout."],
  ["Reviews and conduct", "Reviews must reflect genuine service experiences. Do not post harmful, misleading, or unlawful content, and treat technicians and customers respectfully."],
  ["Changes to these terms", "We may update these terms when the service changes or when required by law. Continued use after an update means you accept the revised terms."],
];

export default function TermsPage() {
  return <LegalPage title="Terms of Service" intro="The rules for using FixItNow and booking trusted home services." sections={sections} />;
}

function LegalPage({ title, intro, sections }: { title: string; intro: string; sections: string[][] }) {
  return <main className="min-h-screen bg-background py-16 sm:py-24"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent"><FileText className="h-6 w-6" /></div><p className="mt-6 text-xs font-bold uppercase tracking-[0.2em] text-accent">FixItNow</p><h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">{title}</h1><p className="mt-4 text-base leading-relaxed text-muted-foreground">{intro}</p><p className="mt-3 text-sm text-muted-foreground">Last updated: August 8, 2026</p><div className="mt-10 space-y-8">{sections.map(([heading, text], index) => <section key={heading} className="rounded-2xl border border-border bg-card p-6 sm:p-8"><h2 className="text-lg font-bold text-foreground">{index + 1}. {heading}</h2><p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p></section>)}</div><p className="mt-10 text-sm text-muted-foreground">Questions about these terms? <Link href="/contact" className="font-semibold text-accent hover:opacity-80">Contact us</Link>.</p></div></main>;
}
