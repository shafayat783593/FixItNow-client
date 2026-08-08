import Image from 'next/image';
import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background font-sans text-foreground selection:bg-accent selection:text-accent-foreground lg:flex-row">
      
      {/* LEFT / BACKGROUND: Full Width Workshop & Technician Visual */}
      <div className="relative w-full lg:w-[60%] xl:w-[65%] min-h-[300px] lg:min-h-screen bg-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden">
        {/* Background Workshop Image */}
    <div className="absolute inset-0 z-0">
  <Image
    src="/images/auth.avif"
    alt="Fixpro Technician Workshop"
    fill
    priority
    className="object-cover opacity-60 scale-105"
    sizes="100vw"
  />

  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-slate-950/90" />
  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/40" />
</div>

        {/* Top Brand Info */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 backdrop-blur-md text-xs font-semibold text-orange-400">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span>FixItNow. Home Repairs</span>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            24/7 Emergency Dispatch
          </span>
        </div>

        {/* Middle Bold 3D Headline Overlay */}
        <div className="relative z-10 max-w-xl my-8 lg:my-auto space-y-4">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-[1.05]">
            THE SMART <br />
            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500 bg-clip-text text-transparent">
              REPAIR HUB.
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-medium leading-relaxed max-w-md">
            Certified technicians for AC servicing, plumbing, electrical & home maintenance.
          </p>
        </div>

        {/* Bottom Status Tag */}
        <div className="relative z-10 hidden sm:flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80 pt-4">
          <span>Fixitnow Verified Platform</span>
          <span className="text-orange-400 font-semibold">90-Day Guarantee</span>
        </div>
      </div>

      {/* RIGHT SIDE: Overlapping Curved Form Card */}
      <div className="relative flex w-full flex-col justify-center bg-background lg:min-h-screen lg:w-[40%] xl:w-[35%]">
        <div className="relative z-20 -mt-10 flex h-full w-full flex-col justify-center overflow-y-auto rounded-t-[36px] bg-card p-6 text-card-foreground shadow-2xl transition-all sm:p-10 lg:mt-0 lg:rounded-l-[44px] lg:rounded-t-none lg:p-12">
          {children}
        </div>
      </div>

    </div>
  );
}
