import React from 'react'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {Projects} from "@/components/Projects";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import ShowCaseSection from "@/components/Certificates";
import Certificates from "@/components/Certificates";
import LogoShowcase from "@/components/LogoShowcase";
import TechStack from "@/components/TechStack";
import FeatureCards from "@/components/FeatureCard";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            {/*<LogoShowcase />*/}
            <FeatureCards />
            <Experience/>
            <Projects/>
            <Certificates />
            <TechStack/>
            <Contact />
            <Footer />
        </>
    )
}
