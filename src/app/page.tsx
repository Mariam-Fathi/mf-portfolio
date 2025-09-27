import React from 'react'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShowCaseSection from "@/components/ShowCaseSection";
import ShowStudyCase from "@/components/ShowStudyCase";
import {Projects} from "@/components/Projects";

export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <Projects/>
        </>
    )
}
