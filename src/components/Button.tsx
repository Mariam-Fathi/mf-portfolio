import {ArrowRight, ArrowUpRight} from "lucide-react";

interface ButtonProps {
    text: string;
    className?: string;
    id?: string;
    link?: string;
}

/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section with ID "counter",
 * with a small offset from the top for better visual placement.
 */
const Button = ({ text, className, id, link }: ButtonProps) => {
    return (
        <a
            onClick={(e) => {
                e.preventDefault(); // Stop the link from jumping instantly

                const target = document.getElementById(`${id}`);

                // Only scroll if we found the section and an ID is passed in
                // that prevents the contact button from scrolling to the top
                if (target && id) {
                    const offset = window.innerHeight * 0.15; // Leave a bit of space at the top

                    // Calculate how far down the page we need to scroll
                    const top =
                        target.getBoundingClientRect().top + window.pageYOffset - offset;

                    // Scroll smoothly to that position
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }}
            className={`${className ?? ""} cta-wrapper`} // Add base + extra class names
        >
            <div className="cta-button group">
                <div className="bg-circle" />
                <p className="text">{text}</p>
                <div className="arrow-wrapper">
                    {text === 'See My Work'?<img src="/images/arrow-down.svg" alt="arrow" />:
                        (
                            <div>
                                <ArrowUpRight color={'black'}/>
                            </div> )}
                </div>
            </div>
        </a>
    );
};

export default Button;