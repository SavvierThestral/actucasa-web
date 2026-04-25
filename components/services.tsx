"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { RevealText } from "@/components/ui/reveal-text";
import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  HouseLine,
  Briefcase,
  Wrench,
  ArrowUpRight,
} from "@phosphor-icons/react";

const services = [
  {
    id: "modulos",
    icon: HouseLine,
    label: "Servicio 01",
    title: "Viviendas habitacionales",
    subtitle: "Viviendas modulares en steel frame para uso permanente",
    description:
      "Módulos diseñados para vivir todos los días, con mayor confort y durabilidad que una casa construida de manera tradicional. Se entregan con todas las terminaciones interiores y exteriores, instalaciones certificadas y aislación termoacústica de alta prestación.",
    features: [
      "Aislación térmica y acústica para confort en todas las estaciones del año.",
      "Instalaciones eléctricas y sanitarias incluidas y con materiales certificados.",
      "Terminaciones interiores y exteriores personalizables según el diseño de cada proyecto.",
      "Posibilidad de combinar módulos para lograr viviendas de mayor superficie sin obra adicional.",
    ],
    // https://unsplash.com/photos/1570129477492-45c003edd2be — modern residential exterior
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=1200&q=80",
    imageAlt: "Módulo habitacional en steel framing — vivienda moderna terminada",
    reverse: false,
  },
  {
    id: "oficinas",
    icon: Briefcase,
    label: "Servicio 02",
    title: "Oficinas modulares",
    subtitle: "Oficinas modulares listas para operar",
    description:
      "Espacios de trabajo profesionales que se fabrican en taller y se instalan en tu predio sin obra húmeda. Ideales para empresas que necesitan ampliar su infraestructura o expandirse en otros sitios de forma rápida, ordenada y sin frenar su operación.",
    features: [
      "Distribución flexible: open space, oficinas privadas o configuraciones mixtas según tu operación.",
      "Preparadas para cableado estructurado, red de datos y sistema de climatización.",
      "Relocalizables: si tu operación cambia de ubicación, la oficina se mueve con vos.",
      "Entrega en plazos cortos para que puedas empezar a operar lo antes posible.",
    ],
    // https://unsplash.com/photos/1497366216548-37526070297c — modern open office space
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80",
    imageAlt: "Oficina profesional moderna — espacio de trabajo diseñado con steel framing",
    reverse: true,
  },
];

function FadeIn({
  children,
  delay = 0,
  className,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right";
}) {
  const initial =
    direction === "left"
      ? { opacity: 0, x: -32 }
      : direction === "right"
        ? { opacity: 0, x: 32 }
        : { opacity: 0, y: 24 };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-8%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ServiceRow({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const Icon = service.icon;
  const isReverse = service.reverse;

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[520px] ${
        index > 0 ? "border-t border-bg-border" : ""
      }`}
    >
      {/* Imagen */}
      <div className={`relative overflow-hidden ${isReverse ? "md:order-2" : ""}`}>
        <FadeIn direction={isReverse ? "right" : "left"} className="h-full min-h-[320px] md:min-h-0">
          <div className="relative h-full w-full overflow-hidden group">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-brand-blue/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Número de servicio superpuesto */}
            <div className="absolute bottom-6 right-6 font-display font-bold text-white/15 text-[5rem] leading-none select-none">
              0{index + 1}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Contenido */}
      <div
        className={`flex flex-col justify-center px-8 md:px-12 lg:px-16 py-16 md:py-0 bg-bg-base ${
          isReverse ? "md:order-1" : ""
        }`}
      >
        <FadeIn delay={0.1} direction={isReverse ? "left" : "right"}>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 border border-brand-blue/30 text-brand-blue">
              <Icon size={20} weight="light" />
            </div>
            <span className="section-label">{service.label}</span>
          </div>

          <h3
            className="font-display font-bold leading-[0.92] tracking-[-0.025em] mb-3"
            style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)", color: "#3c3c3c", fontWeight: 900 }}
          >
            {service.title}
          </h3>

          <p className="font-sans text-brand-blue text-sm font-medium tracking-wide mb-6">
            {service.subtitle}
          </p>

          <p className="font-sans text-text-secondary leading-relaxed text-[0.97rem] max-w-[48ch] mb-10">
            {service.description}
          </p>

          {/* Features list */}
          <ul className="space-y-3 mb-10">
            {service.features.map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-3 font-sans text-text-secondary text-sm"
              >
                <span className="w-4 h-[1px] bg-brand-blue flex-shrink-0" />
                {feat}
              </li>
            ))}
          </ul>

          <MagneticButton className="self-start">
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 border border-brand-blue text-brand-blue px-6 py-3 font-sans text-sm tracking-[0.06em] uppercase hover:bg-brand-blue hover:text-white transition-all duration-300 group"
            >
              Consultar
              <ArrowUpRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </MagneticButton>
        </FadeIn>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="servicios" className="bg-bg-base">
      {/* Header de sección */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 items-end border-b border-bg-border pb-16">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="section-label mb-6"
            >
              Lo que hacemos
            </motion.p>
            <h2
              className="font-display font-bold leading-[0.9] tracking-[-0.03em]"
              style={{ fontSize: "clamp(2.6rem, 6vw, 5.5rem)", color: "#3c3c3c", fontWeight: 900 }}
            >
              <RevealText text="Nuestros servicios" />
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="font-sans text-text-secondary leading-relaxed text-[1rem] max-w-[44ch] md:text-right md:ml-auto"
          >
            Cada proyecto es único. Diseñamos soluciones a medida con el
            sistema constructivo más preciso y eficiente del mercado.
          </motion.p>
        </div>
      </div>

      {/* Servicios 1 y 2 en zig-zag */}
      <div className="border-t border-bg-border">
        {services.map((service, i) => (
          <ServiceRow key={service.id} service={service} index={i} />
        ))}
      </div>

      {/* Servicio 3 — Estructuras de hierro, full-width con imagen de fondo */}
      <div className="relative min-h-[600px] flex items-end overflow-hidden border-t border-bg-border">
        {/* https://unsplash.com/photos/1587300003388-59208cc962cb — steel structure industrial */}
        <Image
          src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=1920&q=80"
          alt="Estructura de acero industrial — solución estructural de alta resistencia"
          fill
          className="object-cover object-center"
          loading="lazy"
        />
        {/* Overlay fijo oscuro — independiente del tema para legibilidad sobre imagen */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060c14] via-[#060c14]/75 to-[#060c14]/25" />

        {/* Contenido sobre la imagen — texto blanco siempre (fondo oscuro) */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 pb-20 pt-40 w-full text-white">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8 md:gap-16 items-end">
            <div>
              <FadeIn>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 border border-white/30 text-white">
                    <Wrench size={20} weight="light" />
                  </div>
                  <span className="font-sans text-[0.7rem] tracking-[0.3em] uppercase text-white/60">Servicio 03</span>
                </div>
                <h3
                  className="font-display font-bold leading-[0.92] tracking-[-0.025em] text-white"
                  style={{ fontSize: "clamp(2rem, 3.5vw, 3.2rem)" }}
                >
                  Estructuras de Hierro
                </h3>
              </FadeIn>
            </div>

            <FadeIn delay={0.15}>
              <p className="font-sans text-white/70 leading-relaxed text-[0.97rem] max-w-[46ch] mb-8">
                Soluciones estructurales en acero de alta resistencia,
                diseñadas para proyectos que exigen precisión, durabilidad y
                adaptabilidad a cualquier escala. Desde galpones hasta
                estructuras comerciales complejas, fabricamos con los más
                altos estándares.
              </p>

              <ul className="grid grid-cols-2 gap-3 mb-8">
                {[
                  "Alta resistencia certificada",
                  "Adaptable a cualquier escala",
                  "Fabricación a medida",
                  "Montaje eficiente",
                ].map((feat) => (
                  <li
                    key={feat}
                    className="flex items-center gap-2 font-sans text-white/70 text-sm"
                  >
                    <span className="w-3 h-[1px] bg-white/50 flex-shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>

              <MagneticButton className="self-start">
                <a
                  href="#contacto"
                  className="inline-flex items-center gap-2 bg-brand-blue text-white px-6 py-3 font-sans text-sm tracking-[0.06em] uppercase hover:bg-brand-blue-hover transition-colors duration-300 group"
                >
                  Consultar
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              </MagneticButton>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
