"use client";

import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="flex min-h-screen w-full flex-col items-start justify-end px-8 pb-16 pt-12 text-neutral-50 sm:px-16 sm:pb-20 lg:px-24 lg:pb-28"
      style={{
        backgroundImage:
          'linear-gradient(rgba(10, 16, 14, 0.82), rgba(10, 16, 14, 0.9)), url("/images/BG.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center bottom",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="hero-heading flex flex-wrap items-end gap-x-6 gap-y-2 font-black uppercase leading-[0.88] tracking-[0.08em] text-[clamp(3.5rem,10vw,12rem)]">
        <span className="hero-word hero-word-primary" aria-label="Mariam">
          <span className="hero-letter hero-letter-0">M</span>
          <span className="hero-letter hero-letter-1">A</span>
          <span className="hero-letter hero-letter-2">R</span>
          <span className="hero-break">
            <span className="hero-role" aria-hidden="true">
              Software
              <br />
              Engineer
            </span>
            <span className="hero-letter hero-letter-break hero-letter-3 hero-letter-i">I</span>
            <span className="hero-letter hero-letter-break hero-letter-4">A</span>
            <span className="hero-letter hero-letter-break hero-letter-5">M</span>
          </span>
        </span>
        <span className="hero-word hero-word-secondary">
          <span className="hero-letter hero-letter-6">F</span>
          <span className="hero-letter hero-letter-7">A</span>
          <span className="hero-letter hero-letter-8">T</span>
          <span className="hero-letter hero-letter-9">H</span>
          <span className="hero-letter hero-letter-10">I</span>
        </span>
      </h1>

      <style jsx>{`
        .hero-heading {
            position: relative;
            --hero-secondary-offset: 0s;
            --role-reveal-duration: 1s;
            font-family: var(--font-display);
        }

        .hero-role {
            position: absolute;
            top: 0;
            left: 50%;
            transform-origin: center bottom;
            transform: translate(-50%, -105%);
            font-family: var(--font-script);
            font-size: clamp(1.25rem, 2.8vw, 2.6rem);
            color: rgba(255, 255, 255, 0.92);
            text-transform: uppercase;
            letter-spacing: clamp(0.06em, 0.3vw, 0.18em);
            line-height: 1.05;
            text-align: center;
            pointer-events: none;
            display: inline-block;
            opacity: 0;
            clip-path: inset(0 0 100% 0);
            animation:
                roleAppear 0.25s ease forwards var(--role-delay),
                roleReveal var(--role-reveal-duration) ease forwards calc(var(--role-delay) + 0.25s);
        }

        .hero-role::after {
            content: "";
            position: absolute;
            bottom: clamp(-0.35rem, -0.5vw, -0.2rem);
            left: 50%;
            transform: translateX(-50%);
            width: clamp(0.15rem, 0.35vw, 0.25rem);
            height: clamp(2.4rem, 5vw, 4rem);
            background-color: rgba(255, 255, 255, 0.92);
            opacity: 0;
            animation: caretSwipe var(--role-reveal-duration) steps(1, end) forwards calc(var(--role-delay) + 0.25s);
        }

        .hero-word {
            display: inline-flex;
            gap: clamp(0.08em, 0.65vw, 0.32em);
            opacity: 0;
            transform: translateY(60%);
            --letter-delay-offset: 0s;
            animation: slideUpFade 2.2s ease forwards;
        }

        .hero-word-primary {
            --letter-delay-offset: 0s;
            --role-delay: calc(var(--hero-secondary-offset) + 3.2s);
            animation-delay: 0.25s;
            font-size: 0.86em;
        }

        .hero-word-secondary {
          --letter-delay-offset: 0s;
          animation-delay: 0.25s;
          font-size: 0.86em;
        }

        .hero-letter {
          display: inline-block;
          opacity: 0;
          transform: translateX(-40%);
          --letter-delay: 0s;
          animation: fadeAcross 1.2s cubic-bezier(0.25, 0.85, 0.25, 1) forwards;
          animation-delay: calc(var(--letter-delay) + var(--letter-delay-offset));
        }

        .hero-letter-gap {
          width: clamp(1.5rem, 5vw, 3rem);
          transform: none;
          animation: none;
          opacity: 0;
        }

        .hero-word-secondary .hero-letter-gap {
          opacity: 1;
        }

        .hero-break {
            display: inline-flex;
            gap: clamp(0.08em, 0.6vw, 0.28em);
            position: relative;
            transform-origin: left top;
            animation: crackDrop 4.5s cubic-bezier(0.2, 0.9, 0.25, 1) forwards;
            animation-delay: calc(var(--role-delay) + var(--role-reveal-duration) + 0.6s);
        }

        .hero-letter-break {
          animation: fadeAcross 1.4s cubic-bezier(0.25, 0.85, 0.25, 1) forwards,
            colorFill 3.6s ease forwards;
          animation-delay: var(--letter-delay), 6.9s;
        }

        .hero-letter-break:not(.hero-letter-i) {
          transform-origin: center;
        }

        .hero-letter-i {
          transform: rotate(0deg) translateX(0);
        }

        .hero-letter-0 {
          --letter-delay: 0.8s;
        }
        .hero-letter-1 {
          --letter-delay: 0.9s;
        }
        .hero-letter-2 {
          --letter-delay: 1s;
        }
        .hero-letter-3 {
          --letter-delay: 1.1s;
        }
        .hero-letter-4 {
          --letter-delay: 1.2s;
        }
        .hero-letter-5 {
          --letter-delay: 1.3s;
        }
        .hero-letter-6 {
          --letter-delay: 1.4s;
        }
        .hero-letter-7 {
          --letter-delay: 1.5s;
        }
        .hero-letter-8 {
          --letter-delay: 1.6s;
        }
        .hero-letter-9 {
          --letter-delay: 1.7s;
        }
        .hero-letter-10 {
          --letter-delay: 1.8s;
        }

        @keyframes crackDrop {
            0% {
                transform: translate(0, 0) rotate(0deg);
            }
            45% {
                transform: translate(0.18em, 0.08em) rotate(4deg);
            }
            60% {
                transform: translate(0.32em, 0.12em) rotate(9deg);
            }
            80% {
                transform: translate(0.22em, 0.09em) rotate(7deg);
            }
            100% {
                transform: translate(0.32em, 0.12em) rotate(9deg);
            }
        }

        @keyframes roleAppear {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        @keyframes colorFill {
          0% {
            color: currentColor;
          }
          25% {
            color: #f8c28a;
          }
          100% {
            color: #f97316;
          }
        }

        @keyframes slideUpFade {
          0% {
            opacity: 0;
            transform: translateY(60%);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeAcross {
          0% {
            opacity: 0;
            transform: translateX(-40%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes roleReveal {
            0% {
                clip-path: inset(0 0 100% 0);
            }
            100% {
                clip-path: inset(0 0 0 0);
            }
        }

        @keyframes caretSwipe {
            0% {
                opacity: 1;
                clip-path: inset(0 0 0 0);
            }
            100% {
                opacity: 0;
                clip-path: inset(0 0 100% 0);
            }
        }
      `}</style>
    </section>
  );
};

export default Hero;

