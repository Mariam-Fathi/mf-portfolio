'use client'

import { useRef } from "react";
import TitleHeader from "./TitleHeader";
import { Linkedin, Github, MessageCircle, Mail, Phone } from "lucide-react";

const Contact = () => {
    const cardRef = useRef(null);

    const contactInfo = {
        email: "mariam.fathi.siam@outlook.com",
        phone: "+201020103227",
        linkedin: "https://linkedin.com/in/mariam-fathi-siam",
        github: "https://github.com/Mariam-Fathi",
        whatsapp: "https://wa.me/201020103227"
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
        const message = "Hello! I'd like to connect with you regarding opportunities.";
        const whatsappUrl = `https://wa.me/${contactInfo.phone.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };

    const socialLinks = [
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: contactInfo.linkedin,
            bgColor: "bg-blue-500/20",
            borderColor: "border-blue-500/50",
            iconColor: "text-blue-400",
            hoverColor: "hover:bg-blue-500/30"
        },
        {
            name: "GitHub",
            icon: Github,
            url: contactInfo.github,
            bgColor: "bg-gray-500/20",
            borderColor: "border-gray-500/50",
            iconColor: "text-gray-400",
            hoverColor: "hover:bg-gray-500/30"
        },
        {
            name: "WhatsApp",
            icon: MessageCircle,
            url: contactInfo.whatsapp,
            bgColor: "bg-green-500/20",
            borderColor: "border-green-500/50",
            iconColor: "text-green-400",
            hoverColor: "hover:bg-green-500/30",
            onClick: handleWhatsAppRedirect
        }
    ];

    return (
        <section id="contact" className="flex-center section-padding">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Get in Touch"
                    sub="💬 Let's connect and discuss opportunities"
                />
                <div className="mx-auto w-3/4 mt-16">
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        className="card card-border timeline-card rounded-xl p-10 backdrop-blur-sm relative overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="glow"></div>

                        <div className="w-full text-center relative z-10">
                            {/* Contact Info Grid */}
                            <div className="grid md:grid-cols-2 gap-8 mb-12">
                                {/* Email */}
                                <div className="flex flex-col items-center p-6 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                    <div className="p-3 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Email</h3>
                                    <a
                                        href={`mailto:${contactInfo.email}`}
                                        className="text-blue-400 hover:text-blue-300 transition-colors font-medium break-all"
                                    >
                                        {contactInfo.email}
                                    </a>
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col items-center p-6 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                    <div className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4">
                                        <Phone className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Phone</h3>
                                    <a
                                        href={`tel:${contactInfo.phone}`}
                                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium"
                                    >
                                        {contactInfo.phone}
                                    </a>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold mb-6 text-white">Connect With Me</h3>
                                <div className="flex justify-center gap-6 flex-wrap">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={social.onClick}
                                            className={`flex flex-col items-center p-4 rounded-2xl ${social.bgColor} ${social.borderColor} border-2 transition-all duration-300 ${social.hoverColor} hover:scale-105 hover:border-opacity-70 group cursor-pointer min-w-[100px]`}
                                        >
                                            <div className={`p-3 rounded-xl ${social.bgColor} border ${social.borderColor} mb-3 group-hover:scale-110 transition-transform`}>
                                                <social.icon className={`w-6 h-6 ${social.iconColor}`} />
                                            </div>
                                            <span className="text-white font-medium text-sm">{social.name}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-10">
                                <p className="text-gray-300 mb-6 text-lg">
                                    Feel free to reach out - I'm always open to discussing new projects and opportunities.
                                </p>
                                <a
                                    href={`mailto:${contactInfo.email}`}
                                    className="cta-button group inline-block max-w-md mx-auto w-full"
                                >
                                    <div className="bg-circle" />
                                    <p className="text">Send me an email</p>
                                    <div className="arrow-wrapper">
                                        <div className={'items-center justify-center flex'}>
                                            <Mail color={'black'}/>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;