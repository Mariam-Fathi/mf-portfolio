import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import { Projects } from "@/components/Projects";
import Contact from "@/components/Contact";
import Experience from "@/components/journey/Experience";
import Certificates from "@/components/Certificates";
import Technologies from "@/components/technologies";
import FeatureCards from "@/components/FeatureCard";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Experience />
      <Technologies />
      <Projects />
      <Certificates />
      <Contact />
      <Footer />
    </>
  );
}
