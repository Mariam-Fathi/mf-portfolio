"use client";
import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ProjectsProps = {
  scrollContainer?: HTMLDivElement | null;
};

const projects = [
  {
    id: "smart-key",
    title: "Smart Key Hospitality Platform",
    role: "Lead Mobile Engineer",
    description:
      "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk",
    image: "/images/sk.png",
    tags: [],
    links: [
      
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Data Quality & Analytics",
    role: "Data Engineer & Analyst",
    description:
    "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk",
    image: "/images/kaggle.png",
    tags: [],
    links: [
   
    ],
  },
  {
    id: "personality-ai",
    title: "Multimodal Personality Analysis System",
    role: "AI Research Lead",
    description:
    "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk",
    image: "/images/graduation.png",
    tags: [],
    links: [
   
    ],
  },
  {
    id: "sales-ai",
    title: "Sales Estimation Automation Tool",
    role: "Full-Stack Developer",
    description:
    "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk",
    image: "/images/ai.png",
    tags: [],
    links: [],
  },
  {
    id: "homi-app",
    title: "Homi Real Estate App",
    role: "Full-Stack Developer",
    description:
    "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk",
    image: "/images/homi.png",
    tags: [],
    links: [
 
    ],
  },
  {
    id: "homi-dashboard",
    title: "Homi Real Estate Dashboard",
    role: "Full-Stack Developer",
    description:
    "End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk End-to-end digital hospitality platform transforming guest journey from reservation to checkout, replacing traditional key cards with secure smartphone-based access control across Long Beach Resort chain. lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. lkjfl;gbmfslknglk;fnagkl;nfjkbannv lorem  nkldfmnklfnbk",
    image: "/images/homi-dashboard.png",
    tags: [],
    links: [
    
    ],
  },
];

const cardPalette = [
  {
    background: "#251B28", // Perfect Plum
    headline: "#FFFFFF",
    headlineStroke: "rgba(255, 255, 255, 0.12)",
    body: "rgba(255, 255, 255, 0.74)",
    link: "rgba(255, 255, 255, 0.82)",
  },
  {
    background: "#01332B", // Minty Emerald
    headline: "#FFFFFF",
    headlineStroke: "rgba(255, 255, 255, 0.1)",
    body: "rgba(255, 255, 255, 0.76)",
    link: "rgba(255, 255, 255, 0.88)",
  },
  {
    background: "#8ABFB2", // Sea Foam
    headline: "#01332B",
    headlineStroke: "rgba(1, 51, 43, 0.18)",
    body: "rgba(1, 51, 43, 0.78)",
    link: "rgba(1, 51, 43, 0.82)",
  },
  {
    background: "#C4C4DB", // Lilac
    headline: "#01332B",
    headlineStroke: "rgba(1, 51, 43, 0.16)",
    body: "rgba(1, 51, 43, 0.8)",
    link: "#01332B",
  },
  {
    background: "#CCD982", 
    headline: "#251B28",
    headlineStroke: "rgba(37, 27, 40, 0.18)",
    body: "rgba(37, 27, 40, 0.78)",
    link: "#251B28",
  },
];

export default function GalleryShowcase({
  scrollContainer = null,
}: ProjectsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const projectsWrapperRef = useRef<HTMLDivElement>(null);
  const projectRefsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [spacerHeight, setSpacerHeight] = useState<number>(0);
  const spacerValueRef = useRef<number>(0);

  useGSAP(
    () => {
      if (
        !pinContainerRef.current ||
        !projectsWrapperRef.current ||
        (typeof window === "undefined" && !scrollContainer)
      )
        return;

      const cards = projectRefsRef.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (!cards.length) {
        setSpacerHeight(0);
        spacerValueRef.current = 0;
        return;
      }

      const baseHeight =
        pinContainerRef.current.offsetHeight || window.innerHeight || 1080;
      const totalTransitions = Math.max(cards.length - 1, 0);

      const computedSpacerHeight = scrollContainer
        ? 0
        : totalTransitions * baseHeight;

      spacerValueRef.current = computedSpacerHeight;
      setSpacerHeight(computedSpacerHeight);

      gsap.set(projectsWrapperRef.current, {
        width: "100%",
        height: `${baseHeight}px`,
      });

      const topZIndex = cards.length * 2;

      cards.forEach((card, index) => {
        gsap.set(card, {
          yPercent: index === 0 ? 0 : 110,
          zIndex: index === 0 ? topZIndex : index + 1,
          autoAlpha: 1,
        });
      });

      const timeline = gsap.timeline({
        defaults: { ease: "power2.inOut", duration: 1 },
      });

      cards.forEach((card, index) => {
        if (index === 0) return;
        timeline
          .add(() => {
            gsap.set(card, { zIndex: topZIndex + index });
          }, index - 1)
          .to(card, { yPercent: 0 }, index - 1);
      });

      const useTransformPin =
        typeof window !== "undefined" &&
        scrollContainer instanceof HTMLElement &&
        scrollContainer !== document.body &&
        scrollContainer !== document.documentElement;

      const triggerConfig: ScrollTrigger.Vars & {
        animation?: gsap.core.Animation;
      } = {
        trigger: pinContainerRef.current,
        start: `top top`,
        end: `+=${totalTransitions * baseHeight}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        snap: totalTransitions > 0 ? 1 / totalTransitions : undefined,
        pinSpacing: true,
        invalidateOnRefresh: true,
        animation: timeline,
        onLeave: () => {
          if (!scrollContainer) {
            setSpacerHeight(0);
          }
        },
        onEnterBack: () => {
          if (!scrollContainer) {
            setSpacerHeight(spacerValueRef.current);
          }
        },
      };

      if (scrollContainer) {
        triggerConfig.scroller = scrollContainer;
        triggerConfig.pinType = useTransformPin ? "transform" : "fixed";
      }

      const pinTrigger = ScrollTrigger.create(triggerConfig);

      const handleResize = () => {
        const nextHeight =
          pinContainerRef.current?.offsetHeight || window.innerHeight || baseHeight;

        const updatedSpacerHeight = scrollContainer
          ? 0
          : Math.max((cards.length - 1) * nextHeight, 0);

        spacerValueRef.current = updatedSpacerHeight;
        setSpacerHeight(updatedSpacerHeight);

        gsap.set(projectsWrapperRef.current, {
          height: `${nextHeight}px`,
        });

        cards.forEach((card, index) => {
          gsap.set(card, {
            yPercent: index === 0 ? 0 : 110,
            zIndex: index === 0 ? topZIndex : index + 1,
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
        spacerValueRef.current = 0;
      };
    },
    { scope: containerRef, dependencies: [scrollContainer] }
  );

  const containerClassName = scrollContainer
    ? "relative min-h-full w-full"
    : "relative min-h-full w-full";

  return (
    <section
      id="projects"
      className="relative h-full w-full overflow-x-hidden"
      style={{
        minHeight: "100vh",
        background: "#FFFFFF",
      }}
    >
      <div
        ref={containerRef}
        className={containerClassName}
      >
        {/* Pinned Container - Full Viewport Fixed */}
        <div
          ref={pinContainerRef}
          className="relative w-full"
          style={{
            height: "100dvh",
            minHeight: "100dvh",
            paddingTop: "6vh",
            paddingBottom: "6vh",
            overflow: "hidden",
            background: "#FFFFFF",
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
              
              const colors = cardPalette[index % cardPalette.length];
              const verticalOffset = index * 12;

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
                  <div className="w-full w-[100vw] h-[100vh] mx-auto  flex flex-col relative">
                    {/* Rounded Card Container with Hero Background */}
                    <div 
                      className="w-full h-full px-6 md:px-8 lg:px-12 pt-6 md:pt-8 lg:pt-12 pb-3 md:pb-4 lg:pb-6 relative overflow-hidden"
                      style={{
                        background: colors.background,
                      }}
                    >
                      <div className="relative flex h-full w-full">
                        <div
                          className="absolute flex items-end gap-8"
                          style={{
                            bottom: `${verticalOffset}px`,
                            // left: "6%",
                          }}
                        >
                          {/* Hero Number */}
                          <div
                            className="select-none leading-none tracking-tight"
                            style={{
                              fontFamily:
                                '"Momo Trust Display", "Stack Sans", sans-serif',
                              fontWeight: 900,
                              WebkitTextStroke: `1px ${colors.headlineStroke}`,
                              color: colors.headline,
                              fontSize: "clamp(12rem, 38vw, 28rem)",
                              lineHeight: 1,
                              transform: "translateY(14%)",
                            } as React.CSSProperties}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                          {/* Detail Block */}
                          <div
                            className="flex flex-col gap-4 text-left"
                            style={{
                              // maxWidth: "min(700px, 70vw)",
                            }}
                          >
                            <div className="w-full flex justify-center">
                              <div
                                className="relative w-full max-w-[520px] aspect-[4/3] overflow-hidden"
                              >
                                <img
                                  src={project.image}
                                  alt={project.title}
                                  className="absolute inset-0 h-full w-full object-contain"
                                  style={{ mixBlendMode: "normal" }}
                                />
                              </div>
                            </div>
                            <div
                              className="h-px w-full"
                              style={{ backgroundColor: colors.link, opacity: 0.4 }}
                            />
                            <p
                              className="text-[10px] md:text-xs tracking-[0.35em] uppercase"
                              style={{ color: colors.link }}
                            >
                              {project.role}
                            </p>
                            <h3
                              className="text-sm md:text-base font-semibold uppercase tracking-[0.2em]"
                              style={{ color: colors.headline }}
                            >
                              {project.title}
                            </h3>
                            <p
                              className="text-xs md:text-sm leading-relaxed font-light"
                              style={{ color: colors.body }}
                            >
                              {project.description}
                            </p>
                            {project.tags.length > 0 && (
                              <div
                                className="flex flex-wrap gap-2 text-[10px] md:text-xs uppercase tracking-[0.25em] font-medium opacity-80"
                                style={{ color: colors.link }}
                              >
                                {project.tags.map((tag) => (
                                  <span key={tag}>{tag}</span>
                                ))}
                              </div>
                            )}
                            {project.links.length > 0 && (
                              <div className="flex flex-wrap gap-3 text-[10px] md:text-xs tracking-[0.25em] uppercase">
                                {project.links.map((link, i) => (
                                  <a
                                    key={i}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="opacity-80 transition-opacity hover:opacity-100"
                                    style={{ color: colors.link }}
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
