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

    useGSAP(() => {
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
        );

        gsap.fromTo(logoRef.current,
            { x: -50, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.8, delay: 0.3, ease: "back.out(1.7)" }
        );

        gsap.fromTo(navItemsRef.current,
            { y: -30, opacity: 0 },
            { 
                y: 0, 
                opacity: 1, 
                duration: 0.6, 
                stagger: 0.1, 
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
                    opacity: 0 
                },
                { 
                    x: 0,
                    opacity: 1,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );

            gsap.fromTo(".mobile-nav-item",
                { 
                    x: 50,
                    opacity: 0 
                },
                { 
                    x: 0,
                    opacity: 1,
                    duration: 0.3,
                    stagger: 0.1,
                    delay: 0.2
                }
            );

        } else {
            gsap.to(mobileMenuRef.current, {
                x: "100%",
                opacity: 0,
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
                        ? "backdrop-blur-md shadow-lg py-2" 
                        : "bg-transparent py-4"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <a 
                            ref={logoRef}
                            href="#hero" 
                            className="text-xl font-bold text-white hover:text-white-50 transition-colors duration-300"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#hero');
                            }}
                        >
                            Mariam<span className="text-white-50">.</span>
                        </a>

                        <nav className="hidden md:flex items-center space-x-8">
                            <ul className="flex items-center space-x-6">
                                {navLinks.map(({ link, name }, index) => (
                                    <li 
                                        key={name}
                                        ref={el => addToNavRefs(el, index)}
                                        className="group"
                                    >
                                        <a
                                            href={link}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link);
                                            }}
                                            className="text-gray-300 hover:text-white transition-colors duration-300 relative py-2 text-sm font-medium"
                                        >
                                            {name}
                                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white-50 group-hover:w-full transition-all duration-300" />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                            
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contact');
                                }}
                                className="bg-white text-black group-hover:bg-black-50 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-white-50/20"
                            >
                                Contact
                            </a>
                        </nav>

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

            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div 
                ref={mobileMenuRef}
                className="fixed top-0 right-0 bottom-0 w-80 backdrop-blur-md z-50 md:hidden transform translate-x-full"
            >
                <div className="flex flex-col h-full pt-20 px-6">
                    <nav className="flex-1">
                        <ul className="space-y-6">
                            {navLinks.map(({ link, name }, index) => (
                                <li key={name} className="mobile-nav-item">
                                    <a
                                        href={link}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavClick(link);
                                        }}
                                        className="text-white text-lg font-medium py-3 block border-b border-gray-700 hover:text-white-50 transition-colors duration-300"
                                    >
                                        {name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="pb-8 mobile-nav-item">
                        <a
                            href="#contact"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavClick('#contact');
                            }}
                            className="bg-white text-black group-hover:bg-black-50 w-full py-3 rounded-lg text-center block font-medium transition-all duration-300 transform hover:scale-105"
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