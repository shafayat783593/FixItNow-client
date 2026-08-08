"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { googleLoginAction } from "../_action/_authAction";

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
          }) => void;
          renderButton: (
            parent: HTMLElement,
            options: { theme: string; size: string; width?: number; text?: string }
          ) => void;
        };
      };
    };
  }
}

export default function GoogleSignInButton() {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);

  const handleCredential = async (response: { credential: string }) => {
    setLoading(true);
    try {
      const result = await googleLoginAction(response.credential);
      // On success setAuthCookiesAndRedirect() already redirected (throws internally),
      // so reaching here with success:false means it actually failed.
      if (!result.success) {
        toast.error(result.message || "Google sign-in failed");
      }
    } catch (err) {
      // NEXT_REDIRECT throws by design on success — ignore it here.
      if (!(err instanceof Error && err.message === "NEXT_REDIRECT")) {
        toast.error("Something went wrong with Google sign-in");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    if (!clientId) {
      console.error("NEXT_PUBLIC_GOOGLE_CLIENT_ID is not set");
      return;
    }

    const tryInit = () => {
      if (!window.google || !buttonRef.current) return;
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: "continue_with",
      });
    };

    const interval = setInterval(() => {
      if (window.google) {
        tryInit();
        clearInterval(interval);
      }
    }, 200);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-2">
      <Script src="https://accounts.google.com/gsi/client" strategy="afterInteractive" />
      <div ref={buttonRef} className={loading ? "opacity-50 pointer-events-none" : ""} />
    </div>
  );
}