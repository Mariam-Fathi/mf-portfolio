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

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest < 0.1) setCurrentStep(0);
    else if (latest < 0.2) setCurrentStep(1);
    else if (latest < 0.3) setCurrentStep(2);
    else setCurrentStep(3);
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
        "I began my career as a software engineer, focused on building reliable systems and scalable solutions. More recently, I’ve shifted toward data engineering — designing the pipelines that power decision-making — and I’m now eager to move from managing data to creating systems that learn from it.",
    },
    {
      title: "Driven by Curiosity",
      description:
        "Since childhood, I’ve been fascinated by understanding how things work — first through psychology and the human mind, and later through technology. Over time, I realized that my real passion lies in uncovering patterns, whether in human behavior or in the data that shapes our world.",
    },
    {
      title: "From Data to Insight",
      description:
        "My engineering background taught me to value precision and structure, but I’ve learned to look beyond the technical. To me, data is not just a resource — it is a narrative, full of hidden relationships and opportunities for innovation. My natural tendency to think deeply drives me to explore not just 'what' happens, but 'why.'",
    },
    {
      title: "Shaping the Future of AI",
      description:
        "Alongside my current work, I am actively studying deep learning through DeepLearning.AI courses. My goal is to bridge software engineering, data engineering, and AI research — creating systems that are not only technically robust but also trustworthy, transparent, and impactful for society.",
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
