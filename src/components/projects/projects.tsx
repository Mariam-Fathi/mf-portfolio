"use client";
import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type ProjectLink = {
  name: string;
  url: string;
  isGrouped?: boolean;
  groupedLinks?: Array<{ name: string; url: string }>;
};

type Project = {
  id: string;
  title: string;
  role: string;
  description: string;
  links: ProjectLink[];
};

type ProjectsProps = {
  scrollContainer?: HTMLDivElement | null;
};

const projects: Project[] = [
  {
    id: "personality-ai",
    title: "Multimodal Personality Analysis System",
    role: "AI Research Lead | Benha University",
    description:
      "Engineered an end-to-end multimodal AI system predicting Big Five personality traits from short video clips, integrating computer vision, audio processing, and NLP. Processed First Impressions V2 dataset (10K videos) using facial action units, emotional features, PyAudioAnalysis, and BERT embeddings. Implemented LSTNet architectures for time-series modeling and late fusion with XGBoost, achieving MAE of 0.0489 on personality trait prediction. Built web application (Node.js, MongoDB) for demonstration and candidate assessment interface.",
    links: [
      { name: "Graduation Project Book PDF", url: "#" },
      { name: "GitHub Repository", url: "#" },
    ],
  },
  {
    id: "smart-key",
    title: "Smart Key Hospitality Applications",
    role: "Lead Mobile Engineer | Tarqia",
    description:
      "A production-deployed IoT solution replacing traditional key cards with smartphone-based access control for hotels. Delivered cross-platform React Native applications for guests and staff, successfully deployed at Almadiafa Hotel and enabling enterprise contracts with Long Beach Resort. The platform transforms the complete guest journey from reservation to checkout with secure, seamless keyless access across all properties.",
    links: [
      { name: "App on Play Store", url: "#" },
    ],
  },
  {
    id: "sales-ai",
    title: "AI-Powered Cost Estimation Tool",
    role: "Full-Stack Developer | Dracode",
    description:
      "Internal tool leveraging Hugging Face pre-trained models to analyze project descriptions and generate instant cost estimates. Achieved 85% accuracy and reduced quotation time from days to minutes, addressing critical sales bottleneck in home services application. The solution streamlines the sales process by automating complex estimation workflows and providing real-time pricing insights.",
    links: [
      { name: "Demo Video", url: "#" },
    ],
  },
  {
    id: "home-services",
    title: "Home Services Platform",
    role: "Full-Stack Developer | Dracode",
    description:
      "Interactive multi-role application (client, worker, shop) with real-time order management, Google Maps integration, and WebSocket-based live tracking. Features Indrive-like on-demand service booking with real-time updates across all user roles. The platform enables seamless coordination between customers, service providers, and merchants with instant notifications and location tracking.",
    links: [
      { name: "Demo Video", url: "#" },
    ],
  },
  {
    id: "homi",
    title: "Homi: Full-Stack PropTech Platform & Data Engineering Discovery",
    role: "Full-Stack Developer & Data Engineer | Self-Directed",
    description:
      "Full-stack real estate application (React Native) with Stripe payments, Firebase push notifications, and AppWrite OAuth authentication. Built analytics dashboard providing business intelligence through revenue metrics, user engagement, and property performance visualizations. Inspired by DeepLearning.AI Data Engineering coursework, sourced 'USA Real Estate Dataset' (2.2M+ records) to build a recommendation engine. Conducted exploratory analysis revealing critical data integrity issues: 38.19% anomalous records (734k placeholder dates, 115k duplicate prices). Pivoted to data engineering, building memory-optimized auditing pipelines achieving 87.4% memory reduction and documenting 57k suspicious patterns.",
    links: [
      { name: "Kaggle Notebooks: [1], [2], [3]", url: "#", isGrouped: true, groupedLinks: [
        { name: "Real Estate Data Discovery Analysis", url: "#" },
        { name: "38.19% SUSPICIOUS RECORDS", url: "#" },
        { name: "87.4% Memory Opt + Real Estate Suspicious Patterns", url: "#" },
      ]},
      { name: "App on Play Store", url: "#" },
      { name: "Dashboard Link", url: "#" },
      { name: "Demo Video", url: "#" },
    ],
  },
];

// Color palettes from the image: blue/yellow, cream/orange, dark green/pink
const cardPalette = [
  {
    background: "#3B9EFF", // Bright blue
    headline: "#FFE500", // Yellow
    headlineStroke: "#FFE500",
    body: "#FFFFFF", // White
    link: "#FFFFFF", // White
    accent: "#FF6B9D", // Pink starburst
  },
  {
    background: "#F5F0E8", // Cream/off-white
    headline: "#FF6B35", // Orange
    headlineStroke: "#FF6B35",
    body: "#251B28", // Dark text
    link: "#251B28", // Dark text
    accent: "#3B9EFF", // Blue starburst
  },
  {
    background: "#1A4D3A", // Dark green
    headline: "#FFB6C1", // Pink
    headlineStroke: "#FFB6C1",
    body: "#FFFFFF", // White
    link: "#FFFFFF", // White
    accent: "#FFE500", // Yellow starburst
  },
];

export default function GalleryShowcase({
  scrollContainer = null,
}: ProjectsProps) {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (typeof window === "undefined") return;

      const cardElements = cardRefs.current.filter(
        (card): card is HTMLDivElement => Boolean(card)
      );

      if (!cardElements.length || !cardElements[0] || !container.current) return;

      // Find the scrollable parent (content-section)
      let scrollableParent: HTMLElement | null = container.current.parentElement;
      while (scrollableParent && !scrollableParent.classList.contains("content-section")) {
        scrollableParent = scrollableParent.parentElement;
      }

      // Set initial positions
      gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < cardElements.length; i++) {
        if (!cardElements[i]) continue;
        gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const totalCards = cardElements.length;
      const scrollHeight = scrollableParent?.scrollHeight || window.innerHeight;
      const viewportHeight = scrollableParent?.clientHeight || window.innerHeight;
      
      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: `+=${viewportHeight * (totalCards - 1)}`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          invalidateOnRefresh: true,
          scroller: scrollableParent || undefined,
        },
      });

      // Animate transitions between cards
      for (let i = 0; i < totalCards - 1; i++) {
        const currentCard = cardElements[i];
        const nextCard = cardElements[i + 1];
        const position = i;

        if (!currentCard || !nextCard) continue;

        scrollTimeline.to(
          currentCard,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position
        );

        scrollTimeline.to(
          nextCard,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <section
      id="projects"
      className="relative w-full"
      style={{
        minHeight: `${projects.length * 100}vh`,
        height: `${projects.length * 100}vh`,
        background: "#F5ECE1",
      }}
    >
      <div ref={container} className="relative w-full" style={{ height: "100vh" }}>
        <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8">
          <div className="relative h-[90%] w-[85vw] max-w-[90vw] overflow-hidden rounded-lg">
            {projects.map((project, index) => {
              const colors = cardPalette[index % cardPalette.length];

              return (
                <div
                  key={project.id}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={cn(
                    "absolute inset-0 h-full w-full rounded-4xl p-6 md:p-8 lg:p-12 flex flex-col",
                    "overflow-hidden"
                  )}
                      style={{
                        background: colors.background,
                      }}
                    >
                  {/* Links Section - Magazine Style (Above the line) */}
                  {project.links.length > 0 && (
                    <div className="mb-6 md:mb-8 relative">
                      <div className="flex flex-wrap gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-3 items-baseline justify-end">
                        {project.links.map((link, linkIndex) => {
                          // Consistent styling for all links
                          const linkClassName = "text-[10px] md:text-xs uppercase tracking-[0.12em] md:tracking-[0.15em] font-medium transition-opacity hover:opacity-70";

                          // Handle grouped links (like Kaggle Notebooks)
                          if (link.isGrouped && link.groupedLinks) {
                            const prefix = link.name.split(":")[0];
                            return (
                              <div
                                key={linkIndex}
                                className={linkClassName}
                                style={{ color: colors.link }}
                              >
                                <span>{prefix}: </span>
                                {link.groupedLinks.map((groupedLink, idx) => (
                                  <React.Fragment key={idx}>
                                    <a
                                      href={groupedLink.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="transition-opacity hover:opacity-70"
                                    >
                                      [{idx + 1}]
                                    </a>
                                    {idx < link.groupedLinks!.length - 1 && ", "}
                                  </React.Fragment>
                                ))}
                              </div>
                            );
                          }

                          return (
                            <a
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={linkClassName}
                              style={{ color: colors.link }}
                            >
                              {link.name}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Line Separator */}
                  <div
                    className="h-px w-full mb-6 md:mb-8"
                    style={{
                      backgroundColor: colors.link,
                      opacity: 0.4,
                    }}
                  />

                  {/* Content Section - Aligned with number's right edge */}
                  <div className="flex-1 flex items-end gap-6 md:gap-8">
                    {/* Big Project Number - Bottom Left */}
                    <div
                      className="select-none leading-none tracking-tight flex-shrink-0"
                            style={{
                              fontFamily:
                                '"Momo Trust Display", "Stack Sans", sans-serif',
                              fontWeight: 900,
                              WebkitTextStroke: `1px ${colors.headlineStroke}`,
                              color: colors.headline,
                        fontSize: "clamp(8rem, 25vw, 20rem)",
                              lineHeight: 1,
                        transform: "translateY(8%)",
                            } as React.CSSProperties}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>

                    {/* Text Section - Aligned with number's right edge */}
                          <div
                      className="flex flex-col gap-3 md:gap-4 text-left flex-1"
                            style={{
                              fontFamily: '"Inter", sans-serif',
                      }}
                    >
                      {/* Role */}
                            <p
                              className="text-[10px] md:text-xs tracking-[0.35em] uppercase"
                              style={{ color: colors.link }}
                            >
                              {project.role}
                            </p>

                      {/* Project Title */}
                            <h3
                        className="text-lg md:text-2xl lg:text-3xl font-semibold uppercase tracking-[0.15em] md:tracking-[0.2em] leading-tight"
                              style={{ color: colors.headline }}
                            >
                              {project.title}
                            </h3>

                      {/* Short Description */}
                            <p
                        className="text-xs md:text-sm leading-relaxed font-light max-w-2xl"
                              style={{ color: colors.body }}
                            >
                              {project.description}
                            </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
