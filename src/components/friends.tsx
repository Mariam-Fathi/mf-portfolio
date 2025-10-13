"use client";

import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "./TitleHeader";
import { IconArrowLeft, IconArrowRight, IconBrandGithub } from "@tabler/icons-react";
import FriendsCinematicSection from "./friends-cinematic";

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
    const sectionRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 50 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );
    }, []);

    return (
        <section id="work" ref={sectionRef} className="py-20 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TitleHeader
                    title="My Projects"
                    sub="From Concept to Production - Real Applications, Real Impact"
                />
                
                <ProjectsCarousel projects={projectsData} />
            </div>
            
            <FriendsCinematicSection />
        </section>
    );
}

const ProjectsCarousel = ({ projects }) => {
    const carouselRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    useGSAP(() => {
        gsap.fromTo(".project-card",
            { opacity: 0, y: 30 },
            { 
                opacity: 1, 
                y: 0, 
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: carouselRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
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
                    className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600/70 transition-all duration-300 backdrop-blur-sm"
                >
                    <IconArrowLeft className="w-5 h-5" />
                </button>
                
                <button
                    onClick={nextSlide}
                    className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-10 p-3 rounded-xl bg-gray-800/50 border border-gray-700/50 text-gray-400 hover:text-white hover:border-gray-600/70 transition-all duration-300 backdrop-blur-sm"
                >
                    <IconArrowRight className="w-5 h-5" />
                </button>

                {/* Project Card */}
                <div className="px-8 md:px-0">
                    <div className="project-card bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700/50 p-6 transition-all duration-300 hover:border-gray-600/70">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                            {/* Image Section */}
                            <div className="relative group">
                                <div className="rounded-lg overflow-hidden border border-gray-600/30 bg-gray-900/20">
                                    <img
                                        src={projects[currentIndex].demoGif}
                                        alt={`${projects[currentIndex].title} Demo`}
                                        className="w-full h-48 lg:h-64 object-cover transform transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="space-y-4">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-medium border border-blue-500/30 mb-3">
                                        {projects[currentIndex].category}
                                    </span>
                                    <h3 className="text-xl lg:text-2xl font-semibold text-white mb-2">
                                        {projects[currentIndex].title}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed font-light">
                                        {projects[currentIndex].description}
                                    </p>
                                </div>

                                {/* Technologies */}
                                <div className="flex flex-wrap gap-2">
                                    {projects[currentIndex].technologies.map((tech, idx) => (
                                        <span
                                            key={idx}
                                            className="px-2 py-1 bg-gray-700/30 text-gray-300 rounded text-xs font-light border border-gray-600/30"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                {/* Key Features */}
                                <div className="pt-2">
                                    <p className="text-gray-500 text-xs font-medium mb-2 uppercase tracking-wide">Key Features</p>
                                    <ul className="space-y-1">
                                        {projects[currentIndex].keyFeatures.slice(0, 3).map((feature, idx) => (
                                            <li key={idx} className="text-gray-400 text-xs flex items-start gap-2">
                                                <span className="text-blue-400 mt-0.5">•</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3 pt-4">
                                    {projects[currentIndex].githubUrl && (
                                        <a
                                            href={projects[currentIndex].githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-700/50 text-gray-300 rounded-lg border border-gray-600/50 hover:bg-gray-600/50 hover:text-white transition-all duration-300 text-sm"
                                        >
                                            <IconBrandGithub className="w-4 h-4" />
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-center gap-2 mt-6 py-1">
                    {projects.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex 
                                    ? "bg-white scale-125" 
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