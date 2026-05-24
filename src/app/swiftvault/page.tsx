'use client';

import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Zap, Database, Lock, 
  FileUp, Activity, Server, ChevronRight,
  Maximize2, X, Info, TrendingDown, ArrowRight, DollarSign, Cpu
} from 'lucide-react';

// Initialize Mermaid with precise technical styling
mermaid.initialize({
  startOnLoad: true,
  theme: 'dark',
  securityLevel: 'loose',
  fontFamily: 'JetBrains Mono, monospace',
  themeVariables: {
    primaryColor: '#10b981',
    lineColor: '#FFFFFF',
    primaryTextColor: '#f8fafc',
    mainBkg: '#0f172a',
    nodeBorder: '#1e293b',
    tertiaryColor: '#1e293b'
  }
});

/* ======================================================
   MERMAID COMPONENT (WITH FULLSCREEN CAPABILITY)
====================================================== */
const MermaidDiagram = ({ chart, isExpanded = false }: { chart: string, isExpanded?: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const renderChart = async () => {
      const uniqueId = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      try {
        const { svg } = await mermaid.render(uniqueId, chart);
        setSvgContent(svg);
      } catch (err) {
        console.error("Mermaid Render Error:", err);
      }
    };
    renderChart();
  }, [chart]);

  return (
    <div 
      className={`w-full flex justify-center bg-slate-950/80 rounded-3xl border border-white/5 overflow-auto custom-scrollbar transition-all ${
        isExpanded ? 'p-10' : 'p-6 min-h-[400px]'
      }`}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
};

/* ======================================================
   ARCHITECTURE DATA (UNTRUNCATED)
====================================================== */
const SWIFT_DOCS = [
  {
    id: 'system-map',
    title: 'Monolith System Mesh',
    icon: <Server size={20} className="text-emerald-400" />,
    desc: 'The complete hybrid architecture: Next.js routing, Go backend services, and multi-tier data persistence.',
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
        RestAPI[REST API Handlers<br/>Auth, Files, Admin]
        FileService[File Service Logic]
        AuthService[Auth Service Logic]
        AdminService[Admin Service Logic]
        HashingService[SHA-256 Hashing]
        MimeService[MIME Validation]
    end
    
    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL<br/>User & File Metadata)]
        Redis[(Redis<br/>Cache & Rate Limiting)]
        MinIO[(MinIO<br/>Object Storage)]
    end
    
    subgraph "External Services"
        Resend[Resend<br/>Email Service]
    end
    
    UI --> Router
    Browser --> Router
    Router -- public --> GoServer
    Router -- protected --> Auth
    Auth -- authenticated --> GoServer
    GoServer --> GraphQL
    GoServer --> RestAPI
    RestAPI -- login, register, etc. --> AuthService
    RestAPI -- file uploads, etc. --> FileService
    GraphQL -- queries, mutations --> FileService
    GraphQL -- analytics --> AdminService
    FileService --> HashingService
    FileService --> MimeService
    FileService --> PostgreSQL
    FileService --> MinIO
    AuthService --> PostgreSQL
    AuthService --> Redis
    AuthService --> Resend
    AdminService --> PostgreSQL
    GoServer -.->|Rate Limiting| Redis
    GraphQL -.->|Caching| Redis
    HashingService --> PostgreSQL
    MimeService --> FileService`
  },
  {
    id: 'upload-flow',
    title: 'Binary Upload Logic',
    icon: <FileUp size={20} className="text-orange-400" />,
    desc: 'Intelligent file ingestion: First-512B MIME validation and SHA-256 content-addressable storage.',
    chart: `sequenceDiagram
    participant U as User
    participant B as Backend
    participant DB as PostgreSQL
    participant S as MinIO
    participant Cache as Redis
    
    U->>B: POST /api/files/upload
    B->>Cache: Check Rate Limits
    B->>B: Read 512B MIME Check
    B->>B: Generate SHA-256 Hash
    B->>DB: Check Hash Conflict
    alt Duplicate Found
        DB->>B: Return Existing Reference
        B->>U: 200 OK (Deduplicated)
    else New Binary
        B->>S: Stream to Object Store
        B->>DB: Atomic Metadata Write
        B->>U: 201 Created
    end`
  },
  {
    id: 'severless-system',
     title: 'Optimized Serverless Mesh',
    icon: <Zap size={20} className="text-blue-400" />,
    desc: 'Engineered a high-availability, multi-cloud serverless architecture integrating Cloudflare Edge with AWS compute, reducing steady-state infrastructure costs by ~47%.',
    chart:`
    flowchart TB

subgraph CLIENT["Client Layer"]
    BROWSER["Browser<br/>HTTP-only Cookies"]
    NEXTJS["Next.js Frontend<br/>TypeScript + Tailwind<br/>Vercel Free Tier<br/>Global CDN"]

    BROWSER --> NEXTJS
end

subgraph COST["Cost Comparison"]
    BEFORE["BEFORE<br/>$17/month = $204/year<br/>2 small Monolith"]
    AFTER["AFTER<br/>Year 1: $0 FREE<br/>Year 2+: ~$108/year<br/>47% Savings"]

    BEFORE --> AFTER
end

subgraph EDGE["Edge Layer - Cloudflare"]
    WORKERS["Cloudflare Workers<br/>API Endpoints<br/>100k req/day FREE"]
    RATE["Rate Limiting"]
    KV["Cloudflare KV<br/>Cache & Rate Limiting<br/>Sub-ms latency<br/>FREE Tier"]
    R2["Cloudflare R2<br/>Object Storage<br/>10GB FREE<br/>Zero Egress Fees"]

    WORKERS --> RATE
    RATE --> KV
    RATE --> R2
end

NEXTJS --> WORKERS

subgraph BACKEND["Backend Services"]
    GO["Go Server<br/>Hybrid API<br/>AWS t2.micro<br/>~$9/month"]

    GO --> REST
    GO --> GRAPHQL

    subgraph API["API Handlers"]
        REST["REST API Handlers<br/>Auth, Files, Admin"]
        GRAPHQL["GraphQL API<br/>Queries & Mutations"]
    end

    subgraph SERVICE["Service Layer"]
        AUTH["Auth Service Logic<br/>Login, Register"]
        ADMIN["Admin Service Logic<br/>Management"]
        FILE["File Service Logic<br/>Uploads & Downloads"]
    end

    REST --> AUTH
    REST --> ADMIN
    REST --> FILE

    GRAPHQL --> FILE

    FILE --> MIME["MIME Validation"]
    FILE --> HASH["SHA-256 Hashing"]
end

WORKERS --> GO
KV --> GO
R2 --> FILE

subgraph DATA["Data Layer"]
    NEON["Neon PostgreSQL<br/>User & File Metadata<br/>512MB FREE<br/>Serverless<br/>Auto-scales to zero"]
end

AUTH --> NEON
ADMIN --> NEON
FILE --> NEON

subgraph EXTERNAL["External Services"]
    RESEND["Resend Email Service<br/>FREE Tier"]
end

AUTH --> RESEND`
  }
];

export default function SwiftVaultArchitecturePage() {
  const [activeTab, setActiveTab] = useState(SWIFT_DOCS[0]);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <main className="min-h-screen bg-[#05080c] text-slate-200">
      
      {/* HEADER SECTION */}
      <section className="pt-32 pb-16 px-6 max-w-[1400px] mx-auto border-b border-white/5">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="h-[2px] w-12 bg-emerald-500" />
              <span className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-emerald-500">
                Architectural Blueprint
              </span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white italic tracking-tighter uppercase leading-none">
              Swift<span className="text-emerald-500">Vault</span>
            </h1>
            <p className="text-xl text-slate-400 font-bold italic tracking-tight uppercase">
              Hybrid <span className="text-white">API Infrastructure.</span>
            </p>
          </div>

          <div className="flex flex-col gap-3 text-right">
             <div className="flex items-center gap-2 justify-end text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                <ShieldCheck size={14} className="text-emerald-500" /> Security Verified
             </div>
             <div className="flex items-center gap-2 justify-end text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest">
                <Zap size={14} className="text-blue-500" /> Go-Native Performance
             </div>
          </div>
        </div>
      </section>

      {/* COST EVOLUTION SECTION */}
      <section className="py-20 px-6 max-w-[1400px] mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Before Column */}
          <div className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <Server size={120} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-red-500 mb-4 font-mono text-[10px] font-bold uppercase tracking-widest">
                <X size={14}/> Monolithic Legacy
              </div>
              <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">Monolith v1.0</h3>
              <p className="text-slate-400 text-sm italic font-medium mb-6">Single AWS t2.small instance hosting entire stack.</p>
              <div className="text-4xl font-black text-white font-mono italic">~$204<span className="text-sm text-slate-500 font-normal">/year</span></div>
            </div>
          </div>

      
         {/* After Column */}
<div className="p-8 rounded-[2.5rem] bg-emerald-500/5 border border-emerald-500/20 relative overflow-hidden group">
  <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
    <Zap size={120} className="text-emerald-500" />
  </div>

  <div className="relative z-10">
    <div className="flex items-center gap-2 text-emerald-400 mb-4 font-mono text-[10px] font-bold uppercase tracking-widest">
      <Zap size={14} /> Serverless Architecture
    </div>

    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">
      Serverless Mesh v2
    </h3>

    <p className="text-slate-300 text-sm italic font-medium mb-6">
      Decoupled multi-cloud serverless setup with edge compute and scale-to-zero services.
    </p>

    <div className="text-4xl font-black text-emerald-400 font-mono italic">
      $0
      <span className="text-sm text-emerald-500/60 font-normal"> / year 1</span>
    </div>

    <p className="mt-2 text-[10px] font-mono text-emerald-400 italic">
      Free-tier usage under normal traffic
    </p>
  </div>
</div>


          {/* Efficiency Column */}
          <div className="p-8 rounded-[2.5rem] bg-blue-600/10 border border-blue-500/20 flex flex-col justify-center items-center text-center">
            <TrendingDown className="text-blue-400 mb-4 animate-bounce" size={48} />
            <h3 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">47%</h3>
            <p className="text-blue-400 font-mono text-[10px] font-bold uppercase tracking-[0.2em] mt-2 mb-4">Total Cost Reduction</p>
            <p className="text-slate-400 text-xs italic font-medium">Decoupling compute from storage using Cloudflare Workers & Neon Serverless.</p>
          </div>

        </div>
      </section>

      {/* DOCUMENTATION GRID */}
      <section className="py-10 px-6 max-w-[1400px] mx-auto grid lg:grid-cols-12 gap-12">
        
        {/* NAV & INFO (4 COL) */}
        <div className="lg:col-span-4 space-y-10">
          <div className="space-y-4">
            <h4 className="text-[10px] font-mono font-black text-slate-600 uppercase tracking-widest">Select Sub-system</h4>
            <nav className="flex flex-col gap-3">
              {SWIFT_DOCS.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => setActiveTab(doc)}
                  className={`cursor-pointer flex items-center justify-between p-6 rounded-3xl border transition-all ${
                    activeTab.id === doc.id 
                    ? 'bg-emerald-500/10 border-emerald-500/30 ring-1 ring-emerald-500/20' 
                    : 'bg-slate-900/40 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    {doc.icon}
                    <span className={`text-xs font-black uppercase tracking-widest ${activeTab.id === doc.id ? 'text-white' : 'text-slate-500'}`}>
                      {doc.title}
                    </span>
                  </div>
                  <ChevronRight size={16} className={activeTab.id === doc.id ? 'text-emerald-500' : 'text-slate-800'} />
                </button>
              ))}
            </nav>
          </div>

         
        </div>

        {/* DIAGRAM RENDERER (8 COL) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-4">
            <h3 className="text-lg font-black text-white italic uppercase tracking-tighter">
              Technical Visualization
            </h3>
            <button 
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-white/10 rounded-full text-[10px] font-mono font-bold text-slate-400 hover:text-white transition-colors"
            >
              <Maximize2 size={12} /> Expand View
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.id}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="relative shadow-2xl"
            >
              <MermaidDiagram chart={activeTab.chart} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* FULLSCREEN MODAL */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950 flex flex-col p-10"
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
            
            <div className=" flex-1 overflow-auto rounded-3xl border border-white/10 bg-black/40 sm:pt-150 custom-scrollbar flex items-center justify-center">
               <MermaidDiagram chart={activeTab.chart} isExpanded={true} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}


