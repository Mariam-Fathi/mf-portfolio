"use client";

import React, { useState } from "react";
import { IconBrandGithub, IconExternalLink, IconDeviceMobile, IconCode, IconStar } from "@tabler/icons-react";

// Data for all projects
const projectsData = [
    {
        id: "smart-key",
        category: "Production",
        title: "Smart Key Hotel Platform",
        role: "Lead Mobile Engineer",
        duration: "2024 - Present",
        summary: "Led development of React Native mobile apps for hotel access control. Integrated Bluetooth/NFC hardware and deployed to major hotel chains with live production usage.",
        achievements: [
            "Deployed to 2 hotel chains",
            "Enterprise contracts secured", 
            "Hardware integration",
            "Live production usage"
        ],
        technologies: ["React Native", "TypeScript", "Bluetooth", "NFC", "Firebase", "Appwrite"],
        githubUrl: null,
        demoUrl: null,
        playStoreUrls: [
            {
                name: "Long Beach Hotel",
                url: "https://play.google.com/store/apps/details?id=com.smartkeylb"
            }
        ],
        status: "Live",
        deployment: "Hotels in Hurghada",
        featured: true,
        image: "/images/sk.png",
        deliverables: [
            { name: "Mobile App", icon: "📱" },
            { name: "Bluetooth SDK", icon: "🔗" },
            { name: "Admin Panel", icon: "⚙️" },
            { name: "Hotel Dashboard", icon: "🏨" }
        ]
    },
    {
        id: "real-estate",
        category: "Research", 
        title: "Real Estate Data Analysis",
        role: "Data Engineer",
        duration: "2024",
        summary: "Analyzed 2.2M property records, identified 38% data quality issues, and built optimized pipelines with 87% memory reduction.",
        achievements: [
            "2.2M records analyzed",
            "87% memory optimized",
            "Data quality insights", 
            "Production pipelines"
        ],
        technologies: ["Python", "Pandas", "Data Analysis", "Jupyter", "Scikit-learn"],
        githubUrl: "https://github.com/Mariam-Fathi/real-estate-analysis",
        demoUrl: null,
        status: "Completed",
        deployment: "Kaggle Notebooks",
        featured: true,
        image: "/images/kaggle.png",
        deliverables: [
            { name: "Data Analysis", icon: "📊" },
            { name: "Cleaning Pipeline", icon: "🧹" },
            { name: "Visualizations", icon: "📈" },
            { name: "Research Paper", icon: "📄" }
        ]
    },
    {
        id: "personality-ai", 
        category: "AI Research",
        title: "Multimodal Personality Analysis",
        role: "AI Research Lead", 
        duration: "2022 - 2023",
        summary: "Developed AI system predicting personality traits from videos using deep learning and multimodal data fusion techniques.",
        achievements: [
            "Multimodal AI integration",
            "Deep learning models",
            "Data imbalance solutions",
            "Research published"
        ],
        technologies: ["Python", "PyTorch", "OpenCV", "Transformers", "Deep Learning"],
        githubUrl: "https://github.com/Mariam-Fathi/multimodal-personality",
        demoUrl: null,
        researchLinks: [
            {
                name: "Research Paper",
                url: "/documents/Automated-Predictive-Analysis.pdf"
            }
        ],
        status: "Research Completed",
        deployment: "Academic Research", 
        featured: true,
        image: "/images/graduation.png",
        deliverables: [
            { name: "AI Models", icon: "🤖" },
            { name: "Research Paper", icon: "📚" },
            { name: "Dataset", icon: "💾" },
            { name: "Analysis Tools", icon: "🔧" }
        ]
    },
    {
        id: "sales-ai",
        category: "Prototype",
        title: "AI Sales Estimation Tool", 
        role: "AI Solution Architect",
        duration: "2025", 
        summary: "Built AI prototype for instant technical estimations using pre-trained models, reducing response time from days to minutes.",
        achievements: [
            "Rapid prototyping",
            "AI automation", 
            "Business solution",
            "Sales efficiency"
        ],
        technologies: ["Python", "Hugging Face", "FastAPI", "NLP", "MLOps"],
        githubUrl: null,
        demoUrl: null,
        status: "Prototype",
        deployment: "Internal Tool",
        featured: false,
        image: "/images/ai.png",
        deliverables: [
            { name: "AI Prototype", icon: "🚀" },
            { name: "API Service", icon: "🌐" },
            { name: "ML Pipeline", icon: "🔮" },
            { name: "Documentation", icon: "📋" }
        ]
    },
    {
        id: "homi-app",
        category: "Learning",
        title: "Homi Real Estate App",
        role: "Full-Stack Developer",
        duration: "2023", 
        summary: "Transformed tutorial into full-stack production-ready app with authentication, payments, and real-time features.",
        achievements: [
            "Full-stack development",
            "Production features",
            "Third-party integrations", 
            "Learning foundation"
        ],
        technologies: ["React Native", "Firebase", "Stripe", "Appwrite", "OAuth"],
        githubUrl: "https://github.com/Mariam-Fathi/homi-app", 
        demoUrl: null,
        status: "Learning Project",
        deployment: "Personal Development",
        featured: false,
        image: "/images/homi.png",
        deliverables: [
            { name: "Mobile App", icon: "📱" },
            { name: "Backend API", icon: "⚙️" },
            { name: "Admin Dashboard", icon: "📊" },
            { name: "Payment System", icon: "💳" }
        ]
    },
    {
        id: "homi-dashboard",
        category: "Learning",
        title: "Homi Real Estate Dashboard",
        role: "Full-Stack Developer",
        duration: "2023", 
        summary: "Built comprehensive admin dashboard for real estate management with analytics, user management, and property tracking.",
        achievements: [
            "Dashboard development",
            "Real-time analytics",
            "User management system", 
            "Property tracking"
        ],
        technologies: ["React", "Firebase", "Chart.js", "Tailwind CSS", "REST API"],
        githubUrl: "https://github.com/Mariam-Fathi/homi-app", 
        demoUrl: null,
        status: "Learning Project",
        deployment: "Personal Development",
        featured: false,
        image: "/images/homi-dashboard.png",
        deliverables: [
            { name: "Web Dashboard", icon: "💻" },
            { name: "Analytics", icon: "📈" },
            { name: "Admin Tools", icon: "🛠️" },
            { name: "Reports", icon: "📑" }
        ]
    }
];

// Project Card Component
const ProjectCard = ({ project }: { project: any }) => {
    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'live': return 'bg-green-400';
            case 'completed': return 'bg-blue-400';
            case 'research completed': return 'bg-purple-400';
            case 'prototype': return 'bg-yellow-400';
            default: return 'bg-gray-400';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category.toLowerCase()) {
            case 'production': return 'text-blue-400 border-blue-400/30 bg-blue-500/10';
            case 'research': return 'text-purple-400 border-purple-400/30 bg-purple-500/10';
            case 'ai research': return 'text-purple-400 border-purple-400/30 bg-purple-500/10';
            case 'prototype': return 'text-yellow-400 border-yellow-400/30 bg-yellow-500/10';
            case 'learning': return 'text-green-400 border-green-400/30 bg-green-500/10';
            default: return 'text-gray-400 border-gray-400/30 bg-gray-500/10';
        }
    };

    return (
        <div className="group relative bg-black rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-500 grid md:grid-cols-3 mx-0 shadow-2xl hover:scale-110">
            
            <div className="md:col-span-2 p-6 lg:p-8 flex flex-col">
                <div className="flex-1">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-3">
                            <span className={`text-sm font-semibold uppercase tracking-wide px-3 py-1 rounded-full border ${getCategoryColor(project.category)}`}>
                                {project.category}
                            </span>
                            <span className="text-gray-500 text-sm">
                                {project.duration}
                            </span>
                        </div>
                        
                        <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                            {project.title}
                            {project.featured && (
                                <IconStar className="inline-block w-5 h-5 text-yellow-400 ml-2" />
                            )}
                        </h3>
                        
                        <div className="flex items-center gap-2">
                            <span className="text-green-400 text-sm font-medium">
                                {project.role}
                            </span>
                            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                            <span className="text-gray-400 text-sm">
                                {project.deployment}
                            </span>
                        </div>
                    </div>

                    <p className="text-gray-300 text-base leading-relaxed mb-6">
                        {project.summary}
                    </p>

                    <div className="mb-6">
                        <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.slice(0, 6).map((tech: string, idx: number) => (
                                <span
                                    key={idx}
                                    className="px-3 py-1.5 bg-gray-800/80 text-gray-300 rounded-lg text-sm border border-gray-600/50 hover:border-gray-500/50 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                            {project.technologies.length > 6 && (
                                <span className="px-3 py-1.5 bg-gray-800/30 text-gray-500 rounded-lg text-sm border border-gray-600/30">
                                    +{project.technologies.length - 6}
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="mb-6">
                        <h4 className="text-white text-sm font-semibold mb-3 uppercase tracking-wide">Key Achievements</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {project.achievements.map((achievement: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-2 bg-green-500/10 px-3 py-2 rounded-lg border border-green-500/20">
                                    <span className="text-green-400 text-sm">✓</span>
                                    <span className="text-green-300 text-sm">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800/50 text-gray-400 rounded-lg border border-gray-600/50 hover:bg-gray-700/50 hover:text-white transition-all duration-200 hover:scale-105"
                                title="View Code"
                            >
                                <IconBrandGithub className="w-4 h-4" />
                            </a>
                        )}
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 hover:text-blue-300 transition-all duration-200 hover:scale-105"
                                title="Live Demo"
                            >
                                <IconExternalLink className="w-4 h-4" />
                            </a>
                        )}
                        {project.playStoreUrls && project.playStoreUrls.length > 0 && (
                            <a
                                href={project.playStoreUrls[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-green-600/20 text-green-400 rounded-lg border border-green-600/30 hover:bg-green-600/30 hover:text-green-300 transition-all duration-200 hover:scale-105"
                                title="Play Store"
                            >
                                <IconDeviceMobile className="w-4 h-4" />
                            </a>
                        )}
                        {project.researchLinks && project.researchLinks.length > 0 && (
                            <a
                                href={project.researchLinks[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30 hover:bg-purple-600/30 hover:text-purple-300 transition-all duration-200 hover:scale-105"
                                title="Research Paper"
                            >
                                <IconCode className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                    
                    <div className="text-right">
                        <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                            <span className="text-gray-400 text-sm font-medium">{project.status}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-1 flex flex-col">
                <div className="relative flex-1 min-h-[250px] border-gray-700/50 group-hover:border-blue-500/50 border-l-1 bg-gradient-to-br from-slate-900/20 to-slate-900/20">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-contain"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                    
                    <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-3 py-1 bg-black/70 text-white rounded-full text-xs font-medium border border-white/10 backdrop-blur-sm">
                            <div className={`w-2 h-2 rounded-full mr-2 ${getStatusColor(project.status)}`}></div>
                            {project.status}
                        </span>
                    </div>
                </div>

              
            </div>

            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>
    );
};

const Tabs = ({ tabs, activeTab, onTabChange }: { tabs: any[], activeTab: string, onTabChange: (tab: string) => void }) => {
    return (
        <div className="mb-8">
            <div className="flex flex-wrap gap-2 justify-start">
                {tabs.map((tab) => (
                    <button
                        key={tab.value}
                        onClick={() => onTabChange(tab.value)}
                        className={`px-4 py-2 rounded-full border transition-all duration-200 text-sm font-medium ${
                            activeTab === tab.value 
                                ? 'bg-blue-500/20 text-blue-400 border-blue-500/50 scale-105' 
                                : 'bg-gray-800/50 text-gray-300 border-gray-600/50 hover:border-blue-500/50 hover:text-white'
                        }`}
                    >
                        {tab.title}
                    </button>
                ))}
            </div>
        </div>
    );
};

export function Projects() {
    const [activeTab, setActiveTab] = useState("smart-key");

    const tabs = [
        { title: "Smart Key", value: "smart-key" },
        { title: "Real Estate", value: "real-estate" },
        { title: "Personality AI", value: "personality-ai" },
        { title: "Sales AI", value: "sales-ai" },
        { title: "Homi App", value: "homi-app" },
        { title: "Homi Dashboard", value: "homi-dashboard" },
    ];

    const currentProject = projectsData.find(project => project.id === activeTab);

    return (
        <section id="work" className="py-20 bg-black">
            <div className="max-w-7xl px-4 sm:px-6 lg:px-8">

                <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

                {currentProject && <ProjectCard project={currentProject} />}
            </div>
        </section>
    );
}

export default Projects;