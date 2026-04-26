"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

function Lightbox({
  src,
  alt,
  idx,
  total,
  onClose,
  onPrev,
  onNext,
}: {
  src: string;
  alt: string;
  idx: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[200] bg-bg-base/95 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.94, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.94, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-w-5xl w-full max-h-[85vh] aspect-video"
        onClick={(e) => e.stopPropagation()}
      >
        <Image src={src} alt={alt} fill className="object-contain" quality={95} />
      </motion.div>

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/70 hover:text-white p-2 transition-colors"
        aria-label="Cerrar"
      >
        <X size={24} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 text-white/70 hover:text-white p-3 border border-white/20 hover:border-white/50 transition-all"
        aria-label="Anterior"
      >
        <ArrowLeft size={20} />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 text-white/70 hover:text-white p-3 border border-white/20 hover:border-white/50 transition-all"
        aria-label="Siguiente"
      >
        <ArrowRight size={20} />
      </button>
      <p className="absolute bottom-6 left-1/2 -translate-x-1/2 font-sans text-white/40 text-xs tracking-widest">
        {idx + 1} / {total}
      </p>
    </motion.div>
  );
}

export function ProjectGalleryClient({
  photos,
  title,
}: {
  photos: string[];
  title: string;
}) {
  const [selected, setSelected] = useState<number | null>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (selected === null) return;
      setSelected((selected + dir + photos.length) % photos.length);
    },
    [selected, photos.length]
  );

  return (
    <>
      <div className="columns-2 gap-2 md:gap-3 lg:columns-3">
        {photos.map((src, i) => (
          <motion.div
            key={src}
            className="break-inside-avoid mb-2 md:mb-3 relative overflow-hidden cursor-pointer group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: (i % 9) * 0.05, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true, margin: "-5%" }}
            onClick={() => setSelected(i)}
          >
            <Image
              src={src}
              alt={`${title} — foto ${i + 1}`}
              width={0}
              height={0}
              sizes="(max-width: 768px) 50vw, 33vw"
              style={{ width: "100%", height: "auto", display: "block" }}
              className="transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg-base/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-3">
              <div className="p-1.5 border border-white/30 text-white">
                <ArrowUpRight size={14} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selected !== null && (
          <Lightbox
            src={photos[selected]}
            alt={`${title} — foto ${selected + 1}`}
            idx={selected}
            total={photos.length}
            onClose={() => setSelected(null)}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
