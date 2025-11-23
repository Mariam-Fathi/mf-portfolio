"use client";

import React from "react";

interface SectionNavigationProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

const SectionNavigation: React.FC<SectionNavigationProps> = ({ onNavigate, currentSection }) => {
  const sections = [
    { id: "hero", label: "home" },
    { id: "experience", label: "experience" },
    { id: "work", label: "projects" },
    { id: "certificates", label: "certificates" },
    { id: "contact", label: "contact" },
  ];

  return (
    <>
      <nav className="section-navigation">
        <div className="section-nav-lines">
          <div className="section-nav-line"></div>
          <div className="section-nav-line"></div>
          <div className="section-nav-line"></div>
        </div>
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
          top: 2rem;
          z-index: 100;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.5rem;
        }

        .section-nav-lines {
          display: flex;
          flex-direction: column;
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
          flex-direction: column;
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
            font-size: clamp(0.5rem, 0.7vw, 0.65rem);
          }
        }
      `}</style>
    </>
  );
};

export default SectionNavigation;

