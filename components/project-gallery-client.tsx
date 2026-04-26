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

  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const thumb = container.children[current] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

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
      {/* ── Foto principal + flechas ── */}
      {/* justify-center para que el grupo (flechas + foto) quede centrado */}
      <div className="flex items-center justify-center bg-white" {...protectProps}>

        {/* Flecha izquierda */}
        {photos.length > 1 && (
          <button
            onClick={prev}
            className="flex-shrink-0 self-stretch flex items-center justify-center px-3 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-all duration-200"
            aria-label="Anterior"
          >
            <ArrowLeft size={17} />
          </button>
        )}

        {/* Wrapper que se ajusta al tamaño real de la imagen */}
        <div className="relative" style={{ display: "table" }} {...protectProps}>
          <Image
            src={photos[current]}
            alt={`${title} — foto ${current + 1}`}
            width={0}
            height={0}
            sizes="(max-width: 768px) calc(100vw - 4rem), 55vw"
            quality={90}
            priority={current === 0}
            draggable={false}
            className="block w-auto h-auto"
            style={{
              pointerEvents: "none",
              opacity: visible ? 1 : 0,
              transition: "opacity 0.18s ease",
              maxHeight: "60vh",
              maxWidth: "min(calc(100vw - 8rem), 680px)",
            }}
          />

          {/* Marca de agua */}
          <div
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            aria-hidden
          >
            <span
              className="font-sans text-white font-semibold tracking-[0.25em] uppercase"
              style={{
                fontSize: "clamp(0.6rem, 1.8vw, 1rem)",
                opacity: 0.28,
                transform: "rotate(-18deg)",
                whiteSpace: "nowrap",
              }}
            >
              {WATERMARK}
            </span>
          </div>

          {/* Dots */}
          {photos.length > 1 && (
            <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {photos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Foto ${i + 1}`}
                  className="transition-all duration-200"
                  style={{
                    width: i === current ? 16 : 5,
                    height: 5,
                    borderRadius: 3,
                    backgroundColor: i === current ? "#ffffff" : "rgba(255,255,255,0.45)",
                  }}
                />
              ))}
            </div>
          )}

          {/* Contador */}
          <div className="absolute bottom-2.5 right-2 z-10 font-sans text-white text-[10px] tracking-widest pointer-events-none select-none bg-black/30 px-1.5 py-0.5 backdrop-blur-sm">
            {current + 1} / {photos.length}
          </div>
        </div>

        {/* Flecha derecha */}
        {photos.length > 1 && (
          <button
            onClick={next}
            className="flex-shrink-0 self-stretch flex items-center justify-center px-3 bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-800 transition-all duration-200"
            aria-label="Siguiente"
          >
            <ArrowRight size={17} />
          </button>
        )}
      </div>

      {/* ── Thumbnails (ventana de 5) ── */}
      {photos.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-1.5 mt-2 justify-center overflow-x-auto pb-1"
          style={{ scrollbarWidth: "none" }}
          {...protectProps}
        >
          {(() => {
            const WINDOW = 5;
            const start = Math.max(0, Math.min(current - 2, photos.length - WINDOW));
            return photos.slice(start, start + WINDOW).map((src, j) => {
              const i = start + j;
              return (
                <button
                  key={src}
                  onClick={() => goTo(i)}
                  className={`relative flex-shrink-0 overflow-hidden transition-all duration-200 ${
                    i === current
                      ? "ring-2 ring-brand-blue opacity-100"
                      : "opacity-50 hover:opacity-80"
                  }`}
                  style={{ width: 54, height: 40 }}
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
              );
            });
          })()}
        </div>
      )}
    </div>
  );
}
