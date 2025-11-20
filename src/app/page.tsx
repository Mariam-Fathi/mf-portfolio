"use client";

import React, { useCallback, useRef, useState } from "react";
import Hero from "@/components/hero/hero";
import { gsap } from "gsap";
import { Skiper19 } from "@/components/Skiper19";
import GalleryShowcase from "@/components/projects/projects";
import { Skiper52 } from "@/components/Skiper52";
import Contact from "@/components/Contact";

type SectionId = "hero" | "work" | "certificates" | "experience" | "skills" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleNavigate = useCallback(async (sectionId: SectionId) => {
    if (isTransitioning || activeSection === sectionId) return;
    
    setIsTransitioning(true);
    const tl = gsap.timeline();

    if (sectionId === "hero") {
      // Returning to hero
      tl.to(`.content-section.active`, {
        opacity: 0,
        x: 100,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setActiveSection("hero");
          setIsTransitioning(false);
        }
      });

    } else if (activeSection === "hero") {
      // First navigation away from hero
      tl.to(`#${sectionId}-content`, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        onStart: () => {
          setActiveSection(sectionId);
        },
        onComplete: () => {
          setIsTransitioning(false);
        }
      });

    } else {
      // Switching between non-hero sections
      tl.to(`.content-section.active`, {
        opacity: 0,
        x: 100,
        duration: 0.4,
        ease: "power2.in"
      });

      tl.to(`#${sectionId}-content`, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        ease: "power2.out",
        onStart: () => {
          setActiveSection(sectionId);
        },
        onComplete: () => {
          setIsTransitioning(false);
        }
      });
    }

  }, [activeSection, isTransitioning]);

  return (
    <div className="portfolio-frame">
      {/* HERO SECTION - Full screen when active */}
      {activeSection === "hero" && (
        <div ref={heroRef}>
          <Hero onNavigate={(section: string) => handleNavigate(section as SectionId)} />
        </div>
      )}

      {/* CONTENT SECTIONS - Only show when not on hero */}
      {activeSection !== "hero" && (
        <div className="content-container" ref={contentRef}>
          {/* Experience Section */}
          <section 
            id="experience-content" 
            className={`content-section ${activeSection === "experience" ? "active" : ""}`}
          >
            <Skiper19/>
          </section>

          {/* Work Section */}
          <section 
            id="work-content" 
            className={`content-section ${activeSection === "work" ? "active" : ""}`}
          >
            <GalleryShowcase />
          </section>

          {/* Skills Section */}
          <section 
            id="skills-content" 
            className={`content-section ${activeSection === "skills" ? "active" : ""}`}
          >
            SKILLS SECTION
          </section>

          {/* Certificates Section */}
          <section 
            id="certificates-content" 
            className={`content-section ${activeSection === "certificates" ? "active" : ""}`}
          >
            <Skiper52/>
          </section>

          {/* Contact Section */}
          <section 
            id="contact-content" 
            className={`content-section ${activeSection === "contact" ? "active" : ""}`}
          >
            <Contact />
          </section>
        </div>
      )}


      <style jsx>{`
        .portfolio-frame {
          height: 100vh;
          position: relative;
          overflow: hidden;
          background: #F5ECE1;
          margin: 0;
          padding: 0;
        }

        /* Content Container */
        .content-container {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        /* Content Sections */
        .content-section {
          background-color: #F5ECE1;
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100px);
          display: none;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0;
          margin: 0;
        }
        .content-section::-webkit-scrollbar {
          display: none;
        }

        .content-section.active {
          opacity: 1;
          transform: translateX(0);
          display: block;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0;
          margin: 0;
        }
        .content-section.active::-webkit-scrollbar {
          display: none;
        }
        
        /* Projects section - full viewport */
        #work-content {
          padding: 0 !important;
          margin: 0 !important;
        }

        .section-content {
          height: 100%;
          padding: 8rem 4rem 4rem;
          display: flex;
          flex-direction: column;
        }

        .placeholder-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          font-family: "Space Grotesk", sans-serif;
          color: #1e140b;
        }

        .placeholder-content h2 {
          font-family: "Momo Trust Display", serif;
          font-size: 4rem;
          margin-bottom: 2rem;
          color: #1e140b;
        }

        .placeholder-content p {
          font-size: 1.5rem;
          opacity: 0.7;
        }

      `}</style>
    </div>
  );
}