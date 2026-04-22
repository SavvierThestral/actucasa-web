"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { ArrowDown } from "@phosphor-icons/react";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  /* Parallax suave en imagen derecha */
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  /* Fade out contenido izquierdo al scrollear */
  const contentOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.45], ["0%", "-6%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex overflow-hidden bg-bg-base"
    >
      {/* ── Textura de fondo ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: "url(/bg-texture.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* ── Imagen derecha con parallax ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[48%] h-full overflow-hidden">
        <motion.div style={{ y: imageY }} className="absolute inset-0 scale-[1.15]">
          {/* https://unsplash.com/photos/1504307651254-35680f356dfd — steel frame construction site */}
          <Image
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
            alt="Estructura de steel framing en construcción — precisión industrial"
            fill
            className="object-cover object-center"
            priority
            quality={85}
          />
          {/* Degradado lateral que fusiona con el fondo */}
          <div className="absolute inset-0 bg-gradient-to-r from-bg-base via-bg-base/30 to-transparent" />
          {/* Overlay sutil de color */}
          <div className="absolute inset-0 bg-brand-blue/8" />
        </motion.div>
      </div>

      {/* Fondo de imagen en mobile */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=80"
          alt="Construcción steel framing"
          fill
          className="object-cover object-center opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-bg-base/80" />
      </div>

      {/* ── Contenido izquierdo ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col justify-center w-full md:w-[58%] px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-20"
      >
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="section-label mb-8"
        >
          Steel Framing&nbsp;&nbsp;·&nbsp;&nbsp;Construcción en Seco
        </motion.p>

        {/* Headline principal en Donovan Display */}
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.88] tracking-[-0.03em] text-text-primary"
            style={{ fontSize: "clamp(3.2rem, 7.5vw, 7.5rem)" }}
          >
            CONSTRUIMOS
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "105%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold leading-[0.88] tracking-[-0.03em] text-brand-blue"
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
          className="font-sans text-text-secondary text-base md:text-[1.05rem] leading-relaxed max-w-[46ch] mb-10"
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
              className="inline-flex items-center gap-2.5 bg-brand-blue text-white px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:bg-brand-blue-hover transition-colors duration-300 active:scale-[0.98]"
            >
              Ver servicios
            </a>
          </MagneticButton>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2.5 border border-white/20 text-text-primary px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:border-white/50 hover:bg-white/5 transition-all duration-300 active:scale-[0.98]"
          >
            Contactanos
          </a>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-6 md:left-16 lg:left-24 xl:left-32 flex items-center gap-3 text-text-muted text-[0.65rem] tracking-[0.25em] uppercase font-sans"
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

      {/* ── Línea decorativa vertical ── */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block absolute left-[56%] top-[15%] bottom-[15%] w-[1px] bg-gradient-to-b from-transparent via-bg-border to-transparent origin-top"
      />
    </section>
  );
}
