"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const SPRING = { stiffness: 300, damping: 30, mass: 0.5 };
const MAX_TILT = 10; // grados máximos de inclinación

export function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [MAX_TILT, -MAX_TILT]), SPRING);
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-MAX_TILT, MAX_TILT]), SPRING);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    rawX.set((e.clientX - left) / width - 0.5);
    rawY.set((e.clientY - top) / height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
