'use client';

import { motion } from "framer-motion";
import { Trophy, Award, ShieldCheck, Milestone } from "lucide-react";

export default function RecognitionSection() {
  const certifications = [
    { title: "Cloud Architecting", issuer: "AWS Academy", icon: <ShieldCheck size={18} /> },
    { title: "Full Stack Software Developer Professional Certification", issuer: "IBM", icon: <Award size={18} /> },
    { title: "Cloud Foundations", issuer: "AWS Academy", icon: <ShieldCheck size={18} /> },
    { title: "Java Programming", issuer: "Professional Cert", icon: <Award size={18} /> },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-t border-white/5">
      <div className="grid lg:grid-cols-12 gap-12">
        
        {/* LEFT: THE MAJOR WIN (IIT KANPUR) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-[1px] w-12 bg-purple-500" />
            <span className="text-xs font-mono font-black uppercase tracking-[0.4em] text-purple-500">
              Competitive Excellence
            </span>
          </div>

          <motion.div 
            whileHover={{ scale: 1.01 }}
            className="relative p-8 md:p-12 rounded-[3rem] bg-gradient-to-br from-purple-500/10 via-transparent to-transparent border border-purple-500/20 overflow-hidden shadow-2xl"
          >
            {/* Ambient Trophy Glow */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none" />
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
              <div className="p-6 rounded-3xl bg-purple-500/20 border border-purple-500/30 shadow-2xl">
                <Trophy className="text-purple-400" size={48} />
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-purple-500/20 text-purple-400 text-[10px] font-mono font-black uppercase tracking-tighter">
                    National Level Poduim
                  </span>
                  <span className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-widest">
                    IIT Kanpur GDSC • 2024
                  </span>
                </div>

                <h3 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                  1st Runner <span className="text-purple-500">Up</span>
                </h3>

                <p className="text-slate-400 text-lg leading-relaxed font-medium italic">
                  Outranked <span className="text-white font-bold">800+ teams</span> at 
                  "The Return Journey" National Hackathon. Recognised for 
                  <span className="text-purple-400"> architectural innovation</span> and 
                  high-pressure system delivery.
                </p>

                <div className="pt-4 flex items-center gap-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-slate-500 uppercase font-black">Success Rate</span>
                    <span className="text-white font-bold tracking-tighter text-xl italic">Top 0.2%</span>
                  </div>
                  <div className="h-8 w-[1px] bg-white/10" />
                
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* RIGHT: THE CERTIFICATION STACK */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-mono font-black uppercase tracking-[0.4em] text-blue-400">
              Technical Badges
            </span>
            <div className="h-[1px] flex-1 bg-gradient-to-r from-blue-400/30 to-transparent" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <motion.div 
                key={i}
                whileHover={{ x: 5 }}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="text-blue-500 mb-3 group-hover:scale-110 transition-transform">{cert.icon}</div>
                <h4 className="text-white font-bold text-xs uppercase tracking-tight leading-tight mb-1">
                  {cert.title}
                </h4>
                <p className="text-slate-500 text-[10px] font-mono uppercase font-black tracking-tighter">
                  {cert.issuer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}