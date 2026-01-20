'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Activity, ShieldCheck, Zap, Database, ArrowRight } from 'lucide-react';

/* ======================================================
    ARCHITECTURE DATA
====================================================== */

type Block = {
  title: string;
  description: string;
  services: string[];
  why: string;
  icon: React.ReactNode;
};

type Layer = {
  layer: string;
  blocks: Block[];
};

const HLD: Layer[] = [
  {
    layer: 'Client & Delivery',
    blocks: [
      {
        title: 'Web Delivery',
        icon: <Zap size={18} className="text-yellow-400" />,
        description: 'Global delivery of the VersionCV web application.',
        why: 'Static assets and UI are served from the edge to minimize latency and reduce backend load.',
        services: ['Cloudflare CDN / Proxy', 'Vercel Hosting', 'HTTPS Termination', 'Static Asset Delivery']
      }
    ]
  },
  {
    layer: 'Authentication & Security',
    blocks: [
      {
        title: 'Identity & Access',
        icon: <ShieldCheck size={18} className="text-blue-400" />,
        description: 'Authentication, authorization, and session control.',
        why: 'Identity is validated at the edge to prevent unauthorized requests from reaching business logic.',
        services: ['Firebase OAuth', 'JWT Validation', 'Session Management']
      },
      {
        title: 'Request Protection',
        icon: <ShieldCheck size={18} className="text-red-400" />,
        description: 'Abuse prevention and request sanitization.',
        why: 'Early rejection of malicious traffic keeps the system cheap, safe, and predictable.',
        services: ['Cloudflare WAF', 'DDoS Protection', 'Rate Limiting', 'CSP & XSS Protection']
      }
    ]
  },
  {
    layer: 'Core Backend',
    blocks: [
      {
        title: 'Business Logic (Proprietary)',
        icon: <Activity size={18} className="text-purple-400" />,
        description: 'VersionCV’s core resume optimization intelligence.',
        why: 'This layer encodes domain knowledge and deterministic rules that differentiate VersionCV.',
        services: ['Resume Ingestion & Normalization', 'ATS Scanner & Scoring Engine', 'JD Matching Engine', 'AI Optimization Orchestration', 'Plausible Skills Finder']
      },
      {
        title: 'Supporting Services',
        icon: <Layers size={18} className="text-slate-400" />,
        description: 'Shared platform capabilities.',
        why: 'Cross-cutting services are isolated so business logic remains focused and maintainable.',
        services: ['Notifications', 'Analytics', 'Custom Error Logging', 'Tracing & Debugging']
      }
    ]
  },
  {
    layer: 'Async Processing',
    blocks: [
      {
        title: 'Background Jobs & Queues',
        icon: <Zap size={18} className="text-orange-400" />,
        description: 'Non-blocking and long-running tasks.',
        why: 'Heavy work runs asynchronously to keep user interactions fast and operational costs low.',
        services: ['Producer / Consumer Queues', 'Job Aggregator', 'Retry & Backoff', 'Batch Workers']
      }
    ]
  },
  {
    layer: 'Data & State',
    blocks: [
      {
        title: 'Persistent Storage',
        icon: <Database size={18} className="text-green-400" />,
        description: 'Durable system state and metadata.',
        why: 'Storage is optimized for cost and access patterns rather than over-engineering.',
        services: ['Cloudflare D1 (SQLite)', 'KV Cache', 'R2 Object Storage', 'Logs & Metrics Storage']
      }
    ]
  }
];

/* ======================================================
    PAGE COMPONENT
====================================================== */

export default function VersionCVPage() {
  return (
    <main className="relative min-h-screen bg-[#05080c] text-slate-200 overflow-x-hidden font-sans">
      
      {/* ===== Ambient Background (Original Style) ===== */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid opacity-[0.15]" />
        <motion.div
          className="absolute top-1/3 left-1/4 w-[520px] h-[520px] bg-blue-600/10 rounded-full blur-[160px]"
          animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] bg-purple-600/10 rounded-full blur-[160px]"
          animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative z-10 px-6 py-20 max-w-6xl mx-auto">
        
        {/* ===== HEADER ===== */}
        <header className="max-w-3xl mb-24">
          <motion.span 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-mono tracking-[0.3em] text-blue-400 font-bold"
          >
            VERSIONCV · SYSTEM DESIGN
          </motion.span>

          <h1 className="text-5xl md:text-6xl font-bold text-white mt-4 mb-6 tracking-tight">
            System <span className="text-blue-500">Architecture</span>
          </h1>

          <p className="text-slate-400 text-lg leading-relaxed border-l-2 border-blue-500/30 pl-6 mb-8">
            A distributed, serverless decomposition of the VersionCV ecosystem. 
            Detailed service roles and infrastructure components are mapped directly within each block.
          </p>

          {/* ===== ACTION BUTTONS ===== */}
          <div className="flex flex-wrap items-center gap-6 pl-6">
            <motion.a 
              href="/versioncv/pipelines" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-xl 
                         bg-blue-600 hover:bg-blue-500 text-white font-semibold 
                         transition shadow-lg shadow-blue-900/20"
            >
              View Interactive Pipelines
              <ArrowRight size={18} />
            </motion.a>
            <span className="text-slate-500 text-sm font-mono tracking-tighter">
              (HLD overview below)
            </span>
          </div>
        </header>

        {/* ===== LAYERS ===== */}
        <div className="space-y-32">
          {HLD.map((layer, idx) => (
            <section key={idx} className="relative">
              {/* Layer Title with Horizontal Rule (Original Style) */}
              <div className="flex items-center gap-6 mb-12">
                <h2 className="text-xs uppercase tracking-[0.3em] font-black text-blue-400 whitespace-nowrap">
                  {layer.layer}
                </h2>
                <div className="h-[1px] w-full bg-blue-400/20" />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {layer.blocks.map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col rounded-3xl bg-slate-900/50 backdrop-blur border border-slate-800 transition-all duration-300 hover:border-blue-500/50 group"
                  >
                    {/* Upper Content: The Intent & Context */}
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 rounded-lg bg-slate-800 border border-slate-700 group-hover:border-blue-500/30 transition-colors">
                          {block.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white tracking-tight uppercase italic">
                          {block.title}
                        </h3>
                      </div>

                      <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                        {block.description}
                      </p>

                      <div className="space-y-2">
                        <span className="text-[10px] uppercase tracking-widest text-blue-400 font-black">
                          Design Rationale
                        </span>
                        <p className="text-sm text-slate-400 italic leading-relaxed">
                          "{block.why}"
                        </p>
                      </div>
                    </div>

                    {/* Lower Content: Infrastructure Manifest */}
                    <div className="mt-auto bg-black/30 border-t border-white/5 p-8">
                      <div className="flex items-center gap-2 mb-5">
                        <div className="h-1 w-1 rounded-full bg-blue-500" />
                        <span className="text-[10px] uppercase tracking-[0.2em] text-blue-500 font-black">
                          Infrastructure Components
                        </span>
                      </div>

                      <ul className="grid grid-cols-1 gap-y-3">
                        {block.services.map((service, sIdx) => (
                          <li 
                            key={sIdx} 
                            className="text-xs font-mono text-slate-300 flex items-center gap-3"
                          >
                            <span className="text-blue-500/50">•</span>
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Footer Branding */}
      <footer className="py-20 text-center border-t border-white/5 mt-20">
        <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.5em]">
          &copy; 2026 VersionCV Infrastructure Design Assets
        </p>
      </footer>
    </main>
  );
}