// ProjectCard — card dự án theo thiết kế gốc: glass-card, hover lift, gradient tag
import Image from "next/image";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { ProjectData } from "@/types";
import { truncate } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { title, description, image, techs, demoUrl, githubUrl } = project;

  // Tối đa 8 tag công nghệ
  const displayedTechs = techs.slice(0, 8);

  return (
    <article className="flex flex-col rounded-2xl overflow-hidden bg-[rgba(14,22,42,0.65)] backdrop-blur-sm border border-[rgba(56,189,248,0.12)] hover:border-[rgba(56,189,248,0.35)] shadow-sm hover:shadow-[0_8px_30px_rgba(14,165,233,0.15)] hover:-translate-y-1 transition-all duration-300">

      {/* Ảnh dự án */}
      <div className="relative w-full aspect-video bg-[rgba(255,255,255,0.03)]">
        <Image
          src={image}
          alt={`Screenshot của dự án ${title}`}
          fill
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
        {/* Overlay gradient mờ ở đáy ảnh */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(18,18,18,0.4)] to-transparent" />
      </div>

      {/* Nội dung card */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Tên dự án */}
        <h3 className="text-base font-semibold text-[#f4f4f5] leading-snug">
          {title}
        </h3>

        {/* Mô tả — tối đa 150 ký tự */}
        <p className="text-sm text-[#a1a1aa] leading-relaxed flex-1">
          {truncate(description, 150)}
        </p>

        {/* Tags công nghệ */}
        {displayedTechs.length > 0 && (
          <ul className="flex flex-wrap gap-1.5" aria-label="Công nghệ sử dụng">
            {displayedTechs.map((tech) => (
              <li
                key={tech}
                className="px-2.5 py-0.5 text-xs font-medium rounded-full bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.1)] text-[#a1a1aa]"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {/* Links — demo > github > không hiển thị */}
        <div className="flex items-center gap-3 mt-1">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Demo live của ${title}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium transition-opacity hover:opacity-80"
              style={{
                background: "linear-gradient(135deg, var(--accent-purple), var(--accent-blue))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <FaExternalLinkAlt size={12} aria-hidden="true" style={{ color: "var(--accent-blue)" }} />
              Live Demo
            </a>
          )}
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`GitHub repository của ${title}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#a1a1aa] hover:text-[#f4f4f5] transition-colors"
            >
              <FaGithub size={14} aria-hidden="true" />
              GitHub
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
