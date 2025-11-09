"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectsProps = {
  isActive?: boolean;
  scrollContainer?: HTMLDivElement | null;
};

const projects = [
  {
    id: "smart-key",
    title: "Smart Key Hospitality Platform",
    role: "Lead Mobile Engineer",
    description:
      "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain.",
    image: "/images/sk.png",
    tags: ["IoT", "Mobile", "React Native"],
    links: [
      {
        name: "Long Beach App",
        url: "https://play.google.com/store/apps/details?id=com.smartkeylb",
      },
      {
        name: "Almadiafa App",
        url: "https://play.google.com/store/apps/details?id=com.madiafaaa",
      },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Data Quality & Analytics",
    role: "Data Engineer & Analyst",
    description:
      "Analyzed 2.2M+ records with comprehensive data quality auditing, achieving 87.4% memory reduction. Identified 38.19% suspicious records and developed pattern recognition algorithms for regulatory review.",
    image: "/images/kaggle.png",
    tags: ["Data Engineering", "Python", "Analytics"],
    links: [
      {
        name: "Memory Analysis",
        url: "https://www.kaggle.com/code/mariamfathiamin/87-4-memory-opt-real-estate-suspicious-patterns",
      },
      {
        name: "Quality Audit",
        url: "https://www.kaggle.com/code/mariamfathiamin/38-19-suspicious-records",
      },
    ],
  },
  {
    id: "personality-ai",
    title: "Multimodal Personality Analysis System",
    role: "AI Research Lead",
    description:
      "Engineered automated system predicting Big Five personality traits through multimodal video analysis using LSTNet, PyAudioAnalysis, and BERT with XGBoost late fusion strategy.",
    image: "/images/graduation.png",
    tags: ["AI", "Computer Vision", "Research"],
    links: [
      {
        name: "GitHub",
        url: "https://github.com/Mariam-Fathi/multimodal-personality-analysis",
      },
      {
        name: "Research Book",
        url: "https://drive.google.com/file/d/1YwWHlXiXh3pCK1MlZxDT9HE5RtQQfu_C/view?usp=drive_link",
      },
    ],
  },
  {
    id: "sales-ai",
    title: "Sales Estimation Automation Tool",
    role: "Full-Stack Developer",
    description:
      "Internal tool leveraging Hugging Face models to analyze project descriptions and generate instant cost estimations, achieving 85% confidence and reducing estimation time from days to minutes.",
    image: "/images/ai.png",
    tags: ["AI", "Automation", "CRM"],
    links: [],
  },
  {
    id: "homi-app",
    title: "Homi Real Estate App",
    role: "Full-Stack Developer",
    description:
      "Production-ready PropTech solution with Google OAuth, advanced property search, real-time notifications, and Stripe payment integration. Features personalized tracking and intelligent preference analysis.",
    image: "/images/homi.png",
    tags: ["React Native", "Appwrite", "Stripe"],
    links: [
      { name: "GitHub", url: "https://github.com/Mariam-Fathi/homi-app" },
      {
        name: "Live Preview",
        url: "https://expo.dev/accounts/mariamfathi/projects/homi/builds/4c066908-834c-46f5-a581-bb60afcf80f2",
      },
    ],
  },
  {
    id: "homi-dashboard",
    title: "Homi Real Estate Dashboard",
    role: "Full-Stack Developer",
    description:
      "Comprehensive analytics dashboard tracking revenue metrics, user engagement, property performance, and platform health. Implements smart caching and transforms raw data into actionable business intelligence.",
    image: "/images/homi-dashboard.png",
    tags: ["Analytics", "Next.js", "Dashboard"],
    links: [
      { name: "GitHub", url: "https://github.com/Mariam-Fathi/homi-analytics" },
      { name: "Live Demo", url: "https://homi-analytics.vercel.app/" },
    ],
  },
];

const cardColors = ["#508A8C", "#295740", "#AE6455", "#D2431B", "#E0BB46", "#0E2815"];

export default function GalleryShowcase({
  isActive = true,
  scrollContainer = null,
}: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const projectRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [spacerHeight, setSpacerHeight] = useState<number>(0);

  useGSAP(
    () => {
      const scrollerElement = scrollContainer ?? containerRef.current;

      if (!isActive) {
        setSpacerHeight(0);
        return;
      }

      if (
        !pinContainerRef.current ||
        !projectsWrapperRef.current ||
        !scrollerElement
      )
        return;

      const cards = projectRefsRef.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (!cards.length) {
        setSpacerHeight(0);
        return;
      }

      const baseHeight =
        pinContainerRef.current.offsetHeight || window.innerHeight || 1080;
      const totalTransitions = Math.max(cards.length - 1, 0);

      setSpacerHeight(scrollContainer ? 0 : totalTransitions * baseHeight);

      gsap.set(projectsWrapperRef.current, {
        width: "100%",
        height: `${baseHeight}px`,
      });

      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 110,
          zIndex: index + 1,
          autoAlpha: 1,
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        timeline.to(card, { yPercent: 0, zIndex: cards.length + index }, index - 1);
      });

      const useTransformPin =
        typeof window !== "undefined" &&
        scrollerElement instanceof HTMLElement &&
        scrollerElement !== document.body &&
        scrollerElement !== document.documentElement;

      const pinTrigger = ScrollTrigger.create({
        trigger: pinContainerRef.current,
        scroller: scrollerElement,
        start: `top top`,
        end: `+=${totalTransitions * baseHeight}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        snap: totalTransitions > 0 ? 1 / totalTransitions : undefined,
        pinSpacing: true,
        pinType: useTransformPin ? "transform" : "fixed",
        invalidateOnRefresh: true,
        animation: timeline,
      });

      const handleResize = () => {
        const nextHeight =
          pinContainerRef.current?.offsetHeight || window.innerHeight || baseHeight;

        setSpacerHeight(
          scrollContainer ? 0 : Math.max((cards.length - 1) * nextHeight, 0)
        );

        gsap.set(projectsWrapperRef.current, {
          height: `${nextHeight}px`,
        });

        cards.forEach((card, index) => {
          gsap.set(card, {
            yPercent: index === 0 ? 0 : 110,
            zIndex: index + 1,
          });
        });

        timeline.invalidate().restart();
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      ScrollTrigger.refresh();

      return () => {
        pinTrigger?.kill();
        timeline.kill();
        window.removeEventListener("resize", handleResize);
        setSpacerHeight(0);
      };
    },
    { scope: containerRef, dependencies: [isActive, scrollContainer] }
  );

  const containerClassName = scrollContainer
    ? "relative min-h-full w-full"
    : "relative h-[100dvh] w-full overflow-y-auto overscroll-contain no-visible-scrollbar";

  return (
    <section
      id="projects"
      className="relative h-full w-full overflow-x-hidden bg-[#9EA793]"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        ref={containerRef}
        className={containerClassName}
      >
        {/* Pinned Container - Full Viewport Fixed */}
        <div
          ref={pinContainerRef}
          className="relative w-full bg-[#9EA793]"
          style={{
            height: "100dvh",
            minHeight: "100dvh",
            paddingTop: "6vh",
            paddingBottom: "6vh",
            overflow: "hidden",
          }}
        >
          {/* Projects Wrapper - Horizontal Layout with Blank Pages */}
          <div
            ref={projectsWrapperRef}
            className="absolute inset-0 w-full h-full flex items-center justify-center"
            style={{
              transformOrigin: "center center",
            }}
          >
            {projects.map((project, index) => {
              // Store ref for individual project blur control
              if (!projectRefsRef.current[index]) {
                projectRefsRef.current[index] = null;
              }
              
              return (
              <React.Fragment key={project.id}>
                {/* Project */}
                <div
                  ref={(el) => {
                    projectRefsRef.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    marginTop: `${index * 12}px`,
                  }}
                >
                  <div className="w-full max-w-[1200px] h-[70vh] md:h-[72vh] lg:h-[75vh] mx-auto px-4 md:px-8 lg:px-12 xl:px-16 flex flex-col relative">
                    {/* Rounded Card Container with Hero Background */}
                    <div 
                      className="w-full h-full rounded-3xl md:rounded-[2rem] lg:rounded-[3rem] p-6 md:p-8 lg:p-12 relative overflow-hidden"
                      style={{
                        background: cardColors[index % cardColors.length],
                      }}
                    >
                      {/* Main Content */}
                      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 items-stretch relative z-20 h-full">
                        {/* Left - Number & Description */}
                        <div className="flex flex-col justify-end items-start gap-8">
                          <div
                            className="text-[140px] md:text-[200px] lg:text-[260px] xl:text-[320px] font-bold text-orange-500 leading-none tracking-tight select-none"
                            style={{
                              fontFamily: "Dosis, sans-serif",
                              fontWeight: 900,
                              WebkitTextStroke: "1px rgba(255,255,255,0.08)",
                            } as React.CSSProperties}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div className="max-w-md text-left">
                            <p className="text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed tracking-normal">
                              {project.description}
                            </p>
                          </div>
                        </div>

                        {/* Right - Image & Links */}
                        <div className="relative flex flex-col justify-end items-center h-full">
                          <div className="w-full flex-1 flex items-end justify-center overflow-hidden pr-16 lg:pr-24">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          {project.links.length > 0 && (
                            <div className="absolute top-1/2 right-4 lg:right-10 -translate-y-1/2 flex flex-col gap-6">
                              {project.links.map((link, i) => (
                                <a
                                  key={i}
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-white/70 hover:text-white tracking-[0.4em] text-sm md:text-base font-light transition-all duration-300 origin-center"
                                  style={{ writingMode: "vertical-rl" }}
                                >
                                  {link.name}
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            )})}
          </div>
        </div>
        {!scrollContainer && spacerHeight > 0 ? (
          <div
            aria-hidden="true"
            style={{ height: spacerHeight }}
            className="pointer-events-none w-full"
          />
        ) : null}
      </div>
    </section>
  );
}
