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

const cardThemes = [
  {
    base: "#e0d0bb",
    textPrimary: "#2a221a",
    textSecondary: "#4b3a2c",
    accent: "#35271c",
    softShadow: "rgba(36, 27, 20, 0.25)",
    stampBorder: "#5a4636",
    tagBg: "rgba(53, 39, 28, 0.12)",
    tagBorder: "rgba(53, 39, 28, 0.32)",
  },
  {
    base: "#9a9a6a",
    textPrimary: "#222215",
    textSecondary: "#35351f",
    accent: "#2d2c18",
    softShadow: "rgba(32, 32, 18, 0.28)",
    stampBorder: "#505031",
    tagBg: "rgba(45, 44, 24, 0.14)",
    tagBorder: "rgba(45, 44, 24, 0.34)",
  },
  {
    base: "#d9b59b",
    textPrimary: "#301e18",
    textSecondary: "#4d2e24",
    accent: "#3f2a22",
    softShadow: "rgba(48, 30, 20, 0.28)",
    stampBorder: "#6a4335",
    tagBg: "rgba(63, 42, 34, 0.14)",
    tagBorder: "rgba(63, 42, 34, 0.34)",
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
  const titleRef = useRef<HTMLDivElement>(null);
  const documentRef = useRef<HTMLDivElement>(null);
  const dossierCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const documentContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  
  // Use the first job's briefing for the main document
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

      const viewportHeight = window.innerHeight || 800;
      const viewportWidth = window.innerWidth || 1280;

      const title = titleRef.current;

      if (title) {
        gsap.set(title, {
          opacity: 0,
          xPercent: -50,
          yPercent: -50,
          x: "-65vw",
          rotation: -4,
        });
      }
      
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

      let animationBaseOffset = Math.max(cardSlideProgress * 0.2, 0.12);

      if (title) {
        const titleEnterDuration = Math.max(cardSlideProgress * 0.5, 0.55);
        const titleHoldDuration = Math.max(cardSlideProgress * 0.25, 0.28);
        const titleExitDuration = Math.max(cardSlideProgress * 0.5, 0.5);

        animationBaseOffset = titleEnterDuration + titleHoldDuration + titleExitDuration + 0.05;

        mainTl.fromTo(
          title,
          {
            x: "-65vw",
            opacity: 0,
            rotation: -4,
          },
          {
            x: "0vw",
            opacity: 1,
            rotation: 0,
            ease: "power1.out",
            duration: titleEnterDuration,
          },
          0
        );

        mainTl.to(
          title,
          {
            x: "0vw",
            ease: "none",
            duration: titleHoldDuration,
          },
          titleEnterDuration
        );

        mainTl.to(
          title,
          {
            x: "-65vw",
            opacity: 0,
            rotation: -4,
            ease: "power1.inOut",
            duration: titleExitDuration,
          },
          titleEnterDuration + titleHoldDuration
        );
      }

      // Process all cards with card game logic: each card enters and goes on top
      jobEntries.forEach((job, index) => {
        const container = documentContainersRef.current[index];
        if (!container) return;

        // Calculate timing for this card
        let cardStartTime = 0;
        if (index === 0) {
          // First card starts immediately
          cardStartTime = animationBaseOffset;
        } else {
          // Subsequent cards start after previous card's sequence
          cardStartTime = animationBaseOffset + firstCardProgress + ((index - 1) * subsequentCardProgress);
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

  const renderJobCard = (job: JobEntryExtended, jobIndex: number) => {
    const theme = cardThemes[jobIndex % cardThemes.length];

    return (
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
          background: theme.base,
          color: theme.textPrimary,
          boxShadow: `0 24px 60px ${theme.softShadow}, 0 8px 24px rgba(0, 0, 0, 0.32)`,
          margin: "0 auto",
          padding: "1.25rem 1rem 1.25rem",
          position: "absolute",
          width: "85%",
          maxWidth: "800px", // Limit max width for better fit
          borderRadius: "22px",
          border: "1px solid rgba(0, 0, 0, 0.08)",
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255, 255, 255, 0.08) 0%, transparent 55%),
            radial-gradient(circle at 75% 80%, rgba(0, 0, 0, 0.08) 0%, transparent 60%),
            linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, transparent 100%)
          `,
          height: "fit-content",
          maxHeight: "calc(100vh - 2rem)", // Fit viewport minus padding
          overflowY: "auto",
          overflowX: "hidden",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Document fasteners (brads) - centered at top */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <div className="w-3 h-3 rounded-full" style={{ background: theme.accent }}></div>
          <div className="w-3 h-3 rounded-full" style={{ background: theme.accent }}></div>
        </div>

        {/* Content Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Left Column - Photo and Introduction */}
          <div className="flex flex-col gap-4">
            {/* Polaroid-style Photo */}
            <div className="relative w-full max-w-[180px]">
              <div
                className="p-3 shadow-lg"
                style={{
                  background: "rgba(255, 255, 255, 0.62)",
                  boxShadow: `0 10px 20px ${theme.softShadow}`,
                  transform: "rotate(-2deg)",
                  borderRadius: "14px",
                }}
              >
                <div
                  className="w-full aspect-[3/4] flex items-center justify-center border-2 relative overflow-hidden"
                  style={{
                    borderColor: "rgba(0, 0, 0, 0.12)",
                    background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(230,230,230,0.9) 100%)",
                    borderRadius: "12px",
                  }}
                >
                  <div className="relative w-full h-full flex items-center justify-center p-4">
                    <Image
                      src={`/images/logos/experience/${job.id}-logo.svg`}
                      alt={`${job.company} logo`}
                      width={120}
                      height={120}
                      className="object-contain"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        filter: "contrast(1.05) brightness(0.92)",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="text-center mt-3 text-xs italic"
                  style={{
                    fontFamily: "cursive, serif",
                    transform: "rotate(1deg)",
                    color: theme.textSecondary,
                  }}
                >
                  {job.title}
                </div>
              </div>
            </div>

            {/* Introduction */}
            <div className="mt-2">
              <div
                className="text-xs font-bold uppercase tracking-[0.4em] mb-2"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: theme.accent,
                }}
              >
                DETECTIVE INTRODUCTION
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  lineHeight: "1.7",
                  letterSpacing: "0.02em",
                  color: theme.textSecondary,
                }}
              >
                {job.introduction}
              </p>
            </div>

            {/* Fingerprint */}
            <div className="mt-3 opacity-80">
              <FingerprintSVG />
            </div>
          </div>

          {/* Right Column - Personal Details, Stamps, Main Item */}
          <div className="flex flex-col gap-4">
            {/* Personal Details */}
            <div className="mt-2">
              <div
                className="text-xs sm:text-sm mb-3 space-y-1"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  letterSpacing: "0.1em",
                  color: theme.accent,
                }}
              >
                <div>
                  <strong>NAME:</strong> <span style={{ color: theme.textSecondary }}>{job.company.toUpperCase()}</span>
                </div>
                <div>
                  <strong>PROFESSION:</strong> <span style={{ color: theme.textSecondary }}>{job.title.toUpperCase()}</span>
                </div>
                <div>
                  <strong>CHARACTER:</strong> <span style={{ color: theme.textSecondary }}>{job.characterTraits}</span>
                </div>
              </div>
            </div>

            {/* Stamps */}
            <div className="relative mt-3">
              <div
                className="relative inline-block"
                style={{
                  transform: "rotate(7deg)",
                  zIndex: 5,
                }}
              >
                <div
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center p-2"
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: theme.stampBorder,
                    background: "rgba(0, 0, 0, 0.05)",
                  }}
                >
                  <div className="text-center" style={{ color: theme.accent }}>
                    <div className="text-xs sm:text-[10px] font-bold uppercase leading-tight px-1">
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
                  transform: "rotate(-6deg)",
                  zIndex: 4,
                }}
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center p-2 opacity-80"
                  style={{
                    borderWidth: "3px",
                    borderStyle: "solid",
                    borderColor: theme.stampBorder,
                    background: "rgba(0, 0, 0, 0.04)",
                  }}
                >
                  <div className="text-center" style={{ color: theme.accent }}>
                    <div className="text-[9px] sm:text-[10px] font-bold uppercase leading-tight px-1">
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
              className="dossier-details overflow-visible mt-6 pt-4"
              style={{
                borderTop: `1px dashed ${theme.accent}40`,
              }}
            >
              <div
                className="text-xs font-bold uppercase tracking-[0.35em] mb-2"
                style={{
                  fontFamily: "var(--font-geist-mono), monospace",
                  color: theme.accent,
                }}
              >
                KEY ACHIEVEMENTS
              </div>
              <ul className="space-y-1.5 mb-4">
                {job.achievements.map((achievement, idx) => (
                  <li
                    key={idx}
                    className="text-xs leading-relaxed"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      color: theme.textSecondary,
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
                    className="px-2 py-1 text-xs whitespace-nowrap"
                    style={{
                      fontFamily: "var(--font-geist-mono), monospace",
                      border: `1px solid ${theme.tagBorder}`,
                      background: theme.tagBg,
                      color: theme.accent,
                      borderRadius: "999px",
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
    );
  };

  return (
    <section
      id="job-timeline"
      ref={sectionRef}
      className="relative w-full min-h-screen"
      style={{
        background: "#AC5045",
        overflow: "hidden", // Prevent overflow into next section
      }}
    >
      <div ref={containerRef} className="relative z-10 overflow-visible">
        <div
          ref={pinContainerRef}
          className="relative w-full h-screen"
          style={{
            background: "#AC5045",
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
            <div
              ref={titleRef}
              className="pointer-events-none absolute z-50 flex flex-col items-center justify-center text-center font-black uppercase tracking-[0.6em] text-[#f4ede1]"
              style={{
                top: "40%",
                left: "50%",
                letterSpacing: "0.35rem",
                fontSize: "min(18vw, 140px)",
                textShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
              }}
            >
              CAREER
            </div>
            {jobEntries.map(renderJobCard)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobTimeline;