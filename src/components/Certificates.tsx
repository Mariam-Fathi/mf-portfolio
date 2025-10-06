'use client'

import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import TitleHeader from "@/components/TitleHeader";
import CertificateCard from "@/components/CertificateCard";

const CertificatesOption2 = () => {
    const certificates = [
        {
            platform:  [{logo:"/images/kaggle.svg", educator:"AWS"}, {logo:"/images/deeplearning.ai.svg", educator:"DeepLearning.AI"}],
            title: "Data Engineering",
            skills: ["Apache Airflow", "Data Modeling", "Data Pipelines", "Data Storage", "Data Architecture", "Requirements Analysis", "Data Processing", "Data..."],
            level: "Intermediate",
            type: "Professional Certificate",
            certificateImage: "/images/project2.jpeg",
            link: 'https://coursera.org/share/ea39681e31f9514a56a3613dee996a09',
            description:'Learn the principles of effective data engineering. Build your skills in the high-demand field of data engineering and learn how you can deliver real business value by applying a core set of principles and strategies for developing data systems.'
        },
        {
            platform:  [{logo:"/images/kaggle.svg", educator:"kaggle"}],
            title: "Time Series",
            skills: ["Apache Airflow", "Data Modeling", "Data Pipelines", "Data Storage", "Data Architecture", "Requirements Analysis", "Data Processing", "Data..."],
            level: "Intermediate",
            certificateImage: "/images/project1.png",
            link: 'https://coursera.org/share/ea39681e31f9514a56a3613dee996a09',
            description:'Learn the principles of effective data engineering. Build your skills in the high-demand field of data engineering and learn how you can deliver real business value by applying a core set of principles and strategies for developing data systems.'
        },
        {
            platform:  [{logo:"/images/kaggle.svg", educator:"kaggle"}],
            title: "Time Series",
            skills: ["Apache Airflow", "Data Modeling", "Data Pipelines", "Data Storage", "Data Architecture", "Requirements Analysis", "Data Processing", "Data..."],
            level: "Intermediate",
            certificateImage: "/images/project1.png",
            link: 'https://coursera.org/share/ea39681e31f9514a56a3613dee996a09',
            description:'Learn the principles of effective data engineering. Build your skills in the high-demand field of data engineering and learn how you can deliver real business value by applying a core set of principles and strategies for developing data systems.'
        },
    ];

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
                title="Certifications & Contributions"
                sub="🎓 Certificates"
            />
            <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {certificates.map((cert, index) => (
                    <CertificateCard key={index} card={cert} index={index}>

                    </CertificateCard>
                ))}
            </div>
        </section>
    )
}
export default CertificatesOption2;