"use client";

import React, { useEffect, useRef, useCallback } from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
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
    accent: "#20BEFF",
    icon: IconLetterK,
    position: { top: "20%", left: "18%" },
  },
  {
    id: "github",
    label: "GitHub",
    caption: "github.com/mariamfathi",
    href: "https://github.com/Mariam-Fathi",
    accent: "#24292e",
    icon: IconBrandGithub,
    position: { top: "18%", right: "18%" },
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    caption: "linkedin.com/in/mariamfathi",
    href: "https://www.linkedin.com/in/mariam-fathi-siam",
    accent: "#0077b5",
    icon: IconBrandLinkedin,
    position: { bottom: "20%", left: "20%" },
  },
  {
    id: "email",
    label: "Email",
    caption: "mariam.f.siam@gmail.com",
    href: "mailto:mariam.f.siam@gmail.com",
    accent: "#0078d4",
    icon: IconMail,
    position: { bottom: "18%", right: "18%" },
  },
];

// ── Entrance: horizontal from both sides (left tiles from left, right tiles from right) ──
const TILE_DIRS = [
  { x: -200, y: 0, rotation: 0 },  // Kaggle (left)
  { x: 200, y: 0, rotation: 0 },   // GitHub (right)
  { x: -200, y: 0, rotation: 0 },  // LinkedIn (left)
  { x: 200, y: 0, rotation: 0 },   // Email (right)
];

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);
  const mobileTilesRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // ── Prepare text for clip-reveal animation ──
  const prepareText = useCallback(() => {
    const text = textRef.current;
    if (!text) return;
    gsap.set(text, {
      opacity: 1,
      clipPath: "inset(-20% 100% -20% 0)",
    });
  }, []);

  // ── Main animation (triggered by IntersectionObserver) ────────────
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    prepareText();

    // Collect everything that needs cleanup
    const tweens: gsap.core.Tween[] = [];
    const timelines: gsap.core.Timeline[] = [];
    const listeners: { el: Element | HTMLElement; type: string; fn: EventListener }[] = [];

    const addListener = (el: Element | HTMLElement, type: string, fn: EventListener) => {
      el.addEventListener(type, fn);
      listeners.push({ el, type, fn });
    };

    // ── Animate when section scrolls into view ─────────────────────
    const runAnimations = () => {
      if (hasAnimated.current) return;
      hasAnimated.current = true;

      // ── 1. Text write-on clip reveal ──────────────────────────────
      const text = textRef.current;
      if (text) {
        tweens.push(
          gsap.to(text, {
            clipPath: "inset(-20% 0% -20% 0)",
            duration: 2,
            ease: "power1.inOut",
            onComplete: () => {
              gsap.set(text, { clipPath: "none" });
            },
          }),
        );
      }

      // ── 2. Desktop tiles ─────────────────────────────────────────
      if (tilesRef.current) {
        const tiles = Array.from(tilesRef.current.children);

        tiles.forEach((tile, i) => {
          const dir = TILE_DIRS[i % TILE_DIRS.length];

          tweens.push(
            gsap.fromTo(
              tile,
              { opacity: 0, x: dir.x, y: dir.y, rotation: dir.rotation, scale: 0 },
              {
                opacity: 1,
                x: 0,
                y: 0,
                rotation: 0,
                scale: 1,
                duration: 1.5,
                delay: 0.5 + i * 0.2,
                ease: "back.out(1.7)",
              },
            ),
          );

          // Continuous float — uses absolute yoyo so values never drift
          const floatH = 12 + i * 3;
          const floatD = 2.5 + i * 0.4;
          const tl = gsap.timeline({ repeat: -1, yoyo: true, delay: 1.5 + i * 0.2 });
          tl.to(tile, { y: -floatH, duration: floatD, ease: "sine.inOut" });
          timelines.push(tl);

          // Pause float on hover
          addListener(tile, "mouseenter", () => tl.pause());
          addListener(tile, "mouseleave", () => tl.resume());
        });
      }

      // ── 3. Mobile tiles ──────────────────────────────────────────
      if (mobileTilesRef.current) {
        tweens.push(
          gsap.fromTo(
            mobileTilesRef.current.children,
            { opacity: 0, x: -100, scale: 0.8 },
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              stagger: 0.2,
              ease: "bounce.out",
              delay: 0.6,
            },
          ),
        );
      }
    };

    // ── IntersectionObserver — fire once when 20% visible ──────────
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          runAnimations();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(section);

    // ── Cleanup ────────────────────────────────────────────────────
    return () => {
      observer.disconnect();
      tweens.forEach((t) => t.kill());
      timelines.forEach((t) => t.kill());
      listeners.forEach(({ el, type, fn }) => el.removeEventListener(type, fn));
    };
  }, [prepareText]);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative flex min-h-screen w-full items-center justify-center overflow-visible bg-[#F9E7C9] text-[#111827]"
    >
      {/* SVG Filter for Liquid Glass Effect */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="glass-distortion-contact" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.02" numOctaves="2" seed="92" result="noise" />
            <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
            <feDisplacementMap in="SourceGraphic" in2="blurred" scale="110" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_top_left,_rgba(255,246,223,0.65),_transparent_55%)]" />
        <div className="absolute inset-0 opacity-[0.35] bg-[radial-gradient(circle_at_bottom_right,_rgba(229,246,255,0.7),_transparent_55%)]" />
      </div>

      <div className="relative flex flex-col lg:flex-row min-h-screen w-full items-center justify-center lg:justify-center">
        <h1
          ref={textRef}
          className="relative z-10 w-full text-left lg:text-center font-black uppercase leading-[0.78] text-[clamp(2rem,8vw,12rem)] md:text-[clamp(4rem,14vw,14rem)] cursor-pointer transition-none mb-8 lg:mb-0 px-6 lg:px-0"
          style={{
            fontFamily: '"Momo Trust Display", "Stack Sans", sans-serif',
            color: "#280B0B",
            letterSpacing: "0.1em",
          }}
        >
          LET&apos;S TALK
        </h1>

        <div ref={tilesRef} className="absolute inset-0 z-20 hidden lg:block">
          {contactTiles.map(({ id, label, caption, href, accent, icon: Icon, position }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="group absolute flex items-center gap-3 cursor-pointer"
              style={position}
            >
              <span className="contact-glass contact-glass--icon flex items-center justify-center rounded-full p-2" style={{ color: accent }}>
                <Icon className="h-7 w-7" stroke={1.7} />
              </span>
              <span
                className="contact-glass contact-glass--text flex flex-col gap-0 rounded-2xl px-4 py-3 text-sm font-semibold"
                style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif', color: "#280B0B" }}
              >
                <span className="text-xs uppercase tracking-wide" style={{ color: "#280B0B" }}>{label}</span>
                <span className="text-sm font-semibold" style={{ color: "#6A0610" }}>{caption}</span>
              </span>
            </a>
          ))}
        </div>

        <div ref={mobileTilesRef} className="relative z-20 flex w-full flex-col gap-4 px-6 lg:hidden">
          {contactTiles.map(({ id, label, caption, href, accent, icon: Icon }) => (
            <a
              key={id}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="flex items-center gap-3 active:scale-95 transition-transform"
            >
              <span className="contact-glass contact-glass--icon flex items-center justify-center rounded-full p-2" style={{ color: accent }}>
                <Icon className="h-6 w-6" stroke={1.7} />
              </span>
              <span
                className="contact-glass contact-glass--text flex flex-col gap-0 rounded-2xl px-4 py-3 text-sm font-semibold"
                style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif', color: "#280B0B" }}
              >
                <span className="text-xs uppercase tracking-wide" style={{ color: "#C92924" }}>{label}</span>
                <span className="text-sm font-semibold" style={{ color: "#280B0B" }}>{caption}</span>
              </span>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        /* ── Shared Liquid Glass ──────────────────────────────────── */
        .contact-glass {
          position: relative;
          width: fit-content;
          height: fit-content;
          overflow: hidden;
          transition: all 0.3s ease;
          isolation: isolate;
          box-shadow: 0px 6px 21px -8px rgba(109, 109, 109, 0.2);
        }
        .contact-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          z-index: 0;
          box-shadow: inset 0 0 8px -2px rgba(109, 109, 109, 0.3);
          background-color: rgba(109, 109, 109, 0);
          pointer-events: none;
          border-radius: inherit;
        }
        .contact-glass::after {
          content: '';
          position: absolute;
          inset: 0;
          z-index: -1;
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          filter: url(#glass-distortion-contact);
          -webkit-filter: url(#glass-distortion-contact);
          isolation: isolate;
          pointer-events: none;
          border-radius: inherit;
        }
        .contact-glass > * {
          position: relative;
          z-index: 10;
        }

        /* Shape variants */
        .contact-glass--icon {
          border-radius: 9999px;
        }
        .contact-glass--text {
          border-radius: 1rem;
        }
      `}</style>
    </section>
  );
};

export default Contact;
