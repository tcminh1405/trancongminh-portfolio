// Skills section — skill bars với progress bar theo đúng bản gốc:
// Grid 2 cột, mỗi skill-card có icon + tên + % + animated gradient bar
// NOTE: SkillBar là Client Component, icon không thể pass qua server boundary
// → render icon trực tiếp trong Skills (server) thay vì truyền qua props

"use client";

import { useEffect, useRef, useState } from "react";
import { skills } from "@/data/skills";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

// Map tên skill → % proficiency
const SKILL_LEVELS: Record<string, number> = {
  "React":        85, "Next.js":     80, "TypeScript":  75,
  "JavaScript":   85, "Tailwind CSS": 80, "HTML5":       90,
  "CSS3":         85, "Node.js":     70, "Express":     65,
  "MongoDB":      65, "PostgreSQL":  55, "Prisma":      60,
  "Git":          85, "Docker":      60, "GitHub":      85,
  "Figma":        55,
};

function SkillCard({ name, percentage, IconComponent, color }: {
  name: string;
  percentage: number;
  IconComponent?: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  color?: string;
}) {
  const barRef  = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="glass-card" style={{ padding: "1.25rem" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {IconComponent ? (
            <span style={{
              display: "inline-flex",
              flexShrink: 0,
              color: color || "currentColor",
            }}>
              <IconComponent size={24} />
            </span>
          ) : (
            <span style={{
              width: 24, height: 24, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(72,139,251,0.2), rgba(14,165,233,0.2))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "0.7rem", fontWeight: "bold",
              color: "#38bdf8",
              flexShrink: 0,
            }}>
              {name.charAt(0)}
            </span>
          )}
          <span style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.95rem" }}>{name}</span>
        </div>
      </div>
      {/* Progress bar */}
      <div ref={barRef} style={{ width: "100%", height: "8px", background: "var(--border-color)", borderRadius: "9999px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          width: go ? `${percentage}%` : "0%",
          background: "linear-gradient(to right, var(--accent-purple), var(--accent-blue), var(--accent-purple))",
          backgroundSize: "200% 100%",
          borderRadius: "9999px",
          transition: "width 1.5s cubic-bezier(0.25,1,0.5,1)",
          animation: "animateGradient 3s ease infinite",
        }} />
      </div>
    </div>
  );
}

export default function Skills() {
  // Flatten tất cả skills, giữ reference đến icon component
  const allSkills = skills.flatMap((cat) =>
    cat.skills.map((skill) => ({
      name:      skill.name,
      icon:      skill.icon,        // ComponentType — dùng trực tiếp trong Client Component này
      color:     skill.color,
      category:  cat.title,
      percentage: SKILL_LEVELS[skill.name] ?? 50,
    }))
  );

  return (
    <section id="skills" className="content-section">
      <div className="container">
        <div className="section-header animate-on-scroll">
          <div className="section-badge">My Skills</div>
          <h2 className="section-title">Technical Stack</h2>
          <div className="title-underline" />
        </div>

        {/* Grid 2 cột */}
        <div className="skills-grid">
          {allSkills.map((skill, i) => (
            <ScrollAnimation key={skill.name} direction="up" delay={i * 0.04}>
              <SkillCard
                name={skill.name}
                percentage={skill.percentage}
                IconComponent={skill.icon}
                color={skill.color}
              />
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
}
