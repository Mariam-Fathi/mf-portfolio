'use client'

import React, { useRef } from "react";
import {ArrowRight, ArrowUpRight, Star, Users} from "lucide-react";
import Button from "@/components/Button";

const GlowCard = ({ card, index, children }) => {
    const cardRefs = useRef([]);

    const handleMouseMove = (index) => (e) => {
        const card = cardRefs.current[index];
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        card.style.setProperty("--start", angle + 60);
    };

    return (
        <div
            ref={(el) => (cardRefs.current[index] = el)}
            onMouseMove={handleMouseMove(index)}
            className="card card-border timeline-card rounded-xl p-6 md:p-8 mb-5 break-inside-avoid-column backdrop-blur-sm flex flex-col h-full min-h-[450px]"
        >
            <div className="glow"></div>

            {card.certificateImage && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600/30 shadow-lg h-60 flex-shrink-0">
                    <img
                        src={card.certificateImage}
                        alt={card.title || "Certificate"}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}
            <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-2">
                    {card.platform && (

                        <div className="flex items-center gap-2">
                            {card.platform.map((log, index) => (
                                <>
                                    <img
                                        key={index}
                                        src={log.logo}
                                        alt={log.educator || "Platform"}
                                        className="size-8 rounded-lg bg-white p-1 object-contain border border-gray-600/30"
                                    />
                                    <span className="text-gray-400 text-sm">
        {log.educator}
    </span>
                                </>
                            ))}
                        </div>
                    )}
                </div>

            </div>
            <div className="mb-2 flex-shrink-0">
                <h3 className="text-white font-bold text-xl md:text-2xl leading-tight mb-2">
                    {card.title}
                </h3>

                {card.level && (
                    <div className="inline-flex items-center gap-2 text-sm  bg-green-500/20 text-green-300 rounded-sm px-2 border border-green-500/30">
                        <span className="capitalize">{card.level}</span>
                    </div>

                )}
                {card.type && (
                    <div className="inline-flex items-center ml-1 text-sm  bg-green-500/20 text-green-300 rounded-sm px-2 border border-green-500/30">
                        <span className="capitalize">{card.type}</span>
                    </div>

                )}
            </div>


            {card.skills && card.skills.length > 0 && (
                <div className="flex-shrink-0 mt-4">
                    <p className="text-gray-300 text-sm font-medium mb-2">
                        Skills Acquired:
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                        {card.skills.slice(0, 6).map((skill, idx) => (
                            <span
                                key={idx}
                                className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium border border-blue-500/30"
                            >
                                {skill}
                            </span>
                        ))}
                        {card.skills.length > 4 && (
                            <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs font-medium border border-gray-500/30">
                                +{card.skills.length - 4} more...
                            </span>
                        )}
                    </div>
                </div>
            )}

            <div  className="mt-auto flex-shrink-0 ">
                <a
                    href={card.link}
                    className={`w-full cta-wrapper`}
                >
                    <div className="cta-button group">
                        <div className="bg-circle" />
                        <p className="text">View Certificate</p>
                        <div className="arrow-wrapper">
                            <div>
                                <ArrowUpRight color={'black'}/>
                            </div>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default GlowCard;