"use server";

import { serverFetch } from "@/lib/api/serverFetch";

export type ContactFormState = {
  success: boolean;
  message: string;
};

export async function sendContactMessage(
  _previousState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const payload = {
    name: String(formData.get("name") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    subject: String(formData.get("subject") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
  };

  if (!payload.name || !payload.email || !payload.subject || !payload.message) {
    return { success: false, message: "Please complete all required fields." };
  }

  const result = await serverFetch("/api/contact", {
    method: "POST",
    body: payload,
  });

  return {
    success: Boolean(result?.success),
    message: result?.message ?? "Unable to send your message. Please try again.",
  };
}
