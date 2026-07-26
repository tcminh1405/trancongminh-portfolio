"use client";

// Hero :
// - min-height: 100vh, wallpaper nền + radial-gradient overlay
// - 3 floating shapes blur (tím top-left, hồng bottom-right, xanh center)
// - Grid 2 cột: profile-card (340px) | hero-text
// - Profile card: glass-card, avatar tròn + status online, profile-details
// - Hero text: welcome-badge, h1 gradient, description, btn-primary + btn-secondary, social links
// - Scroll down indicator animation

import Image from "next/image";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { personal } from "@/data/personal";
import ThreeBackground from "@/components/ui/ThreeBackground";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useMounted";

// Stagger animation cho hero text items
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Hero() {
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted ? resolvedTheme !== "light" : true;

  const description =
    personal.description.length > 200
      ? personal.description.slice(0, 197) + "..."
      : personal.description;

  return (
    <section
      id="hero"
      suppressHydrationWarning
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        paddingTop: "8rem",   // chừa chỗ cho header floating
        paddingBottom: "4rem",
        overflow: "hidden",
      }}
    >
      {/* ── Deerflow style Particle Background ── */}
      <ThreeBackground />

      {/* ── Floating shapes ── */}
      {/* Shape 3 — mid gradient, center */}
      <div style={{ position: "absolute", width: 250, height: 250, borderRadius: "50%", background: "#6366f1", top: "40%", left: "45%", filter: "blur(80px)", opacity: 0.2, zIndex: -1, pointerEvents: "none" }} />

      {/* ── Main container ── */}
      <div
        className="container hero-grid"
        suppressHydrationWarning
      >
        {/* ────────── PROFILE CARD (bên trái) ────────── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass-card hero-profile-card"
        >
          {/* Avatar + name + job title */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              <Image
                src={personal.avatar}
                alt={`Avatar của ${personal.name}`}
                width={72}
                height={72}
                priority
                style={{
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid transparent",
                  backgroundClip: "padding-box",
                  boxShadow: "0 0 0 2px var(--accent-blue), 0 0 12px rgba(72,139,251,0.4)",
                  width: 72,
                  height: 72,
                }}
              />
              {/* Status indicator — online (green dot) */}
              <span
                style={{
                  position: "absolute",
                  bottom: 2,
                  right: 2,
                  width: 14,
                  height: 14,
                  background: "#22c55e",
                  borderRadius: "50%",
                  border: "3px solid var(--bg-dark)",
                }}
              />
            </div>
            <div>
              <h2 style={{ fontWeight: 600, fontSize: "1rem", color: "var(--text-primary)", lineHeight: 1.3 }}>
                {personal.name}
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>{personal.title}</p>
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "var(--border-color)", margin: "1rem 0" }} />

          {/* Profile details */}
          <div style={{ fontSize: "0.875rem", color: "var(--text-secondary)" }}>
            <p style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span>📍</span> Ho Chi Minh City, Vietnam
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
              <span>📅</span> Joined 2022
            </p>
            <p style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span>🎓</span> Industrial University of Ho Chi Minh City
            </p>
          </div>
        </motion.div>

        {/* ────────── HERO TEXT (bên phải) ────────── */}
        <motion.div
          className="hero-text-col"
          style={{ textAlign: "left" }}
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {/* Welcome badge */}
          <motion.div variants={itemVariants}>
            <span className="section-badge" style={{ marginBottom: "1.5rem", display: "inline-block" }}>
              Welcome to my Portfolio
            </span>
          </motion.div>

          {/* H1 — clamp font size */}
          <motion.h1
            variants={itemVariants}
            style={{
              fontSize: "clamp(2.2rem, 5vw, 5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              color: "var(--text-primary)",
            }}
          >
            Trần Công Minh<br />
            <span className="gradient-text">Software Engineer</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            style={{ fontSize: "1.125rem", color: "var(--text-secondary)", maxWidth: 600, marginBottom: 0, lineHeight: 1.6 }}
          >
            {description}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="hero-cta-buttons"
            style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}
          >
            <button onClick={() => scrollTo("projects")} className="btn btn-primary">
              View my projects →
            </button>
            <button onClick={() => scrollTo("contact")} className="btn btn-secondary">
              Get in touch
            </button>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={itemVariants}
            className="hero-social-links"
            style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}
          >
            {[
              { href: personal.linkedin, icon: <FaLinkedinIn size={16} />, label: "LinkedIn" },
              { href: personal.github, icon: <FaGithub size={16} />, label: "GitHub" },
              { href: `mailto:${personal.email}`, icon: <FaEnvelope size={16} />, label: "Email" },
            ].map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={label}
                style={{
                  color: "var(--text-secondary)",
                  width: 40,
                  height: 40,
                  display: "grid",
                  placeItems: "center",
                  borderRadius: "50%",
                  border: "1px solid var(--border-color)",
                  transition: "all 0.3s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "var(--text-primary)";
                  el.style.background = isDark ? "rgba(72,139,251,0.12)" : "rgba(57,111,200,0.12)";
                  el.style.borderColor = isDark ? "var(--accent-blue)" : "var(--border-color)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.color = "var(--text-secondary)";
                  el.style.background = "transparent";
                  el.style.borderColor = "var(--border-color)";
                }}
              >
                {icon}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll down indicator ── */}
      <div
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: 24,
          height: 40,
          border: "2px solid var(--border-color)",
          borderRadius: "9999px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "var(--text-secondary)",
            animation: "scroll-down-anim 2s infinite",
          }}
        />
      </div>

    </section>
  );
}
