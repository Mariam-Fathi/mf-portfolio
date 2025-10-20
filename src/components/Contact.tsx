"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Linkedin, Github, Mail, Phone, MessageCircle } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaggle } from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const couchRef = useRef(null);
  const dotsRef = useRef([]);
  const gifRef = useRef(null);
  const socialGridRef = useRef(null);
  const ctaRef = useRef(null);

  const contactInfo = {
    email: "mariam.fathi.siam@outlook.com",
    phone: "+201020103227",
    linkedin: "https://linkedin.com/in/mariam-fathi-siam",
    github: "https://github.com/Mariam-Fathi",
    kaggle: "https://www.kaggle.com/mariamfathiamin",
  };

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
        couchRef.current,
        {
          scale: 0,
          opacity: 0,
          rotation: -10,
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 2,
          ease: "back.out(1.7)",
        }
      );

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
        },
        "-=1.5"
      );

      tl.fromTo(
        gifRef.current,
        {
          opacity: 0,
          scale: 0.8,
          rotation: -5,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          filter: "blur(0px)",
          duration: 1.8,
          ease: "back.out(1.7)",
        },
        "-=1"
      );

      gsap.fromTo(
        ".social-item",
        {
          opacity: 0,
          y: 20,
          rotationY: 90,
        },
        {
          opacity: 1,
          y: 0,
          rotationY: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: socialGridRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      gsap.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -10,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

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
            opacity: 0.4,
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
          y: -15,
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

  const addDotRef = (el, index) => {
    if (el && !dotsRef.current.includes(el)) {
      dotsRef.current[index] = el;
    }
  };

  const handleWhatsAppRedirect = () => {
    const message =
      "Hello Mariam! I came across your portfolio and would like to connect with you.";
    const whatsappUrl = `https://wa.me/${contactInfo.phone.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const socialLinks = [
    {
      name: "Email",
      icon: Mail,
      url: `mailto:${contactInfo.email}?subject=Connecting from your portfolio&body=Hello Mariam,`,
      color: "bg-blue-900/80",
      hover: "hover:bg-blue-800/80",
    },
    {
      name: "Phone",
      icon: Phone,
      url: `tel:${contactInfo.phone}`,
      color: "bg-teal-900/80",
      hover: "hover:bg-teal-800/80",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: contactInfo.linkedin,
      color: "bg-blue-700/80",
      hover: "hover:bg-blue-600/80",
    },
    {
      name: "GitHub",
      icon: Github,
      url: contactInfo.github,
      color: "bg-gray-800/80",
      hover: "hover:bg-gray-700/80",
    },
    {
      name: "Kaggle",
      icon: faKaggle,
      url: contactInfo.kaggle,
      color: "bg-cyan-600/80",
      hover: "hover:bg-teal-700/80",
    },
  ];

  return (
    <div
      id="contact"
      ref={containerRef}
      className="relative flex items-center justify-center bg-black overflow-hidden pt-20 max-sm:py-0"
    >
      <div
        ref={couchRef}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-0 opacity-0"
      >
        <div className="text-yellow-400/20 text-8xl lg:text-9xl">🛋️</div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => addDotRef(el, i)}
            className="absolute w-2 h-2 bg-yellow-400/30 rounded-full floating-dot"
            style={{
              left: `${10 + i * 4}%`,
              top: `${15 + Math.random() * 70}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-8 tracking-tight opacity-0"
        >
          How YOU
          <br />
          <span className="text-pink-400">DOIN'?</span>
        </h2>

        <div className="mt-12 flex flex-col items-center">
          <div className="scene-gif mb-16">
            <img
              ref={gifRef}
              src="/images/gifs/joey-how-you-doin.gif"
              alt="Friends celebrating success"
              className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl border-2 border-pink-400/30 opacity-0"
            />
          </div>

          <div
            ref={socialGridRef}
            className="flex justify-center gap-6 mb-16 flex-wrap"
          >
            {socialLinks.map((social, index) => (
              <a
                key={social.name}
                href={social.url}
                target={
                  social.name === "Email" || social.name === "Phone"
                    ? "_self"
                    : "_blank"
                }
                rel="noopener noreferrer"
                className={`social-item w-14 h-14 rounded-2xl ${social.color} ${social.hover} border border-gray-700/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:rotate-12 transform perspective-1000`}
                title={social.name}
              >
                {social.name === "Kaggle" ? (
                  <FontAwesomeIcon
                    icon={faKaggle}
                    width={20}
                    height={20}
                    color="currentColor"
                  />
                ) : (
                  <social.icon className="w-6 h-6" />
                )}
              </a>
            ))}
          </div>

          <div className="text-center">
            <button
              ref={ctaRef}
              onClick={handleWhatsAppRedirect}
              className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto group backdrop-blur-sm border border-green-500/30"
            >
              <MessageCircle
                size={24}
                className="group-hover:scale-110 transition-transform"
              />
              <span>Start a Conversation</span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 opacity-20 text-4xl">🦆</div>
      <div className="absolute top-10 right-10 opacity-20 text-4xl">🍕</div>
      <div className="absolute top-1/4 left-20 opacity-20 text-3xl">👩‍🍳</div>
      <div className="absolute bottom-1/4 right-20 opacity-20 text-3xl">🦕</div>

      <style jsx>{`
        .floating-dot {
          animation: friendsFloat 7s ease-in-out infinite;
        }

        @keyframes friendsFloat {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          33% {
            transform: translateY(-15px) translateX(5px);
            opacity: 0.6;
          }
          66% {
            transform: translateY(10px) translateX(-5px);
            opacity: 0.4;
          }
        }

        .perspective-1000 {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

export default Contact;
