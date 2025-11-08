"use client";

import React, { useMemo } from "react";

const primaryText = "#FEFCE0";
const accentText = "#F97316";

const stripePalette = [
  "#0A130E",
  "#0F1B15",
  "#14231C",
  "#1A2C23",
  "#1F342A",
  "#253C31",
  "#2A4438",
  "#304C3F",
  "#355546",
  "#3B5D4D",
  "#416554",
  "#466D5B",
];

const Hero: React.FC = () => {
  const stripeBackground = useMemo(() => {
    const stops = stripePalette
      .map((color, index) => {
        const start = (index / stripePalette.length) * 100;
        const end = ((index + 1) / stripePalette.length) * 100;
        return `${color} ${start}% ${end}%`;
      })
      .join(", ");

    return `linear-gradient(90deg, ${stops})`;
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden"
      style={{
        backgroundImage: stripeBackground,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(8,14,11,0.1) 0%, rgba(8,14,11,0.6) 75%, rgba(8,14,11,0.85) 100%)",
        }}
      />



      <div className="pointer-events-none absolute bottom-8 left-1/2 sm:bottom-12 lg:bottom-16 -translate-x-1/2">
        <div className="scan-container">
          <h1
            className="text-center font-black uppercase leading-[0.9]"
            style={{
              color: primaryText,
              fontSize: "clamp(4rem, 12vw, 9.5rem)",
              letterSpacing: "0.08em",
              whiteSpace: "nowrap",
            }}
          >
            <span className="scan-text">
              <span className="word word-mariam">
                <span className="letter">M</span>
                <span className="letter">A</span>
                <span className="letter">R</span>
                <span className="iam-group">
                  <span
                    className="letter highlight-letter"
                    style={{ animationDelay: "1.9s" }}
                  >
                    I
                  </span>
                  <span
                    className="letter highlight-letter"
                    style={{ animationDelay: "2.1s" }}
                  >
                    A
                  </span>
                  <span
                    className="letter highlight-letter"
                    style={{ animationDelay: "2.3s" }}
                  >
                    M
                  </span>
                  <span className="iam-overlay">
                    <span className="iam-typewriter" aria-hidden="true">
                      Software Engineer
                    </span>
                  </span>
                </span>
              </span>
              <span className="word word-fathi" style={{ animationDelay: "0.35s" }}>
                <span className="letter">F</span>
                <span className="letter">A</span>
                <span className="letter">T</span>
                <span className="letter">H</span>
                <span className="letter">I</span>
              </span>
            </span>
          </h1>
        </div>
      </div>
      <style jsx>{`
        .scan-container {
          position: relative;
          display: inline-block;
          overflow: visible;
          padding-bottom: 0.25rem;
        }

        .scan-text {
          display: inline-flex;
          gap: 1.5rem;
          position: relative;
        }

        .scan-text {
          display: inline-flex;
          position: relative;
        }

        .scan-text .word {
          display: inline-flex;
          transform: translateY(110%);
          opacity: 0;
          animation: textRise 1.6s cubic-bezier(0.22, 0.61, 0.36, 1) forwards;
          position: relative;
        }

        .iam-group {
          display: inline-flex;
          position: relative;
          gap: 0.025em;
        }

        .iam-overlay {
          position: absolute;
          left: 50%;
          top: -0.2em;
          transform: translate(-50%, -95%);
          pointer-events: none;
          display: inline-flex;
          justify-content: center;
          width: max-content;
          min-width: max-content;
          z-index: 1;
        }

        .iam-typewriter {
          position: relative;
          display: inline-block;
          font-size: clamp(0.58rem, 1vw, 1.05rem);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: ${accentText};
          font-weight: 500;
          font-style: italic;
          opacity: 0;
          white-space: nowrap;
          padding-right: 0.45em;
          overflow: hidden;
          clip-path: inset(0 100% 0 0);
          animation:
            fadeIn 0.3s ease forwards 1.9s,
            handwriting 2.6s steps(22) forwards 2.2s,
            cursorHide 0.3s linear forwards 5.4s;
        }

        .iam-typewriter::after {
          content: "";
          position: absolute;
          top: 0;
          right: 0.12em;
          width: 1px;
          height: 100%;
          background: ${accentText};
          opacity: 0;
          animation:
            fadeIn 0.1s linear forwards 2.2s,
            cursorTrail 2.6s steps(22) forwards 2.2s,
            cursorBlink 0.4s steps(2) 4 forwards 4.8s,
            cursorHide 0.3s linear forwards 5.4s;
        }

        .word-mariam {
          animation-delay: 0.2s;
        }

        .word-fathi {
          animation-delay: 0.35s;
        }

        .letter {
          display: inline-block;
          color: ${primaryText};
        }

        .highlight-letter {
          animation-name: colorSweep;
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
          animation-fill-mode: forwards;
        }

        @keyframes textRise {
          0% {
            transform: translateY(110%);
            opacity: 0;
          }
          40% {
            opacity: 1;
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes colorSweep {
          0% {
            color: ${primaryText};
          }
          100% {
            color: ${accentText};
          }
        }

        @keyframes fadeIn {
          to {
            opacity: 1;
          }
        }

        @keyframes handwriting {
          to {
            clip-path: inset(0 0 0 0);
          }
        }

        @keyframes cursorTrail {
          to {
            transform: translateX(100%);
            opacity: 1;
          }
        }

        @keyframes cursorBlink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.2;
          }
        }

        @keyframes cursorHide {
          to {
            opacity: 0;
          }
        }

      `}</style>
    </section>
  );
};

export default Hero;

