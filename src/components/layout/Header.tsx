"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub, FaStar } from "react-icons/fa";
import { personal } from "@/data/personal";
import { useTheme } from "next-themes";
import { useIsMounted, useIsMobile } from "@/hooks/useMounted";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [visible, setVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [starCount, setStarCount] = useState<number | null>(null);
  const isMobile = useIsMobile();
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted ? resolvedTheme !== "light" : true;

  // Fetch GitHub Star count
  useEffect(() => {
    fetch("https://api.github.com/repos/tcminh1405/trancongminh-portfolio")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && typeof data.stargazers_count === "number") {
          setStarCount(data.stargazers_count);
        }
      })
      .catch(() => { });
  }, []);

  const isClickingRef = useRef(false);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    setActiveSection(sectionId);
    isClickingRef.current = true;

    const el = document.getElementById(sectionId);
    if (el) {
      const yOffset = -90;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      isClickingRef.current = false;
    }, 1000);
  };

  // Scroll → visible + progress bar
  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 50);
      const total = document.body.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Hiện header sau khi mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Active section highlight
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const obs = new IntersectionObserver(
      (entries) => {
        if (isClickingRef.current) return; // Skip intermediate updates during click smooth scroll
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const close = () => setMenuOpen(false);

  // CSS-in-JS styles cho header — không mix Tailwind để tránh conflict
  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: "1.5rem",
    left: "50%",
    zIndex: 999,
    width: "90%",
    maxWidth: "1400px",
    background: isDark ? "rgba(9, 14, 17, 0.88)" : "rgba(248, 248, 249, 0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: isDark ? "1px solid var(--border-color)" : "1px solid rgba(0, 0, 0, 0.1)",
    borderRadius: "9999px",
    padding: isMobile ? "0.6rem 1rem" : "0.75rem 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    opacity: visible ? 1 : 0,
    transform: visible ? "translateX(-50%)" : "translate(-50%, -100px)",
    transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
  };

  const navLinkStyle = (id: string): React.CSSProperties => ({
    position: "relative",
    zIndex: 1,
    padding: "0.5rem 1.1rem",
    borderRadius: "9999px",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: activeSection === id ? 600 : 500,
    transition: "color 0.25s ease",
    whiteSpace: "nowrap",
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      {/* ── Thanh tiến trình cuộn ── */}
      <div
        aria-hidden="true"
        suppressHydrationWarning
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "4px",
          width: `${progress}%`,
          background: "linear-gradient(90deg, #155dfc 0%, #488bfb 50%, #0ea5e9 100%)",
          boxShadow: "0 0 12px rgba(72, 139, 251, 0.8), 0 0 4px rgba(14, 165, 233, 0.6)",
          zIndex: 1000,
          transition: "width 0.1s linear",
        }}
      />

      {/* ── Header pill ── */}
      <header style={headerStyle} suppressHydrationWarning>

        {/* Logo — SVG */}
        <Link href="#hero" onClick={close} style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }} suppressHydrationWarning>
          <Logo />
        </Link>

        {/* ── Desktop nav + Resume + Star on GitHub + ThemeToggle ── */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }} suppressHydrationWarning>

            {/* Nav với Framer Motion sliding pill indicator */}
            <nav style={{ position: "relative", display: "flex", alignItems: "center" }} aria-label="Navigation chính">
              {navLinks.map(({ href, label }) => {
                const sectionId = href.slice(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => handleNavClick(e, sectionId)}
                    className={`nav-item-link ${isActive ? "is-active" : ""}`}
                    style={navLinkStyle(sectionId)}
                    suppressHydrationWarning
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeHeaderPill"
                        transition={{
                          duration: 0.35,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "9999px",
                          background: isDark
                            ? "linear-gradient(135deg, #155dfc 0%, #488bfb 100%)"
                            : "linear-gradient(135deg, #0284c7 0%, #2563eb 100%)",
                          boxShadow: isDark
                            ? "0 4px 15px rgba(72, 139, 251, 0.4)"
                            : "0 4px 14px rgba(37, 99, 235, 0.35)",
                          border: isDark
                            ? "1px solid rgba(72, 139, 251, 0.6)"
                            : "1px solid rgba(37, 99, 235, 0.5)",
                          zIndex: 0,
                        }}
                      />
                    )}
                    <span style={{ position: "relative", zIndex: 1 }}>{label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Resume button */}
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              suppressHydrationWarning
              style={{
                background: "#4ade80",
                color: "#0a0f1e",
                padding: "0.5rem 1.1rem",
                borderRadius: "9999px",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 700,
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
                boxShadow: "0 4px 14px rgba(74, 222, 128, 0.3)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "translateY(-2px) scale(1.03)";
                el.style.boxShadow = "0 6px 20px rgba(74, 222, 128, 0.5)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.transform = "none";
                el.style.boxShadow = "0 4px 14px rgba(74, 222, 128, 0.3)";
              }}
            >
              Resume
            </a>

            {/* Star on GitHub button — Giữ màu gốc của nút, thêm số star */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Star on GitHub"
              suppressHydrationWarning
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.45rem 0.95rem",
                borderRadius: "9999px",
                border: isDark ? "1px solid var(--border-color)" : "1px solid rgba(0, 0, 0, 0.12)",
                background: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)",
                color: isDark ? "#e2e8f0" : "#334155",
                fontSize: "0.85rem",
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.25s ease",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = isDark ? "var(--accent-blue)" : "#000";
                el.style.borderColor = isDark ? "var(--accent-blue)" : "#000";
                el.style.background = isDark ? "rgba(72, 139, 251, 0.12)" : "rgba(0, 0, 0, 0.05)";
                el.style.transform = "translateY(-2px) scale(1.03)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = isDark ? "#e2e8f0" : "#334155";
                el.style.borderColor = isDark ? "var(--border-color)" : "rgba(0, 0, 0, 0.12)";
                el.style.background = isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(0, 0, 0, 0.03)";
                el.style.transform = "none";
              }}
            >
              <FaGithub size={16} />
              <span>Star</span>
              <FaStar size={12} style={{ color: "#f59e0b" }} />
              <span
                style={{
                  background: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
                  padding: "0.1rem 0.45rem",
                  borderRadius: "9999px",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                }}
              >
                {starCount !== null ? starCount : 12}
              </span>
            </a>

            <ThemeToggle />
          </div>
        )}

        {/* ── Mobile: hamburger + ThemeToggle ── */}
        {isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen((p) => !p)}
              aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
              aria-expanded={menuOpen}
              style={{ background: "none", border: "none", color: isDark ? "#a1a1aa" : "#52525b", cursor: "pointer", padding: "0.25rem", lineHeight: 0 }}
            >
              {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        )}
      </header>

      {/* ── Mobile Slide-Over Drawer + Backdrop Blur Overlay ── */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              style={{
                position: "fixed",
                inset: 0,
                background: isDark ? "rgba(0, 0, 0, 0.65)" : "rgba(0, 0, 0, 0.4)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                zIndex: 1001,
              }}
            />

            {/* Right Slide-over Drawer Panel */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              style={{
                position: "fixed",
                top: 0,
                right: 0,
                bottom: 0,
                width: "80vw",
                maxWidth: "320px",
                height: "100vh",
                zIndex: 1002,
                background: isDark ? "rgba(9, 14, 17, 0.96)" : "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderLeft: isDark ? "1px solid var(--border-color)" : "1px solid rgba(0, 0, 0, 0.1)",
                padding: "1.5rem 1.25rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "-10px 0 30px rgba(0, 0, 0, 0.4)",
                overflowY: "auto",
              }}
            >
              {/* Drawer Top Header (Logo + Close icon) */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingBottom: "1.25rem",
                  borderBottom: isDark ? "1px solid var(--border-color)" : "1px solid rgba(0, 0, 0, 0.1)",
                  marginBottom: "1.25rem",
                }}
              >
                <Logo />
                <button
                  onClick={close}
                  aria-label="Đóng menu"
                  style={{
                    background: "none",
                    border: "none",
                    color: isDark ? "#a1a1aa" : "#52525b",
                    cursor: "pointer",
                    padding: "0.4rem",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                  }}
                >
                  <FiX size={24} />
                </button>
              </div>

              {/* Navigation Links */}
              <nav style={{ display: "flex", flexDirection: "column", gap: "0.35rem", flex: 1 }}>
                {navLinks.map(({ href, label }) => {
                  const sectionId = href.slice(1);
                  const isActive = activeSection === sectionId;
                  return (
                    <a
                      key={href}
                      href={href}
                      onClick={(e) => {
                        handleNavClick(e, sectionId);
                        close();
                      }}
                      className={`mobile-nav-link ${isActive ? "is-active" : ""}`}
                      suppressHydrationWarning
                      style={{
                        padding: "0.75rem 1rem",
                        color: isActive
                          ? (isDark ? "var(--accent-blue)" : "#0ea5e9")
                          : (isDark ? "#e8f0f4" : "#18181b"),
                        textDecoration: "none",
                        fontSize: "1rem",
                        fontWeight: isActive ? 600 : 500,
                        borderRadius: "0.75rem",
                        background: isActive
                          ? (isDark ? "rgba(72, 139, 251, 0.12)" : "rgba(14, 165, 233, 0.08)")
                          : "transparent",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {label}
                    </a>
                  );
                })}
              </nav>

              {/* Action Buttons at bottom of Drawer */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  paddingTop: "1.25rem",
                  borderTop: isDark ? "1px solid var(--border-color)" : "1px solid rgba(0, 0, 0, 0.1)",
                  marginTop: "auto",
                }}
              >
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "0.75rem 1rem",
                    borderRadius: "9999px",
                    background: "#4ade80",
                    color: "#0a0f1e",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    textDecoration: "none",
                  }}
                >
                  Resume
                </a>

                <a
                  href={personal.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={close}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.75rem 1rem",
                    borderRadius: "9999px",
                    border: isDark ? "1px solid var(--border-color)" : "1px solid rgba(0, 0, 0, 0.15)",
                    color: isDark ? "#e8f0f4" : "#18181b",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                  }}
                >
                  <FaGithub size={18} /> Star on GitHub <FaStar size={14} style={{ color: "#f59e0b" }} />
                  <span
                    style={{
                      background: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.08)",
                      padding: "0.15rem 0.5rem",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                    }}
                  >
                    {starCount !== null ? starCount : 12}
                  </span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

