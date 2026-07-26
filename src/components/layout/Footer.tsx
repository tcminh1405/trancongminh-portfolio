// Footer — 3 cột theo đúng bản gốc:
// - Col 1 (2fr): Logo gradient + description
// - Col 2 (1fr): Quick Links (hover shift right)
// - Col 3 (1fr): Connect with Me (GitHub, LinkedIn, Email + icon)
// - Copyright bar với border-top

import { FaGithub, FaLinkedinIn, FaEnvelope } from "react-icons/fa";
import { personal } from "@/data/personal";
import Link from "next/link";
import Logo from "../ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
