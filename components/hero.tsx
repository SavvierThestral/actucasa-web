"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex overflow-hidden"
    >
      {/* ── Fondo: Blueprint SVG arquitectónico ── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #003d82 0%, #0052a3 50%, #003d82 100%)",
        }}
      >
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="hero-grid-major"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#0066cc"
                strokeWidth="1"
                opacity="0.6"
              />
            </pattern>
            <pattern
              id="hero-grid-minor"
              width="8"
              height="8"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 8 0 L 0 0 0 8"
                fill="none"
                stroke="#004499"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-grid-minor)" />
          <rect width="100%" height="100%" fill="url(#hero-grid-major)" />
        </svg>

        {/* Degradado sutil en la esquina derecha para profundidad */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#002766]/50" />
      </div>

      {/* ── Contenido ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col justify-center w-full max-w-[1400px] mx-auto px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-20"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-white/60 mb-8"
        >
          Steel Framing&nbsp;&nbsp;·&nbsp;&nbsp;Construcción en Seco
        </motion.p>

        {/* Headline */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.88] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)" }}
          >
            CONSTRUIMOS
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-10">
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.88] tracking-[-0.03em] text-white/40"
            style={{ fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)" }}
          >
            TU ESPACIO
          </motion.h1>
        </div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-white/70 text-base md:text-[1.05rem] leading-relaxed max-w-[46ch] mb-12"
        >
          Estructuras con precisión milimétrica, mayor eficiencia térmica y
          tiempos de obra reducidos. Diseñamos tu módulo habitacional, oficina
          o estructura de hierro a medida.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 items-center"
        >
          <MagneticButton>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2.5 bg-white text-brand-blue px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:bg-white/90 transition-colors duration-200 active:scale-[0.98]"
            >
              Ver servicios
            </a>
          </MagneticButton>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 border border-white/40 text-white px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:border-white/70 hover:bg-white/10 transition-all duration-200 active:scale-[0.98]"
          >
            Contactanos
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-6 md:left-16 lg:left-24 xl:left-32 flex items-center gap-3 text-white/40 text-[0.65rem] tracking-[0.25em] uppercase font-sans"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={14} weight="light" />
          </motion.div>
          Scroll
        </motion.div>
      </motion.div>
    </section>
  );
}
