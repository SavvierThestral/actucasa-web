"use client";

import { motion } from "framer-motion";
import Image from "next/image";


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
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-8%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function WhatModules() {
  return (
    <section className="bg-bg-base py-24 md:py-36 border-t border-bg-border overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Grid asimétrico 3fr / 2fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-center">

          {/* Columna izquierda */}
          <div>
            <FadeIn>
              <p className="section-label mb-6">Construcción modular</p>
            </FadeIn>

            <h2
              className="font-display font-bold leading-[0.9] tracking-[-0.03em] mb-4"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", color: "#3c3c3c", fontWeight: 900 }}
            >
              ¿Qué son los módulos?
            </h2>

            <p className="font-sans text-text-secondary text-lg leading-snug max-w-[52ch] mb-8">
              Espacios completos, fabricados en taller y listos para habitar
            </p>

            <FadeIn delay={0.1}>
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[56ch]">
                Nuestros módulos son estructuras construidas íntegramente en{" "}
                <span className="text-text-primary font-medium">
                  steel frame
                </span>{" "}
                — perfiles de acero galvanizado — que se fabrican en un entorno
                controlado y se entregan terminadas en tu terreno. No son
                contenedores adaptados: son espacios diseñados desde cero con
                todas las instalaciones, aislaciones y terminaciones de una
                construcción permanente.
              </p>
            </FadeIn>

            {/* Beneficios */}
            <FadeIn delay={0.18}>
              <div className="mt-10 space-y-0 border-t border-bg-border pt-10">
                {[
                  { title: "Rapidez de ejecución", desc: "Al fabricarse en taller, los plazos se reducen hasta un 60% respecto a la obra tradicional, sin depender del clima ni de imprevistos en obra." },
                  { title: "Calidad controlada", desc: "Cada etapa del proceso se supervisa en planta, lo que garantiza terminaciones uniformes y cumplimiento de estándares constructivos." },
                  { title: "Transportables y relocalizables", desc: "Los módulos se trasladan completos al terreno y pueden reubicarse si tu proyecto lo requiere." },
                  { title: "Ampliables", desc: "Podés sumar módulos en el futuro para crecer sin demoler ni intervenir lo existente." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 py-4 border-b border-bg-border last:border-0">
                    <span className="w-4 h-[1px] bg-brand-blue flex-shrink-0 mt-[0.6rem]" />
                    <div>
                      <p className="font-display font-bold text-brand-blue text-sm leading-none mb-1.5">
                        {item.title}
                      </p>
                      <p className="font-sans text-text-secondary text-sm leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* Columna derecha — imagen */}
          <FadeIn delay={0.15}>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* https://unsplash.com/photos/1570129477492-45c003edd2be — modular home */}
                <Image
                  src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80"
                  alt="Módulo habitacional en steel framing terminado — vivienda moderna"
                  fill
                  className="object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-brand-blue/8" />
              </div>
              {/* Etiqueta flotante */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 bg-brand-blue text-white px-6 py-4"
              >
                <p className="font-display font-bold text-2xl leading-none">60%</p>
                <p className="font-sans text-white/80 text-xs mt-1 tracking-wide">
                  menos tiempo de obra
                </p>
              </motion.div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
