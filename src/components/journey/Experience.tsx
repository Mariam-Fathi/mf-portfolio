"use client";

import React, { useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCard {
  experience: string;
  title: string;
  company: string;
  fromDate: string;
  toDate?: string;
  type: string;
  logoPath: string;
  story?: {
    chapter: string;
    content: string;
  }[];
  responsibilities: string[];
}

const expCards: ExperienceCard[] = [
  {
    experience:
      "Led AI/ML initiatives for a home services mobile application, developing predictive models and recommendation systems. Architected scalable backend services using FastAPI and PostgreSQL, ensuring 99.9% uptime and handling 100k+ daily requests. Collaborated with cross-functional teams to integrate AI features, improving user engagement by 40%.",
    title: "Mobile Engineer",
    company: "Tarqia",
    fromDate: "Jan 2024",
    toDate: "Present",
    type: "Full-time",
    logoPath: "/images/logos/experience/tarqia-logo.svg",
    story: [
      {
        chapter: "The Beginning",
        content:
          "Joined Tarqia to revolutionize home services through AI. Started by analyzing user behavior patterns and identifying opportunities for ML integration.",
      },
      {
        chapter: "Building the Foundation",
        content:
          "Designed and implemented the initial ML infrastructure, creating predictive models for service recommendations and pricing optimization.",
      },
      {
        chapter: "Scaling Up",
        content:
          "Architected the backend services that now handle over 100k requests daily with 99.9% uptime, ensuring seamless user experience.",
      },
    ],
    responsibilities: [
      "Developed and deployed machine learning models for predictive analytics, improving service recommendations accuracy by 35%",
      "Architected and maintained scalable FastAPI backend services, handling 100k+ daily requests with 99.9% uptime",
      "Collaborated with mobile and frontend teams to integrate AI features, resulting in 40% increase in user engagement",
      "Optimized PostgreSQL database queries and indexing strategies, reducing average response time by 50%",
      "Led code reviews and mentored junior developers, establishing best practices for ML model deployment",
    ],
  },
  {
    experience:
      "While developing a home services mobile application, identified a critical sales bottleneck where non-technical sales representatives struggled to provide quick cost estimates. Proactively developed an AI-powered estimation tool with 85% confidence using Hugging Face's pretrained models to analyze project descriptions and generate instant quotations. Reduced project estimation time from days to minutes and proposed a strategic roadmap for continuous model enhancement through systematic data feedback loops.",
    title: "Software Engineer",
    company: "Dracode",
    fromDate: "Mar 2025",
    toDate: "Jul 2025",
    type: "Freelance Project",
    logoPath: "/images/logos/experience/dracode-logo.svg",
    responsibilities: [
      "Developed AI-powered estimation tool achieving 85% confidence in cost predictions, reducing sales quotation time from days to minutes",
      "Identified and solved critical sales bottleneck by analyzing project descriptions with Hugging Face pretrained models, enabling non-technical sales team to provide instant data-backed quotes",
      "Architected scalable feedback roadmap for continuous model improvement, transforming prototype into company-specific asset through systematic data collection",
    ],
  },
];

const HorizontalTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const experienceItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const transitionOverlayRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth transition from hero section - connected vibe
  useGSAP(
    () => {
      if (!sectionRef.current || !transitionOverlayRef.current) return;

      // Create transition overlay (matching hero's ending state)
      const overlay = document.createElement("div");
      overlay.className = "fixed inset-0 bg-black z-40 pointer-events-none";
      transitionOverlayRef.current = overlay;
      document.body.appendChild(overlay);

      // Initial state - match hero's ending (dark overlay with similar opacity)
      gsap.set(transitionOverlayRef.current, {
        opacity: 0.85, // Match hero's ending dark overlay feel
      });

      // Transition animation - connects from hero to experience smoothly
      const transitionTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "+=100vh", // More gradual transition
          scrub: 2, // Match hero's scrub value for same feel
          anticipatePin: 1,
        },
      });

      // Gradual fade out overlay to reveal experience section (matches hero timing)
      transitionTl.to(
        transitionOverlayRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power2.out", // Same easing as hero for consistency
        },
        0
      );

      // Smooth fade-in of the section itself for seamless connection
      gsap.set(sectionRef.current, {
        opacity: 0.2,
        filter: "blur(8px)", // Start slightly blurred like hero elements
      });

      transitionTl.to(
        sectionRef.current,
        {
          opacity: 1,
          filter: "blur(0px)", // Clear focus like hero elements
          duration: 1,
          ease: "power2.out", // Same easing as hero
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

  // Magazine-style animations - title and subtitle entrance
  useGSAP(
    () => {
      if (!containerRef.current || !titleRef.current || !subtitleRef.current) return;

      // Title and subtitle animation - magazine style entrance (starts after transition)
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

  // Magazine timeline scroll animation - curled scroll effect with path-like movement
  useGSAP(
    () => {
      if (!pinContainerRef.current || !timelineRef.current) return;

      const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const cardWidth = viewportWidth;
      const totalWidth = cardWidth * expCards.length;

      // Set initial state - timeline curled (rolled up like a scroll)
      gsap.set(timelineRef.current, {
        rotationY: -85,
        rotationX: -5,
        transformOrigin: "center center",
        scale: 0.7,
        opacity: 0.3,
      });

      // Create main timeline with path-like movement
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: pinContainerRef.current,
          start: "top top",
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 0.8, // Smoother scrubbing for path-like feel
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Phase 1: Unroll timeline - magazine scroll effect (cute old fashion)
      mainTimeline.to(
        timelineRef.current,
        {
          rotationY: 0,
          rotationX: 0,
          scale: 1,
          opacity: 1,
          duration: 0.15, // First 15% unrolls the timeline
          ease: "power2.out",
        },
        0
      );

      // Phase 2: Animate each experience card with path-like movement
      expCards.forEach((card, index) => {
        const cardStart = index / expCards.length;
        const cardDuration = 1 / expCards.length;
        const experienceItem = experienceItemsRef.current[index];

        if (!experienceItem) return;

        // Calculate path-like position (walking along a curved path)
        const pathOffset = index * cardDuration;
        const itemStart = pathOffset + cardDuration * 0.2; // Start after timeline unrolls

        // Initial state - hidden and slightly rotated (like magazine page being turned)
        gsap.set(experienceItem, {
          opacity: 0,
          scale: 0.85,
          rotationY: -15,
          rotationX: -8,
          y: 80,
          x: -50,
          filter: "blur(15px)",
          transformPerspective: 1000,
        });

        // Title, company, role appear with magazine ad style - path-like entrance
        mainTimeline.to(
          experienceItem,
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            rotationX: 0,
            y: 0,
            x: 0,
            filter: "blur(0px)",
            duration: cardDuration * 0.5,
            ease: "power4.out", // Smooth path-like easing
          },
          itemStart
        );

        // Hold visible - magazine spread effect
        mainTimeline.to(
          experienceItem,
          {
            opacity: 1,
            scale: 1,
            rotationY: 0,
            duration: cardDuration * 0.25,
            ease: "none",
          },
          itemStart + cardDuration * 0.5
        );

        // Magazine-style exit - page turning effect
        mainTimeline.to(
          experienceItem,
          {
            opacity: 0,
            scale: 0.9,
            rotationY: 15,
            rotationX: 8,
            y: -50,
            x: 50,
            filter: "blur(12px)",
            duration: cardDuration * 0.25,
            ease: "power2.in",
          },
          itemStart + cardDuration * 0.75
        );
      });

      // Phase 3: Re-roll timeline at the end (scroll curls back up)
      mainTimeline.to(
        timelineRef.current,
        {
          rotationY: 85,
          rotationX: 5,
          scale: 0.7,
          opacity: 0.3,
          duration: 0.1,
          ease: "power3.in",
        },
        0.9
      );
    },
    { scope: containerRef, dependencies: [expCards] }
  );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="w-full bg-black relative overflow-hidden"
      style={{
        minHeight: "100vh",
      }}
    >
      <div ref={containerRef} className="w-full">
      {/* Header Section - Magazine Style - Smoothly connected from hero */}
      <div 
        className="relative z-10 py-20 px-4 md:px-8 lg:px-10"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, transparent 100%)',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <h2
            ref={titleRef}
            className="text-7xl md:text-9xl lg:text-[12rem] font-light text-white mb-6 tracking-tight leading-none opacity-0"
          >
            EXPERIENCE
          </h2>
          <div className="w-24 h-1 bg-blue-500 mb-8" />
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl text-gray-300 font-light leading-relaxed tracking-wide opacity-0"
          >
            From AI Research to Production Applications
          </p>
        </div>
      </div>

      {/* Pinned Magazine Timeline Container - Curled Scroll Path */}
      <div
        ref={pinContainerRef}
        className="relative w-full h-screen bg-black overflow-hidden"
        style={{
          perspective: '2000px',
          background: 'linear-gradient(to bottom, #000000 0%, #0a0a0a 50%, #000000 100%)',
        }}
      >
        {/* Curled Timeline Path - Magazine Scroll Effect */}
        <div
          ref={timelineRef}
          className="relative w-full h-full flex items-center justify-center"
          style={{
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
          }}
        >
          {/* Experience Items - Magazine Ad Style Layout */}
          <div className="relative w-full h-full">
            {expCards.map((card, index) => {
              const period = `${card.fromDate} ${card.toDate ? `→ ${card.toDate}` : "→ Present"}`;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    experienceItemsRef.current[index] = el;
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="w-full max-w-7xl mx-auto px-8 md:px-12 lg:px-16">
                    {/* Magazine Ad Style Layout - Like Vintage Ads */}
                    <div className="space-y-6 md:space-y-10 lg:space-y-12">
                      <div className="flex items-center justify-between">
                      {/* Period - Small, Vintage Style */}
                      <div className="text-xs md:text-sm font-light text-gray-500 tracking-[0.5em] uppercase">
                        {period}
                      </div>
                            {/* Type - Magazine Tagline Style */}
                            <div className="text-lg md:text-xl text-gray-400 font-light tracking-widest uppercase">
                        {card.type}
                      </div>
                      </div>

                      {/* Title - HUGE Magazine Headline - Ad Style */}
                      <h3 className="text-7xl md:text-9xl lg:text-[11rem] font-light text-white leading-none tracking-tight">
                        {card.title}
                      </h3>

                      {/* Company - Large Magazine Subhead - Vintage Ad Style */}
                      <p className="text-5xl md:text-7xl lg:text-8xl font-light text-blue-400 leading-tight">
                        {card.company}
                      </p>

                      {/* Decorative Line - Vintage Magazine Style */}
                      <div className="w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};

const ExperienceTimeline = () => {
  return <HorizontalTimeline />;
};

export default ExperienceTimeline;