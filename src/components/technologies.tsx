'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logoIconsList } from "../constants";
import TitleHeader from "@/components/TitleHeader";

gsap.registerPlugin(ScrollTrigger);

const LogoIcon = ({ icon }) => {
    return (
        <div className="flex-none flex-center marquee-item group relative">
            <img
                src={icon.imgPath}
                alt={icon.name}
                className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 filter grayscale hover:grayscale-0"
            />
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                <div className="bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded border border-gray-700">
                    {icon.name}
                </div>
            </div>
        </div>
    );
};

const Technologies = () => {
    const sectionRef = useRef(null);
    const marqueeRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
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

        gsap.to(".marquee-box", {
            xPercent: -100,
            repeat: -1,
            duration: 40,
            ease: "none"
        });

        gsap.fromTo(cardsRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                scrollTrigger: {
                    trigger: cardsRef.current[0],
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, { scope: sectionRef });

    const addToCardsRef = (el, index) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };

    return (
        <section 
            ref={sectionRef}
            id="skills" 
            className="py-16 bg-black"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <TitleHeader
                        title="Technologies I Work With"
                        sub="Tools & Technologies That Power My Projects"
                    />
                    <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm leading-relaxed">
                        From AI research to production applications, these are the technologies I've mastered
                        through hands-on projects and continuous learning
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
                    
                    <div className="marquee h-20 md:h-24">
                        <div className="marquee-box gap-8 md:gap-12">
                            {logoIconsList.map((icon, index) => (
                                <LogoIcon key={`first-${index}`} icon={icon} />
                            ))}
                            {logoIconsList.map((icon, index) => (
                                <LogoIcon key={`second-${index}`} icon={icon} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .marquee {
                    overflow: hidden;
                    position: relative;
                }
                
                .marquee-box {
                    display: flex;
                    width: max-content;
                    animation: marquee 40s linear infinite;
                }
                
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                
                .marquee:hover .marquee-box {
                    animation-play-state: paused;
                }
            `}</style>
        </section>
    );
};

export default Technologies;