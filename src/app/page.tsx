"use client";

import { HeroParallax } from "@/components/ui/hero-parallax";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { projects } from "@/constants";

export default function Home() {
  return (
    <TracingBeam>
      <HeroParallax projects={projects} />
    </TracingBeam>
  );
}
