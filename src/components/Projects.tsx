"use client";

import React, {useRef} from "react";
import { ProjectsCarousel } from "@/components/ui/apple-cards-carousel";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import TitleHeader from "@/components/TitleHeader";

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
        <div id="work" ref={sectionRef} className="app-showcase">
            <TitleHeader
                title="My Engineering Journey"
                sub="🚀 From AI Research to Production Applications"
            />
            <ProjectsCarousel projects={data} />
        </div>
    );
}

const data = [
    {
        id: "smart-key-app",
        category: "Mobile Engineering",
        title: "Smart Key Hotel Platform",
        src: "/images/smart-key-cover.png",
        description: "Led development of flagship mobile applications for hotel access and staff management",
        content: (
            <div className="space-y-4">
                <p>
                    As the lead mobile engineer at Tarqia, I single-handedly architected and built both the guest and staff applications from scratch after a colleague's departure. The platform enables seamless hotel room access and staff management through mobile devices.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Achievements:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Built both iOS and Android apps with React Native</li>
                        <li>Integrated with custom hardware for room access</li>
                        <li>Led pilot deployment in live hotel environment</li>
                        <li>Contributed to securing enterprise contracts with major hotels</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: null, // Likely proprietary
        demoUrl: null,
        technologies: ["React Native", "TypeScript", "Hardware Integration", "Appwrite", "Firebase"],
        featured: true,
    },
    {
        id: "real-estate-analysis",
        category: "Data Engineering",
        title: "Real Estate Data Quality Analysis",
        src: "/images/real-estate-analysis.png",
        description: "Deep analysis of 2.2M property records uncovering critical data quality issues",
        content: (
            <div className="space-y-4">
                <p>
                    A personal deep-dive into the USA Real Estate Dataset that revealed 38.19% of records contained anomalies. This project reinforced my belief that data quality is the foundation of any reliable AI system.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Findings:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Identified 734,297 placeholder dates (32.98% of dataset)</li>
                        <li>Discovered 115,872 duplicate price records</li>
                        <li>Found 57,930 suspicious price patterns over 5+ years</li>
                        <li>Architected data pipeline for cleaning and validation</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/real-estate-analysis",
        demoUrl: null,
        technologies: ["Python", "Pandas", "Data Analysis", "Jupyter", "Data Validation"],
        featured: true,
    },
    {
        id: "multimodal-personality",
        category: "AI Research",
        title: "Multimodal Personality Analysis",
        src: "/images/multimodal-cover.png",
        description: "Predicting Big Five personality traits from self-presentation videos using deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    My graduation project that sparked my passion for the intersection of AI and data engineering. The system integrated visual, audio, and textual cues to predict personality traits, but the most valuable lesson was discovering critical data quality issues.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Technical Highlights:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of VGG-Face, audio features, and text</li>
                        <li>LSTNet for temporal pattern recognition</li>
                        <li>Identified and mitigated class imbalance issues</li>
                        <li>Stacking ensemble methods for improved performance</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: null,
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers", "LSTNet"],
        featured: false,
    },
    {
        id: "sales-estimation-tool",
        category: "AI Application",
        title: "AI Sales Estimation Tool",
        src: "/images/sales-estimator.png",
        description: "Hugging Face-powered tool for quick project cost estimations with feedback loop",
        content: (
            <div className="space-y-4">
                <p>
                    A freelance project where I built a tool to help sales teams provide quick technical estimates. The system uses pre-trained models and includes a feedback mechanism for continuous improvement based on real deal data.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Leveraged Hugging Face pre-trained models</li>
                        <li>Real-time project description analysis</li>
                        <li>Designed feedback loop for model retraining</li>
                        <li>Scalable architecture for continuous learning</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: null, // Likely proprietary
        demoUrl: null,
        technologies: ["Python", "Hugging Face", "FastAPI", "MLOps", "Feedback Systems"],
        featured: false,
    },
    {
        id: "homi-learning-app",
        category: "Full-Stack Development",
        title: "Homi Real Estate App",
        src: "/images/homi-app.png",
        description: "Comprehensive learning environment integrating modern mobile development features",
        content: (
            <div className="space-y-4">
                <p>
                    My personal learning environment that started as a React Native tutorial and evolved into a full-featured real estate application. This project served as my playground for mastering modern mobile development.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Integrated Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>OAuth authentication flows</li>
                        <li>Stripe payment integration</li>
                        <li>Firebase push notifications</li>
                        <li>Appwrite database and backend</li>
                        <li>User activity tracking and analytics</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/homi-app",
        demoUrl: null,
        technologies: ["React Native", "Firebase", "Stripe", "Appwrite", "OAuth"],
        featured: false,
    }
];