'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BarChart3, ZoomIn } from 'lucide-react';

/* ======================================================
    DATA DEFINITIONS
====================================================== */
const NEXT_PUBLIC_ASSETS_CDN = `https://cdn.versioncv.com`
const TEST_PROOFS = [
  {
    heading: "Load test 5k request per sec",
    desc: "Checking the limits of the scanner endpoint.",
    img: `/images/tests/five-k-graph.png`,
    latency: "0.23s (Average)"
  },
  {
    heading: "Main proxy worker metrics",
    desc: "Visual proof of the performance of the proxy worker that handles all the routing and auth.",
    img: `/images/tests/proxy-metrics.png`,
    latency: "79ms (Average)"
  },
  {
    heading: "Datebase response times",
    desc: "Proof of the Heuristic Validator identifying and correcting unclosed HTML tags from LLM output.",
    img: `/images/tests/db-latency.png`,
    latency: "85ms"
  },
  {
    heading: "Load test at 2k request per sec",
    desc: "Check for the robustness of the scanner at the 2k concurrency.",
    img: `/images/tests/two-thousand.png`,
    latency: "0.08s (Average)"
  },
  {
    heading: "AI gateway Metrics",
    desc: "Metrics of the ai gateway that handles all the llm calls.",
    img: `/images/tests/gateway.png`,
    latency: "12s (Average)"
  },
];

export default function TestMetricsPage() {
  const [selectedTest, setSelectedTest] = useState<typeof TEST_PROOFS[0] | null>(TEST_PROOFS[0]);
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize to detect mobile accurately
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleItemClick = (proof: typeof TEST_PROOFS[0]) => {
    if (isMobile) {
      // Direct zoom on mobile
      setZoomImg(proof.img);
    } else {
      // Selection on Desktop
      setSelectedTest(proof);
    }
  };

  return (
    <div className="fixed inset-0 overflow-y-auto bg-[#020408] p-4 md:p-10">
      
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-6 md:mb-10 mt-2 md:mt-0">
        <div className="flex items-center gap-3 mb-2 md:mb-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <BarChart3 className="text-emerald-400" size={24} />
          </div>
          <div>
            <h2 className="text-xl md:text-3xl font-black text-white uppercase tracking-tight">
              Production Telemetry
            </h2>
            <p className="text-slate-500 font-mono text-[10px] md:text-xs uppercase tracking-widest">
                Latency & Integrity Proofs
            </p>
          </div>
        </div>
      </div>

      {/* ================= MASTER–DETAIL GRID ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto grid grid-cols-12 gap-6 md:h-[75vh]"
      >
        {/* ================= LEFT PANEL ================= */}
        <div className="col-span-12 md:col-span-4 space-y-3 md:space-y-4 md:overflow-y-auto pr-1 no-scrollbar">
          {TEST_PROOFS.map((proof, idx) => (
            <button
              key={idx}
              onClick={() => handleItemClick(proof)}
              className={`group cursor-pointer w-full text-left rounded-2xl border transition-all overflow-hidden
                ${ !isMobile && selectedTest?.heading === proof.heading
                    ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                    : 'border-white/5 bg-slate-900/40 hover:border-white/10'
                }
              `}
            >
              {/* Desktop Preview Image */}
              {!isMobile && (
                <div className="relative bg-black h-32 overflow-hidden">
                  <img
                    src={proof.img}
                    alt={proof.heading}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-2 right-2 text-[10px] bg-black/80 px-2 py-1 rounded-full text-emerald-400 font-mono border border-emerald-500/20">
                    {proof.latency}
                  </div>
                </div>
              )}

              <div className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <h4 className="text-white text-sm font-bold flex items-center gap-2">
                    {proof.heading}
                    {isMobile && <ZoomIn size={12} className="text-emerald-500/50" />}
                  </h4>
                  <p className="text-slate-400 text-xs line-clamp-1 md:line-clamp-2 mt-1">
                    {proof.desc}
                  </p>
                </div>
                {isMobile && (
                   <div className="ml-4 text-emerald-400 text-[10px] font-mono bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                    {proof.latency}
                   </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* ================= RIGHT PANEL (HIDDEN ON MOBILE) ================= */}
        {!isMobile && (
          <div className="hidden md:flex col-span-8 bg-slate-900/50 border border-white/10 rounded-3xl p-6 relative flex-col">
            {selectedTest ? (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-black text-white">{selectedTest.heading}</h2>
                    <p className="text-slate-400 text-sm mt-2 max-w-xl">{selectedTest.desc}</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-mono bg-black/60 px-3 py-1 rounded-full border border-emerald-500/20">
                    {selectedTest.latency}
                  </span>
                </div>
                <div
                  className="relative flex-1 mt-6 rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in bg-black group"
                  onClick={() => setZoomImg(selectedTest.img)}
                >
                  <img src={selectedTest.img} className="w-full h-full object-contain" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="px-6 py-2 bg-black/80 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
                      Click to Fullscreen
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-slate-500 font-mono">
                Select proof to inspect
              </div>
            )}
          </div>
        )}
      </motion.div>

      {/* ================= FULLSCREEN MODAL ================= */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-2xl p-2 md:p-12"
            onClick={() => setZoomImg(null)}
          >
            <button
              className="absolute top-6 right-6 p-4 bg-white/5 rounded-full text-white hover:bg-white/20 transition-all z-[110] border border-white/10"
              onClick={() => setZoomImg(null)}
            >
              <X size={24} />
            </button>

            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              src={zoomImg}
              className="max-w-full max-h-full rounded-lg object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)]"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}