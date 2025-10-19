"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FriendsConnectionBridge = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const couchRef = useRef(null);
  const dotsRef = useRef([]);
  const gifRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        couchRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -10,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "back.out(1.7)",
        }
      );

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
        },
        "-=1.5"
      );

      tl.fromTo(
        gifRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "back.out(1.7)",
        },
        "-=1"
      );

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 0.4,
            duration: 0.8,
            delay: index * 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        gsap.to(dot, {
          y: -15,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    },
    { scope: containerRef }
  );

  const addDotRef = (el, index) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current[index] = el;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-20 max-sm:py-0"
    >
      <div
        ref={couchRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-0"
      >
        <div className="text-yellow-400/20 text-8xl lg:text-9xl">🛋️</div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => addDotRef(el, i)}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full floating-dot"
            style={{
              left: `${10 + i * 4}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-8 tracking-tight opacity-0"
        >
          HOW IT ALL
          <br />
          <span className="text-yellow-400">CONNECTS</span>
        </h2>

        <div className="mt-12 flex flex-col items-center">
          <div className="scene-gif">
            <img
              ref={gifRef}
              src="/images/gifs/real-world.gif"
              alt="Friends celebrating success"
              className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-yellow-400/30 opacity-0"
            />
          </div>
          
          <div className="mt-12 flex flex-col items-center">
            <span className="text-gray-500 text-sm mb-4 tracking-widest uppercase">
              Continue the Journey
            </span>
            <div className="w-6 h-10 border-2 border-yellow-500/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-yellow-500 rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-20 text-4xl">🦆</div>
      <div className="absolute top-10 right-10 opacity-20 text-4xl">🍕</div>
      <div className="absolute top-1/4 left-20 opacity-20 text-3xl">👩‍🍳</div>
      <div className="absolute bottom-1/4 right-20 opacity-20 text-3xl">🦕</div>

      <style jsx>{`
        .floating-dot {
          animation: friendsFloat 7s ease-in-out infinite;
        }

        @keyframes friendsFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.6;
          }
          66% {
            transform: translateY(10px) translateX(-5px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default FriendsConnectionBridge;