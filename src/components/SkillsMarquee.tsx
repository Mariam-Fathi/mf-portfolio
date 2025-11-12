"use client";

import React from "react";

type SkillItem = {
  label: string;
  icon: string;
};

type SkillRow = {
  id: string;
  background: string;
  textColor: string;
  shadow: string;
  tilt: number;
  skills: SkillItem[];
};

const skillRows: SkillRow[] = [
  {
    id: "ai-delivery",
    background: "#CBE9FF",
    textColor: "#0F1C24",
    shadow: "0 40px 80px rgba(16, 43, 62, 0.18)",
    tilt: -6,
    skills: [
      { label: "Predictive Analytics", icon: "/images/logos/tech-stack-8.svg" },
      { label: "Recommendation Systems", icon: "/images/logos/tech-stack-7.svg" },
      { label: "Model Deployment", icon: "/images/logos/tech-stack-1.svg" },
    ],
  },
  {
    id: "data-engineering",
    background: "#DAD6FF",
    textColor: "#1B1334",
    shadow: "0 40px 80px rgba(33, 24, 69, 0.18)",
    tilt: 5,
    skills: [
      { label: "FastAPI Services", icon: "/images/logos/tech-stack-4.svg" },
      { label: "PostgreSQL Scaling", icon: "/images/logos/tech-stack-9.svg" },
      { label: "ETL Automation", icon: "/images/logos/tech-stack-6.png" },
    ],
  },
  {
    id: "ai-ops",
    background: "#FFB7C6",
    textColor: "#241218",
    shadow: "0 40px 80px rgba(128, 28, 54, 0.22)",
    tilt: -5,
    skills: [
      { label: "Hugging Face NLP", icon: "/images/logos/tech-stack-3.svg" },
      { label: "Data Quality Ops", icon: "/images/logos/tech-stack-5.svg" },
      { label: "Team Mentorship", icon: "/icons/ideas.svg" },
    ],
  },
];

const SkillsMarquee = () => {
  return (
    <section className="skills-section">
      {skillRows.map((row, rowIndex) => {
        const repeatedSkills = [...row.skills, ...row.skills, ...row.skills];
        const duration = 24 + rowIndex * 6;

        return (
          <div
            key={row.id}
            className="skills-row-wrapper"
            style={{
              transform: `rotate(${row.tilt}deg)`,
            }}
          >
            <div
              className="skills-ribbon"
              style={{
                backgroundColor: row.background,
                color: row.textColor,
                boxShadow: row.shadow,
              }}
            >
              <div
                className={`skill-marquee-track ${rowIndex % 2 === 1 ? "skill-marquee-track--reverse" : ""}`}
                style={{ animationDuration: `${duration}s` }}
              >
                {repeatedSkills.map((skill, skillIndex) => (
                  <div key={`${row.id}-${skill.label}-${skillIndex}`} className="skill-item">
                    <span className="skill-icon">
                      <img src={skill.icon} alt={skill.label} />
                    </span>
                    <span className="skill-label">{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      <style jsx>{`
        .skills-section {
          --bleed: clamp(8rem, 14vw, 12rem);
          position: relative;
          left: 50%;
          width: 100vw;
          transform: translateX(-50%);
          background: #f5ece1;
          padding: clamp(3.5rem, 9vw, 7rem) 0;
          display: flex;
          flex-direction: column;
          gap: clamp(3rem, 6vw, 5rem);
          overflow: hidden;
        }

        .skills-row-wrapper {
          position: relative;
          width: calc(100vw + var(--bleed));
          margin-left: calc(-0.5 * var(--bleed));
          transform-origin: center;
        }

        .skills-ribbon {
          position: relative;
          overflow: hidden;
          border-radius: clamp(2.25rem, 6vw, 4rem);
          padding: clamp(1.75rem, 4vw, 2.75rem) clamp(2.75rem, 8vw, 5.5rem);
        }

        .skill-marquee-track {
          display: flex;
          align-items: center;
          gap: clamp(2.5rem, 7vw, 5rem);
          width: max-content;
          animation-name: marquee-slide;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }

        .skill-marquee-track--reverse {
          animation-direction: reverse;
        }

        .skill-item {
          display: flex;
          align-items: center;
          gap: clamp(1.25rem, 3vw, 2rem);
          font-family: "Inter", sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          font-size: clamp(2.25rem, 7vw, 3.6rem);
          letter-spacing: 0.12em;
          white-space: nowrap;
        }

        .skill-icon {
          width: clamp(3.5rem, 8vw, 4.75rem);
          height: clamp(3.5rem, 8vw, 4.75rem);
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.92);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 18px 40px rgba(16, 30, 54, 0.18);
          overflow: hidden;
        }

        .skill-icon img {
          width: 70%;
          height: 70%;
          object-fit: contain;
        }

        @keyframes marquee-slide {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (hover: hover) {
          .skills-row-wrapper:hover .skill-marquee-track,
          .skills-row-wrapper:focus-within .skill-marquee-track {
            animation-play-state: paused;
          }

          .skill-item {
            transition: transform 0.35s ease;
          }

          .skills-row-wrapper:hover .skill-item,
          .skills-row-wrapper:focus-within .skill-item {
            transform: translateY(-6px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skill-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsMarquee;

