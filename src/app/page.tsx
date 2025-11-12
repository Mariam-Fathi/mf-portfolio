"use client";

import React, {
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/hero/hero";
import CinematicShowcase from "@/components/projects/projects";
import JobTimeline from "@/components/job-timeline/JobTimeline";
import EverythingConnected from "@/components/everything-connected/EverythingConnected";
import Contact from "@/components/Contact";
import { navLinks } from "@/constants";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

type SectionId = "hero" | "work" | "experience" | "skills" | "contact";

const sectionOverlayBackgrounds: Record<SectionId, string> = {
  hero:
    "linear-gradient(140deg, rgba(10,16,14,0.94) 0%, rgba(18,28,26,0.85) 45%, rgba(24,35,30,0.82) 100%)",
  work:
    "linear-gradient(135deg, rgba(158,167,147,0.94) 0%, rgba(138,146,128,0.88) 45%, rgba(116,126,107,0.84) 100%)",
  experience:
    "linear-gradient(135deg, rgba(248,250,244,0.96) 0%, rgba(222,234,214,0.9) 55%, rgba(200,214,192,0.86) 100%)",
  skills:
    "linear-gradient(130deg, rgba(253,235,127,0.94) 0%, rgba(255,217,104,0.9) 48%, rgba(240,190,84,0.85) 100%)",
  contact:
    "linear-gradient(140deg, rgba(8,8,10,0.94) 0%, rgba(15,12,24,0.91) 52%, rgba(22,16,32,0.88) 100%)",
};

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>("hero");
  const [sectionsReady, setSectionsReady] = useState(false);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Record<SectionId, HTMLDivElement | null>>({
    hero: null,
    work: null,
    experience: null,
    skills: null,
    contact: null,
  });

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

  const applyOverlayBackground = useCallback((section: SectionId) => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    gsap.to(overlay, {
      background: sectionOverlayBackgrounds[section],
      duration: 0.8,
      ease: "power2.inOut",
    });
  }, []);

  const activateSection = useCallback(
    (section: SectionId) => {
      setActiveSection((prev) => {
        if (prev === section) return prev;
        applyOverlayBackground(section);
        return section;
      });
    },
    [applyOverlayBackground]
  );

  const setSectionRef = useCallback(
    (id: SectionId) => (node: HTMLDivElement | null) => {
      sectionRefs.current[id] = node;
      if (!node) return;

      const areAllSectionsMounted = (
        Object.values(sectionRefs.current) as (HTMLDivElement | null)[]
      ).every(Boolean);

      if (areAllSectionsMounted) {
        setSectionsReady(true);
        applyOverlayBackground("hero");
      }
    },
    [applyOverlayBackground]
  );

  useLayoutEffect(() => {
    if (!sectionsReady) return;

    const triggers = (Object.keys(sectionRefs.current) as SectionId[])
      .map((sectionId) => {
        const node = sectionRefs.current[sectionId];
        if (!node) return null;

        return ScrollTrigger.create({
          trigger: node,
          start: "top center",
          end: "bottom center",
          onEnter: () => activateSection(sectionId),
          onEnterBack: () => activateSection(sectionId),
        });
      })
      .filter((trigger): trigger is ScrollTrigger => Boolean(trigger));

    ScrollTrigger.refresh();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [activateSection, sectionsReady]);

  const handleNavigate = useCallback((section: SectionId) => {
    const node = sectionRefs.current[section];
    if (!node) return;

    node.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#F5ECE1] text-[#FEFCE0]">
      {/* <Navbar
        items={navItems}
        homeId="hero"
        activeId={activeSection}
        onNavigate={handleNavigate}
      /> */}

      <main className="relative flex w-full flex-col">
        <section
          id="hero"
          ref={setSectionRef("hero")}
          className="relative flex min-h-[100vh] w-full items-center justify-center"
        >
          <Hero />
        </section>

        <section
          id="work"
          ref={setSectionRef("work")}
          className="relative flex min-h-[100vh] w-full  text-[#080E0B]"
        >
          <CinematicShowcase />
        </section>
        <section
          id="skills"
          ref={setSectionRef("skills")}
          className="relative flex min-h-[100vh] w-full items-center justify-center"
        >
          <EverythingConnected />
        </section>

        <section
          id="experience"
          ref={setSectionRef("experience")}
          className="relative flex min-h-[100vh] w-full items-center justify-center"
        >
          <JobTimeline />
        </section>

        <section
          id="contact"
          ref={setSectionRef("contact")}
          className="relative flex min-h-[100vh] w-full items-center justify-center"
        >
          <Contact />
        </section>
      </main>
      <div
        ref={overlayRef}
        className="pointer-events-none fixed inset-0 z-[-1]"
        style={{
          background: sectionOverlayBackgrounds[activeSection],
        }}
      />
    </div>
  );
}
