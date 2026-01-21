'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Zap, Database, Lock, 
  FileUp, Activity, Server, ChevronRight 
} from 'lucide-react';

// Initialize Mermaid for Dark Mode
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'basis' },
  themeVariables: {
    fontFamily: 'monospace',
    primaryColor: '#10b981',
    lineColor: '#334155',
    primaryTextColor: '#f8fafc',
    mainBkg: '#0f172a',
    nodeBorder: '#1e293b'
  }
});

/* ======================================================
   MERMAID RENDERER COMPONENT
====================================================== */
const Mermaid = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Force a re-render for dynamic content
      const renderChart = async () => {
        const { svg } = await mermaid.render(`id-${Math.random().toString(36).substr(2, 9)}`, chart);
        if (ref.current) ref.current.innerHTML = svg;
      };
      renderChart();
    }
  }, [chart]);

  return (
    <div className="flex justify-center bg-slate-950/50 p-6 rounded-3xl border border-white/5 overflow-x-auto no-scrollbar">
      <div ref={ref} className="mermaid-container" />
    </div>
  );
};

/* ======================================================
   DATA DEFINITIONS
====================================================== */
const SECTIONS = [
  {
    id: 'system',
    title: 'System Architecture',
    icon: <Server className="text-emerald-400" size={20} />,
    description: 'High-level overview of the SwiftVault mesh, showcasing the hybrid API model.',
    chart: `graph TB
    subgraph "Client Layer"
        UI[Next.js Frontend<br/>TypeScript + Tailwind]
        Browser[Browser<br/>HTTP-only Cookies]
    end
    
    subgraph "API Gateway"
        Router[Next.js App Router<br/>route.ts]
        Auth[Auth Middleware<br/>JWT Validation]
    end
    
    subgraph "Backend Services"
        GoServer[Go Server<br/>Hybrid API]
        GraphQL[GraphQL API]
        RestAPI[REST API Handlers]
        FileService[File Service Logic]
        HashingService[SHA-256 Hashing]
    end
    
    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL)]
        Redis[(Redis)]
        MinIO[(MinIO)]
    end
    
    UI --> Router
    Router -- protected --> Auth
    Auth -- authenticated --> GoServer
    GoServer --> GraphQL
    GoServer --> RestAPI
    RestAPI --> FileService
    FileService --> HashingService
    FileService --> PostgreSQL
    FileService --> MinIO
    GoServer -.->|Rate Limiting| Redis`
  },
  {
    id: 'pipeline',
    title: 'Request Pipeline',
    icon: <Activity className="text-blue-400" size={20} />,
    description: 'Security and rate-limiting enforcement throughout the request lifecycle.',
    chart: `graph LR
    subgraph "Routing and Security"
        B[Next Router] -->|Public| P[IP-based Limiter]
        B -->|Protected| C[Cookie Extraction]
        C --> E[JWT Validation]
        E --> F[User-based Limiter]
    end
    subgraph "Backend Processing"
        P --> G{Backend}
        F --> G
        G --> H[GraphQL]
        G --> I[REST]
    end`
  },
  {
    id: 'auth',
    title: 'Auth Sequence',
    icon: <Lock className="text-purple-400" size={20} />,
    description: 'REST-exclusive registration and login flow ensuring asymmetric security.',
    chart: `sequenceDiagram
    participant U as User
    participant B as Backend
    participant DB as PostgreSQL
    participant C as Redis
    U->>B: POST /api/register
    B->>C: Store OTP
    B->>U: OTP Sent
    U->>B: Verify OTP
    B->>DB: Create Record
    B->>U: Return JWT + Cookies`
  },
  {
    id: 'upload',
    title: 'Upload Logic',
    icon: <FileUp className="text-orange-400" size={20} />,
    description: 'MIME validation and SHA-256 deduplication pipeline.',
    chart: `sequenceDiagram
    participant B as Backend
    participant DB as PostgreSQL
    participant S as MinIO
    B->>B: Read 512B MIME Check
    B->>B: Gen SHA-256 Hash
    B->>DB: Check Hash Exist
    alt Duplicate
        DB->>B: Found
        B->>B: Create Reference
    else New
        B->>S: Store Object
        B->>DB: Create Record
    end`
  }
];

/* ======================================================
   MAIN PAGE COMPONENT
====================================================== */
export default function SwiftVaultArchitecture() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0]);

  return (
    <main className="min-h-screen bg-[#05080c] text-slate-200 py-20 px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* LEFT: CONTENT & NAVIGATION */}
        <div className="lg:col-span-4 space-y-12">
          <header>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-8 bg-emerald-500" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-emerald-500">
                System Documentation
              </span>
            </div>
            <h1 className="text-5xl font-black text-white italic tracking-tighter uppercase mb-6 leading-none">
              SwiftVault <br/> <span className="text-emerald-500">Architecture</span>
            </h1>
            <p className="text-slate-400 text-sm leading-relaxed italic">
              A high-performance file vault built for speed and security. 
              Framing the engineering sprint as a technical benchmark for 
              hybrid API modeling.
            </p>
          </header>

          <nav className="space-y-4">
            {SECTIONS.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section)}
                className={`w-full flex items-center justify-between p-5 rounded-2xl border transition-all ${
                  activeSection.id === section.id 
                  ? 'bg-emerald-500/10 border-emerald-500/30' 
                  : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                }`}
              >
                <div className="flex items-center gap-4">
                  {section.icon}
                  <span className={`text-xs font-bold uppercase tracking-widest ${activeSection.id === section.id ? 'text-white' : 'text-slate-500'}`}>
                    {section.title}
                  </span>
                </div>
                <ChevronRight size={16} className={activeSection.id === section.id ? 'text-emerald-500' : 'text-slate-700'} />
              </button>
            ))}
          </nav>

          {/* QUICK STATS */}
          <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 space-y-6">
            <h4 className="text-[10px] font-mono font-black text-slate-500 uppercase tracking-widest">Performance Metrics</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold">Metadata</p>
                <p className="text-white font-mono text-sm font-bold tracking-tighter italic">&lt; 100ms</p>
              </div>
              <div>
                <p className="text-[9px] text-slate-500 uppercase font-bold">Deduplication</p>
                <p className="text-emerald-400 font-mono text-sm font-bold tracking-tighter italic">SHA-256</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: DIAGRAM RENDERER */}
        <div className="lg:col-span-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              <div className="p-8 rounded-[3rem] bg-slate-900/30 border border-white/10 backdrop-blur-xl">
                <div className="mb-8">
                  <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-2">
                    {activeSection.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium italic">
                    {activeSection.description}
                  </p>
                </div>

                <Mermaid chart={activeSection.chart} />

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2 text-emerald-500 mb-2">
                      <ShieldCheck size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Security</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">Multi-layer JWT validation & MIME detection.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2 text-blue-500 mb-2">
                      <Zap size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Velocity</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">Go concurrency for non-blocking file hashing.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                    <div className="flex items-center gap-2 text-purple-500 mb-2">
                      <Database size={14} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Storage</span>
                    </div>
                    <p className="text-[11px] text-slate-400 italic">MinIO S3-compatible object storage mesh.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
      
      {/* GLOBAL FOOTER SYNC */}
      <section className="mt-20 pt-10 border-t border-white/5 text-center">
        <p className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
          SwiftVault Infrastructure Documentation // 6-Day Engineering Sprint // ayushpandey.dev
        </p>
      </section>
    </main>
  );
}