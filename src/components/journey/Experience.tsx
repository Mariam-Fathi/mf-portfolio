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

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(titleRef.current,
      { 
        opacity: 0, 
        y: 80,
        filter: "blur(15px)",
        scale: 0.9
      },
      { 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        scale: 1,
        duration: 1.8,
        ease: "power4.out"
      }
    )
    .fromTo(subtitleRef.current,
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
        ease: "power2.out"
      },
      "-=1.2"
    );
  }, { scope: containerRef });

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
            ENGINEERING<br />JOURNEY
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
      <div className="bg-gradient-to-br from-gray-900/80 to-black rounded-3xl border border-gray-700/30 p-8 backdrop-blur-sm">
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
              <span className="text-gray-400 font-light">
                {card.type}
              </span>
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
      "Led the video processing module for a multimodal AI system, where I uncovered and solved a critical data imbalance issue—transforming the project's direction and reinforcing my core belief: robust AI is built on trustworthy data, not just complex models.",
    title: "AI Research Lead (Video Module) - Graduation Project",
    company: "Benha University | Faculty of Engineering at Shoubra",
    fromDate: "2022",
    toDate: "2023",
    type: "Academic Research",
    logoPath: "/images/logos/experience/university-logo.svg",
    responsibilities: [
      "Spearheaded video analysis pipeline for multimodal system predicting Big Five personality traits from video interviews",
      "Engineered feature extraction process using VGG-Face, OpenFace, and DeepFace for emotion & action unit detection",
      "Diagnosed major class imbalance in dataset causing model bias; implemented oversampling strategy that significantly improved prediction fairness",
      "Experimented with multiple architectures (LSTNet, TCN, MLP, XGBoost, Stacking Ensembles) to select best-performing model",
      "Presented key findings on importance of data integrity as foundation for reliable AI systems",
    ],
  },
    {
    experience:
      "Transitioned from intern to a core mobile engineer in a cross-functional team. Played a pivotal role in developing the flagship 'Smart Key' product, taking primary responsibility for architecting and building both the guest and staff React Native applications from scratch.",
    title: "Mobile Software Engineer",
    company: "Tarqia for Technology",
    fromDate: "Jan 2024",
    toDate: "Present",
    type: "Full-time",
    logoPath: "/images/logos/experience/tarqia-logo.svg",
    responsibilities: [
      "Promoted to a full-time role following a successful 3-month internship based on performance evaluation",
      "As the primary owner of the React Native codebase for both guest and staff apps, led the front-end development and collaborated closely on system architecture",
      "Gained deep, hands-on experience across the full product lifecycle with iterative development and live testing at Almadiafa Hotel",
      "Enabled company to secure and deploy Proof-of-Concepts for major hotel chains in Hurghada through proven track record",
      "Actively participated in cross-functional brainstorming sessions with stakeholders, ensuring technical alignment with business goals",
    ],
  },
    {
    experience:
      "This lesson that while fascination often centers on the final 20% of the work—the model architecture—the decisive 80% that dictates real-world success lies in the unglamorous, rigorous work of building trustworthy data pipelines was powerfully reinforced when a simple React Native tutorial evolved into a mission to build intelligent features.",
    title: "From React Native Tutorial to Data Engineering Discovery",
    company: "Self-Directed Learning Project",
    fromDate: "Jan 2025",
    toDate: "Present",
    type: "Technical Discovery",
    logoPath: "/images/logos/experience/mf-logo.svg",
    story: [
      {
        chapter: "Building the Foundation",
        content: "Started with a basic React Native real estate tutorial and transformed it into a full-stack platform with Appwrite database, OAuth authentication, Firebase push notifications, and Stripe payments.",
      },
      {
        chapter: "The Intelligent Features Vision",
        content: "Planned to implement ML algorithms for property recommendations. Built user preference tracking and automated notification system to deliver personalized property suggestions.",
      },
      {
        chapter: "The Data Discovery",
        content: "Sourced the USA Real Estate Dataset (2.2M+ records) for training. Uncovered that 38.19% of records contained anomalous data—placeholder dates and suspicious financial patterns.",
      },
      {
        chapter: "The Engineering Reality",
        content: "Confronted with massive data quality issues, I pivoted to data engineering fundamentals: building robust pipelines, optimizing memory usage by 87.4%, and validating data integrity.",
      },
      {
        chapter: "The Analytics Dashboard",
        content: "Built a comprehensive web analytics dashboard with real-time business intelligence, revenue tracking, user engagement metrics, and property performance analytics.",
      },
      {
        chapter: "The Ultimate Lesson",
        content: "Reinforced my understanding: sophisticated ML is constrained by data quality. The real engineering work happens in the data pipelines, not just the algorithms.",
      },
    ],
    responsibilities: [
      "Built complete full-stack platform with real-time web analytics dashboard showing revenue, user engagement, and property performance metrics",
      "Implemented Firebase push notification system with personalized property recommendations based on user interactions and preferences",
      "Integrated Stripe payment processing and comprehensive user activity tracking across mobile and web platforms",
      "Discovered 38.19% data quality issues in 2.2M+ property records through rigorous exploratory data analysis",
      "Developed memory-optimized data pipeline achieving 87.4% reduction while detecting 57,592 suspicious patterns with 99.4% accuracy",
      "Created user preference analysis system that tracks viewing patterns and provides data-driven recommendations",
    ],
  },
  {
    experience:
      "During a mobile app freelance project, I identified a critical sales bottleneck and took the initiative to build an AI-powered tool that automated preliminary cost estimation—demonstrating my drive to solve business problems with intelligent systems beyond my core responsibilities.",
    title: "Freelance Mobile Developer | AI Initiative",
    company: "Dracode",
    fromDate: "Mar 2025",
    toDate: "Jul 2025",
    type: "Freelance Project",
    logoPath: "/images/logos/experience/dracode-logo.svg",
    responsibilities: [
      "While delivering the primary mobile application, observed recurring sales bottleneck with non-technical sales reps struggling to provide quick initial cost estimates",
      "Proactively designed and developed internal tool using pre-trained Hugging Face model to analyze project descriptions and generate instant cost estimations",
      "Empowered sales team to provide immediate, data-backed ballpark figures during initial client conversations, significantly improving response time",
      "Presented strategic roadmap for evolving prototype into refined, company-specific asset with data feedback loop for continuous model improvement",
    ],
  },
];