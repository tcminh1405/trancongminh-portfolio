"use client";

// Nút scroll to top — hiện khi scroll xuống > 400px
// Cùng style với bản gốc: gradient tím hồng, tròn, fixed bottom-left (tránh MusicPlayer ở bottom-right)

import { useEffect, useState } from "react";
import { FiArrowUp } from "react-icons/fi";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollTop}
      aria-label="Scroll to top"
      className="scroll-to-top-btn"
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 997,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.8)",
        transition: "opacity 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
        pointerEvents: visible ? "auto" : "none",
      }}
    >
      <FiArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
