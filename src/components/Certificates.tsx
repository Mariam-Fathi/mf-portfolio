"use client";

import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";

gsap.registerPlugin(ScrollTrigger);

const CertificatesSection = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

  const certificates = [
    {
      id: 1,
      title: "Data Engineering",
      medium: "Specialization",
      institution: "DeepLearning.AI × AWS",
      year: "2024",
      summary:
        "A systems view into orchestrating resilient data pipelines, automations, and monitoring for production AI workloads.",
      image: "/images/certificates/data-engineering.jpeg",
      link: "https://www.coursera.org/account/accomplishments/verify/Z57B0DTSERJK?utm_product=course",
    },
    {
      id: 2,
      title: "Time Series Analysis",
      medium: "Certification",
      institution: "Kaggle",
      year: "2023",
      summary:
        "Forecasting, signal decomposition, and anomaly detection learned through competition-grade notebooks and applied playbooks.",
      image: "/images/certificates/time-series.png",
      link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
    },
    {
      id: 3,
      title: "Computer Vision",
      medium: "Certification",
      institution: "Kaggle",
      year: "2023",
      summary:
        "From convolutional intuition to deployment nuance—training, evaluating, and tuning models to see like we do.",
      image: "/images/certificates/computer-vision.png",
      link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
    },
  ];

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;

      const mm = gsap.matchMedia();

      const fadeIn = gsap.fromTo(
        containerRef.current,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      mm.add("(min-width: 768px)", () => {
        const slides = slidesRef.current.filter(Boolean) as HTMLDivElement[];
        if (!slides.length) return;

        const horizontalTween = gsap.to(trackRef.current, {
          xPercent: -100 * (slides.length - 1),
          ease: "none",
        });

        const trackTrigger = ScrollTrigger.create({
          id: "certificates-track",
          trigger: containerRef.current!,
          start: "top top",
          end: () => "+=" + containerRef.current!.offsetWidth * (slides.length - 0.3),
          scrub: 0.75,
          pin: true,
          anticipatePin: 1,
          snap: {
            snapTo: (value) => {
              const step = 1 / (slides.length - 1);
              return Math.round(value / step) * step;
            },
            duration: { min: 0.2, max: 0.5 },
            ease: "power1.out",
          },
          animation: horizontalTween,
        });

        slides.forEach((slide) => {
          gsap.fromTo(
            slide,
            { opacity: 0, y: 80, scale: 0.95 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: slide,
                containerAnimation: horizontalTween,
                start: "left center",
              },
            }
          );
        });

        return () => {
          horizontalTween.kill();
          trackTrigger.kill();
        };
      });

      return () => {
        fadeIn.kill();
        mm.revert();
        slidesRef.current = [];
      };
    },
    { scope: containerRef }
  );

  const addSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (!el) return;
    slidesRef.current[index] = el;
  };

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden py-24 md:py-32"
      style={{
        backgroundImage: 'url("/images/certificates/bg.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/70 to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-12 px-6 md:px-12">
        <div className="pt-6 text-left">
          <span className="text-xs uppercase tracking-[0.55em] text-white/60">
            Curated Proof
          </span>
          <h2 className="mt-4 text-4xl md:text-6xl font-light uppercase tracking-[0.3em] text-white">
            Certificates Gallery
          </h2>
        </div>

        <div className="relative md:h-[80vh]">
          <div
            ref={trackRef}
            id="certificates-track"
            className="flex flex-col gap-10 md:flex-row md:flex-nowrap md:gap-0"
          >
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                ref={(el) => addSlideRef(el, index)}
                className="certificate-slide relative flex min-h-[70vh] shrink-0 flex-col justify-center md:min-h-[80vh] md:w-screen md:flex-row md:items-center"
              >
                <div className="flex w-full flex-col items-center gap-10 md:flex-row md:gap-20 md:px-24">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-full max-w-md overflow-hidden rounded-[28px] border border-white/20 bg-black/50 shadow-[0_50px_120px_rgba(0,0,0,0.65)] transition-transform duration-500 hover:-translate-y-4"
                  >
                    <div className="pointer-events-none absolute inset-0 z-10 border-[14px] border-[#b9935d]/70" />
                    <img
                      src={cert.image}
                      alt={`${cert.title} certificate`}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    <div className="absolute top-6 right-6 z-20 flex size-12 items-center justify-center rounded-full border border-white/40 bg-black/60 text-white transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1">
                      <ArrowUpRight className="size-4" />
                    </div>
                  </a>

                  <div className="max-w-lg text-left">
                    <p className="text-sm uppercase tracking-[0.45em] text-[#d4c488]">
                      {cert.medium} • {cert.year}
                    </p>
                    <h3 className="mt-3 text-3xl md:text-4xl font-semibold text-white">
                      {cert.title}
                    </h3>
                    <p className="mt-2 text-base text-white/70">{cert.institution}</p>
                    <p className="mt-6 text-lg leading-relaxed text-white/75">
                      {cert.summary}
                    </p>
                    <div className="mt-10 h-px w-28 bg-gradient-to-r from-[#d4c488] to-transparent" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
