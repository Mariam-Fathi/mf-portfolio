"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import TitleHeader from "../TitleHeader";
import GlowCard from "../GlowCard";

gsap.registerPlugin(ScrollTrigger);

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
    <section id="experience" className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TitleHeader
          title="My Engineering Journey"
          sub="From AI Research to Production Applications"
        />
        
        <div className="mt-20 relative">
          <div className="relative z-50 space-y-16 lg:space-y-24">
            {expCards.map((card, index) => (
              <div key={card.title} className="exp-card-wrapper group">
                <div className="lg:grid lg:grid-cols-5 lg:gap-12">
                  {/* Left Side - Experience Summary */}
                  <div className="lg:col-span-2 mb-8 lg:mb-0">
                    <GlowCard index={index}>
                      <div className="p-6">
                        <p className="text-gray-300 text-base leading-relaxed font-light">
                          {card.experience}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-700/50">
                          <p className="text-sm text-gray-500 font-medium">
                            {card.fromDate} {card.toDate && `→ ${card.toDate}`}
                          </p>
                          <p className="text-gray-400 text-sm mt-1">
                            {card.type}
                          </p>
                        </div>
                      </div>
                    </GlowCard>
                  </div>

                  <div className="lg:col-span-3">
                    <div className="flex items-start space-x-6">
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className="w-16 h-16 rounded-2xl border-1 border-black-50/50 bg-black-50/50 flex items-center justify-center group-hover:border-black-50/50 transition-colors duration-300">
                          <img
                            src={card.logoPath}
                            alt={`${card.company} logo`}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        </div>
                        <div className="w-0.5 h-full bg-gradient-to-b from-gray-600 to-transparent mt-4" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="expText">
                          <h1 className="font-semibold text-2xl lg:text-3xl text-white mb-2">
                            {card.title}
                          </h1>
                          <p className="text-lg lg:text-xl text-blue-400 mb-4 font-light">
                            {card.company}
                          </p>

                          {card.story && (
                            <div className="mb-8">
                              <div className="space-y-6">
                                {card.story.map((chapter, idx) => (
                                  <div
                                    key={idx}
                                    className="border-l-2 border-blue-500/50 pl-6 py-2 group-hover:border-blue-400 transition-colors duration-300"
                                  >
                                    <p className="text-blue-300 font-medium text-sm mb-2">
                                      {chapter.chapter}
                                    </p>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                      {chapter.content}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          <div>
                            <p className="text-gray-500 text-sm font-medium mb-4 uppercase tracking-wide">
                              Key Achievements
                            </p>
                            <ul className="space-y-3">
                              {card.responsibilities.map((responsibility, idx) => (
                                <li 
                                  key={idx} 
                                  className="text-gray-300 text-base leading-relaxed font-light pl-4 border-l-2 border-gray-700/50 group-hover:border-gray-600 transition-colors duration-300"
                                >
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
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
];