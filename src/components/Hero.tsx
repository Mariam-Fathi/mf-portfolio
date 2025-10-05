'use client';

import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import Button from "@/components/Button";
import { words } from "@/constants";
import HeroExperience from "@/components/models/hero_models/HeroExperience";
import React from "react";

const Hero = () => {
    useGSAP(() => {
        gsap.fromTo(
            ".hero-text h1",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
        );
    });

    return (
        <section id="hero" className="relative overflow-hidden pt-20 mt-20 flex-col justify-center items-center">
            <div className="absolute top-0 left-0 z-10">
                <img src="/images/bg.png" alt="" />
            </div>

                <header className="flex flex-col items-center text-center justify-center md:w-full w-screen md:px-20 px-5">
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
                            into Real Projects

                        </div>

                        <p className="text-white-50 md:text-xl relative z-10 pointer-events-none">
                            Software & Mobile Engineer with a passion for behavioral modeling, <br/>data engineering, and intuitive product design.


                        </p>

                        <div className={'w-full justify-center items-center'}>
                            <Button
                                text="See My Work"
                                className="md:w-80 md:h-16 w-60 h-12"
                                id="work"
                            />
                        </div>

                    </div>
                </header>

                {/* RIGHT: 3D Model or Visual */}
                <figure>
                    <div className="hero-3d-layout">
                        <HeroExperience />
                    </div>
                </figure>
        </section>
    );
};

export default Hero;
