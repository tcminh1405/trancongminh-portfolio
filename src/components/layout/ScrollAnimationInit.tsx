"use client";

// Khởi tạo IntersectionObserver cho tất cả elements có class `animate-on-scroll`
// Khi element vào viewport → thêm class `is-visible` → CSS transition chạy
// Khớp hoàn toàn logic bản gốc TranHuuDat (scripts.js: window.initScrollAnimations)

import { useEffect } from "react";

export default function ScrollAnimationInit() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            // Bản gốc bỏ class khi scroll ra — giữ nguyên behavior
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe tất cả elements hiện có
    const attach = () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => obs.observe(el));
    };

    attach();

    // MutationObserver để catch các element được thêm vào DOM sau (framer-motion, lazy load)
    const mutObs = new MutationObserver(() => attach());
    mutObs.observe(document.body, { childList: true, subtree: true });

    return () => {
      obs.disconnect();
      mutObs.disconnect();
    };
  }, []);

  return null;
}
