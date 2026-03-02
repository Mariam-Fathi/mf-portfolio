"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const AUTO_TOUCH_DELAY_MS = 1200;
const AUTO_TOUCH_DURATION_MS = 700;
const AUTO_TOUCH_PAUSE_BETWEEN_MS = 300;

type Certificate = {
  id: string;
  title: string;
  image: string;
  platform: string;
  link: string;
  className: string;
  /** Index into CERT_CARD_COLORS. */
  colorIndex: number;
};

// Only #8A9EA7 (slate), #6A0610 (red), #1e140b (dark). Link color chosen for contrast.
const CERT_CARD_COLORS = [
  { background: "#8A9EA7", link: "#1e140b" },
  { background: "#6A0610", link: "#8A9EA7" },
  { background: "#1e140b", link: "#8A9EA7" },
] as const;

const certificates: Certificate[] = [
  {
    id: "time-series",
    title: "Time Series",
    image: "/certificates/Mariam Fathi - Time Series.png",
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
    className: "relative flex-1 min-w-0 max-w-[280px]",
    colorIndex: 2,
  },
  {
    id: "data-engineering",
    title: "Data Engineering",
    image: "/certificates/data-engineering.jpeg",
    platform: "DeepLearning.AI",
    link: "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
    className: "relative flex-1 min-w-0 max-w-[280px]",
    colorIndex: 4,
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    image: "/certificates/Mariam Fathi - Computer Vision.png",
    platform: "Kaggle",
    link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
    className: "relative flex-1 min-w-0 max-w-[280px]",
    colorIndex: 0,
  },
  {
    id: "ai-agents",
    title: "AI Agents Intensive",
    image: "/certificates/5-Day AI Agents Intensive Course with Google.png",
    platform: "Kaggle × Google",
    link: "https://www.kaggle.com/certification/badges/mariamfathiamin/105",
    className: "relative flex-1 min-w-0 max-w-[280px]",
    colorIndex: 1,
  },
  {
    id: "ieee",
    title: "IEEE Certificate",
    image: "/certificates/IEEE Certificate.jpeg",
    platform: "IEEE",
    link: "https://drive.google.com/file/d/1sMv03TTz0IQSeAaCdvyyKYXt9Jtoi5OS/view",
    className: "relative flex-1 min-w-0 max-w-[280px]",
    colorIndex: 3,
  },
];

function dispatchMouseEvent(
  el: HTMLElement,
  type: "mouseenter" | "mousemove" | "mouseleave",
  clientX: number,
  clientY: number,
) {
  el.dispatchEvent(
    new MouseEvent(type, {
      clientX,
      clientY,
      bubbles: true,
      view: window,
    }),
  );
}

const Certificates: React.FC<{ isActive?: boolean }> = ({ isActive = false }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const autoTouchTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  // When section becomes active, auto-touch each certificate (simulate mouse over each) in sequence
  useEffect(() => {
    if (!isActive) return;
    const timeouts = autoTouchTimeoutsRef.current;
    timeouts.length = 0;
    const refs = cardRefs.current;
    let i = 0;
    const step = () => {
      if (i >= refs.length) return;
      const el = refs[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        dispatchMouseEvent(el, "mouseenter", centerX, centerY);
        dispatchMouseEvent(el, "mousemove", centerX, centerY);
        timeouts.push(
          setTimeout(() => {
            dispatchMouseEvent(el, "mouseleave", centerX, centerY);
            i += 1;
            timeouts.push(setTimeout(step, AUTO_TOUCH_PAUSE_BETWEEN_MS));
          }, AUTO_TOUCH_DURATION_MS),
        );
      } else {
        i += 1;
        timeouts.push(setTimeout(step, AUTO_TOUCH_PAUSE_BETWEEN_MS));
      }
    };
    timeouts.push(setTimeout(step, AUTO_TOUCH_DELAY_MS));
    return () => timeouts.forEach(clearTimeout);
  }, [isActive]);

  const setCardRef = useCallback((index: number, el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  }, []);

  return (
    <section
      ref={sectionRef}
      className="absolute inset-0 w-full overflow-x-hidden overflow-y-visible"
      style={{ height: "100vh", backgroundColor: "#F9E7C9" }}
    >
      <DraggableCardContainer className="relative h-full w-full overflow-visible">
        <div className="absolute inset-x-0 bottom-0 px-4 pb-6 md:px-10">
          <div className="mx-auto flex w-full max-w-[1600px] flex-nowrap items-end justify-between gap-3 md:gap-4">
            {certificates.map((cert, index) => {
              const colors =
                CERT_CARD_COLORS[cert.colorIndex % CERT_CARD_COLORS.length];
              return (
                <CertificateCard
                  key={cert.id}
                  cert={cert}
                  colors={colors}
                  dragConstraintsRef={sectionRef}
                  cardRef={(el) => setCardRef(index, el)}
                />
              );
            })}
          </div>
        </div>
      </DraggableCardContainer>
    </section>
  );
};

function CertificateCard({
  cert,
  colors,
  dragConstraintsRef,
  cardRef,
}: {
  cert: Certificate;
  colors: (typeof CERT_CARD_COLORS)[number];
  dragConstraintsRef?: React.RefObject<HTMLElement | null>;
  cardRef?: (el: HTMLDivElement | null) => void;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={cert.className}>
      <DraggableCardBody
        ref={cardRef}
        className={cn(
          "!min-h-0 !w-full !max-w-none !p-0 !shadow-xl overflow-hidden rounded-md outline-none ring-0 hover:outline-none hover:ring-0 focus:outline-none focus:ring-0",
        )}
        backgroundColor={colors.background}
        dragConstraintsRef={dragConstraintsRef}
      >
        <div className="group relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-md">
          {/* {cert.link !== "#" && (
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View certificate"
              className="pointer-events-auto absolute right-2 bottom-2 z-20 inline-flex items-center justify-center rounded transition-opacity opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ color: "#280B0B" }}
            >
              <ExternalLink className="h-4 w-4" style={{ color: "#F14657" }} />
            </a>
          )} */}
          <div className="pointer-events-none select-none w-fit flex-shrink-0 opacity-100">
            <a
              href={cert.link}
              aria-hidden
              tabIndex={-1}
              className="block overflow-hidden rounded-sm focus:outline-none"
            >
              {!imgError ? (
                <img
                  src={encodeURI(cert.image)}
                  alt={cert.title}
                  onError={() => setImgError(true)}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="relative z-10 block h-auto w-auto max-h-[36vh] md:max-h-[42vh] max-w-full object-contain object-center opacity-100 visible"
                  style={{ display: "block", visibility: "visible", opacity: 1 }}
                />
              ) : (
                <div className="flex h-48 w-64 items-center justify-center" style={{ backgroundColor: colors.background }}>
                  <span className="px-4 text-center text-sm font-semibold uppercase tracking-wide" style={{ color: colors.link }}>
                    {cert.title}
                  </span>
                </div>
              )}
            </a>
          </div>
        </div>
      </DraggableCardBody>
    </div>
  );
}

export { Certificates };
