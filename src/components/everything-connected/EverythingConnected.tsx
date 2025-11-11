"use client";

import React from "react";
import SkillsMarquee from "../SkillsMarquee";

const EverythingConnected = () => {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#F2BDF1] text-[#0B8658]">
    
      <div className="relative z-10 flex h-full w-full flex-col justify-center">
        <SkillsMarquee />
      </div>
    </section>
  );
};

export default EverythingConnected;
