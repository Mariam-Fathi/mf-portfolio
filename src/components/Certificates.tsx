"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CertificatesSection = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  const dotsRef = useRef([]);

  const certificates = [
    {
      id: 1,
      title: "Data Engineering",
      platform: "DeepLearning.AI & AWS",
      level: "Professional",
      image: "/images/certificates/data-engineering.jpeg",
      skills: [
        "Data Pipeline",
        "ETL Processes",
        "Data Warehousing",
        "Apache Airflow",
      ],
      link: "https://www.coursera.org/account/accomplishments/verify/Z57B0DTSERJK?utm_product=course",
    },
    {
      id: 2,
      title: "Time Series Analysis",
      platform: "Kaggle",
      level: "Intermediate",
      image: "/images/certificates/time-series.png",
      skills: ["ARIMA Models", "Forecasting", "Anomaly Detection", "LSTNet"],
      link: "https://www.kaggle.com/learn/certification/mariamfathiamin/time-series",
    },
    {
      id: 3,
      title: "Computer Vision",
      platform: "Kaggle",
      level: "Intermediate",
      image: "/images/certificates/computer-vision.png",
      skills: [
        "Neural Networks",
        "Model Evaluation",
        "Feature Engineering",
        "Hyperparameter Tuning",
      ],
      link: "https://www.kaggle.com/learn/certification/mariamfathiamin/computer-vision",
    },
  ];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        titleRef.current,
        {
          opacity: 0,
          y: 50,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.5,
          ease: "power2.out",
        }
      );

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 60,
            scale: 0.9,
            rotationY: 15,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            delay: index * 0.2,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        gsap.fromTo(
          dot,
          {
            scale: 0,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 0.3,
            duration: 0.8,
            delay: index * 0.1,
            ease: "elastic.out(1, 0.5)",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 70%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      dotsRef.current.forEach((dot, index) => {
        if (!dot) return;

        gsap.to(dot, {
          y: -20,
          duration: 4 + index * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      });
    },
    { scope: containerRef }
  );

  const addCardRef = (el, index) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current[index] = el;
    }
  };

  const addDotRef = (el, index) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current[index] = el;
    }
  };

  return (
    <div
      id="certificates"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden py-20"
    >
      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto w-full">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-16 tracking-tight opacity-0"
        >
          CERTIFICATIONS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              ref={(el) => addCardRef(el, index)}
              className="bg-black backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-400/30 hover:border-gray-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-gray-500/20 group opacity-0"
            >
              <div className="relative overflow-hidden h-48">
                <img
                  src={cert.image}
                  alt={`${cert.title} Certificate`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    View Certificate
                  </a>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                  <span className="text-xs font-medium bg-gray-500/20 text-gray-300 px-2 py-1 rounded">
                    {cert.level}
                  </span>
                </div>

                <p className="text-gray-300 text-sm font-medium text-left">
                  {cert.platform}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .floating-dot {
          animation: certificatesFloat 8s ease-in-out infinite;
        }

        @keyframes certificatesFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-20px) translateX(8px);
            opacity: 0.6;
          }
          66% {
            transform: translateY(15px) translateX(-8px);
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default CertificatesSection;
