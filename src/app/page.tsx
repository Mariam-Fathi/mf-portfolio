"use client";

import React, { useCallback, useRef, useState } from "react";
import Hero from "@/components/hero/hero";
import { gsap } from "gsap";
import { Experience } from "@/components/Experience";
import GalleryShowcase from "@/components/projects/projects";
import { Certificates } from "@/components/Certificates";
import Contact from "@/components/Contact";
import SectionNavigation from "@/components/SectionNavigation";
import SectionLineNavigation from "@/components/SectionLineNavigation";

type SectionId = "hero" | "work" | "certificates" | "experience" | "contact";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHeroReady, setIsHeroReady] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleHeroReady = useCallback(() => {
    setIsHeroReady(true);
    
    // Animate hero entrance with cinematic blur fade in effect
    if (heroRef.current) {
      // Start with blur and hidden
      gsap.set(heroRef.current, {
        opacity: 0,
        filter: "blur(15px)"
      });
      
      // Fade in with blur out - same effect as preloader had
      gsap.to(heroRef.current, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2, // Small delay for cinematic effect
      });
    }
  }, []);

  const handleNavigate = useCallback(async (sectionId: SectionId) => {
    if (isTransitioning || activeSection === sectionId) return;
    
    // Hide any dots when navigating away from hero
    if (activeSection === "hero" && sectionId !== "hero") {
      const dots = document.querySelectorAll('.original-i-dot, .final-i-dot, .original-i-dot-svg, .final-i-dot-svg, .original-i-dot-se, .final-i-dot-se');
      dots.forEach((dot) => {
        const htmlDot = dot as HTMLElement;
        if (htmlDot) {
          gsap.killTweensOf(htmlDot);
          htmlDot.style.setProperty('display', 'none', 'important');
          htmlDot.style.setProperty('opacity', '0', 'important');
          htmlDot.style.setProperty('visibility', 'hidden', 'important');
          htmlDot.style.setProperty('z-index', '-1', 'important');
        }
      });
    }
    
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
          // Add blur effect when returning to hero
          if (heroRef.current) {
            gsap.set(heroRef.current, {
              opacity: 0,
              filter: "blur(15px)"
            });
            gsap.to(heroRef.current, {
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2,
              onComplete: () => {
                setIsTransitioning(false);
              }
            });
          } else {
            setIsTransitioning(false);
          }
        }
      });

    } else if (activeSection === "hero") {
      // First navigation away from hero - same blur effect as hero/preloader
      // Set section to active first so it becomes visible
      setActiveSection(sectionId);
      
      // Use double requestAnimationFrame to ensure the section is fully rendered before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const targetSection = document.getElementById(`${sectionId}-content`);
          if (targetSection) {
            // Set initial blur state - same as hero
            gsap.set(targetSection, {
              opacity: 0,
              x: 0,
              filter: "blur(15px)",
              display: "block",
              clearProps: "transform" // Clear any transform that might interfere
            });
            
            // Animate blur out
            gsap.to(targetSection, {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              duration: 0.8,
              ease: "power2.out",
              delay: 0.2, // Same delay as hero
              onComplete: () => {
                setIsTransitioning(false);
              }
            });
          } else {
            setIsTransitioning(false);
          }
        });
      });

    } else {
      // Switching between non-hero sections - same blur effect as hero/preloader
      tl.to(`.content-section.active`, {
        opacity: 0,
        x: 100,
        duration: 0.4,
        ease: "power2.in"
      });

      const targetSection = document.getElementById(`${sectionId}-content`);
      if (targetSection) {
        // Set initial blur state - same as hero
        gsap.set(targetSection, {
          opacity: 0,
          x: 0,
          filter: "blur(15px)"
        });
      }

      tl.to(`#${sectionId}-content`, {
        opacity: 1,
        x: 0,
        filter: "blur(0px)",
        duration: 0.8,
        ease: "power2.out",
        delay: 0.2, // Same delay as hero
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
      {/* HERO SECTION - Full screen when active, with cinematic blur entrance */}
      {activeSection === "hero" && (
        <div 
          ref={heroRef}
          style={{ 
            opacity: isHeroReady ? 1 : 0,
            visibility: isHeroReady ? 'visible' : 'hidden'
          }}
        >
          <Hero 
            onNavigate={(section: string) => handleNavigate(section as SectionId)}
            onReady={handleHeroReady}
            isActive={activeSection === "hero" && isHeroReady}
          />
        </div>
      )}

      {/* CONTENT SECTIONS - Only show when not on hero */}
      {activeSection !== "hero" && (
        <div className="content-container" ref={contentRef}>
          {/* Section Line Navigation - line from left edge with O morphing into nav */}
          <SectionLineNavigation 
            onNavigate={(section: string) => handleNavigate(section as SectionId)}
            currentSection={activeSection}
          />

          {/* Experience Section */}
          <section 
            id="experience-content" 
            className={`content-section ${activeSection === "experience" ? "active" : ""}`}
          >
            <Experience/>
          </section>

          {/* Work Section */}
          <section 
            id="work-content" 
            className={`content-section ${activeSection === "work" ? "active" : ""}`}
          >
            <GalleryShowcase />
          </section>

          {/* Certificates Section */}
          <section 
            id="certificates-content" 
            className={`content-section ${activeSection === "certificates" ? "active" : ""}`}
          >
            <Certificates/>
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
          filter: blur(15px); /* Initial blur state - same as hero/preloader */
        }
        .content-section::-webkit-scrollbar {
          display: none;
        }

        .content-section.active {
          display: block;
          overflow-y: auto;
          overflow-x: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 0;
          margin: 0;
          /* Opacity, transform, and filter are controlled by GSAP animations */
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