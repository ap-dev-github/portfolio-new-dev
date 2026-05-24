// components/ArchitectureLevelOne.tsx
import { ArrowRight } from "lucide-react";

export default function ArchitectureLevelOne({ onNext }: { onNext: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-[#05080c] overflow-y-auto">
      <div className="min-h-screen px-8 py-20 max-w-6xl mx-auto">
        
        <h1 className="text-5xl font-display font-bold text-white mb-6">
          VersionCV — System Architecture
        </h1>

        <p className="text-slate-400 max-w-3xl mb-12">
          This high-level design shows responsibility boundaries in a distributed,
          multi-cloud system. Individual request flows and pipelines are explored
          in deeper levels.
        </p>

        {/* HLD IMAGE PLACEHOLDER */}
        <div className="h-[420px] rounded-2xl border border-slate-800 bg-slate-900 mb-12 flex items-center justify-center text-slate-500">
          High-Level Architecture Diagram
        </div>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-blue-600 text-white font-semibold"
        >
          Want to dive deeper? <ArrowRight />
        </button>
      </div>
    </div>
  );
}
