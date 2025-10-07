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
        const message = "Hello Mariam! I came across your portfolio and would like to connect with you regarding opportunities.";
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
            hoverColor: "hover:bg-blue-500/30",
            description: "Professional network"
        },
        {
            name: "GitHub",
            icon: Github,
            url: contactInfo.github,
            bgColor: "bg-gray-500/20",
            borderColor: "border-gray-500/50",
            iconColor: "text-gray-400",
            hoverColor: "hover:bg-gray-500/30",
            description: "Code & projects"
        },
        {
            name: "Kaggle",
            icon: BarChart3,
            url: contactInfo.kaggle,
            bgColor: "bg-teal-500/20",
            borderColor: "border-teal-500/50",
            iconColor: "text-teal-400",
            hoverColor: "hover:bg-teal-500/30",
            description: "Data science projects"
        }
    ];

    return (
        <section id="contact" className="flex-center section-padding bg-gradient-to-b from-gray-900/0 to-gray-900/10">
            <div className="w-full h-full md:px-10 px-5">
                <TitleHeader
                    title="Let's Build Something Amazing"
                    sub="🚀 Get in Touch - I'm always open to new opportunities"
                />

                <div className="text-center max-w-2xl mx-auto mb-16">
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Whether you're looking to discuss a project, explore collaboration opportunities,
                        or just want to connect about AI and engineering - I'd love to hear from you!
                    </p>
                </div>

                <div className="mx-auto max-w-4xl">
                    <div
                        ref={cardRef}
                        onMouseMove={handleMouseMove}
                        className="card card-border rounded-3xl p-8 md:p-12 backdrop-blur-sm relative overflow-hidden"
                    >
                        {/* Glow Effect */}
                        <div className="glow"></div>

                        <div className="w-full text-center relative z-10">
                            {/* Contact Info Grid */}
                            <div className="grid md:grid-cols-3 gap-6 mb-12">
                                {/* Email */}
                                <div className="flex flex-col items-center p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group">
                                    <div className="p-3 rounded-full bg-blue-500/20 border border-blue-500/30 mb-4 group-hover:scale-110 transition-transform">
                                        <Mail className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Email</h3>
                                    <a
                                        href={`mailto:${contactInfo.email}?subject=Connecting from your portfolio&body=Hello Mariam,`}
                                        className="text-blue-400 hover:text-blue-300 transition-colors font-medium break-all text-sm"
                                    >
                                        {contactInfo.email}
                                    </a>
                                    <p className="text-gray-400 text-xs mt-2">Best for detailed discussions</p>
                                </div>

                                {/* Phone */}
                                <div className="flex flex-col items-center p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 group">
                                    <div className="p-3 rounded-full bg-purple-500/20 border border-purple-500/30 mb-4 group-hover:scale-110 transition-transform">
                                        <Phone className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Phone</h3>
                                    <a
                                        href={`tel:${contactInfo.phone}`}
                                        className="text-purple-400 hover:text-purple-300 transition-colors font-medium text-sm"
                                    >
                                        {contactInfo.phone}
                                    </a>
                                    <p className="text-gray-400 text-xs mt-2">Available for calls</p>
                                </div>

                                {/* Location */}
                                <div className="flex flex-col items-center p-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 hover:border-orange-500/40 transition-all duration-300 group">
                                    <div className="p-3 rounded-full bg-orange-500/20 border border-orange-500/30 mb-4 group-hover:scale-110 transition-transform">
                                        <MapPin className="w-6 h-6 text-orange-400" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-white">Location</h3>
                                    <p className="text-orange-400 font-medium text-sm">
                                        {contactInfo.location}
                                    </p>
                                    <p className="text-gray-400 text-xs mt-2">Open to remote opportunities</p>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="mb-12">
                                <h3 className="text-xl font-semibold mb-8 text-white">Connect With Me</h3>
                                <div className="flex justify-center gap-4 md:gap-6 flex-wrap">
                                    {socialLinks.map((social, index) => (
                                        <a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`flex flex-col items-center p-5 rounded-2xl ${social.bgColor} ${social.borderColor} border-2 transition-all duration-300 ${social.hoverColor} hover:scale-105 hover:border-opacity-70 group cursor-pointer min-w-[120px]`}
                                        >
                                            <div className={`p-3 rounded-xl ${social.bgColor} border ${social.borderColor} mb-3 group-hover:scale-110 transition-transform duration-300`}>
                                                <social.icon className={`w-7 h-7 ${social.iconColor}`} />
                                            </div>
                                            <span className="text-white font-semibold text-sm mb-1">{social.name}</span>
                                            <span className="text-gray-400 text-xs">{social.description}</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Call to Action */}
                            <div className="mt-8">
                                <p className="text-gray-300 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                                    I'm particularly interested in roles involving <span className="text-blue-400">AI infrastructure</span>,
                                    <span className="text-green-400"> data engineering</span>, and <span className="text-purple-400">full-stack development</span>.
                                    Let's discuss how we can work together!
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <a
                                        href={`mailto:${contactInfo.email}?subject=Opportunity Discussion&body=Hello Mariam,%0D%0A%0D%0AI came across your portfolio and would like to discuss...`}
                                        className="cta-button group inline-block max-w-xs w-full"
                                    >
                                        <div className="bg-circle" />
                                        <p className="text">Send Email</p>
                                        <div className="arrow-wrapper">
                                            <div className={'items-center justify-center flex'}>
                                                <Mail color={'black'} size={20}/>
                                            </div>
                                        </div>
                                    </a>
                                    <button
                                        onClick={handleWhatsAppRedirect}
                                        className="px-8 py-4 rounded-2xl bg-green-500/20 border-2 border-green-500/50 text-green-400 font-semibold hover:bg-green-500/30 hover:border-green-500/70 hover:scale-105 transition-all duration-300 flex items-center gap-3"
                                    >
                                        <MessageCircle size={20} />
                                        Chat on WhatsApp
                                    </button>
                                </div>
                            </div>

                            {/* Response Time */}
                            <div className="mt-12 pt-6 border-t border-gray-600/30">
                                <p className="text-gray-400 text-sm">
                                    💫 I typically respond within 24 hours
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;