"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconBrandGithub,
  IconExternalLink,
  IconCode,
  IconMenu2,
  IconX,
  IconDeviceMobile,
  IconDeviceLaptop,
  IconBook,
} from "@tabler/icons-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaggle } from "@fortawesome/free-brands-svg-icons";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const projectsData = [
  {
    id: "smart-key",
    category: "IoT Solution",
    title: "Smart Key Hospitality Platform",
    role: "Lead Mobile Engineer",
    duration: "2024 - Present",
    summary:
      "Engineered an end-to-end digital hospitality platform that transforms the complete guest journey from reservation to checkout, fully replacing traditional key card systems with a secure, smartphone-based access control. The solution, featuring dedicated mobile applications for guests and staff and a centralized admin web portal, was first proven in a successful pilot at the Almadiafia Hotel. Following this validation, we scaled the platform to the entire Long Beach Resort chain, securing enterprise contracts and executing seamless hardware and IoT integrations to achieve a live production environment with 100% keyless access across all properties.",
    githubUrl: null,
    deployment: "Apps on Google Play",
    playStoreUrls: [
      {
        name: "Long Beach Hotel",
        url: "https://play.google.com/store/apps/details?id=com.smartkeylb",
      },
      {
        name: "Almadiafa Hotel",
        url: "https://play.google.com/store/apps/details?id=com.madiafaaa",
      },
    ],
    image: "/images/sk.png",
    deliverables: ["Guest Mobile App", "Staff Mobile App"],
  },
  {
    id: "real-estate",
    category: "Data Engineering",
    title: "Real Estate Data Quality & Analytics",
    role: "Data Engineer & Analyst",
    duration: "2025",
    summary:
      "Analyzed 2.2M+ real estate records from Kaggle's USA Real Estate Dataset, implementing comprehensive data quality auditing and anomaly detection systems. Engineered memory-optimized data pipelines achieving 87.4% memory reduction through strategic dtype optimization and categorical conversions. Identified 38.19% suspicious records including 734,297 placeholder dates and 115,872 duplicate price entries across the dataset. Developed sophisticated pattern recognition algorithms detecting 57,592 suspicious broker-price combinations spanning over 365 days. Generated comprehensive suspicious case reports for regulatory review and further investigative action.",
    githubUrl: null,
    kaggleLinks: [
      {
        name: "Memory Optimized Analysis",
        url: "https://www.kaggle.com/code/mariamfathiamin/87-4-memory-opt-real-estate-suspicious-patterns",
      },
      {
        name: "Data Quality Audit",
        url: "https://www.kaggle.com/code/mariamfathiamin/38-19-suspicious-records",
      },
      {
        name: "Data Discovery Analysis",
        url: "https://www.kaggle.com/code/mariamfathiamin/real-estate-data-discovery-analysis",
      },
    ],
    deployment: "Kaggle Notebooks",
    image: "/images/kaggle.png",
    deliverables: ["Pattern Detection", "Research Reports"],
  },
  {
    id: "personality-ai",
    category: "AI Research & Computer Vision",
    title: "Multimodal Personality Analysis System",
    role: "AI Research Lead",
    duration: "2022 - 2023",
    summary:
      "We engineered an end-to-end automated system for predicting job candidates' Big Five personality traits through multimodal video analysis. It utilizes the First Impressions V2 dataset, comprising 10,000 short, diverse video clips with annotated personality scores and text transcripts. The system processes visual cues by analyzing facial emotions and action units using models like LSTNet. Audio features, including MFCCs, are extracted via PyAudioAnalysis. Transcripts are encoded with BERT and analyzed for linguistic patterns. Predictions from all three modalities—video, audio, and text—are combined using a late fusion strategy with XGBoost.",
    githubUrl:
      "https://github.com/Mariam-Fathi/multimodal-personality-analysis",
    demoUrl: null,
    researchLinks: [
      {
        name: "Graduation Project Book",
        url: "https://drive.google.com/file/d/1YwWHlXiXh3pCK1MlZxDT9HE5RtQQfu_C/view?usp=drive_link",
      },
    ],
    deployment: "Academic Book & Web Demo",
    image: "/images/graduation.png",
    deliverables: ["Multimodal AI Models", "Graduation Book"],
  },
  {
    id: "sales-ai",
    category: "AI Prototype & Automation",
    title: "Sales Estimation Automation Tool",
    role: "Full-Stack Developer",
    duration: "2025",
    summary:
      "Recently, while working at Dracode, I noticed our sales team struggling to provide quick cost estimates due to their non-technical background. I designed and developed an internal tool leveraging a pre-trained model from Hugging Face to analyze project descriptions and generate instant cost estimations. This enabled our sales team to provide immediate, data-backed figures during client meetings. I achieved 85% confidence in estimates and integrated the tool with our existing CRM system. The solution reduced estimation time from days to minutes. I also proposed a roadmap to continuously improve the tool using actual deal data.",
    githubUrl: null,
    deployment: "Internal Tool + CRM Integration",
    image: "/images/ai.png",
    deliverables: ["CRM-Integrated Web Tool", "Feedback Roadmap"],
  },
  {
    id: "homi-app",
    category: "PropTech",
    title: "Homi Real Estate App",
    role: "Full-Stack Developer",
    duration: "2025",
    summary:
      "Developed Homi, a production-ready real estate application by transforming a basic tutorial into a full-stack solution. Implemented secure user authentication via Google OAuth using Appwrite for robust backend services. Designed a comprehensive property management system with advanced search, filtering, and detailed property listings. Created personalized user experiences with favorite property tracking and intelligent preference analysis. Built real-time notification systems to alert users about new properties matching their interests. Integrated payment processing with Stripe. Established user activity monitoring to gather valuable behavioral insights.",
    githubUrl: "https://github.com/Mariam-Fathi/homi-app",
    deployment: "Live Preview",
    image: "/images/homi.png",
    deliverables: ["Mobile App", "Backend API"],
    playStoreUrls: [
      {
        name: "Homi App",
        url: "https://expo.dev/accounts/mariamfathi/projects/homi/builds/4c066908-834c-46f5-a581-bb60afcf80f2",
      },
    ],
  },
  {
    id: "homi-dashboard",
    category: "PropTech Analytics",
    title: "Homi Real Estate Dashboard",
    role: "Full-Stack Developer",
    duration: "2025",
    summary:
      "Built a comprehensive analytics dashboard for Homi real estate App. Tracks revenue metrics, payment status, and growth patterns. Monitors user engagement, retention rates, and active user trends. Analyzes property performance through views, favorites, and category rankings. Measures platform health with conversion rates and engagement scores. Identifies peak activity hours and seasonal trends. Implements smart caching for optimal performance. Provides occupancy rates and property category comparisons. Transforms raw data into actionable business intelligence. Supports data-driven decision making across the organization. Delivers clear insights through structured visualizations.",
    githubUrl: "https://github.com/Mariam-Fathi/homi-analytics",
    deployment: "Live Preview",
    webDemo: [
      {
        name: "Honmi Dashboard",
        url: "https://homi-analytics.vercel.app/",
      },
    ],
    image: "/images/homi-dashboard.png",
    deliverables: ["Admin Dashboard", "Backend API"],
  },
];

const ProjectCard = ({
  project,
  isActive,
  sectionInView,
}: {
  project: any;
  isActive: boolean;
  sectionInView: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !sectionInView || !isActive) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    gsap.set([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 60,
      filter: "blur(15px)",
    });

    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 2.5,
      ease: "power3.out",
    })
    .to(
      imageRef.current,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 2.5,
        ease: "power3.out",
      },
      "-=0.8"
    )

    .to(cardRef.current, {
      y: -12,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    }, "-=1");

  }, [isActive, sectionInView]);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-black-900/90 backdrop-blur-md rounded-3xl border-2 border-gray-600/40 transition-all duration-1000 grid md:grid-cols-5 mx-0 shadow-2xl hover:shadow-3xl hover:border-gray-500/60 ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-20 blur-sm"
      }`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
        <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gray-500/30 to-transparent" />
        <div className="absolute left-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-gray-500/30 to-transparent" />
        <div className="absolute right-0 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-gray-500/30 to-transparent" />
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/15 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${6 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div
        ref={contentRef}
        className="md:col-span-3 p-6 lg:p-8 flex flex-col opacity-0 relative z-10"
      >
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center gap-3 text-sm mb-3">
              <span className={`text-blue-400 font-semibold tracking-wider`}>
                {project.category}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400 font-light">
                {project.duration}
              </span>
            </div>

            <h3 className="text-2xl lg:text-4xl font-light text-white mb-4 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text tracking-tight">
              {project.title}
            </h3>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light tracking-wide border-l-2 border-gray-600/30 pl-4">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <h4 className="text-white text-base font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                Role
              </h4>
              <div className="text-base font-light text-blue-400 bg-blue-500/10 px-3 py-2 rounded-lg border border-blue-500/20">
                {project.role}
              </div>
            </div>
            <div className="lg:col-span-2 max-sm:hidden">
              <h4 className="text-white font-semibold flex items-center gap-2 mb-3 uppercase tracking-wider text-base">
                Deliverables
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.deliverables.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-xl text-sm border border-gray-600/40 hover:border-gray-400/60 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-light hover:bg-gray-700/50"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 text-gray-400 rounded-xl border border-gray-600/40 hover:bg-gray-700/60 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                title="View Code"
              >
                <IconBrandGithub className="w-5 h-5" />
              </a>
            )}
            {project.playStoreUrls?.map((store: any, index: number) => (
              <a
                key={index}
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-green-600/20 text-green-400 rounded-xl border border-green-600/30 hover:bg-green-600/30 hover:text-green-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Play Store"
              >
                <IconDeviceMobile className="w-5 h-5" />
              </a>
            ))}
            {project.kaggleLinks?.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-cyan-600/20 text-cyan-400 rounded-xl border border-cyan-600/30 hover:bg-cyan-600/30 hover:text-cyan-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Kaggle"
              >
                <FontAwesomeIcon icon={faKaggle} className="w-5 h-5" />
              </a>
            ))}
            {project.researchLinks?.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-600/30 hover:bg-purple-600/30 hover:text-purple-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Research"
              >
                <IconBook className="w-5 h-5" />
              </a>
            ))}
            {project.webDemo?.map((link: any, index: number) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-purple-600/20 text-purple-400 rounded-xl border border-purple-600/30 hover:bg-purple-600/30 hover:text-purple-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Web Demo"
              >
                <IconDeviceLaptop className="w-5 h-5" />
              </a>
            ))}
          </div>
          {project.deployment && (
            <div className="">
              <span className="hidden md:inline-flex items-center px-3 py-1.5 bg-black/60 text-gray-300 rounded-lg text-xs border border-gray-600/40 backdrop-blur-sm font-light">
                {project.deployment}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col relative">
        <div className="relative flex-1 min-h-[400px] border-l border-gray-600/40 bg-gradient-to-br from-gray-800/40 to-black/40 hover:scale-105 transition-all duration-500 hover:border-transparent hover:bg-transparent hover:from-transparent hover:to-transparent">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain opacity-0 p-4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent hover:to-transparent hover:from-transparent" />
          <div className="absolute top-2 left-2 right-2 bottom-2 border hover:border-transparent border-gray-600/30 rounded-xl pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
  sectionInView,
}: {
  tabs: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  sectionInView: boolean;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !sectionInView) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [sectionInView] }
  );

  useEffect(() => {
    if (!sectionInView) return;
    
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (tabRefs.current[activeIndex]) {
      gsap.to(tabRefs.current[activeIndex], {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [activeTab, tabs, sectionInView]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentProject = projectsData.find(
    (project) => project.id === activeTab
  );

  return (
    <div className="relative z-50">
      <div ref={containerRef} className="my-8 lg:my-12 relative opacity-0">
        <div className="hidden lg:flex flex-wrap gap-3 justify-center">
          {tabs.map((tab, index) => (
            <button
              key={tab.value}
              ref={(el) => (tabRefs.current[index] = el)}
              onClick={() => onTabChange(tab.value)}
              className={`px-6 py-4 rounded-2xl border border-gray-600/30 transition-all duration-500 text-base font-light backdrop-blur-sm ${
                activeTab === tab.value
                  ? "bg-gray-800/40 border-blue-600/30 text-white shadow-sm shadow-blue-500/25"
                  : "bg-gray-900/30 text-gray-300 border-gray-600/20 hover:border-blue-500/50 hover:text-white hover:bg-gray-800/40 hover:shadow-lg"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="lg:hidden" ref={dropdownRef}>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-4 bg-gray-800/30 border border-gray-600/30 rounded-2xl text-white backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="font-light">{currentProject?.title}</span>
            </div>
            {isMobileMenuOpen ? (
              <IconX className="w-5 h-5" />
            ) : (
              <IconMenu2 className="w-5 h-5" />
            )}
          </button>

          {isMobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-800/95 border border-gray-600/30 rounded-2xl backdrop-blur-sm z-[999] shadow-2xl overflow-hidden">
              <div className="py-2 max-h-80 overflow-y-auto">
                {tabs.map((tab, index) => {
                  const project = projectsData.find((p) => p.id === tab.value);
                  return (
                    <button
                      key={tab.value}
                      onClick={() => {
                        onTabChange(tab.value);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-4 py-3 text-left transition-all duration-300 ${
                        activeTab === tab.value
                          ? "bg-blue-500/20 text-white border-r-4 border-blue-500"
                          : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="font-light text-sm truncate">
                          {tab.title}
                        </div>
                        <div className="text-xs text-gray-400 truncate">
                          {project?.category}
                        </div>
                      </div>
                      {activeTab === tab.value && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectIndicators = ({
  tabs,
  activeTab,
  onTabChange,
  sectionInView,
}: {
  tabs: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  sectionInView: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !sectionInView) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 2.2,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [sectionInView] }
  );

  return (
    <div
      ref={containerRef}
      className="hidden sm:flex justify-center gap-3 mt-8 pb-1 opacity-0"
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`w-3 h-3 rounded-full transition-all duration-500 backdrop-blur-sm ${
            activeTab === tab.value
              ? "bg-white scale-125 shadow-lg shadow-blue-500/50"
              : "bg-gray-600 hover:bg-gray-400 hover:scale-110"
          }`}
        />
      ))}
    </div>
  );
};

export function Projects() {
  const [activeTab, setActiveTab] = useState("smart-key");
  const [autoRotate, setAutoRotate] = useState(false);
  const [sectionInView, setSectionInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { title: "Smart Key", value: "smart-key" },
    { title: "Real Estate Data", value: "real-estate" },
    { title: "Personality AI", value: "personality-ai" },
    { title: "Sales AI", value: "sales-ai" },
    { title: "Homi App", value: "homi-app" },
    { title: "Homi Dashboard", value: "homi-dashboard" },
  ];

  const currentIndex = tabs.findIndex((tab) => tab.value === activeTab);
  const currentProject = projectsData.find(
    (project) => project.id === activeTab
  );

  const nextProject = () => {
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTab(tabs[nextIndex].value);
  };

  const prevProject = () => {
    const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    setActiveTab(tabs[prevIndex].value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !sectionInView) {
          setSectionInView(true);
        }
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [sectionInView]);

  useGSAP(() => {
    if (!sectionInView || !containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" }
    });

    gsap.set([titleRef.current, subtitleRef.current], {
      opacity: 0,
      y: 80,
      filter: "blur(15px)"
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

    gsap.to(".floating-particle", {
      y: -20,
      x: 10,
      rotation: 360,
      duration: 8,
      repeat: -1,
      yoyo: true,
      stagger: {
        amount: 2,
        from: "random"
      },
      ease: "sine.inOut"
    });

  }, { scope: containerRef, dependencies: [sectionInView] });

  useEffect(() => {
    if (autoRotate && sectionInView) {
      const interval = setInterval(nextProject, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRotate, activeTab, sectionInView]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!sectionInView) return;
      
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === " ") {
        e.preventDefault();
        setAutoRotate((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, sectionInView]);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!sectionInView) return;
      
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextProject();
        } else {
          prevProject();
        }
      }
    };

    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [activeTab, sectionInView]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-black min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-black" />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div ref={containerRef} className="max-w-7xl px-4 py-20 max-sm:py-0">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-6 lg:mb-8  tracking-tight opacity-0"
          >
            SELECTED WORK
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide opacity-0"
          >
            Exploring the connections between IoT, data engineering, and AI through practical applications and research. Each project represents a unique intersection of technology and real-world problem solving.
          </p>
        </div>

        <Tabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab}
          sectionInView={sectionInView}
        />

        {currentProject && (
          <ProjectCard 
            project={currentProject} 
            isActive={true}
            sectionInView={sectionInView}
          />
        )}

        <ProjectIndicators
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          sectionInView={sectionInView}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          50% { 
            transform: translateY(-20px) translateX(10px);
            opacity: 0.3;
          }
        }
      `}</style>
    </section>
  );
}

export default Projects;