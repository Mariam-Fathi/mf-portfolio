"use client";

import React, { useRef, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";
import TitleHeader from "./TitleHeader";
import { IconArrowLeft, IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import FriendsCinematicSection from "./friends-cinematic";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

export function Projects() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );
    }, []);

    return (
        <div id="projects" ref={sectionRef} className="section-padding bg-gradient-to-b from-gray-900/0 to-gray-900/10">
            <TitleHeader
                title="My Projects"
                sub="🎬 From Concept to Production - Real Applications, Real Impact"
            />
            
            <ProjectsCarousel projects={projectsData} />
            
            <FriendsCinematicSection />
        </div>
    );
}


const ProjectsCarousel = ({ projects }) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = React.useState(0);

    useGSAP(() => {
        gsap.fromTo(".project-card",
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1, 
                stagger: 0.2,
                scrollTrigger: {
                    trigger: carouselRef.current,
                    start: "top 80%"
                }
            }
        );
    }, { scope: carouselRef });

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    return (
        <div ref={carouselRef} className="max-w-6xl mx-auto mt-16">
            <div className="relative">
                <button
                    onClick={prevSlide}
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm project-card"
                >
                    <IconArrowLeft className="w-6 h-6" />
                </button>
                
                <button
                    onClick={nextSlide}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-4 rounded-full bg-gray-800/50 border border-gray-600/30 text-gray-300 hover:text-white hover:bg-gray-700/50 transition-all duration-300 backdrop-blur-sm project-card"
                >
                    <IconArrowRight className="w-6 h-6" />
                </button>

                <div className="px-8 md:px-0">
                    <div className="project-card bg-gray-800/30 backdrop-blur-sm rounded-3xl border border-gray-700/50 p-8 transform transition-all duration-500 hover:border-blue-500/50 hover:scale-[1.02]">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                            <div className="relative group">
                                <div className="rounded-2xl overflow-hidden border border-gray-600/30 bg-gray-900/20">
                                    <img
                                        src={projects[currentIndex].demoGif}
                                        alt={`${projects[currentIndex].title} Demo`}
                                        className="w-full h-64 object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium border border-blue-500/30 mb-4">
                                        {projects[currentIndex].category}
                                    </span>
                                    <h3 className="text-3xl font-bold text-white mb-3">
                                        {projects[currentIndex].title}
                                    </h3>
                                    <p className="text-gray-300 text-lg leading-relaxed">
                                        {projects[currentIndex].description}
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {projects[currentIndex].technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-2 bg-gray-700/50 text-gray-300 rounded-lg text-sm font-medium border border-gray-600/50 backdrop-blur-sm"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex gap-4 pt-4">
                                    {projects[currentIndex].githubUrl && (
                                        <a
                                            href={projects[currentIndex].githubUrl}
                                            className="flex items-center gap-2 px-6 py-3 bg-gray-700/50 text-gray-300 rounded-xl border border-gray-600/50 hover:bg-gray-600/50 hover:text-white transition-all duration-300 backdrop-blur-sm"
                                        >
                                            <IconBrandGithub className="w-5 h-5" />
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-3 mt-8">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 project-card ${
                                index === currentIndex 
                                    ? "bg-blue-500 scale-125 shadow-lg shadow-blue-500/50" 
                                    : "bg-gray-600 hover:bg-gray-500"
                            }`}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

const projectsData = [
    {
        id: "smart-key-app",
        category: "Mobile Engineering",
        title: "Smart Key Hotel Platform",
        demoGif: "/images/gifs/joe.gif", 
        description: "Led development of flagship mobile applications for hotel access and staff management. Built both guest and staff apps with React Native, integrated custom hardware for room access, and deployed in live hotel environments.",
        technologies: ["React Native", "TypeScript", "Hardware Integration", "Appwrite", "Firebase", "Bluetooth"],
        keyFeatures: [
            "Mobile room access via Bluetooth/NFC",
            "Staff management dashboard",
            "Real-time room status updates",
            "Enterprise-grade security",
            "Cross-platform compatibility"
        ],
        githubUrl: null,
        demoUrl: null,
        featured: true
    },
    {
        id: "real-estate-analysis",
        category: "Data Engineering",
        title: "Real Estate Data Quality Analysis",
        demoGif: "/images/gifs/joey-how-you-doin.gif", 
        description: "Deep analysis of 2.2M property records uncovering critical data quality issues. Built comprehensive data validation pipeline and identified 38.19% anomalies in the dataset.",
        technologies: ["Python", "Pandas", "Data Analysis", "Jupyter", "Data Validation", "Matplotlib"],
        keyFeatures: [
            "Analysis of 2.2M+ property records",
            "38.19% anomaly detection rate",
            "Memory-optimized data processing",
            "Automated validation pipeline",
            "Interactive visualization dashboard"
        ],
        githubUrl: "https://github.com/Mariam-Fathi/real-estate-analysis",
        demoUrl: null,
        featured: true
    },
    {
        id: "homi-learning-app",
        category: "Full-Stack Development",
        title: "Homi Real Estate Learning Platform",
        demoGif: "/images/gifs/friends-success.gif", 
        description: "Comprehensive learning environment that evolved from a React Native tutorial into a full-featured real estate application with modern development practices.",
        technologies: ["React Native", "Firebase", "Stripe", "Appwrite", "OAuth", "Push Notifications"],
        keyFeatures: [
            "OAuth authentication flows",
            "Stripe payment integration",
            "Firebase push notifications",
            "Real-time analytics dashboard",
            "User preference tracking"
        ],
        githubUrl: "https://github.com/Mariam-Fathi/homi-app",
        demoUrl: null,
        featured: false
    },
    {
        id: "sales-estimation-tool",
        category: "AI Application",
        title: "AI Sales Estimation Tool",
        demoGif: "/images/gifs/joe.gif", 
        description: "Hugging Face-powered tool for quick project cost estimations with feedback loop. Helps sales teams provide immediate technical estimates during client conversations.",
        technologies: ["Python", "Hugging Face", "FastAPI", "MLOps", "Feedback Systems", "NLP"],
        keyFeatures: [
            "Pre-trained model integration",
            "Real-time project analysis",
            "Automated cost estimation",
            "Feedback loop for improvement",
            "RESTful API architecture"
        ],
        githubUrl: null,
        demoUrl: null,
        featured: false
    },
    {
        id: "multimodal-personality",
        category: "AI Research",
        title: "Multimodal Personality Analysis",
        demoGif: "/images/gifs/ross-break.gif", 
        description: "Predicting Big Five personality traits from self-presentation videos using deep learning. Integrated visual, audio, and textual cues with advanced fusion techniques.",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers", "LSTNet"],
        keyFeatures: [
            "Multimodal data fusion",
            "Temporal pattern recognition",
            "Class imbalance mitigation",
            "Stacking ensemble methods",
            "Real-time video processing"
        ],
        githubUrl: "https://github.com/Mariam-Fathi/multimodal-personality",
        demoUrl: null,
        featured: false
    }
];

export default Projects;