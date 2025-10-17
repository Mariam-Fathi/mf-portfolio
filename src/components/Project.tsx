"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "./TitleHeader";
import { IconBrandGithub, IconExternalLink, IconCode, IconComponents, IconUser, IconDeviceMobile } from "@tabler/icons-react";
import { Tabs } from "./ui/tabs";
import FriendsCinematicSection from "./friends-cinematic";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
            { 
                opacity: 0, 
                y: 50,
            },
            { 
                opacity: 1, 
                y: 0,
                duration: 1.2,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    const tabs = [
        {
            title: "Smart Key",
            value: "smart-key",
            content: <ProjectTab project={projectsData.find(p => p.id === "smart-key-app")} />,
        },
        {
            title: "Real Estate",
            value: "real-estate", 
            content: <ProjectTab project={projectsData.find(p => p.id === "real-estate-analysis")} />,
        },
        {
            title: "Personality AI",
            value: "personality-ai",
            content: <ProjectTab project={projectsData.find(p => p.id === "multimodal-personality")} />,
        },
        {
            title: "Sales AI",
            value: "sales-ai",
            content: <ProjectTab project={projectsData.find(p => p.id === "sales-estimation-tool")} />,
        },
        {
            title: "Homi App", 
            value: "homi-app",
            content: <ProjectTab project={projectsData.find(p => p.id === "homi-learning-app")} />,
        },
            {
            title: "Homi Dashboard", 
            value: "homi-dashboard",
            content: <ProjectTab project={projectsData.find(p => p.id === "homi-learning-dashboard")} />,
        },
    ];

    return (
        <section id="projects" ref={sectionRef} className="pt-12 bg-black">
            <div className="h-[50rem] [perspective:1000px] relative w-full px-0">
                <Tabs tabs={tabs} />
            </div>
        </section>
    );
}

const ProjectTab = ({ project }: { project: any }) => {
    return (
        <div className="w-full max-w-7xl  px-0">
            <ProjectCard project={project} />
        </div>
    );
};

const ProjectCard = ({ project }: { project: any }) => {
    return (
        <div className="group relative bg-black rounded-2xl border border-gray-700/50 overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-[1.02] grid md:grid-cols-2 mx-0">
            <div className="p-6 col-span-1">
                <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {project.title}
                    </h3>
                    <div className="flex items-center justify-between">
                        <span className="text-blue-400 text-sm font-medium">
                            {project.role}
                        </span>
                        <span className="text-gray-500 text-xs">
                            {project.duration}
                        </span>
                    </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {project.summary}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech: string, idx: number) => (
                        <span
                            key={idx}
                            className="px-2 py-1 bg-gray-800/50 text-gray-300 rounded-lg text-xs border border-gray-700/50"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.technologies.length > 4 && (
                        <span className="px-2 py-1 bg-gray-800/30 text-gray-500 rounded-lg text-xs border border-gray-700/30">
                            +{project.technologies.length - 4}
                        </span>
                    )}
                </div>

                {project.achievements && (
                    <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                            {project.achievements.slice(0, 2).map((achievement: string, idx: number) => (
                                <div key={idx} className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-lg border border-green-500/20">
                                    <span className="text-green-400 text-xs">✓</span>
                                    <span className="text-green-300 text-xs">{achievement}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
                    <div className="flex items-center gap-2">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-gray-800/50 text-gray-400 rounded-lg border border-gray-700/50 hover:bg-gray-700/50 hover:text-white transition-all duration-200"
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
                                className="p-2 bg-blue-500/20 text-blue-400 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 hover:text-blue-300 transition-all duration-200"
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
                                className="p-2 bg-green-600/20 text-green-400 rounded-lg border border-green-600/30 hover:bg-green-600/30 hover:text-green-300 transition-all duration-200"
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
                                className="p-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-600/30 hover:bg-purple-600/30 hover:text-purple-300 transition-all duration-200"
                                title="Research Paper"
                            >
                                <IconCode className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                    
                    {project.deployment && (
                        <div className="text-right">
                            <p className="text-xs text-gray-400">{project.deployment}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="relative col-span-1">
                <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-[40rem] object-contain group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                
                <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 bg-blue-500/90 text-blue-100 rounded-full text-xs font-medium border border-blue-400/30">
                        {project.category}
                    </span>
                </div>

                <div className="absolute top-4 right-4 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${project.featured ? 'bg-green-400 animate-pulse' : 'bg-blue-400'}`}></div>
                    <span className="text-xs text-white bg-black/50 px-2 py-1 rounded-full backdrop-blur-sm">
                        {project.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

const projectsData = [
    {
        id: "smart-key-app",
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
        image: "/images/sk.png"
    },
    {
        id: "real-estate-analysis",
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
        image: "/images/kaggle.png"
    },
    {
        id: "multimodal-personality", 
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
        image: "/images/graduation.png"
    },
    {
        id: "sales-estimation-tool",
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
        image: "/images/ai.png"
    },
    {
        id: "homi-learning-app",
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
        image: "/images/homi.png"
    },
        {
        id: "homi-learning-dashboard",
        category: "Learning",
        title: "Homi Real Estate Dashboard",
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
        image: "/images/homi-dashboard.png"
    }
];

export default Projects;