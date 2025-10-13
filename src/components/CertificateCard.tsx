"use client";

import React, { useState } from "react";
import { ExternalLink, ChevronRight, ChevronDown } from "lucide-react";

// Define types
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
    <div className="card-border rounded-xl p-6 backdrop-blur-sm flex flex-col h-full min-h-[320px] hover:scale-[1.02] transition-all duration-300 group border border-gray-600/30 bg-gray-900/50 relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Header */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="flex-1">
          <h3 className="text-white font-semibold text-lg leading-tight mb-1 group-hover:text-blue-300 transition-colors line-clamp-2">
            {card.title}
          </h3>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-blue-400 font-medium px-2 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
              {card.level}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">
              {card.platform[0]?.educator}
            </span>
          </div>
        </div>

        {card.platform[0]?.logo && (
          <img
            src={card.platform[0].logo}
            alt={card.platform[0].educator}
            className="size-10 rounded-lg bg-white p-1 object-contain border border-gray-600/30 flex-shrink-0"
          />
        )}
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2 flex-grow relative z-10">
        {card.description}
      </p>

      {/* Skills Section */}
      {card.skills && card.skills.length > 0 && (
        <div className="mt-auto relative z-10">
          <div className="mb-3">
            {/* Skills Header with Small Toggle Button */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-gray-300 text-sm font-medium">Skills Gained:</p>
              {card.skills.length > 3 && (
                <button 
                  onClick={handleSkillsClick}
                  className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 rounded text-xs font-medium border border-blue-500/30 hover:bg-blue-500/30 hover:border-blue-400/50 transition-all duration-200 cursor-pointer"
                >
                  <span className="text-xs">{showAllSkills ? "Show Less" : `+${card.skills.length - 3}`}</span>
                  <ChevronDown className={`size-3 transition-transform ${showAllSkills ? "rotate-180" : ""}`} />
                </button>
              )}
            </div>

            {/* Skills Tags */}
            <div className="flex flex-wrap gap-1">
              {displayedSkills.map((skill: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-gray-500/20 text-gray-300 rounded text-xs font-medium border border-gray-500/30 hover:bg-gray-500/30 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Certificate Link */}
      {card.link && card.link !== "#" && (
        <div className="pt-3 border-t border-gray-600/30 relative z-10">
          <a
            href={card.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between w-full py-1 text-gray-400 hover:text-blue-300 transition-all duration-200 group/link"
          >
            <div className="flex items-center gap-2">
              <ExternalLink className="size-4" />
              <span className="text-sm font-medium">View certificate</span>
            </div>
            <ChevronRight className="size-4 opacity-0 group-hover/link:opacity-100 transition-opacity transform group-hover/link:translate-x-0.5" />
          </a>
        </div>
      )}
    </div>
  );
};

export default CertificateCard;