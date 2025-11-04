"use client";
import React, { useRef } from "react";
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

export default function GalleryShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const previousProjectIndexRef = useRef<number>(0);
  const projectRefsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinContainerRef.current ||
        !titleRef.current ||
        !subtitleRef.current ||
        !headerRef.current ||
        !projectsWrapperRef.current
      )
        return;

      // Use dynamic viewport dimensions for horizontal scrolling
      const windowHeight = window.innerHeight || window.visualViewport?.height || 800;
      const windowWidth = window.innerWidth || 1920;
      const isMobile = windowWidth < 768;
      const navbarWidth = isMobile ? 80 : 112;
      // Horizontal scroll: each project + half blank page between them
      // Each project gets 1 viewport width + 0.5 blank page (except last project)
      const scrollDistance = projects.length * windowWidth * 1.5; // Each project has 1.5 viewport widths (project + half blank)
      const navbarOffset = 0; // Start from top of viewport

      // Initial states - Title visible and clear
      gsap.set([titleRef.current, subtitleRef.current, headerRef.current], {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      });

      // Calculate responsive navbar width
      const calculateNavbarWidth = () => {
        return window.innerWidth < 768 ? 80 : 112;
      };
      
      const navbarPadding = calculateNavbarWidth();
      
      // Initial states - Projects wrapper (no blur, position control only)
      gsap.set(projectsWrapperRef.current, {
        x: 0, // Start at x:0 for horizontal
        y: 0,
      });
      
      // Initialize individual projects - all start hidden (ready for blink effect)
      projects.forEach((_, index) => {
        const projectRef = projectRefsRef.current[index];
        if (projectRef) {
          gsap.set(projectRef, {
            opacity: 0, // Start hidden
            filter: "blur(0px)", // No blur for blink effect
          });
        }
        
      });
      
      // No padding needed - navbar is hidden during projects section
      if (projectsWrapperRef.current) {
        projectsWrapperRef.current.style.paddingLeft = '0px';
        projectsWrapperRef.current.style.paddingTop = '0px';
      }

      // Get navbar element for smooth hide/show during transitions
      const navbarElement = document.querySelector("nav.fixed") ||
        (document.querySelector('nav[class*="fixed"]') as HTMLElement);

      // Main ScrollTrigger - Account for navbar/platform at top
      const pinTrigger = ScrollTrigger.create({
          trigger: pinContainerRef.current,
        start: `top-=0 top`,
        end: `+=${scrollDistance}`,
          pin: true,
        scrub: 6.0, // Slow motion scrolling - very smooth and cinematic
          anticipatePin: 1,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          // === ACT 1: Title Appears and Settles === (0-12%)
          if (progress <= 0.12) {
            const titleProgress = progress / 0.12;
            // Appear from blur (0-50% of title phase)
            if (titleProgress <= 0.50) {
              const appearEase = titleProgress / 0.50;
              const ease = 1 - Math.pow(1 - appearEase, 3); // Smooth ease-out
              gsap.set([titleRef.current, subtitleRef.current, headerRef.current], {
                opacity: ease,
                filter: `blur(${25 * (1 - ease)}px)`,
                y: (1 - ease) * 20,
              });
            }
            // Hold and settle (50-100% of title phase)
            else {
              gsap.set([titleRef.current, subtitleRef.current, headerRef.current], {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
              });
            }
          }
          // === ACT 2: Title Vanishes with Elegant Blur === (12-25%)
          else if (progress <= 0.25) {
            const vanishProgress = (progress - 0.12) / 0.13;
            // Smooth vanish with cinematic blur and upward motion
            const vanishEase = Math.pow(vanishProgress, 1.5); // Slower start, faster end
            gsap.set([titleRef.current, subtitleRef.current, headerRef.current], {
              opacity: 1 - vanishEase,
              filter: `blur(${vanishEase * 25}px)`,
              y: -vanishEase * 40,
              scale: 1 - vanishEase * 0.05,
              visibility: "visible", // Ensure visible for reverse animation
            });
            
            // Hide navbar smoothly during title vanishing
            if (navbarElement) {
              const navbarHideProgress = Math.min(vanishProgress * 1.2, 1); // Slightly faster
              gsap.set(navbarElement, {
                opacity: 1 - navbarHideProgress,
                x: -navbarHideProgress * 120,
                pointerEvents: navbarHideProgress >= 0.8 ? "none" : "auto",
              });
            }
          }
          // === ACT 3: First Project Enters from Blur to Focus === (25-50%)
          else if (progress <= 0.50) {
            // Hide title completely (but keep visibility so it can reappear when scrolling back)
            gsap.set([titleRef.current, subtitleRef.current, headerRef.current], {
              opacity: 0,
              filter: "blur(25px)",
              y: -40,
              scale: 0.95,
              visibility: "visible", // Keep visible so it can reappear
            });
            
            // Hide navbar completely
            if (navbarElement) {
              gsap.set(navbarElement, {
                opacity: 0,
                x: -120,
                pointerEvents: "none",
              });
            }
            
            // Reset project index tracker for first entrance
            previousProjectIndexRef.current = 0;
            
            // First project blink entrance - synced appearance
            const projectEnterProgress = (progress - 0.25) / 0.25;
            // Fast blink open effect - synchronized with scroll progress
            const enterEase = Math.pow(Math.min(projectEnterProgress, 1), 1.8);
            
            // First project appears at x:0, synced with opacity fade
            gsap.set(projectsWrapperRef.current, {
              x: 0, // First project stays at x:0 during entrance
              y: 0,
            });
            
            // Apply blink effect to first project individually
            const firstProjectRef = projectRefsRef.current[0];
            if (firstProjectRef) {
              gsap.set(firstProjectRef, {
                opacity: enterEase,
                filter: "blur(0px)",
              });
            }
          }
          // === ACT 4: Navigate Through Projects with Proper Settling Time === (50%+)
          else {
            // Keep navbar hidden when in projects section
            // But allow it to reappear when scrolling back (progress < 0.25)
            if (navbarElement) {
              if (progress < 0.25) {
                // Reappear navbar when scrolling back to title section
                const navbarReappearProgress = (0.25 - progress) / 0.13; // Reverse of vanish
                const navbarReappearEase = Math.pow(Math.min(navbarReappearProgress, 1), 1.2);
                gsap.set(navbarElement, {
                  opacity: navbarReappearEase,
                  x: -(1 - navbarReappearEase) * 120,
                  pointerEvents: navbarReappearEase >= 0.2 ? "auto" : "none",
                });
              } else {
                // Keep hidden in projects section
                gsap.set(navbarElement, {
                  opacity: 0,
                  x: -120,
                  pointerEvents: "none",
                });
              }
            }
            
            // Calculate project navigation - synchronized timing with half blank pages
            // Each project occupies 1.5 viewport widths (1 project + 0.5 blank)
            const projectScrollStart = (progress - 0.50) / 0.50;
            // Each project occupies 1.5 units (1 project + 0.5 blank)
            // We'll use a scale where 1 project = 2 units, half blank = 1 unit (total 3 units per project)
            const totalProjectUnits = projectScrollStart * (projects.length * 3);
            const currentUnitIndex = Math.floor(totalProjectUnits);
            // Determine if we're in a project or blank page
            // Pattern: Project (units 0-1), Blank (unit 2), Project (units 3-4), Blank (unit 5), etc.
            const unitInProjectCycle = currentUnitIndex % 3;
            const isInBlankPage = unitInProjectCycle === 2; // Unit 2 in each cycle is blank page
            const currentProjectIndex = Math.min(
              Math.floor(currentUnitIndex / 3),
              projects.length - 1
            );
            
            // Calculate progress within current unit (project or blank)
            // Normalize unitLocalProgress: for projects it's 0-1, for blanks it's also 0-1
            const unitLocalProgress = totalProjectUnits - currentUnitIndex;
            
            // Detect project change for transition effects
            const projectChanged = currentProjectIndex !== previousProjectIndexRef.current;
            previousProjectIndexRef.current = currentProjectIndex;
            
            // Ensure first project is fully visible and synced when entering navigation phase
            if (currentProjectIndex === 0 && !isInBlankPage && unitLocalProgress < 0.1) {
              // First project should be fully visible
              if (progress >= 0.50) {
                gsap.set(projectsWrapperRef.current, {
                  opacity: 1,
                  filter: "blur(0px)",
                  scale: 1,
                });
              }
            }
            
            // Calculate smooth horizontal offset - synced with transitions
            // Each project cycle = 1.5 viewport widths (1 project + 0.5 blank)
            const projectCycleWidth = windowWidth * 1.5;
            
            // Calculate offset based on current position
            let rawProjectOffset = 0;
            
            if (isInBlankPage) {
              // In blank page: completed projects + full current project + progress through blank
              rawProjectOffset = -(currentProjectIndex * projectCycleWidth + windowWidth + (unitLocalProgress * windowWidth * 0.5));
            } else {
              // In project: completed cycles + progress through current project
              // Project spans 2 units, so calculate actual project progress
              const projectProgress = (unitInProjectCycle + unitLocalProgress) / 2; // 0-1
              rawProjectOffset = -(currentProjectIndex * projectCycleWidth + (projectProgress * windowWidth));
            }
            
            const nextProjectIndex = Math.min(currentProjectIndex + 1, projects.length - 1);
            const isLastProject = currentProjectIndex === projects.length - 1;
            const isFirstProject = currentProjectIndex === 0;
            
            // Blink effect: projects instantly disappear/appear during blank page
            // Blank page is half viewport (50vw) between projects
            let smoothOffset = rawProjectOffset;
            
            // Apply blink effect: wrapper position + individual project opacity
            // First, move the wrapper horizontally
            gsap.set(projectsWrapperRef.current, {
              x: smoothOffset,
              y: 0,
            });
            
            // Then, apply fade-in/out to individual projects as they enter/leave viewport
            projects.forEach((project, index) => {
              const projectRef = projectRefsRef.current[index];
              if (!projectRef) return;
              
              // Calculate if this project is current, previous, or next
              const isCurrentProject = index === currentProjectIndex;
              const isPreviousProject = index === currentProjectIndex - 1;
              const isNextProject = index === currentProjectIndex + 1;
              
              let projectOpacity = 1;
              
              if (isCurrentProject && !isInBlankPage) {
                // Current project: fully visible while scrolling through it
                projectOpacity = 1;
              } else if (isCurrentProject && isInBlankPage) {
                // Current project in blank page - fade out
                projectOpacity = 1 - Math.pow(unitLocalProgress, 1.5); // Fade out smoothly
              } else if (isNextProject) {
                // Next project: calculate how much is visible in viewport and fade in accordingly
                // The next project is positioned at (currentProjectIndex + 1) * projectCycleWidth from wrapper start
                // Current wrapper offset is rawProjectOffset (negative)
                // Next project's left edge in viewport space = (currentProjectIndex + 1) * projectCycleWidth + rawProjectOffset
                
                const nextProjectLeftEdge = (currentProjectIndex + 1) * projectCycleWidth + rawProjectOffset;
                
                // If next project's left edge is > windowWidth, it's not visible yet (opacity 0)
                // As it enters (left edge moves from windowWidth to 0), fade in from 0 to 1
                if (nextProjectLeftEdge >= windowWidth) {
                  // Not yet entered viewport
                  projectOpacity = 0;
                } else if (nextProjectLeftEdge <= 0) {
                  // Fully entered viewport
                  projectOpacity = 1;
                } else {
                  // Partially visible - calculate fade based on how much is visible
                  // When leftEdge = windowWidth, opacity = 0
                  // When leftEdge = 0, opacity = 1
                  const visibleRatio = 1 - (nextProjectLeftEdge / windowWidth); // 0 to 1
                  projectOpacity = Math.pow(visibleRatio, 1.5); // Smooth fade in
                }
                
              } else if (isPreviousProject) {
                // Previous project: hidden
                projectOpacity = 0;
              } else {
                // Other projects - hidden
                projectOpacity = 0;
              }
              
              gsap.set(projectRef, {
                opacity: projectOpacity,
                filter: "blur(0px)", // No blur
              });
            });
          }
        },
        onLeave: () => {
          // Show navbar when leaving projects section
          if (navbarElement) {
            gsap.to(navbarElement, {
                  opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              pointerEvents: "auto",
            });
          }
        },
        onLeaveBack: () => {
          // Show navbar when scrolling back up
          if (navbarElement) {
            gsap.to(navbarElement, {
                  opacity: 1,
              x: 0,
              duration: 0.6,
              ease: "power3.out",
              pointerEvents: "auto",
            });
          }
        },
      });

      // Handle resize - recalculate for horizontal scrolling
      const handleResize = () => {
        const newWindowWidth = window.innerWidth || 1920;
        if (projectsWrapperRef.current) {
          projectsWrapperRef.current.style.paddingLeft = '0px';
          projectsWrapperRef.current.style.width = `${projects.length * 150}vw`;
        }
        ScrollTrigger.refresh();
      };
      
      window.addEventListener("resize", handleResize);

      ScrollTrigger.refresh();

      return () => {
        pinTrigger?.kill();
        window.removeEventListener("resize", handleResize);
      };
    },
    { scope: containerRef }
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
        {/* Header Section with Title */}
        <div
          ref={headerRef}
          className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-10"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)",
          }}
        >
          <div className="max-w-7xl mx-auto">
          <h2
            ref={titleRef}
              className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl xl:text-[12rem] font-light text-[#d97706] mb-4 sm:mb-6 tracking-tight leading-none"
          >
            PROJECTS
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-[#d97706] mb-6 sm:mb-8" />
          <p
            ref={subtitleRef}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed tracking-wide px-4 sm:px-0"
          >
            A curated selection of recent work across mobile, AI and web.
          </p>
          </div>
        </div>

        {/* Pinned Container - Full Viewport Fixed */}
        <div
          ref={pinContainerRef}
          className="relative w-full bg-black"
          style={{
            height: "100dvh",
            minHeight: "100dvh",
            overflow: "hidden",
          }}
        >
          {/* Projects Wrapper - Horizontal Layout with Blank Pages */}
          <div
            ref={projectsWrapperRef}
            className="absolute top-0 left-0 flex"
            style={{
              width: `${projects.length * 150}vw`, // Each project (100vw) + half blank page (50vw)
              height: '100dvh',
              paddingLeft: '0px',
              transformOrigin: 'center center', // For smooth scale animations
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
                  className="flex-shrink-0 w-screen flex flex-col"
                style={{
                    width: "100vw",
                    height: "100dvh",
                    minHeight: "100dvh",
                    maxHeight: "100dvh",
                    overflow: "hidden",
                  }}
                >
                  <div className="w-full h-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 max-w-[1600px] flex flex-col">
                {/* Top Section - Role and Title at Top */}
                <div className="flex-1 min-h-0 flex flex-col gap-4 md:gap-6 lg:gap-8 py-4 md:py-6 lg:py-8 overflow-hidden">
                  {/* Top Row - Role and Title */}
                  <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 flex-shrink-0">
                    {/* Role */}
                    <span className="text-xs md:text-sm font-light text-[#d97706]/80 tracking-[0.15em] uppercase">
                      {project.role}
                    </span>

                    {/* Hero Title */}
                    <h2
                      className="text-[40px] md:text-[56px] lg:text-[72px] xl:text-[84px] font-light text-white leading-[0.95] tracking-[-0.02em]"
                      style={{
                        fontFamily: "system-ui, -apple-system, sans-serif",
                        fontWeight: 200,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {project.title}
                    </h2>
                  </div>

                  {/* Main Content - 4 Column Grid */}
                  <div className="flex-1 min-h-0 grid grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-end">
                    {/* Left - Image (2 columns) */}
                    <div className="col-span-2 h-full flex items-end justify-center overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain max-h-full"
                      />
                    </div>

                    {/* Right - Description and Links (2 columns) */}
                    <div className="col-span-2 flex flex-col gap-4 md:gap-6 lg:gap-8 justify-end">
                      {/* Description */}
                      <div className="flex flex-col">
                        <p className="text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed tracking-normal">
                          {project.description}
                        </p>
                      </div>

                      {/* Links */}
                      {project.links.length > 0 && (
                        <div className="flex flex-col gap-3 md:gap-4">
                          {project.links.map((link, i) => (
                            <a
                              key={i}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm md:text-base font-normal tracking-wide transition-all duration-300 group w-fit"
                            >
                              <span className="border-b border-white/40 group-hover:border-white/60 transition-colors pb-0.5">
                                {link.name}
                              </span>
                              <svg
                                className="w-4 h-4 md:w-5 md:h-5 opacity-60 group-hover:opacity-100 transition-opacity duration-300 flex-shrink-0"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={1.5}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                </div>
              </div>
                
                {/* Blank Page - half width, except after last project */}
                {index < projects.length - 1 && (
                  <div
                    key={`blank-${project.id}`}
                    className="flex-shrink-0 relative bg-black overflow-hidden"
                    style={{
                      width: "50vw",
                      height: "100dvh",
                    }}
                  />
                )}
              </React.Fragment>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
