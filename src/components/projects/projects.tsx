"use client";
import React, { useEffect, useRef, useState } from "react";
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
    image:
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["AI", "Automation", "CRM"],
    links: [],
  },
  {
    id: "homi-app",
    title: "Homi Real Estate App",
    role: "Full-Stack Developer",
    description:
      "Production-ready PropTech solution with Google OAuth, advanced property search, real-time notifications, and Stripe payment integration. Features personalized tracking and intelligent preference analysis.",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
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
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    tags: ["Analytics", "Next.js", "Dashboard"],
    links: [
      { name: "GitHub", url: "https://github.com/Mariam-Fathi/homi-analytics" },
      { name: "Live Demo", url: "https://homi-analytics.vercel.app/" },
    ],
  },
];

export default function CinematicShowcase() {
  const [currentProject, setCurrentProject] = useState(0);
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const projectRefs = useRef<HTMLDivElement[]>([]);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  // Alternative approach with simpler continuous animation
  useEffect(() => {
    const section = sectionRef.current;
    const trigger = triggerRef.current;
    const projectElements = projectRefs.current;

    // Kill existing triggers
    scrollTriggersRef.current.forEach((st) => st && st.kill());
    scrollTriggersRef.current = [];

    // Set initial positions
    gsap.set(projectElements, {
      yPercent: (i) => i * 100,
      zIndex: (i) => projects.length - i,
    });

    // Create main pin trigger (fixed view with snapping)
    const mainTrigger = ScrollTrigger.create({
      trigger: trigger,
      start: "top top",
      end: `+=${projects.length * window.innerHeight}`,
      pin: section,
      pinSpacing: true,
      scrub: 0.7,
      snap: {
        snapTo: (value) => {
          const step = 1 / (projects.length - 1);
          const snapped = Math.round(value / step) * step;
          const distance = Math.abs(value - snapped);
          return distance < step * 0.5 ? snapped : value; // only snap when reasonably close
        },
        duration: { min: 0.08, max: 0.2 },
        ease: "power2.out",
      },
      anticipatePin: 1,
      onUpdate: (self) => {
        const segments = Math.max(1, projects.length - 1);
        const totalProgress = self.progress; // 0..1 across whole pinned area
        const exactIndex = totalProgress * segments; // 0..(n-1)
        const baseIndex = Math.floor(exactIndex);
        const withinSegmentProgress = exactIndex - baseIndex; // 0..1 within current segment

        // Determine nearest snapped slide for crisp view
        const nearestIndex = Math.round(exactIndex);
        const distanceToSnap = Math.abs(exactIndex - nearestIndex);
        const isSettled = distanceToSnap < 0.01; // near snap point

        const currentIndex = Math.min(
          Math.max(baseIndex, 0),
          projects.length - 1
        );

        // Update current project indicator with direction-aware hysteresis
        const goingUp = self.direction < 0;
        let indicatorIndex = baseIndex;
        if (goingUp) {
          // require slightly earlier threshold when going up to switch backwards
          indicatorIndex =
            withinSegmentProgress <= 0.48 ? baseIndex : baseIndex + 1;
        } else {
          // require slightly later threshold when going down to switch forwards
          indicatorIndex =
            withinSegmentProgress >= 0.52 ? baseIndex + 1 : baseIndex;
        }
        indicatorIndex = Math.min(
          Math.max(indicatorIndex, 0),
          projects.length - 1
        );
        if (indicatorIndex !== currentProject) {
          setCurrentProject(indicatorIndex);
        }

        // Animate all projects based on segment math
        projectElements.forEach((project, index) => {
          // Determine relationship of this project to current segment
          if (index < baseIndex) {
            // Past slides: fully off top
            gsap.to(project, {
              yPercent: -100,
              scale: 0.98,
              opacity: 0,
              filter: "blur(4px)",
              ease: "none",
              duration: 0,
            });
            return;
          }

          if (index > baseIndex + 1) {
            // Far future slides: parked below
            gsap.to(project, {
              yPercent: 100,
              scale: 0.98,
              opacity: 0,
              filter: "blur(4px)",
              ease: "none",
              duration: 0,
            });
            return;
          }

          if (isSettled && index === indicatorIndex) {
            // At snap: make active slide perfectly crisp and centered
            gsap.to(project, {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              ease: "none",
              duration: 0,
            });
            return;
          }

          if (index === baseIndex) {
            // Leaving current slide
            gsap.to(project, {
              yPercent: -100 * withinSegmentProgress,
              scale: 1 - 0.04 * withinSegmentProgress,
              opacity: 1 - 0.6 * withinSegmentProgress,
              filter: `blur(${withinSegmentProgress * 4}px)`,
              ease: "none",
              duration: 0,
            });
            return;
          }

          if (index === baseIndex + 1) {
            // Entering next slide
            gsap.to(project, {
              yPercent: 100 - 100 * withinSegmentProgress,
              scale: 0.96 + 0.04 * withinSegmentProgress,
              opacity: 0.4 + 0.6 * withinSegmentProgress,
              filter: `blur(${(1 - withinSegmentProgress) * 3}px)`,
              ease: "none",
              duration: 0,
            });
            return;
          }
        });
      },
      onScrubComplete: (self) => {
        const segments = Math.max(1, projects.length - 1);
        const totalProgress = self.progress;
        const exactIndex = totalProgress * segments;
        const snappedIndex = Math.min(
          Math.max(Math.round(exactIndex), 0),
          projects.length - 1
        );
        if (snappedIndex !== currentProject) {
          setCurrentProject(snappedIndex);
        }

        // Ensure the snapped slide is perfectly crisp and neighbors are positioned
        const projectElements = projectRefs.current;
        projectElements.forEach((project, index) => {
          if (index < snappedIndex) {
            gsap.set(project, {
              yPercent: -100,
              scale: 0.98,
              opacity: 0,
              filter: "blur(2px)",
            });
          } else if (index === snappedIndex) {
            gsap.set(project, {
              yPercent: 0,
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            });
          } else if (index === snappedIndex + 1) {
            gsap.set(project, {
              yPercent: 100,
              scale: 0.98,
              opacity: 0.4,
              filter: "blur(2px)",
            });
          } else {
            gsap.set(project, {
              yPercent: 100,
              scale: 0.98,
              opacity: 0,
              filter: "blur(2px)",
            });
          }
        });
      },
    });

    scrollTriggersRef.current.push(mainTrigger);

    return () => {
      scrollTriggersRef.current.forEach((st) => st && st.kill());
    };
  }, []);

  return (
    <section ref={triggerRef} className="relative bg-black">
      {/* Pinned Container */}
      <div ref={sectionRef} className="relative min-h-screen overflow-hidden">
        {/* Atmospheric Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/5 to-black pointer-events-none" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${
                  20 + Math.random() * 15
                }s ease-in-out infinite`,
                animationDelay: `${Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="absolute top-6 md:top-20 right-6 md:right-6 z-50 flex flex-col items-end gap-3">
          <div className="text-gray-500 text-xs md:text-sm font-light tracking-[0.2em]">
            {String(currentProject + 1).padStart(2, "0")} /{" "}
            {String(projects.length).padStart(2, "0")}
          </div>
          <div className="flex flex-col gap-2">
            {projects.map((_, index) => (
              <div
                key={index}
                className={`h-0.5 rounded-full transition-all duration-700 ease-out ${
                  index === currentProject
                    ? "w-12 bg-white/80"
                    : index < currentProject
                    ? "w-8 bg-white/30"
                    : "w-6 bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Projects Stack */}
        <div className="absolute inset-0">
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => {
                if (el) {
                  projectRefs.current[index] = el;
                }
              }}
              className="absolute inset-0"
              style={{ willChange: "transform, opacity, filter" }}
            >
              {/* Subtle Grid Pattern */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
              </div>

              {/* Content Layout */}
              <div className="relative h-full flex items-center px-4 md:px-8 lg:px-16 xl:px-24">
                <div
                  className={`w-full max-w-[1600px] mx-auto flex flex-col ${
                    index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  } items-center gap-8 lg:gap-16 xl:gap-24`}
                >
                  {/* Content Section */}
                  <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">
                    {/* Role Badge */}
                    <div className="inline-block px-4 py-2 bg-white/5 border border-white/10 rounded-full">
                      <span className="text-gray-400 text-xs md:text-sm font-light tracking-wider">
                        {project.role}
                      </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-white tracking-tight leading-tight">
                      {project.title}
                    </h1>

                    {/* Description */}
                    <p className="text-base md:text-lg text-gray-400 leading-relaxed font-light max-w-2xl">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag, i) => (
                        <span
                          key={i}
                          className="px-4 py-1.5 text-xs md:text-sm bg-white/5 text-gray-300 rounded-full border border-white/10 font-light tracking-wide"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links Menu */}
                    {project.links.length > 0 && (
                      <div className="relative group pt-4">
                        <button className="flex items-center gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black rounded-full font-light tracking-wide transition-all duration-500 text-sm md:text-base hover:bg-gray-200">
                          <span>View Project</span>
                          <svg
                            className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>

                        {/* Dropdown Menu */}
                        <div className="absolute top-full left-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform group-hover:translate-y-0 translate-y-2 z-50">
                          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                            {project.links.map((link, i) => (
                              <a
                                key={i}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between px-6 py-4 text-white hover:bg-white/5 transition-colors duration-200 border-b border-white/5 last:border-b-0 group/item"
                              >
                                <span className="text-sm font-light tracking-wide">
                                  {link.name}
                                </span>
                                <svg
                                  className="w-4 h-4 opacity-50 group-hover/item:opacity-100 group-hover/item:translate-x-1 transition-all duration-200"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                  />
                                </svg>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Image Section */}
                  <div className="w-full lg:w-1/2">
                    <div className="relative group">
                      {/* Ambient Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-3xl blur-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-1000" />

                      {/* Image Container */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/10">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-72 md:h-96 lg:h-[500px] xl:h-[600px] object-cover transition-all duration-1000 group-hover:scale-105"
                        />

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>

                      {/* Corner Accents */}
                      <div className="absolute -top-3 -right-3 w-20 h-20 border-t border-r border-white/10 rounded-tr-2xl" />
                      <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b border-l border-white/10 rounded-bl-2xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.05;
          }
          25% {
            transform: translateY(-12px) translateX(4px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-20px) translateX(-4px);
            opacity: 0.15;
          }
          75% {
            transform: translateY(-12px) translateX(3px);
            opacity: 0.1;
          }
        }
      `}</style>
    </section>
  );
}
