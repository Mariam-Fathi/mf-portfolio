"use client";

import React from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const certificates = [

  {
    id: "time-series",
    title: "TIME SERIES",
    words: ["TIME", "SERIES"],
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
    // TIME left vertical (opposite of DATA), SERIES bottom-left-shifted (opposite of ENGINEERING)

    // bgColor: "#B7D9FF", // Light Blue
    textColor: "#B7D9FF", // Text color for this certificate
    bgColor: "#6B2138", // Yellow

    // TIME and SERIES horizontal as one sentence (mirrored - bottom-right)
    positions: {
      word1: { position: "top-left" },
      word2: { position: "top-left-next" }, // Next to word1 horizontally
    },
    infoPosition: "bottom-right", // Link on bottom-right
  },
  {
    id: "data-engineering",
    title: "DATA ENGINEERING",
    words: ["DATA", "ENGINEERING"],
    platform: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
    bgColor: "#B7D9FF", // Pink
    textColor: "#6B2138", // Text color for this certificate
    positions: {
      word1: { position: "top-left" },
      word2: { position: "top-left-next" }, // Next to word1 horizontally
    },
    infoPosition: "bottom-left", // Link on bottom-left
    // DATA and ENGINEERING horizontal as one sentence

  },
  {
    id: "computer-vision",
    title: "COMPUTER VISION",
    words: ["COMPUTER", "VISION"],
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
    textColor: "#B7D9FF", // Text color for this certificate
    bgColor: "#6B2138", // Yellow// Text color for this certificate

 

    // COMPUTER and VISION horizontal as one sentence (mirrored back - bottom-left)
    positions: {
      word1: { position: "top-left" },
      word2: { position: "top-left-next" }, // Next to word1 horizontally
    },
    infoPosition: "bottom-right", // Link on bottom-right (mirrored back)
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
        return "top-4 md:top-8 left-4 md:left-8";
      case "top-right":
        return "top-4 md:top-8 right-4 md:right-8";
      case "bottom-left":
        return "bottom-4 md:bottom-8 left-4 md:left-8";
      case "bottom-right":
        return "bottom-4 md:bottom-8 right-4 md:right-8";
      case "right-vertical":
        return "bottom-16 sm:bottom-20 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 right-4 md:right-8";
      case "left-vertical":
        return "bottom-16 sm:bottom-20 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 left-4 md:left-8";
      case "bottom-right-shifted":
        return "bottom-4 md:bottom-8 right-4 md:right-28";
      case "bottom-right-same-right":
        return "bottom-4 md:bottom-8 right-4 md:right-28";
      case "bottom-left-shifted":
        return "bottom-4 md:bottom-8 left-4 md:left-28";
      case "top-left-next":
        return "top-4 md:top-8 left-4 md:left-8"; // Same as top-left, will be positioned relative to word1
      default:
        return "top-4 md:top-8 left-4 md:left-8";
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

  // Determine which side to use for mobile full title (use the vertical word's side)
  const getMobileVerticalSide = () => {
    if (pos1 === "right-vertical" || pos2 === "right-vertical") {
      return "right";
    }
    if (pos1 === "left-vertical" || pos2 === "left-vertical") {
      return "left";
    }
    return "right"; // default
  };

  const mobileSide = getMobileVerticalSide();
  const fullTitle = certificate.words.join(" ");

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
        <div className={`absolute bottom-4 md:bottom-8 z-10 ${(certificate as any).infoPosition === "bottom-right" ? "right-4 md:right-8" : "left-4 md:left-8"}`}>
          <a
            href={certificate.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 hover:opacity-70 transition-opacity text-xs"
            style={{ color: certificate.textColor }}
          >
            <span>View Certificate</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      )}

      {/* Mobile: Full Title Vertical - One Side Only */}
      <div className={`absolute lg:hidden top-1/2 -translate-y-1/2 ${mobileSide === "right" ? "right-4" : "left-4"} pointer-events-none max-h-full overflow-visible`}>
        <span 
          className="font-bold text-xl sm:text-2xl uppercase tracking-tighter block"
          style={{
            color: certificate.textColor,
            writingMode: "vertical-rl" as const,
            textOrientation: "mixed" as const,
            maxHeight: "90vh",
          }}
        >
          {fullTitle}
        </span>
      </div>

      {/* Desktop: Title Words - Horizontal sentence for all certificates */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        {/* First (time-series) and third (computer-vision): bottom-left, second (data-engineering): bottom-right */}
        <div className={`absolute ${getPositionClasses(certificate.id === "data-engineering" ? "bottom-right" : "bottom-left")} flex items-center gap-2`}>
          <span 
            className="font-bold text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tighter"
            style={{
              color: certificate.textColor,
            }}
          >
            {word1}
          </span>
          <span 
            className="font-bold text-5xl lg:text-6xl xl:text-7xl uppercase tracking-tighter"
            style={{
              color: certificate.textColor,
            }}
          >
            {word2}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

