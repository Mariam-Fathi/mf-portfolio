import React from 'react'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {Projects} from "@/components/Projects";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Certificates from "@/components/Certificates";
import LogoShowcase from "@/components/LogoShowcase";
import FeatureCards from "@/components/FeatureCard";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Navbar/>
            <div className="pt-16 md:pt-0"> {/* Add padding top for mobile */}
                <Hero/>
            </div>
            <div className="mt-10 md:mt-20"> {/* Reduced margin on mobile */}
                <Experience/>
            </div>
            <div className="mt-10 md:mt-20">
                <LogoShowcase />
            </div>
            <div className="mt-10 md:mt-20">
                <Projects/>
            </div>
            <div className="mt-10 md:mt-20">
                <Certificates />
            </div>
            <div className="mt-10 md:mt-20">
                <Contact />
            </div>
            <Footer />
        </>
    )
}