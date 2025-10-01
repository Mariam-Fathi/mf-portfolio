'use client'

import { useRef } from "react";

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
            className="card card-border timeline-card rounded-xl p-6 md:p-8 mb-5 break-inside-avoid-column backdrop-blur-sm flex flex-col h-full"
        >
            <div className="glow"></div>

            {/* Certificate Image */}
            {card.certificateImage && (
                <div className="mb-6 rounded-lg overflow-hidden border border-gray-600/30 shadow-lg">
                    <img
                        src={card.certificateImage}
                        alt={card.title || "Certificate"}
                        className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {/* Platform Logo and Title */}
            <div className="flex items-start gap-4 mb-4">
                {card.platformLogo && (
                    <div className="flex-shrink-0">
                        <img
                            src={card.platformLogo}
                            alt={card.platform || "Platform"}
                            className="size-12 md:size-14 rounded-lg bg-white p-2 object-contain border border-gray-600/30"
                        />
                    </div>
                )}
                <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg md:text-xl leading-tight line-clamp-2">
                        {card.title}
                    </h3>
                    {card.platform && (
                        <p className="text-blue-400 text-sm md:text-base font-medium mt-1">
                            {card.platform}
                        </p>
                    )}
                </div>
            </div>

            {/* Description */}
            {card.description && (
                <div className="mb-4 flex-grow">
                    <p className="text-white-50 text-base leading-relaxed line-clamp-3">
                        {card.description}
                    </p>
                </div>
            )}

            {/* Skills Tags */}
            {card.skills && card.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {card.skills.map((skill, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-medium border border-green-500/30"
                        >
                            {skill}
                        </span>
                    ))}
                </div>
            )}

            {/* Children content (buttons, links, etc.) - Always at the bottom */}
            <div className="mt-auto pt-4">
                {children || (
                    <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                        View Certificate
                    </button>
                )}
            </div>
        </div>
    );
};

export default GlowCard;