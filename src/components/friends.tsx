"use client";

import React from "react";
import { Projects } from "./Project";
import TitleHeader from "./TitleHeader";
import FriendsCinematicSection from "./friends-cinematic";

export function ProjectSection() {
  return (
    <section id="work" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TitleHeader
          title="Selected Work"
          sub="From Concept to Production - Real Applications, Real Impact"
        />

        <Projects />
      </div>
      
      <FriendsCinematicSection />
    </section>
  );
}

export default ProjectSection;