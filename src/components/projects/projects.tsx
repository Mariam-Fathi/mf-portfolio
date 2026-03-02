"use client";
import React, { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import { getHeroLineData } from "@/utils/navigationPosition";

gsap.registerPlugin(ScrollTrigger);

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

const projects: Project[] = [
  {
    id: "sales-ai",
    title: "Estima",
    role: "Full-Stack Engineer",
    description:"Built a full-stack Next.js 15 app that turns project briefs into cost and timeline estimates using Google Gemini 2.5 Flash Lite. Implemented structured AI prompts (complexity scores, effort multipliers, risk factors), rule-based fallback when the API is unavailable, multi-department configs (tech stack, team size, hourly rates), and EGP/USD conversion. Delivered landing page, estimation wizard, results breakdown with confidence and risks, and download estimation as JSON for sharing or records. UI built with Radix UI and Framer Motion for founders and agencies.",
    links: [
      { name: "Live", url: "https://ai-saas-app-nu-nine.vercel.app" },
    ],
  },
  {
    id: "font-selection-agent",
    title: "Font  Agent",
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
    id: "homi",
    title: "Homi",
    role: "Full-Stack Engineer",
    description:
      "Full-stack real estate mobile app (React Native / Expo) shipped on the Play Store. Users sign in with AppWrite OAuth, browse listings, and complete flows with Stripe; Firebase powers push notifications so they stay updated on listings and activity. Built an analytics dashboard for business intelligence so stakeholders can track engagement and conversions. Stack: Expo (Router, typed routes, EAS updates), NativeWind for UI, react-native-appwrite and @stripe/stripe-react-native for auth and payments. Delivered a production-ready, cross-platform experience with OTA updates and modern tooling.",
    links: [
      { name: "Play Store", url: "https://play.google.com/store/apps/details?id=com.mariamfathi.homi" },
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
    id: "personality-ai",
    title: "Multimodal Personality Analysis",
    role: "AI Researcher / Machine Learning Engineer",
    description:
"Bachelor project (Computer Systems Engineering). Engineered an end-to-end system predicting Big Five traits from short videos using computer vision (facial action units), audio (PyAudioAnalysis), and NLP (BERT) on First Impressions V2 (10K videos), with LSTNet and XGBoost late fusion (MAE 0.0489). Built a full-stack Node.js/Express/MongoDB app with secure auth, upload pipeline, admin dashboard, and radar-chart visualization.",    links: [
      { name: "Graduation Thesis", url: "https://drive.google.com/file/d/1YwWHlXiXh3pCK1MlZxDT9HE5RtQQfu_C/view" },
      { name: "GitHub", url: "https://github.com/Mariam-Fathi/multimodal-personality-analysis.git" },
    ],
  },
  {
    id: "sanayat",
    title: "Sanayat",
    role: "Mobile Engineer",
    description:"As the mobile engineer on Sanayat, an on-demand handyman platform, I designed and built both client applications from the ground up. The Customer App enables users to discover handymen, create broadcast or direct bookings, track jobs in real time, chat with providers, complete payments, and manage wallet and reviews. The Handyman App gives providers a job feed with bidding and direct/scheduled requests, availability and calendar management, verification onboarding, in-app chat and location sharing, wallet and payouts, and a referral program. Both apps are built with Expo and React Native in a TypeScript monorepo, sharing types and i18n (English and Arabic) with the backend, and use NativeWind, React Query, and Zustand for a consistent, maintainable codebase. The result is a production-ready, two-sided marketplace experience with end-to-end flows for booking, payment, and communication.",
    links: [
      // { name: "GitHub", url: "#" },
    ],
  },
  {
    id: "iot-portal",
    title: "Operational Portal",
    role: "Full-Stack Engineer",
    description:"Built a real-time React dashboard for monitoring room devices with Appwrite as backend and Appwrite Realtime for live updates. Implemented Dashboard (search, filters by device/status/battery, pagination, summary stats), Manage Devices (full CRUD), and Analytics (Recharts pie/bar charts). Added critical-event detection, in-app notification panel, and optional WhatsApp alerts (Twilio/Green API/Evolution API) for device failures and low battery. Delivered sample-data import script and responsive UI with Tailwind."
,    links: [
      { name: "Live", url: "https://operational-portal.vercel.app/" },
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
    title: "Wheelchair EL-Haram Dashboard ",
    role: "Frontend Engineer",
    description:"Developed a secure, multilingual (EN/AR/UR) React/TypeScript admin dashboard for wheelchair service operations. Delivered full CRUD for contracted partners, assets, services, and pricing; real-time dashboard with KPIs and maps; trip tracking and detail views; JWT auth, RBAC-ready flows, and CSV/PDF export. Integrated REST APIs, TanStack Query, Tailwind CSS, and Google Maps in a responsive, RTL-capable SPA.",
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
    // Project 5: Smart Key
    background: "#F9E7C9",
    headline: "#6A0610",
    headlineStroke: "#6A0610",
    body: "#280B0B",
    link: "#6A0610",
    accent: "#8A9EA7",
  },
  {
    // Project 6: Smart Key Operational Portal
    background: "#6A0610",
    headline: "#F9E7C9",
    headlineStroke: "#F9E7C9",
    body: "#F9E7C9",
    link: "#F9E7C9",
    accent: "#8A9EA7",
  },
  {
    // Project 7: Sanayat
    background: "#8A9EA7",
    headline: "#280B0B",
    headlineStroke: "#280B0B",
    body: "#280B0B",
    link: "#280B0B",
    accent: "#6A0610",
  },
  {
    // Project 8: Wheelchair Dashboard
    background: "#F9E7C9",
    headline: "#6A0610",
    headlineStroke: "#6A0610",
    body: "#280B0B",
    link: "#6A0610",
    accent: "#8A9EA7",
  },
];

export default function GalleryShowcase({
  scrollContainer = null,
}: ProjectsProps) {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [linksYPosition, setLinksYPosition] = useState<number | null>(null);
  
  // Get navigation Y position to align project links (centered between top and line)
  useEffect(() => {
    const updateLinksPosition = () => {
      const lineData = getHeroLineData();
      if (lineData) {
        // Center links in the space between top of viewport and the line (same as nav links)
        const navY = lineData.lineY / 2;
        setLinksYPosition(navY);
      }
    };
    
    // Initial load
    updateLinksPosition();
    
    // Update on resize
    window.addEventListener("resize", updateLinksPosition);
    return () => window.removeEventListener("resize", updateLinksPosition);
  }, []);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const cardElements = cardRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (!cardElements.length || !cardElements[0] || !container.current) return;

      // Find the scrollable parent (content-section)
      let scrollableParent: HTMLElement | null = container.current.parentElement;
      while (scrollableParent && !scrollableParent.classList.contains("content-section")) {
        scrollableParent = scrollableParent.parentElement;
      }

      // Set initial positions - all cards start from top with same top position
      for (let i = 0; i < cardElements.length; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { 
          scale: 1, 
          rotation: 0,
          y: i === 0 ? "0%" : "-100%"
        });
      }

      const totalCards = cardElements.length;
      const scrollHeight = scrollableParent?.scrollHeight || window.innerHeight;
      const viewportHeight = scrollableParent?.clientHeight || window.innerHeight;
      
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${viewportHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          invalidateOnRefresh: true,
          scroller: scrollableParent || undefined,
        },
      });

      // Animate transitions between cards
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;

        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );


  return (
    <section
      id="projects"
      className="relative w-full"
      style={{
        minHeight: `${projects.length * 100}vh`,
        height: `${projects.length * 100}vh`,
        background: "#F5ECE1",
      }}
    >
      <div ref={container} className="relative w-full" style={{ height: "100vh" }}>
        <div className="sticky-cards relative flex h-full w-full items-start justify-center overflow-hidden px-0">
          <div className="relative h-full w-full overflow-hidden">
            {projects.map((project, index) => {
              // Each project uses its dedicated palette (project[0] = palette[0], project[1] = palette[1], etc.)
              const colors = cardPalette[index];

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={cn(
                    "absolute top-0 left-0 right-0 h-full w-full px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 flex flex-col",
                    "overflow-hidden"
                  )}
                      style={{
                        background: colors.background,
                      }}
                    >
                  {/* Links Section — fixed at nav Y on desktop, in-flow on mobile */}
                  {project.links.length > 0 && (
                    <div
                      className="hidden lg:flex absolute left-6 md:left-8 lg:left-12 flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 items-baseline justify-start"
                      style={{
                        position: linksYPosition !== null ? "fixed" : "absolute",
                        top: linksYPosition !== null ? `${linksYPosition}px` : undefined,
                        transform: linksYPosition !== null ? "translateY(-50%)" : undefined,
                        zIndex: 20,
                      }}
                    >
                      {project.links.map((link, linkIndex) => {
                        const linkColor = colors.headline;
                        const linkClassName = "project-link uppercase tracking-[0.15em] font-medium transition-opacity hover:opacity-70 inline-flex items-center gap-1";
                        const linkStyle = { fontFamily: '"Space Grotesk", "Inter", sans-serif' };

                        if (link.isGrouped && link.groupedLinks) {
                          const prefix = link.name.split(":")[0];
                          return (
                            <div key={linkIndex} className="project-link uppercase tracking-[0.15em] font-medium" style={{ color: linkColor, ...linkStyle }}>
                              <span>{prefix}: </span>
                              {link.groupedLinks.map((groupedLink, idx) => (
                                <React.Fragment key={idx}>
                                  <a href={groupedLink.url} target="_blank" rel="noopener noreferrer" className="project-link transition-opacity hover:opacity-70 inline-flex items-center gap-1" style={{ color: linkColor, ...linkStyle }}>
                                    [{idx + 1}]<ExternalLink className="w-3 h-3" />
                                  </a>
                                  {idx < link.groupedLinks!.length - 1 && ", "}
                                </React.Fragment>
                              ))}
                            </div>
                          );
                        }
                        return (
                          <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className={linkClassName} style={{ color: linkColor, ...linkStyle }}>
                            {link.name}<ExternalLink className="w-3 h-3" />
                          </a>
                        );
                      })}
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="flex-1 flex flex-col lg:flex-row lg:items-end gap-6 md:gap-8">
                    {/* Text Section */}
                    <div
                      className="flex flex-col gap-3 md:gap-4 text-left flex-1 pb-6 lg:pb-6 order-1 lg:order-2 mt-10 lg:mt-0"
                      style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}
                    >
                      {/* Role */}
                      <p
                        className="text-[10px] md:text-xs tracking-[0.35em] uppercase"
                        style={{ color: colors.link }}
                      >
                        {project.role}
                      </p>

                      {/* Project Title */}
                      <h3
                        className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] leading-tight"
                        style={{ fontFamily: '"Momo Trust Display", "Stack Sans", sans-serif', color: colors.headline }}
                      >
                        {project.title}
                      </h3>

                      {/* Short Description */}
                      <p
                        className="text-xs md:text-sm leading-relaxed font-light max-w-2xl"
                        style={{ color: colors.body }}
                      >
                        {project.description}
                      </p>

                      {/* Links — in-flow below description on mobile only */}
                      {project.links.length > 0 && (
                        <div className="flex lg:hidden flex-wrap gap-x-4 gap-y-2 items-baseline mt-2">
                          {project.links.map((link, linkIndex) => {
                            const linkColor = colors.headline;
                            const linkClassName = "project-link-mobile uppercase tracking-[0.12em] font-medium transition-opacity hover:opacity-70 inline-flex items-center gap-1";
                            const linkStyle = { fontFamily: '"Space Grotesk", "Inter", sans-serif' };

                            if (link.isGrouped && link.groupedLinks) {
                              const prefix = link.name.split(":")[0];
                              return (
                                <div key={linkIndex} className="project-link-mobile uppercase tracking-[0.12em] font-medium" style={{ color: linkColor, ...linkStyle }}>
                                  <span>{prefix}: </span>
                                  {link.groupedLinks.map((groupedLink, idx) => (
                                    <React.Fragment key={idx}>
                                      <a href={groupedLink.url} target="_blank" rel="noopener noreferrer" className="project-link-mobile transition-opacity hover:opacity-70 inline-flex items-center gap-1" style={{ color: linkColor, ...linkStyle }}>
                                        [{idx + 1}]<ExternalLink className="w-3 h-3" />
                                      </a>
                                      {idx < link.groupedLinks!.length - 1 && ", "}
                                    </React.Fragment>
                                  ))}
                                </div>
                              );
                            }
                            return (
                              <a key={linkIndex} href={link.url} target="_blank" rel="noopener noreferrer" className={linkClassName} style={{ color: linkColor, ...linkStyle }}>
                                {link.name}<ExternalLink className="w-3 h-3" />
                              </a>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Big Project Number - Below text on mobile, left on desktop */}
                    <div
                      className="select-none leading-none tracking-tight flex-shrink-0 order-2 lg:order-1 lg:translate-y-[8%]"
                            style={{
                              fontFamily:
                                '"Momo Trust Display", "Stack Sans", sans-serif',
                              fontWeight: 900,
                              WebkitTextStroke: `1px ${colors.headlineStroke}`,
                              color: colors.headline,
                        fontSize: "clamp(16rem, 40vw, 35rem)",
                              lineHeight: 1,
                            } as React.CSSProperties}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style jsx>{`
        .project-link {
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
        }
        .project-link-mobile {
          font-size: clamp(0.55rem, 2.5vw, 0.75rem);
        }
      `}</style>
    </section>
  );
}
