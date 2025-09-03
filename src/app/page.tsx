"use client";
import {
  useScroll,
  useTransform,
  useMotionValueEvent,
  useSpring,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";
import { GoogleGeminiEffect } from "@/components/ui/google-gemini-effect";
import { HeroAnimation } from "@/components/ui/hero-animation";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export default function Home() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  const ref = useRef<HTMLDivElement>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const [currentStep, setCurrentStep] = useState(0);
  const [isFirstSectionEnded, setIsFirstSectionEnded] = useState(false);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
  });

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    const totalSteps = contentSteps.length;
    const step = Math.floor(latest * totalSteps);
    const safeStep = Math.min(Math.max(step, 0), totalSteps - 1);
    setCurrentStep(safeStep);
  });

  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFirstSectionEnded(!entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

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
    <HeroAnimation>
      <div
        ref={sectionRef}
        className="h-[600vh] w-full rounded-md relative pt-40 overflow-clip"
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

      <div
        className={`w-full h-full py-20 max-sm:py-32 transition-opacity duration-700 ${
          isFirstSectionEnded ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <h2 className="max-w-7xl mx-auto text-4xl md:text-5xl font-bold text-neutral-200 font-sans">
          Selected Work.
        </h2>
        <Carousel items={cards} />
      </div>
    </HeroAnimation>
  );
}

const DummyContent = () => {
  return (
    <div className="bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        adipisci sit tempora consectetur molestias cupiditate distinctio vitae
        cumque ut nobis quis exercitationem deleniti ducimus soluta facere sint,
        magni, odio sequi!
      </p>
    </div>
  );
};

const data = [
  {
    category: "Project 1",
    title: "Project Title",
    src: "/Data.png",
    content: <DummyContent />,
  },
  {
    category: "Project 2",
    title: "Project Title",
    src: "/Data.png",
    content: <DummyContent />,
  },
  {
    category: "Project 3",
    title: "Project Title",
    src: "/Data.png",
    content: <DummyContent />,
  },

  {
    category: "Project 4",
    title: "Project Title",
    src: "/Data.png",
    content: <DummyContent />,
  },
  {
    category: "Project 4",
    title: "Project Title",
    src: "/Data.png",
    content: <DummyContent />,
  },
  {
    category: "Project 5",
    title: "Project Title",
    src: "/Data.png",
    content: <DummyContent />,
  },
];
