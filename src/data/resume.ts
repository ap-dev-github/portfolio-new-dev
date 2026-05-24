import { Project } from '../types';

export const RESUME_DATA = {
  name: "Ayush Pandey",
  title: "Indie SaaS Builder",
  contact: {
    email: "ayushpandey.cs@gmail.com",
    linkedin: "linkedin.com/in/linkedap",
    location: "Amaravati, India"
  },
  summary: "Computer Science student specializing in cloud-native serverless architectures. Experienced in building high-performance SaaS platforms with 47% cost reductions and <100ms latency globally.",
  skills: [
    "Next.js", "React", 
    "AWS", "Google Cloud", "Cloudflare Workers", 
   "Generative AI", 'Cloudflare','Typescript','TailwindCSS'
  ],
  projects: [
    {
      id: "versioncv",
      name: "versionCV.com",
      role: "Founder & Lead Developer",
      period: "May 2025 - Present",
      link: "https://versioncv.com",
      description: "A multi-cloud serverless SaaS platform for resume versioning and job matching.",
      metrics: [
        "4000 RPS sustained",
        "<100ms p99 latency",
        "Deterministic LLM pipeline"
      ],
      techStack: ["Next.js", "Cloudflare KV", "Go", "PostgreSQL", "Gemini API"],
      architecture: [
        {
          id: "edge",
          label: "Global Edge",
          type: "edge",
          tech: "Cloudflare Workers",
          details: "Handles request routing, strict CSP enforcement, and salted fingerprinting for rate limiting.",
          stats: "latency < 20ms"
        },
        {
          id: "security",
          label: "Security Layer",
          type: "security",
          tech: "WAF & Heuristics",
          details: "DDoS mitigation and IP heuristics to prevent abuse before touching core compute.",
          stats: "100% auto-block"
        },
        {
          id: "compute",
          label: "Core Engine",
          type: "compute",
          tech: "Go & GraphQL",
          details: "Job Description Matching engine using canonical skill regex normalization.",
          stats: "High Performance"
        },
        {
          id: "ai",
          label: "AI Pipeline",
          type: "ai",
          tech: "Gemini 1.5 Pro",
          details: "Deterministic feedback pipeline with XML-based context binding for resume audits.",
          stats: "XML Structured"
        },
        {
          id: "data",
          label: "Data & Cache",
          type: "data",
          tech: "Postgres + KV",
          details: "Edge-level caching reducing DB reads. Secure service-to-service comms.",
          stats: "High Availability"
        }
      ]
    },
    {
      id: "swiftvault",
      name: "Swiftvault",
      role: "Lead Architect",
      period: "Sep 2025",
      link: "#",
      description: "High-performance secure file storage system.",
      metrics: [
        "47% Cost Reduction",
        "SHA-256 Deduplication",
        "Zero-Knowledge Arch"
      ],
      techStack: ["Go", "MinIO", "Redis", "Docker", "Nginx"],
      architecture: []
    }
  ] as Project[]
};