'use client';

import React from "react";

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
  const homeItem = items.find((item) => item.id === homeId);
  const edgeItems = items.filter((item) => item.id !== homeId);

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="pointer-events-auto absolute left-4 top-6 flex">
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
      </div>

      <div className="pointer-events-auto absolute right-6 top-6 flex items-start justify-end gap-10 px-2">
        {edgeItems.map(({ id, label }) => {
          const isActive = id === activeId;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onNavigate(id)}
              disabled={disabled}
              className={`${edgeLinkBase} ${isActive ? "text-[#C7F284]" : ""}`}
              style={{
                writingMode: "vertical-rl",
                color: textColor,
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default NavBar;