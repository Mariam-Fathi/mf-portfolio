"use client";

import React, { useEffect, useRef } from "react";
import { getHeroNavigationY } from "@/utils/navigationPosition";

interface SectionNavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ onNavigate, currentSection }) => {
  const navRef = useRef<HTMLElement>(null);
  const sections = [
    { id: "hero", label: "home" },
    { id: "experience", label: "experience" },
    { id: "work", label: "projects" },
    { id: "certificates", label: "certificates" },
    { id: "contact", label: "contact" },
  ];

  // Set navigation Y position to match hero section
  useEffect(() => {
    const updatePosition = () => {
      const heroY = getHeroNavigationY();
      if (heroY !== null && navRef.current) {
        navRef.current.style.top = `${heroY}px`;
      }
    };

    // Try to update position immediately
    updatePosition();

    // Also try after a short delay in case hero hasn't calculated it yet
    const timeout = setTimeout(updatePosition, 100);
    
    // Update on window resize
    window.addEventListener('resize', updatePosition);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener('resize', updatePosition);
    };
  }, []);

  return (
    <>
      <nav ref={navRef} className="section-navigation">
        {/* <div className="section-nav-lines">
          <div className="section-nav-line"></div>
          <div className="section-nav-line"></div>
          <div className="section-nav-line"></div>
        </div> */}
        <ul className="section-nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(section.id);
                }}
                className={currentSection === section.id ? "active" : ""}
              >
                {section.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <style jsx>{`
        .section-navigation {
          position: fixed;
          left: 2rem;
          top: 0rem;
          z-index: 100;
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .section-nav-lines {
          display: flex;
          flex-direction: row;
          gap: 0.5rem;
        }

        .section-nav-line {
          width: 2rem;
          height: 1px;
          background-color: #280B0B;
          opacity: 0.8;
        }

        .section-nav-links {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: row;
          gap: 0.75rem;
        }

        .section-nav-links li {
          margin: 0;
          padding: 0;
        }

        .section-nav-links button {
          background: none;
          border: none;
          font-family: "Momo Trust Display", "Stack Sans", sans-serif;
          font-size: clamp(0.6rem, 0.8vw, 0.75rem);
          font-weight: 300;
          text-transform: lowercase;
          letter-spacing: 0.05em;
          color: #280B0B;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s ease;
          padding: 0;
          text-align: left;
        }

        .section-nav-links button:hover {
          opacity: 1;
        }

        .section-nav-links button.active {
          opacity: 1;
          font-weight: 400;
        }

        @media (max-width: 768px) {
          .section-navigation {
            left: 1rem;
            top: 1.5rem;
          }

          .section-nav-lines {
            gap: 0.4rem;
          }

          .section-nav-line {
            width: 1.5rem;
          }

          .section-nav-links button {
            font-size: clamp(0.4rem, 0.6vw, 0.55rem);
          }
        }
      `}</style>
    </>
  );
};

export default SectionNavigation;

