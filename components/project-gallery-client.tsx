"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";

const WATERMARK = "@ac.tucasa";

function prevent(e: React.SyntheticEvent) {
  e.preventDefault();
}

export function ProjectGalleryClient({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const prev = () =>
    setCurrent((c) => (c - 1 + photos.length) % photos.length);
  const next = () => setCurrent((c) => (c + 1) % photos.length);

  // Scroll thumbnail into view when current changes
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[current] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  const protectProps = {
    onContextMenu: prevent,
    onDragStart: prevent,
    draggable: false as const,
  };

  return (
    <div className="select-none" onContextMenu={prevent}>
      {/* ── Foto principal ── */}
      <div
        className="relative w-full overflow-hidden bg-zinc-950"
        style={{ aspectRatio: "16/10" }}
        {...protectProps}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            <Image
              src={photos[current]}
              alt={`${title} — foto ${current + 1}`}
              fill
              className="object-contain"
              style={{ pointerEvents: "none" }}
              quality={90}
              priority={current === 0}
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>

        {/* Marca de agua */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="font-sans text-white font-light tracking-[0.25em] uppercase"
            style={{
              fontSize: "clamp(0.8rem, 2vw, 1.1rem)",
              opacity: 0.13,
              transform: "rotate(-18deg)",
              whiteSpace: "nowrap",
              letterSpacing: "0.3em",
            }}
          >
            {WATERMARK}
          </span>
        </div>

        {/* Flechas */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-black/40 hover:bg-black/70 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ArrowRight size={20} />
            </button>
          </>
        )}

        {/* Contador */}
        <div className="absolute bottom-4 right-5 z-10 font-sans text-white/50 text-xs tracking-widest pointer-events-none select-none">
          {current + 1} / {photos.length}
        </div>
      </div>

      {/* ── Thumbnails ── */}
      {photos.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-2 mt-3 overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
          {...protectProps}
        >
          {photos.map((src, i) => (
            <button
              key={src}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 overflow-hidden transition-all duration-200 ${
                i === current
                  ? "ring-2 ring-brand-blue opacity-100"
                  : "opacity-50 hover:opacity-80"
              }`}
              style={{ width: 80, height: 60 }}
              aria-label={`Foto ${i + 1}`}
              {...protectProps}
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover"
                style={{ pointerEvents: "none" }}
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
