"use client";

import { motion } from "framer-motion";

import { Lightning, Shield, Leaf } from "@phosphor-icons/react";

const reasons = [
  {
    num: "01",
    icon: Lightning,
    title: "Construcción rápida",
    body: "Los perfiles llegan prefabricados a obra. Reducimos hasta un 40% los tiempos frente a construcción tradicional con hormigón y ladrillos.",
  },
  {
    num: "02",
    icon: Shield,
    title: "Durabilidad superior",
    body: "Acero galvanizado con protección anticorrosión que garantiza más de 50 años de vida estructural, resistente a sismos, viento e insectos.",
  },
  {
    num: "03",
    icon: Leaf,
    title: "Construcción sustentable",
    body: "El acero es 100% reciclable. Menor generación de escombros en obra y mayor eficiencia energética en el edificio terminado.",
  },
];

export function WhySteelFrame() {
  return (
    <section className="bg-bg-surface border-t border-bg-border py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header — dos columnas */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-10 md:gap-20 items-end mb-12 pb-12 border-b border-bg-border">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="section-label mb-6"
            >
              Steel Framing
            </motion.p>
            <h2
              className="font-display font-bold leading-[0.9] tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.775rem, 5.5vw, 4.375rem)", color: "#3c3c3c", fontWeight: 900 }}
            >
              ¿Por qué elegir steel frame?
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12 }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-text-secondary leading-relaxed text-[1.02rem] mb-4 max-w-[48ch]">
              El steel framing redefine la construcción moderna: precisión
              milimétrica, menor desperdicio y durabilidad incomparable.
            </p>
            <p className="font-sans text-text-muted leading-relaxed text-sm max-w-[48ch]">
              Soluciones de acero estructural diseñadas para construir mejor,
              más rápido y con décadas de vida útil garantizada.
            </p>
          </motion.div>
        </div>

        {/* Razones — 3 tarjetas en columnas */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: i * 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once: true, margin: "-6%" }}
                className={`flex flex-col p-10 md:p-12 ${
                  i < reasons.length - 1
                    ? "border-b md:border-b-0 md:border-r border-bg-border"
                    : ""
                }`}
              >
                {/* Número + icono */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="font-display font-bold text-brand-blue/20 leading-none select-none"
                    style={{ fontSize: "3.5rem" }}
                  >
                    {reason.num}
                  </span>
                  <div className="p-2.5 border border-brand-blue/25 text-brand-blue">
                    <Icon size={20} weight="light" />
                  </div>
                </div>

                {/* Título */}
                <h3
                  className="leading-tight mb-4"
                  style={{ fontFamily: "var(--font-merriweather)", fontSize: "clamp(0.775rem, 2vw, 1.175rem)", color: "#3c3c3c", fontWeight: 900 }}
                >
                  {reason.title}
                </h3>

                {/* Descripción */}
                <p className="font-sans text-text-secondary leading-relaxed text-[0.97rem]">
                  {reason.body}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
