"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TitleHeader from "./TitleHeader";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaggle } from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
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
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
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
    },
    { scope: sectionRef }
  );

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
      hover: "hover:bg-blue-800/80"
    },
    {
      name: "Phone",
      icon: Phone,
      url: `tel:${contactInfo.phone}`,
      color: "bg-teal-900/80",
      hover: "hover:bg-teal-800/80"
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: contactInfo.linkedin,
      color: "bg-blue-700/80",
      hover: "hover:bg-blue-600/80"
    },
    {
      name: "GitHub",
      icon: Github,
      url: contactInfo.github,
      color: "bg-gray-800/80",
      hover: "hover:bg-gray-700/80"
    },
    {
      name: "Kaggle",
      icon: faKaggle,
      url: contactInfo.kaggle,
      color: "bg-cyan-600/80",
      hover: "hover:bg-teal-700/80"
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="pt-20 bg-black relative overflow-hidden"
    >
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-900 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-900 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-cyan-900 rounded-full blur-2xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <TitleHeader
          title="Let's Create Together"
          sub="Let's build something extraordinary."
        />

        <div className="text-center max-w-2xl mt-4 mx-auto mb-16">
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Whether you have a project in mind, want to explore collaboration
            opportunities, or just want to discuss AI and engineering - I'm
            excited to connect with you!
          </p>
        </div>

        <div ref={socialGridRef} className="flex justify-center gap-6 mb-16 flex-wrap">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target={social.name === "Email" || social.name === "Phone" ? "_self" : "_blank"}
              rel="noopener noreferrer"
              className={`social-item w-14 h-14 rounded-2xl ${social.color} ${social.hover} border border-gray-700/50 flex items-center justify-center text-white transition-all duration-300 hover:scale-110 hover:rotate-12 transform perspective-1000`}
              title={social.name}
            >
              {social.name === "Kaggle" ? (
                <FontAwesomeIcon icon={faKaggle} width={20} height={20} color="currentColor" />
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
            className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white px-12 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto group"
          >
            <MessageCircle
              size={24}
              className="group-hover:scale-110 transition-transform"
            />
            <span>Start a Conversation</span>
          </button>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gray-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-15px) translateX(8px);
            opacity: 0.6;
          }
        }
        
        .perspective-1000 {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Contact;