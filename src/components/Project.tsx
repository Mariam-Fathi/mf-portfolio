"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  IconBrandGithub,
  IconExternalLink,
  IconDeviceMobile,
  IconCode,
  IconArrowLeft,
  IconArrowRight,
  IconPlayerPlay,
  IconPlayerPause,
} from "@tabler/icons-react";
import { Play } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaggle } from "@fortawesome/free-brands-svg-icons";
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
    githubUrl: "https://github.com/Mariam-Fathi/multimodal-personality",
    demoUrl: null,
    researchLinks: [
      {
        name: "Graduation Project Book",
        url: "#",
      },
    ],
    status: "Research Completed",
    deployment: "Academic Research & Web Application",
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
    deployment: "Personal Development",
    featured: false,
    image: "/images/homi.png",
    deliverables: ["Mobile App", "Backend API"],
    accentColor: "from-indigo-500 to-blue-500",
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
    githubUrl: "https://github.com/Mariam-Fathi/homi-app",
    demoUrl: null,
    status: "Learning Project",
    deployment: "Personal Development",
    featured: false,
    image: "/images/homi-dashboard.png",
    deliverables: ["Admin Dashboard", "Analytics System"],
    accentColor: "from-teal-500 to-cyan-500",
  },
];

// Project Card Component with GSAP Animations
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

  useEffect(() => {
    if (!cardRef.current || !isActive) return;

    const tl = gsap.timeline();

    // Reset positions
    gsap.set([contentRef.current, imageRef.current], {
      opacity: 0,
      y: 50,
    });

    // Animate content
    tl.to(contentRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
    }).to(
      imageRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.4"
    );

    // Floating animation for the card
    gsap.to(cardRef.current, {
      y: -10,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
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
        label: " Prototype",
      },
      "learning project": {
        color: "bg-blue-500",
        text: "text-blue-300",
        border: "border-blue-500/30",
        label: " Learning",
      },
    };
    return config[status.toLowerCase()] || config["learning project"];
  };

  const statusConfig = getStatusConfig(project.status);

  return (
    <div
      ref={cardRef}
      className={`group relative bg-gradient-to-br from-gray-900/80 to-black rounded-3xl border-2 border-gray-700/30 overflow-hidden transition-all duration-700 grid md:grid-cols-5 mx-0 shadow-2xl backdrop-blur-sm ${
        isActive ? "scale-100 opacity-100" : "scale-95 opacity-40"
      }`}
    >
      {/* Animated Gradient Border */}
      <div
        className={`absolute inset-0 bg-gradient-to-r ${project.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-1000`}
      />

      <div ref={contentRef} className="md:col-span-3 p-6 lg:p-8 flex flex-col">
        <div className="flex-1">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 text-sm mb-3">
              <span
                className={`bg-gradient-to-r ${project.accentColor} bg-clip-text text-transparent font-semibold`}
              >
                {project.category}
              </span>
              <span className="text-gray-500">•</span>
              <span className="text-gray-400">{project.duration}</span>
            </div>

            <h3 className="text-2xl lg:text-4xl font-bold text-white mb-4 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              {project.title}
            </h3>
          </div>

          {/* Summary */}
          <p className="text-gray-300 text-lg leading-relaxed mb-8 font-light">
            {project.summary}
          </p>

          {/* Role & Deliverables Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <h4 className="text-white text-sm font-semibold uppercase tracking-wider mb-3 text-gray-400">
                Role
              </h4>
              <div className="text-xl font-semibold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                {project.role}
              </div>
            </div>
            <div className="lg:col-span-2">
              <h4 className="text-white font-semibold flex items-center gap-2 mb-3 text-gray-400 uppercase tracking-wider text-sm">
                Deliverables
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.deliverables.map((item: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gray-800/50 text-gray-300 rounded-xl text-sm border border-gray-600/50 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-8">
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider text-gray-400">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech: string, idx: number) => (
                <span
                  key={idx}
                  className="px-4 py-2 bg-gray-800/80 text-gray-300 rounded-xl text-sm border border-gray-600/50 hover:border-gray-400/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mb-8">
            <h4 className="text-white text-sm font-semibold mb-4 uppercase tracking-wider text-gray-400">
              Key Achievements
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.achievements.map((achievement: string, idx: number) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gradient-to-r from-gray-800/50 to-gray-800/30 px-4 py-3 rounded-xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300 group/achievement"
                >
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${project.accentColor}`}
                  />
                  <span className="text-gray-300 text-sm group-hover/achievement:text-white transition-colors">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-6 border-t border-gray-700/30">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-800/50 text-gray-400 rounded-xl border border-gray-600/50 hover:bg-gray-700/50 hover:text-white transition-all duration-300 hover:scale-110 hover:shadow-lg backdrop-blur-sm"
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
                <Play className="w-5 h-5" />
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
                <IconCode className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="md:col-span-2 flex flex-col relative">
        <div className="relative flex-1 min-h-[400px] border-l border-gray-700/30 bg-gradient-to-br from-gray-900/50 to-black/50">
          <img
            ref={imageRef}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Status Badge */}
          <div className="absolute top-6 right-6">
            <span
              className={`inline-flex items-center px-4 py-2 bg-black/80 ${statusConfig.text} rounded-full text-sm font-medium border ${statusConfig.border} backdrop-blur-sm shadow-lg`}
            >
              <div
                className={`w-2 h-2 rounded-full mr-2 animate-pulse ${statusConfig.color}`}
              />
              {statusConfig.label}
            </span>
          </div>

          {/* Deployment Info */}
          {project.deployment && (
            <div className="absolute bottom-6 left-6">
              <span className="inline-flex items-center px-3 py-1.5 bg-black/60 text-gray-300 rounded-lg text-xs border border-gray-600/50 backdrop-blur-sm">
                {project.deployment}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Interactive Hover Effect */}
      {/* <div
        className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-1000 pointer-events-none`}
      /> */}
    </div>
  );
};

// Enhanced Tabs Component
const Tabs = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

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

  return (
    <div className="mb-12">
      <div className="flex flex-wrap gap-3 justify-center">
        {tabs.map((tab, index) => (
          <button
            key={tab.value}
            ref={(el) => (tabRefs.current[index] = el)}
            onClick={() => onTabChange(tab.value)}
            className={`px-6 py-4 rounded-2xl border-2 transition-all duration-500 text-base font-semibold backdrop-blur-sm ${
              activeTab === tab.value
                ? "bg-gray-800/60 border-blue-600/30 text-white shadow-sm shadow-blue-500/25"
                : "bg-gray-900/50 text-gray-300 border-gray-600/30 hover:border-blue-500/50 hover:text-white hover:bg-gray-800/50 hover:shadow-lg"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
    </div>
  );
};

// Project Indicators
const ProjectIndicators = ({
  tabs,
  activeTab,
  onTabChange,
}: {
  tabs: any[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}) => {
  return (
    <div className="flex justify-center gap-3 mt-8">
      {tabs.map((tab, index) => (
        <button
          key={tab.value}
          onClick={() => onTabChange(tab.value)}
          className={`w-4 h-4 rounded-full transition-all duration-500 backdrop-blur-sm ${
            activeTab === tab.value
              ? "bg-white-50 scale-125 shadow-lg shadow-blue-500/50"
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

  // GSAP Section Animation
  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();
    tl.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
  }, []);

  // Auto-rotate and Keyboard Navigation
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

  return (
    <section ref={sectionRef} id="work" className="py-20 bg-black min-h-screen">
      <div className="max-w-7xl">
        {/* Tabs */}
        <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Navigation Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <button
            onClick={prevProject}
            className="flex items-center gap-3 px-6 py-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            <IconArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-semibold">Previous</span>
          </button>

          <div className="text-sm text-gray-500 font-mono bg-gray-800/50 px-4 py-2 rounded-lg border border-gray-700/50">
            {currentIndex + 1} / {tabs.length}
          </div>

          <button
            onClick={nextProject}
            className="flex items-center gap-3 px-6 py-3 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105 group"
          >
            <span className="text-sm font-semibold">Next</span>
            <IconArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Project Card */}
        {currentProject && (
          <ProjectCard project={currentProject} isActive={true} />
        )}

        {/* Indicators */}
        <ProjectIndicators
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </section>
  );
}

export default Projects;
