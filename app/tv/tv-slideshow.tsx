"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const SLIDE_DURATION = 8000; // ms por slide — cambiá este valor para ajustar el tiempo

// ─────────────────────────────────────────────────────────────
//  CÓMO AGREGAR IMÁGENES:
//  1. Copiá tus fotos a la carpeta /public/tv/
//     Ejemplo: /public/tv/foto-1.jpg, /public/tv/foto-2.jpg ...
//  2. En cada slide, cambiá "image" con la ruta de tu foto.
//  3. Editá label, title y subtitle con el texto que quieras mostrar.
//  4. Podés agregar o quitar slides del array.
// ─────────────────────────────────────────────────────────────
const slides = [
  {
    id: 1,
    image: "/tv/foto-1.jpg",
    label: "Construcción modular",
    title: "Construimos el espacio\nque necesitás.",
    subtitle: "Steel framing fabricado en taller, instalado en tu terreno.",
  },
  {
    id: 2,
    image: "/tv/foto-2.jpg",
    label: "Módulos habitacionales",
    title: "Viviendas listas\npara habitar.",
    subtitle: "Con todas las terminaciones, instalaciones certificadas y aislación de alta prestación.",
  },
  {
    id: 3,
    image: "/tv/foto-3.jpg",
    label: "Oficinas modulares",
    title: "Espacios de trabajo\nque se instalan, no se construyen.",
    subtitle: "Relocalizables, sin obra húmeda y listos para operar.",
  },
  {
    id: 4,
    image: "/tv/foto-4.jpg",
    label: "Steel framing",
    title: "Precisión milimétrica.\nDurabilidad incomparable.",
    subtitle: "Acero galvanizado con más de 50 años de vida estructural.",
  },
  {
    id: 5,
    image: "/tv/foto-5.jpg",
    label: "Nuestros proyectos",
    title: "+30 proyectos\nrealizados.",
    subtitle: "Buenos Aires y Gran Buenos Aires.",
  },
  {
    id: 6,
    image: "/tv/foto-6.jpg",
    label: "Nuestro equipo",
    title: "22 años construyendo\ncon precisión.",
    subtitle: "Materiales certificados, diseño a medida y acompañamiento post-obra.",
  },
];

export function TvSlideshow() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorTimer, setCursorTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
    setProgress(0);
  }, []);

  // Auto-advance
  useEffect(() => {
    const interval = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [next]);

  // Barra de progreso animada
  useEffect(() => {
    setProgress(0);
    const start = Date.now();
    const frame = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_DURATION) * 100, 100));
      if (elapsed < SLIDE_DURATION) requestAnimationFrame(frame);
    };
    const raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [current]);

  // Auto-ocultar cursor
  useEffect(() => {
    const handleMove = () => {
      setCursorVisible(true);
      if (cursorTimer) clearTimeout(cursorTimer);
      const t = setTimeout(() => setCursorVisible(false), 3000);
      setCursorTimer(t);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [cursorTimer]);

  const slide = slides[current];

  return (
    <div
      className="relative w-screen h-screen overflow-hidden bg-black select-none"
      style={{ cursor: cursorVisible ? "default" : "none" }}
    >
      {/* Imagen con crossfade */}
      <AnimatePresence mode="crossfade">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={slide.image}
            alt={slide.label}
            fill
            className="object-cover object-center"
            priority
            quality={95}
          />
        </motion.div>
      </AnimatePresence>

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Logo — esquina superior izquierda */}
      <div className="absolute top-10 left-12 flex items-center gap-4 z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.webp" alt="ACTuCasa" className="h-12 w-auto invert" />
        <div className="w-px h-8 bg-white/30" />
        <span className="text-white/50 text-sm tracking-[0.25em] uppercase font-sans">
          Steel Framing · Argentina
        </span>
      </div>

      {/* Contenido — esquina inferior izquierda */}
      <div className="absolute bottom-0 left-0 right-0 z-10 px-12 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-white/50 text-sm tracking-[0.3em] uppercase font-sans mb-4">
              {slide.label}
            </p>
            <h1
              className="text-white font-sans font-black leading-[1.0] mb-5"
              style={{ fontSize: "clamp(3rem, 6vw, 5.5rem)", whiteSpace: "pre-line" }}
            >
              {slide.title}
            </h1>
            <p className="text-white/60 font-sans text-xl leading-relaxed max-w-[60ch]">
              {slide.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots */}
      <div className="absolute bottom-8 right-12 z-10 flex items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setCurrent(i); setProgress(0); }}
            style={{ cursor: cursorVisible ? "pointer" : "none" }}
          >
            <div
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? "28px" : "8px",
                height: "8px",
                backgroundColor: i === current ? "white" : "rgba(255,255,255,0.35)",
              }}
            />
          </button>
        ))}
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10 z-10">
        <div
          className="h-full bg-white/60 transition-none"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
