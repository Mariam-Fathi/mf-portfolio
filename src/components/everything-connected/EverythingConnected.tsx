"use client";

import React from "react";
import SkillsMarquee from "../SkillsMarquee";

const EverythingConnected = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#FDEB7F] text-[#0D0D0D]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,243,178,0.35)_0%,_transparent_55%)]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[#FFEFAE]/40 blur-3xl" />
      <div className="pointer-events-none absolute left-[10%] bottom-0 h-[420px] w-[420px] translate-y-1/3 rounded-full bg-[#F7D04E]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[8%] top-1/3 h-[360px] w-[360px] rounded-full bg-[#FAD86C]/20 blur-3xl" />

      <div className="relative z-10 flex h-full w-full flex-col justify-center">
        <SkillsMarquee />
      </div>
    </section>
  );
};

export default EverythingConnected;
