"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

interface ExperienceCard {
  experience: string;
  title: string;
  company: string;
  fromDate: string;
  toDate?: string;
  type: string;
  logoPath: string;
  responsibilities: string[];
}

const Experience = () => {
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card: unknown) => {
      gsap.from(card as gsap.TweenTarget, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card as gsap.DOMTarget,
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

    gsap.utils.toArray(".expText").forEach((text: unknown) => {
      gsap.from(text as gsap.TweenTarget, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text as gsap.DOMTarget,
          start: "top 60%",
        },
      });
    }, "<");
  }, []);

  return (
    <section id="experience" className="flex-center section-padding xl:px-0">
      <div className="w-full h-full md:px-20 px-4">
        <TitleHeader
          title="My Engineering Journey"
          sub="🚀 From AI Research to Production Applications"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper">
                <div className="xl:w-2/6">
                  <GlowCard index={index}>
                    <div className="mb-5">
                      <p className="text-white-50 text-lg">{card.experience}</p>
                    </div>
                  </GlowCard>
                </div>
                <div className="xl:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex xl:gap-20 md:gap-10 gap-5 relative z-20">
                      <div className="timeline-logo flex-shrink-0">
                        <div className="md:w-20 md:h-20 w-10 h-10 rounded-full border-2 border-gray-600 overflow-hidden">
                          <img
                            src={card.logoPath}
                            alt={`${card.company} logo`}
                            className="w-full h-full object-cover rounded-full"
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h1 className="font-semibold text-3xl text-white">
                          {card.title}
                        </h1>
                        <p className="text-xl text-blue-300 mt-1">
                          {card.company} - {card.type}
                        </p>
                        <p className="mt-1 mb-5 text-sm text-white-50 flex items-center">
                          {card.fromDate} {card.toDate && `- ${card.toDate}`}
                        </p>
                        <p className="text-[#839CB5] italic font-medium">
                          Key Contributions & Learnings:
                        </p>
                        <ul className="list-disc ms-5 mt-2 flex flex-col gap-2 text-white-50">
                          {card.responsibilities.map((responsibility, idx) => (
                            <li key={idx} className="text-lg leading-relaxed">
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

export const expCards: ExperienceCard[] = [
  {
    experience:
      "Real-world impact is achieved not by perfect code, but by resilient systems that solve tangible business problems under pressure.",
    title: "Lead Mobile Engineer",
    company: "Tarqia for Technology",
    fromDate: "Apr 2024",
    toDate: "Present",
    type: "Full-time",
    logoPath: "/images/logos/experience/tarqia-logo.svg",
    responsibilities: [
      "Single-handedly architected and built the flagship 'Smart Key' mobile applications from scratch after a colleague's departure",
      "Led the full product lifecycle through a critical pilot deployment, navigating complex hardware integrations and stakeholder management",
      "Contributed directly to securing enterprise contracts with major hotels in Hurghada by demonstrating product viability",
      "Thrived in a high-pressure startup environment, often wearing multiple hats from engineering to product strategy",
    ],
  },
  {
    experience:
      "True mastery lies in self-directed learning; the ability to deconstruct a field and build competence from the ground up is the ultimate leverage.",
    title: "AI Research & Mobile Developer",
    company: "Self-Directed Learning & Projects",
    fromDate: "Jan 2025",
    toDate: "present",
    type: "Self-Study",
    logoPath: "/images/logos/experience/mf-logo.svg",
    responsibilities: [
      "Mastered React Native through intensive self-learning to pivot into software engineering",
      "Developed full-stack applications integrating OAuth, payments, push notifications, and Appwrite database",
      "Conducted deep data analysis on the USA Real Estate Dataset, uncovering 38.19% data quality issues",
      "Built AI tools using Hugging Face models and designed scalable data pipelines for continuous learning",
    ],
  },
  {
    experience:
      "The most immediate AI value often comes from solving specific pain points; even simple models can deliver massive ROI when integrated into real workflows.",
    title: "ML/AI Research & Frontend Developer",
    company: "Dracode Startup",
    fromDate: "Mar 2025",
    toDate: "Jul 2025",
    type: "Freelance",
    logoPath: "/images/logos/experience/dracode-logo.svg",
    responsibilities: [
      "Identified a critical sales bottleneck: team struggling with technical project estimations costing deals",
      "Architected and built an internal AI tool using Hugging Face models to generate cost estimates from project descriptions",
      "Designed a scalable feedback loop to collect final deal prices for continuous model retraining",
      "Proposed a product roadmap to evolve the prototype into a company-specific competitive advantage",
    ],
  },
  {
    experience:
      "Mobile development provides the perfect bridge between theoretical AI concepts and real-user impact, where software meets human behavior.",
    title: "Mobile Engineer Intern",
    company: "Tarqia for Technology",
    fromDate: "Jan 2024",
    toDate: "Mar 2024",
    type: "Internship",
    logoPath: "/images/logos/experience/tarqia-logo.svg",
    responsibilities: [
      "Completed intensive training in React Native and mobile development fundamentals",
      "Contributed to early-stage UI components and feature development for prototype applications",
      "Gained foundational understanding of mobile architecture patterns and state management",
      "Transitioned to full-time role based on demonstrated technical aptitude and performance",
    ],
  },
  {
    experience:
      "The most sophisticated model is constrained by the integrity of its data; the real challenge lies in the unglamorous work of building trustworthy pipelines.",
    title: "AI Research Lead - Graduation Project",
    company: "Benha University - Computer Systems Engineering",
    fromDate: "Academic Year 2022/2023 ",
    type: "Academic Project",
    logoPath: "/images/logos/experience/university-logo.svg",
    responsibilities: [
      "Led the video processing module for a multimodal AI system predicting personality traits",
      "Implemented advanced techniques including VGG-Face, LSTNet, and ensemble methods",
      "Identified and solved critical class imbalance issues that were biasing model results",
      "Gained pivotal insight into the gap between AI prototypes and production-ready systems",
    ],
  },
];