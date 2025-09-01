"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { projects } from "@/constants";

export default function Home() {
  return <HeroParallax projects={projects} />;
}
