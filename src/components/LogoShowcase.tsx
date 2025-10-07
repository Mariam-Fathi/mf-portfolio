import { logoIconsList } from "../constants";
import TitleHeader from "@/components/TitleHeader";
import React from "react";

const LogoIcon = ({ icon }) => {
    return (
        <div className="flex-none flex-center marquee-item group relative">
            <img
                src={icon.imgPath}
                alt={icon.name}
                className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain transition-all duration-300 group-hover:scale-110 group-hover:brightness-110 filter hover:drop-shadow-lg"
            />
            {/* Tooltip on hover */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20">
                <div className="bg-gray-900/95 backdrop-blur-sm text-white text-xs font-medium px-3 py-2 rounded-lg whitespace-nowrap border border-gray-700 shadow-lg">
                    {icon.name}
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/95 rotate-45"></div>
                </div>
            </div>
        </div>
    );
};

const LogoShowcase = () => (
    <section id="skills" className="mt-20 py-16 relative overflow-hidden bg-gradient-to-b from-transparent to-gray-900/5">
        <div className="container mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
                <TitleHeader
                    title="Technologies I Work With"
                    sub="🛠️ Tools & Technologies That Power My Projects"
                />
                <p className="text-gray-400 max-w-2xl mx-auto mt-4 text-lg">
                    From AI research to production applications, these are the technologies I've mastered
                    through hands-on projects and continuous learning
                </p>
            </div>

            {/* Marquee Container */}
            <div className="relative mb-8">
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10" />

                <div className="marquee h-28 md:h-36 lg:h-40">
                    <div className="marquee-box md:gap-12 lg:gap-16 gap-8">
                        {logoIconsList.map((icon, index) => (
                            <LogoIcon key={`first-${index}`} icon={icon} />
                        ))}

                        {logoIconsList.map((icon, index) => (
                            <LogoIcon key={`second-${index}`} icon={icon} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Skills Categories */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                <div className="text-center p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-500/30 transition-colors">
                        <span className="text-2xl">🤖</span>
                    </div>
                    <h3 className="text-lg font-semibold text-blue-300 mb-3">AI & Data Engineering</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Building robust data pipelines and intelligent systems with Python, PyTorch, and modern ML frameworks
                    </p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-green-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-green-500/20 flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                        <span className="text-2xl">📱</span>
                    </div>
                    <h3 className="text-lg font-semibold text-green-300 mb-3">Mobile & Full-Stack</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Creating seamless user experiences with React Native, TypeScript, and modern web technologies
                    </p>
                </div>

                <div className="text-center p-6 rounded-2xl bg-purple-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:scale-105 group">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-purple-500/20 flex items-center justify-center group-hover:bg-purple-500/30 transition-colors">
                        <span className="text-2xl">⚙️</span>
                    </div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-3">Infrastructure & Tools</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Deploying and scaling applications with cloud services, databases, and development tools
                    </p>
                </div>
            </div>
        </div>
    </section>
);

export default LogoShowcase;