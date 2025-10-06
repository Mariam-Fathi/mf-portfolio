'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "@/components/Button";
import { words } from "@/constants";
import HeroExperience from "@/components/models/hero_models/HeroExperience";
import React from "react";
import {WavyBackground} from "@/components/ui/wavy-background";
import FeatureCards from "@/components/FeatureCard";

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        );
    });

    return (
        <WavyBackground className="">

        <section id="hero" className="relative overflow-hidden mt-20 pt-20 flex-col justify-center items-center">

                <header className="flex flex-col items-center text-center justify-center md:w-full w-screen md:px-20 px-5 mb-20">
                    <div className="flex flex-col gap-7 items-center">
                        <div className="hero-text">
                            <h1>
                                Turning{" "}
                                <span className="slide">
        <span className="wrapper">
            {words.map((word, index) => (
                <span
                    key={index}
                    className="flex items-center md:gap-3 gap-1"
                >
                    <img
                        src={word.imgPath}
                        alt="person"
                        className="xl:size-12 md:size-10 size-7 md:p-2 p-1 rounded-full bg-white-50"
                    />
                    <span className="whitespace-nowrap">{word.text}</span>
                </span>
            ))}
        </span>
    </span>{" "}
                            </h1>
                            into Real Projects that Deliver Results

                        </div>

                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Software & Mobile Engineer with a passion for behavioral modeling, data engineering, and intuitive product design.


                        </p>


                    </div>
                </header>
                <FeatureCards />

        </section>
            </WavyBackground>
    );
};

export default Hero;
