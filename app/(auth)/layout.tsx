import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-900 font-sans selection:bg-orange-500 selection:text-white relative flex flex-col lg:flex-row overflow-x-hidden">
      
      {/* LEFT / BACKGROUND: Full Width Workshop & Technician Visual */}
      <div className="relative w-full lg:w-[60%] xl:w-[65%] min-h-[300px] lg:min-h-screen bg-slate-900 flex flex-col justify-between p-6 sm:p-10 lg:p-12 overflow-hidden">
        {/* Background Workshop Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1600&auto=format&fit=crop"
            alt="Fixpro Technician Workshop"
            className="w-full h-full object-cover opacity-60 scale-105"
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
      <div className="relative w-full lg:w-[40%] xl:w-[35%] lg:min-h-screen bg-slate-950 flex flex-col justify-center">
        <div className="w-full h-full bg-white text-slate-900 rounded-t-[36px] lg:rounded-t-none lg:rounded-l-[44px] shadow-2xl p-6 sm:p-10 lg:p-12 flex flex-col justify-center relative z-20 -mt-10 lg:mt-0 transition-all duration-300 overflow-y-auto">
          {children}
        </div>
      </div>

    </div>
  );
}