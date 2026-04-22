"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText } from "@/components/ui/reveal-text";

const stats = [
  { value: "50+", label: "Proyectos entregados" },
  { value: "5+", label: "Años de experiencia" },
  { value: "100%", label: "Construcción en seco" },
];

function FadeIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-10%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function About() {
  return (
    <section
      id="nosotros"
      className="relative bg-bg-base py-28 md:py-40 overflow-hidden"
    >
      {/* Fondo texturizado */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(/bg-texture.png)",
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Label */}
        <FadeIn>
          <p className="section-label mb-16">Sobre nosotros</p>
        </FadeIn>

        {/* Grid asimétrico: texto 3fr / imagen+stats 2fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Columna izquierda — narrativa */}
          <div>
            <h2
              className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-text-primary mb-10"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
            >
              <RevealText text="La precisión que construye el futuro." />
            </h2>

            <FadeIn delay={0.1} className="space-y-5">
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[55ch]">
                En ACTuCasa entendemos que construir no es solo levantar
                paredes — es crear espacios que resistan el tiempo. Por eso
                trabajamos exclusivamente con{" "}
                <span className="text-text-primary font-medium">
                  steel framing
                </span>
                : un sistema de construcción en seco que combina precisión
                industrial con eficiencia energética superior.
              </p>
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[55ch]">
                Cada estructura se fabrica con tolerancias milimétricas,
                reduciendo residuos, acelerando los tiempos de obra y
                garantizando un resultado estético que no compromete la
                durabilidad.
              </p>
            </FadeIn>

            {/* Stats en línea */}
            <div className="mt-16 grid grid-cols-3 gap-0 border-t border-bg-border pt-10">
              {stats.map((stat, i) => (
                <FadeIn key={stat.label} delay={0.15 + i * 0.08}>
                  <div className="pr-8 border-r border-bg-border last:border-r-0 last:pr-0">
                    <p
                      className="font-display font-bold text-brand-blue leading-none tracking-tight mb-2"
                      style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}
                    >
                      {stat.value}
                    </p>
                    <p className="font-sans text-text-muted text-xs tracking-wide leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Columna derecha — imagen con offset */}
          <div className="relative">
            <FadeIn delay={0.2}>
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* https://unsplash.com/photos/1581094794329-c8112a89af12 — construction workers on site */}
                <Image
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1200&q=80"
                  alt="Obra de construcción en steel framing — equipo trabajando en estructura"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-blue/10" />
              </div>
            </FadeIn>

            {/* Card flotante de credencial */}
            <motion.div
              initial={{ opacity: 0, x: 24, y: 24 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true }}
              className="absolute -bottom-8 -left-8 bg-bg-surface border border-bg-border p-6 max-w-[200px]"
            >
              <p className="font-display font-bold text-brand-blue text-3xl leading-none mb-1">
                #1
              </p>
              <p className="font-sans text-text-muted text-xs leading-tight tracking-wide">
                Sistema constructivo del futuro en Argentina
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
