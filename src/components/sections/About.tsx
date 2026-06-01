// About — layout khớp bản gốc:
// - Grid 1fr/1.2fr, gap 3rem, align flex-start
// - Bên trái: ảnh full-width, status-tag absolute bottom-left
// - Bên phải: 2 đoạn text + info-box-wrapper glass-card (2-col grid) + Download Resume button

import Image from "next/image";
import { personal } from "@/data/personal";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

export default function About() {
  return (
    <section id="about" className="content-section">
      <div className="container">

        {/* Section header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge">My personal story</div>
          <h2 className="section-title">About Me</h2>
          <div className="title-underline" />
        </div>

        {/* Grid 2 cột: ảnh | text */}
        <div className="about-grid">
          {/* Ảnh bên trái */}
          <ScrollAnimation direction="left">
            <div className="about-image-col">
              <div
                style={{
                  position: "relative",
                  borderRadius: "1rem",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={personal.avatar}
                  alt={`Ảnh của ${personal.name}`}
                  width={600}
                  height={750}
                  className="w-full block"
                  style={{ objectFit: "cover" }}
                  priority
                />
                {/* Status tag — absolute bottom-left, pill shape */}
                <div
                  style={{
                    position: "absolute",
                    bottom: "1rem",
                    left: "1rem",
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(5px)",
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#f4f4f5",
                  }}
                >
                  {/* Green dot */}
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      background: "#4ade80",
                      borderRadius: "50%",
                      display: "inline-block",
                    }}
                  />
                  Available for work
                </div>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation direction="right">
            <div>
              <h3 style={{ color: "var(--text-primary)", fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                Hello, I'm {personal.name}
              </h3>
              <p style={{
                background: "linear-gradient(135deg, #a855f7, #0ea5e9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                fontWeight: 700,
                fontSize: "1.1rem",
                marginBottom: "1.5rem"
              }}>
                {personal.title}
              </p>

              <p style={{ color: "var(--text-secondary)", marginBottom: "1.25rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
                I am a final-year Software Engineering student, passionate about full-stack web development. I enjoy building responsive interfaces, designing REST APIs, and creating scalable application architectures. My goal is to write clean, maintainable code to transform ideas into reliable, practical software products.
              </p>
              <p style={{ color: "var(--text-secondary)", marginBottom: "1.5rem", lineHeight: 1.7, fontSize: "0.95rem" }}>
                I enjoy creating modern web solutions and turning ideas into reliable software products through clean code and thoughtful development.
              </p>

              {/* Info box wrapper — glass-card, 2-col grid */}
              <div
                className="glass-card"
                style={{ marginTop: "2rem", padding: "1.5rem" }}
              >
                <div
                  className="about-info-grid"
                >
                  {/* Name */}
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", display: "block", marginBottom: "0.25rem" }}>
                      Name
                    </span>
                    <p style={{ color: "var(--text-primary)", fontWeight: 500 }}>{personal.name}</p>
                  </div>
                  {/* Email */}
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", display: "block", marginBottom: "0.25rem" }}>
                      Email
                    </span>
                    <p style={{ color: "var(--text-primary)", fontWeight: 500, wordBreak: "break-all" }}>{personal.email}</p>
                  </div>
                  {/* Location */}
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", display: "block", marginBottom: "0.25rem" }}>
                      Location
                    </span>
                    <p style={{ color: "var(--text-primary)", fontWeight: 500 }}>{personal.location}</p>
                  </div>
                  {/* Availability */}
                  <div>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.875rem", display: "block", marginBottom: "0.25rem" }}>
                      Availability
                    </span>
                    <p style={{ color: "#4ade80", fontWeight: 500 }}>
                      {personal.phone ?? "Open to Internship"}
                    </p>
                  </div>
                </div>

                {/* Download Resume button — khớp bản gốc */}
                <a
                  href={personal.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "center",
                    padding: "0.75rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Download Resume ↓
                </a>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
}
