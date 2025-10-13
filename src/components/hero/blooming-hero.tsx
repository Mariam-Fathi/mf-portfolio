"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const MinimalCinematicHero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const pathsRef = useRef([]);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl
        .fromTo(titleRef.current,
            { 
                opacity: 0, 
                y: 30,
                filter: "blur(10px)"
            },
            { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                duration: 1.5,
                ease: "power2.out"
            }
        )

        .fromTo(subtitleRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 0.5 }
        )
        .to(subtitleRef.current, {
            duration: 2.5,
            text: {
                value: "We're sometimes trained—whether intuitively or in school—to isolate knowledge into pockets, where what exists in one pocket has nothing to do with what's in the other. When in reality, it's a web. And the one ingredient that fuels that web... CURIOSITY.",
                delimiter: ""
            },
            ease: "none"
        }, "-=0.3")

        .fromTo(pathsRef.current,
            { 
                opacity: 0,
                strokeDasharray: 1000,
                strokeDashoffset: 1000
            },
            { 
                opacity: 1,
                strokeDashoffset: 0,
                duration: 2,
                stagger: 0.2,
                ease: "power2.inOut"
            },
            "-=1.5"
        );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative min-h-screen flex items-center justify-center py-40 bg-black">
            <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/10 to-black" />
            
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
                <h1 
                    ref={titleRef}
                    className="text-5xl md:text-7xl lg:text-8xl font-light text-white mb-8 tracking-tight opacity-0"
                >
                    EVERYTHING<br />IS CONNECTED
                </h1>

                <p 
                    ref={subtitleRef}
                    className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto mb-16 font-light tracking-wide opacity-0"
                >
                </p>

                <div className="relative">
                       <img 
                                src="/images/gifs/brain-neuron.gif" 
                                alt="Monica cleaning and organizing"
                                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-700"
                            />
                </div>
            </div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 12 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/10 rounded-full"
                        style={{
                            left: `${10 + (i * 8)}%`,
                            top: `${20 + (Math.random() * 60)}%`,
                            animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
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
                
                /* Custom scrollbar for elegance */
                ::-webkit-scrollbar {
                    width: 6px;
                }
                
                ::-webkit-scrollbar-track {
                    background: #000;
                }
                
                ::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 3px;
                }
            `}</style>
        </div>
    );
};

export default MinimalCinematicHero;