"use client";

import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconLetterK,
} from "@tabler/icons-react";
import { COLORS } from "@/components/hero/constants";
import type { SectionId } from "@/components/hero/types";
import { NAV_SECTIONS } from "@/components/hero/types";

const EMAIL = "mariam.f.siam@gmail.com";

type ContactChannel = {
  id: string;
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; stroke?: number }>;
};

const contactChannels: ContactChannel[] = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Mariam-Fathi",
    icon: IconBrandGithub,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mariamfathi-siam",
    icon: IconBrandLinkedin,
  },
  {
    id: "kaggle",
    label: "Kaggle",
    href: "https://www.kaggle.com/mariamfathiamin",
    icon: IconLetterK,
  },
  {
    id: "email",
    label: "Email",
    href: (() => {
      const subject = encodeURIComponent("Contact from portfolio");
      const body = encodeURIComponent("Hi Mariam,\n\n");
      return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    })(),
    icon: IconMail,
  },
];

export default function AppSidebar({
  currentSection,
  onNavigate,
}: {
  currentSection: SectionId;
  onNavigate: (section: SectionId) => void;
}) {
  const sectionLinks = NAV_SECTIONS.filter((s) => s.id !== "experience");

  const experienceItems = [
    {
      title: "Software Engineer",
      company: "Tarqia",
      type: "",
      fromDate: "Jan 2024",
      toDate: "Present",
      color: "#280B0B",
    },
    {
      title: "Mobile Engineer",
      company: "Dracode",
      type: "",
      fromDate: "Sep 2025",
      toDate: "Jan 2026",
      color: "#280B0B",
    },
  ];

  return (
    <aside
      data-app-sidebar="left"
      className="w-full md:w-[240px] h-full flex-shrink-0 border-b md:border-b-0 md:border-r-2 border-[#280B0B] flex flex-col min-h-0 text-left"
      style={{ background: COLORS.heroBackground }}
    >
      <div className="flex-1 min-h-0 overflow-y-auto py-3 px-3 no-visible-scrollbar flex flex-col gap-2 justify-between">
        <div className="flex flex-col gap-2 ">
          <span
            className="text-[10px] font-bold tracking-widest uppercase pb-1"
            style={{ color: COLORS.accent }}
          >
            Sections
          </span>

          {sectionLinks.map((s) => {
            const isActive = s.id === currentSection;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onNavigate(s.id)}
                className="inline-flex items-center justify-start gap-2 px-2.5 py-2 rounded-sm border-2 border-[#2a2a2a] transition-colors hover:opacity-90 w-full text-left cursor-pointer"
                style={{
                  background: isActive ? COLORS.primary : COLORS.heroBackground,
                  boxShadow: "2px 2px 0 #1a1a1a",
                  color: isActive ? COLORS.heroBackground : COLORS.primary,
                }}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="text-[11px] font-sans font-bold">{s.label}</span>
              </button>
            );
          })}
        </div>

 

        {/* Separator between sections and contacts */}
        <div className="w-full h-px bg-[#2a2a2a] opacity-70 my-2" />
        <div className="flex flex-col gap-2">
        <span
            className="text-[10px] font-bold tracking-widest uppercase pb-1"
            style={{ color: COLORS.accent }}
          >
            Experience
          </span>
        {experienceItems.map((item, index : number) => {
            const isActive = currentSection === "experience";
            return (
              <div
                key={item.title}
                className="inline-flex items-start gap-2 px-2.5 py-2 rounded-sm border-2 border-[#2a2a2a] w-full select-none"
                style={{
                  background: isActive ? COLORS.primary : COLORS.heroBackground,
                  boxShadow: "2px 2px 0 #1a1a1a",
                  color: isActive ? COLORS.heroBackground : item.color,
                }}
              >
            
                <div className="flex flex-col min-w-0 gap-1">
                  <span
                    className="text-[11px] font-sans font-bold leading-snug"
                    style={{ color: isActive ? COLORS.heroBackground : item.color }}
                  >
                    {item.title} - {item.company}
                  </span>

                  <span
                    className="text-[10px] font-sans leading-snug"
                    style={{ color: isActive ? COLORS.heroBackground : "#8A9EA7" }}
                  >
                    {item.type}
                  </span>

              

                  {/* Duration: start dot -> vertical line -> end dot */}
                  {/* Fixed row heights keep dot centers aligned with both dates. */}
                  <div className="grid grid-cols-[14px_1fr] grid-rows-[18px_18px_18px] gap-x-2 items-stretch">
                    {/* Row 1: start dot + from date */}
                    <div className="row-start-1 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    </div>
                    <div className="row-start-1 flex items-center min-w-0">
                      <span
                        className="text-[10px] font-sans"
                        style={{
                          lineHeight: "18px",
                          color: isActive ? COLORS.heroBackground : "#8a7a5a",
                        }}
                      >
                        {item.fromDate}
                      </span>
                    </div>

                    {/* Row 2: vertical line */}
                    <div className="row-start-2 flex items-center justify-center">
                      <div className="w-px" style={{ background: item.color, height: 18 }} />
                    </div>
                    <div className="row-start-2" />

                    {/* Row 3: end dot + to date */}
                    <div className="row-start-3 flex items-center justify-center">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: item.color }} />
                    </div>
                    <div className="row-start-3 flex items-center min-w-0">
                      <span
                        className="text-[10px] font-sans"
                        style={{
                          lineHeight: "18px",
                          color: isActive ? COLORS.heroBackground : "#8a7a5a",
                        }}
                      >
                        {item.toDate}
                      </span>
                    </div>
                  </div>
          </div>
              </div>
            );
          })}
        </div>    
        <div className="w-full h-px bg-[#2a2a2a] opacity-70 my-2" />

        <div className="flex flex-col gap-2">
          <span
            className="text-[10px] font-bold tracking-widest uppercase pb-1"
            style={{ color: COLORS.accent }}
          >
            Contacts
          </span>

          {contactChannels.map((ch) => {
            const Icon = ch.icon;
            const isExternal = ch.id !== "email";
            return (
              <a
                key={ch.id}
                href={ch.href}
                {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="inline-flex items-center gap-2 px-2.5 py-2 rounded-sm border-2 border-[#2a2a2a] transition-colors hover:opacity-90 w-full"
                style={{
                  background: COLORS.heroBackground,
                  boxShadow: "2px 2px 0 #1a1a1a",
                  color: COLORS.primary,
                }}
              >
                <Icon className="w-4 h-4 flex-shrink-0" stroke={2} />
                <span className="text-[11px] font-sans font-bold">{ch.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </aside>
  );
}

