'use client';

import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";

type NavbarProps<T extends string> = {
  items: { id: T; label: string }[];
  homeId: T;
  activeId: T;
  onNavigate: (id: T) => void;
  disabled?: boolean;
};

type SocialLink = {
  id: string;
  label: string;
  url: string;
  icon: React.ReactNode;
};

const textColor = "#F2F1E8";

function NavBar<T extends string>({
  items,
  homeId,
  activeId,
  onNavigate,
  disabled = false,
}: NavbarProps<T>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  const homeItem = useMemo(
    () => items.find((item) => item.id === homeId),
    [items, homeId]
  );

  const socialLinks: SocialLink[] = useMemo(
    () => [
      {
        id: "linkedin",
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/mariam-fathi-amin/",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.063 2C3.817 2 3 2.807 3 3.867 3 4.901 3.79 5.732 5.014 5.732h.024C6.308 5.732 7.099 4.901 7.099 3.867 7.075 2.808 6.309 2 5.063 2Zm10.74 4.953c-1.932 0-2.799 1.045-3.283 1.782V7.207H8.877c.049 1.011 0 10.793 0 10.793h3.643V11.97c0-.324.024-.643.121-.875.264-.643.864-1.314 1.869-1.314 1.32 0 1.847.99 1.847 2.442v5.775H20v-6.188c-.001-3.316-1.799-4.858-4.197-4.858Zm-3.283 1.782v.035h-.024l.024-.035ZM6.861 18H3.217V7.206h3.644V18Z"
              fill="currentColor"
            />
          </svg>
        ),
      },
      {
        id: "webflow",
        label: "Webflow",
        url: "https://webflow.com/@mariam-fathi",
        icon: (
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20 4.02 13.618 16.652H7.624l2.671-5.235h-.12c-2.203 2.896-5.49 4.802-10.175 5.235V11.49S2.996 11.31 4.758 9.435H0V4.02h5.348v4.453l.12-.0004 2.185-4.4526H11.697v4.425l.12-.0003 2.267-4.4251H20Z"
              fill="currentColor"
            />
          </svg>
        ),
      },
      {
        id: "email",
        label: "Email",
        url: "mailto:mariamfathiwork@gmail.com",
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2m20 0v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6m20 0L12 13 2 6"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ),
      },
    ],
    []
  );

  useLayoutEffect(() => {
    if (!wrapperRef.current) return;

    const ctx = gsap.context(() => {
      if (!overlayRef.current || !menuContentRef.current) return;

      const linkElements = gsap.utils.toArray<HTMLElement>(
        menuContentRef.current.querySelectorAll("[data-menu-link]")
      );

      const socialContainer = socialsRef.current;
      const socialElements = socialContainer
        ? (Array.from(socialContainer.querySelectorAll("[data-social-link]")) as HTMLElement[])
        : [];

      const timeline = gsap.timeline({
        paused: true,
        defaults: { ease: "power3.out" },
      });

      timeline
        .set(overlayRef.current, {
          autoAlpha: 0,
          pointerEvents: "none",
        })
        .set(menuContentRef.current, {
          yPercent: 6,
          rotateX: -10,
          opacity: 0,
          transformOrigin: "top center",
        })
        .fromTo(
          overlayRef.current,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.35,
            pointerEvents: "auto",
          }
        )
        .to(
          menuContentRef.current,
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            duration: 0.6,
          },
          0
        )
        .from(
          linkElements,
          {
            yPercent: 110,
            opacity: 0,
            duration: 0.65,
            stagger: 0.08,
          },
          0.05
        )
        .from(
          socialElements,
          {
            y: 16,
            opacity: 0,
            duration: 0.45,
            stagger: 0.05,
          },
          "-=0.35"
        );

      timeline.eventCallback("onReverseComplete", () => {
        if (overlayRef.current) {
          gsap.set(overlayRef.current, { pointerEvents: "none" });
        }
      });

      timelineRef.current = timeline;
    }, wrapperRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    if (menuOpen) {
      timeline.play();
    } else {
      timeline.reverse();
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      setMenuOpen(false);
    }
  }, [disabled]);

  const handleToggleMenu = useCallback(() => {
    if (disabled) return;
    setMenuOpen((prev) => !prev);
  }, [disabled]);

  const handleNavigate = useCallback(
    (id: T) => {
      if (disabled) return;
      setMenuOpen(false);
      onNavigate(id);
    },
    [disabled, onNavigate]
  );

  const handleCloseMenu = useCallback(() => {
    if (disabled) return;
    setMenuOpen(false);
    menuToggleRef.current?.focus({ preventScroll: true });
  }, [disabled]);

  useEffect(() => {
    if (!menuOpen) return;

    const firstLink = menuLinksRef.current?.querySelector(
      "button[data-menu-link]"
    ) as HTMLButtonElement | null;

    firstLink?.focus({ preventScroll: true });
  }, [menuOpen]);

  useEffect(() => {
    const toggle = menuToggleRef.current;
    if (!toggle) return;

    toggle.setAttribute("aria-expanded", menuOpen ? "true" : "false");
  }, [menuOpen]);

  const activeLabel = useMemo(() => {
    const activeItem = items.find((item) => item.id === activeId);
    return activeItem?.label ?? "";
  }, [items, activeId]);

  const renderSplitText = useCallback(
    (label: string, variant: "primary" | "secondary") => {
      const characters = Array.from(label);

      return (
        <span className="flex flex-wrap gap-[0.35em] uppercase">
          {characters.map((character, index) => {
            const isSpace = character === " ";
            const isEven = index % 2 === 0;

            const baseTransformClass =
              variant === "primary"
                ? "translate-y-0 opacity-100"
                : isEven
                ? "translate-y-full opacity-0"
                : "-translate-y-full opacity-0";

            return (
              <span
                key={`${label}-${variant}-${index}`}
                className="relative inline-block overflow-hidden leading-none"
                style={{ width: isSpace ? "0.6em" : undefined }}
              >
                <span
                  className={`inline-block transition-transform transition-opacity duration-200 ease-out ${baseTransformClass} ${
                    variant === "primary"
                      ? isEven
                        ? "group-hover:[animation:nav-link-primary_1s_cubic-bezier(0.6,0.05,0.19,0.97)_forwards]"
                        : "group-hover:[animation:nav-link-primary-reverse_1s_cubic-bezier(0.6,0.05,0.19,0.97)_forwards]"
                      : isEven
                      ? "group-hover:[animation:nav-link-secondary_1s_cubic-bezier(0.6,0.05,0.19,0.97)_forwards]"
                      : "group-hover:[animation:nav-link-secondary-reverse_1s_cubic-bezier(0.6,0.05,0.19,0.97)_forwards]"
                  }`}
                  style={{ transitionDelay: `${index * 30}ms` }}
                >
                  {isSpace ? "\u00A0" : character}
                </span>
              </span>
            );
          })}
        </span>
      );
    },
    []
  );

  return (
    <div ref={wrapperRef} className="pointer-events-none fixed inset-0 z-50">
      <div className="pointer-events-auto flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-6">
          <button
            ref={menuToggleRef}
            type="button"
            onClick={handleToggleMenu}
            disabled={disabled}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080E0B]"
          >
            <span
              className={`absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 ${
                menuOpen ? "rotate-45 scale-95" : "rotate-0 scale-100"
              }`}
            >
              <span
                className={`absolute left-1/2 top-[30%] h-[2px] w-6 -translate-x-1/2 transform rounded-full transition-all duration-500 ${
                  menuOpen ? "top-1/2 rotate-45" : ""
                }`}
                style={{ backgroundColor: textColor }}
              />
              <span
                className={`absolute left-1/2 top-[52%] h-[2px] w-6 -translate-x-1/2 transform rounded-full transition-all duration-500 ${
                  menuOpen ? "opacity-0" : ""
                }`}
                style={{ backgroundColor: textColor }}
              />
              <span
                className={`absolute left-1/2 top-[74%] h-[2px] w-6 -translate-x-1/2 transform rounded-full transition-all duration-500 ${
                  menuOpen ? "top-1/2 -rotate-45" : ""
                }`}
                style={{ backgroundColor: textColor }}
              />
            </span>
          </button>

  

        </div>

    
      </div>

      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 flex items-stretch justify-center bg-[#080E0B]/95 backdrop-blur-sm"
        style={{ opacity: 0 }}
        aria-hidden={!menuOpen}
      >
        <div
          ref={menuContentRef}
          className="relative flex h-full w-full flex-col justify-between px-6 pb-12 pt-28 sm:pb-16 sm:pt-32 md:px-16 lg:px-24"
        >
          <button
            type="button"
            onClick={handleCloseMenu}
            aria-label="Close menu"
            className={`absolute right-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080E0B] sm:right-16 sm:top-16 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          >
            <span className="relative block h-6 w-6">
              <span
                className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full"
                style={{ backgroundColor: textColor }}
              />
              <span
                className="absolute left-1/2 top-1/2 h-[2px] w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full"
                style={{ backgroundColor: textColor }}
              />
            </span>
          </button>

          <div className="flex flex-col gap-10 lg:gap-14">
            <div className="flex flex-col gap-6 text-xs uppercase tracking-[0.4em] text-white/40">
              <span>Menu</span>
              <span className="h-px w-16 bg-white/15" />
            </div>

            <div
              ref={menuLinksRef}
              className="flex flex-col gap-4 md:gap-6"
            >
              {items.map(({ id, label }) => {
                const isActive = id === activeId;
                return (
                  <button
                    key={id}
                    type="button"
                    data-menu-link
                    onClick={() => handleNavigate(id)}
                    disabled={disabled}
                    className="group flex w-full flex-col items-start gap-1 text-left focus:outline-none"
                  >
                    <p
                      className={`text-3xl font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-300 sm:text-4xl md:text-5xl ${
                        isActive ? "text-[#C7F284]" : ""
                      } [&>span]:leading-tight`}
                    >
                      {renderSplitText(label, "primary")}
                    </p>
                    <p
                      aria-hidden="true"
                      className={`text-3xl font-semibold uppercase tracking-[0.25em] text-white/10 transition-colors duration-300 sm:text-4xl md:text-5xl ${
                        isActive ? "text-[#C7F284]/30" : ""
                      } [&>span]:leading-tight`}
                    >
                      {renderSplitText(label, "secondary")}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div
            ref={socialsRef}
            className="flex flex-wrap items-center gap-6 text-sm uppercase tracking-[0.35em] text-white/60"
          >
            {socialLinks.map((social) => (
              <a
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white focus:outline-none"
                data-social-link
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5">
                  {social.icon}
                </span>
                <span>{social.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;