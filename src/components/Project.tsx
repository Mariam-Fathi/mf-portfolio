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
      "Engineered a digital hospitality platform that transforms the complete guest journey from reservation to checkout. The solution features dedicated mobile applications for guests and staff, complemented by an admin web portal, fully replacing traditional key card systems with secure smartphone-based access control.",
    achievements: [
      "Scaled to 3 hotel chains including 960-room resort",
      "Enterprise contracts secured",
      "Hardware & IoT integration",
      "Live production with 100% keyless access",
    ],
    technologies: [
      "React Native",
      "TypeScript",
      "Bluetooth",
      "NFC",
      "Firebase",
      "Appwrite",
    ],
    githubUrl: null,
    demoUrl: null,
        deployment: "Apps on Google Play",
    playStoreUrls: [
      {
        name: "Long Beach Hotel",
        url: "https://play.google.com/store/apps/details?id=com.smartkeylb",
      },
      {
        name: "Sapphire Hotel",
        url: "https://play.google.com/store/apps/details?id=com.sapphiresk",
      },
      {
        name: "Almadiafa Hotel",
        url: "https://play.google.com/store/apps/details?id=com.madiafaaa",
      },
    ],
    status: "Live",
    image: "/images/sk.png",
    deliverables: ["Guest Mobile App", "Staff Mobile App"],
    accentColor: "from-blue-500 to-cyan-500",
  },
  {
    id: "real-estate",
    category: "Data Engineering",
    title: "Real Estate Data Quality & Analytics",
    role: "Data Engineer & Analyst",
    duration: "2025",
    summary:
      "Conducted comprehensive analysis of 2.2M+ property records, uncovering 38.19% data quality issues while building optimized data pipelines with 87.4% memory reduction. Transformed raw real estate data into actionable insights through rigorous exploratory analysis.",
    achievements: [
      "87.4% memory optimization (667MB → 83MB)",
      "38.19% data quality issues identified",
      "57,592 suspicious patterns detected",
      "2.2M+ records processed",
    ],
    technologies: [
      "Python",
      "Pandas",
      "Data Analysis",
      "Jupyter",
      "Scikit-learn",
      "Data Pipelines",
      "Memory Optimization",
    ],
    githubUrl: null,
    demoUrl: null,
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
    status: "Research Completed",
    deployment: "Kaggle Notebooks",
    featured: true,
    image: "/images/kaggle.png",
    deliverables: [
      "Data Quality Audit",
      "Optimized Pipelines",
      "Pattern Detection",
      "Research Reports",
    ],
    accentColor: "from-green-500 to-emerald-500",
  },
  {
    id: "personality-ai",
    category: "AI Research & Computer Vision",
    title: "Multimodal Personality Analysis System",
    role: "AI Research Lead",
    duration: "2022 - 2023",
    summary:
      "Engineered an end-to-end AI system that automates personality screening by analyzing visual, auditory, and textual cues from video interviews. The system predicts Big Five personality traits using multimodal deep learning.",
    achievements: [
      "Multimodal AI fusion (video, audio, text)",
      "Advanced feature extraction pipelines",
      "Data imbalance solutions with oversampling",
      "Real-time personality prediction",
    ],
    technologies: [
      "Python",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "OpenFace",
      "BERT",
      "LSTNet",
      "Node.js",
      "MongoDB",
    ],
    githubUrl:
      "https://github.com/Mariam-Fathi/multimodal-personality-analysis",
    demoUrl: null,
    researchLinks: [
      {
        name: "Graduation Project Book",
        url: "https://drive.google.com/file/d/1YwWHlXiXh3pCK1MlZxDT9HE5RtQQfu_C/view?usp=drive_link",
      },
    ],
    status: "Research Completed",
    deployment: "Academic Book & Web Demo",
    featured: true,
    image: "/images/graduation.png",
    deliverables: ["Multimodal AI Models", "Graduation Book"],
    accentColor: "from-purple-500 to-pink-500",
  },
  {
    id: "sales-ai",
    category: "AI Prototype & Automation",
    title: "Sales Estimation Automation Tool",
    role: "Full-Stack Developer + AI Initiative",
    duration: "2025",
    summary:
      "Built an internal tool using pre-trained models (85% confidence) integrated with their CRM to automate preliminary project estimations, reducing sales team dependency on technical staff.",
    achievements: [
      "Cut estimation time from days to minutes",
      "Enabled sales team to provide technical estimates",
      "Integrated tool with existing CRM system",
      "Achieved 85% confidence with pre-trained model",
    ],
    technologies: [
      "Python",
      "Hugging Face",
      "FastAPI",
      "React",
      "NLP",
      "CRM Integration",
    ],
    githubUrl: null,
    demoUrl: null,
    status: "Working Prototype",
    deployment: "Internal Tool + CRM Integration",
    featured: false,
    image: "/images/ai.png",
    deliverables: ["CRM-Integrated Web Tool", "Continuous Improvement Roadmap"],
    accentColor: "from-orange-500 to-red-500",
  },
  {
    id: "homi-app",
    category: "PropTech",
    title: "Homi Real Estate App",
    role: "Full-Stack Developer",
    duration: "2025",
    summary:
      "Transformed tutorial into full-stack production-ready app with authentication, payments, and real-time features for modern real estate management.",
    achievements: [
      "Full-stack development",
      "Production features integration",
      "Third-party payment systems",
      "Real-time notifications",
    ],
    technologies: ["React Native", "Firebase", "Stripe", "Appwrite", "OAuth"],
    githubUrl: "https://github.com/Mariam-Fathi/homi-app",
    demoUrl: null,
    status: "Learning Project",
    deployment: "App Demo Live Preview",
    featured: false,
    image: "/images/homi.png",
    deliverables: ["Mobile App", "Backend API"],
    accentColor: "from-indigo-500 to-blue-500",
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
      "Built comprehensive admin dashboard for real estate management with advanced analytics, user management, and property performance tracking.",
    achievements: [
      "Real-time analytics dashboard",
      "Interactive data visualizations",
      "User management system",
      "Property performance tracking",
    ],
    technologies: ["React", "Firebase", "Chart.js", "Tailwind CSS", "REST API"],
    githubUrl: "https://github.com/Mariam-Fathi/homi-analytics",
    demoUrl: null,
    status: "Learning Project",
    deployment: "Live Web Demo",
    webDemo: [
      {
        name: "Honmi Dashboard ",
        url: "https://homi-analytics.vercel.app/",
      },
    ],
    featured: false,
    image: "/images/homi-dashboard.png",
    deliverables: ["Admin Dashboard", "Analytics System"],
    accentColor: "from-teal-500 to-cyan-500",
  },
];

const ProjectCard = ({
  project,
  isActive,
}: {
  project: any;
  isActive: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!cardRef.current || !isActive) return;

    const tl = gsap.timeline();

    // Reset positions with cinematic blur
    gsap.set([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 50,
      filter: "blur(10px)",
    });

    // Cinematic reveal animation
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
    }).to(
      imageRef.current,
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Subtle floating animation
    gsap.to(cardRef.current, {
      y: -8,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Background gradient pulse
    gsap.to(cardRef.current, {
      backgroundPosition: "200% 200%",
      duration: 20,
      repeat: -1,
      ease: "none",
    });
  }, [isActive]);

  const getStatusConfig = (status: string) => {
    const config: any = {
      live: {
        color: "bg-green-500",
        text: "text-green-300",
        border: "border-green-500/30",
        label: "Live",
      },
      "research completed": {
        color: "bg-purple-500",
        text: "text-purple-300",
        border: "border-purple-500/30",
        label: "Research",
      },
      "working prototype": {
        color: "bg-yellow-500",
        text: "text-yellow-300",
        border: "border-yellow-500/30",
        label: "Prototype",
      },
      "learning project": {
        color: "bg-blue-500",
        text: "text-blue-300",
        border: "border-blue-500/30",
        label: "Learning",
      },
    };
    return config[status.toLowerCase()] || config["learning project"];
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-gray-900/80 via-black to-gray-900/80 bg-[size:200%_200%] rounded-3xl border border-gray-700/30  transition-all duration-1000 grid md:grid-cols-5 mx-0 shadow-2xl backdrop-blur-sm ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-20 blur-sm"
      }`}
      style={{
        background: `linear-gradient(45deg, rgba(17, 24, 39, 0.8), rgba(0, 0, 0, 1), rgba(17, 24, 39, 0.8))`,
      }}
    >
      <div
        className={`absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-1000`}
      />

      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
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
        className="md:col-span-3 p-6 lg:p-8 flex flex-col opacity-0"
      >
        <div className="flex-1">
          <div className="mb-6">
            <div className="flex items-center gap-3 text-sm mb-3">
              <span className={` text-blue-400 font-semibold tracking-wider`}>
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

          <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light tracking-wide">
            {project.summary}
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-3 ">
                Role
              </h4>
              <div className="text-base font-light  text-blue-400">
                {project.role}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold flex items-center gap-2 mb-3  uppercase tracking-wider text-sm">
                Deliverables
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.deliverables.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800/30 text-gray-300 rounded-xl text-sm border border-gray-600/30 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-light"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-xl text-sm border border-gray-600/30 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm font-light"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider">
              Key Achievements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.achievements.map((achievement: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gradient-to-r from-gray-800/30 to-gray-800/10 px-4 py-3 rounded-xl border border-gray-600/20 hover:border-gray-500/30 transition-all duration-300 group/achievement backdrop-blur-sm"
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-green-400 animate-pulse`}
                  />
                  <span className="text-gray-300 text-sm font-light group-hover/achievement:text-white transition-colors">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-700/30">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/30 text-gray-400 rounded-xl border border-gray-600/30 hover:bg-gray-700/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
                title="View Code"
              >
                <IconBrandGithub className="w-5 h-5" />
              </a>
            )}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30 hover:bg-blue-500/30 hover:text-blue-300 transition-all duration-300 hover:scale-110 hover:shadow-lg"
                title="Live Demo"
              >
                <IconExternalLink className="w-5 h-5" />
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
                title="Research"
              >
                <IconDeviceLaptop className="w-5 h-5" />
              </a>
            ))}
          </div>
            {project.deployment && (
            <div className="">
              <span className="hidden md:inline-flex items-center px-3 py-1.5 bg-black/40 text-gray-300 rounded-lg text-xs border border-gray-600/30 backdrop-blur-sm font-light">
                {project.deployment}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="md:col-span-2 flex flex-col relative">
        <div className="relative flex-1 min-h-[400px] border-l hover:scale-110 transition-all duration-500 border-gray-700/30 bg-gradient-to-br from-gray-900/30 to-black/30 hover:border-transparent">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain opacity-0"
          />
          <div className="absolute inset-0 bg-gradient-to-t  from-black/70 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};

const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

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
          delay: 0.5,
        }
      );
    },
    { scope: containerRef }
  );

  useEffect(() => {
    const activeIndex = tabs.findIndex((tab) => tab.value === activeTab);
    if (tabRefs.current[activeIndex]) {
      gsap.to(tabRefs.current[activeIndex], {
        scale: 1.05,
        duration: 0.3,
        ease: "back.out(1.7)",
      });
    }
  }, [activeTab, tabs]);

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
}: {
  tabs: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.8,
        }
      );
    },
    { scope: containerRef }
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
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

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

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
        }
      ).fromTo(
        subtitleRef.current,
        {
          opacity: 0,
          y: 30,
          filter: "blur(8px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
        "-=0.5"
      );
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    if (autoRotate) {
      const interval = setInterval(nextProject, 5000);
      return () => clearInterval(interval);
    }
  }, [autoRotate, activeTab]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextProject();
      if (e.key === "ArrowLeft") prevProject();
      if (e.key === " ") {
        e.preventDefault();
        setAutoRotate((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab]);

  useEffect(() => {
    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
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
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="bg-black min-h-screen relative overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl px-4">
        <div className="text-center">
          <h2
            ref={titleRef}
            className="text-3xl lg:text-7xl font-light text-white mb-4 lg:mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text tracking-tight opacity-0"
          >
            Selected Work
          </h2>
          <p
            ref={subtitleRef}
            className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide opacity-0"
          >
            Exploring the connections between IoT, data engineering, and AI
            through practical applications and research
          </p>
        </div>

        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {currentProject && (
          <ProjectCard project={currentProject} isActive={true} />
        )}

        <ProjectIndicators
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
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
