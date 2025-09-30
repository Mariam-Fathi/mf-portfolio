"use client";
import React, {
    useEffect,
    useRef,
    useState,
    createContext,
    useContext,
    JSX,
} from "react";
import {
    IconArrowNarrowLeft,
    IconArrowNarrowRight,
    IconX,
    IconBrandGithub,
    IconExternalLink,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

// Types
export interface ProjectCard {
    id: string;
    src: string;
    title: string;
    category: string;
    description: string;
    content: React.ReactNode;
    githubUrl?: string;
    demoUrl?: string;
    technologies?: string[];
    featured?: boolean;
}

interface CarouselProps {
    projects: ProjectCard[];
    initialScroll?: number;
    autoPlay?: boolean;
    autoPlayInterval?: number;
    showControls?: boolean;
    showIndicators?: boolean;
    className?: string;
}

interface CardProps {
    project: ProjectCard;
    index: number;
    layout?: boolean;
    variant?: "default" | "minimal" | "featured";
}

// Context
export const CarouselContext = createContext<{
    onProjectClose: (index: number) => void;
    currentIndex: number;
    activeProject: ProjectCard | null;
}>({
    onProjectClose: () => {},
    currentIndex: 0,
    activeProject: null,
});

// Main Carousel Component
export const ProjectsCarousel = ({
                                     projects,
                                     initialScroll = 0,
                                     autoPlay = false,
                                     autoPlayInterval = 5000,
                                     showControls = true,
                                     showIndicators = true,
                                     className,
                                 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [activeProject, setActiveProject] = useState<ProjectCard | null>(null);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (autoPlay && canScrollRight) {
            interval = setInterval(() => {
                scrollRight();
            }, autoPlayInterval);
        }
        return () => clearInterval(interval);
    }, [autoPlay, autoPlayInterval, canScrollRight]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);

            // Update current index based on scroll position
            updateCurrentIndex();
        }
    };

    const updateCurrentIndex = () => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const scrollLeft = carouselRef.current.scrollLeft;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            setCurrentIndex(Math.min(newIndex, projects.length - 1));
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const newScrollLeft = carouselRef.current.scrollLeft - (cardWidth + gap);
            carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });

            // Update index immediately for better UX
            const newIndex = Math.max(0, currentIndex - 1);
            setCurrentIndex(newIndex);
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const newScrollLeft = carouselRef.current.scrollLeft + (cardWidth + gap);
            carouselRef.current.scrollTo({ left: newScrollLeft, behavior: "smooth" });

            // Update index immediately for better UX
            const newIndex = Math.min(projects.length - 1, currentIndex + 1);
            setCurrentIndex(newIndex);
        }
    };

    const scrollToIndex = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * index;
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const handleProjectClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
            setActiveProject(null);
        }
    };

    const isMobile = () => {
        return typeof window !== "undefined" && window.innerWidth < 768;
    };

    return (
        <CarouselContext.Provider
            value={{
                onProjectClose: handleProjectClose,
                currentIndex,
                activeProject,
            }}
        >
            <div className={cn("relative w-full", className)}>
                {/* Carousel Container */}
                <div
                    className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
                    ref={carouselRef}
                    onScroll={checkScrollability}
                >
                    <div className="absolute right-0 z-40 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none" />
                    <div className="absolute left-0 z-40 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none" />

                    <div className="flex flex-row justify-start gap-4 pl-4">
                        {projects.map((project, index) => (
                            <motion.div
                                initial={{
                                    opacity: 0,
                                    y: 20,
                                }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.1 * index,
                                        ease: "easeOut",
                                    },
                                }}
                                key={`project-${project.id}`}
                                className="rounded-3xl last:pr-8"
                            >
                                <ProjectCard
                                    project={project}
                                    index={index}
                                    layout={true}
                                    variant={project.featured ? "featured" : "default"}
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Controls */}
                {showControls && (
                    <div className="flex items-center justify-between px-4">
                        <div className="flex gap-2">
                            <button
                                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full  border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
                                onClick={scrollLeft}
                                disabled={!canScrollLeft}
                            >
                                <IconArrowNarrowLeft className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                            </button>
                            <button
                                className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full  border border-neutral-200 hover:bg-neutral-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed dark:bg-neutral-800 dark:border-neutral-700 dark:hover:bg-neutral-700"
                                onClick={scrollRight}
                                disabled={!canScrollRight}
                            >
                                <IconArrowNarrowRight className="h-6 w-6 text-neutral-700 dark:text-neutral-300" />
                            </button>
                        </div>

                        {/*/!* Indicators *!/*/}
                        {/*{showIndicators && projects.length > 1 && (*/}
                        {/*    <div className="flex gap-2">*/}
                        {/*        {projects.map((_, index) => (*/}
                        {/*            <button*/}
                        {/*                key={`indicator-${index}`}*/}
                        {/*                onClick={() => scrollToIndex(index)}*/}
                        {/*                className={cn(*/}
                        {/*                    "h-2 rounded-full transition-all duration-300",*/}
                        {/*                    currentIndex === index*/}
                        {/*                        ? "w-8 bg-white"*/}
                        {/*                        : "w-2 bg-neutral-300 hover:bg-neutral-400 dark:bg-neutral-600 dark:hover:bg-neutral-500"*/}
                        {/*                )}*/}
                        {/*            />*/}
                        {/*        ))}*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                )}
            </div>
        </CarouselContext.Provider>
    );
};

// Project Card Component - Keep the rest of your existing ProjectCard component the same
export const ProjectCard = ({
                                project,
                                index,
                                layout = false,
                                variant = "default",
                            }: CardProps) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const { onProjectClose } = useContext(CarouselContext);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                handleClose();
            }
        }

        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useOutsideClick(containerRef, () => handleClose());

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        onProjectClose(index);
    };

    const cardClasses = cn(
        "relative z-10 flex flex-col items-start justify-end  overflow-hidden rounded-3xl bg-gradient-to-br from-card to-card/80 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group",
        {
            "h-80 w-56 md:h-96 md:w-80 card-border": variant === "default",
            "h-64 w-48 md:h-80 md:w-64 card-border": variant === "minimal",
            "h-80 w-56 md:h-[40rem] md:w-96 card-border": variant === "featured",
            " card-border": variant === "featured",
        }
    );

    return (
        <>
            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 h-screen overflow-auto top-32">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 h-full w-full card-border backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${project.id}` : undefined}
                            className="relative z-[60] mx-auto my-10 h-fit max-w-4xl rounded-3xl bg-card p-4 font-sans shadow-2xl md:p-8 bg-white/20"
                        >
                            <button
                                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
                                onClick={handleClose}
                            >
                                <IconX className="h-4 w-4" />
                            </button>

                            <motion.p
                                layoutId={layout ? `category-${project.id}` : undefined}
                                className="text-sm font-medium text-muted-foreground uppercase tracking-wide"
                            >
                                {project.category}
                            </motion.p>

                            <motion.h3
                                layoutId={layout ? `title-${project.id}` : undefined}
                                className="mt-2 text-2xl font-bold text-foreground md:text-4xl"
                            >
                                {project.title}
                            </motion.h3>

                            {/* Project Links */}
                            <div className="mt-4 flex gap-4">
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <IconBrandGithub className="h-4 w-4" />
                                        Code
                                    </a>
                                )}
                                {project.demoUrl && (
                                    <a
                                        href={project.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        <IconExternalLink className="h-4 w-4" />
                                        Live Demo
                                    </a>
                                )}
                            </div>

                            {/* Technologies */}
                            {project.technologies && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full card-border px-3 py-1 text-xs text-primary"
                                        >
                      {tech}
                    </span>
                                    ))}
                                </div>
                            )}

                            <div className="py-6 text-foreground">{project.content}</div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Card */}
            <motion.button
                layoutId={layout ? `card-${project.id}` : undefined}
                onClick={handleOpen}
                className={cardClasses}
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <BlurImage
                        src={project.src}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-20 w-full p-6 card-border">
                    <motion.p
                        layoutId={layout ? `category-${project.id}` : undefined}
                        className="text-left text-sm font-medium text-primary/90 md:text-base"
                    >
                        {project.category}
                    </motion.p>
                    <motion.h3
                        layoutId={layout ? `title-${project.id}` : undefined}
                        className="mt-2 text-left text-xl font-bold [text-wrap:balance] text-white md:text-2xl"
                    >
                        {project.title}
                    </motion.h3>
                    <motion.p className="mt-2 text-left text-sm text-white/80 line-clamp-2">
                        {project.description}
                    </motion.p>

                    {/* Action Links */}
                    <div className="mt-4 flex gap-4 transition-opacity duration-300 opacity-100">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                            >
                                <IconBrandGithub className="h-3 w-3" />
                                Code
                            </a>
                        )}
                        {project.demoUrl && (
                            <a
                                href={project.demoUrl}
                                onClick={(e) => e.stopPropagation()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur-sm hover:bg-white/20 transition-colors"
                            >
                                <IconExternalLink className="h-3 w-3" />
                                Demo
                            </a>
                        )}
                    </div>
                </div>
            </motion.button>
        </>
    );
};

// Enhanced Image Component - Keep the same
export const BlurImage = ({
                              height,
                              width,
                              src,
                              className,
                              alt,
                              ...rest
                          }: ImageProps) => {
    const [isLoading, setLoading] = useState(true);

    return (
        <Image
            className={cn(
                "h-full w-full transition duration-500",
                isLoading ? "scale-110 blur-lg" : "scale-100 blur-0",
                className
            )}
            onLoad={() => setLoading(false)}
            src={src}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            alt={alt || "Project screenshot"}
            {...rest}
        />
    );
};