'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';
import { RESUME_DATA } from '../data/resume';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-20">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-grid opacity-20 z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[420px] h-[420px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-10"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-70"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">
              Indie SaaS · System Online · {RESUME_DATA.contact.location}
            </span>
          </div>

          {/* Name & positioning */}
          <div>
            <h1 className="text-6xl md:text-8xl font-display font-bold tracking-tight text-white mb-4">
              {RESUME_DATA.name}
            </h1>

            <div className="text-2xl md:text-4xl font-light text-slate-400 font-display leading-snug">
              Indie SaaS developer building{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-normal">
                distributed, multi-cloud systems
              </span>{' '}
              optimized for low operational cost, security and real-world scale.
            </div>
            {/* Specialization strip */}
<motion.div
  initial={{ opacity: 0, y: 12 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
  className="flex flex-wrap gap-3 pt-2"
>
  {[
    'Edge Computing',
    'Serverless',
    'Cloudflare Workers',
    'KV · D1 · R2',
    'AWS',
    'Google Cloud Run',
    'Next.js',
    'TypeScript',
    'Tailwind CSS',
    'Controlled AI Pipelines'
  ].map((item) => (
    <span
      key={item}
      className="px-3 py-1.5 rounded-full text-[11px] font-mono uppercase tracking-widest
                 bg-slate-900/60 border border-white/10 text-slate-300
                 hover:border-blue-500/40 hover:text-white transition-colors"
    >
      {item}
    </span>
  ))}
</motion.div>

          </div>

          {/* Summary */}
          <p className="max-w-2xl text-lg text-slate-400 leading-relaxed border-l-2 border-slate-800 pl-6">
       I build production-grade SaaS end-to-end, specializing in serverless orchestration and controlled AI pipelines that utilize structural validation and XML-based prompting for hallucination controlled outputs.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 pt-2">
            <a
              href="#saas"
              className="group flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Explore versionCV
              <ArrowRight
                className="group-hover:translate-x-1 transition-transform"
                size={18}
              />
            </a>

            <a
              href={`https://${RESUME_DATA.contact.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-slate-900/60 hover:bg-slate-800 text-white rounded-lg border border-slate-700 transition-all"
            >
              <Linkedin size={18} />
              <span>LinkedIn</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
