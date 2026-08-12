"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { toast } from "sonner";
import { googleLoginAction } from "../_action/_authAction";

type GoogleSignInButtonProps = {
  variant?: "login" | "register";
};

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

export default function GoogleSignInButton({ variant = "login" }: GoogleSignInButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [scriptReady, setScriptReady] = useState(false);
  const buttonText = variant === "register" ? "signup_with" : "continue_with";

  const handleCredential = async (response: { credential: string }) => {
    setLoading(true);
    try {
      const result = await googleLoginAction(response.credential);
      if (!result.success) {
        toast.error(result.message || "Google sign-in failed");
      }
    } catch (err) {
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

    let cancelled = false;

    const renderGoogleButton = () => {
      if (cancelled || !window.google || !buttonRef.current) return false;

      setScriptReady(true);
      buttonRef.current.innerHTML = "";
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleCredential,
      });
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: "outline",
        size: "large",
        width: 320,
        text: buttonText,
      });
      return true;
    };

    if (renderGoogleButton()) {
      return () => {
        cancelled = true;
      };
    }

    const interval = setInterval(() => {
      if (renderGoogleButton()) {
        clearInterval(interval);
      }
    }, 200);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buttonText]);

  return (
    <div className="w-full">
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onReady={() => setScriptReady(true)}
      />

      <div className="relative rounded-2xl border border-border bg-card p-2 shadow-sm transition-all hover:border-accent/40 hover:shadow-md">
        <div className={`flex justify-center transition-opacity duration-200 ${loading ? "pointer-events-none opacity-40" : ""}`}>
          <div ref={buttonRef} />
        </div>

        {!scriptReady && (
          <div className="absolute inset-2 flex items-center justify-center rounded-[14px] border border-dashed border-border bg-background/85 text-xs font-medium text-muted-foreground">
            Loading Google sign-in
          </div>
        )}

        {loading && (
          <div className="absolute inset-2 flex items-center justify-center rounded-[14px] bg-background/80 backdrop-blur-sm">
            <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
          </div>
        )}
      </div>
    </div>
  );
}
