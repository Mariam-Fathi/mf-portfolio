"use client";

import React from "react";
import { Projects } from "./Project";
import TitleHeader from "./TitleHeader";
import FriendsCinematicSection from "./friends-cinematic";

export function ProjectSection() {
  return (
    <section id="work" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto">
        <Projects />
      </div>
      
      <FriendsCinematicSection />
    </section>
  );
}

export default ProjectSection;