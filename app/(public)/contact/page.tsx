import { Clock3, Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "./ContactForm";

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background py-16 sm:py-24">
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)", backgroundSize: "28px 28px" }} aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
        <div className="lg:pt-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-accent"><MessageCircle className="h-4 w-4" /><span className="text-xs font-bold uppercase tracking-wider">Contact us</span></div>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">We&apos;re here to help.</h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">Have a question about FixItNow, a booking, or your account? Send us a message and we&apos;ll get back to you soon.</p>
          <div className="mt-10 space-y-5">
            <ContactInfo icon={Mail} title="Email" text="support@fixitnow.com" />
            <ContactInfo icon={Clock3} title="Support hours" text="Saturday–Thursday, 9:00 AM–7:00 PM" />
            <ContactInfo icon={MapPin} title="Location" text="Chattogram, Bangladesh" />
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  );
}

function ContactInfo({ icon: Icon, title, text }: { icon: typeof Mail; title: string; text: string }) {
  return <div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent"><Icon className="h-5 w-5" /></span><div><h2 className="text-sm font-semibold text-foreground">{title}</h2><p className="mt-0.5 text-sm text-muted-foreground">{text}</p></div></div>;
}
