"use client";
import { useScroll, useTransform, useMotionValueEvent } from "motion/react";
import React, { useRef } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";

export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const [currentStep, setCurrentStep] = React.useState(0);

  // ⚡ Faster transitions → every ~10% scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) setCurrentStep(0); // 0-10%
    else if (latest < 0.2) setCurrentStep(1); // 10-20%
    else if (latest < 0.3) setCurrentStep(2); // 20-30%
    else if (latest < 0.4) setCurrentStep(3); // 30-40%
    else if (latest < 0.5) setCurrentStep(4); // 40-50%
    else setCurrentStep(5); // 50%+
  });

  const pathLengthFirst = useTransform(scrollYProgress, [0, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0, 0.8], [0, 1.2]);

  const contentSteps = [
    {
      title: "From Data to Intelligent Systems",
      description:
        "My goal is to advance from building systems that display data to designing systems that learn from it — developing adaptive, intelligent solutions that bridge technology and human insight.",
    },
    {
      title: "Transforming Insights into Action",
      description:
        "Every dataset tells a story — my focus is to decode that story and turn it into meaningful, automated outcomes that create real value.",
    },
    {
      title: "Adaptive & Human-Centered",
      description:
        "I strive to make technology feel less mechanical, crafting systems that adjust, learn, and grow with the people they serve.",
    },
    {
      title: "Building Smarter Systems",
      description:
        "The future lies in systems that understand context and continuously evolve — bridging data, intelligence, and human experience.",
    },
    {
      title: "Collaborative Intelligence",
      description:
        "Humans and machines work best together — I aim to design systems that amplify human decision-making rather than replace it.",
    },
    {
      title: "Shaping the Future",
      description:
        "Innovation is a journey — every insight, every experiment, every iteration moves us closer to building technology that feels truly alive.",
    },
  ];

  return (
    <div
      className="h-[600vh] bg-black w-full dark:border dark:border-white/[0.1] rounded-md relative pt-40 overflow-clip"
      ref={ref}
    >
      <GoogleGeminiEffect
        pathLengths={[
          pathLengthFirst,
          pathLengthSecond,
          pathLengthThird,
          pathLengthFourth,
          pathLengthFifth,
        ]}
        title={contentSteps[currentStep].title}
        description={contentSteps[currentStep].description}
      />
    </div>
  );
}
