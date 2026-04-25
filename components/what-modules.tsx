"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
              className="font-display font-bold leading-[0.9] tracking-[-0.03em] text-text-primary mb-8"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 5rem)" }}
            >
              <RevealText text="¿Qué son los módulos habitacionales?" />
            </h2>

            <FadeIn delay={0.1}>
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[56ch] mb-6">
                Los módulos habitacionales son unidades de vivienda completas
                construidas con el sistema de{" "}
                <span className="text-text-primary font-medium">
                  steel framing
                </span>
                : perfiles de acero galvanizado de alta precisión que conforman
                una estructura liviana, resistente y eficiente. Desde un
                ambiente hasta una vivienda multifamiliar, cada módulo se diseña
                a medida.
              </p>
              <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] max-w-[56ch]">
                A diferencia de la obra tradicional, los módulos se fabrican con
                piezas prefabricadas que llegan listas a la obra. El resultado:
                menos tiempo de construcción, menos residuos y una calidad de
                terminación superior que no depende de las condiciones del
                clima.
              </p>
            </FadeIn>

            {/* Características clave */}
            <FadeIn delay={0.18}>
              <div className="mt-10 grid grid-cols-2 gap-0 border-t border-bg-border pt-10">
                {[
                  { value: "Ampliables", desc: "Crecen con tu familia" },
                  { value: "Llave en mano", desc: "Terminación completa" },
                  { value: "Instalaciones", desc: "Eléctricas y sanitarias" },
                  { value: "A medida", desc: "Diseño personalizado" },
                ].map((item, i) => (
                  <div
                    key={item.value}
                    className={`py-5 pr-6 ${i % 2 === 0 ? "border-r border-bg-border" : "pl-6"} ${i < 2 ? "border-b border-bg-border" : ""}`}
                  >
                    <p className="font-display font-bold text-brand-blue text-lg leading-none mb-1">
                      {item.value}
                    </p>
                    <p className="font-sans text-text-muted text-xs tracking-wide">
                      {item.desc}
                    </p>
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
                <p className="font-display font-bold text-2xl leading-none">40%</p>
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
