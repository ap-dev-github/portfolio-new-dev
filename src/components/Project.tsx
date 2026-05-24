import { useState } from "react";

type ProjectCardProps = {
  title: string;
  shortDesc: string;
  details: string;
  architectureUrl?: string;
  websiteUrl?: string;
};

export default function ProjectCard({
  title,
  shortDesc,
  details,
  architectureUrl,
  websiteUrl,
}: ProjectCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-zinc-800 rounded-xl bg-zinc-900">
      {/* HEADER */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center"
      >
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-zinc-400">{shortDesc}</p>
        </div>
        <span className="text-zinc-400">
          {open ? "−" : "+"}
        </span>
      </button>

      {/* SLIDE DOWN CONTENT */}
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out
        ${open ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-6 pt-2 space-y-4">
          <p className="text-sm text-zinc-300 leading-relaxed">
            {details}
          </p>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap gap-3 pt-2">
            {architectureUrl && (
              <a
                href={architectureUrl}
                target="_blank"
                className="px-4 py-2 rounded-md bg-zinc-800 text-sm text-white hover:bg-zinc-700 transition"
              >
                View Architecture
              </a>
            )}
            {websiteUrl && (
              <a
                href={websiteUrl}
                target="_blank"
                className="px-4 py-2 rounded-md bg-indigo-600 text-sm text-white hover:bg-indigo-500 transition"
              >
                Visit Website
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
