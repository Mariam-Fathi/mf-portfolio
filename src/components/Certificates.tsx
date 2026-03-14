"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { COLORS } from "@/components/hero/constants";

type Certificate = {
  id: string;
  title: string;
  image: string;
  platform: string;
  link: string;
};

const certificates: Certificate[] = [

  {
    id: "data-engineering",
    title: "Data Engineering",
    image: "/certificates/data-engineering.jpeg",
    platform: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
  },
  {
    id: "ai-agents",
    title: "AI Agents Intensive",
    image: "/certificates/5-Day AI Agents Intensive Course with Google.png",
    platform: "Kaggle × Google",
    link: "https://www.kaggle.com/certification/badges/mariamfathiamin/105",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    image: "/certificates/Mariam Fathi - Computer Vision.png",
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
  },
  {
    id: "time-series",
    title: "Time Series",
    image: "/certificates/Mariam Fathi - Time Series.png",
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
  },
  {
    id: "ieee",
    title: "IEEE Certificate",
    image: "/certificates/IEEE Certificate.jpeg",
    platform: "IEEE",
    link: "https://drive.google.com/file/d/1sMv03TTz0IQSeAaCdvyyKYXt9Jtoi5OS/view",
  },
];

/** Exported for preloading certificate images from the main page. */
export const CERTIFICATE_IMAGE_URLS = certificates.map((c) => c.image);

const FolderIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
    <path
      d="M1 3.5a.5.5 0 01.5-.5H5l1.5 2H12.5a.5.5 0 01.5.5V11a.5.5 0 01-.5.5h-11A.5.5 0 011 11V3.5z"
      fill="currentColor"
    />
  </svg>
);

function CertDirItem({
  cert,
  index,
  isSelected,
  onSelect,
}: {
  cert: Certificate;
  index: number;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const folderLabel = `${String(index + 1).padStart(2, "0")}_${cert.id}`;
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2 py-0.5 cursor-pointer group  transition-all duration-100",
        isSelected ? "bg-[#1a1a1a] text-[#e8e0cc]" : "hover:bg-[#1a1a1a]/40",
      )}
      style={{ paddingLeft: "8px" }}
      onClick={onSelect}
    >
      <span className={isSelected ? "text-[#c8b97a]" : "text-[#8a7a5a]"}>
        <FolderIcon />
      </span>
      <span
        className={cn(
          "text-[11px] leading-relaxed font-sans",
          isSelected ? "text-[#e8e0cc]" : "text-[#2a2a2a]",
        )}
      >
        {folderLabel}
      </span>
    </div>
  );
}

const Certificates: React.FC<{ isActive?: boolean }> = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const cert = certificates[selectedIndex];

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-full flex flex-col md:flex-row p-0 font-sans min-h-0"
      style={{ background: COLORS.heroBackground }}
    >
      {/* Sidebar + main (frame is in AppWindowLayout) */}
      <div className="flex flex-col md:flex-row flex-1 min-h-0 w-full" style={{ minHeight: "320px" }}>
          {/* Sidebar — certificate list */}
          <div
            className="w-full md:w-[240px] border-b md:border-b-0 md:border-r-2 border-[#2a2a2a] flex flex-col"
            style={{ background: COLORS.heroBackground }}
          >
            <div className="flex-1 overflow-y-auto py-2 no-visible-scrollbar">
              <div className="px-2 pb-1">
                <span
                  className="text-[10px] font-bold tracking-widest uppercase"
                  style={{ color: COLORS.accent }}
                >
                  Certificates
                </span>
              </div>
              {certificates.map((c, i) => (
                <CertDirItem
                  key={c.id}
                  cert={c}
                  index={i}
                  isSelected={selectedIndex === i}
                  onSelect={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Main Content — selected certificate */}
          <div className="flex-1 flex flex-col min-h-[400px]">
            {cert && (
              <>
                {/* Channel-style header */}
                <div
                  className="border-b-2 border-[#2a2a2a] px-4 md:px-5 py-2.5 flex items-center justify-between flex-wrap gap-2"
                  style={{ background: COLORS.heroBackground }}
                >
                  <div className="flex items-center gap-2">
                    <span
                        className="text-[11px] leading-relaxed"
                        style={{ color: COLORS.primary }}
                    >
                      # {cert.title} - {cert.platform}
                    </span>
            
                  </div>
                  <span className="text-[11px]" style={{ color: COLORS.accent }}>
                    
                  </span>
                </div>

                {/* Content: image */}
                <div
                  className="flex-1 overflow-y-auto px-4 md:px-5 py-4 space-y-4 no-visible-scrollbar"
                  style={{ background: COLORS.heroBackground }}
                >
                  <div className="flex gap-3">
              
                    <div className="flex-1">
                      <div className="w-full max-w-[420px] space-y-2">
                        <CertificateImage cert={cert} />
                        <a
                          href={cert.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 border rounded-sm px-2.5 py-1.5 cursor-pointer hover:opacity-90 transition-all duration-150 w-full justify-center"
                          style={{
                            background: COLORS.heroBackground,
                            borderColor: COLORS.accent,
                            boxShadow: `2px 2px 0 ${COLORS.accent}`,
                          }}
                        >
                          <span className="text-[10px] font-sans" style={{ color: COLORS.primary }}>
                            View credential
                          </span>
                          <span className="text-[10px]" style={{ color: COLORS.accent }}>↗</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer bar */}
                <div
                  className="border-t-2 border-[#2a2a2a] px-4 py-2.5 flex items-center justify-between"
                  style={{ background: COLORS.heroBackground }}
                >
                  <span
                    className="text-[10px] font-sans"
                    style={{ color: "#8a7a5a" }}
                  >
                  </span>
                  <span
                    className="text-[9px] font-sans"
                    style={{ color: "#8a7a5a" }}
                  >
                    {String(selectedIndex + 1).padStart(2, "0")} /{" "}
                    {String(certificates.length).padStart(2, "0")}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
    </section>
  );
};

function CertificateImage({ cert }: { cert: Certificate }) {
  const [imgError, setImgError] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <a
      href={cert.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#91010F]"
      aria-label={`View ${cert.title} certificate`}
    >
      {!imgError ? (
        <span
          className="relative inline-block w-full max-w-[420px] rounded-sm border-2 border-[#2a2a2a] overflow-hidden mx-auto align-top"
          style={{ boxShadow: "3px 3px 0 #1a1a1a" }}
        >
          <Image
            src={encodeURI(cert.image)}
            alt={cert.title}
            width={420}
            height={560}
            sizes="(max-width: 768px) 80vw, 420px"
            className={cn(
              "block w-full h-auto object-contain object-center transition-opacity duration-300",
              imgLoaded ? "opacity-100" : "opacity-0",
            )}
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            loading="lazy"
          />
          {!imgLoaded && (
            <span
              className="absolute inset-0 animate-pulse opacity-60"
              style={{ backgroundColor: COLORS.heroBackground }}
              aria-hidden
            />
          )}
        </span>
      ) : (
        <span
          className="block py-6 text-center text-[11px] font-sans font-medium rounded-sm border border-[#2a2a2a]"
          style={{ color: COLORS.primary, background: COLORS.heroBackground }}
        >
          {cert.title}
        </span>
      )}
    </a>
  );
}

export { Certificates };
