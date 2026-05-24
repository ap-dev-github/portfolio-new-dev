'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ======================================================
   DATA MODEL
====================================================== */

type ArchitectureBlock = {
  title: string;
  description: string;
  services: string[];
};

type ArchitectureLayer = {
  layer: string;
  blocks: ArchitectureBlock[];
};

/* ======================================================
   HLD DEFINITION
====================================================== */

const HLD: ArchitectureLayer[] = [
  {
    layer: "Client & Delivery",
    blocks: [
      {
        title: "Web Delivery",
        description:
          "Delivers the VersionCV web application securely and with low latency.",
        services: [
          "Cloudflare CDN / Proxy",
          "Vercel Hosting",
          "HTTPS Termination",
          "Static Asset Delivery"
        ]
      }
    ]
  },
  {
    layer: "Authentication & Security",
    blocks: [
      {
        title: "Identity & Access Control",
        description:
          "Ensures only authenticated and authorized traffic reaches backend systems.",
        services: [
          "Firebase OAuth",
          "JWT Validation",
          "Session Management"
        ]
      },
      {
        title: "Request Protection",
        description:
          "Protects the platform from abuse, attacks, and malformed requests.",
        services: [
          "Cloudflare WAF",
          "DDoS Protection",
          "Rate Limiting",
          "CSP Headers",
          "XSS Protection"
        ]
      }
    ]
  },
  {
    layer: "Core Backend",
    blocks: [
      {
        title: "Business Logic (Proprietary)",
        description:
          "Implements VersionCV’s core domain workflows and decision logic.",
        services: [
          "Resume Ingestion & Normalization",
          "ATS Scanner & Scoring Engine",
          "AI Optimization Orchestration",
          "JD Matching Engine",
          "Subscription Enforcement"
        ]
      },
      {
        title: "Supporting / Platform Services",
        description:
          "Cross-cutting services shared across multiple workflows.",
        services: [
          "Notifications",
          "Analytics",
          "Custom Error Logging",
          "Tracing & Debugging",
          "Feature Flags"
        ]
      }
    ]
  },
  {
    layer: "Async Processing",
    blocks: [
      {
        title: "Background Jobs & Queues",
        description:
          "Executes long-running and non-blocking tasks asynchronously.",
        services: [
          "Producer / Consumer Queues",
          "Job Aggregator",
          "Retry & Backoff",
          "Batch Workers"
        ]
      }
    ]
  },
  {
    layer: "Payments",
    blocks: [
      {
        title: "Billing & Subscriptions",
        description:
          "Handles payments, billing lifecycle, and webhook processing.",
        services: [
          "Razorpay Gateway",
          "Webhook Verification",
          "Subscription State Updates"
        ]
      }
    ]
  },
  {
    layer: "Data & State",
    blocks: [
      {
        title: "Persistent Storage",
        description:
          "Stores durable application state and system metadata.",
        services: [
          "Cloudflare D1 (SQLite)",
          "KV / Cache",
          "R2 Object Storage",
          "Logs & Metrics Storage"
        ]
      }
    ]
  }
];

/* ======================================================
   COMPONENT
====================================================== */

const VersionCVHLD: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<ArchitectureBlock | null>(null);

  return (
    <section className="relative min-h-screen bg-[#05080c] text-slate-200 px-6 py-20">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-12">
        
        {/* ================= LEFT / CENTER ================= */}
        <div className="lg:col-span-2 space-y-14">
          <header>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              VersionCV — System Architecture
            </h1>
            <p className="text-slate-400 max-w-2xl">
              This high-level design shows responsibility boundaries in a distributed,
              multi-cloud system. Pipelines and request flows are explored in deeper levels.
            </p>
          </header>

          {HLD.map((layer, idx) => (
            <div key={idx}>
              <h3 className="text-sm uppercase tracking-widest text-blue-400 mb-4">
                {layer.layer}
              </h3>

              <div className="grid sm:grid-cols-2 gap-4">
                {layer.blocks.map((block, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedBlock(block)}
                    className="text-left rounded-2xl bg-slate-900 border border-slate-800 p-6 hover:border-blue-500 transition"
                  >
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {block.title}
                    </h4>
                    <p className="text-sm text-slate-400">
                      {block.description}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {selectedBlock ? (
              <motion.div
                key={selectedBlock.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                className="sticky top-28 rounded-2xl bg-slate-900/80 backdrop-blur border border-slate-800 p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-2">
                  {selectedBlock.title}
                </h3>

                <p className="text-slate-400 mb-6">
                  {selectedBlock.description}
                </p>

                <div>
                  <div className="text-xs uppercase tracking-wider text-blue-400 mb-3">
                    Included Services
                  </div>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {selectedBlock.services.map((service, idx) => (
                      <li key={idx} className="flex gap-2">
                        <span className="text-blue-500">•</span>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ) : (
              <div className="sticky top-28 rounded-2xl border border-dashed border-slate-800 p-6 text-slate-500 text-sm">
                Select a system component to view its responsibility and services.
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default VersionCVHLD;
