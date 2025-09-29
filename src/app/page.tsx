import React from 'react'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import {Projects} from "@/components/Projects";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import ShowCaseSection from "@/components/Certificates";
import Certificates from "@/components/Certificates";
import LogoShowcase from "@/components/LogoShowcase";

export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Experience/>
            <Projects/>
            <Certificates />
            <Contact />
        </>
    )
}
