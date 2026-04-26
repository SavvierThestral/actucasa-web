"use client";

import { useState, useRef, useEffect } from "react";
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
  const [visible, setVisible] = useState(true);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const goTo = (i: number) => {
    if (i === current) return;
    setVisible(false);
    setTimeout(() => {
      setCurrent(i);
      setVisible(true);
    }, 180);
  };

  const prev = () => goTo((current - 1 + photos.length) % photos.length);
  const next = () => goTo((current + 1) % photos.length);

  // Scroll thumbnail into view
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
      {/* ── Foto principal — sin ratio fijo, la celda toma la forma de la foto ── */}
      <div className="relative w-full overflow-hidden" {...protectProps}>
        <Image
          src={photos[current]}
          alt={`${title} — foto ${current + 1}`}
          width={0}
          height={0}
          sizes="(max-width: 1024px) 100vw, 60vw"
          quality={90}
          priority={current === 0}
          draggable={false}
          className="w-full h-auto block"
          style={{
            pointerEvents: "none",
            opacity: visible ? 1 : 0,
            transition: "opacity 0.18s ease",
          }}
        />

        {/* Marca de agua */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          aria-hidden
        >
          <span
            className="font-sans text-white font-bold tracking-[0.3em] uppercase"
            style={{
              fontSize: "clamp(1.1rem, 4vw, 2.2rem)",
              opacity: 0.15,
              transform: "rotate(-18deg)",
              whiteSpace: "nowrap",
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
              className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-black/40 hover:bg-black/65 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Anterior"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2.5 bg-black/40 hover:bg-black/65 text-white/80 hover:text-white transition-all duration-200 backdrop-blur-sm"
              aria-label="Siguiente"
            >
              <ArrowRight size={18} />
            </button>
          </>
        )}

        {/* Contador */}
        <div className="absolute bottom-3 right-4 z-10 font-sans text-white text-xs tracking-widest pointer-events-none select-none bg-black/30 px-2 py-0.5 backdrop-blur-sm">
          {current + 1} / {photos.length}
        </div>

        {/* ── Dots sobre la foto ── */}
        {photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Foto ${i + 1}`}
                className="transition-all duration-200"
                style={{
                  width: i === current ? 18 : 6,
                  height: 6,
                  borderRadius: 3,
                  backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.45)",
                }}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {photos.length > 1 && (
        <>
          <div
            ref={thumbsRef}
            className="flex gap-2 mt-3 overflow-x-auto pb-1"
            style={{ scrollbarWidth: "none" }}
            {...protectProps}
          >
            {photos.map((src, i) => (
              <button
                key={src}
                onClick={() => goTo(i)}
                className={`relative flex-shrink-0 overflow-hidden transition-all duration-200 ${
                  i === current
                    ? "ring-2 ring-brand-blue opacity-100"
                    : "opacity-50 hover:opacity-80"
                }`}
                style={{ width: 72, height: 54 }}
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

        </>
      )}
    </div>
  );
}
