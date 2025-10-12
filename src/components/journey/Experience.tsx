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

                        {card.story && (
                          <div className="mb-6">
                            <p className="text-[#839CB5] italic font-medium mb-3">
                              The Journey:
                            </p>
                            <div className="space-y-3">
                              {card.story.map((chapter, idx) => (
                                <div
                                  key={idx}
                                  className="border-l-2 border-blue-500 pl-4 py-1"
                                >
                                  <p className="text-blue-300 font-medium text-sm">
                                    {chapter.chapter}
                                  </p>
                                  <p className="text-white-50 text-sm mt-1">
                                    {chapter.content}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className="text-[#839CB5] italic font-medium">
                          Key Achievements:
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
      "Transitioned from intern to a core mobile engineer in a cross-functional team. Played a pivotal role in developing the flagship 'Smart Key' product, taking primary responsibility for architecting and building both the guest and staff React Native applications from scratch.",
    title: "Mobile Software Engineer",
    company: "Tarqia for Technology",
    fromDate: "Jan 2024 - Present",
    type: "Full-time",
    logoPath: "/images/logos/experience/tarqia-logo.svg",
    responsibilities: [
      "Promoted to a full-time role following a successful 3-month internship based on performance evaluation.",
      "As the primary owner of the React Native codebase for both guest and staff apps, led the front-end development and collaborated closely with the team on system architecture and hardware integration.",
      "Gained deep, hands-on experience across the full product lifecycle. Our team's iterative development process began with a year-long testing phase at Almadiafa Hotel, which served as our live testing environment and was crucial for refining the product.",
      "This proven track record directly enabled the company to secure and successfully deploy Proof-of-Concepts (POCs) for two major hotel chains in Hurghada: Long Beach Resort and Amarina Group.",
      "Actively participated in cross-functional brainstorming sessions with stakeholders, including co-founder Eng. Abdelhamid, ensuring our technical development was tightly aligned with business goals and user needs.",
    ],
  },
  {
    experience:
      "This lesson that while fascination often centers on the final 20% of the work—the model architecture—the decisive 80% that dictates real-world success lies in the unglamorous, rigorous work of building trustworthy data pipelines was powerfully reinforced when a simple React Native tutorial evolved into a mission to build intelligent features—only to discover that the real engineering challenge wasn't the ML algorithms, but the integrity of the data that fuels them.",
    title: "From React Native Tutorial to Data Engineering Discovery",
    company: "Self-Directed Learning Project",
    fromDate: "Jan 2025",
    toDate: "present",
    type: "Technical Discovery",
    logoPath: "/images/logos/experience/mf-logo.svg",
    story: [
      {
        chapter: "Building the Foundation",
        content:
          "Started with a basic React Native real estate tutorial and transformed it into a full-stack platform with Appwrite database, OAuth authentication, Firebase push notifications, and Stripe payments.",
      },
      {
        chapter: "The Intelligent Features Vision",
        content:
          "Planned to implement ML algorithms for property recommendations. Built user preference tracking and automated notification system to deliver personalized property suggestions.",
      },
      {
        chapter: "The Data Discovery",
        content:
          "Sourced the USA Real Estate Dataset (2.2M+ records) for training. Uncovered that 38.19% of records contained anomalous data—placeholder dates and suspicious financial patterns.",
      },
      {
        chapter: "The Engineering Reality",
        content:
          "Confronted with massive data quality issues, I pivoted to data engineering fundamentals: building robust pipelines, optimizing memory usage by 87.4%, and validating data integrity.",
      },
      {
        chapter: "The Analytics Dashboard",
        content:
          "Built a comprehensive web analytics dashboard with real-time business intelligence, revenue tracking, user engagement metrics, and property performance analytics.",
      },
      {
        chapter: "The Ultimate Lesson",
        content:
          "Reinforced my understanding: sophisticated ML is constrained by data quality. The real engineering work happens in the data pipelines, not just the algorithms.",
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
      "While delivering the primary mobile application, I observed a recurring sales bottleneck: non-technical sales reps struggled to provide quick initial cost estimates, causing delays and potentially lost deals.",
      "Proactively designed and developed an internal tool using a pre-trained Hugging Face model to analyze project descriptions and generate instant cost estimations with ~85% confidence.",
      "The tool empowered the sales team to provide immediate, data-backed ballpark figures during initial client conversations, significantly improving response time and lead qualification.",
      "Presented a strategic roadmap to the founder for evolving the prototype into a refined, company-specific asset by implementing a data feedback loop for continuous model improvement.",
    ],
  },
  {
    experience:
      "Led the video processing module for a multimodal AI system, where I uncovered and solved a critical data imbalance issue—transforming the project's direction and reinforcing my core belief: robust AI is built on trustworthy data, not just complex models.",
    title: "AI Research Lead (Video Module) - Graduation Project",
    company: "Benha University | Faculty of Engineering at Shoubra",
    fromDate: "2022 - 2023",
    type: "Academic Research",
    logoPath: "/images/logos/experience/university-logo.svg",
    responsibilities: [
      "Spearheaded the video analysis pipeline for a multimodal system predicting Big Five personality traits from video interviews.",
      "Engineered the feature extraction process using VGG-Face, OpenFace, and DeepFace for emotion & action unit detection.",
      "Diagnosed a major class imbalance in the dataset causing model bias; implemented an oversampling strategy that significantly improved prediction fairness and accuracy.",
      "Experimented with and evaluated multiple architectures (LSTNet, TCN, MLP, XGBoost, Stacking Ensembles) to select the best-performing model for the fusion stage.",
      "Presented key findings on the importance of data integrity as the foundation for reliable AI systems, shifting the team's focus towards robust data pipelines.",
    ],
  },
];
