// SkillBadge — badge kỹ năng với icon + tên
// Styled theo thiết kế gốc: nền mờ, viền mờ, hover glow xanh
import type { SkillItem } from "@/types";

interface SkillBadgeProps {
  skill: SkillItem;
}

const iconGradStyle: React.CSSProperties = {
  display: "inline-flex",
  flexShrink: 0,
};

export default function SkillBadge({ skill }: SkillBadgeProps) {
  const initial = skill.name.charAt(0).toUpperCase();

  return (
    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] text-[#94a3b8] hover:text-[#f0f6ff] hover:border-[#38bdf8] hover:bg-[rgba(14,165,233,0.08)] hover:shadow-[0_0_16px_rgba(14,165,233,0.2)] transition-all duration-200 cursor-default">
      {skill.icon ? (
        <span style={{ ...iconGradStyle, color: skill.color || "currentColor" }}>
          <skill.icon size={16} />
        </span>
      ) : (
        <span
          aria-hidden="true"
          style={{
            display: "flex", width: 16, height: 16, flexShrink: 0,
            alignItems: "center", justifyContent: "center",
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(168,85,247,0.2), rgba(14,165,233,0.2))",
            fontSize: "0.6rem", fontWeight: "bold", color: "#38bdf8",
          }}
        >
          {initial}
        </span>
      )}
      <span>{skill.name}</span>
    </span>
  );
}
