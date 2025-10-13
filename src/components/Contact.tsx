'use client'

import { useRef } from "react";
import TitleHeader from "./TitleHeader";
import { Linkedin, Github, Mail, Phone, MapPin, BarChart3, MessageCircle } from "lucide-react";

const Contact = () => {
    const cardRef = useRef(null);

    const contactInfo = {
        email: "mariam.fathi.siam@outlook.com",
        phone: "+201020103227",
        linkedin: "https://linkedin.com/in/mariam-fathi-siam",
        github: "https://github.com/Mariam-Fathi",
        kaggle: "https://www.kaggle.com/mariamfathiamin",
        whatsapp: "https://wa.me/201020103227",
        location: "Egypt"
    };

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;

        const rect = card.getBoundingClientRect();
        const mouseX = e.clientX - rect.left - rect.width / 2;
        const mouseY = e.clientY - rect.top - rect.height / 2;

        let angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
        angle = (angle + 360) % 360;

        card.style.setProperty("--start", angle + 60);
    };

    const handleWhatsAppRedirect = () => {
        const message = "Hello Mariam! I came across your portfolio and would like to connect with you.";
        const whatsappUrl = `https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const contactMethods = [
        {
            name: "Email",
            icon: Mail,
            value: contactInfo.email,
            href: `mailto:${contactInfo.email}?subject=Connecting from your portfolio&body=Hello Mariam,`,
            color: "blue"
        },
        {
            name: "Phone",
            icon: Phone,
            value: contactInfo.phone,
            href: `tel:${contactInfo.phone}`,
            color: "purple"
        },
        {
            name: "Location",
            icon: MapPin,
            value: contactInfo.location,
            href: "#",
            color: "orange"
        }
    ];

    const socialLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: contactInfo.linkedin,
            color: "blue"
        },
        {
            name: "GitHub",
            icon: Github,
            url: contactInfo.github,
            color: "gray"
        },
        {
            name: "Kaggle",
            icon: BarChart3,
            url: contactInfo.kaggle,
            color: "teal"
        }
    ];

    const getColorClasses = (color) => {
        const colors = {
            blue: {
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                icon: "text-blue-400",
                hover: "hover:border-blue-500/40 hover:bg-blue-500/20"
            },
            purple: {
                bg: "bg-purple-500/10",
                border: "border-purple-500/20",
                icon: "text-purple-400",
                hover: "hover:border-purple-500/40 hover:bg-purple-500/20"
            },
            orange: {
                bg: "bg-orange-500/10",
                border: "border-orange-500/20",
                icon: "text-orange-400",
                hover: "hover:border-orange-500/40 hover:bg-orange-500/20"
            },
            gray: {
                bg: "bg-gray-500/10",
                border: "border-gray-500/20",
                icon: "text-gray-400",
                hover: "hover:border-gray-500/40 hover:bg-gray-500/20"
            },
            teal: {
                bg: "bg-teal-500/10",
                border: "border-teal-500/20",
                icon: "text-teal-400",
                hover: "hover:border-teal-500/40 hover:bg-teal-500/20"
            },
            green: {
                bg: "bg-green-500/10",
                border: "border-green-500/20",
                icon: "text-green-400",
                hover: "hover:border-green-500/40 hover:bg-green-500/20"
            }
        };
        return colors[color] || colors.blue;
    };

    return (
        <section id="contact" className="flex-center section-padding bg-gradient-to-b from-gray-900/0 to-gray-900/10">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Let's Build Something Amazing"
                    sub="🚀 Get in Touch - I'm always open to new opportunities"
                />

                <div className="text-center max-w-2xl mx-auto mb-12">
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Whether you're looking to discuss a project, explore collaboration opportunities,
                        or just want to connect about AI and engineering - I'd love to hear from you!
                    </p>
                </div>

                <div className="mx-auto max-w-3xl">
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        className="card card-border rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
                    >
                        <div className="glow"></div>

                        <div className="relative z-10">
                            <div className="flex justify-center gap-8 mb-12">
                                {contactMethods.map((method) => {
                                    const color = getColorClasses(method.color);
                                    return (
                                        <a
                                            key={method.name}
                                            href={method.href}
                                            className={`p-5 rounded-2xl ${color.bg} ${color.border} border-2 transition-all duration-300 ${color.hover} hover:scale-110 group relative`}
                                            title={`${method.name}: ${method.value}`}
                                        >
                                            <method.icon className={`w-7 h-7 ${color.icon}`} />
                                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap border border-gray-600">
                                                {method.name}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center gap-8 mb-12">
                                {socialLinks.map((social) => {
                                    const color = getColorClasses(social.color);
                                    return (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`p-5 rounded-2xl ${color.bg} ${color.border} border-2 transition-all duration-300 ${color.hover} hover:scale-110 group relative`}
                                            title={social.name}
                                        >
                                            <social.icon className={`w-7 h-7 ${color.icon}`} />
                                            <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-gray-600">
                                                {social.name}
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>

                            <div className="flex justify-center">
                                <button
                                    onClick={handleWhatsAppRedirect}
                                    className="px-12 py-5 rounded-2xl bg-green-500/20 border-2 border-green-500/50 text-green-400 font-semibold hover:bg-green-500/30 hover:border-green-500/70 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-4 group"
                                    style={{ width: 'calc(3 * (80px + 2rem))' }} 
                                >
                                    <MessageCircle size={22} className="group-hover:scale-110 transition-transform" />
                                    <span className="text-lg font-bold">Chat on WhatsApp</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;