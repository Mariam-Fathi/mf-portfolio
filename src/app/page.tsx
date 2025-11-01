import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import ReadingSection from "@/components/reading-section/ReadingSection";
import EverythingConnected from "@/components/everything-connected/EverythingConnected";
import CuriositySection from "@/components/curiosity-section/CuriositySection";
import ExperienceTimeline from "@/components/journey/Experience";
import CinematicShowcase from "@/components/projects/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <EverythingConnected />
      <ReadingSection />
      <CuriositySection />
      <ExperienceTimeline />
      <CinematicShowcase />
    </>
  );
}
