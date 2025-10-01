'use client'

import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import TitleHeader from "@/components/TitleHeader";
import CertificateCard from "@/components/CertificateCard";

const CertificatesOption2 = () => {
    const certificates = [
        {
            certificateImage: "/images/project1.png",
            platformLogo: "/images/kaggle.svg",
            platform: "Kaggle",
            title: "Time Series",
            description: "Demonstrated expertise in designing distributed systems on AWS platform, including compute, storage, networking and database services.",
            date: "Issued Jan 2024",
            skills: ["Cloud Architecture", "AWS", "Solutions Design"]
        },
        {
            certificateImage: "/images/project2.jpeg",
            platformLogo: "/images/deeplearning.ai.svg",
            platform: "DeepLearning.AI",
            title: "Data Engineering",
            description: "Comprehensive certification covering advanced React patterns, performance optimization, and state management strategies.",
            date: "Issued Dec 2023",
            skills: ["React", "JavaScript", "Frontend"]
        },    {
            certificateImage: "/images/project1.png",
            platformLogo: "/images/kaggle.svg",
            platform: "Kaggle",
            title: "Time Series",
            description: "Demonstrated expertise in designing distributed systems on AWS platform, including compute, storage, networking and database services.",
            date: "Issued Jan 2024",
            skills: ["Cloud Architecture", "AWS", "Solutions Design"]
        },
        {
            certificateImage: "/images/project2.jpeg",
            platformLogo: "/images/deeplearning.ai.svg",
            platform: "DeepLearning.AI",
            title: "Data Engineering",
            description: "Comprehensive certification covering advanced React patterns, performance optimization, and state management strategies.",
            date: "Issued Dec 2023",
            skills: ["React", "JavaScript", "Frontend"]
        }
    ];

    // const certificates = [
    //     {
    //         title: "DeepLearning.AI Data Engineering Professional Certificate",
    //         desc: "Learn the principles of effective data engineering. Build your skills in the high-demand field of data engineering and learn how you can deliver real business value by applying a core set of principles and strategies for developing data systems.",
    //         img: "/images/project2.jpeg",
    //         authorLogo: "/images/deeplearning.ai.svg",
    //         authorName: "DeepLearning.AI",
    //         href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
    //     },
    //     {
    //         title: "Computer Vision",
    //         desc: "This course will introduce you to the fundamental ideas of computer vision. Our goal is to learn how a neural network can \"understand\" a natural image well-enough to solve the same kinds of problems the human visual system can solve.",
    //         img: "/images/project1.png",
    //         authorLogo: "/images/kaggle.svg",
    //         authorName: "Kaggle",
    //         date: "Jan 4 2022",
    //         href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
    //     },
    //     {
    //         title: "Computer Vision",
    //         desc: "This course will introduce you to the fundamental ideas of computer vision. Our goal is to learn how a neural network can \"understand\" a natural image well-enough to solve the same kinds of problems the human visual system can solve.",
    //         img: "/images/project1.png",
    //         authorLogo: "/images/kaggle.svg",
    //         authorName: "Kaggle",
    //         href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
    //     },
    //     {
    //         title: "Computer Vision",
    //         desc: "This course will introduce you to the fundamental ideas of computer vision. Our goal is to learn how a neural network can \"understand\" a natural image well-enough to solve the same kinds of problems the human visual system can solve.",
    //         img: "/images/project1.png",
    //         authorLogo: "/images/kaggle.svg",
    //         authorName: "Kaggle",
    //         href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
    //     },
    //     {
    //         title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
    //         desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
    //         img: "/images/project1.png",
    //         authorLogo: "/images/ieee.svg",
    //         authorName: "IEEE",
    //         href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
    //     }
    // ]

    const sectionRef = useRef(null);
    const rydeRef = useRef(null);
    const libraryRef = useRef(null);
    const ycDirectoryRef = useRef(null);

    useGSAP(() => {
        // Animation for the main section
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );

        // Animations for each app showcase
        const cards = [rydeRef.current, libraryRef.current, ycDirectoryRef.current];

        cards.forEach((card, index) => {
            gsap.fromTo(
                card,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    delay: 0.3 * (index + 1),
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                    },
                }
            );
        });
    }, []);


    return (
        <section id="certificates" ref={sectionRef} className="app-showcase" >
            <TitleHeader
                title="Professional Certifications & Contributions"
                sub="🎓 Certificates"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {certificates.map((cert, index) => (
                    <CertificateCard key={index} card={cert} index={index}>
                        <button className="w-full py-3  cta-button text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300">
                            View Certificate
                        </button>
                    </CertificateCard>
                ))}
            </div>
        </section>
    )
}
export default CertificatesOption2;