"use client";

import React, { useRef, useState } from "react";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { COLORS } from "@/components/hero/constants";

const pouitiesFont = localFont({
  src: "../../public/fonts/pouities/Pouities.ttf",
  display: "swap",
});

type Certificate = {
  id: string;
  title: string;
  image: string;
  platform: string;
  link: string;
};

const certificates: Certificate[] = [
  {
    id: "time-series",
    title: "Time Series",
    image: "/certificates/Mariam Fathi - Time Series.png",
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    image: "/certificates/data-engineering.jpeg",
    platform: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    image: "/certificates/Mariam Fathi - Computer Vision.png",
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
  },
  {
    id: "ai-agents",
    title: "AI Agents Intensive",
    image: "/certificates/5-Day AI Agents Intensive Course with Google.png",
    platform: "Kaggle × Google",
    link: "https://www.kaggle.com/certification/badges/mariamfathiamin/105",
  },
  {
    id: "ieee",
    title: "IEEE Certificate",
    image: "/certificates/IEEE Certificate.jpeg",
    platform: "IEEE",
    link: "https://drive.google.com/file/d/1sMv03TTz0IQSeAaCdvyyKYXt9Jtoi5OS/view",
  },
];

const Certificates: React.FC<{ isActive?: boolean }> = () => {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 w-full overflow-x-hidden overflow-y-visible"
      style={{ height: "100vh", backgroundColor: COLORS.heroBackground }}
    >
      <div className="absolute inset-x-0 bottom-0 px-4 pb-6 md:px-10">
        <div className="mx-auto flex w-full max-w-[1600px] flex-nowrap items-end gap-3 md:gap-4">
          {certificates.map((cert, index) => {
            const alignEnd = index % 2 === 1;
            return (
              <div
                key={cert.id}
                className={cn(
                  "flex flex-1 min-w-0 flex-col",
                  alignEnd ? "items-end" : "items-start",
                )}
              >
                <CertificateItem cert={cert} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

function CertificateItem({ cert, index }: { cert: Certificate; index: number }) {
  const [imgError, setImgError] = useState(false);
  const numberLabel = String(index + 1).padStart(2, "0");

  return (
    <article className="relative flex max-w-[280px] flex-col">
      {/* Number + View credential above */}
      <div
        className={cn(
          "flex items-center justify-start gap-2 pb-2",
          pouitiesFont.className,
        )}
      >
        <span
          className="text-sm tracking-wide md:text-base"
          style={{ color: COLORS.primary }}
        >
          {numberLabel}
        </span>
        <a
          href={cert.link}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View credential"
          className="text-sm tracking-wide underline underline-offset-2 transition-opacity hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 md:text-base"
          style={{ color: COLORS.primary }}
        >
          View credential
        </a>
      </div>

      {/* Image only — no card */}
      <a
        href={cert.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#91010F]"
        aria-label={`View ${cert.title} certificate`}
      >
        {!imgError ? (
          <img
            src={encodeURI(cert.image)}
            alt={cert.title}
            onError={() => setImgError(true)}
            loading="eager"
            decoding="async"
            className="block h-auto w-full max-h-[36vh] md:max-h-[42vh] object-contain object-center"
          />
        ) : (
          <span
            className={cn(
              "block py-8 text-center text-sm font-medium",
              pouitiesFont.className,
            )}
            style={{ color: COLORS.primary }}
          >
            {cert.title}
          </span>
        )}
      </a>
    </article>
  );
}

export { Certificates };
