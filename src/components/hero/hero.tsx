"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MinimalCinematicHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const repriseSubtitleRef = useRef<HTMLParagraphElement | null>(null);
  const subtitleLineRefs = useRef<HTMLSpanElement[]>([]);
  const curiosityRef = useRef<HTMLDivElement | null>(null);

  // Match GIF width to title width
  useEffect(() => {
    const matchWidths = () => {
      if (titleRef.current && imageContainerRef.current) {
        // Get the computed style to ensure we get the actual rendered width including padding
        const titleRect = titleRef.current.getBoundingClientRect();
        const titleStyle = window.getComputedStyle(titleRef.current);
        const titlePaddingLeft = parseFloat(titleStyle.paddingLeft) || 0;
        const titlePaddingRight = parseFloat(titleStyle.paddingRight) || 0;
        
        // Total width including padding
        const titleWidth = titleRect.width + titlePaddingLeft + titlePaddingRight;
        
        if (titleWidth > 0) {
          // Match the container width exactly to title width (including padding)
          imageContainerRef.current.style.width = `${titleWidth}px`;
          imageContainerRef.current.style.maxWidth = `${titleWidth}px`;
          imageContainerRef.current.style.minWidth = `${titleWidth}px`;
        }
      }
    };

    // Match on mount - wait for DOM to be ready
    const initialTimer = setTimeout(matchWidths, 100);
    
    // Match after title animation completes (title fades in)
    const animationTimer = setTimeout(matchWidths, 2500);
    
    // Match on resize with debounce
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(matchWidths, 150);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(initialTimer);
      clearTimeout(animationTimer);
      clearTimeout(resizeTimer);
    };
  }, []);

  useGSAP(
    () => {
      const initialTl = gsap.timeline();

      gsap.set(subtitleRef.current, {
        opacity: 0,
        visibility: "hidden",
        display: "none",
      });

      initialTl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 4,
          ease: "power3.out",
        }
      );

      const overlay = document.createElement("div");
      overlay.className =
        "fixed inset-0 bg-black z-30 pointer-events-none opacity-0";
      overlayRef.current = overlay;
      document.body.appendChild(overlay);

      gsap.set(imageRef.current, { transformOrigin: "center center" });

      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "bottom bottom",
          end: "+=340%",
          scrub: 2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(
          imageRef.current,
          {
            scale: 1.8,
            duration: 12,
            ease: "power1.inOut",
          },
          "-=1"
        )

        .to(
          overlayRef.current,
          {
            opacity: 0.3,
            duration: 9,
            ease: "power2.inOut",
          },
          "-=9"
        )

        .to(imageRef.current, {
          scale: 3,
          duration: 15,
          ease: "power1.inOut",
        })

        .to(imageRef.current, {
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          border: "none",
          objectFit: "cover",
          objectPosition: "center center",
          zIndex: 35,
          duration: 0.1,
          ease: "none",
        })

        .to(
          titleRef.current,
          {
            position: "fixed",
            top: "20%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            zIndex: 40,
            fontSize: "6rem",
            textAlign: "center",
            margin: 0,
            lineHeight: "1.1",
            duration: 0.1,
            ease: "none",
          },
          "-=6"
        )
        .to(titleRef.current, { top: "50%", duration: 15, ease: "sine" }, "-=6")

        .to(imageRef.current, {
          scale: 5,
          duration: 18,
          ease: "power1.inOut",
        })
        .to(
          overlayRef.current,
          {
            opacity: 0.7,
            duration: 15,
            ease: "power1.inOut",
          },
          "-=18"
        )

        .set(imageRef.current, {
          clipPath: "circle(100vmax at 50vw 50vh)",
          willChange: "transform, clip-path",
        })

        .to(imageRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 22,
          ease: "power2.inOut",
        })
        .to(
          titleRef.current,
          {
            scale: 0.5,
            opacity: 0.3,
            duration: 22,
            ease: "power2.inOut",
          },
          "-=22"
        )

        .to(imageRef.current, {
          scale: 0.1,
          opacity: 0,
          duration: 12,
          clipPath: "circle(0vmax at 50vw 50vh)",
          ease: "power2.in",
        })
        .to(
          titleRef.current,
          {
            scale: 0.2,
            opacity: 0,
            duration: 12,
            ease: "power2.in",
          },
          "-=12"
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 9,
            ease: "power2.inOut",
          },
          "-=9"
        )
        // Ensure title and everything connected is completely hidden before repriseSubtitle appears
        .set(
          titleRef.current,
          {
            opacity: 0,
            visibility: "hidden",
            display: "none",
            pointerEvents: "none",
          },
          ">"
        )
        // Add a small gap to ensure title is fully gone
        .to({}, { duration: 0.5, ease: "none" });

      scrollTl
        .set(repriseSubtitleRef.current, {
          display: "flex",
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          width: "90vw",
          maxWidth: "1200px",
          zIndex: 45,
          margin: 0,
          height: "auto",
          textAlign: "center",
          pointerEvents: "none",
          fontSize: "clamp(1.25rem, 1.5vw + 1rem, 2rem)",
          lineHeight: "1.6",
          opacity: 0.4,
          filter: "blur(12px)",
          transformOrigin: "center center",
          scale: 0.85,
        })
        .fromTo(
          repriseSubtitleRef.current,
          { opacity: 0.4, filter: "blur(12px)", scale: 0.85 },
          {
            opacity: 0.4,
            filter: "blur(0px)",
            scale: 1,
            duration: 4,
            ease: "power2.out",
          }
        )
        .set(subtitleLineRefs.current, {
          filter: "blur(8px)",
          opacity: 0.4,
          color: "#9ca3af",
        })
        .to(
          subtitleLineRefs.current,
          {
            color: "#ffffff",
            opacity: 1,
            filter: "blur(0px)",
            duration: 22,
            stagger: { amount: 6, from: "start" },
            ease: "power1.inOut",
          },
          "<"
        )
        .to({}, { duration: 4, ease: "none" })
        .to(repriseSubtitleRef.current, {
          opacity: 0,
          duration: 6,
          ease: "power2.inOut",
        })
        .set(curiosityRef.current, {
          display: "flex",
          position: "fixed",
          top: "50%",
          left: "50%",
          xPercent: -50,
          yPercent: -50,
          zIndex: 50,
          opacity: 0,
          scale: 0.5,
          clipPath: "circle(0% at 50% 50%)",
          transformOrigin: "center center",
        })
        .to(curiosityRef.current, {
          opacity: 1,
          scale: 1.2,
          clipPath: "circle(100% at 50% 50%)",
          duration: 9,
          ease: "power2.out",
        })
        .to({}, { duration: 3, ease: "none" })
        .to(curiosityRef.current, {
          opacity: 0,
          scale: 1.5,
          clipPath: "circle(0% at 50% 50%)",
          duration: 6,
          ease: "power2.inOut",
        });

      return () => {
        if (overlayRef.current && document.body.contains(overlayRef.current)) {
          document.body.removeChild(overlayRef.current);
        }
      };
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section
        ref={heroSectionRef}
        className="relative min-h-screen flex items-center justify-center bg-black pt-20 sm:pt-32 md:pt-44"
      >
        <div
          ref={contentRef}
          className="relative z-10 text-center px-6 max-w-7xl mx-auto"
        >
          <h1
            ref={titleRef}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-6 sm:mb-8 tracking-tight opacity-0 inline-block px-4"
            style={{
              width: 'fit-content',
            }}
          >
            EVERYTHING
            <br />
            IS CONNECTED
          </h1>

          <div 
            ref={imageContainerRef}
            className="relative mx-auto px-4"
            style={{
              maxWidth: '100%',
              width: 'fit-content',
            }}
          >
            <img
              ref={imageRef}
              src="/images/gifs/brain-neuron.gif"
              alt="Brain neurons connecting"
              className="w-full h-auto object-cover rounded-2xl sm:rounded-3xl shadow-2xl border border-gray-700"
              style={{ 
                transformOrigin: "center center",
                maxWidth: '100%',
                width: '100%',
              }}
            />
          </div>
        </div>
      </section>

      <p
        ref={repriseSubtitleRef}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8 opacity-0 pointer-events-none text-gray-500"
        style={{ display: "none" }}
      >
        <span className="block text-center max-w-4xl mx-auto">
          <span
            ref={(el) => {
              if (el) subtitleLineRefs.current[0] = el;
            }}
            className="block opacity-40 text-sm sm:text-base md:text-lg"
            style={{ filter: "blur(8px)", color: "#9ca3af" }}
          >
            We're sometimes trained—whether intuitively or in school—to isolate
          </span>
          <span
            ref={(el) => {
              if (el) subtitleLineRefs.current[1] = el;
            }}
            className="block opacity-40 text-sm sm:text-base md:text-lg"
            style={{ filter: "blur(8px)", color: "#9ca3af" }}
          >
            knowledge into pockets, where what exists in one pocket has nothing
          </span>
          <span
            ref={(el) => {
              if (el) subtitleLineRefs.current[2] = el;
            }}
            className="block opacity-40 text-sm sm:text-base md:text-lg"
            style={{ filter: "blur(8px)", color: "#9ca3af" }}
          >
            to do with what's in the other. When in reality, it's a web. And the
          </span>
          <span
            ref={(el) => {
              if (el) subtitleLineRefs.current[3] = el;
            }}
            className="block opacity-40 text-sm sm:text-base md:text-lg"
            style={{ filter: "blur(8px)", color: "#9ca3af" }}
          >
            one ingredient that fuels that web...
          </span>
        </span>
      </p>

      <div
        ref={curiosityRef}
        className="fixed inset-0 z-50 flex items-center justify-center opacity-0 pointer-events-none"
        style={{ display: "none" }}
      >
        <span className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-light text-white tracking-tight">
          CURIOSITY
        </span>
      </div>

      <style jsx>{`
        @keyframes cinematicFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.05;
          }
          20% {
            transform: translateY(-8px) translateX(3px);
            opacity: 0.1;
          }
          40% {
            transform: translateY(-16px) translateX(-3px);
            opacity: 0.15;
          }
          60% {
            transform: translateY(-24px) translateX(2px);
            opacity: 0.2;
          }
          80% {
            transform: translateY(-18px) translateX(-2px);
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

export default MinimalCinematicHero;
