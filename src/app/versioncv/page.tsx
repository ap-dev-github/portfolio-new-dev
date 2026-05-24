'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Layers } from 'lucide-react';

/* ======================================================
   ARCHITECTURE DATA
====================================================== */

type Block = {
  title: string;
  description: string;
  services: string[];
  why: string;
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
        description:
          'Global delivery of the VersionCV web application.',
        why:
          'Static assets and UI are served from the edge to minimize latency and reduce backend load.',
        services: [
          'Cloudflare CDN & Proxy',
          'Vercel Hosting',
          'HTTPS Termination',
          'Edge Caching'
        ]
      }
    ]
  },
  {
    layer: 'Authentication & Security',
    blocks: [
      {
        title: 'Identity & Access',
        description:
          'Authentication, authorization, and session control.',
        why:
          'Identity is validated at the edge to prevent unauthorized requests from reaching business logic.',
        services: [
          'Firebase OAuth',
          'JWT Validation',
          'Session Tokens'
        ]
      },
      {
        title: 'Request Protection',
        description:
          'Abuse prevention and request sanitization.',
        why:
          'Early rejection of malicious traffic keeps the system cheap, safe, and predictable.',
        services: [
          'Cloudflare WAF',
          'DDoS Protection',
          'Rate Limiting',
          'CSP & XSS Protection'
        ]
      }
    ]
  },
  {
    layer: 'Core Backend',
    blocks: [
      {
        title: 'Business Logic (Proprietary)',
        description:
          'VersionCV’s core resume optimization intelligence.',
        why:
          'This layer encodes domain knowledge and deterministic rules that differentiate VersionCV from black-box tools.',
        services: [
          'Resume Ingestion & Normalization',
          'ATS Scanner & Scoring Engine',
          'JD Matching Engine',
          'AI Optimization Orchestration',
          'Subscription Enforcement'
        ]
      },
      {
        title: 'Supporting Services',
        description:
          'Shared platform capabilities.',
        why:
          'Cross-cutting services are isolated so business logic remains focused and maintainable.',
        services: [
          'Notifications',
          'Analytics',
          'Error Logging',
          'Tracing & Debugging'
        ]
      }
    ]
  },
  {
    layer: 'Async Processing',
    blocks: [
      {
        title: 'Background Jobs & Queues',
        description:
          'Non-blocking and long-running tasks.',
        why:
          'Heavy work runs asynchronously to keep user interactions fast and operational costs low.',
        services: [
          'Producer / Consumer Queues',
          'Job Aggregator',
          'Retry & Backoff',
          'Batch Workers'
        ]
      }
    ]
  },
  {
    layer: 'Data & State',
    blocks: [
      {
        title: 'Persistent Storage',
        description:
          'Durable system state and metadata.',
        why:
          'Storage is optimized for cost and access patterns rather than over-engineering.',
        services: [
          'Cloudflare D1 (SQLite)',
          'KV Cache',
          'R2 Object Storage',
          'Logs & Metrics Storage'
        ]
      }
    ]
  }
];

/* ======================================================
   PAGE
====================================================== */

export default function VersionCVPage() {
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);

  return (
    <main className="relative min-h-screen bg-[#05080c] text-slate-200 overflow-hidden">

      {/* ===== Ambient Background ===== */}
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

      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">

        {/* ===== LEFT / CENTER ===== */}
        <div className="lg:col-span-2 space-y-16">
          <header className="max-w-3xl">
            <span className="text-xs font-mono tracking-widest text-blue-400">
              VERSIONCV · SYSTEM DESIGN
            </span>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mt-4 mb-6">
              Serverless Architecture Overview
            </h1>

            <p className="text-slate-400 leading-relaxed">
              VersionCV is built as a distributed, serverless system designed to
              minimize operational cost while delivering fast, predictable resume
              optimization. This view shows responsibility boundaries — not individual
              request flows.
            </p>
          
  <div className="mt-6 flex gap-4">
  <a href="/versioncv/pipelines" className="inline-flex items-center gap-3 px-6 py-3 rounded-xl 
               bg-blue-600 hover:bg-blue-500 text-white font-semibold 
               transition shadow-lg">
    View Interactive Pipelines
  </a>
  <span className="text-slate-500 text-sm self-center">
    (HLD overview below)
  </span>
</div>

          </header>


          {HLD.map((layer, idx) => (
            <section key={idx} className="space-y-6">
              <h2 className="text-sm uppercase tracking-widest text-blue-400">
                {layer.layer}
              </h2>

              <div className="grid sm:grid-cols-2 gap-5">
                {layer.blocks.map((block, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveBlock(block)}
                    className="cursor-pointer text-left rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 p-6 hover:border-blue-500 transition shadow-xl"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <Layers className="text-blue-400 mt-1" size={18} />
                      <h3 className="text-lg font-semibold text-white">
                        {block.title}
                      </h3>
                    </div>

                    <p className="text-sm text-slate-400">
                      {block.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* ===== SIDE DETAIL PANEL ===== */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {activeBlock ? (
              <motion.aside
                key={activeBlock.title}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                className="sticky top-28 rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 p-6 shadow-2xl"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {activeBlock.title}
                </h3>

                <p className="text-slate-400 mb-4">
                  {activeBlock.description}
                </p>

                <div className="mb-6">
                  <div className="text-xs uppercase tracking-widest text-green-400 mb-2">
                    Why this exists
                  </div>
                  <p className="text-sm text-slate-300">
                    {activeBlock.why}
                  </p>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-blue-400 mb-3">
                    Included Services
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {activeBlock.services.map((s, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.aside>
            ) : (
              <div className="sticky top-28 rounded-2xl border border-dashed border-slate-800 p-6 text-slate-500 text-sm">
                Select a system component to explore its role and design tradeoffs.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

    
    </main>
  );
}
