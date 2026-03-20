import React from "react";
import HeroContactStrip from "./HeroContactStrip";
import { useIsMobile } from "./hooks/useIsMobile";

export default function HeroContactsPanel({ noBottomReserve }: { noBottomReserve?: boolean }) {
  const isMobile = useIsMobile();
  return (
    <div
      data-hero-contacts-panel
      style={{
        width: "100%",
        height: isMobile ? "auto" : "100%",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
        minHeight: 0,
        overflow: isMobile ? "visible" : "hidden",
      }}
      className="rounded-[0px] border-2 border-[#280B0B] bg-[#F9E7C9] shadow-[2px_2px_0_#1a1a1a]"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between bg-[#1F6590] border-b-2 border-[#280B0B] px-3 py-2"
        style={{ flexShrink: 0 }}
      >
        <div className="text-[10px] font-medium tracking-widest uppercase" style={{ color: "#EDE6D9" }}>
          CONTACTS
        </div>
      </div>

      {/* Body — flex-1 + min-height:0 lets the strip fill and scroll */}
      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: isMobile ? "visible" : "hidden" }}>
        <HeroContactStrip variant={isMobile ? "row" : "column"} noBottomReserve={noBottomReserve ?? false} />
      </div>
    </div>
  );
}
