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
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const previousProjectIndexRef = useRef<number>(0);
  const projectRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const titleContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (
        !sectionRef.current ||
        !pinContainerRef.current ||
        !projectsWrapperRef.current
      )
        return;

      // Use dynamic viewport dimensions for horizontal scrolling
      const windowHeight = window.innerHeight || window.visualViewport?.height || 800;
      const windowWidth = window.innerWidth || 1920;
      const isMobile = windowWidth < 768;
      // Horizontal scroll: each project + half blank page between them
      // Each project gets 1 viewport width + 0.5 blank page (except last project)
      const scrollDistance = projects.length * windowWidth * 1.5; // Each project has 1.5 viewport widths (project + half blank)
      
      let pinTriggerInstance: ScrollTrigger | null = null;
      
      // Initial states - Projects wrapper (no blur, position control only)
      gsap.set(projectsWrapperRef.current, {
        x: 0, // Start at x:0 for horizontal
        y: 0,
      });
      
      // Initialize individual projects - first one visible, others hidden
      projects.forEach((_, index) => {
        const projectRef = projectRefsRef.current[index];
        if (projectRef) {
          gsap.set(projectRef, {
            opacity: index === 0 ? 1 : 0, // First project visible, others hidden
            filter: "blur(0px)", // No blur for blink effect
          });
        }
      });
      
      if (projectsWrapperRef.current) {
        projectsWrapperRef.current.style.paddingLeft = '0px';
        projectsWrapperRef.current.style.paddingTop = '0px';
      }

      // Initialize Projects title - hidden initially
      if (titleRef.current && titleContainerRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 30,
          scale: 0.95,
        });
        gsap.set(titleContainerRef.current, {
          opacity: 0,
        });
      }

      // Projects Title ScrollTrigger - Ad-style fade in/out, stays until first project is 90% visible
      if (titleContainerRef.current && titleRef.current && pinContainerRef.current) {
        // Track section entry and calculate when first project is 90% visible
        // Use sectionRef as trigger, calculate end point based on viewport height
        // Title stays visible until we've scrolled 90% of viewport height into projects section
        
        const viewportHeight = window.innerHeight || 800;
        const scrollDistance90Percent = viewportHeight * 0.9; // 90% of viewport height
        
        // Create timeline that tracks scroll progress
        const titleTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom-=300", // Start fading in 300px before section enters
            end: `+=${scrollDistance90Percent}`, // End when scrolled 90% of viewport height relative to start (first project 90% visible)
            scrub: 1.5, // Smooth scrubbing for ad-style effect
            toggleActions: "play none reverse none", // Reverse on scroll back
          },
        });

        // Timeline: Fade in (10%) → Stay visible (80%) → Fade out (10%)
        titleTimeline
          // Fade in quickly - first 10% of scroll
          .fromTo(titleRef.current, {
            opacity: 0,
            y: 50,
            scale: 0.8,
          }, {
            opacity: 1,
            y: 0,
            scale: 1,
            ease: "power2.out",
            duration: 0.1, // 10% of timeline - quick fade in
          })
          .to(titleContainerRef.current, {
            opacity: 1,
            ease: "power2.out",
            duration: 0.1,
          }, "<") // Start at same time
          // Stay fully visible - 80% of scroll (until 90% total - when first project is 90% visible)
          .to({}, { duration: 0.8 }) // Hold at full visibility until first project is 90% visible
          // Fade out - last 10% of scroll (when first project reaches 90% visible)
          .to([titleRef.current, titleContainerRef.current], {
            opacity: 0,
            y: -30,
            scale: 0.95,
            ease: "power2.in",
            duration: 0.1, // 10% of timeline - fade out as first project takes over
          });
      }

      // Main ScrollTrigger
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
            
          // Calculate project navigation - synchronized timing with half blank pages
          // Each project occupies 1.5 viewport widths (1 project + 0.5 blank)
          const projectScrollStart = progress;
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
        },
      });

      // Store pin trigger reference
      pinTriggerInstance = pinTrigger;

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
      className="w-full bg-[#9EA793] relative overflow-hidden"
      style={{
        minHeight: "100vh",
      }}
    >
      {/* Spacer Section - Creates space between Hero and Projects */}
      <div className="w-full h-32 md:h-48 lg:h-64 xl:h-80 bg-[#9EA793]" />
      
      <div ref={containerRef} className="w-full relative">
        {/* Projects Title - Ad-style fade in/out, overlapping first project */}
        <div 
          ref={titleContainerRef}
          className="absolute top-0 left-0 w-full flex items-center justify-center z-30 pointer-events-none"
          style={{
            marginTop: '-15vh', // Overlap with first project card
            transform: 'translateY(0)',
          }}
        >
          <h2
            ref={titleRef}
            className="font-bold uppercase text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[16rem] 2xl:text-[20rem] tracking-tight leading-none text-[#F1BE49]"
            style={{
              letterSpacing: '-0.02em',
              textAlign: 'center',
              textShadow: '0 0 40px rgba(241, 190, 73, 0.3)',
              WebkitTextStroke: '2px rgba(241, 190, 73, 0.1)',
              WebkitTextFillColor: '#F1BE49',
            } as React.CSSProperties}
          >
            PROJECTS
          </h2>
        </div>
        {/* Pinned Container - Full Viewport Fixed */}
        <div
          ref={pinContainerRef}
          className="relative w-full bg-[#9EA793]"
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
                  <div className="w-full h-full mx-auto px-4 md:px-8 lg:px-12 xl:px-16 max-w-[1600px] flex flex-col relative">
                    {/* Rounded Card Container with Hero Background */}
                    <div 
                      className="w-full h-full rounded-3xl md:rounded-[2rem] lg:rounded-[3rem] p-6 md:p-8 lg:p-12 relative overflow-hidden"
                      style={{
                        background: "#1A281E",
                      }}
                    >
                      {/* Project Number - Magazine Style */}
                      <div className="absolute top-6 left-6 md:top-8 md:left-8 lg:top-12 lg:left-12 z-10">
                        <div className="text-[200px] md:text-[300px] lg:text-[400px] xl:text-[500px] font-bold text-white/5 leading-none tracking-tight select-none"
                          style={{
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            fontWeight: 900,
                            WebkitTextStroke: "1px rgba(255,255,255,0.1)",
                          } as React.CSSProperties}
                        >
                          {String(index + 1).padStart(2, '0')}
                        </div>
                      </div>

                      {/* Main Content - 3 Column Grid */}
                      <div className="flex-1 min-h-0 grid grid-cols-3 gap-4 md:gap-6 lg:gap-8 items-center relative z-20 h-full">
                        {/* Left - Links */}
                        <div className="col-span-1 flex flex-col gap-3 md:gap-4 lg:gap-6 justify-center items-start">
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

                        {/* Center - Image */}
                        <div className="col-span-1 h-full flex items-center justify-center overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-contain max-h-[80vh]"
                          />
                        </div>

                        {/* Right - Description at Bottom */}
                        <div className="col-span-1 flex flex-col justify-end items-end">
                          <div className="flex flex-col text-right">
                            <p className="text-sm md:text-base lg:text-lg text-gray-300 font-light leading-relaxed tracking-normal max-w-md">
                              {project.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Blank Page - half width, except after last project */}
                {index < projects.length - 1 && (
                  <div
                    key={`blank-${project.id}`}
                    className="flex-shrink-0 relative  bg-[#9EA793] overflow-hidden"
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
