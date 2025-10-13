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
  BarChart3,
  MessageCircle,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKaggle } from "@fortawesome/free-brands-svg-icons";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const contactGridRef = useRef(null);
  const socialGridRef = useRef(null);
  const ctaRef = useRef(null);

  const contactInfo = {
    email: "mariam.fathi.siam@outlook.com",
    phone: "+201020103227",
    linkedin: "https://linkedin.com/in/mariam-fathi-siam",
    github: "https://github.com/Mariam-Fathi",
    kaggle: "https://www.kaggle.com/mariamfathiamin",
    whatsapp: "https://wa.me/201020103227",
    location: "Egypt",
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
        contactGridRef.current,
        {
          opacity: 0,
          scale: 0.8,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: contactGridRef.current,
            start: "top 80%",
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

  const contactMethods = [
    {
      name: "Email",
      icon: Mail,
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}?subject=Connecting from your portfolio&body=Hello Mariam,`,
      color: "text-blue-400",
      bg: "bg-blue-900/20",
      border: "border-blue-700/30",
      hover: "hover:border-blue-500/50 hover:bg-blue-900/30"
    },
    {
      name: "Phone",
      icon: Phone,
      value: contactInfo.phone,
      href: `tel:${contactInfo.phone}`,
      color: "text-teal-400",
      bg: "bg-teal-900/20",
      border: "border-teal-700/30",
      hover: "hover:border-teal-500/50 hover:bg-teal-900/30"
    },
    {
      name: "Location",
      icon: MapPin,
      value: contactInfo.location,
      href: "#",
      color: "text-orange-400",
      bg: "bg-orange-900/20",
      border: "border-orange-700/30",
      hover: "hover:border-orange-500/50 hover:bg-orange-900/30"
    },
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: contactInfo.linkedin,
      color: "bg-blue-900/80",
      hover: "hover:bg-blue-800/80"
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
      color: "bg-cyan-400/80",
      hover: "hover:bg-teal-800/80"
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
          sub="Ready to turn ideas into reality? Let's build something extraordinary."
        />

        <div className="text-center max-w-2xl mt-4 mx-auto mb-16">
          <p className="text-gray-400 text-lg leading-relaxed font-light">
            Whether you have a project in mind, want to explore collaboration
            opportunities, or just want to discuss AI and engineering - I'm
            excited to connect with you!
          </p>
        </div>

        <div
          ref={contactGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <a
              key={method.name}
              href={method.href}
              className={`group p-6 rounded-2xl ${method.bg} border ${method.border} ${method.hover} backdrop-blur-sm transition-all duration-500 hover:scale-105 transform perspective-1000`}
            >
              <div className="text-center">
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-2xl ${method.bg} border ${method.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <method.icon className={`w-8 h-8 ${method.color}`} />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">
                  {method.name}
                </h3>
                <p className="text-gray-400 text-sm font-light">
                  {method.value}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div ref={socialGridRef} className="flex justify-center gap-8 mb-16">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.url}
              target="_blank"
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
            className="absolute w-1 h-1 bg-gray-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${8 + Math.random() * 8}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
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