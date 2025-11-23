"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const certificates = [
  {
    id: "data-engineering",
    title: "DATA ENGINEERING",
    words: ["DATA", "ENGINEERING"],
    platform: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
    bgColor: "#FBBA16", // Yellow
    // DATA right vertical, ENGINEERING bottom-right (shifted)
    positions: {
      word1: { position: "right-vertical" },
      word2: { position: "bottom-right-shifted" },
    },
    infoPosition: "bottom-left", // Default position
  },
  {
    id: "time-series",
    title: "TIME SERIES",
    words: ["TIME", "SERIES"],
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
    bgColor: "#E2B2B4", // Pink
    // TIME left vertical (opposite of DATA), SERIES bottom-left-shifted (opposite of ENGINEERING)
    positions: {
      word1: { position: "left-vertical" },
      word2: { position: "bottom-left-shifted" },
    },
    infoPosition: "bottom-right", // Move info to opposite side
  },
  {
    id: "computer-vision",
    title: "COMPUTER VISION",
    words: ["COMPUTER", "VISION"],
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
    bgColor: "#9BCCD0", // Light Blue
    // VISION same as DATA (right vertical), COMPUTER same right as ENGINEERING but regular bottom (no bottom shift)
    positions: {
      word1: { position: "bottom-right-same-right" }, // COMPUTER (same right position, regular bottom)
      word2: { position: "right-vertical" }, // VISION
    },
    infoPosition: "bottom-left", // Default position
  },
];

const Certificates = () => {
  // Divide the whole viewport into 3 equal sections
  const sectionHeight = "33.333vh";

  return (
    <div className="absolute inset-0 w-full overflow-hidden bg-[#F5ECE1] flex flex-col justify-end" style={{ height: "100vh" }}>
      {certificates.map((cert, index) => (
        <CertificateSection 
          key={cert.id} 
          certificate={cert} 
          index={index}
          sectionHeight={sectionHeight}
        />
      ))}
    </div>
  );
};

export { Certificates };

const CertificateSection = ({
  certificate,
  index,
  sectionHeight,
}: {
  certificate: typeof certificates[0];
  index: number;
  sectionHeight: string;
}) => {
  const [word1, word2] = certificate.words;
  const { position: pos1 } = certificate.positions.word1;
  const { position: pos2 } = certificate.positions.word2;

  const getPositionClasses = (position: string) => {
    switch (position) {
      case "top-left":
        return "top-6 md:top-8 left-6 md:left-8";
      case "top-right":
        return "top-6 md:top-8 right-6 md:right-8";
      case "bottom-left":
        return "bottom-6 md:bottom-8 left-6 md:left-8";
      case "bottom-right":
        return "bottom-6 md:bottom-8 right-6 md:right-8";
      case "right-vertical":
        return "top-1/2 -translate-y-1/2 right-6 md:right-8";
      case "left-vertical":
        return "top-1/2 -translate-y-1/2 left-6 md:left-8";
      case "bottom-right-shifted":
        return "bottom-6 md:bottom-8 right-32 md:right-28";
      case "bottom-right-same-right":
        return "bottom-6 md:bottom-8 right-32 md:right-28";
      case "bottom-left-shifted":
        return "bottom-6 md:bottom-8 left-32 md:left-28";
      default:
        return "top-6 md:top-8 left-6 md:left-8";
    }
  };

  const getTextStyle = (position: string) => {
    if (position === "right-vertical" || position === "left-vertical") {
      return {
        writingMode: "vertical-rl" as const,
        textOrientation: "mixed" as const,
      };
    }
    return {};
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative w-full flex items-center justify-center"
      style={{ 
        backgroundColor: certificate.bgColor,
        height: sectionHeight,
      }}
    >


      {/* Certificate Link - Bottom position based on certificate */}
      {certificate.link && (
        <div className={`absolute bottom-6 md:bottom-8 z-10 ${(certificate as any).infoPosition === "bottom-right" ? "right-6 md:right-8" : "left-6 md:left-8"}`}>
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-[#1e140b] hover:opacity-70 transition-opacity text-xs"
          >
            <span>View Certificate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Title Words - Positioned in opposite corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* First Word */}
        <div className={`absolute ${getPositionClasses(pos1)}`}>
          <span 
            className="text-[#1e140b] font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tighter"
            style={getTextStyle(pos1)}
          >
            {word1}
          </span>
        </div>

        {/* Second Word */}
        <div className={`absolute ${getPositionClasses(pos2)}`}>
          <span 
            className="text-[#1e140b] font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tighter"
            style={getTextStyle(pos2)}
          >
            {word2}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

