'use client'

import {useRef} from "react";
import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import TitleHeader from "@/components/TitleHeader";

const CertificatesOption2 = () => {

    const certificates = [
        {
            title: "DeepLearning.AI Data Engineering Professional Certificate",
            desc: "Learn the principles of effective data engineering. Build your skills in the high-demand field of data engineering and learn how you can deliver real business value by applying a core set of principles and strategies for developing data systems.",
            img: "/images/project2.jpeg",
            authorLogo: "/images/deeplearning.ai.svg",
            authorName: "DeepLearning.AI",
            href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
        },
        {
            title: "Computer Vision",
            desc: "This course will introduce you to the fundamental ideas of computer vision. Our goal is to learn how a neural network can \"understand\" a natural image well-enough to solve the same kinds of problems the human visual system can solve.",
            img: "/images/project1.png",
            authorLogo: "/images/kaggle.svg",
            authorName: "Kaggle",
            date: "Jan 4 2022",
            href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
        },
        {
            title: "Computer Vision",
            desc: "This course will introduce you to the fundamental ideas of computer vision. Our goal is to learn how a neural network can \"understand\" a natural image well-enough to solve the same kinds of problems the human visual system can solve.",
            img: "/images/project1.png",
            authorLogo: "/images/kaggle.svg",
            authorName: "Kaggle",
            href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
        },
        {
            title: "Computer Vision",
            desc: "This course will introduce you to the fundamental ideas of computer vision. Our goal is to learn how a neural network can \"understand\" a natural image well-enough to solve the same kinds of problems the human visual system can solve.",
            img: "/images/project1.png",
            authorLogo: "/images/kaggle.svg",
            authorName: "Kaggle",
            href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
        },
        {
            title: "How to Use Root C++ Interpreter Shell to Write C++ Programs",
            desc: "The powerful gravity waves resulting from the impact of the planets' moons â€” four in total â€” were finally resolved in 2015 when gravitational microlensing was used to observe the",
            img: "/images/project1.png",
            authorLogo: "/images/ieee.svg",
            authorName: "IEEE",
            href: "https://coursera.org/share/ea39681e31f9514a56a3613dee996a09"
        }
    ]

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
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {
                    certificates.map((items, key) => (
                        <article className="max-w-md mx-auto mt-4 shadow-lg border rounded-md duration-300 hover:shadow-sm card-border" key={key}>
                            <a href={items.href}>
                                <img src={items.img} loading="lazy" alt={items.title}  className="bg-black-200 w-full h-48 rounded-t-md object-contain"/>
                                <div className="flex items-center mt-2 pt-3 ml-4 mr-2 ">
                                    <div className="flex-none w-10 h-10 rounded-full">
                                        <img src={items.authorLogo} className="w-full h-full rounded-full" alt={items.authorName} />
                                    </div>
                                    <div className="ml-3">
                                        <span className="block ">{items.authorName}</span>
                                    </div>
                                </div>
                                <div className="pt-3 ml-4 mr-2 mb-3">
                                    <h3 className="text-xl ">
                                        {items.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mt-1">{items.desc}</p>
                                </div>
                            </a>
                        </article>
                    ))
                }
            </div>
        </section>
    )
}
export default CertificatesOption2;