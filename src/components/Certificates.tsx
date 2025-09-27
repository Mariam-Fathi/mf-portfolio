'use client';

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TitleHeader from "@/components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const Certificates = () => {
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
        <div id="certificates" ref={sectionRef} className="app-showcase mt-32">
            <TitleHeader
                title="Certifications & Volunteering"
                sub="🎓 Certificates"
            />
            <div className="w-full mt-32">
                <div className="showcaselayout">
                    <div ref={rydeRef} className="first-project-wrapper">
                        <div className="image-wrapper">
                            <img src="/images/project2.jpeg" alt="Market Dashboard Demo" />
                        </div>
                        <div className="text-content">
                            <h2>
                                DeepLearning.AI Data Engineering Professional Certificate
                            </h2>
                            <p className="text-white-50 md:text-xl">
                                An app built with React Native, Expo, & TailwindCSS for a fast,
                                user-friendly experience.
                            </p>
                        </div>
                    </div>

                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={libraryRef}>
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img
                                    src="/images/project1.png"
                                    alt="Library Management Platform"
                                />
                            </div>
                            <h2>Time Series Certificate</h2>
                        </div>

                        <div className="project" ref={ycDirectoryRef}>
                            <div className="image-wrapper bg-[#FFE7EB]">
                                <img src="/images/project1.png" alt="YC Directory App" />
                            </div>
                            <h2>Computer Vision Certificate</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full mt-10">
                <div className="showcaselayout">
                    <div className="project-list-wrapper xl:w-[60%] overflow-hidden">
                        <div className="project" ref={libraryRef}>
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img
                                    src="/images/project1.png"
                                    alt="Library Management Platform"
                                />
                            </div>
                            <h2>IEEE Certificate</h2>

                        </div>
                    </div>
                    <div className="project-list-wrapper overflow-hidden">
                        <div className="project" ref={libraryRef}>
                            <div className="image-wrapper bg-[#FFEFDB]">
                                <img
                                    src="/images/project1.png"
                                    alt="Library Management Platform"
                                />
                            </div>
                            <h2>Machine Learning Explainability Certificate</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Certificates;
