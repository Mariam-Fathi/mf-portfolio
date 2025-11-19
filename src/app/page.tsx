"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import Hero from "@/components/hero/hero";
import { gsap } from "gsap";
import { Skiper19 } from "@/components/Skiper19";
import GalleryShowcase from "@/components/projects/projects";
import { Skiper52 } from "@/components/Skiper52";
import { Skiper31 } from "@/components/SkillsScrollAnimation";

type SectionId = "hero" | "work" | "certificates" | "experience" | "skills" | "contact";

const sectionConfig = {
  hero: { title: "HOME", color: "#DA451F", number: "00", badgeColor: "#DA451F", badgeText: "#282828" },
  experience: { title: "EXPERIENCE", color: "#F7C945", number: "01", badgeColor: "#F7C945", badgeText: "#282828" },
  work: { title: "PROJECTS", color: "#E45CA5", number: "02", badgeColor: "#E45CA5", badgeText: "#282828" },
  certificates: { title: "CERTIFICATES", color: "#1E72EF", number: "03", badgeColor: "#8ED457", badgeText: "#282828" },
  skills: { title: "SKILLS", color: "#8ED457", number: "04", badgeColor: "#7B61FF", badgeText: "#282828" },
  contact: { title: "CONTACT", color: "#006f49", number: "05", badgeColor: "#1283EB", badgeText: "#282828" }
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [isHeaderAnimationComplete, setIsHeaderAnimationComplete] = useState(false);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const portfolioHeaderRef = useRef<HTMLDivElement>(null);

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

      tl.to(".current-section-title", {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      });

      // If header animation is not complete, complete it now
      if (!isHeaderAnimationComplete) {
        completeHeaderAnimation(sectionId);
      } else {
        // Just navigate to the section
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

  }, [activeSection, isTransitioning, isHeaderAnimationComplete]);

  const completeHeaderAnimation = (sectionId: SectionId) => {
    if (!portfolioHeaderRef.current) return;

    const oEl = portfolioHeaderRef.current.querySelector(".hero-cover-title-o");
    const navMenuEl = portfolioHeaderRef.current.querySelector(".o-nav-menu-wrapper");

    if (!oEl || !navMenuEl) return;

    const oElement = oEl as HTMLElement;
    const navMenuElement = navMenuEl as HTMLElement;

    const tl = gsap.timeline();

    // Immediately transform O into navigation menu
    tl.to(oElement, {
      scale: 1.3,
      duration: 0.3,
      ease: "power2.inOut",
    });

    tl.to(oElement, {
      opacity: 0,
      scale: 0.8,
      duration: 0.4,
      ease: "power2.in",
      onComplete: () => {
        oElement.style.display = "none";
        navMenuElement.style.display = "flex";
        gsap.set(navMenuElement, { scale: 0.8, opacity: 0 });
        
        // Position the nav menu at the end with same padding as left
        gsap.set(navMenuElement, { 
          position: "absolute", 
          right: "1rem",
          top: "50%",
          transform: "translateY(-50%)"
        });
      },
    });

    // Reveal navigation menu with smooth expansion
    tl.to(navMenuElement, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)",
    });

    // Animate menu items appearing
    tl.to(".nav-menu-item", {
      opacity: 1,
      x: 0,
      duration: 0.4,
      stagger: 0.08,
      ease: "power2.out",
    }, "-=0.3");

    // Navigate to the target section
    tl.to(`#${sectionId}-content`, {
      opacity: 1,
      x: 0,
      duration: 0.6,
      ease: "power2.out",
      onStart: () => {
        setActiveSection(sectionId);
        setIsHeaderAnimationComplete(true);
      },
      onComplete: () => {
        setIsTransitioning(false);
      }
    });
  };

  // Animate portfolio header on mount
  useEffect(() => {
    if (!portfolioHeaderRef.current) return;

    let tl: gsap.core.Timeline | null = null;
    let oElement: HTMLElement | null = null;
    let lineElement: HTMLElement | null = null;
    let verticalLineElement: HTMLElement | null = null;
    let animationComplete = false;
    let iOriginalPosition = 0;
    let portfolEndPosition = 0;
    let portfolTopPosition = 0;

    // Helper function to safely query elements with retry logic
    const getElements = (retries = 3, delay = 100): Promise<{
      fullTextElement: HTMLElement;
      portfolElement: HTMLElement;
      iElement: HTMLElement;
      oElement: HTMLElement;
      lineElement: HTMLElement;
      verticalLineElement: HTMLElement;
      navMenuElement: HTMLElement;
    } | null> => {
      return new Promise((resolve) => {
        const attempt = (attemptNumber: number) => {
          const fullTextEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-full");
          const portfolEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfol");
          const iEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-i");
          const oEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-o");
          const lineEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-line");
          const verticalLineEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-vertical-line");
          const navMenuEl = portfolioHeaderRef.current?.querySelector(".o-nav-menu-wrapper");

          if (fullTextEl && portfolEl && iEl && oEl && lineEl && verticalLineEl && navMenuEl) {
            resolve({
              fullTextElement: fullTextEl as HTMLElement,
              portfolElement: portfolEl as HTMLElement,
              iElement: iEl as HTMLElement,
              oElement: oEl as HTMLElement,
              lineElement: lineEl as HTMLElement,
              verticalLineElement: verticalLineEl as HTMLElement,
              navMenuElement: navMenuEl as HTMLElement,
            });
          } else if (attemptNumber < retries) {
            setTimeout(() => attempt(attemptNumber + 1), delay);
          } else {
            console.warn("Portfolio header elements not found after retries");
            resolve(null);
          }
        };
        attempt(0);
      });
    };

    // Calculate responsive end position for O
    const calculateEndPosition = (): number => {
      const container = portfolioHeaderRef.current;
      if (!container) return 0;
      
      const containerRect = container.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      
      // Calculate available space (viewport width minus padding and menu space)
      const padding = window.innerWidth < 768 ? 16 : 32; // Responsive padding
      const menuSpace = 200; // Space reserved for navigation menu
      
      // Position O at the end of viewport minus padding and menu space
      return viewportWidth - containerRect.left - menuSpace + 36;
    };

    getElements().then((elements) => {
      if (!elements) return;

      const {
        fullTextElement,
        portfolElement,
        iElement,
        oElement: oEl,
        lineElement: lineEl,
        verticalLineElement: verticalLineEl,
        navMenuElement,
      } = elements;

      oElement = oEl; // Store for resize handler
      lineElement = lineEl; // Store for resize handler
      verticalLineElement = verticalLineEl; // Store for resize handler

      // Create smooth motion graphics timeline
      tl = gsap.timeline({ delay: 0.8 });

      // Step 1: Hide full text and show split text with O in its original position
      let iWidth = 0; // Store I width for later use
      
      tl.to(fullTextElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          fullTextElement.style.display = "none";
          portfolElement.style.display = "inline";
          iElement.style.display = "inline";
          oEl.style.display = "inline";
          lineEl.style.display = "none";
          verticalLineEl.style.display = "none";
          
          // Set initial positions for animation
          gsap.set([portfolElement, iElement, oEl], {
            display: "inline",
            opacity: 1,
          });
          gsap.set(lineEl, {
            display: "none",
            width: 0,
            transformOrigin: "left center",
          });
          gsap.set(verticalLineEl, {
            display: "none",
            height: 0,
            transformOrigin: "top center",
          });
          gsap.set(oEl, { position: "static", x: 0 });
          
          // Measure I width after it's displayed (force reflow)
          void iElement.offsetWidth;
          const iRect = iElement.getBoundingClientRect();
          iWidth = iRect.width;
          
          // Measure PORTFOL position (end of P) for vertical line - both X and Y
          const portfolRect = portfolElement.getBoundingClientRect();
          portfolEndPosition = portfolRect.right; // Right edge of PORTFOL (end of P) - X position
          portfolTopPosition = portfolRect.top; // Top of PORTFOL (top of P) - Y position
        },
      });

      // Step 2: Animate I rotating 90 degrees while simultaneously pushing O
      // The O should shift by the width of I to simulate the push effect
      tl.to(iElement, {
        rotation: 90,
        duration: 0.8,
        ease: "power2.inOut",
        transformOrigin: "center center",
        onStart: () => {
          // Simultaneously move O by the width of I (creating push effect)
          if (iWidth > 0) {
            gsap.to(oEl, {
              x: iWidth,
              duration: 0.8,
              ease: "power2.inOut",
            });
          }
        },
      }, "-=0.2");

      // Step 4: Replace I with line
      // Store the original position of I before rotation for line positioning
      tl.to(iElement, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onStart: () => {
          // Get the original position of I (where it was before rotation)
          const iRect = iElement.getBoundingClientRect();
          const containerRect = portfolioHeaderRef.current?.getBoundingClientRect();
          if (containerRect) {
            iOriginalPosition = iRect.left;
          }
        },
        onComplete: () => {
          iElement.style.display = "none";
          lineEl.style.display = "block";
          
          // Position line to start from where I originally was
          gsap.set(lineEl, {
            opacity: 1,
            x: iOriginalPosition,
            width: 0,
            transformOrigin: "left center",
          });
        },
      }, "-=0.3");

      // Step 5: Expand line while moving O to the end of the viewport
      // Also animate vertical line from end of P down to left corner
      const endPosition = calculateEndPosition();
      
      // Get current position of O after it was pushed by I
      const oCurrentX = gsap.getProperty(oEl, "x") as number;
      
      // Calculate vertical line properties
      // Use stored P position (measured when PORTFOL was first displayed)
      const viewportHeight = window.innerHeight;
      const verticalLineStartY = portfolTopPosition; // Use stored P's top position
      const verticalLineEndY = viewportHeight;
      const verticalLineHeight = verticalLineEndY - verticalLineStartY;
      
      // Animate both horizontal line expansion, O movement, and vertical line simultaneously
      tl.to(oEl, {
        x: endPosition,
        duration: 1.2,
        ease: "power2.out",
        onStart: () => {
          // Calculate final line width: from I's original position to O's final position
          const lineFinalWidth = endPosition - iOriginalPosition;
          
          // Horizontal line expands as O moves
          gsap.to(lineEl, {
            width: lineFinalWidth + 100,
            duration: 1.2,
            ease: "power2.out",
          });
          
          // Vertical line: start from end of P's position (both X and Y from stored P position)
          // Same expansion feel as horizontal line - just expand, no movement
          verticalLineEl.style.display = "block";
          gsap.set(verticalLineEl, {
            left: portfolEndPosition - 111.5, // X position: end of P (stored from Step 1)
            top: portfolTopPosition + 32, // Y position: top of P (stored from Step 1)
            height: 0, // Start with zero height
            opacity: 0.4,
            transformOrigin: "top center", // Expand from top
          });
          
          // Expand downward to bottom of screen - same feel as horizontal line expansion
          gsap.to(verticalLineEl, {
            height: verticalLineHeight - 70, // Expand to bottom of viewport
            duration: 1.2,
            ease: "power2.out", // Same easing as horizontal line
          });
        },
        onComplete: () => {
          animationComplete = true;
          setIsHeaderAnimationComplete(true);
        },
      }, "-=0.2");

      // Handle window resize to recalculate positions
      const handleResize = () => {
        if (animationComplete && oElement && lineElement && verticalLineElement) {
          const newEndPosition = calculateEndPosition();
          gsap.set(oElement, { x: newEndPosition });
          
          // Also update line width - use stored iOriginalPosition or get from line's x
          const lineStartX = iOriginalPosition || (gsap.getProperty(lineElement, "x") as number);
          const lineFinalWidth = newEndPosition - lineStartX;
          gsap.set(lineElement, { width: Math.max(0, lineFinalWidth) });
          
          // Update vertical line position and height on resize
          const viewportHeight = window.innerHeight;
          // Recalculate portfol position on resize
          const portfolEl = portfolioHeaderRef.current?.querySelector(".hero-cover-title-portfol") as HTMLElement;
          if (portfolEl) {
            const portfolRect = portfolEl.getBoundingClientRect();
            const newPortfolEndPosition = portfolRect.right;
            const newPortfolTopPosition = portfolRect.top;
            const verticalLineHeight = viewportHeight - newPortfolTopPosition;
            gsap.set(verticalLineElement, {
              left: newPortfolEndPosition, // Stay at end of P position
              top: newPortfolTopPosition, // Use P's top position
              height: Math.max(0, verticalLineHeight),
            });
          }
        }
      };

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    });

    return () => {
      if (tl) tl.kill();
    };
  }, []);

  const toggleNavMenu = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

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
            <Skiper31 />
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
      <div className={`navigation-layer ${activeSection !== "hero" ? "nav-mode" : "hero-mode"} ${activeSection === "certificates" ? "hidden" : ""} ${activeSection === "work" ? "hidden" : ""}`}>
        <div className="hero-cover-header">
          <div className="hero-cover-header-line" ref={portfolioHeaderRef}>
            <span className="hero-cover-title-full" aria-label="Portfolio">PORTFOLIO</span>
            <span className="hero-cover-title-portfol" style={{ display: "none" }} aria-hidden="true">PORTFOL</span>
            <span className="hero-cover-title-i" style={{ display: "none", opacity: 1 }} aria-hidden="true">I</span>
            <span className="hero-cover-title-o" style={{ display: "none", opacity: 1 }} aria-label="Navigation menu toggle">O</span>
            <div className="hero-cover-title-line" style={{ display: "none", height: "1px", backgroundColor: "#1e140b", opacity: 0.4, position: "absolute", top: "50%", transform: "translateY(-50%)" }} aria-hidden="true"></div>
            <div className="hero-cover-title-vertical-line" style={{ display: "none", width: "2px", backgroundColor: "#1e140b", position: "fixed" }} aria-hidden="true"></div>
            
            {/* Navigation Menu that replaces O */}
            <div className="o-nav-menu-wrapper" style={{ display: "none" }}>
              <button 
                className={`o-nav-toggle ${isNavMenuOpen ? 'open' : ''}`}
                onClick={toggleNavMenu}
              >
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
              
              <div className={`o-nav-menu ${isNavMenuOpen ? 'open' : ''}`}>
                {Object.entries(sectionConfig).map(([key, config]) => {
                  if (key === "hero") return null;
                  return (
                    <button
                      key={key}
                      className="nav-menu-item"
                      onClick={() => {
                        handleNavigate(key as SectionId);
                        setIsNavMenuOpen(false);
                      }}
                      disabled={isTransitioning || activeSection === key}
                      style={{
                        backgroundColor: config.badgeColor,
                        color: config.badgeText,
                      }}
                    >
                      <span className="nav-menu-number">{config.number}</span>
                      <span className="nav-menu-text">{config.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

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

        /* Navigation Layer */
        .navigation-layer {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 3;
          padding: 0 1rem;
          transition: all 0.4s ease;
        }

        .navigation-layer.hero-mode {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          background: transparent;
          padding: 0 1rem;
        }

        .navigation-layer.nav-mode {
          background: #F5ECE1;
          padding: 0 1rem;
        }

        .navigation-layer.hidden {
          display: none;
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
          padding: 0.7rem 0;
          margin: 0;
        }

        .hero-cover-header-line {
          display: flex;
          align-items: baseline;
          width: 100%;
          gap: 0;
          position: relative;
        }

        .hero-cover-title-full,
        .hero-cover-title-portfol,
        .hero-cover-title-i,
        .hero-cover-title-o {
          font-size: clamp(1rem, 2vw, 1.25rem);
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: #1e140b;
          font-family: "Space Grotesk", "Inter", sans-serif;
          line-height: 1;
          display: inline;
          white-space: nowrap;
        }

        .hero-cover-title-i {
          display: inline;
          transform-origin: center center;
          will-change: transform, opacity;
        }

        .hero-cover-title-o {
          will-change: transform;
        }

        .hero-cover-title-line {
          will-change: width, transform;
          transform-origin: left center;
          position: absolute;
          height: 1px;
          background-color: #1e140b;
          opacity: 0.4;
          top: 50%;
          transform: translateY(-50%);
        }

        .hero-cover-title-vertical-line {
          will-change: height, transform;
          transform-origin: top center;
          position: fixed;
          width: 2px;
          background-color: #1e140b;
          z-index: 1;
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

        /* O Navigation Menu Styles */
        .o-nav-menu-wrapper {
          display: none;
          align-items: center;
          gap: 0.5rem;
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
        }

        .o-nav-toggle {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 32px;
          height: 32px;
          border: none;
          background: #1e140b;
          border-radius: 50%;
          cursor: pointer;
          padding: 6px;
          transition: all 0.3s ease;
          margin-left: 8px;
        }

        .o-nav-toggle:hover {
          transform: scale(1.1);
        }

        .o-nav-toggle.open {
          background: #DA451F;
        }

        .hamburger-line {
          width: 16px;
          height: 1.5px;
          background: #F5ECE1;
          margin: 1.5px 0;
          transition: all 0.3s ease;
          border-radius: 1px;
        }

        .o-nav-toggle.open .hamburger-line:nth-child(1) {
          transform: rotate(45deg) translate(4px, 4px);
        }

        .o-nav-toggle.open .hamburger-line:nth-child(2) {
          opacity: 0;
        }

        .o-nav-toggle.open .hamburger-line:nth-child(3) {
          transform: rotate(-45deg) translate(4px, -4px);
        }

        .o-nav-menu {
          display: none;
          gap: 0.4rem;
          align-items: center;
          padding: 0.4rem;
          background: #F5ECE1;
          border-radius: 1.5rem;
          border: 1px solid rgba(30, 20, 11, 0.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          flex-wrap: wrap;
          max-width: fit-content;
          margin-left: 8px;
        }

        .o-nav-menu.open {
          display: flex;
        }

        .nav-menu-item {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          padding: 0.4rem 0.7rem;
          border-radius: 1.2rem;
          border: none;
          cursor: pointer;
          font-family: "Space Grotesk", sans-serif;
          font-weight: 600;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          transition: all 0.3s ease;
          opacity: 0;
          transform: translateX(20px);
          white-space: nowrap;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }

        .nav-menu-item:hover:not(:disabled) {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
        }

        .nav-menu-item:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .nav-menu-number {
          font-size: 0.55rem;
          font-weight: 700;
          opacity: 0.7;
        }

        .nav-menu-text {
          font-size: 0.65rem;
        }

        @media (max-width: 768px) {
          .o-nav-menu {
            padding: 0.3rem;
            gap: 0.3rem;
          }

          .nav-menu-item {
            padding: 0.3rem 0.6rem;
            font-size: 0.55rem;
          }

          .nav-menu-number {
            font-size: 0.5rem;
          }

          .nav-menu-text {
            font-size: 0.55rem;
          }
        }
      `}</style>
    </div>
  );
}