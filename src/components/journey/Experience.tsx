"use client";

import React, { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

interface ExperienceCard {
  experience: string;
  title: string;
  company: string;
  fromDate: string;
  toDate?: string;
  type: string;
  logoPath: string;
  story?: {
    chapter: string;
    content: string;
  }[];
  responsibilities: string[];
}

const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 80,
          filter: "blur(15px)",
          scale: 0.9,
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 1.8,
          ease: "power4.out",
        }
      ).fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 40,
          filter: "blur(12px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power2.out",
        },
        "-=1.2"
      );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section
      id="experience"
      className="w-full bg-black font-sans md:px-10 relative overflow-hidden py-20 max-sm:py-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 relative z-10">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-6 tracking-tight opacity-0"
          >
            ENGINEERING
            <br />
            JOURNEY
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide opacity-0"
          >
            From AI Research to Production Applications
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pb-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-800 border border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500">
                {item.title}
              </h3>
              {item.content}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#2F3B59] to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-white via-white-50 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>
    </section>
  );
};

const ExperienceTimeline = () => {
  const timelineData: TimelineEntry[] = expCards.map((card) => ({
    title: card.company,
    content: (
      <div className="bg-black rounded-3xl border-2 shadow border-gray-700/70 p-8 backdrop-blur-sm">
        <div className="flex items-start gap-6 mb-6">
          <div className="w-16 h-16  flex items-center justify-center">
            <img
              src={card.logoPath}
              alt={`${card.company} logo`}
              className="w-16 h-16 object-contain rounded-2xl border border-gray-600/30 bg-black/50 flex items-center justify-center"
            />
          </div>

          <div className="flex-1">
            <h3 className="text-2xl lg:text-3xl font-light text-white mb-2">
              {card.title}
            </h3>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-400 font-light">
                {card.fromDate} {card.toDate && `→ ${card.toDate}`}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 font-light">{card.type}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-300 text-lg leading-relaxed font-light tracking-wide mb-6">
          {card.experience}
        </p>

        {card.story && (
          <div className="mb-6">
            <div className="space-y-4">
              {card.story.map((chapter, idx) => (
                <div
                  key={idx}
                  className="border-l-2 border-blue-500/30 pl-6 py-3"
                >
                  <p className="text-blue-300 font-medium text-sm mb-2 tracking-wide">
                    {chapter.chapter}
                  </p>
                  <p className="text-gray-400 text-base leading-relaxed font-light">
                    {chapter.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wider">
            Key Achievements
          </p>
          <ul className="space-y-3">
            {card.responsibilities.map((responsibility, idx) => (
              <li
                key={idx}
                className="text-gray-300 text-base leading-relaxed font-light pl-4 border-l-2 border-gray-700/50"
              >
                {responsibility}
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
  }));

  return <Timeline data={timelineData} />;
};

export default ExperienceTimeline;

export const expCards: ExperienceCard[] = [
  {
    experience:
      "Engineered an end-to-end system to predict the Big Five personality traits by fusing visual, auditory, and textual data from videos. Developed and integrated dedicated deep learning models (LSTNet, OpenFace, BERT) on the First Impressions V2 dataset (10,000+ videos). Addressed critical challenges like high-dimensional time-series data and severe class imbalance through advanced oversampling, culminating in a robust late-fusion model (XGBoost) deployed via a full-stack web application.",
    title: "AI Research Engineer / ML Engineer",
    company: "Benha University | Faculty of Engineering at Shoubra",
    fromDate: "2022",
    toDate: "2023",
    type: "Academic AI Research: Multimodal Personality Trait Prediction",
    logoPath: "/images/logos/experience/university-logo.svg",
    responsibilities: [
      "Resolved a critical data imbalance via a strategic oversampling technique, significantly enhancing model accuracy and prediction reliability across all modalities.",
      "Engineered a video analysis pipeline using OpenFace and LSTNet to model long-term facial behavior from action units, establishing a robust foundation for trait recognition.",
      "Processed and modeled a large-scale dataset of 10,000+ videos to extract and analyze meaningful behavioral cues for personality recognition.",
    ],
  },
  {
    experience:
      "Transitioned from intern to a core mobile engineer in a cross-functional team, playing a pivotal role in developing the flagship Smart Key product. Took primary responsibility for architecting and building both guest and staff React Native applications from the ground up. Our work was central to a critical PoC deployment at the Almadiafa Hotel, which served as our live test environment. The success of this pilot directly enabled us to secure and deploy the product with Long Beach Resort in Hurghada as our major enterprise client.",
    title: "Mobile Software Engineer",
    company: "Tarqia for Technology",
    fromDate: "Jan 2024",
    toDate: "Present",
    type: "Full-time",
    logoPath: "/images/logos/experience/tarqia-logo.svg",
    responsibilities: [
      "Led end-to-end development of React Native applications for guest and staff, from initial architecture to deployment in live hotel pilot environment",
      "Contributed directly to securing enterprise contract with Long Beach Resort through successful PoC deployment",
      "Gained hands-on experience across full product lifecycle in high-pressure startup environment, from development to stakeholder management",
    ],
  },
  {
    experience:
      "Transformed a basic React Native UI tutorial into a full-stack real estate platform with analytics dashboard, creating a personal learning environment for intelligent feature development. While pursuing the DeepLearning.AI Data Engineering Professional Certificate, I sourced the USA Real Estate Dataset (2.2M+ records) to build a recommendation system. During deep exploratory analysis, I uncovered critical data quality issues that shifted the project focus from model development to robust data engineering and anomaly detection.",
    title: "From UI Tutorial to Data Engineering Discovery Environment",
    company: "Self-Directed Learning Project",
    fromDate: "Jan 2025",
    toDate: "Present",
    type: "Technical Discovery",
    logoPath: "/images/logos/experience/mf-logo.svg",

    responsibilities: [
      "Uncovered critical data quality issues in a 2.2M+ record dataset, identifying that 38.19% of records contained anomalous data through rigorous exploratory analysis",
      "Engineered memory-optimized data pipelines achieving 87.4% memory reduction while detecting 57,592 suspicious patterns with 99.4% accuracy",
      "Built full-stack PropTech platform with mobile app, analytics dashboard, and real-time notification systems deployed to production",
    ],
  },
  {
    experience:
      "While developing a home services mobile application, identified a critical sales bottleneck where non-technical sales representatives struggled to provide quick cost estimates. Proactively developed an AI-powered estimation tool with 85% confidence using Hugging Face's pretrained models to analyze project descriptions and generate instant quotations. Reduced project estimation time from days to minutes and proposed a strategic roadmap for continuous model enhancement through systematic data feedback loops.",
    title: "Freelance Mobile Developer",
    company: "Dracode",
    fromDate: "Mar 2025",
    toDate: "Jul 2025",
    type: "Freelance Project",
    logoPath: "/images/logos/experience/dracode-logo.svg",
    responsibilities: [
      "Developed AI-powered estimation tool achieving 85% confidence in cost predictions, reducing sales quotation time from days to minutes",
      "Identified and solved critical sales bottleneck by analyzing project descriptions with Hugging Face pretrained models, enabling non-technical sales team to provide instant data-backed quotes",
      "Architected scalable feedback roadmap for continuous model improvement, transforming prototype into company-specific asset through systematic data collection",
    ],
  },
];
