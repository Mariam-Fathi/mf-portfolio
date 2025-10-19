"use client";

import React from "react";
import { Projects } from "./Project";
import FriendsCinematicSection from "./friends-cinematic";
import FriendsConnectionBridge from "./bridge";

export function ProjectSection() {
  return (
    <section id="work" className="py-0 bg-black">
      <div className="max-w-7xl mx-auto">
        <Projects />
      </div>
      {/* <FriendsConnectionBridge /> */}
      {/* <FriendsCinematicSection /> */}
    </section>
  );
}

export default ProjectSection;
