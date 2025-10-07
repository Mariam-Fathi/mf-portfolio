'use client'

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    // Your existing animation code remains excellent
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");
  }, []);

  return (
      <section
          id="experience"
          className="flex-center section-padding xl:px-0"
      >
        <div className="w-full h-full md:px-20 px-5">
          <TitleHeader
              title="My Engineering Journey"
              sub="🚀 From AI Research to Production Applications"
          />
          <div className="mt-32 relative">
            <div className="relative z-50 xl:space-y-32 space-y-10">
              {expCards.map((card) => (
                  <div key={card.title} className="exp-card-wrapper">
                    <div className="xl:w-2/6">
                      <GlowCard card={card}>
                        {/* Optional: You could add achievement badges here */}
                      </GlowCard>
                    </div>
                    <div className="xl:w-4/6">
                      <div className="flex items-start">
                        <div className="timeline-wrapper">
                          <div className="timeline" />
                          <div className="gradient-line w-1 h-full" />
                        </div>
                        <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                          <div className="timeline-logo">
                            <img
                                src={card.logoPath}
                                alt={`${card.company} logo`}
                                className="w-20 h-20 rounded-full border-2 border-gray-600"
                            />
                          </div>
                          <div className="flex-1">
                            <h1 className="font-semibold text-3xl text-white">
                              {card.title}
                            </h1>
                            <p className="text-xl text-blue-300 mt-1">
                              {card.company}
                            </p>
                            <p className="my-5 text-white-50 flex items-center">
                              🗓️&nbsp;{card.date}
                            </p>
                            <p className="text-[#839CB5] italic font-medium">
                              Key Contributions & Learnings
                            </p>
                            <ul className="list-disc ms-5 mt-5 flex flex-col gap-4 text-white-50">
                              {card.responsibilities.map((responsibility, index) => (
                                  <li key={index} className="text-lg leading-relaxed">
                                    {responsibility}
                                  </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </section>
  );
};

export default Experience;