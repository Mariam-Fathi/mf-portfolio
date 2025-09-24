'use client';

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
    const counterRef = useRef<HTMLDivElement>(null);
    const numberElementsRef = useRef<(HTMLDivElement | null)[]>([]);

    useGSAP(() => {
        numberElementsRef.current.forEach((numberElement, index) => {
            if (!numberElement) return;

            const item = counterItems[index];

            // Set initial value to 0
            gsap.set(numberElement, { innerText: "0" });

            // Create the counting animation
            gsap.to(numberElement, {
                innerText: item.value,
                duration: 2.5,
                ease: "power2.out",
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: counterRef.current,
                    start: "top center",
                },
                onComplete: () => {
                    numberElement.textContent = `${item.value}${item.suffix}`;
                },
            });
        });
    }, []);

    return (
        <div id="counter" ref={counterRef} className="padding-x-lg xl:mt-0 mt-32">
            <div className="mx-auto grid-4-cols">
                {counterItems.map((item, index) => (
                    <div
                        key={index}
                        className="bg-zinc-900 rounded-lg p-10 flex flex-col justify-center"
                    >
                        <div
                            ref={(el) => {
                                numberElementsRef.current[index] = el;
                            }}
                            className="counter-number text-white-50 text-5xl font-bold mb-2"
                        >
                            0 {item.suffix}
                        </div>
                        <div className="text-white-50 text-lg">{item.label}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AnimatedCounter;