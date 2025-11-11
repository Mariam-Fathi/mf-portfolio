"use client";

import React from "react";

const skillRows: string[][] = [
  [
    "Insights",
    "Budgeting",
    "Savings",
    "Split bill",
    "Security",
    "Payments",
    "Planning",
    "Tracking",
  ],
  [
    "Money",
    "Wallets",
    "Expenses",
    "Control",
    "Transfers",
    "Bill pay",
    "Automation",
    "Analytics",
  ],
  [
    "Income",
    "Recurring",
    "Goals",
    "Smart spend",
    "Deposit",
    "Salary",
    "Reports",
    "Forecasts",
  ],
];

const palette = {
  background: "#E2E6E7",
  foreground: "#0B8658",
  accent: "#0B8658",
  accentSoft: "rgba(11, 134, 88, 0.12)",
  accentSoftEnd: "rgba(11, 134, 88, 0)",
  pillTextOnAccent: "#E2E6E7",
};

const SkillsMarquee = () => {
  return (
    <div
      className="relative flex h-full w-full flex-col justify-center gap-12 px-4 py-12 sm:px-10 lg:px-16"
      style={{
        background: palette.background,
        color: palette.foreground,
      }}
    >
      {skillRows.map((skills, rowIndex) => {
        const repeatedSkills = [...skills, ...skills];
        const duration = 18 + rowIndex * 4;

        return (
          <div
            key={`row-${rowIndex}`}
            className="skill-marquee-row group relative flex h-24 w-full items-center overflow-hidden"
          >
            <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r" style={{ backgroundImage: `linear-gradient(to right, ${palette.background}, ${palette.background}D9, transparent)` }} />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l" style={{ backgroundImage: `linear-gradient(to left, ${palette.background}, ${palette.background}D9, transparent)` }} />

            <div
              className={`skill-marquee-track flex min-w-max items-center gap-5 px-6 ${rowIndex % 2 === 1 ? "skill-marquee-track--reverse" : ""}`}
              style={{ animationDuration: `${duration}s` }}
            >
              {repeatedSkills.map((skill, skillIndex) => (
                <span
                  key={`${skill}-${skillIndex}`}
                  className="skill-pill inline-flex items-center justify-center rounded-full px-10 py-3 text-lg font-semibold uppercase tracking-[0.3em] transition-transform duration-200 border border-transparent"
                  style={{
                    backgroundColor:
                      skillIndex % 2 === 0 ? palette.accent : palette.accentSoft,
                    color:
                      skillIndex % 2 === 0 ? palette.pillTextOnAccent : palette.accent,
                    boxShadow:
                      skillIndex % 2 === 0
                        ? "0 12px 24px rgba(11, 134, 88, 0.25)"
                        : "inset 0 0 0 1px rgba(11, 134, 88, 0.18)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .skill-marquee-track {
          animation-name: marquee-slide;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .skill-marquee-track--reverse {
          animation-direction: reverse;
        }

        .skill-marquee-row:hover .skill-marquee-track,
        .skill-marquee-row:focus-within .skill-marquee-track {
          animation-play-state: paused;
        }

        .group:hover .skill-pill,
        .group:focus-within .skill-pill {
          transform: scale(1.05);
        }

        @keyframes marquee-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default SkillsMarquee;

