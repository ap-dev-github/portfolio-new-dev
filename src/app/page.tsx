'use client'
import { Activity, useState } from "react";
import Hero from "@/components/Hero";
import FlagshipSaaS from "@/components/FlagShipSaas";
import ArchitectureLevelOne from "@/components/ArchitectureLevelOne";
import ArchitecturePipelines from "@/components/ArchitecturePipelines";
import { RESUME_DATA } from "@/data/resume";
import { ActivityIcon, ArrowRight, Layers, ShieldCheck, Timer, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import RecognitionSection from "@/components/RecognitionSection";
import PerspectiveEngine from "@/components/PrespectiveEngine";

export default function Home() {
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [showPipelines, setShowPipelines] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0e14] text-slate-200 selection:bg-blue-500/30">
      {/* ================= NAVBAR ================= */}
      <nav className="fixed top-0 w-full z-50 bg-[#0b0e14]/80 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display font-bold text-xl tracking-tight text-white">
            {RESUME_DATA.name.split(" ")[0]}
            <span className="text-blue-500">.dev</span>
          </span>

          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#" className="hover:text-white transition-colors">
              Home
            </a>
            <a href="#saas" className="hover:text-white transition-colors">
              Live SaaS
            </a>
            <a href="#recognition" className="hover:text-white transition-colors">
              Recognition
            </a>
          </div>
        </div>
      </nav>

      {/* ================= HERO ================= */}
      <Hero />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <PerspectiveEngine/>
      </motion.div>

    
      <section id="saas">
        <FlagshipSaaS />
      </section>
      {/* ===== HIGH-VELOCITY SPRINT LAB: SWIFTVAULT ===== */}
<section className="mt-32 space-y-12 max-w-4xl mx-auto">
  <div className="flex items-center gap-4">
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
    <h2 className="text-xs font-mono tracking-[0.5em] text-slate-500 uppercase font-black">
      High-Velocity Prototyping
    </h2>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-slate-800 to-transparent" />
  </div>

  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group bg-slate-900/30 border border-white/5 rounded-[3rem] p-8 md:p-12 overflow-hidden hover:border-emerald-500/30 transition-all duration-500 shadow-2xl"
  >
    {/* Ambient Glows */}
    <div className="absolute -right-20 -top-20 w-96 h-96 bg-emerald-500/5 blur-[100px] group-hover:bg-emerald-500/10 transition-colors" />
    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-blue-500/5 blur-[80px]" />
    
    <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
      
      {/* 1. PROJECT META & CONTENT */}
      <div className="flex-1 space-y-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4 justify-center md:justify-start">
          <div className="p-4 bg-emerald-500/10 rounded-3xl border border-emerald-500/20 shadow-inner">
            <ShieldCheck className="text-emerald-400" size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1 justify-center md:justify-start">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[9px] font-mono font-bold uppercase tracking-tighter">
                Engineering Sprint
              </span>
              <Timer size={12} className="text-slate-500" />
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">144 Hours</span>
            </div>
            <h3 className="text-4xl font-black text-white italic tracking-tighter uppercase leading-none">SwiftVault</h3>
          </div>
        </div>

        <p className="text-slate-400 text-lg leading-relaxed font-medium italic max-w-xl">
          "The 6-Day Infrastructure Challenge." Built from scratch to deployment in 144 hours. 
          A high-performance secure vault utilizing Go's native concurrency for 
          SHA-256 deduplication and RS256 asymmetric encryption.
        </p>

        {/* TECH SPECS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-white/5">
          <div>
            <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Architecture</p>
            <p className="text-white text-xs font-bold uppercase tracking-tighter">Hybrid GraphQL/REST</p>
          </div>
          <div>
            <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Storage Engine</p>
            <p className="text-white text-xs font-bold uppercase tracking-tighter">MinIO (S3 Native)</p>
          </div>
          <div className="col-span-2 md:col-span-1">
            <p className="text-[9px] font-mono uppercase text-slate-500 mb-1">Compute Environment</p>
            <p className="text-white text-xs font-bold uppercase tracking-tighter">Docker / AWS EC2</p>
          </div>
        </div>
      </div>


      <div className="w-full md:w-auto flex flex-col gap-4 min-w-[240px]">

        <a 
          href="https://swiftvault-ayushs-projects-0e2cdca4.vercel.app/" 
          target="_blank"
          className="group/btn relative flex items-center justify-between gap-6 px-8 py-5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all hover:bg-emerald-400 shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95"
        >
          Visit Website
          <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>

        <a 
          href="/swiftvault" 
          className="cursor-pointer group/btn flex items-center justify-between gap-6 px-8 py-5 bg-slate-800 border border-white/10 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all hover:border-blue-500/50 hover:bg-slate-700/50 shadow-xl active:scale-95"
        >
          View System Detail
          <Layers size={20} className="text-blue-400 group-hover/btn:scale-110 transition-transform" />
        </a>
        
       
      </div>

    </div>
  </motion.div>
</section>

<section id = "recognition">
<RecognitionSection/>
</section>



   

      {/* ================= FOOTER ================= */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900 bg-[#05080c]">
        <p>
          © 2026 Ayush Pandey. Indie SaaS Developer · Multi-cloud Systems ·
          Serverless Architecture
        </p>
      </footer>

      {/* ================= ARCHITECTURE MODALS ================= */}
      {showArchitecture && (
        <ArchitectureLevelOne
          onNext={() => {
            setShowArchitecture(false);
            setShowPipelines(true);
          }}
        />
      )}

      {showPipelines && (
        <ArchitecturePipelines
          onClose={() => setShowPipelines(false)}
        />
      )}
    </main>
  );
}
