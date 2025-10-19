"use client";

import React, { useState } from "react";
import { ExternalLink, ChevronRight, ChevronDown } from "lucide-react";

interface Platform {
  logo: string;
  educator: string;
}

interface CertificateCardProps {
  card: {
    title: string;
    level: string;
    platform: Platform[];
    description: string;
    skills: string[];
    link?: string;
    certificateImage?: string;
  };
  index: number;
}

const CertificateCard: React.FC<CertificateCardProps> = ({ card, index }) => {
  const [showAllSkills, setShowAllSkills] = useState(false);

  const handleSkillsClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowAllSkills(!showAllSkills);
  };

  const displayedSkills = showAllSkills ? card.skills : card.skills.slice(0, 3);

  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 hover:border-gray-600/70 transition-all duration-300 group h-full flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-base leading-tight mb-2 group-hover:text-blue-400 transition-colors">
            {card.title}
          </h3>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-blue-400 font-medium px-2 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
              {card.level}
            </span>
            <span className="text-gray-500">•</span>
            <span className="text-gray-400">
              {card.platform[0]?.educator}
            </span>
          </div>
        </div>

        {card.platform[0]?.logo && (
          <img
            src={card.platform[0].logo}
            alt={card.platform[0].educator}
            className="size-8 rounded-lg bg-white p-1 object-contain border border-gray-600/30 flex-shrink-0"
          />
        )}
      </div>

      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow font-light">
        {card.description}
      </p>

      {card.skills && card.skills.length > 0 && (
        <div className="mt-auto">
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-500 text-xs font-medium uppercase tracking-wide">Skills</p>
        
            </div>

            <div className="flex flex-wrap gap-1">
              {displayedSkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-700/30 text-gray-300 rounded text-xs font-light border border-gray-600/30"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {card.link && card.link !== "#" && (
        <div className="pt-3 border-t border-gray-700/50 mt-3">
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-1 text-gray-500 hover:text-blue-400 transition-all duration-200 group/link"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="size-3" />
              <span className="text-xs font-medium">View certificate</span>
            </div>
            <ChevronRight className="size-3 opacity-0 group-hover/link:opacity-100 transition-opacity transform group-hover/link:translate-x-0.5" />
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;