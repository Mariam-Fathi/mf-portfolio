'use client'

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "@/components/TitleHeader";
import CertificateCard from "@/components/CertificateCard";

gsap.registerPlugin(ScrollTrigger);

const CertificatesOption2 = () => {
    const certificates = [
        {
            platform: [
                {logo:"/images/deeplearning.ai.svg", educator:"DeepLearning.AI"},
                {logo:"/images/kaggle.svg", educator:"AWS"}
            ],
            title: "Data Engineering",
            skills: [
                "Data Pipeline Design",
                "Data Modeling",
                "ETL Processes",
                "Data Warehousing",
                "Data Architecture",
                "Apache Airflow",
                "Data Quality",
                "Big Data Processing"
            ],
            level: "Professional",
            type: "Professional Certificate",
            certificateImage: "/images/project2.jpeg",
            link: 'https://coursera.org/share/your-certificate-link',
            description: 'Mastered the complete data engineering lifecycle from ingestion to consumption. Learned to design scalable data pipelines, implement ETL processes, and build robust data architectures that power intelligent systems.'
        },
        {
            platform: [
                {logo:"/images/kaggle.svg", educator:"Kaggle"}
            ],
            title: "Time Series Analysis",
            skills: [
                "LSTNet",
                "ARIMA Models",
                "Seasonal Decomposition",
                "Feature Engineering",
                "Multivariate Analysis",
                "Forecasting",
                "Anomaly Detection"
            ],
            level: "Intermediate",
            certificateImage: "/images/project1.png",
            link: 'https://www.kaggle.com/learn/certification/your-certificate',
            description: 'Applied time series analysis techniques to real-world datasets, focusing on temporal pattern recognition and forecasting. This knowledge was crucial for my work on behavioral modeling and recommendation systems.'
        },
        {
            platform: [
                {logo:"/images/kaggle.svg", educator:"Kaggle"}
            ],
            title: "Computer Vision",
            skills: [
                "Neural Networks",
                "Model Evaluation",
                "Feature Engineering",
                "Hyperparameter Tuning",
                "Ensemble Methods",
                "Cross-Validation",
                "Bias-Variance Tradeoff"
            ],
            level: "Intermediate",
            certificateImage: "/images/project1.png",
            link: 'https://coursera.org/share/your-ml-certificate',
            description: 'Built a strong foundation in machine learning principles and practices. Learned to implement and optimize various algorithms, which directly informed my graduation project on multimodal personality analysis.'
        },
    ];

    const sectionRef = useRef(null);
    const cardsRef = useRef([]);

    useGSAP(() => {
        gsap.fromTo(sectionRef.current,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        gsap.fromTo(cardsRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                scrollTrigger: {
                    trigger: cardsRef.current[0],
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                }
            }
        );

    }, { scope: sectionRef });

    const addToCardsRef = (el, index) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };

    return (
        <section id="certificates" ref={sectionRef} className="py-16 bg-black">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <TitleHeader
                    title="Learning Journey & Certifications"
                    sub="Continuous Growth Through Structured Learning"
                />
                
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((cert, index) => (
                        <div 
                            key={index} 
                            ref={el => addToCardsRef(el, index)}
                            className="certificate-card"
                        >
                            <CertificateCard card={cert} index={index} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CertificatesOption2;