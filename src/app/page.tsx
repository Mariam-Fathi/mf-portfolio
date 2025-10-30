import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import ExperienceTimeline from "@/components/journey/Experience";
import CinematicShowcase from "@/components/projects/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ExperienceTimeline />
      <CinematicShowcase />
    </>
  );
}
