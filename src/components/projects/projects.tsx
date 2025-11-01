"use client";
import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

export default function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const magazineScrollRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectPagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);

  // Smooth transition from experience section
  useGSAP(
    () => {
      if (!sectionRef.current || !transitionOverlayRef.current) return;

      const overlay = document.createElement("div");
      overlay.className = "fixed inset-0 bg-black z-40 pointer-events-none";
      transitionOverlayRef.current = overlay;
      document.body.appendChild(overlay);

      gsap.set(transitionOverlayRef.current, {
        opacity: 0.85,
      });

      const transitionTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "+=100vh",
          scrub: 2,
          anticipatePin: 1,
        },
      });

      transitionTl.to(
        transitionOverlayRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      gsap.set(sectionRef.current, {
        opacity: 0.2,
        filter: "blur(8px)",
      });

      transitionTl.to(
        sectionRef.current,
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
        },
        0
      );

      return () => {
        if (transitionOverlayRef.current && document.body.contains(transitionOverlayRef.current)) {
          document.body.removeChild(transitionOverlayRef.current);
        }
      };
    },
    { scope: containerRef }
  );

  // Title and subtitle animation
  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current || !subtitleRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          x: -150,
          rotation: -3,
          filter: "blur(20px)",
          scale: 0.95,
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 2,
          ease: "power3.out",
        }
      ).fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          x: -80,
          y: 20,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.5"
      );
    },
    { scope: containerRef }
  );

  // Horizontal magazine scroll - flipping through pages
  useGSAP(
    () => {
      if (!pinContainerRef.current || !magazineScrollRef.current) return;

      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const pageWidth = viewportWidth;
      const totalWidth = pageWidth * projects.length;

      // Set initial state for horizontal scroll
      gsap.set(magazineScrollRef.current, {
        x: 0,
        transformOrigin: "left center",
      });

      // Calculate adjusted total width with space for first card
      const initialSpace = pageWidth * 0.2; // 20% extra space for first card
      const adjustedTotalWidth = totalWidth + initialSpace;

      // Create main timeline for horizontal scrolling
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top top",
          end: () => `+=${adjustedTotalWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Animate horizontal movement - start with offset for first card space
      mainTimeline.to(
        magazineScrollRef.current,
        {
          x: -adjustedTotalWidth + pageWidth,
          duration: 1,
          ease: "none",
        },
        0
      );

      // Force clear all cards initially on mobile - ensure no blur persists
      const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
      if (isMobile) {
        projectPagesRef.current.forEach((page) => {
          if (page) {
            gsap.set(page, {
              filter: "blur(0px)",
            });
          }
        });
      }

      // Animate each project page with magazine-style entrance
      // Give each card proper time to appear, settle, and be readable
      projects.forEach((project, index) => {
        const projectPage = projectPagesRef.current[index];
        if (!projectPage) return;

        // Calculate scroll positions as normalized progress (0-1)
        // Each card gets equal space, but first card starts earlier
        let pageStart, pageDuration;
        
        if (index === 0) {
          // First card: starts immediately, gets bonus initial space
          pageStart = 0;
          // First card duration = initial space + normal page width
          pageDuration = (initialSpace + pageWidth) / adjustedTotalWidth;
        } else {
          // Other cards: evenly distributed after first card space
          const accumulatedSpace = initialSpace + pageWidth; // First card's space
          const previousCardsSpace = (index - 1) * pageWidth; // Space for previous cards
          const scrollPosition = (accumulatedSpace + previousCardsSpace) / adjustedTotalWidth;
          
          pageStart = scrollPosition;
          pageDuration = pageWidth / adjustedTotalWidth; // Equal duration for each card
        }
        
        // Ensure values are within valid range
        pageStart = Math.max(0, Math.min(1, pageStart));
        pageDuration = Math.max(0, Math.min(1, pageDuration));

        // Initial state - page slides in from the side (horizontal movement)
        // For first card, start it visible and clear immediately
        if (index === 0) {
          gsap.set(projectPage, {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            x: 0,
            filter: "blur(0px)",
          });
          
          // First card holds visible for extended period (85% of its duration)
          mainTimeline.to(
            projectPage,
            {
              opacity: 1,
              scale: 1,
              rotationY: 0,
              x: 0,
              filter: "blur(0px)",
              duration: pageDuration * 0.85,
              ease: "none",
            },
            pageStart
          );

          // First card exits to the left (15% of its duration)
          const exitStart = pageStart + pageDuration * 0.85;
          const isMobileExit = typeof window !== 'undefined' && window.innerWidth < 768;
          
          mainTimeline.to(
            projectPage,
            {
              opacity: 0,
              scale: 0.95,
              rotationY: -10,
              x: -100,
              filter: isMobileExit ? "blur(0px)" : "blur(8px)", // No blur on mobile
              duration: pageDuration * 0.15,
              ease: "power2.in",
            },
            exitStart
          );
        } else {
          // Special handling for second card - start visible earlier, faster entry
          const isSecondCard = index === 1;
          
          // Check if mobile - less blur on mobile
          const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
          
          if (isSecondCard) {
            // Second card: Start it visible but offset, then slide in quickly
            gsap.set(projectPage, {
              opacity: 0.9, // Already visible
              scale: 0.95,
              rotationY: 5,
              x: 100, // Slightly to the right, but closer
              filter: isMobile ? "blur(0px)" : "blur(2px)", // No blur on mobile
            });

            // Quick entry - faster and sooner
            const entryStart = pageStart; // Start immediately when card section begins
            const entryDuration = pageDuration * 0.12; // Faster entry

            mainTimeline.to(
              projectPage,
              {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                x: 0,
                filter: "blur(0px)",
                duration: entryDuration,
                ease: "power2.out",
              },
              entryStart
            );

            // Long hold time - plenty of time to read
            const holdStart = entryStart + entryDuration;
            const holdDuration = pageDuration * 0.73; // Much longer hold

            mainTimeline.to(
              projectPage,
              {
                opacity: 1,
                scale: 1,
                rotationY: 0,
                x: 0,
                filter: "blur(0px)",
                duration: holdDuration,
                ease: "none",
              },
              holdStart
            );

            // Exit
            const exitStart = holdStart + holdDuration;
            const isMobileExit = typeof window !== 'undefined' && window.innerWidth < 768;
            
            mainTimeline.to(
              projectPage,
              {
                opacity: 0,
                scale: 0.95,
                rotationY: -10,
                x: -100,
                filter: isMobileExit ? "blur(0px)" : "blur(8px)", // No blur on mobile
                duration: pageDuration * 0.15,
                ease: "power2.in",
              },
              exitStart
            );
          } else {
            // Third card and beyond: start visible earlier with minimal blur for smooth appearance
            const isThirdCard = index === 2;
            
            if (isThirdCard || index >= 2) {
              // Third card and beyond: Start visible but offset, then slide in quickly
              // Check if mobile - less blur on mobile
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              
              gsap.set(projectPage, {
                opacity: 0.85, // Already visible
                scale: 0.95,
                rotationY: 5,
                x: 100, // Slightly to the right, but closer
                filter: isMobile ? "blur(0px)" : "blur(3px)", // No blur on mobile
              });

              // Quick entry - faster and sooner
              const entryStart = pageStart; // Start immediately
              const entryDuration = pageDuration * 0.12; // Faster entry

              mainTimeline.to(
                projectPage,
                {
                  opacity: 1,
                  scale: 1,
                  rotationY: 0,
                  x: 0,
                  filter: "blur(0px)",
                  duration: entryDuration,
                  ease: "power2.out",
                },
                entryStart
              );

              // Long hold time - plenty of time to read
              const holdStart = entryStart + entryDuration;
              const holdDuration = pageDuration * 0.73; // Much longer hold

              mainTimeline.to(
                projectPage,
                {
                  opacity: 1,
                  scale: 1,
                  rotationY: 0,
                  x: 0,
                  filter: "blur(0px)",
                  duration: holdDuration,
                  ease: "none",
                },
                holdStart
              );

              // Exit
              const exitStart = holdStart + holdDuration;
              mainTimeline.to(
                projectPage,
                {
                  opacity: 0,
                  scale: 0.95,
                  rotationY: -10,
                  x: -100,
                  filter: "blur(8px)",
                  duration: pageDuration * 0.15,
                  ease: "power2.in",
                },
                exitStart
              );
            } else {
              // Fallback for any other cards
              // Check if mobile - less blur on mobile
              const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
              
              gsap.set(projectPage, {
                opacity: 0,
                scale: 0.9,
                rotationY: 15,
                x: 150,
                filter: isMobile ? "blur(0px)" : "blur(10px)", // No blur on mobile
              });

              const entryStart = pageStart;
              const entryDuration = pageDuration * 0.12;

              mainTimeline.to(
                projectPage,
                {
                  opacity: 1,
                  scale: 1,
                  rotationY: 0,
                  x: 0,
                  filter: "blur(0px)",
                  duration: entryDuration,
                  ease: "power2.out",
                },
                entryStart
              );

              const holdStart = entryStart + entryDuration;
              const holdDuration = pageDuration * 0.73;

              mainTimeline.to(
                projectPage,
                {
                  opacity: 1,
                  scale: 1,
                  rotationY: 0,
                  x: 0,
                  filter: "blur(0px)",
                  duration: holdDuration,
                  ease: "none",
                },
                holdStart
              );

              const exitStart = holdStart + holdDuration;
              mainTimeline.to(
                projectPage,
                {
                  opacity: 0,
                  scale: 0.95,
                  rotationY: -10,
                  x: -100,
                  filter: "blur(8px)",
                  duration: pageDuration * 0.15,
                  ease: "power2.in",
                },
                exitStart
              );
            }
          }
        }
      });
    },
    { scope: containerRef, dependencies: [projects] }
  );

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="w-full bg-black relative overflow-hidden"
      style={{
        minHeight: "100vh",
      }}
    >
      <div ref={containerRef} className="w-full">
        {/* Header Section */}
        <div
          className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
          }}
        >
          <div className="max-w-7xl mx-auto">
          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] font-light text-white mb-4 sm:mb-6 tracking-tight leading-none opacity-0"
          >
            PROJECTS
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-blue-500 mb-6 sm:mb-8" />
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed tracking-wide opacity-0 px-4 sm:px-0"
          >
            A curated selection of recent work across mobile, AI and web.
          </p>
          </div>
        </div>

        {/* Horizontal Magazine Scroll Container */}
        <div
          ref={pinContainerRef}
          className="relative w-full h-screen bg-black overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 50%, #000000 100%)',
          }}
        >
          {/* Horizontal Scrolling Magazine */}
          <div
            ref={magazineScrollRef}
            className="relative h-full flex"
            style={{
              width: `${projects.length * 100}vw`,
            }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id}
                ref={(el) => {
                  projectPagesRef.current[index] = el;
                }}
                className="relative flex-shrink-0 w-screen h-full flex items-center justify-center"
                style={{
                  transformStyle: "preserve-3d",
                  willChange: "transform, opacity, filter",
                }}
              >
                {/* Magazine Page Layout - Centered */}
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 h-full flex items-center justify-center py-8 sm:py-12 md:py-16 overflow-y-auto">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 w-full items-center justify-center">
                    {/* Left Side - Text Content (Magazine Style) */}
                    <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7 order-2 lg:order-1">
                      {/* Page Number - Magazine Style */}
                      <div className="text-[10px] sm:text-xs font-light text-gray-500 tracking-[0.3em] sm:tracking-[0.4em] uppercase">
                        {String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
                      </div>

                      {/* Role - Magazine Caption */}
                      <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20 bg-white/5 rounded-full">
                        <span className="text-[10px] sm:text-xs font-light text-gray-400 tracking-[0.2em] sm:tracking-[0.25em] uppercase">
                          {project.role}
                        </span>
                      </div>

                      {/* Title - Magazine Headline (Reduced Size) */}
                      <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white leading-tight tracking-tight break-words">
                        {project.title}
                      </h3>

                      {/* Description - Magazine Body Text */}
                      <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed tracking-wide max-w-xl">
                        {project.description}
                      </p>

                      {/* Tags - Magazine Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {project.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-2 sm:px-3 py-1 text-[10px] sm:text-xs md:text-sm font-light text-gray-400 border border-white/10 rounded-full tracking-wide"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Links - Magazine Links */}
                      {project.links.length > 0 && (
                        <div className="flex flex-col gap-2 pt-3 sm:pt-4">
                          {project.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-light tracking-wide transition-colors duration-300 group max-w-fit"
                            >
                              <span className="text-xs sm:text-sm md:text-base">{link.name}</span>
                              <svg
                                className="w-3 h-3 sm:w-4 sm:h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Decorative Line */}
                      <div className="w-16 sm:w-20 h-0.5 bg-gradient-to-r from-blue-500 to-transparent opacity-60 pt-2" />
                    </div>

                    {/* Right Side - Image (Magazine Style) */}
                    <div className="relative order-1 lg:order-2 flex items-center justify-center">
                      {/* Magazine Image Frame */}
                      <div className="relative w-full">
                        {/* Decorative corners - magazine style */}
                        <div className="absolute -top-2 sm:-top-3 -left-2 sm:-left-3 w-8 h-8 sm:w-12 sm:h-12 border-t border-l border-white/20 pointer-events-none" />
                        <div className="absolute -bottom-2 sm:-bottom-3 -right-2 sm:-right-3 w-8 h-8 sm:w-12 sm:h-12 border-b border-r border-white/20 pointer-events-none" />

                        <div className="relative overflow-hidden border border-white/10 bg-white/5 p-3 sm:p-4 md:p-6">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-auto object-contain"
                            style={{
                              maxHeight: '40vh',
                              objectFit: 'contain',
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}