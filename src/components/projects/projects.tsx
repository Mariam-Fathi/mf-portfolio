"use client";
import React, { useState } from "react";
import { ExternalLink } from "lucide-react";

type ProjectLink = {
  name: string;
  url: string;
  isGrouped?: boolean;
  groupedLinks?: Array<{ name: string; url: string }>;
};

type Project = {
  id: string;
  title: string;
  role: string;
  description: string;
  links: ProjectLink[];
};

type ProjectsProps = {
  scrollContainer?: HTMLDivElement | null;
};

const extColors: Record<string, string> = {
  fig: "#a78bfa", ai: "#fb923c", pdf: "#f87171", jpg: "#34d399", md: "#60a5fa",
  jsx: "#38bdf8", js: "#fbbf24", css: "#c084fc", mp4: "#f472b6", zip: "#94a3b8",
  txt: "#8A9EA7", link: "#6A0610",
};

const FolderIcon = ({ open }: { open: boolean }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
    <path
      d={open ? "M1 4h12v7.5a.5.5 0 01-.5.5H1.5a.5.5 0 01-.5-.5V4zm0 0V2.5a.5.5 0 01.5-.5H5l1.5 2H1z" : "M1 3.5a.5.5 0 01.5-.5H5l1.5 2H12.5a.5.5 0 01.5.5V11a.5.5 0 01-.5.5h-11A.5.5 0 011 11V3.5z"}
      fill="currentColor"
    />
  </svg>
);

const FileIcon = ({ ext }: { ext?: string }) => (
  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="flex-shrink-0">
    <path d="M1 1.5A.5.5 0 011.5 1H8l3 3v8.5a.5.5 0 01-.5.5h-9a.5.5 0 01-.5-.5V1.5z" fill="currentColor" opacity="0.15" stroke="currentColor" strokeWidth="0.8" />
    <path d="M8 1v3h3" stroke="currentColor" strokeWidth="0.8" />
    <text x="2" y="10" fontSize="3.5" fill="currentColor" style={{ fontFamily: "var(--font-default)" }} fontWeight="bold">
      {ext?.toUpperCase().slice(0, 3) ?? "LNK"}
    </text>
  </svg>
);

const projects: Project[] = [
  {
    id: "sales-ai",
    title: "Estima",
    role: "Full-Stack Engineer",
    description: "Built a full-stack Next.js 15 app that turns project briefs into cost and timeline estimates using Google Gemini 2.5 Flash Lite. Implemented structured AI prompts (complexity scores, effort multipliers, risk factors), rule-based fallback when the API is unavailable, multi-department configs (tech stack, team size, hourly rates), and EGP/USD conversion. Delivered landing page, estimation wizard, results breakdown with confidence and risks, and download estimation as JSON for sharing or records. UI built with Radix UI and Framer Motion for founders and agencies.",
    links: [
      { name: "Live", url: "https://ai-saas-app-nu-nine.vercel.app" },
    ],
  },
  {
    id: "font-selection-agent",
    title: "Font Agent",
    role: "AI Engineer",
    description:
      "Agents Intensive Capstone: AI agent that automates font discovery and visual comparison for any UI file (HTML, React, Vue, Angular). Reduces font-selection time by 95% and evaluates 10× more fonts in the same time. Prompts for file path and URL, offers five curated categories (handwriting, serif, sans-serif, display, monospace) across 40 Google Fonts, then chains search and Playwright-based screenshot capture with automatic file modification and restoration. Built with Google ADK, Gemini 2.5 Flash Lite, and a safe file pipeline (regex-based pattern matching, CSS injection, 100% restoration). Delivers side-by-side previews for confident typography decisions.",
    links: [
      { name: "GitHub", url: "https://github.com/Mariam-Fathi/font-selection-agent" },
      {
        name: "Kaggle Capstone Writeup",
        url: "https://www.kaggle.com/competitions/agents-intensive-capstone-project/writeups/new-writeup-1763196957997",
      },
    ],
  },
  {
    id: "real-estate-data",
    title: "Data Auditing",
    role: "Data Engineer",
    description:
      "Data engineering on the USA Real Estate Dataset (2.2M+ records). Exploratory analysis revealed critical integrity issues: 38.19% anomalous records (734k placeholder dates, 115k duplicate prices). Built memory-optimized auditing pipelines achieving 87.4% memory reduction and documented 57k suspicious patterns. Delivered discovery analysis, anomaly detection, and data quality visuals as reproducible Kaggle notebooks.",
    links: [
      { name: "Kaggle Notebooks: [1], [2], [3], [4]", url: "#", isGrouped: true, groupedLinks: [
        { name: "Real Estate Data Discovery Analysis", url: "https://www.kaggle.com/code/mariamfathiamin/real-estate-data-discovery-analysis" },
        { name: "38.19% SUSPICIOUS RECORDS", url: "https://www.kaggle.com/code/mariamfathiamin/38-19-suspicious-records" },
        { name: "87.4% Memory Opt + Real Estate Suspicious Patterns", url: "https://www.kaggle.com/code/mariamfathiamin/87-4-memory-opt-real-estate-suspicious-patterns" },
        { name: "87.4% Memory Opt + Real Estate Data Quality Visuals", url: "https://www.kaggle.com/code/mariamfathiamin/real-estate-data-quality-visuals" },
      ]},
    ],
  },
  {
    id: "operational-portal",
    title: "Operational Portal",
    role: "Full-Stack Engineer",
    description: "Built a real-time React dashboard for monitoring room devices with Appwrite as backend and Appwrite Realtime for live updates. Implemented Dashboard (search, filters by device/status/battery, pagination, summary stats), Manage Devices (full CRUD), and Analytics (Recharts pie/bar charts). Added critical-event detection, in-app notification panel, and optional WhatsApp alerts (Twilio/Green API/Evolution API) for device failures and low battery. Delivered sample-data import script and responsive UI with Tailwind.",
    links: [
      { name: "Live", url: "https://operational-portal.vercel.app/" },
    ],
  },
  {
    id: "shibin-ride",
    title: "Shibin Ride",
    role: "Full-Stack Engineer",
    description:
      "Designed and built a full-stack bus booking platform inspired by Swvl, tailored for local Egyptian routes. Engineered a PostgreSQL schema on Supabase covering trips, seat reservations, waitlists, ratings, and push notifications — with race condition protection using FOR UPDATE locks to guarantee no overbooking. Implemented three pg_cron background jobs for automatic trip completion, 30-minute departure reminders, and waitlist seat notifications. Built two Supabase Edge Functions for push delivery via Expo and atomic trip cancellation with passenger notifications. Architected the full booking lifecycle (confirmed → completed) without per-passenger check-in, matching real driver workflows. Stack: Supabase (PostgreSQL, pg_cron, Edge Functions, RLS), Expo Push Notifications.",
    links: [],
  },
  {
    id: "homi",
    title: "Homi",
    role: "Full-Stack Engineer",
    description:
      "Full-stack mobile property marketplace (React Native / Expo) shipped on the Play Store. Users sign in securely with AppWrite OAuth, search and filter properties, browse rich listing details, and complete payment flows with Stripe; Firebase powers push notifications so they stay updated on new homes, price changes, and status updates. Stack: Expo (Router, typed routes, EAS updates), NativeWind for UI, react-native-appwrite and @stripe/stripe-react-native for auth and payments, with OTA updates for fast iteration. Delivered a production-ready, cross-platform app focused on making it easy to find and secure the right home from a phone.",
    links: [
      { name: "Play Store", url: "https://play.google.com/store/apps/details?id=com.mariamfathi.homi" },
    ],
  },
  {
    id: "personality-ai",
    title: "Multimodal Personality Analysis",
    role: "AI Researcher / Machine Learning Engineer",
    description: "Bachelor project (Computer Systems Engineering). Engineered an end-to-end system predicting Big Five traits from short videos using computer vision (facial action units), audio (PyAudioAnalysis), and NLP (BERT) on First Impressions V2 (10K videos), with LSTNet and XGBoost late fusion (MAE 0.0489). Built a full-stack Node.js/Express/MongoDB app with secure auth, upload pipeline, admin dashboard, and radar-chart visualization.",
    links: [
      { name: "Graduation Thesis", url: "https://drive.google.com/file/d/1YwWHlXiXh3pCK1MlZxDT9HE5RtQQfu_C/view" },
      { name: "GitHub", url: "https://github.com/Mariam-Fathi/multimodal-personality-analysis.git" },
    ],
  },
  {
    id: "sanayat",
    title: "Sanayat",
    role: "Mobile Engineer",
    description: "As the mobile engineer on Sanayat, an on-demand handyman platform, I designed and built both client applications from the ground up. The Customer App enables users to discover handymen, create broadcast or direct bookings, track jobs in real time, chat with providers, complete payments, and manage wallet and reviews. The Handyman App gives providers a job feed with bidding and direct/scheduled requests, availability and calendar management, verification onboarding, in-app chat and location sharing, wallet and payouts, and a referral program. Both apps are built with Expo and React Native in a TypeScript monorepo, sharing types and i18n (English and Arabic) with the backend, and use NativeWind, React Query, and Zustand for a consistent, maintainable codebase. The result is a production-ready, two-sided marketplace experience with end-to-end flows for booking, payment, and communication.",
    links: [
      // { name: "GitHub", url: "#" },
    ],
  },
  {
    id: "smart-key",
    title: "Smart Key",
    role: "Mobile Engineer",
    description:
      "Production-deployed IoT solution replacing key cards with smartphone-based access control. Delivered cross-platform React Native applications for guests and staff, enabling secure and seamless keyless access across all properties. Successfully deployed at enterprise level, transforming the complete guest journey from reservation to checkout with modern mobile-first authentication technology.",
    links: [
      { name: "Play Store", url: "https://play.google.com/store/apps/details?id=com.smartkeylb" },
      { name: "App Store", url: "https://apps.apple.com/eg/app/smartkeylb/id6753882015" },
    ],
  },
  {
    id: "wheelchair-dashboard",
    title: "Wheelchair EL-Haram Dashboard",
    role: "Frontend Engineer",
    description: "Developed a secure, multilingual (EN/AR/UR) React/TypeScript admin dashboard for wheelchair service operations. Delivered full CRUD for contracted partners, assets, services, and pricing; real-time dashboard with KPIs and maps; trip tracking and detail views; JWT auth, RBAC-ready flows, and CSV/PDF export. Integrated REST APIs, TanStack Query, Tailwind CSS, and Google Maps in a responsive, RTL-capable SPA.",
    links: [
      // { name: "Demo", url: "#" },
    ],
  },

];

// Color palette: [6A0610, 8A9EA7, F9E7C9, 280B0B]
// One palette per project (index matches project order). Exported for use in Certificates.
export const cardPalette = [
  {
    // Project 0: Estima
    background: "#8A9EA7",
    headline: "#280B0B",
    headlineStroke: "#280B0B",
    body: "#280B0B",
    link: "#280B0B",
    accent: "#6A0610",
  },
  {
    // Project 1: Font Selection Agent
    background: "#F9E7C9",
    headline: "#6A0610",
    headlineStroke: "#6A0610",
    body: "#280B0B",
    link: "#6A0610",
    accent: "#8A9EA7",
  },
  {
    // Project 2: Homi
    background: "#8A9EA7",
    headline: "#280B0B",
    headlineStroke: "#280B0B",
    body: "#280B0B",
    link: "#280B0B",
    accent: "#6A0610",
  },
  {
    // Project 3: Real Estate Data Auditing
    background: "#6A0610",
    headline: "#F9E7C9",
    headlineStroke: "#F9E7C9",
    body: "#F9E7C9",
    link: "#F9E7C9",
    accent: "#8A9EA7",
  },
  {
    // Project 4: Multimodal Personality Analysis (distinct from project 3)
    background: "#8A9EA7",
    headline: "#280B0B",
    headlineStroke: "#280B0B",
    body: "#280B0B",
    link: "#280B0B",
    accent: "#6A0610",
  },
  {
    // Project 5: Sanayat
    background: "#F9E7C9",
    headline: "#6A0610",
    headlineStroke: "#6A0610",
    body: "#280B0B",
    link: "#6A0610",
    accent: "#8A9EA7",
  },
  {
    // Project 6: Operational Portal
    background: "#6A0610",
    headline: "#F9E7C9",
    headlineStroke: "#F9E7C9",
    body: "#F9E7C9",
    link: "#F9E7C9",
    accent: "#8A9EA7",
  },
  {
    // Project 7: Smart Key
    background: "#8A9EA7",
    headline: "#280B0B",
    headlineStroke: "#280B0B",
    body: "#280B0B",
    link: "#280B0B",
    accent: "#6A0610",
  },
  {
    // Project 8: Wheelchair EL-Haram Dashboard
    background: "#F9E7C9",
    headline: "#6A0610",
    headlineStroke: "#6A0610",
    body: "#280B0B",
    link: "#6A0610",
    accent: "#8A9EA7",
  },
];

function ProjectDirItem({
  project,
  index,
  isSelected,
  onSelect,
}: {
  project: Project;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const folderLabel = `${String(index + 1).padStart(2, "0")}_${project.id}`;
  return (
    <div
      className={`flex items-center gap-1.5 px-2 py-0.5 cursor-pointer group  transition-all duration-100 ${
        isSelected ? "bg-[#1a1a1a] text-[#e8e0cc]" : "hover:bg-[#1a1a1a]/40"
      }`}
      style={{ paddingLeft: "8px" }}
      onClick={onSelect}
    >
      <span className={isSelected ? "text-[#c8b97a]" : "text-[#8a7a5a]"}>
        <FolderIcon open={false} />
      </span>
      <span className={`text-[11px] leading-relaxed font-sans ${isSelected ? "text-[#e8e0cc]" : "text-[#2a2a2a]"}`}>
        {folderLabel}
      </span>
    </div>
  );
}

// Single palette for Project Explorer so all projects are visible (no light-on-light).
const explorerPalette = {
  headline: "#280B0B",
  body: "#280B0B",
  link: "#6A0610",
  accent: "#6A0610",
};

export default function GalleryShowcase(_props: ProjectsProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const project = projects[selectedIndex];
  const colors = explorerPalette;

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen flex items-center justify-center p-6 md:p-8 font-sans"
      style={{ background: "#F9E7C9" }}
    >
      {/* Main Window — Project Explorer vibe */}
      <div
        className="w-full max-w-[900px] rounded-xl overflow-hidden border-2 border-[#2a2a2a]"
        style={{
          background: "#F9E7C9",
          boxShadow: "6px 6px 0px #1a1a1a, 0 20px 60px rgba(0,0,0,0.15)",
        }}
      >
        {/* Title Bar */}
        <div
          className="border-b-2 border-[#2a2a2a] px-4 py-2.5 flex items-center gap-3"
          style={{ background: "#F9E7C9" }}
        >
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]" />
            <div className="w-3 h-3 rounded-full bg-[#2a2a2a] border border-[#1a1a1a]" />
          </div>
          <span className="flex-1 text-center text-[12px] font-bold tracking-widest uppercase" style={{ color: "#280B0B" }}>
            Project Explorer
          </span>
        </div>

        <div className="flex flex-col md:flex-row" style={{ minHeight: "520px" }}>
          {/* Sidebar — project tree */}
          <div
            className="w-full md:w-[240px] border-b md:border-b-0 md:border-r-2 border-[#2a2a2a] flex flex-col"
            style={{ background: "#F9E7C9" }}
          >
            <div className="flex-1 overflow-y-auto py-2 scrollbar-hide no-visible-scrollbar">
              <div className="px-2 pb-1">
                <span className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#6A0610" }}>
                  Projects
                </span>
              </div>
              {projects.map((p, i) => (
                <ProjectDirItem
                  key={p.id}
                  project={p}
                  index={i}
                  isSelected={selectedIndex === i}
                  onSelect={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Main Content — selected project */}
          <div className="flex-1 flex flex-col min-h-[400px]">
            {project && (
              <>
                {/* Channel-style header */}
                <div
                  className="border-b-2 border-[#2a2a2a] px-4 md:px-5 py-2.5 flex items-center justify-between flex-wrap gap-2"
                  style={{ background: "#F9E7C9" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] leading-relaxed" style={{ color: colors.headline }}>
                      # {project.title} — {project.role}
                    </span>
                  </div>
                
                </div>

                {/* Messages-style: role + description */}
                <div className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-5 no-visible-scrollbar" style={{ background: "#F9E7C9" }}>
                  <div className="flex gap-3">
                    <div
                      className="w-8 h-8 rounded-sm flex items-center justify-center text-[10px] font-bold flex-shrink-0 border border-[#1a1a1a]"
                      style={{ background: "#280B0B", color: "#F9E7C9" }}
                    >
                      {selectedIndex + 1}
                    </div>
                    <div className="flex-1">
                      <div className="mb-1">
                        <span className="text-[12px] font-bold" style={{ color: "#280B0B" }}>Brief</span>
                      </div>
                      <p className="text-[11px] leading-relaxed mb-2" style={{ color: colors.body }}>
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Project Files — links as file pills; show section for every project */}
                  <div className="pt-2">
                    <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color: "#6A0610" }}>
                      Project Files
                    </div>
                    {project.links.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {project.links.map((link) => {
                          if (link.isGrouped && link.groupedLinks) {
                            return link.groupedLinks.map((gl, idx) => (
                              <a
                                key={`${idx}-${gl.url}`}
                                href={gl.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 border rounded-sm px-2.5 py-1.5 cursor-pointer hover:opacity-90 transition-all duration-150 group inline-flex"
                                style={{
                                  background: "#F9E7C9",
                                  borderColor: colors.accent,
                                  boxShadow: "2px 2px 0 " + colors.accent,
                                }}
                              >
                                <span style={{ color: extColors.link }}>
                                  <FileIcon ext="link" />
                                </span>
                                <span className="text-[10px] font-sans" style={{ color: colors.headline }}>
                                  [{idx + 1}] {gl.name.length > 24 ? gl.name.slice(0, 24) + "…" : gl.name}
                                </span>
                                <ExternalLink className="w-3 h-3" style={{ color: colors.headline }} />
                              </a>
                            ));
                          }
                          return (
                            <a
                              key={link.url}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 border rounded-sm px-2.5 py-1.5 cursor-pointer hover:opacity-90 transition-all duration-150 group inline-flex"
                              style={{
                                background: "#F9E7C9",
                                borderColor: colors.accent,
                                boxShadow: "2px 2px 0 " + colors.accent,
                              }}
                            >
                              <span style={{ color: extColors.link }}>
                                <FileIcon ext="link" />
                              </span>
                              <span className="text-[10px] font-sans" style={{ color: colors.headline }}>
                                {link.name}
                              </span>
                              <ExternalLink className="w-3 h-3" style={{ color: colors.headline }} />
                            </a>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-[11px] font-sans" style={{ color: "#8a7a5a" }}>
                        No public links for this project.
                      </p>
                    )}
                  </div>
                </div>

                {/* Footer bar — explorer vibe */}
                <div
                  className="border-t-2 border-[#2a2a2a] px-4 py-2.5 flex items-center justify-between"
                  style={{ background: "#F9E7C9" }}
                >
                  <span className="text-[10px] font-sans" style={{ color: "#8a7a5a" }}>
                  </span>
                  <span className="text-[9px] font-sans" style={{ color: "#8a7a5a" }}>
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
