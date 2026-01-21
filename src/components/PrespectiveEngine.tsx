'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Cpu, Terminal, Briefcase, GraduationCap, X, Lightbulb, BotIcon } from 'lucide-react';

const SUMMARIES = {
  founder:"I build high-performance systems designed to scale from day one and cost less, ensuring your tech stays profitable as it grows.",
  engineer: "Computer Science Engineer specializing in serverless orchestration. I apply core CS fundamentals to build hardened systems, implementing Zero Client-Trust models, JWT/Token protection, and robust DDoS/XSS mitigation. My focus is full-stack optimization—bridging the gap between low-latency code and cost-efficient infrastructure to achieve total system-level performance.",
  architect: "Architected versionCV as a zero-idle-cost serverless SaaS. Engineered a hybrid mesh using Cloudflare Workers for edge latency and Google Cloud Run for heavy NPM orchestration on a per-request basis. Decoupled monolithic dependencies into an event-driven infrastructure that achieves $0.00 overhead.",
  recruiter: "Full-stack engineer capable of owning production-grade products end-to-end. Specializes in multi-cloud serverless roles and practical AI integration to solve business-critical problems. IIT Kanpur National Hackathon 1st Runner Up (Top 0.2%) with a strong academic foundation (8.69 CGPA).",
  student: "Self-made developer focused on the 'Build-First' philosophy. From small prototypes to production SaaS, I argue with AI on the most efficient architectural paths, build, plan, and iterate. My expertise comes from solving real-world, undocumented problems that cannot be learned in a classroom."
};

const SYSTEM_LOGS = [
  "> Initializing secure handshake...",
  "> Auditing multi-cloud mesh (AWS/CF/Neon)...",
  "> Analyzing 5k RPS load-test logs...",
  "> Verifying RS256 encryption protocols...",
  "> Optimizing for cost-efficiency (47% TCO)...",
  "> Summarizing architectural nodes..."
];

export default function ProfileSummarizer() {
  const [active, setActive] = useState<keyof typeof SUMMARIES | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [logIndex, setLogIndex] = useState(0);

  const handleSelect = (key: keyof typeof SUMMARIES) => {
    if (key === active || isTyping) return;
    setIsTyping(true);
    setActive(key);
    setLogIndex(0);
    
    // Simulate system logs
    const interval = setInterval(() => {
      setLogIndex(prev => (prev < SYSTEM_LOGS.length - 1 ? prev + 1 : prev));
    }, 200);

    setTimeout(() => {
      clearInterval(interval);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <section className="py-24 max-w-3xl mx-auto px-6">
      {/* Header Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
            <Bot className="text-emerald-500" size={18} />
          </div>
          <div>
            <h3 className="text-[10px] font-mono font-black uppercase tracking-[0.2em] text-white">Profile Summarizer</h3>
            <p className="text-[9px] text-slate-500 uppercase font-bold tracking-widest italic">V1.0-STABLE // Distributed Audit</p>
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a]/40 border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl backdrop-blur-xl">
        {/* Messages Area */}
        <div className="p-6 space-y-6 h-[400px] overflow-y-auto custom-scrollbar">
          {/* Initial Bot Message */}
          <div className="flex gap-3 max-w-[85%]">
            <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 font-mono text-[10px] text-emerald-400"><BotIcon size={10}/></div>
            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl rounded-tl-none">
              <p className="text-sm text-slate-300 leading-relaxed">
                Identify your role. I will synthesize Ayush's infrastructure data into a targeted brief.
              </p>
            </div>
          </div>

  <AnimatePresence mode="popLayout">
  {/* 1. THE USER'S CHOICE (BLUE BUBBLE) */}
  {active && (
    <motion.div
      key={`${active}-user-msg`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex gap-3 max-w-[85%] self-end flex-row-reverse ml-auto"
    >
      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 font-mono text-[10px] text-blue-400 italic">
        USER
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl rounded-tr-none">
        <p className="text-sm text-blue-100 font-bold uppercase tracking-widest leading-none">
          Perspective: {active}
        </p>
      </div>
    </motion.div>
  )}

  {/* 2. THE AI THINKING STATE (TYPING INDICATOR + LOGS) */}
  {isTyping && (
    <motion.div
      key="system-typing-indicator"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex flex-col gap-4"
    >
      <div className="flex gap-3">
        <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 animate-pulse font-mono text-[10px] text-emerald-400 italic">
        <BotIcon size={10}/>
        </div>
        <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" />
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
      
      {/* Real-time system log stream */}
      <div className="ml-11 font-mono text-[9px] text-emerald-500/50 italic animate-pulse tracking-tight">
        {SYSTEM_LOGS[logIndex]}
      </div>
    </motion.div>
  )}

  {/* 3. THE AI RESPONSE (EMERALD BUBBLE) */}
  {active && !isTyping && (
    <motion.div
      key={`${active}-bot-response`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-3 max-w-[95%]"
    >
      <div className="h-8 w-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30 font-mono text-[10px] text-emerald-400">
       <BotIcon size={10}/>
      </div>
      <div className="bg-emerald-500/5 border border-emerald-500/20 p-5 rounded-2xl rounded-tl-none relative shadow-[0_0_30px_rgba(16,185,129,0.05)]">
        <p className="text-sm text-slate-200 leading-relaxed italic font-medium">
          <span className="text-emerald-500 font-bold mr-2">Audit Complete:</span>
          {SUMMARIES[active]}
        </p>
      </div>
    </motion.div>
  )}
</AnimatePresence>
        </div>

        {/* Input/Selector Area */}
        <div className="p-4 bg-black/40 border-t border-white/5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
                { id: 'founder', icon: <Lightbulb size={14} className="group-hover:text-amber-400 transition-colors" /> },
              { id: 'engineer', icon: <Cpu size={14} /> },
              { id: 'architect', icon: <Terminal size={14} /> },
              { id: 'recruiter', icon: <Briefcase size={14} /> },
            
              
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id as keyof typeof SUMMARIES)}
                disabled={isTyping}
                className={`p-3 rounded-xl border transition-all flex items-center justify-center gap-2 group ${
                  active === item.id 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-white' 
                  : 'bg-slate-800/40 border-white/5 text-slate-500 hover:border-white/20'
                }`}
              >
                {item.icon}
                <span className="text-[9px] font-black uppercase tracking-widest">{item.id}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}