"use client";

import React from "react";
import { ExternalLink } from "lucide-react";

import {
  StickyScroll,
  type StickyScrollContentItem,
} from "@/components/ui/sticky-scroll-reveal";
import { cn } from "@/lib/utils";

type CertificatePlatform = {
  logo: string;
  educator: string;
};

type Certificate = {
  title: string;
  level: string;
  platform: CertificatePlatform[];
  certificateImage: string;
  link?: string;
  description: string;
  gradient: string;
  backgroundColor: string;
};

const certificates: Certificate[] = [
  {
    title: "DeepLearning.AI Data Engineering Specialization",
    level: "Professional",
    platform: [
      { logo: "/images/certificates/deeplearning.ai.jpeg", educator: "DeepLearning.AI" },
      { logo: "/images/certificates/aws.jpg", educator: "AWS" },
    ],
    certificateImage: "/images/certificates/data-engineering.jpg",
    link:
      "https://www.coursera.org/account/accomplishments/specialization/K9DJQ1VGKWTR",
    description:
      "Completed the full DeepLearning.AI data engineering path, building production-grade data pipelines, lakehouse architectures, and ML-ready datasets with AWS tooling.",
    gradient: "linear-gradient(to bottom right, #0ea5e9, #10b981)",
    backgroundColor: "#0f172a",
  },
  {
    title: "Time Series Analysis",
    level: "Intermediate",
    platform: [
      { logo: "/images/certificates/kaggle-logo.png", educator: "Kaggle" },
    ],
    certificateImage: "/images/certificates/time-series.png",
    link: "https://www.kaggle.com/learn/certification/your-certificate",
    description:
      "Harnessed forecasting techniques, feature engineering, and model evaluation patterns tailored for temporal data challenges in Kaggle's hands-on lab environment.",
    gradient: "linear-gradient(to bottom right, #6366f1, #22d3ee)",
    backgroundColor: "#111827",
  },
  {
    title: "Computer Vision",
    level: "Intermediate",
    platform: [{ logo: "/images/kaggle.svg", educator: "Kaggle" }],
    certificateImage: "/images/certificates/computer-vision.png",
    link: "https://coursera.org/share/your-ml-certificate",
    description:
      "Strengthened multi-modal ML skills by deploying convolutional pipelines, augmentation strategies, and interpretability workflows that powered my graduation project.",
    gradient: "linear-gradient(to bottom right, #f97316, #eab308)",
    backgroundColor: "#171717",
  },
];

const certificateContent: StickyScrollContentItem[] = certificates.map(
  (certificate) => ({
    title: certificate.title,
    description: certificate.description,
    gradient: certificate.gradient,
    backgroundColor: certificate.backgroundColor,
    content: (
      <article className="relative flex h-full w-full flex-col overflow-hidden rounded-md">
        <img
          src={certificate.certificateImage}
          alt={`${certificate.title} certificate`}
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
        />


       
      </article>
    ),
  }),
);

export const CertificatesStickyScroll = () => {
  return (
    <section
      id="certificates"
      className="w-full py-16"
    >
      <div className="mx-auto max-w-6xl px-6">
        <StickyScroll
          content={certificateContent}
          contentClassName="h-64 w-96"
          containerClassName="h-[32rem] bg-slate-950/40"
          hideScrollbar
        />
      </div>
    </section>
  );
};

export default CertificatesStickyScroll;

