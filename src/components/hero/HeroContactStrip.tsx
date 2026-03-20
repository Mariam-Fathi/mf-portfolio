"use client";

import React from "react";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconMail,
  IconLetterK,
} from "@tabler/icons-react";
import { FONTS } from "./constants";

const EMAIL = "mariam.f.siam@gmail.com";

const mailtoHref = (() => {
  const subject = encodeURIComponent("Contact from portfolio");
  const body = encodeURIComponent("Hi Mariam,\n\n");
  return `mailto:${EMAIL}?subject=${subject}&body=${body}`;
})();

type Block = {
  id: string;
  caption: string;
  href: string;
  icon: React.ComponentType<{ className?: string; stroke?: number }>;
  className: string;
  lineClass: string;
};

const blocks: Block[] = [
  {
    id: "email",
    caption: EMAIL,
    href: mailtoHref,
    icon: IconMail,
    className: "bg-[#F9E7C9] text-[#280B0B] border-2 border-[#280B0B]",
    lineClass: "bg-[#280B0B]",
  },
  {
    id: "linkedin",
    caption: "linkedin.com/in/mariamfathi-siam",
    href: "https://www.linkedin.com/in/mariamfathi-siam",
    icon: IconBrandLinkedin,
    className: "bg-[#F9E7C9] text-[#280B0B] border-2 border-[#280B0B]",
    lineClass: "bg-[#280B0B]",
  },
  {
    id: "github",
    caption: "github.com/Mariam-Fathi",
    href: "https://github.com/Mariam-Fathi",
    icon: IconBrandGithub,
    className: "bg-[#F9E7C9] text-[#280B0B] border-2 border-[#280B0B]",
    lineClass: "bg-[#280B0B]",
  },
  {
    id: "kaggle",
    caption: "kaggle.com/mariamfathiamin",
    href: "https://www.kaggle.com/mariamfathiamin",
    icon: IconLetterK,
    className: "bg-[#F9E7C9] text-[#280B0B] border-2 border-[#280B0B]",
    lineClass: "bg-[#280B0B]",
  },
];

export default function HeroContactStrip({
  variant = "row",
  noBottomReserve = false,
}: {
  variant?: "row" | "column";
  noBottomReserve?: boolean;
}) {
  const isCol = variant === "column";

  return (
    <div
      data-hero-contact-strip
      data-no-bottom-reserve={noBottomReserve ? "true" : undefined}
      style={
        isCol
          ? {
              width: "100%",
              height: "100%",
              flex: 1,
              minHeight: 0,
              boxSizing: "border-box",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }
          : undefined
      }
      className={!isCol ? "w-full shrink-0 box-border px-2 pb-3 pt-2 md:px-3 md:pb-4 md:pt-3" : undefined}
    >
      {isCol ? (
        /*
         * Column layout — fills all available vertical space.
         * Each card gets an equal share via flex: 1 1 0 so they
         * never exceed the container height.
         */
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "6px",
            flex: 1,
            minHeight: 0,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {blocks.map((b) => {
            const Icon = b.icon;
            const external = b.id !== "email";
            return (
              <a
                key={b.id}
                href={b.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                style={{
                  /*
                   * flex: 1 1 0 — each card takes equal share of available height.
                   * min-height: 0 — allows shrinking below content height so cards
                   * never push siblings out of the container.
                   */
                  flex: "1 1 0",
                  minHeight: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxSizing: "border-box",
                  padding: "10px 12px",
                  borderRadius: "0px",
                  boxShadow: "2px 2px 0 #1a1a1a",
                  textDecoration: "none",
                  transition: "opacity 0.15s",
                  overflow: "hidden",
                }}
                className={b.className}
              >
                {/* Icon */}
                <div style={{ flexShrink: 0 }}>
                  <Icon className="h-4 w-4" stroke={1.75} />
                </div>

                {/* Divider line */}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "6px", width: "100%" }}
                  aria-hidden="true"
                >
                  <span
                    style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0 }}
                    className={b.lineClass}
                  />
                  <span
                    style={{ height: 1, flex: 1, minWidth: 0, borderRadius: 9999, opacity: 0.9 }}
                    className={b.lineClass}
                  />
                  <span
                    style={{ width: 5, height: 5, borderRadius: "50%", flexShrink: 0 }}
                    className={b.lineClass}
                  />
                </div>

                {/* Caption */}
                <p
                  style={{
                    margin: 0,
                    textAlign: "right",
                    fontFamily: FONTS.display,
                    fontSize: 10,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    opacity: 0.95,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    flexShrink: 0,
                  }}
                >
                  {b.caption}
                </p>
              </a>
            );
          })}
        </div>
      ) : (
        /* Row layout — unchanged */
        <div className="mx-auto flex w-full max-w-[1400px] flex-row gap-2 md:gap-3">
          {blocks.map((b) => {
            const Icon = b.icon;
            const external = b.id !== "email";
            return (
              <a
                key={b.id}
                href={b.href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className={`hero-contact-card group flex flex-1 min-h-[100px] min-w-0 flex-col rounded-[22px] p-3 shadow-[2px_2px_0_#1a1a1a] transition-opacity hover:opacity-95 md:p-3.5 ${b.className}`}
              >
                <div className="flex shrink-0 justify-start">
                  <Icon className="h-5 w-5 md:h-6 md:w-6" stroke={1.75} />
                </div>
                <div className="min-h-[6px] flex-1 md:min-h-2" />
                <div className="flex w-full items-center gap-1.5" aria-hidden="true">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${b.lineClass}`} />
                  <span className={`h-px min-w-0 flex-1 rounded-full ${b.lineClass} opacity-90`} />
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${b.lineClass}`} />
                </div>
                <p className="mt-2 line-clamp-2 text-right font-sans text-[12px] font-medium leading-tight tracking-tight opacity-95 md:text-[12px]">
                  {b.caption}
                </p>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
