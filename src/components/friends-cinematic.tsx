"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const FriendsCinematicSection = () => {
  const containerRef = useRef(null);
  const scenesRef = useRef([]);

  useGSAP(
    () => {
      gsap.set(scenesRef.current, { opacity: 0, y: 100 });

      scenesRef.current.forEach((scene, index) => {
        if (!scene) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            markers: false,
          },
        });

        tl.to(scene, {
          opacity: 1,
          y: 0,
          duration: 1.5,
          ease: "power2.out",
        });

        tl.fromTo(
          scene.querySelector(".scene-gif"),
          {
            opacity: 0,
            scale: 0.8,
            rotation: -5,
          },
          {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.8,
            ease: "back.out(1.7)",
          },
          "-=1"
        );

        tl.fromTo(
          scene.querySelector(".scene-text"),
          {
            opacity: 0,
            x: 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 1.2,
            ease: "power2.out",
          },
          "-=1.2"
        );
      });
    },
    { scope: containerRef }
  );

  const addToRefs = (el, index) => {
    if (el && !scenesRef.current.includes(el)) {
      scenesRef.current[index] = el;
    }
  };

  return (
    <div ref={containerRef} className="relative py-20 bg-black">
      {/* Scene 1 - Ross Theorem */}
      <div
        ref={(el) => addToRefs(el, 0)}
        className="scene min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scene-gif">
              <img
                src="/images/gifs/ross-theorem.gif"
                alt="Ross proving like a theorem"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-blue-500/30"
              />
            </div>
            <div className="scene-text text-white">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                "I'll prove it like a{" "}
                <span className="text-blue-400">theorem</span>!"
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                When I first encountered the real estate dataset, my inner Ross
                kicked in. I knew there was something suspicious in those 2.2
                million records.
              </p>
              <div className="space-y-4 text-lg">
                <p className="flex items-center text-gray-400">
                  <span className="text-blue-400 mr-3 bg-blue-400 w-2 h-2 rounded-full animate-pulse"></span>
                  <span>Methodical data investigation</span>
                </p>
                <p className="flex items-center text-gray-400">
                  <span className="text-blue-400 mr-3 bg-blue-400 w-2 h-2 rounded-full animate-pulse"></span>
                  <span>Statistical hypothesis testing</span>
                </p>
                <p className="flex items-center text-gray-400">
                  <span className="text-blue-400 mr-3 bg-blue-400 w-2 h-2 rounded-full animate-pulse"></span>
                  <span>Evidence-based conclusions</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scene 2 - Chandler Revelation */}
      <div
        ref={(el) => addToRefs(el, 1)}
        className="scene min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scene-text text-white order-2 lg:order-1">
              <div className="text-center lg:text-left mb-8">
                <div className="text-8xl lg:text-9xl font-bold text-red-400 mb-4">
                  38%
                </div>
                <div className="text-2xl lg:text-3xl text-gray-300">
                  of records contained anomalies
                </div>
              </div>
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                "This is too much{" "}
                <span className="text-red-400">information</span>!"
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                The numbers didn't lie. 38.19% of the dataset was compromised -
                734,297 placeholder dates, 115,872 duplicate prices, 57,930
                suspicious patterns.
              </p>
            </div>
            <div className="scene-gif order-1 lg:order-2">
              <img
                src="/images/gifs/chandler-too-much.gif"
                alt="Chandler being Chandler"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-red-500/30"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scene 3 - Monica Clean */}
      <div
        ref={(el) => addToRefs(el, 2)}
        className="scene min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scene-gif">
              <img
                src="/images/gifs/monica-clean.gif"
                alt="Monica cleaning and organizing"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-green-500/30"
              />
            </div>
            <div className="scene-text text-white">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                Memory <span className="text-green-400">Optimization</span>{" "}
                Revolution
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                I attacked the memory issues. The dataset was consuming
                resources inefficiently, slowing down analysis.
              </p>
              <div className="space-y-4 text-lg">
                <p className="flex items-center text-gray-400">
                  <span className="text-green-400 mr-3 bg-green-400 w-2 h-2 rounded-full animate-pulse"></span>
                  <span>87% memory usage reduction</span>
                </p>
                <p className="flex items-center text-gray-400">
                  <span className="text-green-400 mr-3 bg-green-400 w-2 h-2 rounded-full animate-pulse"></span>
                  <span>3.2x faster processing</span>
                </p>
                <p className="flex items-center text-gray-400">
                  <span className="text-green-400 mr-3 bg-green-400 w-2 h-2 rounded-full animate-pulse"></span>
                  <span>Efficient data structures</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        ref={(el) => addToRefs(el, 3)}
        className="scene min-h-screen flex items-center justify-center py-20"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="scene-text text-white order-2 lg:order-1">
              <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                <span className="text-purple-400">UNAGI!</span>
              </h2>
              <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
                The real engineering work happens long before the machine
                learning models - it's in the data pipelines that feed them.
                Confronted with this "garbage in, garbage out" principle on a
                massive scale, I understood that architecting a pipeline to
                clean, validate, and prepare this messy, real-world data was not
                a preliminary step—it was the core of the problem.
              </p>
            </div>
            <div className="scene-gif order-1 lg:order-2">
              <img
                src="/images/gifs/friends-success.gif"
                alt="Friends celebrating success"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-purple-500/30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendsCinematicSection;
