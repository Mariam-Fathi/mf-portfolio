'use client';

import React, { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type NavbarProps<T extends string> = {
  items: { id: T; label: string }[];
  homeId: T;
  activeId: T;
  onNavigate: (id: T) => void;
  disabled?: boolean;
};

const textColor = "#FEFCE0";

const edgeLinkBase =
  "uppercase tracking-[0.45em] text-[0.55rem] sm:text-xs font-semibold transition-colors duration-300 focus:outline-none";

function NavBar<T extends string>({
  items,
  homeId,
  activeId,
  onNavigate,
  disabled = false,
}: NavbarProps<T>) {
  const homeItem = useMemo(
    () => items.find((item) => item.id === homeId),
    [items, homeId]
  );
  const navItems = useMemo(
    () => items.filter((item) => item.id !== homeId),
    [items, homeId]
  );
  const isHomeActive = activeId === homeId;

  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const heroListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets =
      isHomeActive && heroListRef.current?.children
        ? Array.from(heroListRef.current.children)
        : listRef.current?.children
        ? Array.from(listRef.current.children)
        : [];

    if (!targets.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, x: isHomeActive ? 0 : 32 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.08,
        }
      );
    });

    return () => ctx.revert();
  }, [isHomeActive]);

  useEffect(() => {
    const activeIndex = navItems.findIndex((item) => item.id === activeId);
    const indicator = indicatorRef.current;

    if (!indicator) return;

    if (activeIndex === -1) {
      gsap.to(indicator, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      return;
    }

    const target = itemRefs.current[activeIndex];
    if (!target) return;

    const { offsetTop, offsetHeight } = target;
    gsap.to(indicator, {
      opacity: 1,
      y: offsetTop,
      height: offsetHeight,
      duration: 0.6,
      ease: "power3.out",
    });
  }, [activeId, navItems]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="pointer-events-auto absolute left-6 top-6 flex flex-col items-center gap-8">
        <button
          type="button"
          onClick={() => onNavigate(homeId)}
          disabled={disabled}
          className={`${edgeLinkBase} ${
            activeId === homeId ? "text-[#C7F284]" : ""
          }`}
          style={{
            writingMode: "vertical-rl",
            color: textColor,
          }}
        >
          {homeItem?.label ?? "Home"}
        </button>

        <span
          aria-hidden="true"
          className={`block h-12 w-px bg-[#FEFCE0]/40 transition-opacity duration-500 ${
            isHomeActive ? "opacity-0" : "opacity-100"
          }`}
        />

        <div
          className={`relative transition-all duration-500 ${
            isHomeActive
              ? "pointer-events-none -translate-y-2 opacity-0"
              : "pointer-events-auto translate-y-0 opacity-100"
          }`}
        >
          <div
            ref={indicatorRef}
            className="absolute left-1/2 top-0 hidden h-6 w-1 rounded-full bg-[#C7F284] opacity-0 md:block"
            style={{
              transform: "translate(-50%, 0)",
            }}
          />
          <div
            ref={listRef}
            className="flex flex-col items-center gap-6"
          >
            {navItems.map(({ id, label }, index) => {
              const isActive = id === activeId;
              return (
                <button
                  key={id}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => onNavigate(id)}
                  disabled={disabled}
                  className={`${edgeLinkBase} ${
                    isActive ? "text-[#C7F284]" : "text-[#FEFCE0]"
                  }`}
                  style={{
                    writingMode: "vertical-rl",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`pointer-events-auto absolute right-6 top-6 ${
          isHomeActive ? "flex" : "hidden"
        } items-start justify-end gap-10 px-2`}
      >
        <div
          ref={heroListRef}
          className="flex items-start justify-end gap-10 px-2"
        >
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              disabled={disabled}
              className={`${edgeLinkBase} text-[#FEFCE0]`}
              style={{
                writingMode: "vertical-rl",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default NavBar;