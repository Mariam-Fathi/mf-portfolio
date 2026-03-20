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
      "Owned end-to-end delivery for the Wheelchair Admin Portal and Operational Portal.",
      "Drove Smart Key mobile delivery at Tarqia, from feature planning to production rollout.",
      "Built and shipped production features across dashboards, AI-assisted flows, and third-party integrations.",
      "Led implementation from planning through deployment and release handoff.",
    ],
  },
  {
    title: "Mobile Engineer",
    company: "Dracode",
    fromDate: "Sep 2025",
    toDate: "Jan 2026",
    bullets: [
      "Delivered mobile product work for Sanayat with a focus on reliability and UX quality.",
      "Implemented core flows including booking, onboarding, notifications, and payments, plus responsive screen layouts.",
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
                <div className="text-[12px] font-medium leading-tight">{item.title}</div>
                <div className="text-[10px] leading-tight mt-0.5" style={{ color: "#6A0610" }}>
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
