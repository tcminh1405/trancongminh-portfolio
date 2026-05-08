// Experience — timeline dọc theo đúng bản gốc:
// - Đường dọc 2px ở left: 11px
// - Chấm tròn 24x24, border 3px tím, nền --bg-dark
// - timeline-content glass-card với h3, timeline-meta (màu secondary), description

import { experience } from "@/data/experience";
import { sortExperience } from "@/lib/utils";
import ScrollAnimation from "@/components/ui/ScrollAnimation";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

export default function Experience() {
  const sorted = sortExperience(experience);

  return (
    <section id="experience" className="content-section">
      <div className="container">

        {/* Section header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge">My professional journey</div>
          <h2 className="section-title">Experience & Education</h2>
          <div className="title-underline" />
        </div>

        {/* Timeline */}
        <div
          style={{
            maxWidth: "850px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
            position: "relative",
          }}
        >
          {sorted.map((item, index) => {
            const isEducation =
              item.position.toLowerCase().includes("student") ||
              item.company.toLowerCase().includes("university") ||
              item.company.toLowerCase().includes("school") ||
              item.company.toLowerCase().includes("education");

            const Icon = isEducation ? FaGraduationCap : FaBriefcase;

            return (
              <ScrollAnimation
                key={`${item.company}-${item.startDate}`}
                direction="up"
                delay={index * 0.15}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    position: "relative",
                    alignItems: "stretch",
                  }}
                >
                  {/* Left Column: Timeline Circle Icon & Gradient line */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      flexShrink: 0,
                      position: "relative",
                    }}
                  >
                    {/* Circle Badge */}
                    <div
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        background: "var(--bg-card)",
                        border: "3.5px solid var(--accent-blue)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "var(--accent-blue)",
                        boxShadow: "0 4px 20px rgba(14, 165, 233, 0.15)",
                        zIndex: 2,
                      }}
                    >
                      <Icon size={22} />
                    </div>

                    {/* Gradient vertical line (always fades out to transparent) */}
                    <div
                      style={{
                        width: "3px",
                        flexGrow: 1,
                        background: "linear-gradient(to bottom, var(--accent-blue) 0%, var(--accent-purple) 30%, transparent 100%)",
                        marginTop: "0.5rem",
                        borderRadius: "999px",
                        minHeight: "60px",
                      }}
                    />
                  </div>

                  {/* Right Column: Content Card */}
                  <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                    <div
                      className="glass-card"
                      style={{
                        width: "100%",
                        padding: "1.75rem 2rem",
                        boxShadow: "0 4px 25px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      {/* Header Row */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          flexWrap: "wrap",
                          gap: "0.5rem",
                          marginBottom: "0.35rem",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            color: "var(--text-primary)",
                          }}
                        >
                          {item.position}
                        </h3>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            fontWeight: 600,
                            color: "var(--text-secondary)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.startDate} - {item.endDate}
                        </span>
                      </div>

                      {/* Subtitle / Institution */}
                      <p
                        style={{
                          color: "var(--accent-blue)",
                          fontWeight: 600,
                          fontSize: "1rem",
                          marginBottom: "1rem",
                        }}
                      >
                        {item.company}
                      </p>

                      {/* Description */}
                      <p
                        style={{
                          color: "var(--text-secondary)",
                          fontSize: "0.95rem",
                          lineHeight: 1.7,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>
      </div>
    </section>
  );
}
