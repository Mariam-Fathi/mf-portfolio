"use client";

import React from "react";
import clsx from "clsx";

type ExperienceCard = {
  id: number;
  role: string;
  company: string;
  type: string;
  duration: string;
  noteColor: string;
  textColor: string;
  accentColor: string;
  tapeColors: [string, string];
  layout: {
    top: string;
    left: string;
    rotate: number;
  };
  dot: {
    top: string;
    left: string;
  };
};

const experiences: ExperienceCard[] = [
  {
    id: 1,
    role: "Lead Mobile Engineer",
    company: "Tarqia for Technology",
    type: "Full-time",
    duration: "2023 — Present",
    noteColor: "#F4FFE6",
    textColor: "#0F1B17",
    accentColor: "#93B86D",
    tapeColors: ["#DFFAA5", "#BBD96D"],
    layout: {
      top: "8%",
      left: "14%",
      rotate: -6,
    },
    dot: {
      top: "32%",
      left: "34%",
    },
  },
  {
    id: 2,
    role: "Software Engineer",
    company: "Dracode",
    type: "Freelance",
    duration: "Mar — Jul 2025",
    noteColor: "#FFEAF4",
    textColor: "#231724",
    accentColor: "#E187AF",
    tapeColors: ["#FFD1E8", "#F7A3C4"],
    layout: {
      top: "46%",
      left: "58%",
      rotate: 5,
    },
    dot: {
      top: "66%",
      left: "72%",
    },
  },
];

const JobTimeline = () => {
  return (
    <section
      id="job-timeline"
      className="relative w-full overflow-hidden py-20 text-[#0F1B17] bg-[#F5ECE1]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(90deg, rgba(1, 51, 43, 0.8) 1px, transparent 1px), linear-gradient(0deg, rgba(1, 51, 43, 0.8) 1px, transparent 1px)",
          backgroundSize: "120px 120px",
        }}
      />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-12 px-6 lg:min-h-[80vh]">
      

        <div className="relative w-full grow">
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            viewBox="0 0 1200 800"
            preserveAspectRatio="none"
          >
            <path
              d="M320 240 C 460 120, 660 140, 760 280 S 880 520, 1020 520"
              stroke="rgba(73,101,86,0.32)"
              strokeWidth={4}
              strokeDasharray="14 18"
              strokeLinecap="round"
              fill="none"
            />
          </svg>

          {experiences.map((experience, index) => {
            const { layout, dot } = experience;
            return (
              <React.Fragment key={experience.id}>
                <span
                  aria-hidden
                  className="pointer-events-none absolute hidden h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white shadow-[0_0_20px_rgba(46,66,55,0.25)] lg:block"
                  style={{
                    top: dot.top,
                    left: dot.left,
                    backgroundColor: `${experience.accentColor}33`,
                  }}
                />

                <article
                  className={clsx(
                    "note-card relative mx-auto w-full max-w-xs rounded-[28px] px-8 pb-10 pt-14 shadow-[0_26px_60px_rgba(6,18,14,0.12)] transition-transform duration-500",
                    "lg:absolute lg:max-w-[320px]"
                  )}
                  style={{
                    background: experience.noteColor,
                    color: experience.textColor,
                    top: layout.top,
                    left: layout.left,
                    transform: `rotate(${layout.rotate}deg)`,
                  }}
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-[-28px] h-10 w-16 -translate-x-1/2 rounded-[6px] shadow-[0_6px_14px_rgba(14,32,24,0.24)]"
                    style={{
                      background: `linear-gradient(135deg, ${experience.tapeColors[0]}, ${experience.tapeColors[1]})`,
                      transform: "rotate(-4deg)",
                    }}
                  />

                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-semibold leading-tight">
                      {experience.role}
                    </h3>
                    <p className="text-base font-medium leading-tight">
                      {experience.company}
                    </p>
                    <p className="mt-3 text-[0.75rem] uppercase tracking-[0.28em] text-[#4A5D53]">
                      {experience.type} • {experience.duration}
                    </p>
                  </div>
                </article>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default JobTimeline;

