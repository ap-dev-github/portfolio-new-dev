'use client';

import React, { useState, useMemo } from 'react';
import ReactFlow, { 
 Background, 
 Controls, 
 Edge, 
 Node, 
 Position, 
 Handle,
 ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Cpu, Database, Globe, Shield, Lock, Zap, Server, 
  Code, Activity, Search, FileEdit, MessageSquare, 
  ListChecks, 
  BarChart3, Home,
  Terminal
} from 'lucide-react';
import HomeButton from '@/components/HomeButton';
import EngineeringAuditModal from '@/components/ArchitectureFAQ';

/* ======================================================
   1. MASTER DATA DEFINITIONS (NON-TRUNCATED)
====================================================== */

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
    img:  `/images/tests/proxy-metrics.png`,
    latency: "79ms (Average)"
  },
    {
    heading: "Datebase response times",
    desc: "Proof of the Heuristic Validator identifying and correcting unclosed HTML tags from LLM output.",
    img:  `/images/tests/db-latency.png`,
    latency: "85ms"
  },
  {
    heading: "Load test at 2k request per sec",
    desc: "Check for the robustness of the scanner at the 2k concurrency.",
    img:`/images/tests/two-thousand.png`, 
    latency: "0.08s (Average)"
  },
 
{
    heading: "AI gateway Metrics",
    desc: "Metrics of the ai gateway that handles all the llm calls.",
    img: `/images/tests/gateway.png`,
    latency: "12s (Average)"
  },
];

const ATS_PIPELINE_NODES = {
  'frontend': { title: 'User Browser', tech: 'Next.js / pdf-to-FormData', desc: 'User drops .pdf file. Application packs it into FormData with OAuth headers.' },
  'csp-check': { title: 'CSP Header Validation', tech: 'Edge Security', desc: 'First line of defense. Verifies request source and ensures allowed headers.' },
  'cf-proxy': { title: 'Cloudflare Proxy', tech: 'CF Workers', desc: 'Handles CORS pre-flight and extracts the OAuth Token for decoding.' },
  'auth-verify': { title: 'Firebase Auth', tech: 'JKWS Verification', desc: 'Decodes JWT and verifies signature against Firebase Public Keys.' },
  'rate-limit': { title: 'Durable Object Limiter', tech: 'CF Durable Objects', desc: 'Stateful rate limiting per User-ID to prevent API abuse.' },
  'internal-rpc': { title: 'Internal RPC Router', tech: 'CF Service Bindings', desc: 'Routes request internally using CF Secrets. Avoids extra internet hops.' },
  'uploader-service': { title: 'Uploader Service', tech: 'CF Worker', desc: 'Verifies internal API secret and prepares Cloud Run call.' },
  'cloud-run': { title: 'GCP Cloud Run', tech: 'Docker / PDF-to-HTML', desc: 'Isolated container spins up to convert docx/pdf to high-fidelity HTML.' },
  'ats-engine': { title: 'ATS Engine', tech: 'Serverless Analysis', desc: 'Proprietary service receiving HTML for deep rule-based testing.' },
  'distort-analyzer': { title: 'Distortion HW', tech: 'Structural Logic', desc: 'Analyzes HTML structure and tags for parsing anomalies.' },
  'verb-analyzer': { title: 'Strong Verbs', tech: 'Contextual NLP', desc: 'Evaluates action verbs and impact context within the resume.' },
  'final-scoring': { title: 'Weightage Engine', tech: 'Deterministic Scoring', desc: 'Combines analysis results with rule-based heuristics.' },
  'cf-cache': { title: 'Edge Cache (KV)', tech: 'CF Cache / KV', desc: 'Final results cached at the edge. Key returned for instant loading.' },
  'editor-route': { title: 'Editor Mode', tech: 'Client Routing', desc: 'Frontend routes to /editor and fetches cached result via jobId.' },
};

const OPTIMIZER_PIPELINE_NODES = {
  'opt-init': { title: 'Optimizer Request', tech: 'Next.js / Auth Headers', desc: 'TemplateID + JobID + Token sent. Passes through CSP and Proxy verification.' },
  'producer-svc': { title: 'Producer Service', tech: 'CF Workers / RPC', desc: 'Attaches API secret, generates unique JobID for tracking, and pushes to Queue.' },
  'sse-manager': { title: 'SSE Event Stream', tech: 'Server-Sent Events', desc: 'Maintains real-time heartbeat. Streams progress updates (0-100%) to the UI.' },
  'queue-router': { title: 'Message Queue', tech: 'CF Queues / PubSub', desc: 'Decouples heavy processing. Forwards Template and Cache keys to Consumer.' },
  'consumer-svc': { title: 'Pipeline Consumer', tech: 'Async Worker', desc: 'Wakes up on message, fetches file/template from cache to prepare LLM payload.' },
  'llm-algo': { title: 'Algorithmic LLM Engine', tech: 'XML-Tagging / Audit Trail', desc: 'Proprietary prompting with strict XML tags to ensure zero-hallucination HTML.' },
  'validator-node': { title: 'Output Validator', tech: 'Heuristic DOM Injector', desc: 'Self-healing logic. Identifies missing tags and corrects structural errors.' },
  'verb-optimizer': { title: 'Verb Refinement', tech: 'Contextual NLP', desc: 'Detects repetitive weak verbs and replaces them with high-impact action verbs.' },
  'final-kv': { title: 'Completion Cache', tech: 'CF KV Store', desc: 'Caches final code. SSE fires completion event to trigger frontend DOM hydration.' },
  'editor-sync': { title: 'Editor Sync', tech: 'WYSIWYG Engine', desc: 'Frontend pulls optimized code, closes SSE, and hydrates the editor.' }
};

const PDF_MAKER_NODES = {
  'pdf-init': { title: 'Save Request', tech: 'Editor DOM + JWT', desc: 'User clicks Save. Frontend extracts final HTML from visual editor and attaches JWT token.' },
  'pdf-csp': { title: 'CSP Header Check', tech: 'Edge Security', desc: 'Validates request origin and ensures proper headers are present.' },
  'pdf-proxy': { title: 'Backend Proxy', tech: 'CF Worker', desc: 'Receives request and extracts JWT token for Firebase verification.' },
  'pdf-auth': { title: 'Firebase Auth', tech: 'JWKS Verification', desc: 'Verifies JWT signature using Firebase Public Keys and extracts UID.' },
  'pdf-rate': { title: 'Rate Limiter', tech: 'Durable Objects', desc: 'Enforces per-user rate limits using extracted UID to prevent abuse.' },
  'pdf-handler': { title: 'Main Handler', tech: 'Request Router', desc: 'Routes service to Producer after attaching API secret via internal RPC.' },
  'pdf-producer': { title: 'Producer Service', tech: 'Job Orchestration', desc: 'Verifies API key, creates new JobID, uploads HTML to R2 temp bucket.' },
  'pdf-queue': { title: 'Message Queue', tech: 'CF Queues', desc: 'Binds JobID with R2 object storage key and enqueues for async processing.' },
  'pdf-sse': { title: 'SSE Service', tech: 'Real-time Stream', desc: 'Frontend connects with JobID token to receive live progress updates.' },
  'pdf-consumer': { title: 'Consumer Worker', tech: 'Queue Processor', desc: 'Picks request, identifies route, forwards to Uploader with API key.' },
  'pdf-uploader': { title: 'Uploader Service', tech: 'R2 Orchestrator', desc: 'Verifies request, creates HTTP call with R2 key, sends to Cloud Run.' },
  'pdf-cloudrun': { title: 'GCP Cloud Run', tech: 'Docker Container', desc: 'Spins up instance, fetches HTML from R2 bucket, converts to PDF, stores back.' },
  'pdf-transfer': { title: 'File Transfer', tech: 'R2 Migration', desc: 'Moves PDF from temp to protected bucket, deletes temp file.' },
  'pdf-db': { title: 'Database Update', tech: 'Metadata Entry', desc: 'Adds new metadata entry and invalidates related caches.' },
  'pdf-complete': { title: 'Completion', tech: 'SSE Stream', desc: 'Sends 100% progress to frontend. File saved to dashboard.' }
};

const JD_SCANNER_NODES = {
  'jd-init': { title: 'Scan Request', tech: 'Resume + Role IDs', desc: 'User initiates JD scan with Resume ID and Role ID attached with JWT.' },
  'jd-csp': { title: 'CSP Validation', tech: 'Security Layer', desc: 'Verifies request headers and origin before proceeding.' },
  'jd-proxy': { title: 'Auth Proxy', tech: 'Token Verification', desc: 'Validates JWT token and extracts user identity.' },
  'jd-rate': { title: 'Rate Limiter', tech: 'User-based Limit', desc: 'Applies rate limiting per user to prevent API abuse.' },
  'jd-handler': { title: 'Request Handler', tech: 'Route Controller', desc: 'Calls Producer with Resume ID, Role ID, and new JobID.' },
  'jd-producer': { title: 'Producer Service', tech: 'Queue Publisher', desc: 'Generates JobID, enqueues request, returns JobID to frontend.' },
  'jd-sse': { title: 'SSE Connection', tech: 'Progress Stream', desc: 'Frontend opens SSE connection to receive real-time updates.' },
  'jd-consumer': { title: 'Queue Consumer', tech: 'Message Processor', desc: 'Receives request, identifies route, forwards to Scanner service.' },
  'jd-scanner': { title: 'Scanner Service', tech: 'File Validator', desc: 'Fetches file from R2 bucket, validates ownership, prepares for matching.' },
  'jd-matching': { title: 'JD Matching Engine', tech: 'ML Analysis', desc: 'Analyzes resume against job description, generates compatibility report.' },
  'jd-cache': { title: 'KV Cache', tech: 'Report Storage', desc: 'Stores scan report in KV for instant retrieval.' },
  'jd-skills': { title: 'Skills Finder', tech: 'Contextual Analysis', desc: 'Identifies plausible missing skills based on role requirements.' },
  'jd-complete': { title: 'Scan Complete', tech: 'Frontend Fetch', desc: 'Frontend receives success, fetches report from KV cache.' }
};

const JD_OPTIMIZER_NODES = {
  'opt-req': { title: 'Optimize Request', tech: 'Controlled Context', desc: 'User initiates optimization with specific sections to edit.' },
  'opt-dismantle': { title: 'Code Tokenizer', tech: 'Section Isolation', desc: 'Dismantles file, tokenizes content, isolates editable portions.' },
  'opt-context': { title: 'Context Builder', tech: 'Controlled Scope', desc: 'Builds strict context limiting what LLM can modify.' },
  'opt-llm': { title: 'Algorithmic LLM', tech: 'XML-Guided Edit', desc: 'Uses cached JD report, instructions, XML tags for controlled optimization.' },
  'opt-inject': { title: 'Code Injector', tech: 'Token Merger', desc: 'Injects optimized sections back into cached tokenized code.' },
  'opt-validator': { title: 'Validator Function', tech: 'Quality Check', desc: 'Validates optimized output for structural integrity.' },
  'opt-structure': { title: 'Structure Test', tech: 'DOM Verification', desc: 'Runs final structure test to ensure document validity.' },
  'opt-kv': { title: 'Cache Storage', tech: 'KV Store', desc: 'Caches optimized file for instant retrieval.' },
  'opt-sse': { title: 'Progress Complete', tech: 'SSE Stream', desc: 'Sends 100% completion signal to frontend.' },
  'opt-dom': { title: 'Editor Load', tech: 'DOM Hydration', desc: 'Loads optimized resume into editor for final user review.' }
};

const PAYMENT_WEBHOOK_NODES = {
  'pay-init': { title: 'Plan Selection', tech: 'User Action', desc: 'User selects subscription plan and clicks Subscribe.' },
  'pay-csp': { title: 'CSP Check', tech: 'Security Layer', desc: 'Validates request headers before proceeding.' },
  'pay-proxy': { title: 'Auth Proxy', tech: 'Token + Rate Limit', desc: 'Verifies JWT and applies rate limiting.' },
  'pay-handler': { title: 'Payment Handler', tech: 'Service Router', desc: 'Routes to payment service using internal RPC attaching the API secret.' },
  'pay-check': { title: 'Subscription Check', tech: 'DB Validation', desc: 'Checks if user has active subscription. Denies if exists.' },
  'pay-plan': { title: 'Plan Fetcher', tech: 'DB Query', desc: 'Fetches subscription plan details using Plan ID.' },
  'pay-razorpay': { title: 'Razorpay Gateway', tech: 'Subscription API', desc: 'Creates subscription in Razorpay. Returns Subscription ID.' },
  'pay-db': { title: 'DB Entry', tech: 'Transaction Record', desc: 'Inserts subscription record. Rolls back Razorpay on failure.' },
  'pay-frontend': { title: 'Frontend Gateway', tech: 'Razorpay Script', desc: 'Receives Subscription ID, opens payment popup.' },
  'pay-success': { title: 'Payment Success', tech: 'Signature Handler', desc: 'Razorpay calls success endpoint with Payment ID and signature.' },
  'pay-hmac': { title: 'HMAC Verification', tech: 'Signature Check', desc: 'Verifies request authenticity using Razorpay secret key.' },
  'pay-pending': { title: 'Pending State', tech: 'DB Update', desc: 'Inserts user data with pending status. Generates JobID.' },
  'pay-sse': { title: 'SSE Connection', tech: 'Verification Stream', desc: 'Frontend opens SSE to wait for webhook confirmation.' },
  'web-proxy': { title: 'Webhook Endpoint', tech: 'Razorpay Events', desc: 'Dedicated endpoint receives webhook. HMAC verified.' },
  'web-producer': { title: 'Webhook Producer', tech: 'Queue Push', desc: 'Pushes webhook to queue, returns 200 to prevent retries.' },
  'web-consumer': { title: 'Webhook Consumer', tech: 'Event Processor', desc: 'Processes webhook, calls payment service internally.' },
  'web-payment': { title: 'Payment Event', tech: 'Event Switch', desc: 'Captures payment.captured event, logs payment ID.' },
  'web-invoice': { title: 'Invoice Event', tech: 'Activation Trigger', desc: 'Captures invoice.paid, marks subscription active, updates expiry.' },
  'web-limits': { title: 'Limit Allocation', tech: 'User Entitlements', desc: 'Allocates usage limits to user account.' },
  'web-notify': { title: 'Notifications', tech: 'Email + In-app', desc: 'Fires email via Zeptomail and creates in-app notification.' },
  'web-refresh': { title: 'Inventory Refresh', tech: 'Frontend Update', desc: 'Frontend receives success, refreshes inventory and messages.' },
  'web-backup': { title: 'Polling Backup', tech: 'Fallback Service', desc: 'Backup polling service checks DB if webhook arrived in case if SSE fails.' }
};

const ALL_PIPELINE_DATA: Record<string, any> = {
  ...ATS_PIPELINE_NODES,
  ...OPTIMIZER_PIPELINE_NODES,
  ...PDF_MAKER_NODES,
  ...JD_SCANNER_NODES,
  ...JD_OPTIMIZER_NODES,
  ...PAYMENT_WEBHOOK_NODES
};

const nodeTypes = {
  service: ({ data }: any) => (
    <div className={`px-4 py-3 md:px-6 md:py-4 rounded-2xl bg-slate-900 border ${data.selected ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.4)]' : 'border-slate-800'} min-w-[180px] md:min-w-[200px] transition-all hover:border-slate-600`}>
      <Handle type="target" position={Position.Left} className="w-2 h-2 bg-blue-500 border-none" />
      <div className="flex items-center gap-3 md:gap-4">
        <div className={`p-2 md:p-3 rounded-xl bg-opacity-20 ${data.color || 'text-blue-400'} bg-current shadow-inner`}>{data.icon}</div>
        <div>
          <div className="text-[8px] md:text-[10px] text-slate-500 font-mono uppercase tracking-widest mb-0.5 md:mb-1">{data.category || 'Pipeline SVC'}</div>
          <div className="text-white text-xs md:text-sm font-bold leading-tight">{data.label}</div>
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="w-2 h-2 bg-blue-500 border-none" />
    </div>
  ),
};

/* ======================================================
   2. FLOW COMPONENT (INTEGRATED)
====================================================== */

function ATSFlowMesh({ onSelectNode, activeTab }: { onSelectNode: (id: string) => void; activeTab: string }) {
  
  const meshData = useMemo(() => {
    const X_GAP = 350;
    const Y_LEVEL = 150;

  switch(activeTab) {
      case 'ats-scan':
        return {
            nodes: [
                { id: 'frontend', type: 'service', data: { label: 'Browser Client', icon: <Globe size={18}/>, color: 'text-yellow-500', category: 'Entrance' }, position: { x: 0, y: Y_LEVEL } },
                { id: 'csp-check', type: 'service', data: { label: 'CSP Headers', icon: <Shield size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP, y: Y_LEVEL } },
                { id: 'cf-proxy', type: 'service', data: { label: 'Edge Worker', icon: <Zap size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 2, y: Y_LEVEL } },
                { id: 'auth-verify', type: 'service', data: { label: 'JWT Signature', icon: <Lock size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 2, y: 0 } },
                { id: 'rate-limit', type: 'service', data: { label: 'Stateful Limiter', icon: <Activity size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: 0 } },
                { id: 'internal-rpc', type: 'service', data: { label: 'Service Binding', icon: <Zap size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: Y_LEVEL } },
                { id: 'uploader-service', type: 'service', data: { label: 'Internal Uploader', icon: <Server size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 4, y: Y_LEVEL } },
                { id: 'cloud-run', type: 'service', data: { label: 'Isolated GCP', icon: <Cpu size={18}/>, color: 'text-blue-500' }, position: { x: X_GAP * 5, y: Y_LEVEL } },
                { id: 'ats-engine', type: 'service', data: { label: 'Deep Analysis', icon: <Search size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 6, y: Y_LEVEL } },
                { id: 'distort-analyzer', type: 'service', data: { label: 'Distortion Audit', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 7, y: 50 } },
                { id: 'verb-analyzer', type: 'service', data: { label: 'NLP Verbs', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 7, y: 250 } },
                { id: 'final-scoring', type: 'service', data: { label: 'Deterministic Score', icon: <Database size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 8, y: Y_LEVEL } },
                { id: 'cf-cache', type: 'service', data: { label: 'Edge KV Storage', icon: <Zap size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 9, y: Y_LEVEL } },
                { id: 'editor-route', type: 'service', data: { label: 'Hydrate UI', icon: <Activity size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 10, y: Y_LEVEL } },
            ],
            edges: [
                { id: 'e1', source: 'frontend', target: 'csp-check', animated: true },
                { id: 'e2', source: 'csp-check', target: 'cf-proxy' },
                { id: 'e3', source: 'cf-proxy', target: 'auth-verify' },
                { id: 'e4', source: 'auth-verify', target: 'rate-limit' },
                { id: 'e5', source: 'rate-limit', target: 'internal-rpc' },
                { id: 'e7', source: 'internal-rpc', target: 'uploader-service' },
                { id: 'e8', source: 'uploader-service', target: 'cloud-run', animated: true },
                { id: 'e9', source: 'cloud-run', target: 'ats-engine' },
                { id: 'e10', source: 'ats-engine', target: 'distort-analyzer' },
                { id: 'e11', source: 'ats-engine', target: 'verb-analyzer' },
                { id: 'e12', source: 'distort-analyzer', target: 'final-scoring' },
                { id: 'e13', source: 'verb-analyzer', target: 'final-scoring' },
                { id: 'e14', source: 'final-scoring', target: 'cf-cache' },
                { id: 'e15', source: 'cf-cache', target: 'editor-route', animated: true },
            ]
        };
      case 'ats-optimizer':
        return {
            nodes: [
                { id: 'opt-init', type: 'service', data: { label: 'Optimizer Req', icon: <Zap size={18}/>, color: 'text-yellow-500', category: 'Trigger' }, position: { x: 0, y: Y_LEVEL } },
                { id: 'producer-svc', type: 'service', data: { label: 'Producer RPC', icon: <Server size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP, y: Y_LEVEL } },
                { id: 'sse-manager', type: 'service', data: { label: 'SSE Heartbeat', icon: <Activity size={18}/>, color: 'text-cyan-500' }, position: { x: X_GAP * 2, y: 0 } },
                { id: 'queue-router', type: 'service', data: { label: 'Job Queue', icon: <Database size={18}/>, color: 'text-pink-500' }, position: { x: X_GAP * 2, y: Y_LEVEL } },
                { id: 'consumer-svc', type: 'service', data: { label: 'Async Worker', icon: <Cpu size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: Y_LEVEL } },
                { id: 'llm-algo', type: 'service', data: { label: 'XML LLM Engine', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 4, y: Y_LEVEL } },
                { id: 'validator-node', type: 'service', data: { label: 'Heuristic Injector', icon: <Shield size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 5, y: 50 } },
                { id: 'verb-optimizer', type: 'service', data: { label: 'Verb NLP Polish', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 5, y: 250 } },
                { id: 'final-kv', type: 'service', data: { label: 'Optimized Store', icon: <Zap size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 6, y: Y_LEVEL } },
                { id: 'editor-sync', type: 'service', data: { label: 'DOM Rehydrate', icon: <Activity size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 7, y: Y_LEVEL } },
            ],
            edges: [
                { id: 'o1', source: 'opt-init', target: 'producer-svc', animated: true },
                { id: 'o2', source: 'producer-svc', target: 'sse-manager', label: 'JobID Sync' },
                { id: 'o3', source: 'producer-svc', target: 'queue-router', animated: true },
                { id: 'o4', source: 'queue-router', target: 'consumer-svc' },
                { id: 'o5', source: 'consumer-svc', target: 'llm-algo' },
                { id: 'o6', source: 'llm-algo', target: 'validator-node' },
                { id: 'o7', source: 'llm-algo', target: 'verb-optimizer' },
                { id: 'o8', source: 'validator-node', target: 'final-kv' },
                { id: 'o9', source: 'verb-optimizer', target: 'final-kv' },
                { id: 'o10', source: 'final-kv', target: 'editor-sync', animated: true },
            ]
        };
      case 'pdf-maker':
        return {
            nodes: [
                { id: 'pdf-init', type: 'service', data: { label: 'PDF Request', icon: <FileEdit size={18}/>, color: 'text-yellow-500' }, position: { x: 0, y: Y_LEVEL } },
                { id: 'pdf-csp', type: 'service', data: { label: 'CSP Defense', icon: <Shield size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP, y: Y_LEVEL } },
                { id: 'pdf-proxy', type: 'service', data: { label: 'Edge Intercept', icon: <Zap size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 2, y: Y_LEVEL } },
                { id: 'pdf-auth', type: 'service', data: { label: 'JKWS Verify', icon: <Lock size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: Y_LEVEL } },
                { id: 'pdf-rate', type: 'service', data: { label: 'Durable Limiter', icon: <Activity size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 4, y: Y_LEVEL } },
                { id: 'pdf-handler', type: 'service', data: { label: 'RPC Router', icon: <Server size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 5, y: Y_LEVEL } },
                { id: 'pdf-producer', type: 'service', data: { label: 'Job Orchestrator', icon: <Cpu size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 6, y: Y_LEVEL } },
                { id: 'pdf-queue', type: 'service', data: { label: 'Async Queue', icon: <Database size={18}/>, color: 'text-pink-500' }, position: { x: X_GAP * 7, y: Y_LEVEL } },
                { id: 'pdf-sse', type: 'service', data: { label: 'Telemetry Stream', icon: <Activity size={18}/>, color: 'text-cyan-500' }, position: { x: X_GAP * 6, y: 0 } },
                { id: 'pdf-consumer', type: 'service', data: { label: 'Queue Fetcher', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 8, y: Y_LEVEL } },
                { id: 'pdf-uploader', type: 'service', data: { label: 'R2 Provisioner', icon: <Server size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 9, y: Y_LEVEL } },
                { id: 'pdf-cloudrun', type: 'service', data: { label: 'Chrome Render', icon: <Cpu size={18}/>, color: 'text-blue-500' }, position: { x: X_GAP * 10, y: Y_LEVEL } },
                { id: 'pdf-transfer', type: 'service', data: { label: 'Vault Migration', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 11, y: Y_LEVEL } },
                { id: 'pdf-db', type: 'service', data: { label: 'Metadata D1', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 12, y: Y_LEVEL } },
                { id: 'pdf-complete', type: 'service', data: { label: 'Download Ready', icon: <Activity size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 13, y: Y_LEVEL } },
            ],
            edges: [
                { id: 'p1', source: 'pdf-init', target: 'pdf-csp', animated: true },
                { id: 'p2', source: 'pdf-csp', target: 'pdf-proxy' },
                { id: 'p3', source: 'pdf-proxy', target: 'pdf-auth' },
                { id: 'p4', source: 'pdf-auth', target: 'pdf-rate' },
                { id: 'p5', source: 'pdf-rate', target: 'pdf-handler' },
                { id: 'p6', source: 'pdf-handler', target: 'pdf-producer' },
                { id: 'p7', source: 'pdf-producer', target: 'pdf-sse', label: 'JobID' },
                { id: 'p8', source: 'pdf-producer', target: 'pdf-queue', animated: true },
                { id: 'p9', source: 'pdf-queue', target: 'pdf-consumer' },
                { id: 'p10', source: 'pdf-consumer', target: 'pdf-uploader' },
                { id: 'p11', source: 'pdf-uploader', target: 'pdf-cloudrun' },
                { id: 'p12', source: 'pdf-cloudrun', target: 'pdf-transfer' },
                { id: 'p13', source: 'pdf-transfer', target: 'pdf-db' },
                { id: 'p14', source: 'pdf-db', target: 'pdf-complete', animated: true },
            ]
        };
      case 'jd-scanner':
        return {
            nodes: [
                { id: 'jd-init', type: 'service', data: { label: 'Match Start', icon: <Search size={18}/>, color: 'text-yellow-500' }, position: { x: 0, y: Y_LEVEL } },
                { id: 'jd-csp', type: 'service', data: { label: 'Security Guard', icon: <Shield size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP, y: Y_LEVEL } },
                { id: 'jd-proxy', type: 'service', data: { label: 'Edge Auth', icon: <Lock size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 2, y: Y_LEVEL } },
                { id: 'jd-rate', type: 'service', data: { label: 'DO Limiter', icon: <Activity size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: Y_LEVEL } },
                { id: 'jd-handler', type: 'service', data: { label: 'Route Control', icon: <Server size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 4, y: Y_LEVEL } },
                { id: 'jd-producer', type: 'service', data: { label: 'MQ Publisher', icon: <Cpu size={18}/>, color: 'text-pink-500' }, position: { x: X_GAP * 5, y: Y_LEVEL } },
                { id: 'jd-sse', type: 'service', data: { label: 'Match Tracker', icon: <Activity size={18}/>, color: 'text-cyan-500' }, position: { x: X_GAP * 5, y: 0 } },
                { id: 'jd-consumer', type: 'service', data: { label: 'Async Consumer', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 6, y: Y_LEVEL } },
                { id: 'jd-scanner', type: 'service', data: { label: 'File Provisioner', icon: <Search size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 7, y: Y_LEVEL } },
                { id: 'jd-matching', type: 'service', data: { label: 'NLP Matching', icon: <Cpu size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 8, y: Y_LEVEL } },
                { id: 'jd-cache', type: 'service', data: { label: 'Report Store', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 9, y: Y_LEVEL } },
                { id: 'jd-skills', type: 'service', data: { label: 'Skill Audit', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 10, y: Y_LEVEL } },
                { id: 'jd-complete', type: 'service', data: { label: 'Report Hydrated', icon: <Activity size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 11, y: Y_LEVEL } },
            ],
            edges: [
                { id: 'j1', source: 'jd-init', target: 'jd-csp', animated: true },
                { id: 'j2', source: 'jd-csp', target: 'jd-proxy' },
                { id: 'j3', source: 'jd-proxy', target: 'jd-rate' },
                { id: 'j4', source: 'jd-rate', target: 'jd-handler' },
                { id: 'j5', source: 'jd-handler', target: 'jd-producer' },
                { id: 'j6', source: 'jd-producer', target: 'jd-sse', label: 'JobID' },
                { id: 'j7', source: 'jd-producer', target: 'jd-consumer', animated: true },
                { id: 'j8', source: 'jd-consumer', target: 'jd-scanner' },
                { id: 'j9', source: 'jd-scanner', target: 'jd-matching' },
                { id: 'j10', source: 'jd-matching', target: 'jd-cache' },
                { id: 'j11', source: 'jd-cache', target: 'jd-skills' },
                { id: 'j12', source: 'jd-skills', target: 'jd-complete', animated: true },
            ]
        };
      case 'jd-optimizer':
        return {
            nodes: [
                { id: 'opt-req', type: 'service', data: { label: 'Context Start', icon: <Zap size={18}/>, color: 'text-yellow-500' }, position: { x: 0, y: Y_LEVEL } },
                { id: 'opt-dismantle', type: 'service', data: { label: 'Fragment Dismantle', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP, y: Y_LEVEL } },
                { id: 'opt-context', type: 'service', data: { label: 'Bound Context', icon: <FileEdit size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 2, y: Y_LEVEL } },
                { id: 'opt-llm', type: 'service', data: { label: 'Algorithmic LLM', icon: <Cpu size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: Y_LEVEL } },
                { id: 'opt-inject', type: 'service', data: { label: 'Token Injector', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 4, y: Y_LEVEL } },
                { id: 'opt-validator', type: 'service', data: { label: 'Integrity Validator', icon: <Shield size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 5, y: Y_LEVEL } },
                { id: 'opt-structure', type: 'service', data: { label: 'Structure Audit', icon: <ListChecks size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 6, y: Y_LEVEL } },
                { id: 'opt-kv', type: 'service', data: { label: 'Edge Store', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 7, y: Y_LEVEL } },
                { id: 'opt-sse', type: 'service', data: { label: 'Success Trigger', icon: <Activity size={18}/>, color: 'text-cyan-500' }, position: { x: X_GAP * 8, y: Y_LEVEL } },
                { id: 'opt-dom', type: 'service', data: { label: 'DOM Hydrate', icon: <FileEdit size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 9, y: Y_LEVEL } },
            ],
            edges: [
                { id: 'jo1', source: 'opt-req', target: 'opt-dismantle', animated: true },
                { id: 'jo2', source: 'opt-dismantle', target: 'opt-context' },
                { id: 'jo3', source: 'opt-context', target: 'opt-llm' },
                { id: 'jo4', source: 'opt-llm', target: 'opt-inject' },
                { id: 'jo5', source: 'opt-inject', target: 'opt-validator' },
                { id: 'jo6', source: 'opt-validator', target: 'opt-structure' },
                { id: 'jo7', source: 'opt-structure', target: 'opt-kv' },
                { id: 'jo8', source: 'opt-kv', target: 'opt-sse' },
                { id: 'jo9', source: 'opt-sse', target: 'opt-dom', animated: true },
            ]
        };
      case 'payment':
        return {
            nodes: [
                { id: 'pay-init', type: 'service', data: { label: 'Plan Subscription', icon: <Globe size={18}/>, color: 'text-yellow-500' }, position: { x: 0, y: 200 } },
                { id: 'pay-csp', type: 'service', data: { label: 'Header Guard', icon: <Shield size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP, y: 200 } },
                { id: 'pay-proxy', type: 'service', data: { label: 'JWT Intercept', icon: <Lock size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 2, y: 200 } },
                { id: 'pay-handler', type: 'service', data: { label: 'Subscription SVC', icon: <Server size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 3, y: 200 } },
                { id: 'pay-check', type: 'service', data: { label: 'State Validator', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 4, y: 200 } },
                { id: 'pay-plan', type: 'service', data: { label: 'Metadata Fetch', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 5, y: 200 } },
                { id: 'pay-razorpay', type: 'service', data: { label: 'Gateway API', icon: <Zap size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 6, y: 200 } },
                { id: 'pay-db', type: 'service', data: { label: 'Atomic Entry', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 7, y: 200 } },
                { id: 'pay-frontend', type: 'service', data: { label: 'Razorpay UI', icon: <Globe size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 8, y: 200 } },
                { id: 'pay-success', type: 'service', data: { label: 'Client Success', icon: <Activity size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 9, y: 200 } },
                { id: 'pay-hmac', type: 'service', data: { label: 'HMAC Verify', icon: <Shield size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 10, y: 200 } },
                { id: 'pay-pending', type: 'service', data: { label: 'Sync State', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 11, y: 200 } },
                { id: 'pay-sse', type: 'service', data: { label: 'Webhook Wait', icon: <Activity size={18}/>, color: 'text-cyan-500' }, position: { x: X_GAP * 12, y: 100 } },
                { id: 'web-proxy', type: 'service', data: { label: 'Webhook Ingest', icon: <Zap size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 12, y: 300 } },
                { id: 'web-producer', type: 'service', data: { label: 'MQ Dispatcher', icon: <Cpu size={18}/>, color: 'text-pink-500' }, position: { x: X_GAP * 13, y: 300 } },
                { id: 'web-consumer', type: 'service', data: { label: 'Async Fulfillment', icon: <Code size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 14, y: 300 } },
                { id: 'web-payment', type: 'service', data: { label: 'Payment Note', icon: <Activity size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 15, y: 240 } },
                { id: 'web-invoice', type: 'service', data: { label: 'Invoice Note', icon: <Activity size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 15, y: 360 } },
                { id: 'web-limits', type: 'service', data: { label: 'Limit Allocation', icon: <Database size={18}/>, color: 'text-emerald-500' }, position: { x: X_GAP * 16, y: 300 } },
                { id: 'web-notify', type: 'service', data: { label: 'ZeptoMail Dispatch', icon: <MessageSquare size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 17, y: 300 } },
                { id: 'web-refresh', type: 'service', data: { label: 'Dashboard Sync', icon: <Activity size={18}/>, color: 'text-yellow-500' }, position: { x: X_GAP * 18, y: 200 } },
                { id: 'web-backup', type: 'service', data: { label: 'Polling Fallback', icon: <Server size={18}/>, color: 'text-orange-500' }, position: { x: X_GAP * 18, y: 340 } },
            ],
            edges: [
                { id: 'pay1', source: 'pay-init', target: 'pay-csp', animated: true },
                { id: 'pay2', source: 'pay-csp', target: 'pay-proxy' },
                { id: 'pay3', source: 'pay-proxy', target: 'pay-handler' },
                { id: 'pay4', source: 'pay-handler', target: 'pay-check' },
                { id: 'pay5', source: 'pay-check', target: 'pay-plan' },
                { id: 'pay6', source: 'pay-plan', target: 'pay-razorpay' },
                { id: 'pay7', source: 'pay-razorpay', target: 'pay-db' },
                { id: 'pay8', source: 'pay-db', target: 'pay-frontend' },
                { id: 'pay9', source: 'pay-frontend', target: 'pay-success', animated: true },
                { id: 'pay10', source: 'pay-success', target: 'pay-hmac' },
                { id: 'pay11', source: 'pay-hmac', target: 'pay-pending' },
                { id: 'pay12', source: 'pay-pending', target: 'pay-sse', label: 'JobID' },
                { id: 'web1', source: 'pay-razorpay', target: 'web-proxy', label: 'Async Webhook', style: { stroke: '#f97316' } },
                { id: 'web2', source: 'web-proxy', target: 'web-producer', animated: true },
                { id: 'web3', source: 'web-producer', target: 'web-consumer' },
                { id: 'web4', source: 'web-consumer', target: 'web-payment' },
                { id: 'web5', source: 'web-consumer', target: 'web-invoice' },
                { id: 'web6', source: 'web-payment', target: 'web-limits' },
                { id: 'web7', source: 'web-invoice', target: 'web-limits' },
                { id: 'web8', source: 'web-limits', target: 'web-notify' },
                { id: 'web9', source: 'web-notify', target: 'web-refresh', animated: true },
                { id: 'web10', source: 'web-limits', target: 'web-backup', label: 'Fallback' },
            ]
        };
      default:
        return { nodes: [], edges: [] };
    }
  }, [activeTab]);

  return (
    <ReactFlow
      nodes={meshData.nodes}
      edges={meshData.edges}
      nodeTypes={nodeTypes}
      onNodeClick={(_, node) => onSelectNode(ALL_PIPELINE_DATA[node.id])}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      style={{ background: '#020408' }}
    >
      <Background color="#1e293b" gap={30} size={1.5} />
      <Controls position="bottom-right" />
    </ReactFlow>
  );
}



function TestMetricsView() {
  const [selectedTest, setSelectedTest] = useState<typeof TEST_PROOFS[0] | null>(
    TEST_PROOFS[0]
  );
 
  const [zoomImg, setZoomImg] = useState<string | null>(null);
  const isMobile =
  typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="absolute inset-0 overflow-y-auto bg-[#020408] p-4 md:p-10 pb-32">
      
      {/* ================= HEADER ================= */}
      <div className="max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <BarChart3 className="text-emerald-400" size={24} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tight">
              Production Telemetry
            </h2>
            <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">
               Latency & Integrity Proofs
            </p>
          </div>
        </div>
      
      </div>

      {/* ================= MASTER–DETAIL GRID ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto grid grid-cols-12 gap-6 md:h-[70vh]"
      >
        {/* ================= LEFT PANEL ================= */}
        <div className="col-span-12 md:col-span-4 space-y-4 md:overflow-y-auto pr-2">
          {TEST_PROOFS.map((proof, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedTest(proof)}
              className={`cursor-pointer w-full text-left rounded-2xl border transition-all overflow-hidden
                ${
                  selectedTest?.heading === proof.heading
                    ? 'border-emerald-500 bg-emerald-500/10'
                    : 'border-white/5 bg-slate-900/40 hover:border-white/10'
                }
              `}
            >
             {!isMobile&& <div className={`relative bg-black ${isMobile ? 'h-auto' : 'h-32'}`}>
                <img
                  src={proof.img}
                  className="w-full h-full object-cover opacity-80"
                  onError={(e) => {
                    e.currentTarget.src = `https://placehold.co/600x400/0f172a/10b981?text=${encodeURIComponent(
                      proof.heading
                    )}`;
                  }}
                />
                <div className="absolute bottom-2 right-2 text-[10px] bg-black/70 px-2 py-1 rounded-full text-emerald-400 font-mono">
                  {proof.latency}
                </div>
              </div>}
              {isMobile && (
  <div
    className="mt-4 rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in"
    onClick={() => setZoomImg(proof.img)}
  >
    <img
      src={proof.img}
      className="w-full max-h-[420px] object-contain bg-black"
    />

    <div className="absolute inset-0 bg-black/30 opacity-0 active:opacity-100 transition flex items-center justify-center">
      <span className="px-4 py-2 bg-black text-emerald-400 text-xs font-bold rounded-full">
        Tap to Zoom
      </span>
    </div>
  </div>
)}

              <div className="p-3">
                <h4 className="text-white text-sm font-bold">
                  {proof.heading}
                </h4>
                <p className="text-slate-400 text-xs line-clamp-2">
                  {proof.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* ================= RIGHT PANEL ================= */}
        <div className="col-span-12 md:col-span-8 bg-slate-900/50 border border-white/10 rounded-3xl p-6 relative">
          {selectedTest ? (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {selectedTest.heading}
                  </h2>
                  <p className="text-slate-400 text-sm mt-2">
                    {selectedTest.desc}
                  </p>
                </div>

                <span className="text-emerald-400 text-xs font-mono bg-black/60 px-3 py-1 rounded-full">
                  {selectedTest.latency}
                </span>
              </div>

              <div
                className="relative mt-6 rounded-2xl overflow-hidden border border-white/10 cursor-zoom-in"
                onClick={() => setZoomImg(selectedTest.img)}
              >
                <img
                  src={selectedTest.img}
                  className="w-full h-[360px] object-contain bg-black"
                />

                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition flex items-center justify-center">
                  <span className="px-4 py-2 bg-black text-emerald-400 text-xs font-bold rounded-full">
                    Click to Zoom
                  </span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-slate-500">Select a test result</p>
          )}
        </div>
      </motion.div>

      {/* ================= FULLSCREEN MODAL ================= */}
      <AnimatePresence>
        {zoomImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-10"
            onClick={() => setZoomImg(null)}
          >
            <button
              className="cursor-pointer absolute top-6 right-6 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors z-50"
              onClick={() => setZoomImg(null)}
            >
              <X size={24} />
            </button>

            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={zoomImg}
              className="max-w-full max-h-full rounded-lg shadow-2xl border border-white/10 object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


/* ======================================================
   3. MAIN PAGE
====================================================== */

export default function PipelineVisualizer() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
   const [isFAQOpen, setFAQOpen] = React.useState(false);
  const [activeTab, setActiveTab] = useState('ats-scan');

  const tabs = [
    { id: 'ats-scan', label: 'Scanner' },
    { id: 'ats-optimizer', label: 'ATS Optimizer' },
    { id: 'pdf-maker', label: 'PDF Maker' },
    { id: 'jd-scanner', label: 'JD Scan' },
    { id: 'jd-optimizer', label: 'JD Optimizer' },
    { id: 'payment', label: 'Payments' },
  ];

  return (
    <div className="fixed inset-0 bg-[#05080c] flex flex-col font-sans overflow-hidden">
      {/* Top Header */}
      <nav className="z-30 w-full p-4 md:p-8 flex flex-col md:flex-row justify-between items-center bg-[#05080c] border-b border-white/5 shadow-2xl gap-4">
        <div className="flex bg-slate-900/50 p-1 rounded-2xl border border-white/10 overflow-x-auto max-w-full no-scrollbar gap-1 backdrop-blur-md">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSelectedNode(null); }}
              className={`cursor-pointer px-4 py-2 md:px-6 md:py-2.5 rounded-xl text-[10px] md:text-[11px] font-bold transition-all whitespace-nowrap tracking-wider uppercase ${
                activeTab === tab.id ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {tab.label}
            </button>
            
          ))}
          <button 
  onClick={() => {
    setActiveTab('test-metrics'); 
    setSelectedNode(null);
  }} 
  className={`cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap 
    ${activeTab === 'test-metrics' 
      ? 'bg-emerald-600 text-white shadow-[0_0_25px_rgba(16,185,129,0.4)]' 
      : 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
    }`}
>

  <BarChart3 size={16} />
  View Test Metrics & Latencies
</button>
        </div>
                             <motion.button 
  onClick={() =>setFAQOpen(true)}
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
  className="cursor-pointer inline-flex items-center gap-1 px-4 py-1.5 rounded-xl 
             bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/50 
             text-blue-400 hover:text-blue-300 font-mono text-xs font-black
             uppercase tracking-widest transition-all backdrop-blur-md group"
>
  <Terminal size={16} className="group-hover:rotate-12 transition-transform" />
  See Engineering Decisions // FAQ
</motion.button>
          <HomeButton/>
 
        <div className="text-center md:text-right">
            <h1 className="text-white text-lg md:text-xl font-black tracking-tighter italic">VERSION-CV ARCHITECTURE</h1>
            <p className="text-blue-500 font-mono text-[8px] md:text-[9px] tracking-[0.4em] uppercase font-bold">Serverless Orchestration</p>
        </div>
      </nav>
     

      {/* React Flow Area */}
     <div className="flex-1 relative overflow-hidden">
  {activeTab === 'test-metrics' ? (
    <TestMetricsView />
  ) : (
    <ReactFlowProvider>
      <ATSFlowMesh onSelectNode={setSelectedNode} activeTab={activeTab} />
    </ReactFlowProvider>
  )}

        {/* SIDE DETAIL PANEL / BOTTOM SHEET ON MOBILE */}
        <AnimatePresence>
          {selectedNode && (
            <motion.aside
              initial={{ x: '100%', y: 0 }} 
              animate={{ x: 0, y: 0 }} 
              exit={{ x: '100%', y: 0 }}
              // Mobile specific positioning logic via CSS classes
              className="absolute bottom-0 right-0 h-[60vh] md:h-full w-full md:w-max md:max-w-lg bg-slate-900/95 backdrop-blur-3xl border-t md:border-t-0 md:border-l border-white/10 z-40 p-6 md:p-12 shadow-2xl overflow-y-auto"
            >
              <button onClick={() => setSelectedNode(null)} className="cursor-pointer absolute top-4 right-4 md:top-8 md:right-8 text-slate-500 hover:text-white transition-colors"><X size={28} /></button>
              <div className="space-y-6 md:space-y-12 mt-4 md:mt-8">
                <div>
                  <div className="flex items-center gap-3 text-blue-500 mb-2 md:mb-3 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] font-bold"><Activity size={16} /> Step Insight</div>
                  <h2 className="text-2xl md:text-4xl font-black text-white leading-none tracking-tight">{selectedNode.title}</h2>
                  <div className="mt-3 md:mt-6 px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] md:text-xs inline-block italic shadow-inner">{selectedNode.tech}</div>
                </div>
                <div className="space-y-4 md:space-y-6">
                  <h4 className="text-[8px] md:text-[10px] font-bold text-slate-500 uppercase tracking-[0.4em]">Logic & Infrastructure Flow</h4>
                  <p className="text-slate-200 text-sm md:text-lg leading-relaxed font-light">{selectedNode.desc}</p>
                </div>
                <div className="p-4 md:p-8 bg-white/5 rounded-2xl md:rounded-[2rem] border border-white/10 shadow-inner">
                    <p className="text-slate-500 text-[8px] md:text-[10px] font-mono tracking-widest uppercase mb-1 md:mb-2">Network Profile</p>
                    <p className="text-green-500 text-[10px] md:text-xs font-bold font-mono tracking-tighter uppercase">Production-Ready Mesh</p>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* FULL PIPELINE WALKTHROUGH (NON-TRUNCATED) */}
  {activeTab !== 'test-metrics' && (
  <div className="absolute bottom-4 left-4 right-4 md:bottom-10 md:left-10 md:right-10 z-20 pointer-events-none">
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      key={activeTab}
      className="p-4 md:p-6 bg-slate-950/90 backdrop-blur-2xl border border-white/10 rounded-2xl md:rounded-[2rem] shadow-[0_30px_100px_rgba(0,0,0,0.8)] relative overflow-hidden max-w-5xl"
    >
      {/* Ambient Glows */}
      <div className="absolute -top-32 -left-32 w-64 h-64 bg-blue-500/10 blur-[100px]" />
      
      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-3 md:gap-8">
        
        {/* Header Section: Tightened and moved to side on desktop */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="p-2 bg-blue-500/20 rounded-lg md:rounded-xl">
            <Activity size={18} className="text-blue-400 md:w-6 md:h-6" />
          </div>
          <div className="space-y-0.5">
            <h3 className="text-blue-400 font-mono text-[7px] md:text-[10px] uppercase tracking-[0.3em] font-black leading-none">
              Pipeline Walkthrough
            </h3>
            <p className="text-white text-xs md:text-sm font-black tracking-tight uppercase italic leading-none whitespace-nowrap">
              {activeTab.replace('-', ' ')} Narrative
            </p>
          </div>
        </div>

        {/* Divider: Visible only on desktop to separate header from description */}
        <div className="hidden md:block w-px h-10 bg-white/10" />

        {/* Description Section: Fluid text size and tighter leading */}
        <p className="text-slate-300 text-[9px] md:text-[13px] leading-tight md:leading-relaxed font-medium tracking-wide italic flex-1">
          {activeTab === 'ats-scan' && "A multi-stage discovery mesh. Requests are verified via JWT at the edge, offloaded via Internal RPC to isolated GCP Cloud Run containers for high-fidelity conversion, followed by structural distortion audits and deterministic NLP-based scoring pass."}
          {activeTab === 'ats-optimizer' && "Asynchronous transformation pipeline. Requests are decoupled via Cloudflare Queues to prevent head-of-line blocking. Progress is streamed in real-time via SSE while the LLM Audit Engine executes XML-guided DOM self-healing and contextual verb replacement."}
          {activeTab === 'pdf-maker' && "Cross-cloud rendering handshake. DOM state is buffered in an R2 Temp bucket to bypass Edge payload limits. A GCP Cloud Run instance provisioned with Headless Chromium renders the PDF, migrates the binary to a Protected Vault, and atomically updates D1 metadata entries."}
          {activeTab === 'jd-scanner' && "Forensic JD matching sequence. The consumer provisioner fetches resume assets from R2 bucket, verifies ownership, and executes a vector-based semantic analysis against role requirements to generate an instant compatibility report and plausible skill gap audit cached in KV."}
          {activeTab === 'jd-optimizer' && "Granular context injection mesh. To prevent LLM drift, the file is dismantled into sectional tokens. Only targeted fragments are sent to the LLM within a strict algorithmic context. The optimized results are re-into the original structure and validated via structure-test before editor hydration."}
          {activeTab === 'payment' && "Idempotent billing mesh. Atomic subscription logic prevents gateway-DB mismatch through rollback triggers. HMAC-verified webhooks are ingested via Message Queues to prevent gateway timeout loops, while async consumers handle ZeptoMail fulfillment and inventory synchronization."}
        </p>
      </div>
    </motion.div>
  </div>
)}
      </div>
      

      <footer className="p-3 md:p-6 bg-slate-950 border-t border-white/5 flex gap-4 md:gap-12 overflow-x-auto no-scrollbar whitespace-nowrap shadow-inner">
        <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[11px] text-slate-500 font-mono font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-yellow-500 rounded-full animate-pulse"/>
        Entrance: Client Browser
    </div>

    {/* Orange: Cloudflare / Edge */}
    <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[11px] text-slate-500 font-mono font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full animate-pulse"/>
        Edge: CF Workers / Logic
    </div>

    {/* Blue: GCP Heavy Compute */}
    <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[11px] text-slate-500 font-mono font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-500 rounded-full animate-pulse"/>
        Compute: GCP Cloud Run
    </div>

    {/* Pink: Queues */}
    <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[11px] text-slate-500 font-mono font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-pink-500 rounded-full animate-pulse"/>
        Async: CF Queues
    </div>

    {/* Cyan: SSE */}
    <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[11px] text-slate-500 font-mono font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-cyan-500 rounded-full animate-pulse"/>
        Events: SSE Heartbeat
    </div>

    {/* Emerald: Persistence */}
    <div className="flex items-center gap-2 md:gap-3 text-[8px] md:text-[11px] text-slate-500 font-mono font-bold tracking-widest uppercase">
        <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full animate-pulse"/>
        Storage/DB: D1 / KV / R2 bucket
    </div>    
      </footer>
      {/* FAQ Modal */}
      < EngineeringAuditModal  isOpen={isFAQOpen} onClose={() => setFAQOpen(false)} />
      
    </div>
  );
}