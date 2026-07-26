// TimelineItem — mục timeline theo thiết kế gốc:
// - Đường dọc màu border + chấm tròn viền tím
// - Glass-card cho nội dung
import type { ExperienceItem } from "@/types";

interface TimelineItemProps {
  item: ExperienceItem;
}

export default function TimelineItem({ item }: TimelineItemProps) {
  const { company, position, startDate, endDate, description } = item;
  const dateRange = `${startDate} - ${endDate}`;

  return (
    <div className="relative pl-10 mb-8 last:mb-0">
      {/* Đường dọc */}
      <div className="absolute left-[11px] top-0 bottom-0 w-px bg-[rgba(255,255,255,0.1)]" />

      {/* Chấm tròn — viền xanh */}
      <div className="absolute left-0 top-1 w-6 h-6 rounded-full border-[3px] z-10" style={{ borderColor: "var(--accent-blue)", background: "var(--bg-dark)" }} />

      {/* Nội dung */}
      <div className="glass-card p-5">
        {/* Ngày tháng */}
        <span className="accent-label text-xs mb-2 block" style={{ background: "linear-gradient(to right, var(--accent-purple), var(--accent-blue))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {dateRange}
        </span>

        {/* Vị trí */}
        <h3 className="text-base font-semibold text-[#f4f4f5] leading-tight">
          {position}
        </h3>

        {/* Công ty */}
        <p className="text-sm text-[#a1a1aa] mt-0.5 mb-3">
          {company}
        </p>

        {/* Mô tả */}
        <p className="text-sm text-[#a1a1aa] leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
