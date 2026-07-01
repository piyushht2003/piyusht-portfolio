"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FiDownload } from "react-icons/fi";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
] as const;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [mobileOpen, setMobileOpen] = useState(false);

  // Track scroll position for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      setMobileOpen(false);
    },
    []
  );

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.76, 0, 0.24, 1] as any }}
        className="fixed top-5 left-2 right-2 z-40 px-6 md:px-12 py-4 flex items-center justify-between transition-colors duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(5,2,8,0.85)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(24px)" : "none",
        }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="relative"
        >
          <span
            className="text-lg font-bold tracking-[0.1em]"
            style={{
              color: "#e5e5e5",
              fontFamily: "var(--font-heading), sans-serif",
            }}
          >
            PST
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm tracking-[0.08em] uppercase transition-colors duration-300"
                  style={{
                    color: isActive ? "#e5e5e5" : "#777777",
                    fontFamily: "var(--font-body), sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e5e5e5";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.color = "#777777";
                    }
                  }}
                >
                  {link.label}
                </a>
                {/* Active dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavDot"
                    className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full"
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor: "#e5e5e5",
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Resume button — desktop */}
        <a
          href="/resume.pdf"
          download
          className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--color-border-hover)] bg-[rgba(255,255,255,0.04)] text-sm tracking-[0.08em] uppercase transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)] hover:border-[var(--color-accent-active)]"
          style={{
            color: "#e5e5e5",
            fontFamily: "var(--font-body), sans-serif",
          }}
        >
          Resume <FiDownload size={14} />
        </a>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[6px] cursor-pointer"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={
              mobileOpen
                ? { rotate: 45, y: 4, backgroundColor: "#e5e5e5" }
                : { rotate: 0, y: 0, backgroundColor: "#e5e5e5" }
            }
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] as any }}
            className="block w-6 h-[1.5px] origin-center"
          />
          <motion.span
            animate={
              mobileOpen
                ? { rotate: -45, y: -4, backgroundColor: "#e5e5e5" }
                : { rotate: 0, y: 0, backgroundColor: "#e5e5e5" }
            }
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] as any }}
            className="block w-6 h-[1.5px] origin-center"
          />
        </button>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] as any }}
            className="fixed inset-0 z-35 flex flex-col items-center justify-center"
            style={{ backgroundColor: "#050208" }}
          >
            <nav className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15 + i * 0.07,
                    ease: [0.215, 0.61, 0.355, 1] as any,
                  }}
                  className="text-3xl font-light tracking-[0.12em] uppercase transition-colors duration-300"
                  style={{
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "#e5e5e5"
                        : "#777777",
                    fontFamily: "var(--font-heading), sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#e5e5e5";
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== link.href.replace("#", "")) {
                      e.currentTarget.style.color = "#777777";
                    }
                  }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="/resume.pdf"
                download
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.5,
                  delay: 0.15 + NAV_LINKS.length * 0.07,
                  ease: [0.215, 0.61, 0.355, 1] as any,
                }}
                className="flex items-center gap-3 mt-4 px-8 py-3 rounded-full border border-[var(--color-border-hover)] bg-[rgba(255,255,255,0.04)] text-2xl font-light tracking-[0.12em] uppercase transition-all duration-300 hover:bg-[rgba(255,255,255,0.1)]"
                style={{
                  color: "#e5e5e5",
                  fontFamily: "var(--font-heading), sans-serif",
                }}
              >
                Resume <FiDownload size={20} />
              </motion.a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
