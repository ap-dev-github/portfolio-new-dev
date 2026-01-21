'use client';

import { useRouter } from 'next/navigation';
import { Home } from 'lucide-react';

export default function HomeButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push('/')}
      className="cursor-pointer group flex items-center gap-2 px-4 py-2 bg-slate-900/40 border border-white/10 rounded-xl hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300"
    >
      <Home size={14} className="text-slate-400 group-hover:text-blue-400 transition-colors" />
      <span className="text-[10px] font-mono font-black uppercase tracking-widest text-slate-400 group-hover:text-white">
        Home
      </span>
    </button>
  );
}