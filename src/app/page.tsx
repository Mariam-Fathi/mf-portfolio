import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import Contact from "@/components/Contact";
import Experience from "@/components/journey/Experience";
import Certificates from "@/components/Certificates";
import Technologies from "@/components/technologies";
import Footer from "@/components/Footer";
import { ProjectSection } from "@/components/friends";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <ProjectSection />
      <Experience />
      <Technologies />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
