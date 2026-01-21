'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Zap, Database, Server, ChevronRight,
  Maximize2, X, TrendingDown, Github, ExternalLink, ArrowRight,
  FileUp
} from 'lucide-react';
import HomeButton from '@/components/HomeButton';

/* ======================================================
   ARCHITECTURE DATA (MAPPED TO LOCAL IMAGES)
====================================================== */
const SWIFT_DOCS = [
  {
    id: 'system-map',
    title: 'Monolith System Mesh',
    icon: <Server size={20} className="text-emerald-400" />,
    desc: 'The original hybrid architecture: Next.js routing, Go backend services, and multi-tier data persistence built for the BalkanID capstone.',
    image: '/images/swiftvault/swiftvault-monolith.png',
    repo: 'https://github.com/ap-dev-github/swiftvault-smart-storage'
  },
  {
    id: 'upload-flow',
    title: 'Binary Upload Logic',
    icon: <FileUp size={20} className="text-orange-400" />,
    desc: 'Intelligent file ingestion: First-512B MIME validation and SHA-256 content-addressable storage for zero-duplicate uploads.',
    image: '/images/swiftvault/storage-sequence.png'
  },
 {
    id: 'severless-system',
    title: 'Optimized Serverless Mesh',
    icon: <Zap size={20} className="text-blue-400" />,
    desc: 'The shift to serverless was motivated by 14 days of monitoring AWS cloud instance costs for an idle resource. Migrated to Edge-compute (Workers) and Scale-to-Zero DB (Neon) to eliminate unnecessary burn.',
    image: '/images/swiftvault/swiftvault-decoupled.png'
  }
];

export default function SwiftVaultArchitecturePage() {
  const [activeTab, setActiveTab] = useState(SWIFT_DOCS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <main className="min-h-screen bg-[#05080c] text-slate-200 selection:bg-emerald-500/30">
      
      {/* HEADER SECTION */}
      <section className="pt-16 pb-16 px-6 max-w-[1400px] mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-emerald-500" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-emerald-500">
                Architectural Blueprint 
              </span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
              Swift<span className="text-emerald-500">Vault</span>
            </h1>
            <p className="text-xl text-slate-400 font-bold italic tracking-tight uppercase max-w-2xl">
              From Monolithic Competition Sprint to <span className="text-white underline decoration-emerald-500/50 underline-offset-8">Serverless Production.</span>
            </p>
            <div className="pt-4 flex gap-4">
              <HomeButton/>
              <a 
                href="https://github.com/ap-dev-github/swiftvault-smart-storage" 
                target="_blank"
                className="flex items-center gap-2 px-6 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 hover:border-emerald-500/30 transition-all"
              >
                <Github size={14} /> Monolith Repo
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3 text-right">
             <div className="flex items-center gap-2 justify-end text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" /> Zero-Trust Verified
             </div>
             <div className="flex items-center gap-2 justify-end text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                <Zap size={14} className="text-blue-500" /> Edge-Native Performance
             </div>
          </div>
        </div>
      </section>

      {/* COST EVOLUTION (THE "WHY") */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-red-500 mb-4 font-mono text-[10px] font-bold uppercase tracking-widest">
                <X size={14}/> Baseline: Monolith
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Original Sprint</h3>
              <p className="text-slate-400 text-sm italic font-medium mb-6">Designed for BalkanID Capstone. Fixed AWS t2.small instance costing ~$204/yr at idle.</p>
              <div className="text-4xl font-black text-white font-mono italic">~$17<span className="text-sm text-slate-500 font-normal"> / mo</span></div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-emerald-400 mb-4 font-mono text-[10px] font-bold uppercase tracking-widest">
                <Zap size={14} /> Post-Competition Audit
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Serverless Shift</h3>
              <p className="text-slate-300 text-sm italic font-medium mb-6">Decoupled the monolith to stop "burning money" on idle servers. Auto-scales to zero.</p>
              <div className="text-4xl font-black text-emerald-400 font-mono italic">$0.00<span className="text-sm text-emerald-500/60 font-normal"> / idle</span></div>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/20 flex flex-col justify-center items-center text-center">
            <TrendingDown className="text-blue-400 mb-4 animate-bounce" size={48} />
            <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">47%</h3>
            <p className="text-blue-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mt-2 mb-4">Actual TCO Savings</p>
            <p className="text-slate-500 text-[10px] italic">Optimized via R2 Egress avoidance & Neon Scaling.</p>
          </div>
        </div>
      </section>

      {/* DOCUMENTATION GRID */}
      <section className="py-10 px-6 max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest italic">// Select System Node</h4>
            <nav className="flex flex-col gap-3">
              {SWIFT_DOCS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveTab(doc)}
                  className={`cursor-pointer flex items-center justify-between p-6 rounded-3xl border transition-all ${
                    activeTab.id === doc.id 
                    ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20 shadow-lg' 
                    : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 text-left">
                    {doc.icon}
                    <div className="flex flex-col">
                      <span className={`text-xs font-black uppercase tracking-widest ${activeTab.id === doc.id ? 'text-white' : 'text-slate-500'}`}>
                        {doc.title}
                      </span>
                      {doc.id === 'severless-system' && <span className="text-[8px] text-blue-400 font-mono font-bold mt-1 uppercase tracking-tighter italic">Recommended: Production Build</span>}
                    </div>
                  </div>
                  <ChevronRight size={16} className={activeTab.id === doc.id ? 'text-emerald-500' : 'text-slate-800'} />
                </button>
              ))}
            </nav>
          </div>

          {/* REPO CTA */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
            <div className="flex items-center gap-2">
              <Github size={14} className="text-slate-400" />
              <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest italic">Open Source Handshake</h4>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed italic">
              The Monolith codebase is public for technical audit. It contains the core Go handlers and GraphQL resolvers used in the competition.
            </p>
            <a 
              href="https://github.com/ap-dev-github/swiftvault-smart-storage" 
              target="_blank"
              className="flex items-center justify-between w-full p-4 bg-slate-800 border border-white/10 rounded-2xl text-white font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-slate-700 transition-all group"
            >
              Access Monolith Repo
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>

        {/* IMAGE RENDERER */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">
              System visualization <span className="text-slate-700 font-mono text-xs ml-2">// {activeTab.id}</span>
            </h3>
            <button 
              onClick={() => setIsFullscreen(true)}
              className="cursor-pointer flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-full text-[10px] font-mono font-bold text-slate-400 hover:text-white transition-colors"
            >
              <Maximize2 size={12} /> Full Screen
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="relative aspect-video w-full bg-slate-950/80 rounded-3xl border border-white/5 overflow-hidden flex items-center justify-center p-4 md:p-12 shadow-inner"
            >
              <img 
                src={activeTab.image} 
                alt={activeTab.title} 
                className="max-w-full max-h-full object-contain filter drop-shadow-[0_0_30px_rgba(16,185,129,0.1)]"
              />
            </motion.div>
          </AnimatePresence>
          <div className="px-6 space-y-2">
            <p className="text-slate-300 text-sm italic font-medium leading-relaxed">{activeTab.desc}</p>
            {activeTab.id === 'severless-system'}
          </div>
        </div>
      </section>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col p-6 md:p-10"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                  {activeTab.title} // Full View
                </h2>
                <p className="text-xs text-slate-500 font-mono tracking-widest uppercase italic">
                  SwiftVault Engineering Audit Log
                </p>
              </div>
              <button 
                onClick={() => setIsFullscreen(false)}
                className="p-4 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 flex items-center justify-center overflow-hidden rounded-[3rem] border border-white/10 bg-black/40 p-4 md:p-12">
               <img 
                src={activeTab.image} 
                alt={activeTab.title} 
                className="max-w-full max-h-full object-contain shadow-2xl scale-110 md:scale-100"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="mt-20 py-20 border-t border-white/5 text-center bg-[#03060a]">
        <p className="text-[10px] font-mono text-slate-700 uppercase tracking-[0.4em] italic leading-loose">
          SwiftVault Infrastructure Documentation <br/>
          Designed, Developed & Optimized by Ayush Pandey <br/>
          © 2026 // ALL_SYSTEMS_OPERATIONAL
        </p>
      </footer>
    </main>
  );
}