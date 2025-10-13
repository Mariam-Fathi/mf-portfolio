"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

const MinimalCinematicHero = () => {
    const containerRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
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
            { 
                opacity: 0, 
                y: 20,
                filter: "blur(8px)",
                height: 0, 
                marginBottom: 0
            },
            { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                height: "auto",
                marginBottom: "4rem",
                duration: 1.2,
                ease: "power2.out"
            },
            "+=0.3"
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
                    className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-3xl mx-auto font-light tracking-wide opacity-0 h-0 overflow-hidden"
                >
                    We're sometimes trained—whether intuitively or in school—to isolate knowledge into pockets, where what exists in one pocket has nothing to do with what's in the other. When in reality, it's a web. And the one ingredient that fuels that web... CURIOSITY.
                </p>

                <div className="relative">
                    <img 
                        src="/images/gifs/brain-neuron.gif" 
                        alt="Brain neurons connecting"
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
            `}</style>
        </div>
    );
};

export default MinimalCinematicHero;