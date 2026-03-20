"use client";

import React from "react";
import { useIsMobile } from "./hooks/useIsMobile";

const experienceItems = [
  {
    title: "Software Engineer",
    company: "Tarqia",
    fromDate: "Jan 2024",
    toDate: "Present",
    bullets: [
      "Responsible for managing all key product deliverables.",
      "Edits and updates client-facing visuals and assets.",
    ],
  },
  {
    title: "Mobile Engineer",
    company: "Dracode",
    fromDate: "Sep 2025",
    toDate: "Jan 2026",
    bullets: [
      "Tasked to create and improve layouts for new screens.",
      "Edited visual assets for clients, campaigns, and social media posts.",
    ],
  },
] as const;

export default function HeroExperiencePanel() {
  const isMobile = useIsMobile();
  return (
    <div
      data-hero-experience-panel
      className="w-full rounded-[0px] border-2 border-[#280B0B] bg-[#F9E7C9] shadow-[2px_2px_0_#1a1a1a] overflow-hidden"
      style={{ maxWidth: "100%", boxSizing: "border-box" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-[#EDE6D9] border-b-2 border-[#280B0B] px-3 py-2">
        <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "#280B0B" }}>
          EXPERIENCES
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex flex-col items-start gap-4">
          {experienceItems.map((item) =>
            isMobile && item.title === "Software Engineer" ? null : (
              <div key={item.title} className="min-w-0 w-full">
                <div className="text-[12px] font-bold leading-tight">{item.title}</div>
                <div className="text-[10px] leading-tight mt-0.5" style={{ color: "#8A9EA7" }}>
                  {item.company}{" "}
                  <span style={{ opacity: 0.8 }}>|</span>{" "}
                  {item.fromDate} - {item.toDate}
                </div>
                <ul className="mt-2 list-disc pl-5 text-[10px] text-[#280B0B] leading-snug">
                  {item.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>
    </div>
  );
}
