"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  projects,
  categoryLabels,
  type ProjectCategory,
} from "@/data/projects";
import { ArrowUpRight, MapPin, CalendarBlank } from "@phosphor-icons/react";

const filters: { label: string; value: "all" | ProjectCategory }[] = [
  { label: "Todos", value: "all" },
  { label: "Módulos", value: "modulo" },
  { label: "Oficinas", value: "oficina" },
  { label: "Remodelaciones", value: "remodelacion" },
  { label: "Wood Frame", value: "wood-frame" },
  { label: "Tradicional", value: "tradicional" },
];

export function ProjectsClient() {
  const [active, setActive] = useState<"all" | ProjectCategory>("all");

  const visible =
    active === "all" ? projects : projects.filter((p) => p.category === active);

  return (
    <>
      {/* ── Hero de página ── */}
      <section className="relative pt-36 pb-16 bg-bg-base border-b border-bg-border overflow-hidden">
        {/* Blueprint SVG — misma estética que el hero principal */}
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
          >
            <defs>
              <pattern
                id="pg-grid-major"
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
                id="pg-grid-minor"
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
            <rect width="100%" height="100%" fill="url(#pg-grid-minor)" />
            <rect width="100%" height="100%" fill="url(#pg-grid-major)" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#003d82]/60" />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-white/60 mb-5"
          >
            Portfolio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-bold text-white leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)" }}
          >
            PROYECTOS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="font-sans text-white/70 text-base mt-5 max-w-[44ch]"
          >
            Obras entregadas en steel framing: módulos habitacionales, oficinas
            y estructuras de acero.
          </motion.p>
        </div>
      </section>

      {/* ── Filtros + grilla ── */}
      <section className="bg-bg-base py-16 md:py-24 min-h-[60vh]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
          {/* Filtros */}
          <div className="flex flex-wrap gap-3 mb-14">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`font-sans text-sm px-5 py-2.5 border transition-all duration-200 ${
                  active === f.value
                    ? "bg-brand-blue text-white border-brand-blue"
                    : "bg-transparent text-text-secondary border-bg-border hover:border-brand-blue/40 hover:text-text-primary"
                }`}
              >
                {f.label}
                {f.value !== "all" && (
                  <span className="ml-2 text-xs opacity-60">
                    {projects.filter((p) => p.category === f.value).length}
                  </span>
                )}
              </button>
            ))}
            <span className="ml-auto font-sans text-text-muted text-sm self-center">
              {visible.length} proyecto{visible.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Grilla de proyectos */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10"
          >
            <AnimatePresence mode="popLayout">
              {visible.map((project, i) => (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: i * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="group flex flex-col"
                >
                  {/* Imagen */}
                  <div className="relative aspect-[4/3] overflow-hidden mb-5 bg-bg-surface">
                    <Image
                      src={project.image}
                      alt={`${project.title} — ${categoryLabels[project.category]}`}
                      fill
                      className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                      loading="lazy"
                    />
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#003d82]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-5">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-sans text-white text-xs tracking-wide font-medium">
                          {categoryLabels[project.category]}
                        </span>
                        <div className="p-1.5 border border-white/40 text-white">
                          <ArrowUpRight size={14} />
                        </div>
                      </div>
                    </div>

                    {/* Badge categoría */}
                    <div className="absolute top-4 left-4 bg-brand-blue text-white font-sans text-[0.65rem] tracking-[0.15em] uppercase px-2.5 py-1">
                      {categoryLabels[project.category]}
                    </div>
                  </div>

                  {/* Contenido */}
                  <div className="flex flex-col flex-1">
                    <h2 className="font-display font-bold text-text-primary text-xl tracking-tight mb-2 leading-tight">
                      {project.title}
                    </h2>

                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex items-center gap-1.5 font-sans text-text-muted text-xs">
                        <MapPin size={12} weight="fill" />
                        {project.location}
                      </span>
                      <span className="flex items-center gap-1.5 font-sans text-text-muted text-xs">
                        <CalendarBlank size={12} weight="fill" />
                        {project.year}
                      </span>
                      {project.area && (
                        <span className="font-sans text-text-muted text-xs">
                          {project.area}
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-text-secondary text-sm leading-relaxed mb-4 flex-1">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-sans text-[0.65rem] tracking-wide text-text-muted border border-bg-border px-2.5 py-1 uppercase"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty state */}
          {visible.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-24 text-center"
            >
              <p className="font-sans text-text-muted text-sm">
                No hay proyectos en esta categoría todavía.
              </p>
            </motion.div>
          )}

          {/* CTA contacto */}
          <div className="mt-20 pt-16 border-t border-bg-border flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-bold text-text-primary text-2xl tracking-tight mb-1">
                ¿Tenés un proyecto en mente?
              </p>
              <p className="font-sans text-text-secondary text-sm">
                Consultanos sin compromiso.
              </p>
            </div>
            <MagneticButton>
              <Link
                href="/#contacto"
                className="inline-flex items-center gap-2.5 bg-brand-blue text-white px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:bg-brand-blue-hover transition-colors duration-200"
              >
                Contactar
                <ArrowUpRight size={16} />
              </Link>
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
