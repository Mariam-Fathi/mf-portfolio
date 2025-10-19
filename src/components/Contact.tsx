"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Linkedin,
  Github,
  Mail,
  Phone,
  MessageCircle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaggle } from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const socialGridRef = useRef(null);
  const ctaRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

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
      className="relative bg-black overflow-hidden pt-20 max-sm:pt-10"
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

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <h2 
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-light text-white mb-6 tracking-tight opacity-0"
          >
            LET'S CREATE
            <br />
            <span className="text-blue-400">TOGETHER</span>
          </h2>
      <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Whether you have a project in mind, want to explore collaboration
            opportunities, or just want to discuss AI and engineering - I'm
            excited to connect with you!
          </p>
        </div>
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
        
        .perspective-1000 {
          transform-style: preserve-3d;
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Contact;