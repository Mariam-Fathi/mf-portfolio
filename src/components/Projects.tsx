"use client";

import React, {useRef} from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
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

    const cards = data.map((card, index) => (
        <Card key={card.src} card={card} index={index} />
    ));

    return (
        <div id="work" ref={sectionRef} className="app-showcase">
            <h2 className=" text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 ">
                My Projects
            </h2>
            <Carousel items={cards} />
        </div>
    );
}

const DummyContent = () => {
    return (
        <>
            {[...new Array(3).fill(1)].map((_, index) => {
                return (
                    <div
                        key={"dummy-content" + index}
                        className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
                    >
                        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
                            Keep a journal, quickly jot down a grocery list, and take amazing
                            class notes. Want to convert those notes to text? No problem.
                            Langotiya jeetu ka mara hua yaar is ready to capture every
                            thought.
                        </p>
                        <img
                            src="https://assets.aceternity.com/macbook.png"
                            alt="Macbook mockup from Aceternity UI"
                            height="500"
                            width="500"
                            className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
                        />
                    </div>
                );
            })}
        </>
    );
};

const data = [
    {
        category: "Graduation Project",
        title: "Multimodal Personality Trait Prediction",
        src: "/images/project1",
        content: (
            <>
                Bachelor’s project focused on predicting personality traits from short self-presentation videos using multimodal deep learning.
                The system integrates visual, audio, and textual cues to infer Big Five traits, with emphasis on fairness and data imbalance mitigation.
            </>
        ),
    },
    {
        category: "Mobile Development",
        title: "Smart Key Solution – Tarqia",
        src: "/images/project1",
        content: (
            <>
                Led mobile app development for Tarqia’s Smart Key Solution using React Native.
                Delivered two production-ready apps deployed in a live hotel pilot, integrating IoT, AI, and business logic to enhance guest experience.
            </>
        ),
    },
    {
        category: "Freelance Project",
        title: "CRM & ML Estimation Tool – Dracode",
        src: "/images/project1",
        content: (
            <>
                Built a lightweight CRM system with an embedded ML-based estimation tool to solve sales bottlenecks.
                Delivered as part of a freelance engagement, combining frontend engineering with practical machine learning.
            </>
        ),
    },
    {
        category: "Data Engineering",
        title: "Source Systems & Ingestion – Coursera",
        src: "/images/project1",
        content: (
            <>
                Completed Coursera’s Data Engineering course focused on sourcing data from diverse systems and building ingestion pipelines.
                Learned to implement DataOps practices and design scalable data workflows.
            </>
        ),
    },
    {
        category: "Time Series",
        title: "Time Series Forecasting – Kaggle",
        src: "/images/project1",
        content: (
            <>
                Completed Kaggle’s Time Series course focused on applying ML methods to time-dependent data.
                Covered feature engineering, hybrid models, and forecasting techniques inspired by competition-winning solutions.
            </>
        ),
    },
];