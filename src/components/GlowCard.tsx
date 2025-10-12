"use client";

import { useRef, ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  index: number;
  className?: string;
}

const GlowCard = ({ children, index, className = "" }: GlowCardProps) => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseMove =
    (index: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRefs.current[index];
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
      angle = (angle + 360) % 360;

      card.style.setProperty("--start", String(angle + 60));
    };

  const setCardRef = (el: HTMLDivElement | null) => {
    cardRefs.current[index] = el;
  };

  return (
    <div
      ref={setCardRef}
      onMouseMove={handleMouseMove(index)}
      className={`card card-border timeline-card rounded-xl p-10 mb-5 break-inside-avoid-column ${className}`}
    >
      <div className="glow"></div>
      {children}
    </div>
  );
};

export default GlowCard;