"use client";

import { ReactNode } from "react";

export function HeroAnimation({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
      <Navbar />
      <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-800/80">
        <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b  px-4 py-4 border-neutral-800 text-white">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-green-950 to-green-500" />
        <h1 className="text-base font-bold md:text-2xl">Mariam Fathi</h1>
      </div>
    </nav>
  );
};
