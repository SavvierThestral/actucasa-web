"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useCallback } from "react";
import { RevealText } from "@/components/ui/reveal-text";
import { X, ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";

type Photo = {
  id: number;
  src: string;
  srcFull: string;
  alt: string;
  span: string;
};

const photos: Photo[] = [
  {
    id: 1,
    // https://unsplash.com/photos/1460472178825-e5240623afd5 — modern steel architecture
    src: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
    srcFull: "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=1600&q=90",
    alt: "Arquitectura moderna en steel framing — fachada contemporánea",
    span: "col-span-2 row-span-2",
  },
  {
    id: 2,
    // https://unsplash.com/photos/1486325212027-8081e485255e — building facade
    src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    srcFull: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=90",
    alt: "Fachada de edificio con estructura de acero — proyecto residencial",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    // https://unsplash.com/photos/1524758631624-e2822e304c36 — interior office
    src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    srcFull: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600&q=90",
    alt: "Interior de oficina moderna anexa — espacio de trabajo diseñado en steel frame",
    span: "col-span-1 row-span-1",
  },
  {
    id: 4,
    // https://unsplash.com/photos/1467232004584-a241de8bcf5d — construction frame interior
    src: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
    srcFull: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1600&q=90",
    alt: "Estructura de steel frame en construcción — esqueleto metálico en proceso",
    span: "col-span-1 row-span-2",
  },
  {
    id: 5,
    // https://unsplash.com/photos/1558618666-fcd25c85cd64 — residential build
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    srcFull: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=90",
    alt: "Módulo habitacional terminado — vivienda en construcción seca",
    span: "col-span-1 row-span-1",
  },
  {
    id: 6,
    // https://unsplash.com/photos/1503387762-592deb58ef4e — architectural detail
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    srcFull: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=90",
    alt: "Detalle estructural de hierro — precisión en construcción industrializada",
    span: "col-span-1 row-span-1",
  },
];

function Lightbox({
  photo,
  allPhotos,
  onClose,
  onPrev,
  onNext,
}: {
  photo: Photo;
  allPhotos: Photo[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const idx = allPhotos.findIndex((p) => p.id === photo.id);

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
        <Image
          src={photo.srcFull}
          alt={photo.alt}
          fill
          className="object-contain"
          quality={95}
        />
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
        {idx + 1} / {allPhotos.length}
      </p>
    </motion.div>
  );
}

export function Gallery() {
  const [selected, setSelected] = useState<Photo | null>(null);

  const navigate = useCallback(
    (dir: 1 | -1) => {
      if (!selected) return;
      const idx = photos.findIndex((p) => p.id === selected.id);
      const next = (idx + dir + photos.length) % photos.length;
      setSelected(photos[next]);
    },
    [selected]
  );

  return (
    <>
      <section
        id="proyectos"
        className="bg-bg-surface border-t border-bg-border py-20 md:py-32"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="section-label mb-5"
              >
                Proyectos
              </motion.p>
              <h2
                className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-text-primary"
                style={{ fontSize: "clamp(2.4rem, 5vw, 4.8rem)" }}
              >
                <RevealText text="Obras realizadas" />
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-sans text-text-secondary text-sm leading-relaxed max-w-[36ch] md:text-right"
            >
              Cada proyecto refleja nuestro compromiso con la precisión
              constructiva y la calidad del detalle.
            </motion.p>
          </div>

          {/* Grid masonry */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[240px]">
            {photos.map((photo, i) => (
              <motion.div
                key={photo.id}
                className={`${photo.span} relative overflow-hidden cursor-pointer group`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-5%" }}
                onClick={() => setSelected(photo)}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.06]"
                  loading="lazy"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-bg-base/90 via-bg-base/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-6">
                  <div className="flex items-end justify-between w-full">
                    <p className="font-sans text-white text-sm leading-tight max-w-[80%]">
                      {photo.alt}
                    </p>
                    <div className="p-2 border border-white/30 text-white ml-3 flex-shrink-0">
                      <ArrowUpRight size={16} />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border border-brand-blue/0 group-hover:border-brand-blue/40 transition-all duration-400" />
              </motion.div>
            ))}
          </div>

          {/* CTA hacia página de proyectos */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 flex justify-center"
          >
            <a
              href="/proyectos"
              className="inline-flex items-center gap-2.5 border border-brand-blue text-brand-blue px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:bg-brand-blue hover:text-white transition-all duration-200 group"
            >
              Ver todos los proyectos
              <ArrowUpRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <Lightbox
            photo={selected}
            allPhotos={photos}
            onClose={() => setSelected(null)}
            onPrev={() => navigate(-1)}
            onNext={() => navigate(1)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
