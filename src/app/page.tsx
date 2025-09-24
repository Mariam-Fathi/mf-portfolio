import React from 'react'
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ShowCaseSection from "@/components/ShowCaseSection";
import ShowStudyCase from "@/components/ShowStudyCase";

export default function Home() {
    return (
        <>
            <Navbar/>
            <Hero/>
            <ShowStudyCase/>
            <ShowCaseSection/>
        </>
    )
}
