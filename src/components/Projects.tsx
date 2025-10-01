"use client";

import React, {useRef} from "react";
import { ProjectsCarousel } from "@/components/ui/apple-cards-carousel";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";

export function Projects() {
    const sectionRef = useRef(null);
    const rydeRef = useRef(null);
    const libraryRef = useRef(null);
    const ycDirectoryRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <h2 className="text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200">
                My Projects
            </h2>
            <ProjectsCarousel projects={data} />
        </div>
    );
}

const data = [
    {
        id: "multimodal-personality1",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
    {
        id: "multimodal-personality2",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
    {
        id: "multimodal-personality3",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
    {
        id: "multimodal-personality",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
    {
        id: "multimodal-personality4",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
    {
        id: "multimodal-personality5",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
    {
        id: "multimodal-personality7",
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/Cover.png",
        description: "Predicting personality traits from self-presentation videos using multimodal deep learning",
        content: (
            <div className="space-y-4">
                <p>
                    Bachelor's project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                    The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
                </p>
                <div className="bg-muted p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Features:</h4>
                    <ul className="list-disc list-inside space-y-1">
                        <li>Multimodal fusion of visual, audio, and text data</li>
                        <li>Big Five personality trait prediction</li>
                        <li>Fairness-aware model training</li>
                        <li>Data imbalance mitigation techniques</li>
                    </ul>
                </div>
            </div>
        ),
        githubUrl: "https://github.com/yourusername/multimodal-personality",
        demoUrl: "https://yourdemo.com",
        technologies: ["Python", "PyTorch", "OpenCV", "Librosa", "Transformers"],
        featured: true,
    },
];