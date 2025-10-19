'use client'

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);

    useGSAP(() => {
        // Hero header animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(titleRef.current,
            { 
                opacity: 0, 
                y: 80,
                filter: "blur(15px)",
                scale: 0.9
            },
            { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                scale: 1,
                duration: 1.8,
                ease: "power4.out"
            }
        )
        .fromTo(subtitleRef.current,
            { 
                opacity: 0, 
                y: 40,
                filter: "blur(12px)",
            },
            { 
                opacity: 1, 
                y: 0,
                filter: "blur(0px)",
                duration: 1.4,
                ease: "power2.out"
            },
            "-=1.2"
        );

        // Cards animation
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

        // Floating particles animation
        gsap.to(".floating-particle", {
            y: -20,
            x: 10,
            duration: 6,
            repeat: -1,
            yoyo: true,
            stagger: {
                amount: 3,
                from: "random"
            },
            ease: "sine.inOut"
        });

    }, { scope: sectionRef });

    const addToCardsRef = (el, index) => {
        if (el && !cardsRef.current.includes(el)) {
            cardsRef.current[index] = el;
        }
    };

    return (
        <section 
            id="certificates" 
            ref={sectionRef} 
            className="relative bg-black overflow-hidden py-20"
        >
            <div className="absolute inset-0 bg-black" />
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 15 }).map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle absolute w-1 h-1 bg-white/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                    />
                ))}
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-20">
                    <h2 
                        ref={titleRef}
                        className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-6 tracking-tight opacity-0"
                    >
                        CERTIFICATIONS
                    </h2>
                    <p 
                        ref={subtitleRef}
                        className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed tracking-wide opacity-0"
                    >
                        Continuous Growth Through Structured Learning
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

            <style jsx>{`
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px);
                        opacity: 0.1;
                    }
                    50% { 
                        transform: translateY(-20px) translateX(10px);
                        opacity: 0.3;
                    }
                }
                .floating-particle {
                    animation: float 8s ease-in-out infinite;
                }
            `}</style>
        </section>
    )
}

export default CertificatesOption2;