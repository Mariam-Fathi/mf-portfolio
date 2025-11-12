"use client";

import React, { useEffect, useRef } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconFileDescription,
  IconLetterK,
} from "@tabler/icons-react";
import { gsap } from "gsap";

type TablerIcon = React.ComponentType<
  React.ComponentProps<typeof IconBrandGithub>
>;

type ContactTile = {
  id: string;
  label: string;
  caption: string;
  href: string;
  background: string;
  accent: string;
  icon: TablerIcon;
  position: React.CSSProperties;
};

const contactTiles: ContactTile[] = [
  {
    id: "kaggle",
    label: "Kaggle",
    caption: "kaggle.com/mariamfathi",
    href: "https://www.kaggle.com/mariamfathiamin",
    background: "linear-gradient(135deg, rgba(32, 190, 255, 0.15) 0%, rgba(32, 190, 255, 0.05) 100%)",
    accent: "#20BEFF",
    icon: IconLetterK,
    position: {
      top: "28%",
      left: "18%",
    },
  },
  {
    id: "github",
    label: "GitHub",
    caption: "github.com/mariamfathi",
    href: "https://github.com/Mariam-Fathi",
    background: "linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(139, 92, 246, 0.05) 100%)",
    accent: "#8B5CF6",
    icon: IconBrandGithub,
    position: {
      top: "26%",
      right: "18%",
    },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    caption: "linkedin.com/in/mariamfathi",
    href: "https://www.linkedin.com/in/mariam-fathi-siam",
    background: "linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0.05) 100%)",
    accent: "#10B981",
    icon: IconBrandLinkedin,
    position: {
      bottom: "28%",
      left: "20%",
    },
  },
  {
    id: "email",
    label: "Email",
    caption: "mariam.fathi.siam@outlook.com",
    href: "mailto:mariam.fathi.siam@outlook.com",
    background: "linear-gradient(135deg, rgba(249, 115, 22, 0.15) 0%, rgba(249, 115, 22, 0.05) 100%)",
    accent: "#F97316",
    icon: IconMail,
    position: {
      bottom: "26%",
      right: "18%",
    },
  },
];

const Contact: React.FC = () => {
  const textRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const mobileTilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Playful text animation - bouncy and energetic
    if (textRef.current) {
      const text = textRef.current;
      const textContent = text.textContent || '';
      text.innerHTML = '';
      
      // Create spans for each character with random initial positions
      textContent.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        
        // Random starting positions for playful effect
        const randomX = (Math.random() - 0.5) * 200;
        const randomY = (Math.random() - 0.5) * 200;
        const randomRotation = (Math.random() - 0.5) * 360;
        const randomScale = Math.random() * 0.5 + 0.5;
        
        span.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotation}deg) scale(${randomScale})`;
        text.appendChild(span);
      });

      // Bouncy character animation
      gsap.to(text.children, {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        duration: 1.2,
        stagger: {
          each: 0.1,
          from: "random",
        },
        ease: "elastic.out(1, 0.5)",
      });

      // Add wobbly text effect on hover
      text.addEventListener('mouseenter', () => {
        gsap.to(text.children, {
          rotation: () => gsap.utils.random(-10, 10),
          y: () => gsap.utils.random(-5, 5),
          x: () => gsap.utils.random(-3, 3),
          duration: 0.3,
          stagger: 0.03,
          ease: "sine.out"
        });
      });

      text.addEventListener('mouseleave', () => {
        gsap.to(text.children, {
          rotation: 0,
          y: 0,
          x: 0,
          duration: 0.5,
          stagger: 0.02,
          ease: "elastic.out(1, 0.3)"
        });
      });
    }

    // Desktop tiles - playful entrance and continuous animation
    if (tilesRef.current) {
      const tiles = tilesRef.current.children;
      const floatTimelines = new Map<Element, gsap.core.Timeline>();
      
      // Random entrance from different directions
      Array.from(tiles).forEach((tile, index) => {
        const directions = [
          { x: -200, y: -100, rotation: -45 },
          { x: 200, y: -100, rotation: 45 },
          { x: -200, y: 100, rotation: -30 },
          { x: 200, y: 100, rotation: 30 }
        ];
        
        const dir = directions[index % directions.length];
        
        gsap.fromTo(tile,
          {
            opacity: 0,
            x: dir.x,
            y: dir.y,
            rotation: dir.rotation,
            scale: 0,
          },
          {
            opacity: 1,
            x: 0,
            y: 0,
            rotation: 0,
            scale: 1,
            duration: 1.5,
            delay: 0.5 + (index * 0.2),
            ease: "back.out(1.7)",
          }
        );
      });

      // Continuous playful floating with different patterns
      Array.from(tiles).forEach((tile, index) => {
        const floatTimeline = gsap.timeline({ repeat: -1, yoyo: true });

        // Each tile has unique floating pattern
        const floatHeight = 15 + (index * 3);
        const floatDuration = 2.5 + (index * 0.5);

        floatTimeline
          .to(tile, {
            y: `-=${floatHeight}`,
            duration: floatDuration,
            ease: "sine.inOut",
          })
          .to(tile, {
            y: `+=${floatHeight}`,
            duration: floatDuration,
            ease: "sine.inOut",
          });

        floatTimelines.set(tile, floatTimeline);
      });

      // Playful hover effects
      Array.from(tiles).forEach((tile) => {
        tile.addEventListener("mouseenter", () => {
          const timeline = floatTimelines.get(tile);
          timeline?.pause();

          // Gentle hover lift
          gsap.to(tile, {
            y: -18,
            scale: 1.08,
            duration: 0.45,
            ease: "sine.out",
          });

          // Icon jump effect
          const icon = tile.querySelector("span:first-child");
          if (icon) {
            gsap.to(icon, {
              y: -8,
              scale: 1.12,
              duration: 0.45,
              ease: "sine.out",
            });
          }
        });

        tile.addEventListener("mouseleave", () => {
          const timeline = floatTimelines.get(tile);

          // Spring back to original position
          gsap.to(tile, {
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: "power2.out",
            onComplete: () => {
              timeline?.restart();
            },
          });

          // Icon spring back
          const icon = tile.querySelector("span:first-child");
          if (icon) {
            gsap.to(icon, {
              y: 0,
              scale: 1,
              duration: 0.4,
              ease: "power2.out",
            });
          }
        });
      });
    }

    // Mobile tiles - fun slide-in with bounce
    if (mobileTilesRef.current) {
      const mobileTiles = mobileTilesRef.current.children;
      
      gsap.fromTo(mobileTiles,
        {
          opacity: 0,
          x: -100,
          scale: 0.8,
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "bounce.out",
          delay: 1,
        }
      );

      // Add tap effects for mobile
      Array.from(mobileTiles).forEach((tile) => {
        tile.addEventListener('click', () => {
          gsap.to(tile, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
          });
        });
      });
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center overflow-visible bg-[#F5ECE1] text-[#111827]"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_top_left,_rgba(255,246,223,0.65),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_bottom_right,_rgba(229,246,255,0.7),_transparent_55%)]" />
      </div>

      <div className="relative flex min-h-screen w-full items-center justify-center">
        <h1 
          ref={textRef}
          className="relative z-10 w-full text-center font-black uppercase leading-[0.78] text-[clamp(6rem,20vw,24rem)] tracking-tight text-[#0F172A] cursor-pointer hover:scale-105 transition-transform duration-300"
        >
          MEET ME
        </h1>

        <div ref={tilesRef} className="absolute inset-0 hidden lg:block">
          {contactTiles.map(
            ({ id, label, caption, href, background, accent, icon: Icon, position }) => (
              <a
                key={id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group absolute flex items-center gap-3 rounded-full p-2 cursor-pointer"
                style={position}
              >
                <span
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-lg ring-1 ring-black/5"
                  style={{ 
                    color: accent,
                    background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 100%)`
                  }}
                >
                  <Icon className="h-7 w-7" stroke={1.7} />
                </span>

                <span
                  className="flex flex-col gap-0 rounded-2xl px-4 py-3 text-sm font-semibold shadow-lg ring-1 ring-black/5 backdrop-blur-sm"
                  style={{ 
                    background, 
                    color: "#0F172A",
                  }}
                >
                  <span className="text-xs uppercase tracking-wide text-black/60">
                    {label}
                  </span>
                  <span className="text-sm font-semibold">{caption}</span>
                </span>
              </a>
            ),
          )}
        </div>

        <div ref={mobileTilesRef} className="relative z-20 mt-12 flex w-full flex-col gap-4 px-6 lg:hidden">
          {contactTiles.map(({ id, label, caption, href, background, accent, icon: Icon }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg ring-1 ring-black/5 backdrop-blur-sm active:scale-95 transition-transform"
              style={{ background }}
            >
              <span
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-md ring-1 ring-black/5"
                style={{ 
                  color: accent,
                  background: `linear-gradient(135deg, ${accent}20 0%, ${accent}10 100%)`
                }}
              >
                <Icon className="h-6 w-6" stroke={1.7} />
              </span>
              <span className="flex flex-col">
                <span className="text-xs uppercase tracking-wide text-black/60">
                  {label}
                </span>
                <span className="text-sm font-semibold text-[#0F172A]">
                  {caption}
                </span>
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;