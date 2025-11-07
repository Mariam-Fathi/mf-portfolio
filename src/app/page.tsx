"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import CinematicShowcase from "@/components/projects/projects";
import JobTimeline from "@/components/job-timeline/JobTimeline";
import CertificatesSection from "@/components/Certificates";
import EverythingConnected from "@/components/everything-connected/EverythingConnected";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <div className="relative min-h-screen w-screen overflow-x-hidden bg-[#080E0B] text-[#FEFCE0]">
      <Navbar />
      <main className="relative flex w-full flex-col gap-24 overflow-x-hidden">
        <Hero />
        <section id="work" className="w-full">
          <CinematicShowcase />
        </section>
        <section id="experience" className="w-full">
          <JobTimeline />
        </section>
        <section id="skills" className="w-full">
          <EverythingConnected />
        </section>
        <section id="certificates" className="w-full">
          <CertificatesSection />
        </section>
        <section id="contact" className="w-full">
          <Contact />
        </section>
      </main>
    </div>
  );
}
