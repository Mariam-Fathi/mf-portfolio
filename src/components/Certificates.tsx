'use client'

import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import TitleHeader from "@/components/TitleHeader";
import CertificateCard from "@/components/CertificateCard";

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
            certificateImage: "/images/data-engineering-certificate.jpg",
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
            certificateImage: "/images/time-series-certificate.jpg",
            link: 'https://www.kaggle.com/learn/certification/your-certificate',
            description: 'Applied time series analysis techniques to real-world datasets, focusing on temporal pattern recognition and forecasting. This knowledge was crucial for my work on behavioral modeling and recommendation systems.'
        },
        {
            platform: [
                {logo:"/images/deeplearning.ai.svg", educator:"DeepLearning.AI"}
            ],
            title: "Machine Learning Specialization",
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
            certificateImage: "/images/ml-specialization-certificate.jpg",
            link: 'https://coursera.org/share/your-ml-certificate',
            description: 'Built a strong foundation in machine learning principles and practices. Learned to implement and optimize various algorithms, which directly informed my graduation project on multimodal personality analysis.'
        },

    ];

    const sectionRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1.5, ease: "power2.out" }
        );

        // Stagger animation for certificate cards
        gsap.fromTo(
            ".certificate-card",
            {
                y: 50,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: ".certificates-grid",
                    start: "top 80%",
                },
            }
        );
    }, []);

    return (
        <section id="certificates" ref={sectionRef} className="app-showcase">
            <TitleHeader
                title="Learning Journey & Certifications"
                sub="📚 Continuous Growth"
            />
            <div className="certificates-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6 mt-10">
                {certificates.map((cert, index) => (
                    <div key={index} className="certificate-card">
                        <CertificateCard card={cert} index={index} />
                    </div>
                ))}
            </div>
        </section>
    )
}

export default CertificatesOption2;