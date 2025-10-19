'use client';

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { logoIconsList } from "../constants";

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
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        // Hero header animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(titleRef.current,
            { 
                opacity: 0, 
                y: 80,
                filter: "blur(15px)",
                scale: 0.9
            },
            { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 1.8,
                ease: "power4.out"
            }
        )
        .fromTo(subtitleRef.current,
            { 
                opacity: 0, 
                y: 40,
                filter: "blur(12px)",
            },
            { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "power2.out"
            },
            "-=1.2"
        );

        // Marquee animation
        gsap.to(".marquee-box", {
            xPercent: -100,
            repeat: -1,
            duration: 40,
            ease: "none"
        });

        // Floating particles animation
        gsap.to(".floating-particle", {
            y: -20,
            x: 10,
            duration: 6,
            repeat: -1,
            yoyo: true,
            stagger: {
                amount: 3,
                from: "random"
            },
            ease: "sine.inOut"
        });

    }, { scope: sectionRef });

    return (
        <section 
            ref={sectionRef}
            id="skills" 
            className="relative bg-black overflow-hidden py-20 max-sm:py-10"
        >
            <div className="absolute inset-0 bg-black" />
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle absolute w-1 h-1 bg-white/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-6 tracking-tight opacity-0"
                    >
                        TECHNOLOGIES
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto mt-8 text-base leading-relaxed font-light">
                        From AI research to production applications, these are the technologies I've mastered
                        through hands-on projects and continuous learning
                    </p>
                </div>

                <div className="relative overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
                    
                    <div className="marquee h-24 md:h-28">
                        <div className="marquee-box gap-10 md:gap-14">
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
                }
                
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px);
                        opacity: 0.1;
                    }
                    50% { 
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.3;
                    }
                }
                .floating-particle {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    );
};

export default Technologies;