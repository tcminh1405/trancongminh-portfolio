"use client";

import { motion, useInView, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";

interface ScrollAnimationProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

const directionMap = {
  up: { y: 30, x: 0 },
  left: { x: -30, y: 0 },
  right: { x: 30, y: 0 },
};

export default function ScrollAnimation({
  children,
  direction = "up",
  delay = 0,
  className,
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: { opacity: 0, x, y },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration: 0.5, delay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
