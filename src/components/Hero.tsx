'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

const abilities = [
    {
        imgPath: "/images/seo.png",
        title: "Bridge Builder",
        desc: "I specialize in connecting intelligent algorithms with real-world impact. My passion lies in taking AI prototypes and building the robust data pipelines and applications that make them truly useful and reliable.",
    },
    {
        imgPath: "/images/chat.png",
        title: "Full-Stack Thinker",
        desc: "From mobile apps to data models, I thrive at the intersection of engineering and product. I don't just build features; I solve business problems by understanding the entire system, from the user interface to the data that powers it.",
    },
    {
        imgPath: "/images/time.png",
        title: "Data-First Engineer",
        desc: "My core belief is that great software starts with great data. I have a proven track record of diagnosing data quality issues and architecting the foundational pipelines that turn messy, real-world information into a trustworthy asset.",
    },
];

const FeatureCards = () => (
    <div className="w-full px-5 md:px-20 lg:px-40 mt-16 md:mt-20">
        <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl">
            {abilities.map(({ imgPath, title, desc }) => (
                <div
                    key={title}
                    className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:transform hover:scale-105 cursor-pointer"
                >
                    {/* Gradient Border Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="size-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm mb-4">
                            <img
                                src={imgPath}
                                alt={title}
                                className="size-7 md:size-8 object-contain"
                            />
                        </div>
                        <h3 className="text-white text-xl md:text-2xl font-semibold mt-2 mb-3">{title}</h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed">{desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        );
    });

    const SLIDER_WORDS = [
        { text: "AI Systems", imgPath: "/icons/concepts.svg" },
        { text: "Mobile Apps", imgPath: "/icons/code.svg" },
        { text: "AI Systems", imgPath: "/icons/concepts.svg" },
        { text: "Mobile Apps", imgPath: "/icons/code.svg" },
        { text: "AI Systems", imgPath: "/icons/concepts.svg" },
        { text: "AI Systems", imgPath: "/icons/concepts.svg" },
        { text: "Mobile Apps", imgPath: "/icons/code.svg" },
        { text: "AI Systems", imgPath: "/icons/concepts.svg" },
    ];

    return (
        <WavyBackground className="min-h-screen">
            <section id="hero" className="relative min-h-screen overflow-hidden pt-32 md:pt-48 flex-col justify-center items-center">
                <header className="flex flex-col items-center text-center justify-center w-full px-5 md:px-20 mb-16 md:mb-20">
                    <div className="flex flex-col gap-6 md:gap-8 items-center max-w-6xl">
                        <div className="hero-text">
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                                Building{" "}
                                <span className="slide" aria-live="polite">
                                    <span className="wrapper">
                                        {SLIDER_WORDS.map((word, index) => (
                                            <span
                                                key={index}
                                                className="flex items-center md:gap-3 gap-2"
                                            >
                                                <img
                                                    src={word.imgPath}
                                                    alt={word.text}
                                                    className="xl:size-12 md:size-10 size-8 md:p-2 p-1.5 rounded-full bg-white-50 backdrop-blur-sm"
                                                />
                                                <span className="whitespace-nowrap bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                                                    {word.text}
                                                </span>
                                            </span>
                                        ))}
                                    </span>
                                </span>
                            </h1>
                        </div>

                        <p className="text-gray-300 md:text-lg lg:text-xl leading-relaxed max-w-3xl">
                            I bridge the gap between AI research and production engineering. My journey from multimodal behavioral analysis to leading mobile products taught me that robust data pipelines are the foundation of any reliable intelligent system.
                        </p>

                    </div>
                </header>

                <FeatureCards />
            </section>
        </WavyBackground>
    );
};

export default Hero;