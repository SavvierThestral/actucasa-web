"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle } from "@phosphor-icons/react";
import { RevealText } from "@/components/ui/reveal-text";

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
          <p className="section-label mb-16">Nuestro equipo</p>
        </FadeIn>

        {/* Grid asimétrico: texto 3fr / imagen+stats 2fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24 items-start">
          {/* Columna izquierda — narrativa */}
          <div>
            <h2
              className="font-display font-bold leading-[0.9] tracking-[-0.03em] mb-10"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)", color: "#3c3c3c", fontWeight: 900 }}
            >
              <RevealText text="La precisión que construye el futuro." />
            </h2>

            <FadeIn delay={0.1} className="space-y-5">
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[55ch]">
                AC TuCasa nació de una visión para revolucionar la forma en que
                habitamos los espacios. Aplicando la tecnología del{" "}
                <span className="text-text-primary font-medium">Steel Frame</span>{" "}
                con su alto confort térmico y la eficiencia en construcción.
              </p>
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[55ch]">
                Nuestro compromiso con la calidad garantiza que cada unidad
                modular cumpla con los requisitos de sus propietarios,
                brindando un entorno de vida seguro, eficiente y sofisticado.
              </p>
            </FadeIn>

            {/* Bullets de valor */}
            <FadeIn delay={0.18}>
              <ul className="mt-10 space-y-3">
                {[
                  "Materiales certificados y durables",
                  "Diseño adaptado a cada cliente",
                  "Tiempos de entrega cumplidos",
                  "Acompañamiento post-obra",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-sans text-text-secondary text-[0.97rem]">
                    <CheckCircle size={20} weight="fill" className="text-brand-blue flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </FadeIn>
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
