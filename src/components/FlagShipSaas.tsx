import { ArrowRight, Globe, Zap, ShieldCheck, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function FlagshipSaaS() {
  const router = useRouter();

  return (
    <section className="py-12 md:py-32 px-4 md:px-6 w-full max-w-[1400px] mx-auto">
      <div className="relative rounded-[2rem] md:rounded-[3rem] border border-white/10 bg-slate-900/20 backdrop-blur-3xl overflow-hidden shadow-2xl">
        
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-64 md:96 h-64 md:96 bg-emerald-500/5 rounded-full blur-[80px] md:blur-[120px]" />
        <div className="absolute -bottom-24 -left-24 w-64 md:96 h-64 md:96 bg-blue-600/5 rounded-full blur-[80px] md:blur-[120px]" />

        <div className="relative z-10 p-6 md:p-16 lg:p-20 grid lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* CONTENT: Takes 3/5 of the width */}
          <div className="lg:col-span-3 space-y-6 md:space-y-8">
            <div className="flex flex-wrap items-center gap-2 md:gap-3">
              <span className="px-3 md:px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[9px] md:text-[10px] font-mono font-black tracking-[0.2em] text-emerald-400 uppercase">
                Flagship Production SaaS
              </span>
              <span className="flex items-center gap-1.5 px-3 md:px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-[9px] md:text-[10px] font-mono font-black tracking-[0.2em] text-orange-400 uppercase">
                <ShieldCheck size={10} /> MSME India Registered
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[1px] w-8 md:w-10 bg-emerald-500" />
                <span className="text-[9px] md:text-[10px] font-mono font-black uppercase tracking-[0.4em] text-emerald-500">
                  Nexus Architecture
                </span>
              </div>

              <h2 className="text-4xl  sm:text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-[0.85] md:leading-[0.8]">
                version<span className=" text-emerald-500 italic font-black">CV</span>
              </h2>
              
              <p className="text-lg md:text-2xl text-slate-400 font-bold italic tracking-tight uppercase leading-none">
                Production-Ready <span className="text-white">AI Resume Intelligence.</span>
              </p>
            </div>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-2xl font-medium italic">
              <span className="text-white font-semibold italic">VersionCV</span> is an enterprise-grade platform built on a 
              fully <span className="text-emerald-400 underline decoration-emerald-500/30">event-driven, serverless mesh</span>. 
              Engineered to replace manual tailoring with deterministic AI pipelines, it scales to zero when idle, 
              maintaining $0.00 overhead while handling real-world production traffic.
            </p>

            {/* KEY METRIC PILLS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-white/5 md:border-none">
              {[
                { label: "Status", val: "Operational", icon: <Globe size={14} className="text-emerald-400" /> },
                { label: "Arch", val: "Multi-Cloud", icon: <Zap size={14} className="text-blue-400" /> },
                { label: "Load", val: "5k RPS Stable", icon: <ShieldCheck size={14} className="text-purple-400" /> },
                { label: "Security", val: "JWT/RS256", icon: <ShieldCheck size={14} className="text-orange-400" /> },
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-1 md:border-l border-white/10 md:pl-4">
                  <div className="flex items-center gap-2 text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                    {item.icon} {item.label}
                  </div>
                  <div className="text-white font-mono font-bold text-[10px] md:text-xs uppercase italic tracking-tighter">{item.val}</div>
                </div>
              ))}
            </div>

            {/* RESPONSIVE BUTTON GROUP */}
            <div className="flex flex-col sm:flex-row flex-wrap items-center gap-4 pt-4 md:pt-6">
              <a
                href="https://versioncv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 rounded-2xl bg-white text-black font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-emerald-400 hover:scale-[1.02] shadow-[0_10px_40px_rgba(255,255,255,0.05)] active:scale-95"
              >
                Visit Live SaaS
                <ArrowRight size={18} />
              </a>

              <button
                onClick={() => router.push("/versioncv")}
                className="group cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 rounded-2xl bg-slate-800 border border-white/5 hover:bg-slate-700/50 text-white font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
              >
                System Design
                <ArrowRight size={18} className="text-blue-400 transition-transform group-hover:translate-x-1" />
              </button>
              
              <button
                onClick={() => router.push("/versioncv/performance")}
                className="group cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-4 px-8 py-4 md:px-10 md:py-5 rounded-2xl bg-slate-800 border border-white/5 hover:bg-slate-700/50 text-white font-black text-xs uppercase tracking-[0.2em] transition-all active:scale-95 shadow-xl"
              >
                Metrics
                <Activity size={18} className="text-emerald-400 transition-transform group-hover:scale-110" />
              </button>
            </div>
          </div>

          {/* VISUAL: Mockup look - Hidden on tiny screens, scaled on larger */}
          <div className="lg:col-span-2 relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-blue-500/10 rounded-[2rem] blur-2xl" />
            <div className="relative rounded-[1.5rem] md:rounded-[2rem] border border-white/10 bg-black/50 overflow-hidden shadow-2xl lg:rotate-2 hover:rotate-0 transition-transform duration-700">
              <img
                src={`${process.env.NEXT_PUBLIC_ASSETS_CDN}/images/preview/landing-page-v1.png`}
                alt="VersionCV SaaS Preview"
                className="w-full h-auto object-cover opacity-80 hover:opacity-100 transition-opacity"
              />
              
              <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 p-3 md:p-4 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl md:rounded-2xl">
                 <div className="flex items-center justify-between">
                    <div className="text-[8px] md:text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-widest">System Health</div>
                    <div className="h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500 rounded-full animate-pulse" />
                 </div>
                 <div className="text-white font-bold text-[10px] md:text-xs mt-1 italic uppercase tracking-tighter">V1.2.0-STABLE · 99.9% Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}