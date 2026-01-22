'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Terminal, Zap, Cpu, Database, Activity, Server, Layers, X } from 'lucide-react';

/* ======================================================
    ARCHITECTURAL AUDIT / FAQ DATA
====================================================== */
const ARCHITECT_FAQS = [
  {
    q: "Why decompose logic into independent services instead of a single Monolith?",
    a: "To control the 'Blast Radius.' By isolating related logic into independent services, a failure in the ATS Parser won't bring down the Auth or Payment gateways. This 'Selective Maintenance' allows me to update the Scoring Engine without any downtime for the rest of the system, keeping everything organized and easy to manage.",
    icon: <Cpu size={14} className="text-blue-400" />
  },
  {
    q: "Why Cloudflare Workers over AWS Lambda or GCP Cloud Run for core logic?",
    a: "In my initial AWS/GCP prototypes, cold starts were killing the UX. Cloudflare uses V8 Isolates, providing <5ms cold starts. Additionally, the restricted NPM support forced me to write 'Pure TS' with minimal dependencies, resulting in a lean, hardened codebase that isn't bloated by external package vulnerabilities.",
    icon: <Zap size={14} className="text-yellow-400" />
  },
  {
    q: "What was the motivation for a Multi-Cloud strategy?",
    a: "Operating System constraints. While Cloudflare handles the 'Speed-Layer,' heavy tasks like PDF rendering with Puppeteer require a full OS environment and state persistence. I offloaded these to GCP Cloud Run, creating a hybrid mesh that leverages Edge speed for logic and Containerized power for heavy lifting without compromising quality or security.",
    icon: <Activity size={14} className="text-purple-400" />
  },
  {
    q: "Why implement a Producer-Consumer pattern with SSE for long-running tasks?",
    a: "UX Decoupling. Resume optimization can take ~30s. If run synchronously, the CPU spikes and the connection times out. I send the request to a queue and open an SSE connection to track progress. This allows for async batch processing, keeping the frontend snappy and the backend efficient under high request volume.",
    icon: <Terminal size={14} className="text-orange-400" />
  },
  {
    q: "Why choose a Relational DB combined with KV Caching?",
    a: "Relational integrity with Edge performance. We need JOINs for complex user data, but DB latencies can be 10x slower than the Edge. I use Cloudflare KV as a cache with ~9ms latency to store hot metadata, ensuring the UI feels 'instant' while maintaining an organized, normalized data structure in D1/PostgreSQL.",
    icon: <Database size={14} className="text-green-400" />
  },
{
  q: "What is the 'Hard Exit' strategy if Cloudflare ceases to be viable?",
  a: "The architecture is strictly built against the 'workerd' open-source runtime—the same V8 Isolate engine that powers Cloudflare under the hood. This ensures 100% environment parity. If we need to migrate, we can deploy the same code into a workerd-based container mesh on any VPS (AWS/GCP/DigitalOcean). The data layer follows: Metadata migrates from D1 to Neon PostgreSQL (or self-hosted MinIO for storage). Zero code rewrites, just a runtime shift.",
  icon: <Server size={14} className="text-red-500" />
},
{
  q: "How do you handle debugging when something breaks in this distributed setup?",
  a: "I built a custom error-catching mechanism into every service. Each time an error occurs, it calls a central 'Error Logger' function that writes directly to a single database table. This table stores the error message, the specific route, the service name, and the exact function where it failed. Instead of wasting hours or days hunting through different cloud logs, I just check this one central DB table. It tells me exactly where to go to fix the problem in minutes.",
  icon: <Activity size={14} className="text-red-400" />
},
{
  q: "Is Serverless always better than a traditional Monolith or Pod-based setup?",
  a: "Not at all. Heavy, CPU-intensive workloads that require constant uptime are often cheaper and more stable on dedicated instances. My approach is to analyze a Monolith top-to-bottom: I evaluate each component's cost, risk, and resource utilization. If a service has spiky load or remains idle >50% of the time, I decouple it to Serverless to save costs. If it’s a mission-critical, high-utilization service, I keep it on dedicated infrastructure. It’s about matching the deployment model to the actual workload requirements.",
  icon: <Layers size={14} className="text-slate-400" />
}
];


export default function EngineeringAuditModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#05080c]/90 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-4xl max-h-[85vh] bg-[#0a0f18] border border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20">
                  <Terminal size={20} className="text-blue-400" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Engineering Decision Audit</h2>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">versionCV</p>
                </div>
              </div>
              <button onClick={onClose} className="cursor-pointer p-3 hover:bg-white/5 rounded-full transition-colors text-slate-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            {/* Content (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-12">
              {ARCHITECT_FAQS.map((faq, index) => (
                <div key={index} className="group relative pl-8 border-l border-slate-800 hover:border-blue-500/30 transition-colors">
                  <div className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-slate-800 group-hover:bg-blue-500 transition-colors" />
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight flex items-center gap-3">
                    <span className="text-blue-500 font-mono text-sm">Q:</span> {faq.q}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed italic font-medium">
                    <span className="text-slate-600 font-mono text-sm mr-2">A:</span> {faq.a}
                  </p>
                </div>
              ))}
            </div>

          
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}