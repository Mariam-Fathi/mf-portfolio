'use client'

import React, { useRef } from "react";
import {ArrowRight, ArrowUpRight, Star, Users, ExternalLink} from "lucide-react";

const CertificateCard = ({ card, index }) => {
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
            className="card card-border rounded-xl p-6 md:p-8 backdrop-blur-sm flex flex-col h-full min-h-[480px] hover:scale-[1.02] transition-transform duration-300 group"
        >
            <div className="glow"></div>

            {/* Certificate Image */}
            {card.certificateImage && (
                <div className="mb-4 rounded-lg overflow-hidden border border-gray-600/30 shadow-lg h-48 flex-shrink-0 group-hover:shadow-xl transition-shadow">
                    <img
                        src={card.certificateImage}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            )}

            {/* Content */}
            <div className="flex-grow">
                {/* Title and Level */}
                <div className="mb-3">
                    <h3 className="text-white font-bold text-xl leading-tight mb-2 group-hover:text-blue-300 transition-colors">
                        {card.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-blue-400 text-sm font-medium px-2 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                            {card.level}
                        </span>
                        {card.type && (
                            <span className="text-gray-400 text-xs">
                                {card.type}
                            </span>
                        )}
                    </div>
                </div>

                {/* Platform Logos */}
                <div className="flex items-center gap-2 mb-4">
                    {card.platform.map((platform, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                            <img
                                src={platform.logo}
                                alt={platform.educator}
                                className="size-8 rounded-lg bg-white p-1 object-contain border border-gray-600/30"
                            />
                            <span className="text-gray-400 text-sm font-medium">
                                {platform.educator}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
                    {card.description}
                </p>

                {/* Skills */}
                {card.skills && card.skills.length > 0 && (
                    <div className="mt-auto">
                        <p className="text-gray-300 text-sm font-medium mb-2">
                            Skills Gained:
                        </p>
                        <div className="flex flex-wrap gap-1">
                            {card.skills.slice(0, 4).map((skill, idx) => (
                                <span
                                    key={idx}
                                    className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium border border-blue-500/30"
                                >
                                    {skill}
                                </span>
                            ))}
                            {card.skills.length > 4 && (
                                <span className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs font-medium border border-gray-500/30">
                                    +{card.skills.length - 4} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* View Certificate Link */}
            {card.link && card.link !== '#' && (
                <div className="mt-6 pt-4 border-t border-gray-600/30">
                    <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-blue-500/20 text-blue-300 rounded-lg border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-300 group/link"
                    >
                        <span className="text-sm font-medium">View Certificate</span>
                        <ExternalLink className="size-4 group-hover/link:translate-x-0.5 transition-transform" />
                    </a>
                </div>
            )}
        </div>
    );
};

export default CertificateCard;