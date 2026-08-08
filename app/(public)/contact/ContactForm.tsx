"use client";

import { useActionState, useEffect } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { sendContactMessage, type ContactFormState } from "./actions";

const initialState: ContactFormState = { success: false, message: "" };

export function ContactForm() {
  const [state, action, pending] = useActionState(sendContactMessage, initialState);

  useEffect(() => {
    if (!state.message) return;
    if (state.success) toast.success(state.message);
    else toast.error(state.message);
  }, [state]);

  return (
    <form action={action} className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-foreground/5 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" placeholder="Your name" required />
        <Field label="Email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" placeholder="Optional" />
        <Field label="Subject" name="subject" placeholder="How can we help?" required />
      </div>
      <div className="mt-5">
        <label htmlFor="message" className="text-sm font-semibold text-foreground">Message <span className="text-destructive">*</span></label>
        <textarea id="message" name="message" required rows={6} placeholder="Tell us how we can help..." className="mt-2 w-full resize-y rounded-xl border border-input bg-background px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20" />
      </div>
      <button type="submit" disabled={pending} className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60">
        {pending ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending message...</> : <><Send className="h-4 w-4" /> Send message</>}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", placeholder, required = false }: {
  label: string; name: string; type?: string; placeholder: string; required?: boolean
}) {
  return <div>
    <label htmlFor={name} className="text-sm font-semibold text-foreground">{label}
      {required && <span className="text-destructive">*</span>}
    </label>
    <input id={name} name={name} type={type} required={required} placeholder={placeholder}
    className="mt-2 h-11 w-full rounded-xl border border-input bg-background px-3.5 text-sm text-foreground placeholder:text-muted-foreground outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20" />
  </div>;
}
