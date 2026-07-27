"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { skills } from "@/data/skills";
import { motion, AnimatePresence } from "framer-motion";

function SkillItemRow({
  name,
  percentage,
  IconComp,
  image,
  color,
  accentColor,
}: {
  name: string;
  percentage: number;
  IconComp?: React.ComponentType<{ size?: number; className?: string; color?: string }>;
  image?: string;
  color?: string;
  accentColor: string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [go, setGo] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setGo(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      className="skill-item-row"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.45rem",
        padding: "0.75rem 0.9rem",
        borderRadius: "0.75rem",
        transition: "all 0.25s ease",
      }}
    >
      {/* Skill Icon & Name */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        {image ? (
          <span
            className="skill-icon-wrap"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 18,
              height: 18,
              flexShrink: 0,
            }}
          >
            <Image
              src={image}
              alt={name}
              width={18}
              height={18}
              style={{ objectFit: "contain", width: 18, height: 18 }}
              unoptimized
            />
          </span>
        ) : IconComp ? (
          <span
            className="skill-icon-wrap"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: color || "var(--text-primary)",
              flexShrink: 0,
            }}
          >
            <IconComp size={18} />
          </span>
        ) : (
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: "50%",
              background: accentColor,
              opacity: 0.7,
              display: "inline-block",
              flexShrink: 0,
            }}
          />
        )}
        <span
          style={{
            fontSize: "0.9rem",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {name}
        </span>
      </div>

      {/* Animated Progress Bar (Dải gradient đồng bộ từ xám trắng sang xanh web) */}
      <div
        ref={barRef}
        className="skill-progress-track"
        style={{
          width: "100%",
          height: "6px",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          className="skill-progress-bar"
          style={{
            height: "100%",
            width: go ? `${percentage}%` : "0%",
            borderRadius: "9999px",
            transition: "width 1.2s cubic-bezier(0.25, 1, 0.5, 1)",
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skills.map((cat) => cat.title)];

  const filteredCategories =
    selectedCategory === "All"
      ? skills
      : skills.filter((cat) => cat.title === selectedCategory);

  return (
    <section id="skills" className="content-section">
      <div className="container">

        {/* Section Header */}
        <div className="section-header animate-on-scroll">
          <div className="section-badge">Technical & Development Stack</div>
          <h2 className="section-title">Technologies & Tools</h2>
          <div className="title-underline" />
        </div>

        {/* Infinite Horizontal Marquee Category Filter Tabs */}
        <div className="marquee-container">
          <div className="marquee-content">
            {[...categories, ...categories].map((cat, idx) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={`${cat}-${idx}`}
                  onClick={() => setSelectedCategory(cat)}
                  className={`marquee-tab-btn ${isSelected ? "is-selected" : ""}`}
                  style={{
                    padding: "0.55rem 1.4rem",
                    borderRadius: "9999px",
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                    transition: "all 0.25s ease",
                    border: isSelected
                      ? "1px solid var(--accent-blue)"
                      : "1px solid var(--border-color)",
                    background: isSelected
                      ? "linear-gradient(135deg, #155dfc 0%, #488bfb 100%)"
                      : "var(--bg-card)",
                    color: isSelected ? "#ffffff" : "var(--text-secondary)",
                    boxShadow: isSelected
                      ? "0 4px 15px rgba(72, 139, 251, 0.4)"
                      : "none",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Category Cards Grid */}
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.5rem",
            alignItems: "stretch",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filteredCategories.map((cat) => {
              const CategoryIcon = cat.icon;
              const accentColor = cat.accentColor || "#38bdf8";

              return (
                <motion.div
                  key={cat.title}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="skill-category-card"
                  style={{
                    borderRadius: "1.25rem",
                    padding: "1.5rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Category Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.85rem",
                      marginBottom: "1.25rem",
                      paddingBottom: "0.75rem",
                      borderBottom: `1px solid ${accentColor}25`,
                    }}
                  >
                    {CategoryIcon && (
                      <span
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "0.65rem",
                          background: `${accentColor}18`,
                          border: `1px solid ${accentColor}35`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: accentColor,
                          flexShrink: 0,
                        }}
                      >
                        <CategoryIcon size={20} />
                      </span>
                    )}
                    <h3
                      style={{
                        fontSize: "1.15rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                      }}
                    >
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill Items List */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.65rem",
                      flex: 1,
                    }}
                  >
                    {cat.skills.map((skill) => (
                      <SkillItemRow
                        key={skill.name}
                        name={skill.name}
                        percentage={skill.percentage}
                        IconComp={skill.icon}
                        image={skill.image}
                        color={skill.color}
                        accentColor={accentColor}
                      />
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
