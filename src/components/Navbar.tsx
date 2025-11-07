'use client';

import React from "react";
import { navLinks } from "@/constants";

const textColor = "#FEFCE0";
const edgeBg = "rgba(8, 14, 11, 0.35)";

const edgeLinkBase =
  "uppercase tracking-[0.45em] text-[0.55rem] sm:text-xs font-semibold transition-colors duration-300";

const NavBar: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="pointer-events-auto absolute left-4 top-6 flex">
        <a
          href="#hero"
          className={`${edgeLinkBase}`}
          style={{
            writingMode: "vertical-rl",
            color: textColor,
          }}
        >
          Home
        </a>
      </div>

      <div className="pointer-events-auto absolute right-6 top-6 flex items-start justify-end gap-10 px-2">
        {navLinks.map(({ name, link }) => (
          <a
            key={link}
            href={link}
            className={`${edgeLinkBase}`}
            style={{
              writingMode: "vertical-rl",
              color: textColor,
            }}
          >
            {name}
          </a>
        ))}
      </div>

    
    </div>
  );
};

export default NavBar;