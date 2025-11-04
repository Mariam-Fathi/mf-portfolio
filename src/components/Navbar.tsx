'use client';

import React, { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("#hero");
    const [isVisible, setIsVisible] = useState(false);
    const navRef = useRef<HTMLElement | null>(null);
    const navItemsRef = useRef<(HTMLElement | null)[]>([]);
    const mobileMenuRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
            
            // Update active link based on scroll position
            const sections = ['#work', '#experience', '#skills', '#certificates', '#contact'];
            const currentSection = sections.find(section => {
                const element = document.querySelector(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (currentSection) setActiveLink(currentSection);
        };

        // Listen for hero animation events
        const handleAnimationStart = () => {
            setIsVisible(false);
        };

        const handleAnimationComplete = () => {
            setIsVisible(true);
        };

        window.addEventListener("scroll", handleScroll);
        window.addEventListener("heroAnimationStart", handleAnimationStart);
        window.addEventListener("heroAnimationComplete", handleAnimationComplete);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("heroAnimationStart", handleAnimationStart);
            window.removeEventListener("heroAnimationComplete", handleAnimationComplete);
        };
    }, []);

    // Cinematic entrance animations
    useGSAP(() => {
        if (!navRef.current) return;

        // Initial state - hidden
        gsap.set(navRef.current, {
            x: -100,
            opacity: 0,
            visibility: "hidden",
        });

        // Show navbar when animation completes
        if (isVisible) {
            gsap.to(navRef.current, {
                x: 0,
                opacity: 1,
                visibility: "visible",
                duration: 1.2,
                ease: "power3.out",
                delay: 0.2,
            });

            // Stagger nav items
            navItemsRef.current.forEach((item, index) => {
                if (!item) return;
                gsap.set(item, {
                    y: 50,
                    opacity: 0,
                });

                gsap.to(item, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.4 + index * 0.1,
                    ease: "power2.out",
                });
            });
        } else {
            // Hide navbar during hero animation
            gsap.set(navRef.current, {
                x: -100,
                opacity: 0,
                visibility: "hidden",
            });
        }
    }, [isVisible, navRef]);

    const handleNavClick = (link: string) => {
        if (isMobileMenuOpen) {
            setIsMobileMenuOpen(false);
        }
        setActiveLink(link);
        const element = document.querySelector(link);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const addToNavRefs = (el: HTMLElement | null, index: number) => {
        if (el && !navItemsRef.current.includes(el)) {
            navItemsRef.current[index] = el;
        }
    };

    // Prepare nav links with CONTACT at the end
    const allNavLinks = [
        ...navLinks,
        { name: "CONTACT", link: "#contact" },
    ];

    // Mobile menu animations
    useGSAP(() => {
        if (isMobileMenuOpen && mobileMenuRef.current) {
            gsap.to(mobileMenuRef.current, {
                x: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
            });
        } else if (mobileMenuRef.current) {
            gsap.to(mobileMenuRef.current, {
                x: "100%",
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
            });
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Vertical Left Navigation */}
            <nav 
                ref={navRef}
                className="fixed left-0 top-0 bottom-0 z-50 w-20 md:w-20 bg-[#FEFCE0] flex flex-col justify-center items-center py-8"
            >
                <div className="flex flex-col items-center justify-center">
                    {allNavLinks.map(({ link, name }, index) => {
                        const isActive = activeLink === link;
                        
                        return (
                            <div 
                                key={name} 
                                className={`relative flex items-center justify-center ${
                                    index === 0 ? 'mb-8 md:mb-10' : 'mb-10 md:mb-14'
                                } last:mb-0`}
                                style={{
                                    width: '100%',
                                    height: '5rem',
                                    minHeight: '5rem',
                                    flexShrink: 0,
                                }}
                            >
                                <a
                                    ref={el => addToNavRefs(el, index)}
                                    href={link}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavClick(link);
                                    }}
                                    className={`relative inline-block px-2 py-1 transition-all duration-300 uppercase font-bold text-sm md:text-base tracking-widest ${
                                        isActive
                                            ? "text-[#1A281E]"
                                            : "text-[#1A281E] hover:text-[#1A281E]/80"
                                    }`}
                                    style={{
                                        color: isActive ? '#d97706' : undefined,
                                        transform: 'rotate(-90deg)',
                                        transformOrigin: 'center center',
                                        whiteSpace: 'nowrap',
                                        lineHeight: '1.2',
                                        margin: 0,
                                        padding: '0.5rem 0.75rem',
                                    }}
                                >
                                    {name}
                                </a>
                            </div>
                        );
                    })}
                </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
                onClick={toggleMobileMenu}
                className={`fixed top-4 right-4 z-50 md:hidden flex flex-col items-center justify-center w-10 h-10 space-y-1.5 bg-black/80 backdrop-blur-sm p-2 rounded transition-opacity duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
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

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/90 backdrop-blur-sm z-40 md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Menu */}
            <div 
                ref={mobileMenuRef}
                className="fixed top-0 right-0 bottom-0 w-64 bg-black/95 backdrop-blur-md border-l border-white/10 z-50 md:hidden transform translate-x-full"
            >
                <div className="flex flex-col h-full pt-20 px-8">
                    <nav className="flex-1">
                        <ul className="space-y-4">
                            {allNavLinks.map(({ link, name }, index) => {
                                const isActive = activeLink === link;
                                
                                return (
                                    <li key={name}>
                                        <a
                                            href={link}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleNavClick(link);
                                            }}
                                            className={`text-white text-lg font-bold py-4 block border-b border-white/10 hover:text-orange-600 transition-colors duration-300 tracking-wide uppercase ${
                                                isActive ? "text-orange-600" : ""
                                            }`}
                                            style={{
                                                color: isActive ? '#d97706' : undefined,
                                            }}
                                        >
                                            {name}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
            </div>

        </>
    );
};

export default NavBar;