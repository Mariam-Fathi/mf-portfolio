"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import Preloader from "@/components/Preloader";
import ReadingSection from "@/components/reading-section/ReadingSection";
import EverythingConnected from "@/components/everything-connected/EverythingConnected";
import CuriositySection from "@/components/curiosity-section/CuriositySection";
import ExperienceTimeline from "@/components/journey/Experience";
import JobTimeline from "@/components/job-timeline/JobTimeline";
import CinematicShowcase from "@/components/projects/projects";
import CertificatesSection from "@/components/Certificates";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {/* {isLoading && <Preloader onComplete={handleLoadingComplete} />} */}
        <>
          {/* <Navbar /> */}
          <Hero />
          {/* <EverythingConnected />
          <ReadingSection />
          <CuriositySection /> */}
          {/* <ExperienceTimeline /> */}
          <JobTimeline />
          <CinematicShowcase />
          <CertificatesSection />
        </>
    
    </>
  );
}
