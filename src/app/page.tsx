"use client";

import React, { useCallback, useRef, useState } from "react";
import Hero from "@/components/hero/hero";
import { gsap } from "gsap";

type SectionId = "hero" | "about" | "work" | "certificates" | "experience" | "skills" | "contact";

const sectionConfig = {
  hero: { title: "HOME", color: "#DA451F", number: "00", badgeColor: "#DA451F", badgeText: "#282828" },
  about: { title: "ABOUT", color: "#FF8A00", number: "01", badgeColor: "#FF8A00", badgeText: "#282828" },
  experience: { title: "EXPERIENCE", color: "#F7C945", number: "02", badgeColor: "#F7C945", badgeText: "#282828" },
  work: { title: "PROJECTS", color: "#E45CA5", number: "03", badgeColor: "#E45CA5", badgeText: "#282828" },
  certificates: { title: "CERTIFICATES", color: "#1E72EF", number: "04", badgeColor: "#8ED457", badgeText: "#282828" },
  skills: { title: "SKILLS", color: "#8ED457", number: "05", badgeColor: "#7B61FF", badgeText: "#282828" },
  contact: { title: "CONTACT", color: "#006f49", number: "06", badgeColor: "#1283EB", badgeText: "#282828" }
};

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
      // Returning to hero - reverse the transformation
      tl.to(".current-section-title", {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: "power2.in"
      });

      tl.to(".nav-link", {
        scale: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "back.out(1.7)"
      }, "-=0.2");

      tl.to(".hero-name", {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out"
      });

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
      // First navigation away from hero - transform hero links to navbar
      tl.to(".hero-name", {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: "power2.inOut"
      });

      tl.to(".hero-cover-list", {
        opacity: 0,
        y: 50,
        duration: 0.4,
        ease: "power2.in"
      });

      // Keep nav links at their original size and position
      // Removed scale and y transforms to maintain alignment

      tl.to(".current-section-title", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
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

    } else {
      // Switching between non-hero sections
      tl.to(`.content-section.active`, {
        opacity: 0,
        x: 100,
        duration: 0.4,
        ease: "power2.in"
      });

      tl.to(".current-section-title", {
        opacity: 0,
        y: -20,
        duration: 0.3,
        ease: "power2.in"
      });

      tl.to(".current-section-title", {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out"
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
          {/* About Section */}
          <section 
            id="about-content" 
            className={`content-section ${activeSection === "about" ? "active" : ""}`}
          >
            <div className="section-content">
              <div className="placeholder-content">
                <h2>About Me</h2>
                <p>About content will appear here</p>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section 
            id="experience-content" 
            className={`content-section ${activeSection === "experience" ? "active" : ""}`}
          >
            <div className="section-content">
              <div className="placeholder-content">
                <h2>Professional Journey</h2>
                <p>Experience content will appear here</p>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section 
            id="work-content" 
            className={`content-section ${activeSection === "work" ? "active" : ""}`}
          >
            <div className="section-content">
              <div className="placeholder-content">
                <h2>Selected Projects</h2>
                <p>Work content will appear here</p>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section 
            id="skills-content" 
            className={`content-section ${activeSection === "skills" ? "active" : ""}`}
          >
            <div className="section-content">
              <div className="placeholder-content">
                <h2>Skills & Expertise</h2>
                <p>Skills content will appear here</p>
              </div>
            </div>
          </section>

          {/* Certificates Section */}
          <section 
            id="certificates-content" 
            className={`content-section ${activeSection === "certificates" ? "active" : ""}`}
          >
            <div className="section-content">
              <div className="placeholder-content">
                <h2>Certifications</h2>
                <p>Certificates content will appear here</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section 
            id="contact-content" 
            className={`content-section ${activeSection === "contact" ? "active" : ""}`}
          >
            <div className="section-content">
              <div className="placeholder-content">
                <h2>Get In Touch</h2>
                <p>Contact content will appear here</p>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* NAVIGATION LAYER - Always present but transforms */}
      <div className={`navigation-layer ${activeSection !== "hero" ? "nav-mode" : "hero-mode"}`}>
        <div className="nav-top-section">
          <div className="hero-cover-header">
            <div className="hero-cover-header-top">
              <p className="hero-cover-title">Portfolio</p>
              <nav className="section-nav">
                {(Object.keys(sectionConfig) as SectionId[]).map((sectionId) => (
                  <button
                    key={sectionId}
                    className={`nav-link ${activeSection === sectionId ? 'active' : ''}`}
                    onClick={() => handleNavigate(sectionId)}
                    style={{ 
                      ['--accent-color' as any]: sectionConfig[sectionId].color,
                    } as React.CSSProperties}
                    disabled={isTransitioning}
                  >
                    <span
                      className="nav-link-badge"
                      style={{ 
                        backgroundColor: sectionConfig[sectionId].badgeColor, 
                        color: sectionConfig[sectionId].badgeText 
                      }}
                    >
                      {sectionConfig[sectionId].number}
                    </span>
                    <span className="nav-link-text">{sectionConfig[sectionId].title}</span>
                  </button>
                ))}
              </nav>
            </div>
            <div className="hero-cover-line" />
          </div>
        </div>
        
        {/* Current section title - Only show when not on hero, below the line */}
        <div className={`current-section-title ${activeSection !== 'hero' ? 'active' : ''}`}>
          {activeSection !== 'hero' && sectionConfig[activeSection].title}
        </div>
      </div>

      <style jsx>{`
        .portfolio-frame {
          height: 100vh;
          position: relative;
          overflow: hidden;
          background: #F5ECE1;
        }

        /* Content Container */
        .content-container {
          position: absolute;
          inset: 0;
          z-index: 2;
        }

        /* Content Sections */
        .content-section {
        background-color: #1e140b;
          position: absolute;
          inset: 0;
          opacity: 0;
          transform: translateX(100px);
          display: none;
        }

        .content-section.active {
          opacity: 1;
          transform: translateX(0);
          display: block;
          // background-color: #1e140b;
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

        /* Navigation Layer */
        .navigation-layer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3;
          // padding: 0.5rem 0.5rem;
          transition: all 0.4s ease;
        }

        @media (min-width: 640px) {
          .navigation-layer {
            // padding: 0.75rem 0.75rem;
          }
        }

        @media (min-width: 1024px) {
          .navigation-layer {
            // padding: 1rem 0.75rem;
          }
        }

        @media (min-width: 1280px) {
          .navigation-layer {
            padding: 0rem 1rem;
          }
        }

        .navigation-layer.hero-mode {
          /* In hero mode, navigation is part of the hero design */
          position: relative;
          background: transparent;
        }

        .navigation-layer.nav-mode {
          /* In nav mode, becomes top navbar */
          background: #F5ECE1;
        }

        .nav-top-section {
          width: 100%;
        }

        .hero-cover-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 0.5rem;
          font-family: "Space Grotesk", "Inter", sans-serif;
          width: 100%;
        }

        .hero-cover-header-top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          width: 100%;
          gap: 1rem;
        }

        .navigation-layer.hero-mode .hero-cover-header-top,
        .navigation-layer.nav-mode .hero-cover-header-top {
          align-items: flex-end;
        }

        .hero-cover-title {
            font-size: clamp(1rem, 2vw, 1.25rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #1e140b;
          margin: 0;
        }

        .navigation-layer.hero-mode .hero-cover-title,
        .navigation-layer.nav-mode .hero-cover-title {
          line-height: 1;
          vertical-align: baseline;
        }

        .hero-cover-line {
          width: 100%;
          height: 4px;
          background-color: #DA451F;
        }

        /* Navigation Links */
        .section-nav {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          gap: 0.25rem;
          flex-wrap: wrap;
          flex: 1;
        }

        .navigation-layer.hero-mode .section-nav,
        .navigation-layer.nav-mode .section-nav {
          align-items: flex-end;
        }

        .nav-link {
          background: none;
          border: none;
          font-family: "Space Grotesk", sans-serif;
          cursor: pointer;
          padding: 0;
          transition: all 0.3s ease;
          position: relative;
          transform-origin: center;
          display: inline-flex;
          align-items: flex-end;
          gap: 0.5rem;
          border-radius: 0.5rem;
          line-height: 1;
          vertical-align: baseline;
        }

        .navigation-layer.hero-mode .nav-link,
        .navigation-layer.nav-mode .nav-link {
          align-items: flex-end;
          vertical-align: baseline;
        }

        .nav-link:hover:not(:disabled) {
          background-color: rgba(218, 69, 31, 0.05);
          padding: 0.25rem 0.5rem;
          margin: -0.25rem -0.5rem;
        }

        .nav-link-badge {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.7rem;
          flex-shrink: 0;
          transition: all 0.3s ease;
          align-self: flex-end;
          margin-bottom: -2px;
        }

        .nav-link:hover:not(:disabled) .nav-link-badge {
          transform: scale(1.1);
        }

        .nav-link-text {
          font-size: clamp(1rem, 2vw, 1.25rem);
          font-weight: 600;
          color: #14110F;
          transition: all 0.3s ease;
          white-space: nowrap;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          line-height: 1;
          display: inline-block;
          vertical-align: baseline;
        }

        .navigation-layer.hero-mode .nav-link-text,
        .navigation-layer.nav-mode .nav-link-text {
          line-height: 1;
          vertical-align: baseline;
        }

        .nav-link:hover:not(:disabled) .nav-link-text {
          color: var(--accent-color);
        }

        .nav-link:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        .nav-link::after {
          display: none;
        }

        /* Current Section Title */
        .current-section-title {
          position: absolute;
          top: calc(0.5rem + clamp(1rem, 2vw, 1.25rem) + 0.5rem + 4px + 1rem);
          right: 0.5rem;
          font-family: "Momo Trust Display", serif;
          font-size: 3rem;
          color: #DA451F;
          opacity: 0;
          transform: translateY(-20px);
          transition: all 0.5s ease;
          pointer-events: none;
        }

        @media (min-width: 640px) {
          .current-section-title {
            top: calc(0.75rem + clamp(1rem, 2vw, 1.25rem) + 0.5rem + 4px + 1rem);
            right: 0.75rem;
          }
        }

        @media (min-width: 1024px) {
          .current-section-title {
            top: calc(1rem + clamp(1rem, 2vw, 1.25rem) + 0.5rem + 4px + 1rem);
            right: 0.75rem;
          }
        }

        @media (min-width: 1280px) {
          .current-section-title {
            top: calc(1.25rem + clamp(1rem, 2vw, 1.25rem) + 0.5rem + 4px + 1rem);
            right: 1rem;
          }
        }

        @media (max-width: 768px) {
          .current-section-title {
            font-size: 2rem;
          }
        }

        .current-section-title.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}