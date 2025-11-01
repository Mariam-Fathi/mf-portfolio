'use client';

import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { navLinks } from "@/constants";

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const logoRef = useRef(null);
    const navItemsRef = useRef([]);
    const mobileMenuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Magazine-style horizontal entrance animations
    useGSAP(() => {
        gsap.fromTo(navRef.current,
            { x: -100, opacity: 0, filter: "blur(10px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out" }
        );

        gsap.fromTo(logoRef.current,
            { x: -50, opacity: 0, filter: "blur(8px)" },
            { x: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, delay: 0.3, ease: "power2.out" }
        );

        gsap.fromTo(navItemsRef.current,
            { x: 50, opacity: 0, filter: "blur(8px)" },
            { 
                x: 0, 
                opacity: 1, 
                filter: "blur(0px)",
                duration: 0.7, 
                stagger: 0.08, 
                delay: 0.5,
                ease: "power2.out"
            }
        );

    }, { scope: navRef });

    useGSAP(() => {
        if (isMobileMenuOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { 
                    x: "100%",
                    opacity: 0,
                    filter: "blur(10px)"
                },
                { 
                    x: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.4,
                    ease: "power2.out"
                }
            );

            gsap.fromTo(".mobile-nav-item",
                { 
                    x: 50,
                    opacity: 0,
                    filter: "blur(8px)"
                },
                { 
                    x: 0,
                    opacity: 1,
                    filter: "blur(0px)",
                    duration: 0.3,
                    stagger: 0.1,
                    delay: 0.2
                }
            );

        } else {
            gsap.to(mobileMenuRef.current, {
                x: "100%",
                opacity: 0,
                filter: "blur(10px)",
                duration: 0.3,
                ease: "power2.in"
            });
        }
    }, [isMobileMenuOpen]);

    const handleNavClick = (link) => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
        const element = document.querySelector(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const addToNavRefs = (el, index) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current[index] = el;
        }
    };

    return (
        <>
            <header 
                ref={navRef}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled 
                        ? "bg-black/80 backdrop-blur-sm border-b border-white/10 py-3" 
                        : "bg-transparent py-5"
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
                    <div className="flex items-center justify-between">
                        {/* Logo - Magazine Style */}
                        <a 
                            ref={logoRef}
                            href="#hero" 
                            className="text-xl md:text-2xl font-light text-white tracking-tight hover:text-gray-300 transition-colors duration-300"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#hero');
                            }}
                        >
                            MARIAM<span className="text-blue-400">.</span>
                        </a>

                        {/* Navigation - Magazine Style */}
                        <nav className="hidden md:flex items-center space-x-1">
                            <ul className="flex items-center space-x-2">
                                {navLinks.map(({ link, name }, index) => (
                                    <li 
                                        key={name}
                                        ref={el => addToNavRefs(el, index)}
                                        className="group relative"
                                    >
                                        <a
                                            href={link}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link);
                                            }}
                                            className="text-gray-300 hover:text-white font-light transition-colors duration-300 relative py-2 px-4 text-sm tracking-wide uppercase"
                                            style={{
                                                letterSpacing: '0.1em',
                                            }}
                                        >
                                            {name}
                                            {/* Magazine-style underline */}
                                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            
                            {/* Contact Button - Magazine Style */}
                            <div className="ml-4 pl-4 border-l border-white/10">
                                <a
                                    href="#contact"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick('#contact');
                                    }}
                                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-5 py-2 rounded-full text-xs font-light tracking-widest uppercase transition-all duration-300 transform hover:scale-105"
                                    style={{
                                        letterSpacing: '0.15em',
                                    }}
                                >
                                    Contact
                                </a>
                            </div>
                        </nav>

                        {/* Mobile Menu Button - Magazine Style */}
                        <button
                            onClick={toggleMobileMenu}
                            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 group"
                        >
                            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
                            }`} />
                            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                                isMobileMenuOpen ? "opacity-0" : "opacity-100"
                            }`} />
                            <span className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
                                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                            }`} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu - Magazine Style */}
            <div 
                ref={mobileMenuRef}
                className="fixed top-0 right-0 bottom-0 w-80 bg-black/95 backdrop-blur-md border-l border-white/10 z-50 md:hidden transform translate-x-full"
            >
                <div className="flex flex-col h-full pt-20 px-8">
                    <nav className="flex-1">
                        <ul className="space-y-4">
                            {navLinks.map(({ link, name }, index) => (
                                <li key={name} className="mobile-nav-item">
                                    <a
                                        href={link}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link);
                                        }}
                                        className="text-white text-base font-light py-4 block border-b border-white/10 hover:text-blue-400 transition-colors duration-300 tracking-wide uppercase"
                                        style={{
                                            letterSpacing: '0.1em',
                                        }}
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="pb-8 mobile-nav-item border-t border-white/10 pt-8">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#contact');
                            }}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 w-full py-3 rounded-full text-center block font-light tracking-widest uppercase transition-all duration-300 transform hover:scale-105"
                            style={{
                                letterSpacing: '0.15em',
                            }}
                        >
                            Contact Me
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NavBar;