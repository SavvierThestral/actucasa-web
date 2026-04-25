"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { InstagramLogo, ArrowDown } from "@phosphor-icons/react";
import { instagramUrl, siteConfig } from "@/lib/config";

// ─────────────────────────────────────────────────────────────
//  FOTO DEL HERO — Para agregar tu foto:
//  1. Copiá tu imagen a /public  (ej: hero-foto.jpg)
//  2. Reemplazá HERO_PHOTO con "/hero-foto.jpg"
//  Tamaño recomendado: 1200×900px mínimo
// ─────────────────────────────────────────────────────────────
const HERO_PHOTO =
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&q=85";

const stats = [
  { value: "+30", label: "Proyectos" },
  { value: "22+", label: "Años" },
  { value: "+50", label: "Clientes" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ["0%", "-5%"]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex bg-bg-base overflow-hidden"
    >
      {/* ── Columna izquierda — contenido ── */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 flex flex-col justify-center w-full md:w-[54%] px-6 md:px-14 lg:px-20 xl:px-28 pt-28 pb-16"
      >
        {/* Eyebrow con línea */}
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-3 mb-10"
        >
          <span className="font-sans text-[0.68rem] tracking-[0.28em] uppercase text-text-muted">
            Construcción en Seco&nbsp;·&nbsp;Argentina
          </span>
        </motion.div>

        {/* Headline serif editorial */}
        <div className="mb-0 overflow-hidden">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="font-display leading-[1.05] text-text-primary"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)", fontWeight: 900 }}
          >
            Construcción modular en
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.95, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif italic leading-[1.05] text-brand-blue"
            style={{ fontSize: "clamp(2.8rem, 6vw, 5.2rem)", fontWeight: 700 }}
          >
            Steel Frame.
          </motion.h1>
        </div>

        {/* Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="font-sans text-text-secondary text-base leading-relaxed max-w-[44ch] mb-10"
        >
          Módulos habitacionales, estructuras de hierro y ampliaciones en{" "}
          <strong className="font-medium text-text-primary">steel framing</strong>. Soluciones para quienes quieren construir su propio espacio
          con <strong className="font-medium text-text-primary">precisión, eficiencia y calidad garantizada</strong>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap gap-4 items-center mb-14"
        >
          <MagneticButton>
            <a
              href="#servicios"
              className="inline-flex items-center gap-2 bg-brand-blue text-white px-7 py-3.5 font-sans font-medium text-sm tracking-wide hover:bg-brand-blue-hover transition-colors duration-200 active:scale-[0.98]"
            >
              Ver servicios
            </a>
          </MagneticButton>

          <a
            href="#contacto"
            className="inline-flex items-center gap-2 border border-bg-border text-text-primary px-7 py-3.5 font-sans font-medium text-sm tracking-wide hover:border-brand-blue/40 hover:bg-bg-surface transition-all duration-200 active:scale-[0.98]"
          >
            Contactanos
          </a>
        </motion.div>

        {/* Instagram link */}
        <motion.a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="inline-flex items-center gap-2 border border-bg-border text-text-muted text-xs font-sans px-3 py-1.5 w-fit hover:border-brand-blue/30 hover:text-text-primary transition-all duration-200"
        >
          <InstagramLogo size={14} />
          AC Tu Casa
        </motion.a>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-8 left-6 md:left-14 lg:left-20 xl:left-28 flex items-center gap-2.5 text-text-muted text-[0.62rem] tracking-[0.25em] uppercase font-sans"
        >
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown size={12} weight="light" />
          </motion.div>
          Scroll
        </motion.div>
      </motion.div>

      {/* ── Columna derecha — imagen full height ── */}
      <div className="hidden md:block absolute right-0 top-0 w-[50%] h-full overflow-hidden">
        <motion.div
          style={{ y: imageY }}
          className="absolute inset-0 scale-[1.1]"
        >
          <Image
            src={HERO_PHOTO}
            alt="Proyecto ACTuCasa — steel framing en construcción"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />

          {/* Difuminado suave desde la izquierda (blanco → transparente) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0.96) 8%, rgba(255,255,255,0.75) 20%, rgba(255,255,255,0.35) 36%, rgba(255,255,255,0.1) 52%, rgba(255,255,255,0.02) 68%, transparent 80%)",
            }}
          />
        </motion.div>

        {/* Stats bar en la base de la imagen */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute bottom-0 right-0 left-0 z-10 flex items-center justify-end gap-0"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col items-center px-8 py-4 bg-white/85 backdrop-blur-sm border-l border-white/30 ${
                i === 0 ? "border-l-0" : ""
              }`}
            >
              <span className="font-display font-bold text-brand-blue text-xl leading-none">
                {stat.value}
              </span>
              <span className="font-sans text-text-muted text-[0.6rem] tracking-[0.2em] uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Mobile: imagen de fondo con overlay */}
      <div className="md:hidden absolute inset-0 z-0">
        <Image
          src={HERO_PHOTO}
          alt="Proyecto ACTuCasa"
          fill
          className="object-cover object-center opacity-10"
          priority
        />
      </div>
    </section>
  );
}
