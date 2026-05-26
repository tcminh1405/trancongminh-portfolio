// Projects section — Horizontal split layout (Ảnh giao diện hiển thị ĐẦY ĐỦ, RÕ NÉT 100% trong khung Browser)

import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { projects } from "@/data/projects";
import ScrollAnimation from "@/components/ui/ScrollAnimation";

export default function Projects() {
  return (
    <section id="projects" className="content-section" style={{ padding: "3rem 0 2rem 0" }}>
      <div style={{ maxWidth: "1320px", margin: "0 auto", padding: "0 1.5rem" }}>

        {/* Section header */}
        <div className="section-header animate-on-scroll" style={{ marginBottom: "1.5rem" }}>
          <div className="section-badge" style={{ marginBottom: "0.5rem" }}>Some of my recent work</div>
          <h2 className="section-title" style={{ fontSize: "2rem" }}>Featured Projects</h2>
          <div className="title-underline" style={{ marginTop: "0.5rem" }} />
        </div>

        {/* Danh sách dự án — Layout Ngang Tinh Gọn (Vừa khít 2 project trong 1 màn hình) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {projects.map((project, index) => {
            const isReversed = index % 2 === 1;

            return (
              <ScrollAnimation key={project.id} direction="up" delay={index * 0.1}>
                <div
                  className="glass-card project-horizontal-card"
                  style={{
                    borderRadius: "1.25rem",
                    padding: "1.25rem 1.5rem",
                    display: "grid",
                    gridTemplateColumns: isReversed ? "1fr 1fr" : "1fr 1fr",
                    gap: "1.75rem",
                    alignItems: "center",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  {/* ── BÊN ẢNH PROJECT (HIỂN THỊ ĐẦY ĐỦ 100% RÕ NÉT & SẮC SẢO) ── */}
                  <div
                    style={{
                      position: "relative",
                      width: "100%",
                      aspectRatio: "16 / 10",
                      borderRadius: "0.85rem",
                      overflow: "hidden",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                      border: "1px solid var(--border-color)",
                      order: isReversed ? 2 : 1,
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      unoptimized
                      sizes="(max-width: 900px) 100vw, 50vw"
                      style={{
                        objectFit: "fill",
                        objectPosition: "top center",
                        transition: "transform 0.4s ease",
                      }}
                      priority={index === 0}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </div>

                  {/* ── BÊN THÔNG TIN: TÊN, MÔ TẢ, TECH STACK & LINK GIT ── */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      order: isReversed ? 1 : 2,
                    }}
                  >
                    <h3
                      style={{
                        fontSize: "1.35rem",
                        fontWeight: 700,
                        color: "var(--text-primary)",
                        marginBottom: "0.4rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {project.title}
                    </h3>

                    <p
                      style={{
                        color: "var(--text-secondary)",
                        fontSize: "0.875rem",
                        lineHeight: 1.5,
                        marginBottom: "0.75rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tech Stack Badges */}
                    <div style={{ marginBottom: "0.85rem" }}>
                      <span
                        style={{
                          display: "block",
                          fontSize: "0.725rem",
                          fontWeight: 700,
                          color: "var(--text-secondary)",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                          marginBottom: "0.35rem",
                        }}
                      >
                        Technologies:
                      </span>
                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: "0.35rem",
                        }}
                      >
                        {project.techs.map((tech) => (
                          <span
                            key={tech}
                            style={{
                              background: "rgba(168, 85, 247, 0.08)",
                              color: "var(--text-primary)",
                              border: "1px solid rgba(168, 85, 247, 0.2)",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "9999px",
                              fontSize: "0.75rem",
                              fontWeight: 500,
                            }}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Links */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        paddingTop: "0.6rem",
                        borderTop: "1px solid var(--border-color)",
                      }}
                    >
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-secondary"
                          style={{
                            padding: "0.45rem 1.1rem",
                            fontSize: "0.825rem",
                            borderRadius: "9999px",
                            gap: "0.5rem",
                          }}
                        >
                          <FaGithub size={16} /> GitHub Repository
                        </a>
                      )}
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary"
                          style={{
                            padding: "0.45rem 1.1rem",
                            fontSize: "0.825rem",
                            borderRadius: "9999px",
                            gap: "0.5rem",
                          }}
                        >
                          Live Demo <FiExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollAnimation>
            );
          })}
        </div>

        {/* View all button */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="https://github.com/tcminh1405"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-secondary"
            style={{ padding: "0.45rem 1.25rem", fontSize: "0.85rem" }}
          >
            View More on GitHub →
          </a>
        </div>
      </div>
    </section>
  );
}




