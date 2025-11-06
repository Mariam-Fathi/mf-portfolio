"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface JobEntry {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  type: string;
  description: string;
  achievements: string[];
  tags: string[];
}

interface JobEntryExtended extends JobEntry {
  briefing: string;
  missionObjective: string;
  clearanceLevel: string;
  assignmentType: string;
  statusLabel: string;
  characterTraits: string;
  introduction: string;
  mainItem: string;
}

const jobEntries: JobEntryExtended[] = [
  {
    id: "tarqia",
    title: "Mobile Engineer",
    company: "Tarqia",
    period: "Jan 2024 → Present",
    location: "Remote",
    type: "Full-time",
    description:
      "Leading AI/ML initiatives for a home services mobile application, developing predictive models and recommendation systems. Architecting scalable backend services with 99.9% uptime.",
    achievements: [
      "Developed ML models improving service recommendations by 35%",
      "Architected FastAPI backend handling 100k+ daily requests",
      "Increased user engagement by 40% through AI integration",
      "Reduced database response time by 50% through optimization",
    ],
    tags: ["AI/ML", "FastAPI", "PostgreSQL", "Mobile Development"],
    briefing: "You have been selected for a critical assignment in the mobile intelligence division. Your mission involves leading AI/ML initiatives for home services applications, developing predictive models, and architecting scalable backend infrastructure. This operation requires expertise in machine learning, mobile development, and high-performance systems. Your objective is to enhance service recommendations, optimize backend performance, and increase user engagement through advanced AI integration. This is an ongoing, full-time operation requiring continuous innovation and system optimization.",
    missionObjective: "Enhance home services platform through AI/ML integration and scalable backend architecture",
    clearanceLevel: "LEVEL 3 - AI/ML OPERATIONS",
    assignmentType: "Full-time Agent",
    statusLabel: "Active Agent",
    characterTraits: "INNOVATIVE AND STRATEGIC",
    introduction: "Mobile Engineer entered the tech world through cutting-edge AI applications. Leading AI/ML initiatives for home services platforms, this engineer develops predictive models and recommendation systems. Although working in a fast-paced environment, the work in mobile intelligence brings great satisfaction through solving complex problems and creating scalable solutions.",
    mainItem: "AI/ML Models",
  },
  {
    id: "dracode",
    title: "Software Engineer",
    company: "Dracode",
    period: "Mar 2025 → Jul 2025",
    location: "Remote",
    type: "Freelance",
    description:
      "Developed an AI-powered estimation tool with 85% confidence using Hugging Face models, reducing project estimation time from days to minutes.",
    achievements: [
      "Built AI estimation tool with 85% confidence rate",
      "Reduced quotation time from days to minutes",
      "Architected feedback roadmap for continuous improvement",
    ],
    tags: ["AI", "Hugging Face", "Python", "NLP"],
    briefing: "You have been assigned to a specialized AI development operation. Your mission is to develop an AI-powered estimation tool using advanced Hugging Face models with 85% confidence accuracy. This operation focuses on reducing project estimation time from days to minutes, revolutionizing the quotation process. Your expertise in NLP, Python, and AI model integration is critical for mission success. You will architect a feedback roadmap for continuous improvement and deploy production-ready AI solutions. This is a time-limited, high-impact freelance assignment.",
    missionObjective: "Develop AI estimation tool with 85% confidence using Hugging Face models",
    clearanceLevel: "LEVEL 2 - AI DEVELOPMENT",
    assignmentType: "Freelance Specialist",
    statusLabel: "Contract Agent",
    characterTraits: "PRECISE AND ANALYTICAL",
    introduction: "Software Engineer entered the AI development field through specialized NLP projects. Developing AI-powered estimation tools using Hugging Face models, this engineer revolutionizes project estimation processes. Although working on time-limited contracts, the work in AI development brings great satisfaction through building high-confidence solutions and improving efficiency.",
    mainItem: "AI Estimation Tool",
  },
];

// Generate fingerprint SVG pattern - dark, smudged appearance
const FingerprintSVG = () => (
  <svg
    width="100"
    height="100"
    viewBox="0 0 100 100"
    className="opacity-60"
    style={{ 
      filter: "contrast(1.8) brightness(0.5) blur(0.5px)",
      mixBlendMode: "multiply"
    }}
  >
    {/* Dark fingerprint ridges - more realistic pattern */}
    <g stroke="#1a1a1a" strokeWidth="1.5" fill="none">
      {/* Top ridges */}
      <path d="M15,20 Q25,18 35,20 T55,20 T75,20" opacity="0.8" />
      <path d="M20,28 Q30,26 40,28 T60,28 T80,28" opacity="0.8" />
      <path d="M25,36 Q35,34 45,36 T65,36 T80,36" opacity="0.8" />
      
      {/* Center whorl */}
      <path d="M40,42 Q50,38 60,42 Q65,50 60,58 Q55,62 50,58 Q45,50 50,42" opacity="0.9" strokeWidth="2" />
      <path d="M45,45 Q50,42 55,45 Q58,50 55,55 Q52,58 50,55 Q47,50 50,45" opacity="0.9" strokeWidth="1.5" />
      
      {/* Lower ridges */}
      <path d="M35,62 Q45,60 55,62 T70,62" opacity="0.8" />
      <path d="M30,70 Q40,68 50,70 T68,70" opacity="0.8" />
      <path d="M25,78 Q35,76 45,78 T65,78" opacity="0.8" />
      <path d="M20,85 Q30,83 40,85 T60,85" opacity="0.7" />
    </g>
    
    {/* Additional texture for smudged effect */}
    <circle cx="50" cy="50" r="35" fill="rgba(0,0,0,0.1)" opacity="0.3" />
    <circle cx="50" cy="50" r="25" fill="rgba(0,0,0,0.05)" opacity="0.2" />
  </svg>
);

const JobTimeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const dossierCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const documentContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Use the first job's briefing for the main document
  const primaryJob = jobEntries[0];

  // Entry animation - scroll-synced from hero to career section
  useGSAP(
    () => {
      if (!sectionRef.current || !pinContainerRef.current) return;

      // Container fades in
      gsap.set(pinContainerRef.current, {
        opacity: 0,
      });

      // Create scroll-synced animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom+=100",
          end: "top center",
          scrub: 1.5,
          toggleActions: "play none reverse none",
          invalidateOnRefresh: true,
        },
      });

      // Container fades in
      scrollTl.to(pinContainerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      }, 0);
    },
    { scope: containerRef }
  );

  // Stacked cards scroll animation - cards appear partially, then fully, then stack
  useGSAP(
    () => {
      // Wait for containers to be available
      if (!pinContainerRef.current) return;
      
      // Check if containers are ready
      const containersReady = documentContainersRef.current.length > 0 && 
        documentContainersRef.current.every(container => container !== null);
      
      if (!containersReady) {
        // Retry after a short delay
        setTimeout(() => {
          if (documentContainersRef.current.length > 0) {
            ScrollTrigger.refresh();
          }
        }, 100);
        return;
      }

      const viewportHeight = window.innerHeight;
      
      // Initial state: Cards start from the right side (off-screen)
      documentContainersRef.current.forEach((documentContainer, index) => {
        if (!documentContainer) return;

        // Hide dossier details initially
        const card = dossierCardsRef.current[index];
        if (card) {
          const dossierDetails = card.querySelector(".dossier-details");
          if (dossierDetails) {
            gsap.set(dossierDetails, {
              opacity: 0,
              y: -20,
              maxHeight: "0px",
              overflow: "hidden",
            });
          }
        }

        // Set initial position - cards start from the right side (off-screen)
        // Initial stack: Tarqia (index 0) on top of Dracode (index 1)
        const scale = 0.95 - (index * 0.02);
        
        // Cards start off-screen to the right, stacked with Tarqia on top
        const stackOffsetX = index * 10; // Horizontal offset for stacking effect
        // For initial stack: Tarqia (index 0) should be on top, so it should be at y: 0 or slightly up
        // Dracode (index 1) should be behind, so it should be at y: +50 (below)
        const initialStackY = index === 0 ? -50 : 0; // Tarqia on top (-50), Dracode behind (0)
        
        // Position cards off-screen to the right, stacked
        const initialX = window.innerWidth / 2 + 400 + stackOffsetX; // Start 400px to the right of center
        const initialY = initialStackY; // Stacked position: Tarqia on top, Dracode behind
        
        gsap.set(documentContainer, {
          position: "absolute",
          top: "50%",
          left: "50%",
          x: `calc(-50% + ${initialX}px)`, // Start from right side
          y: `calc(-50% + ${initialY}px)`, // Stacked: Tarqia on top, Dracode behind
          zIndex: index === 0 ? 50 : 29, // Tarqia (index 0) on top (50), Dracode (index 1) behind (29)
          opacity: 1,
          scale: index === 0 ? 1 : 0.92, // Tarqia full size, Dracode slightly smaller
          transformOrigin: "center center",
          rotation: index % 2 === 0 ? -1.5 : 1.5,
        });
      });

      // Calculate scroll distances - using viewport heights as units
      const cardSlideIn = viewportHeight * 0.8; // Each card slides in from right (80% viewport)
      const centerHoldDistance = viewportHeight * 0.5; // Hold each card centered (50% viewport)
      const cardHold = viewportHeight * 0.3; // Hold each card centered briefly (30% viewport)
      const stackingDistance = viewportHeight * 0.6; // Distance for cards to stack (60% viewport)
      
      // Calculate total scroll distance for all cards
      // First card: slide in + hold
      // Subsequent cards: (slide in + hold + stacking) for each
      const firstCardDistance = cardSlideIn + centerHoldDistance;
      const subsequentCardDistance = cardSlideIn + cardHold + stackingDistance;
      const totalScrollDistance = firstCardDistance + (jobEntries.length - 1) * subsequentCardDistance;

      // Create main timeline with pin - section stays fixed while cards animate
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top top",
          end: () => `+=${totalScrollDistance}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Normalize distances to timeline progress (0-1)
      const cardSlideProgress = cardSlideIn / totalScrollDistance;
      const centerHoldProgress = centerHoldDistance / totalScrollDistance;
      const cardHoldProgress = cardHold / totalScrollDistance;
      const stackingProgress = stackingDistance / totalScrollDistance;
      const firstCardProgress = firstCardDistance / totalScrollDistance;
      const subsequentCardProgress = subsequentCardDistance / totalScrollDistance;

      // Process all cards with card game logic: each card enters and goes on top
      jobEntries.forEach((job, index) => {
        const container = documentContainersRef.current[index];
        if (!container) return;

        // Calculate timing for this card
        let cardStartTime = 0;
        if (index === 0) {
          // First card starts immediately
          cardStartTime = 0;
        } else {
          // Subsequent cards start after previous card's sequence
          cardStartTime = firstCardProgress + ((index - 1) * subsequentCardProgress);
        }

        // Get initial position (cards are stacked off-screen: first card on top, others behind)
        const initialX = window.innerWidth / 2 + 400 + (index * 10);
        // Initial stack: Card 0 on top (-50), Card 1 behind (0), Card 2 behind (50), etc.
        const initialY = index === 0 ? -50 : (index - 1) * 50;
        const initialScale = index === 0 ? 1 : 0.92;
        const rotation = index % 2 === 0 ? -1.5 : 1.5;

        if (index === 0) {
          // First card: slides in and centers
          mainTl.fromTo(
            container,
            {
              x: `calc(-50% + ${initialX}px)`,
              y: `calc(-50% + ${initialY}px)`,
              scale: initialScale,
              rotation: rotation,
              opacity: 1,
              zIndex: 50, // On top in initial stack
              immediateRender: true,
            },
            {
              x: "-50%",
              y: "-50%",
              scale: 1,
              rotation: rotation,
              duration: cardSlideProgress,
              ease: "power2.out",
              zIndex: 50, // Stays on top when active
            },
            cardStartTime
          );

          // Hold first card centered
          mainTl.to(
            container,
            {
              zIndex: 50,
              duration: centerHoldProgress,
            },
            cardStartTime + cardSlideProgress
          );

          // Reveal first card's details
          const card = dossierCardsRef.current[index];
          if (card) {
            const dossierDetails = card.querySelector(".dossier-details");
            if (dossierDetails) {
              mainTl.to(
                dossierDetails,
                {
                  maxHeight: "800px",
                  opacity: 1,
                  y: 0,
                  duration: cardSlideProgress * 0.6,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.set(dossierDetails, {
                      maxHeight: "none",
                      overflow: "visible",
                    });
                  },
                },
                cardStartTime + cardSlideProgress * 0.4
              );
            }
          }
        } else {
          // Subsequent cards: enter on top, then previous cards stack behind
          
          // Set new card to top layer before it starts moving
          mainTl.set(
            container,
            {
              zIndex: 50, // Top layer from start
            },
            cardStartTime - 0.01
          );

          // Move all previous cards behind (z-index only)
          for (let prevIndex = 0; prevIndex < index; prevIndex++) {
            const prevContainer = documentContainersRef.current[prevIndex];
            if (prevContainer) {
              mainTl.to(
                prevContainer,
                {
                  zIndex: 40 - prevIndex, // Move behind, with decreasing z-index
                  duration: 0.01,
                },
                cardStartTime
              );
            }
          }

          // New card slides in from right (on top layer)
          mainTl.fromTo(
            container,
            {
              x: `calc(-50% + ${initialX}px)`,
              y: `calc(-50% + ${initialY}px)`,
              scale: initialScale,
              rotation: rotation,
              opacity: 1,
              zIndex: 50, // On top layer from start
              immediateRender: true,
            },
            {
              x: "-50%",
              y: "-50%",
              scale: 1,
              rotation: rotation,
              duration: cardSlideProgress,
              ease: "power2.out",
              zIndex: 50, // Stays on top
            },
            cardStartTime
          );

          // Hold new card centered (on top)
          const cardHoldTime = cardStartTime + cardSlideProgress;
          mainTl.to(
            container,
            {
              zIndex: 50,
              duration: cardHoldProgress,
            },
            cardHoldTime
          );

          // Keep previous cards behind during hold
          for (let prevIndex = 0; prevIndex < index; prevIndex++) {
            const prevContainer = documentContainersRef.current[prevIndex];
            if (prevContainer) {
              mainTl.to(
                prevContainer,
                {
                  zIndex: 40 - prevIndex,
                  duration: cardHoldProgress,
                },
                cardHoldTime
              );
            }
          }

          // Reveal card's details
          const card = dossierCardsRef.current[index];
          if (card) {
            const dossierDetails = card.querySelector(".dossier-details");
            if (dossierDetails) {
              mainTl.to(
                dossierDetails,
                {
                  maxHeight: "800px",
                  opacity: 1,
                  y: 0,
                  duration: cardSlideProgress * 0.6,
                  ease: "power2.out",
                  onComplete: () => {
                    gsap.set(dossierDetails, {
                      maxHeight: "none",
                      overflow: "visible",
                    });
                  },
                },
                cardStartTime + cardSlideProgress * 0.4
              );
            }
          }

          // Stacking: New card moves to top position, then previous cards stack behind
          const stackingStartTime = cardHoldTime + cardHoldProgress;
          const stackingPhase1 = stackingProgress * 0.5;
          const stackingPhase2 = stackingProgress * 0.5;

          // Phase 1: New card moves to top stacked position
          mainTl.to(
            container,
            {
              y: `calc(-50% + -50px)`, // Top position
              x: `calc(-50% + 0px)`,
              scale: 1,
              rotation: rotation,
              duration: stackingPhase1,
              ease: "power2.inOut",
              zIndex: 50, // Stays on top
            },
            stackingStartTime
          );

          // Phase 2: Previous cards stack behind (sequential)
          for (let prevIndex = 0; prevIndex < index; prevIndex++) {
            const prevContainer = documentContainersRef.current[prevIndex];
            if (!prevContainer) continue;

            const stackOffset = (index - prevIndex) * 50; // Vertical offset for stacking
            const horizontalOffset = (index - prevIndex) * 12; // Horizontal offset for depth
            const prevRotation = prevIndex % 2 === 0 ? -1.5 : 1.5;

            mainTl.to(
              prevContainer,
              {
                y: `calc(-50% + ${stackOffset}px)`, // Stack behind
                x: `calc(-50% + ${horizontalOffset}px)`,
                scale: Math.max(0.92 - (prevIndex * 0.03), 0.85),
                rotation: prevRotation,
                duration: stackingPhase2,
                ease: "power2.inOut",
                zIndex: 30 - prevIndex, // Behind new card
              },
              stackingStartTime + stackingPhase1 // Start after new card has moved
            );
          }
        }
      });
    },
    { scope: containerRef, dependencies: [jobEntries] }
  );

  return (
    <section
      id="job-timeline"
      ref={sectionRef}
      className="relative w-full min-h-screen"
      style={{
        background: "#e8e8e8",
        overflow: "hidden", // Prevent overflow into next section
      }}
    >
      <div ref={containerRef} className="relative z-10 overflow-visible">
        <div
          ref={pinContainerRef}
          className="relative w-full h-screen"
          style={{
            background: "#e8e8e8",
            padding: "1rem",
            overflow: "hidden", // Prevent scrollbars
          }}
        >
          {/* Dossier Documents Container - Cards will stack here */}
          <div 
            className="relative w-full mx-auto" 
            style={{ 
              height: "100%",
              width: "100%",
              position: "relative",
              overflow: "hidden", // Prevent scrollbars
            }}
          >
            {jobEntries.map((job, jobIndex) => (
              <div
                key={job.id}
                ref={(el) => {
                  if (el) {
                    documentContainersRef.current[jobIndex] = el;
                    if (jobIndex === 0) {
                      documentRef.current = el;
                    }
                  }
                }}
                className="relative w-full mx-auto"
                style={{
                  background: "#f5f3ee",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), 0 4px 16px rgba(0, 0, 0, 0.1)",
                  margin: "0 auto",
                  padding: "1rem 0.875rem 1rem",
                  position: "absolute",
                  width: "85%",
                  maxWidth: "800px", // Limit max width for better fit
                  backgroundImage: `
                    radial-gradient(circle at 20% 50%, rgba(0,0,0,0.02) 0%, transparent 50%),
                    radial-gradient(circle at 80% 80%, rgba(0,0,0,0.02) 0%, transparent 50%),
                    linear-gradient(180deg, rgba(255,255,255,0.3) 0%, transparent 100%)
                  `,
                  height: "fit-content",
                  maxHeight: "calc(100vh - 2rem)", // Fit viewport minus padding
                  overflowY: "auto", // Allow scrolling if content is too tall
                  overflowX: "hidden",
                  boxSizing: "border-box",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Document fasteners (brads) - centered at top */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                  <div className="w-3 h-3 bg-black rounded-full"></div>
                </div>

                {/* Content Grid */}
                <div className="relative grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                  {/* Left Column - Photo and Introduction */}
                  <div className="flex flex-col gap-3">
                    {/* Polaroid-style Photo */}
                    <div className="relative w-full max-w-[160px]">
                      <div
                        className="bg-white p-3 shadow-lg"
                        style={{
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
                          transform: "rotate(-2deg)",
                        }}
                      >
                        <div
                          className="w-full aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center border-2 border-gray-400 relative overflow-hidden"
                  style={{
                            background: "linear-gradient(135deg, #e5e5e5 0%, #d4d4d4 100%)",
                          }}
                        >
                          <div className="relative w-full h-full flex items-center justify-center p-4">
                            <Image
                              src={`/images/logos/experience/${job.id}-logo.svg`}
                              alt={`${job.company} logo`}
                              width={100}
                              height={100}
                              className="object-contain"
                              style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                filter: "contrast(1.1) brightness(0.95)",
                              }}
                            />
                          </div>
                        </div>
                        <div
                          className="text-center mt-2 text-xs text-gray-700 italic"
                    style={{
                            fontFamily: "cursive, serif",
                            transform: "rotate(1deg)",
                          }}
                        >
                          {job.title}
                        </div>
                      </div>
                    </div>

                    {/* Introduction */}
                    <div className="mt-2">
                      <div
                        className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        DETECTIVE INTRODUCTION:
                      </div>
                      <p
                        className="text-xs text-gray-700 leading-relaxed"
                      style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          lineHeight: "1.6",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {job.introduction}
                      </p>
                    </div>

                    {/* Fingerprint */}
                    <div className="mt-2">
                      <FingerprintSVG />
                    </div>
                  </div>

                  {/* Right Column - Personal Details, Stamps, Main Item */}
                  <div className="flex flex-col gap-3">
                    {/* Personal Details */}
                    <div className="mt-4">
                      <div
                        className="text-xs sm:text-sm text-gray-800 mb-2"
                      style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                          letterSpacing: "0.1em",
                        }}
                      >
                        <div className="mb-1">
                          <strong>NAME:</strong> {job.company.toUpperCase()}
                        </div>
                        <div className="mb-1">
                          <strong>PROFESSION:</strong> {job.title.toUpperCase()}
                        </div>
                        <div>
                          <strong>CHARACTER:</strong> {job.characterTraits}
                        </div>
                      </div>
                  </div>

                    {/* Stamps */}
                    <div className="relative mt-2">
                      <div
                        className="relative inline-block"
                        style={{
                          transform: "rotate(8deg)",
                          zIndex: 5,
                        }}
                      >
                        <div
                          className="w-24 h-24 sm:w-28 sm:h-28 border-3 border-purple-600 rounded-full flex items-center justify-center p-2"
                          style={{
                            borderWidth: "3px",
                            borderColor: "#9333ea",
                            background: "rgba(147, 51, 234, 0.1)",
                          }}
                        >
                          <div className="text-center">
                            <div className="text-xs sm:text-[10px] text-purple-800 font-bold uppercase leading-tight px-1">
                              TECH AGENCY
                              <br />
                              PLEASE CALL
                              <br />
                              WHEN NEEDED
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="absolute top-2 left-4 inline-block"
                        style={{
                          transform: "rotate(-5deg)",
                          zIndex: 4,
                        }}
                      >
                        <div
                          className="w-20 h-20 sm:w-24 sm:h-24 border-3 border-purple-600 rounded-full flex items-center justify-center p-2 opacity-80"
                      style={{
                            borderWidth: "3px",
                            borderColor: "#9333ea",
                            background: "rgba(147, 51, 234, 0.08)",
                          }}
                        >
                          <div className="text-center">
                            <div className="text-[9px] sm:text-[10px] text-purple-800 font-bold uppercase leading-tight px-1">
                              TECH AGENCY
                              <br />
                              PLEASE CALL
                              <br />
                              WHEN NEEDED
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dossier Details - Hidden initially, revealed on scroll */}
                    <div
                      ref={(el) => {
                        if (jobIndex < dossierCardsRef.current.length) {
                          dossierCardsRef.current[jobIndex] = el;
                        }
                      }}
                      className="dossier-details overflow-visible mt-4 border-t border-gray-400 pt-3"
                    >
                      <div
                        className="text-xs font-bold uppercase tracking-wider text-gray-800 mb-1.5"
                        style={{
                          fontFamily: "var(--font-geist-mono), monospace",
                        }}
                      >
                        KEY ACHIEVEMENTS:
                      </div>
                      <ul className="space-y-1 mb-3">
                        {job.achievements.map((achievement, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-gray-700 leading-relaxed"
                            style={{
                              fontFamily: "var(--font-geist-mono), monospace",
                              wordWrap: "break-word",
                              overflowWrap: "break-word",
                            }}
                          >
                            • {achievement}
                          </li>
                        ))}
                      </ul>

                    <div className="flex flex-wrap gap-2">
                      {job.tags.map((tag, idx) => (
                        <span
                          key={idx}
                            className="px-2 py-1 text-xs border border-gray-400 bg-gray-50 whitespace-nowrap text-gray-800"
                          style={{
                              fontFamily: "var(--font-geist-mono), monospace",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
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
};

export default JobTimeline;
