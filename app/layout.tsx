import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner"; // react-hot-toast বাদ দিয়ে sonner ব্যবহার করুন
import Navbar from "@/components/shared/Navbar";
import LayoutWrapper from "@/components/LayoutWrapper";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: "FixItNow - Your Trusted Home Service Platform",
  description: "Book qualified technicians for home services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
        {/* Sonner Toaster */}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}