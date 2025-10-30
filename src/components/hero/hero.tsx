"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const MinimalCinematicHero = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const heroSectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const initialTl = gsap.timeline();

      initialTl
        .fromTo(
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
            duration: 2.5,
            ease: "power3.out",
          }
        )

        .fromTo(
          subtitleRef.current,
          {
            opacity: 0,
            y: 20,
            filter: "blur(8px)",
            height: 0,
            marginBottom: 0,
          },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            height: "auto",
            marginBottom: "4rem",
            duration: 2,
            ease: "power3.out",
          },
          "-=1.5"
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
          end: "+=250%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      scrollTl
        .to(subtitleRef.current, {
          opacity: 0,
          y: -20,
          duration: 2,
          ease: "power2.inOut",
        })

        .to(
          imageRef.current,
          {
            scale: 1.8,
            duration: 8,
            ease: "power1.inOut",
          },
          "-=1"
        )

        .to(
          overlayRef.current,
          {
            opacity: 0.3,
            duration: 6,
            ease: "power2.inOut",
          },
          "-=6"
        )

        .to(imageRef.current, {
          scale: 3,
          duration: 10,
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
        .to(titleRef.current, { top: "50%", duration: 10, ease: "sine" }, "-=6")

        .to(imageRef.current, {
          scale: 5,
          duration: 12,
          ease: "power1.inOut",
        })
        .to(
          overlayRef.current,
          {
            opacity: 0.7,
            duration: 10,
            ease: "power1.inOut",
          },
          "-=12"
        )

        // Start circular mask right when zooming OUT begins
        .set(imageRef.current, {
          clipPath: "circle(100vmax at 50vw 50vh)",
          willChange: "transform, clip-path",
        })

        .to(imageRef.current, {
          scale: 0.5,
          opacity: 0,
          duration: 15,
          ease: "power2.inOut",
        })
        .to(
          titleRef.current,
          {
            scale: 0.5,
            opacity: 0.3,
            duration: 15,
            ease: "power2.inOut",
          },
          "-=15"
        )

        .to(imageRef.current, {
          scale: 0.1,
          opacity: 0,
          duration: 8,
          clipPath: "circle(0vmax at 50vw 50vh)",
          ease: "power2.in",
        })
        .to(
          titleRef.current,
          {
            scale: 0.2,
            opacity: 0,
            duration: 8,
            ease: "power2.in",
          },
          "-=8"
        )
        .to(
          overlayRef.current,
          {
            opacity: 0,
            duration: 6,
            ease: "power2.inOut",
          },
          "-=6"
        );

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
        className="relative min-h-screen flex items-center justify-center bg-black pt-72"
      >
        <div
          ref={contentRef}
          className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        >
          <h1
            ref={titleRef}
            className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight opacity-0"
          >
            EVERYTHING
            <br />
            IS CONNECTED
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light tracking-wide opacity-0 h-0 overflow-hidden"
          >
            We're sometimes trained—whether intuitively or in school—to isolate
            knowledge into pockets, where what exists in one pocket has nothing
            to do with what's in the other. When in reality, it's a web. And the
            one ingredient that fuels that web... CURIOSITY.
          </p>

          <div className="relative">
            <img
              ref={imageRef}
              src="/images/gifs/brain-neuron.gif"
              alt="Brain neurons connecting"
              className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-700"
              style={{ transformOrigin: "center center" }}
            />
          </div>
        </div>
      </section>

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
