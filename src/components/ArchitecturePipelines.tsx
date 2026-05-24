// components/ArchitecturePipelines.tsx
const PIPELINES = [
  {
    id: "system",
    title: "Full System Pipeline",
    desc: "End-to-end flow across all major services."
  },
  {
    id: "ats",
    title: "ATS Scan Pipeline",
    desc: "Deterministic resume parsing and ATS scoring."
  },
  {
    id: "jd",
    title: "JD Matching Engine",
    desc: "Semantic and rule-based job matching."
  },
  {
    id: "pdf",
    title: "PDF Generation",
    desc: "HTML → PDF conversion with isolation."
  }
];

export default function ArchitecturePipelines({ onSelect }: any) {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      <h2 className="text-4xl font-bold text-white mb-10">
        Major Pipelines
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {PIPELINES.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-left"
          >
            <h3 className="text-xl font-semibold text-white mb-2">
              {p.title}
            </h3>
            <p className="text-slate-400 text-sm">{p.desc}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
