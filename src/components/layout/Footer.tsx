"use client";

import { useState, useEffect, useRef } from "react";
import { FaGithub, FaLinkedinIn, FaEnvelope, FaEye, FaUsers } from "react-icons/fa";
import { personal } from "@/data/personal";
import Link from "next/link";
import Logo from "../ui/Logo";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/useMounted";

const BASE_VISITS = 1280;
const BASE_VIEWS = 3510;

function CountUpNumber({ targetValue }: { targetValue: number }) {
  const [displayValue, setDisplayValue] = useState(targetValue);
  const prevTargetRef = useRef(targetValue);

  useEffect(() => {
    const startValue = prevTargetRef.current;
    const endValue = targetValue;
    if (startValue === endValue) return;

    let startTimestamp: number | null = null;
    const duration = 1200; // 1.2s smooth roll up

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(startValue + (endValue - startValue) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        prevTargetRef.current = endValue;
      }
    };

    requestAnimationFrame(step);
  }, [targetValue]);

  return <span suppressHydrationWarning>{displayValue.toLocaleString()}</span>;
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { resolvedTheme } = useTheme();
  const mounted = useIsMounted();
  const isDark = mounted ? resolvedTheme !== "light" : true;

  const [visitCount, setVisitCount] = useState<number>(1280);
  const [pageViews, setPageViews] = useState<number>(3510);

  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      // 1. Fetch & increment global page views
      fetch("https://api.counterapi.dev/v1/trancongminh-portfolio/pageviews/up")
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && typeof data.count === "number") {
            setPageViews(BASE_VIEWS + data.count);
          }
        })
        .catch(() => { });

      // 2. Fetch & increment global visits (unique per session)
      const isNewSession = !sessionStorage.getItem("portfolio_global_session");
      const visitUrl = isNewSession
        ? "https://api.counterapi.dev/v1/trancongminh-portfolio/visits/up"
        : "https://api.counterapi.dev/v1/trancongminh-portfolio/visits";

      if (isNewSession) {
        sessionStorage.setItem("portfolio_global_session", "true");
      }

      fetch(visitUrl)
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data && typeof data.count === "number") {
            setVisitCount(BASE_VISITS + data.count);
          }
        })
        .catch(() => { });
    }, 0);

    return () => clearTimeout(timer);
  }, [mounted]);

  return (
    <footer
      style={{
        color: "var(--text-secondary)",
        paddingTop: "4rem",
        borderTop: "1px solid var(--border-color)",
        marginTop: "4rem",
      }}
    >
      <div className="container">

        {/* Grid 3 cột: 2fr 1fr 1fr */}
        <div className="footer-grid">
          {/* Cột 1: Logo + about */}
          <div className="footer-brand-col">
            <h3
              style={{
                fontWeight: "bold",
                fontSize: "1.5rem",
                marginBottom: "1rem",
              }}
            >
              {/* Logo — SVG */}
              <Link href="#hero" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center" }} suppressHydrationWarning>
                <Logo />
              </Link>
            </h3>
            <p style={{ maxWidth: "300px", lineHeight: 1.7, fontSize: "0.9rem" }}>
              A passionate Web Developer dedicated to building beautiful and useful applications.
            </p>
          </div>

          {/* Cột 2: Quick Links */}
          <div>
            <h4
              style={{
                color: "var(--text-primary)",
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              {[
                { href: "#hero", label: "Home" },
                { href: personal.resumeUrl, label: "Resume", external: true },
                { href: "#projects", label: "Projects" },
                { href: "#contact", label: "Contact" },
              ].map(({ href, label, external }) => (
                <li key={label} style={{ marginBottom: "0.75rem" }}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="footer-link"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Cột 3: Connect */}
          <div>
            <h4
              style={{
                color: "var(--text-primary)",
                fontSize: "1.1rem",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              Connect with Me
            </h4>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li style={{ marginBottom: "0.75rem" }}>
                <a href={personal.github} target="_blank" rel="noopener noreferrer" className="footer-link" suppressHydrationWarning>
                  <FaGithub size={16} /> GitHub
                </a>
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <a href={personal.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link" suppressHydrationWarning>
                  <FaLinkedinIn size={16} /> LinkedIn
                </a>
              </li>
              <li style={{ marginBottom: "0.75rem" }}>
                <a href={`mailto:${personal.email}`} className="footer-link" suppressHydrationWarning>
                  <FaEnvelope size={16} /> Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Visitor Statistics Bar ── */}
        <div
          style={{
            marginTop: "3rem",
            marginBottom: "1.5rem",
            padding: "0.85rem 1.5rem",
            borderRadius: "1rem",
            background: isDark ? "rgba(10, 16, 26, 0.65)" : "rgba(241, 245, 249, 0.85)",
            border: "1px solid var(--border-color)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.75rem",
            flexWrap: "wrap",
            fontSize: "0.85rem",
            color: "var(--text-secondary)",
            boxShadow: isDark ? "0 4px 20px rgba(0, 0, 0, 0.25)" : "0 2px 10px rgba(0, 0, 0, 0.03)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <span className="green-dot-pulse" />
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Currently Viewing:</span>
            <span style={{ color: "#4ade80", fontWeight: 700 }} suppressHydrationWarning>1 Active</span>
          </div>

          <div style={{ width: 1, height: 16, background: "var(--border-color)", opacity: 0.6 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaUsers style={{ color: "#38bdf8" }} size={15} />
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Total Visitors:</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
              <CountUpNumber targetValue={visitCount} />
            </span>
          </div>

          <div style={{ width: 1, height: 16, background: "var(--border-color)", opacity: 0.6 }} />

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FaEye style={{ color: "#a855f7" }} size={15} />
            <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>Total Page Views:</span>
            <span style={{ fontWeight: 700, color: "var(--text-primary)" }}>
              <CountUpNumber targetValue={pageViews} />
            </span>
          </div>
        </div>

        {/* Copyright bar */}
        <div
          style={{
            padding: "1.5rem 0",
            textAlign: "center",
            fontSize: "0.875rem",
            borderTop: "1px solid var(--border-color)",
          }}
        >
          <p>Copyright © {currentYear} {personal.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
