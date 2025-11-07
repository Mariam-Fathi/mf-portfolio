"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import CinematicShowcase from "@/components/projects/projects";
import JobTimeline from "@/components/job-timeline/JobTimeline";
import CertificatesSection from "@/components/Certificates";
import EverythingConnected from "@/components/everything-connected/EverythingConnected";
import Contact from "@/components/Contact";
import { navLinks } from "@/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

type SectionId =
  | "hero"
  | "work"
  | "experience"
  | "skills"
  | "certificates"
  | "contact";

const transitionDuration = 600;

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [pendingSection, setPendingSection] = useState<SectionId | null>(null);
  const [transitionState, setTransitionState] = useState<
    "idle" | "enter" | "exit"
  >("idle");
  const sectionScrollRef = useRef<HTMLDivElement | null>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLDivElement | null>(
    null
  );

  const navItems = useMemo<{ id: SectionId; label: string }[]>(
    () => [
      { id: "hero", label: "Home" },
      ...navLinks.map(({ name, link }) => ({
        id: link.replace("#", "") as SectionId,
        label: name,
      })),
      { id: "contact", label: "Contact" },
    ],
    []
  );

  const renderSection = (
    id: SectionId,
    scrollEl: HTMLDivElement | null
  ): React.ReactNode => {
    switch (id) {
      case "hero":
        return <Hero />;
      case "work":
        return (
          <CinematicShowcase
            isActive={id === "work"}
            scrollContainer={null}
          />
        );
      case "experience":
        return <JobTimeline />;
      case "skills":
        return <EverythingConnected />;
      case "certificates":
        return <CertificatesSection />;
      case "contact":
        return <Contact />;
      default:
        return null;
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (!scrollContainer || activeSection === "work") return;
    scrollContainer.scrollTo({ top: 0 });
  }, [activeSection, scrollContainer]);

  useEffect(() => {
    if (!scrollContainer || activeSection === "work") {
      ScrollTrigger.defaults({ scroller: window });
      return;
    }
    ScrollTrigger.defaults({ scroller: scrollContainer });
    ScrollTrigger.refresh();
    return () => {
      ScrollTrigger.defaults({ scroller: window });
    };
  }, [scrollContainer, activeSection]);

  useEffect(() => {
    if (transitionState !== "idle") return;
    ScrollTrigger.refresh();
  }, [activeSection, transitionState]);

  useEffect(() => {
    let enterTimer: ReturnType<typeof setTimeout>;
    let exitTimer: ReturnType<typeof setTimeout>;

    if (transitionState === "enter" && pendingSection) {
      enterTimer = setTimeout(() => {
        setActiveSection(pendingSection);
        setTransitionState("exit");
      }, transitionDuration);
    }

    if (transitionState === "exit") {
      exitTimer = setTimeout(() => {
        setTransitionState("idle");
        setPendingSection(null);
      }, transitionDuration);
    }

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [pendingSection, transitionState]);

  const handleNavigate = (section: SectionId) => {
    if (section === activeSection || transitionState !== "idle") return;

    setPendingSection(section);
    setTransitionState("enter");
  };

  const overlayTranslateY = useMemo(() => {
    if (transitionState === "enter") return "0%";
    if (transitionState === "exit") return "100%";
    return "-100%";
  }, [transitionState]);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#080E0B] text-[#FEFCE0]">
      <Navbar
        items={navItems}
        homeId="hero"
        activeId={activeSection}
        onNavigate={handleNavigate}
        disabled={transitionState !== "idle"}
      />

      <main className="relative flex h-full w-full overflow-hidden">
        <div className="flex h-full w-full items-stretch justify-center">
          <div
            ref={(node) => {
              sectionScrollRef.current = node;
              setScrollContainer(node);
            }}
            className={`h-full w-full ${
              activeSection === "work"
                ? "overflow-hidden"
                : "overflow-y-auto overscroll-contain"
            }`}
            style={{
              pointerEvents: transitionState === "idle" ? "auto" : "none",
            }}
          >
            {renderSection(activeSection, scrollContainer)}
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-40 bg-[#C7F284]"
          style={{
            transform: `translateY(${overlayTranslateY})`,
            transition: `transform ${transitionDuration}ms ease-in-out`,
          }}
        />
      </main>
    </div>
  );
}
