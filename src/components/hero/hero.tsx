"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SUBTITLE_LINES = [
  "Where intuition meets immersive narrative, products find their voice.",
  "We choreograph pixels, light, and motion to guide every curious scroll.",
  "Each interaction reveals intent, momentum, and the story beneath the surface.",
  "Stay for the afterglow—the experience evolves as long as you do.",
];

const CinematicHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const mediaWrapperRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const lines = subtitleRef.current
        ? gsap.utils.toArray<HTMLElement>(
            subtitleRef.current.querySelectorAll("[data-line]")
          )
        : [];

      /**
       * Intro animation: title emerges softly with blur reduction before scroll begins.
       */
      gsap.fromTo(
        titleRef.current,
        {
          opacity: 0,
          filter: "blur(24px)",
          yPercent: 18,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          yPercent: 0,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.15,
        }
      );

      const matchMedia = gsap.matchMedia();

      const createTimeline = (sizes: {
        initialWidth: string;
        initialHeight: string;
        initialRadius: string;
        midZoom: number;
        maxZoom: number;
        transitionRadius: string;
        circleSize: string;
        circleScale: number;
      }): gsap.core.Timeline | undefined => {
        if (!heroRef.current || !mediaWrapperRef.current || !titleRef.current) {
          return undefined;
        }

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=520%",
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
          defaults: { ease: "power2.out" },
        });

        gsap.set(mediaWrapperRef.current, {
          width: sizes.initialWidth,
          height: sizes.initialHeight,
          borderRadius: sizes.initialRadius,
          opacity: 0,
          scale: 0.92,
          filter: "blur(22px)",
        });

        gsap.set(titleRef.current, {
          transformOrigin: "50% 50%",
        });

        gsap.set(subtitleRef.current, {
          opacity: 0,
          yPercent: 36,
        });

        gsap.set(lines, {
          opacity: 0.25,
          yPercent: 42,
          backgroundPosition: "110% 50%",
          filter: "drop-shadow(0px 0px 0px rgba(94,234,212,0))",
        });

        timeline
          /**
           * Phase 1 — Reveal GIF with gentle zoom while title glides upward.
           */
          .to(
            mediaWrapperRef.current,
            {
              opacity: 1,
              filter: "blur(0px)",
              scale: 1,
              duration: 1.5,
            },
            0
          )
          .to(
            titleRef.current,
            {
              yPercent: -48,
              duration: 1.4,
              ease: "power3.inOut",
            },
            0.1
          )
          .to(
            mediaWrapperRef.current,
            {
              scale: sizes.midZoom,
              duration: 1.6,
              ease: "power1.inOut",
            },
            "<"
          )

          /**
           * Phase 2 — Title sweeps downward while zoom intensifies.
           */
          .to(
            titleRef.current,
            {
              yPercent: 62,
              duration: 1.5,
              ease: "power3.inOut",
            },
            ">-0.15"
          )
          .to(
            mediaWrapperRef.current,
            {
              scale: sizes.maxZoom,
              duration: 1.6,
              ease: "power1.inOut",
            },
            "<"
          )

          /**
           * Phase 3 — Title returns to center as the scene prepares to morph.
           */
          .to(
            titleRef.current,
            {
              yPercent: 0,
              duration: 1.35,
              ease: "power3.inOut",
            },
            ">-0.2"
          )
          .to(
            mediaWrapperRef.current,
            {
              borderRadius: sizes.transitionRadius,
              duration: 1.1,
              ease: "power3.inOut",
            },
            "<"
          )

          /**
           * Phase 4 — Morph GIF into a circular portal and fade it away.
           */
          .to(
            mediaWrapperRef.current,
            {
              width: sizes.circleSize,
              height: sizes.circleSize,
              borderRadius: "50%",
              duration: 1.5,
              ease: "power2.inOut",
            }
          )
          .to(
            mediaWrapperRef.current,
            {
              scale: sizes.circleScale,
              duration: 1.3,
              ease: "power3.inOut",
            },
            "<"
          )
          .to(
            mediaWrapperRef.current,
            {
              opacity: 0,
              scale: sizes.circleScale * 0.45,
              duration: 1.2,
              ease: "power3.in",
            },
            ">-0.25"
          )

          /**
           * Phase 5 — Subtitle emerges with line-by-line highlight reveal.
           */
          .to(
            titleRef.current,
            {
              opacity: 0.18,
              duration: 1,
              ease: "power1.inOut",
            },
            "<"
          )
          .fromTo(
            subtitleRef.current,
            {
              opacity: 0,
              yPercent: 36,
            },
            {
              opacity: 1,
              yPercent: 14,
              duration: 1.2,
              ease: "power3.out",
            },
            ">-0.3"
          )
          .to(
            lines,
            {
              opacity: 1,
              yPercent: -12,
              backgroundPosition: "-10% 50%",
              filter: "drop-shadow(0px 0px 28px rgba(94,234,212,0.35))",
              duration: 0.95,
              ease: "power3.out",
              stagger: 0.34,
            },
            "<+0.05"
          )
          .to(
            subtitleRef.current,
            {
              yPercent: -18,
              duration: 1.7,
              ease: "power2.inOut",
            },
            ">-0.05"
          )
          .to({}, { duration: 0.6 });

        return timeline;
      };

      matchMedia.add(
        {
          isDesktop: "(min-width: 1024px)",
          isTablet: "(min-width: 768px) and (max-width: 1023px)",
          isMobile: "(max-width: 767px)",
        },
        (context) => {
          const conditions = context.conditions as Record<string, boolean>;
          const sizes = {
            initialWidth: conditions.isDesktop
              ? "58vw"
              : conditions.isTablet
              ? "72vw"
              : "88vw",
            initialHeight: conditions.isDesktop
              ? "34vw"
              : conditions.isTablet
              ? "48vw"
              : "70vw",
            initialRadius: conditions.isMobile ? "24px" : "36px",
            midZoom: conditions.isDesktop ? 1.28 : conditions.isTablet ? 1.22 : 1.17,
            maxZoom: conditions.isDesktop ? 1.68 : conditions.isTablet ? 1.54 : 1.42,
            transitionRadius: conditions.isDesktop ? "48px" : "32px",
            circleSize: conditions.isDesktop
              ? "32vw"
              : conditions.isTablet
              ? "44vw"
              : "66vw",
            circleScale: conditions.isDesktop ? 0.9 : conditions.isTablet ? 0.86 : 0.82,
          };

          const timeline = createTimeline(sizes);

          return () => {
            timeline?.scrollTrigger?.kill();
            timeline?.kill();
          };
        }
      );

      return () => {
        matchMedia.revert();
      };
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden bg-black text-white"
    >
      <div
        ref={heroRef}
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 md:px-10 lg:px-16"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-black to-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(88,28,135,0.25),_transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(15,118,110,0.18),_transparent_60%)] mix-blend-screen" />
          <div className="absolute -right-20 top-1/3 h-64 w-64 rounded-full bg-cyan-500/20 blur-[120px]" />
          <div className="absolute -left-10 bottom-12 h-72 w-72 rounded-full bg-purple-600/25 blur-3xl" />
        </div>

        <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-16">
          <div className="flex flex-col items-center gap-6 text-center">
            <span className="text-sm uppercase tracking-[0.5em] text-cyan-100/60">
              Immersive Experience
            </span>
            <h1
              ref={titleRef}
              className="text-balance text-5xl font-light tracking-tight text-white md:text-6xl lg:text-7xl"
              style={{ willChange: "transform, opacity, filter" }}
            >
              Crafting Cinematic Journeys for the Modern Web
            </h1>
          </div>

          <div
            ref={mediaWrapperRef}
            className="relative flex items-center justify-center overflow-hidden border border-white/10 bg-white/5 shadow-[0_40px_120px_rgba(12,12,20,0.55)] backdrop-blur-sm"
            style={{
              width: "min(88vw, 920px)",
              height: "min(64vw, 560px)",
              willChange: "transform, filter, opacity",
            }}
          >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-cyan-300/20 mix-blend-screen" />
            <img
              src="/images/gifs/brain-neuron.gif"
              alt="Animated neural connections pulsing with energy"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
          </div>

          <div
            ref={subtitleRef}
            className="w-full max-w-3xl space-y-3 text-left text-base font-light leading-relaxed text-slate-200 md:text-center md:text-lg"
          >
            {SUBTITLE_LINES.map((line, index) => (
              <span
                key={line}
                data-line
                className="block bg-gradient-to-r from-transparent via-white/40 to-transparent bg-[length:200%_100%] bg-[position:120%_50%] bg-clip-text text-transparent will-change-[transform,opacity]"
              >
                {line}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CinematicHero;
