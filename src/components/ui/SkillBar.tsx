"use client";

// SkillBar — skill card với progress bar theo đúng bản gốc:
// - glass-card, icon + tên + %, animated gradient bar (tím → hồng)
// - Bar animate khi element vào viewport

import { useEffect, useRef, useState } from "react";
import type { SkillItem } from "@/types";

// Map tên skill → % proficiency (dựa theo bản gốc scripts.js)
const SKILL_LEVELS: Record<string, number> = {
  "React":       85,
  "Next.js":     80,
  "TypeScript":  75,
  "JavaScript":  85,
  "Tailwind CSS": 80,
  "HTML5":        90,
  "CSS3":         85,
  "Node.js":      70,
  "Express":      65,
  "MongoDB":      65,
  "PostgreSQL":   55,
  "Prisma":       60,
  "Git":          85,
  "Docker":       60,
  "GitHub":       85,
  "Figma":        55,
};

interface SkillBarProps {
  skill: SkillItem & { category?: string };
}

export default function SkillBar({ skill }: SkillBarProps) {
  const percentage = SKILL_LEVELS[skill.name] ?? 50;
  const barRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  // Animate bar khi scroll vào viewport
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          obs.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="glass-card" style={{ padding: "1.25rem" }}>
      {/* Header: icon + tên | % */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "0.75rem",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Icon từ react-icons hoặc fallback chữ cái */}
          {skill.icon ? (
            <span style={{
              display: "inline-flex", flexShrink: 0,
              color: skill.color || "currentColor",
            }}>
              <skill.icon size={24} />
            </span>
          ) : (
            <span
              style={{
                width: 24, height: 24, borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(72,139,251,0.2), rgba(14,165,233,0.2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.7rem", fontWeight: "bold",
                color: "#38bdf8", flexShrink: 0,
              }}
            >
              {skill.name.charAt(0).toUpperCase()}
            </span>
          )}
          <span style={{ fontWeight: 500, color: "var(--text-primary)", fontSize: "0.95rem" }}>
            {skill.name}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div
        ref={barRef}
        style={{
          width: "100%",
          height: "8px",
          background: "var(--border-color)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: animated ? `${percentage}%` : "0%",
            background: "linear-gradient(to right, var(--accent-purple), var(--accent-blue), var(--accent-purple))",
            backgroundSize: "200% 100%",
            borderRadius: "9999px",
            transition: "width 1.5s cubic-bezier(0.25,1,0.5,1)",
            animation: "animateGradient 3s ease infinite",
          }}
        />
      </div>
    </div>
  );
}
