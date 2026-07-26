"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Logo from "@/components/ui/Logo";
import { FiMenu, FiX } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
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
  const isMobile = useIsMobile();
  const navRef = useRef<HTMLElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted ? resolvedTheme !== "light" : true;

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
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  // Di chuyển indicator đến link active
  const moveIndicator = useCallback(() => {
    const nav = navRef.current;
    const ind = indicatorRef.current;
    if (!nav || !ind) return;
    const link = nav.querySelector<HTMLAnchorElement>(`a[href="#${activeSection}"]`);
    if (!link) { ind.style.opacity = "0"; return; }
    const nr = nav.getBoundingClientRect();
    const lr = link.getBoundingClientRect();
    ind.style.width = `${lr.width}px`;
    ind.style.left = `${lr.left - nr.left}px`;
    ind.style.opacity = "1";
  }, [activeSection]);

  useEffect(() => { moveIndicator(); }, [moveIndicator]);

  const close = () => setMenuOpen(false);

  // CSS-in-JS styles cho header — không mix Tailwind để tránh conflict
  const headerStyle: React.CSSProperties = {
    position: "fixed",
    top: "1.5rem",
    left: "50%",
    zIndex: 999,
    width: "90%",
    maxWidth: "1400px",
    background: isDark ? "rgba(10, 15, 30, 0.88)" : "rgba(255, 255, 255, 0.88)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    border: isDark ? "1px solid rgba(168, 85, 247, 0.2)" : "1px solid rgba(0, 0, 0, 0.1)",
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
    padding: "0.5rem 1rem",
    color: activeSection === id
      ? (isDark ? "#f4f4f5" : "#18181b")
      : (isDark ? "#a1a1aa" : "#52525b"),
    textDecoration: "none",
    fontSize: "0.9rem",
    transition: "color 0.3s",
    whiteSpace: "nowrap",
  });

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
          height: "8px",
          width: `${progress}%`,
          background: "linear-gradient(to right, #a855f7, #0ea5e9)",
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

        {/* ── Desktop nav + Resume + ThemeToggle ── */}
        {/* Dùng isMobile state thay vì CSS để tránh inline style override */}
        {!isMobile && (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }} suppressHydrationWarning>

            {/* Nav với sliding indicator */}
            <nav ref={navRef} style={{ position: "relative", display: "flex", alignItems: "center" }} aria-label="Navigation chính">
              {/* Indicator bubble */}
              <span
                ref={indicatorRef}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  height: "100%",
                  background: isDark ? "rgba(168,85,247,0.12)" : "rgba(0,0,0,0.05)",
                  borderRadius: "9999px",
                  zIndex: 0,
                  transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
                  opacity: 0,
                  pointerEvents: "none",
                }}
              />
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} style={navLinkStyle(href.slice(1))} suppressHydrationWarning>
                  {label}
                </Link>
              ))}
            </nav>

            {/* Resume button — xanh lá gốc */}
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
                transition: "transform 0.2s, opacity 0.2s",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              Resume
            </a>

            {/* GitHub icon button */}
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              suppressHydrationWarning
              style={{
                color: isDark ? "#94a3b8" : "#52525b",
                width: 36,
                height: 36,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                border: isDark ? "1px solid rgba(168,85,247,0.2)" : "1px solid rgba(0,0,0,0.1)",
                transition: "color 0.2s, border-color 0.2s, background 0.2s",
                flexShrink: 0,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = isDark ? "#a855f7" : "#000";
                el.style.borderColor = isDark ? "#a855f7" : "#000";
                el.style.background = isDark ? "rgba(168,85,247,0.1)" : "rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = isDark ? "#94a3b8" : "#52525b";
                el.style.borderColor = isDark ? "rgba(168,85,247,0.2)" : "rgba(0,0,0,0.1)";
                el.style.background = "transparent";
              }}
            >
              <FaGithub size={18} />
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
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        )}
      </header>

      {/* ── Mobile drawer ── */}
      <AnimatePresence initial={false}>
        {menuOpen && (
          <motion.div
            key="drawer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { duration: 0.25 } }}
            exit={{ height: 0, opacity: 0, transition: { duration: 0.2 } }}
            style={{
              position: "fixed",
              top: "88px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "90%",
              maxWidth: "1400px",
              zIndex: 998,
              overflow: "hidden",
              borderRadius: "1.5rem",
              background: isDark ? "rgba(10,15,30,0.96)" : "rgba(255,255,255,0.96)",
              backdropFilter: "blur(14px)",
              border: isDark ? "1px solid rgba(168,85,247,0.2)" : "1px solid rgba(0,0,0,0.1)",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", padding: "1rem", gap: "0.25rem" }}>
              {navLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={close}
                  suppressHydrationWarning
                  style={{
                    padding: "0.625rem 1rem",
                    color: isDark ? "#a1a1aa" : "#52525b",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    borderRadius: "0.75rem",
                  }}
                >
                  {label}
                </Link>
              ))}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  justifyContent: "center",
                  padding: "0.625rem 1rem",
                  borderRadius: "9999px",
                  background: "#4ade80",
                  color: "#0a0f1e",
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  textDecoration: "none",
                }}
              >
                Resume
              </a>

              {/* GitHub — mobile drawer */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                style={{
                  marginTop: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  padding: "0.625rem 1rem",
                  borderRadius: "0.75rem",
                  color: isDark ? "#a1a1aa" : "#52525b",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                }}
              >
                <FaGithub size={16} /> GitHub
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
