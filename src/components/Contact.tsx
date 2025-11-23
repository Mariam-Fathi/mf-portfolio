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
    accent: "#20BEFF", // Kaggle brand blue
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
    background: "linear-gradient(135deg, rgba(36, 41, 46, 0.15) 0%, rgba(36, 41, 46, 0.05) 100%)",
    accent: "#24292e", // GitHub brand dark gray/black
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
    background: "linear-gradient(135deg, rgba(0, 119, 181, 0.15) 0%, rgba(0, 119, 181, 0.05) 100%)",
    accent: "#0077b5", // LinkedIn brand blue
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
    background: "linear-gradient(135deg, rgba(0, 120, 212, 0.15) 0%, rgba(0, 120, 212, 0.05) 100%)",
    accent: "#0078d4", // Outlook/Microsoft brand blue
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

      // Pause floating animation on hover for better UX
      Array.from(tiles).forEach((tile) => {
        tile.addEventListener("mouseenter", () => {
          const timeline = floatTimelines.get(tile);
          timeline?.pause();
        });

        tile.addEventListener("mouseleave", () => {
          const timeline = floatTimelines.get(tile);
          timeline?.restart();
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

      // No tap motion effects
    }
  }, []);

  return (
    <section
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center overflow-visible bg-[#F9E7C9] text-[#111827]"
    >
      {/* SVG Filter for Liquid Glass Effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion-contact" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence 
              type="fractalNoise" 
              baseFrequency="0.02 0.02"
              numOctaves="2" 
              seed="92" 
              result="noise" 
            />
            <feGaussianBlur 
              in="noise" 
              stdDeviation="2" 
              result="blurred" 
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="blurred" 
              scale="110"
              xChannelSelector="R" 
              yChannelSelector="G" 
            />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_top_left,_rgba(255,246,223,0.65),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_bottom_right,_rgba(229,246,255,0.7),_transparent_55%)]" />
      </div>

      <div className="relative flex min-h-screen w-full items-center justify-center">
        <h1 
          ref={textRef}
          className="relative z-10 w-full text-center font-black uppercase leading-[0.78] text-[clamp(6rem,20vw,24rem)] cursor-pointer hover:scale-105 transition-transform duration-300"
          style={{
            fontFamily: '"A Day in September", cursive',
            color: "#280B0B",
            letterSpacing: "0.1em"
          }}
        >
          LET'S TALK
        </h1>

        <div ref={tilesRef} className="absolute inset-0 hidden lg:block">
          {contactTiles.map(
            ({ id, label, caption, href, accent, icon: Icon, position }) => (
              <a
                key={id}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group absolute flex items-center gap-3 cursor-pointer"
                style={position}
              >
                <span className="contact-icon-glass flex items-center justify-center rounded-full p-2" style={{ color: accent }}>
                  <Icon className="h-7 w-7" stroke={1.7} />
                </span>

                <span className="contact-text-glass flex flex-col gap-0 rounded-2xl px-4 py-3 text-sm font-semibold" style={{ 
                  fontFamily: '"Space Grotesk", "Inter", sans-serif',
                  color: "#280B0B" 
                }}>
                  <span className="text-xs uppercase tracking-wide" style={{ color: "#C92924" }}>
                    {label}
                  </span>
                  <span className="text-sm font-semibold" style={{ color: "#280B0B" }}>{caption}</span>
                </span>
              </a>
            ),
          )}
        </div>

        <div ref={mobileTilesRef} className="relative z-20 mt-12 flex w-full flex-col gap-4 px-6 lg:hidden">
          {contactTiles.map(({ id, label, caption, href, accent, icon: Icon }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 active:scale-95 transition-transform"
            >
              <span className="contact-icon-glass-mobile flex items-center justify-center rounded-full p-2" style={{ color: accent }}>
                <Icon className="h-6 w-6" stroke={1.7} />
              </span>
              <span className="contact-text-glass-mobile flex flex-col gap-0 rounded-2xl px-4 py-3 text-sm font-semibold" style={{ 
                fontFamily: '"Space Grotesk", "Inter", sans-serif',
                color: "#280B0B" 
              }}>
                <span className="text-xs uppercase tracking-wide" style={{ color: "#C92924" }}>
                  {label}
                </span>
                <span className="text-sm font-semibold" style={{ color: "#280B0B" }}>{caption}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* Liquid Glass Effect for Icon Container - Desktop (Rounded) */
        .contact-icon-glass {
          position: relative;
          width: fit-content;
          height: fit-content;
          border-radius: 9999px;
          overflow: hidden;
          transition: all 0.3s ease;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }

        .contact-icon-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 9999px;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
        }

        .contact-icon-glass::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 9999px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion-contact);
          -webkit-filter: url(#glass-distortion-contact);
          isolation: isolate;
          pointer-events: none;
        }

        .contact-icon-glass > * {
          position: relative;
          z-index: 10;
        }

        /* Liquid Glass Effect for Text Container - Desktop (Auto-fit) */
        .contact-text-glass {
          position: relative;
          width: fit-content;
          height: fit-content;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }

        .contact-text-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 1rem;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
        }

        .contact-text-glass::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 1rem;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion-contact);
          -webkit-filter: url(#glass-distortion-contact);
          isolation: isolate;
          pointer-events: none;
        }

        .contact-text-glass > * {
          position: relative;
          z-index: 10;
        }

        /* Liquid Glass Effect for Icon Container - Mobile (Rounded) */
        .contact-icon-glass-mobile {
          position: relative;
          width: fit-content;
          height: fit-content;
          border-radius: 9999px;
          overflow: hidden;
          transition: all 0.3s ease;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }

        .contact-icon-glass-mobile::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 9999px;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
        }

        .contact-icon-glass-mobile::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 9999px;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion-contact);
          -webkit-filter: url(#glass-distortion-contact);
          isolation: isolate;
          pointer-events: none;
        }

        .contact-icon-glass-mobile > * {
          position: relative;
          z-index: 10;
        }

        /* Liquid Glass Effect for Text Container - Mobile (Auto-fit) */
        .contact-text-glass-mobile {
          position: relative;
          width: fit-content;
          height: fit-content;
          border-radius: 1rem;
          overflow: hidden;
          transition: all 0.3s ease;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }

        .contact-text-glass-mobile::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: 1rem;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
        }

        .contact-text-glass-mobile::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          border-radius: 1rem;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion-contact);
          -webkit-filter: url(#glass-distortion-contact);
          isolation: isolate;
          pointer-events: none;
        }

        .contact-text-glass-mobile > * {
          position: relative;
          z-index: 10;
        }
      `}</style>
    </section>
  );
};

export default Contact;