"use client";

import { motion } from "motion/react";
import { ContainerScroll } from "./container-scroll-animation";
import { StickyScroll } from "./sticky-scroll-reveal";
import { TracingBeam } from "./tracing-beam";

export function HeroAnimation() {
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
      <div className="px-4 py-10 md:py-20">
        <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold  md:text-4xl lg:text-7xl text-slate-300">
          {"From Data to Intelligent Systems".split(" ").map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeInOut",
              }}
              className="mr-2 inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        <motion.p
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.3,
            delay: 0.8,
          }}
          className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-400"
        >
          I combine data engineering and frontend development to explore how
          patterns emerge from complexity. My goal is to advance from building
          systems that display data to designing systems that learn from it —
          developing adaptive, intelligent solutions that bridge technology and
          human insight. up.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
            delay: 1.2,
          }}
          className="relative z-10 mt-6 rounded-3xl border  p-4 shadow-md border-neutral-800 bg-neutral-900"
        >
          <div className="w-full overflow-hidden rounded-xl border border-gray-700">
            <img
              src="/MF1.png"
              alt="Landing page preview"
              className="aspect-[16/9] h-auto w-full object-cover"
              height={1000}
              width={1000}
            />
          </div>
        </motion.div>
        <TracingBeam className="w-full mt-20">
          <h1 className="text-4xl font-bold text-slate-100 ml-20 mb-20">
            {"Selected Work".split(" ").map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </h1>
          <StickyScroll content={content} />
        </TracingBeam>
      </div>
    </div>
  );
}

const Navbar = () => {
  return (
    <nav className="flex w-full items-center justify-between border-t border-b  px-4 py-4 border-neutral-800 text-white">
      <div className="flex items-center gap-2">
        <div className="size-7 rounded-full bg-gradient-to-br from-green-950 to-green-500" />
        <h1 className="text-base font-bold md:text-2xl">
          Mariam Fathi Portfolio
        </h1>
      </div>
    </nav>
  );
};

const content = [
  {
    title: "Project 1",
    description:
      "A robust ETL pipeline for data cleaning and transformation, designed to process millions of rows efficiently and provide ready-to-use datasets for analytics.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/MF2.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="ETL Pipeline Preview"
        />
      </div>
    ),
  },
  {
    title: "Project 2",
    description:
      "An interactive data visualization dashboard with live filters, built to help teams explore insights in real time.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/MF1.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Dashboard Preview"
        />
      </div>
    ),
  },
  {
    title: "Project 3",
    description:
      "Machine learning model exploration: testing supervised and unsupervised algorithms to uncover hidden data patterns and improve decision-making.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/MF3.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="ML Model Preview"
        />
      </div>
    ),
  },
  {
    title: "Project 4",
    description:
      "Human-centered design system for translating complex datasets into accessible, meaningful interfaces for non-technical users.",
    content: (
      <div className="flex h-full w-full items-center justify-center">
        <img
          src="/MF4.png"
          width={300}
          height={300}
          className="h-full w-full object-cover"
          alt="Design System Preview"
        />
      </div>
    ),
  },
];
