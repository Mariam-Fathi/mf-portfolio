"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

const FriendsCinematicSection = () => {
    const containerRef = useRef(null);
    const scenesRef = useRef([]);
    const timelineRef = useRef(null);

    useGSAP(() => {
        timelineRef.current = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
                pin: false,
                markers: false
            }
        });

        timelineRef.current
            .fromTo(scenesRef.current[0], 
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            )
            .fromTo(scenesRef.current[0].querySelector('.data-gif'),
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 2, ease: "power2.out" },
                "-=1"
            )
            .fromTo(scenesRef.current[0].querySelector('.friends-text'),
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.2 },
                "-=1.5"
            );

        timelineRef.current
            .to(scenesRef.current[0], { opacity: 0, duration: 1 })
            .fromTo(scenesRef.current[1],
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            )
            .fromTo(scenesRef.current[1].querySelector('.revelation-gif'),
                { opacity: 0, scale: 0.7 },
                { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.7)" },
                "-=1"
            )
            .fromTo(scenesRef.current[1].querySelector('.percentage-text'),
                { scale: 0, rotation: 180 },
                { scale: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.5)" },
                "-=1.2"
            );

        timelineRef.current
            .to(scenesRef.current[1], { opacity: 0, duration: 1 })
            .fromTo(scenesRef.current[2],
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            )
            .fromTo(scenesRef.current[2].querySelector('.optimization-gif'),
                { opacity: 0, scale: 0.6 },
                { opacity: 1, scale: 1, duration: 2, ease: "power3.out" },
                "-=1"
            )
            .fromTo(scenesRef.current[2].querySelector('.optimization-text'),
                { opacity: 0, x: -100 },
                { opacity: 1, x: 0, duration: 1.5 },
                "-=1.5"
            );

        timelineRef.current
            .to(scenesRef.current[2], { opacity: 0, duration: 1 })
            .fromTo(scenesRef.current[3],
                { opacity: 0 },
                { opacity: 1, duration: 1.5 }
            )
            .fromTo(scenesRef.current[3].querySelector('.solution-gif'),
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 2, ease: "back.out(1.7)" },
                "-=1"
            )
            .fromTo(scenesRef.current[3].querySelector('.solution-text'),
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1.2 },
                "-=1.5"
            );

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="relative py-20 bg-black">
            <div 
                ref={el => scenesRef.current[0] = el} 
                className="scene min-h-screen flex items-center justify-center py-20 opacity-0"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="data-gif">
                            <img 
                                src="/images/gifs/ross-theorem.gif" 
                                alt="Ross proving like a theorem"
                                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-700"
                            />
                        </div>
                        <div className="friends-text text-white">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                                "Oh, I'll prove it. I'll prove it like a <span className="text-blue-400">theorem</span>!"
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                                When I first encountered the real estate dataset, my inner Ross kicked in. 
                                I knew there was something suspicious in those 2.2 million records.
                            </p>
                            <div className="space-y-4 text-lg text-gray-400">
                                <p>🔍 <span className="text-white">Initial analysis</span> revealed strange patterns in property dates</p>
                                <p>📊 <span className="text-white">Deep dive investigation</span> into financial records</p>
                                <p>🎯 <span className="text-white">Methodical approach</span> to validate each hypothesis</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                ref={el => scenesRef.current[1] = el} 
                className="scene min-h-screen flex items-center justify-center py-20 opacity-0"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="revelation-gif order-2 lg:order-1">
                            <img 
                                src="/images/gifs/chandler-too-much.gif" 
                                alt="Chandler - This is too much information!"
                                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-700"
                            />
                        </div>
                        <div className="friends-text text-white order-1 lg:order-2">
                            <div className="percentage-text text-center lg:text-left mb-8">
                                <div className="text-8xl lg:text-9xl font-bold text-red-400 mb-4">
                                    38%
                                </div>
                                <div className="text-2xl lg:text-3xl text-gray-300">
                                    of records contained anomalies
                                </div>
                            </div>
                            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                                "This is too much <span className="text-red-400">information</span>!"
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                                The numbers didn't lie. 38.19% of the dataset was compromised - 
                                734,297 placeholder dates, 115,872 duplicate prices, 57,930 suspicious patterns.
                            </p>
                            <div className="space-y-4 text-lg text-gray-400">
                                <p>📅 <span className="text-white">734K placeholder dates</span> masking real transaction times</p>
                                <p>💰 <span className="text-white">115K duplicate prices</span> inflating market data</p>
                                <p>🚩 <span className="text-white">57K suspicious patterns</span> over 5+ years</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                ref={el => scenesRef.current[2] = el} 
                className="scene min-h-screen flex items-center justify-center py-20 opacity-0"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="optimization-gif">
                            <img 
                                src="/images/gifs/monica-clean.gif" 
                                alt="Monica cleaning and organizing"
                                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-700"
                            />
                        </div>
                        <div className="optimization-text text-white">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                                Memory <span className="text-green-400">Optimization</span> Revolution
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                                Like Monica's obsession with cleanliness, I attacked the memory issues. 
                                The dataset was consuming resources inefficiently, slowing down analysis.
                            </p>
                            <div className="space-y-4 text-lg text-gray-400">
                                <p>⚡ <span className="text-white">87.4% memory reduction</span> through optimized data types</p>
                                <p>🚀 <span className="text-white">Processing speed increased</span> by 3.2x</p>
                                <p>💾 <span className="text-white">Efficient data structures</span> for large-scale analysis</p>
                                <p>🔧 <span className="text-white">Custom pipeline optimization</span> for real-time validation</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div 
                ref={el => scenesRef.current[3] = el} 
                className="scene min-h-screen flex items-center justify-center py-20 opacity-0"
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="solution-gif order-2 lg:order-1">
                            <img 
                                src="/images/gifs/friends-success.gif" 
                                alt="Friends celebrating success"
                                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border border-gray-700"
                            />
                        </div>
                        <div className="solution-text text-white order-1 lg:order-2">
                            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                                Validation <span className="text-purple-400">Pipeline</span> Perfected
                            </h2>
                            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                                After weeks of meticulous work, the validation pipeline was running flawlessly. 
                                99.4% accuracy in detecting anomalies, ready for production deployment.
                            </p>
                            <div className="space-y-4 text-lg text-gray-400 mb-8">
                                <p>✅ <span className="text-white">99.4% detection accuracy</span> for data anomalies</p>
                                <p>🔄 <span className="text-white">Automated validation pipeline</span> for continuous monitoring</p>
                                <p>📈 <span className="text-white">Real-time analytics dashboard</span> for instant insights</p>
                                <p>🔒 <span className="text-white">Production-ready system</span> handling 2.2M+ records</p>
                            </div>
                            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700">
                                <p className="text-yellow-300 text-lg italic">
                                    "The real engineering work happens long before the machine learning models - 
                                    it's in the data pipelines that feed them."
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendsCinematicSection;