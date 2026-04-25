"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";

import { MagneticButton } from "@/components/ui/magnetic-button";
import {
  WhatsappLogo,
  InstagramLogo,
  PaperPlaneTilt,
  CheckCircle,
} from "@phosphor-icons/react";

const SERVICES = [
  "Módulo habitacional",
  "Oficina anexa",
  "Estructura de hierro",
  "Otro / Consulta general",
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-8%" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    /* En producción: conectar a formspree.io, resend.com, o action server */
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1400);
  }

  return (
    <section
      id="contacto"
      className="bg-bg-base border-t border-bg-border py-20 md:py-36 relative overflow-hidden"
    >
      {/* Textura */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "url(/bg-texture.png)",
          backgroundSize: "cover",
        }}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 relative z-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="section-label mb-6"
          >
            Hablemos
          </motion.p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.975rem, 6vw, 4.875rem)", color: "#3c3c3c", fontWeight: 900 }}
          >
            Empezá tu proyecto
          </h2>
        </div>

        {/* Grid: form izquierda / info derecha */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-16 lg:gap-24">
          {/* ── Formulario ── */}
          <FadeIn delay={0.1}>
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-start gap-4 py-12"
              >
                <CheckCircle size={48} weight="light" className="text-brand-blue" />
                <h3 className="font-display font-bold text-3xl text-text-primary tracking-tight">
                  Mensaje enviado
                </h3>
                <p className="font-sans text-text-secondary max-w-[40ch]">
                  Gracias por contactarnos. Te respondemos en menos de 24
                  horas hábiles.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="mt-4 font-sans text-sm text-brand-blue underline underline-offset-4"
                >
                  Enviar otro mensaje
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Fila nombre + email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="nombre"
                      className="font-sans text-xs text-text-muted tracking-wide uppercase"
                    >
                      Nombre completo
                    </label>
                    <input
                      id="nombre"
                      name="nombre"
                      type="text"
                      required
                      placeholder="Juan García"
                      className="bg-bg-surface border border-bg-border text-text-primary font-sans text-sm px-4 py-3.5 placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="email"
                      className="font-sans text-xs text-text-muted tracking-wide uppercase"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="juan@ejemplo.com"
                      className="bg-bg-surface border border-bg-border text-text-primary font-sans text-sm px-4 py-3.5 placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors duration-200"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="telefono"
                    className="font-sans text-xs text-text-muted tracking-wide uppercase"
                  >
                    Teléfono (opcional)
                  </label>
                  <input
                    id="telefono"
                    name="telefono"
                    type="tel"
                    placeholder="+54 9 11 XXXX XXXX"
                    className="bg-bg-surface border border-bg-border text-text-primary font-sans text-sm px-4 py-3.5 placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors duration-200"
                  />
                </div>

                {/* Servicio */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="servicio"
                    className="font-sans text-xs text-text-muted tracking-wide uppercase"
                  >
                    Servicio de interés
                  </label>
                  <select
                    id="servicio"
                    name="servicio"
                    required
                    defaultValue=""
                    className="bg-bg-surface border border-bg-border text-text-primary font-sans text-sm px-4 py-3.5 focus:outline-none focus:border-brand-blue transition-colors duration-200 appearance-none cursor-pointer"
                  >
                    <option value="" disabled className="text-text-muted">
                      Seleccioná un servicio
                    </option>
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Mensaje */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="mensaje"
                    className="font-sans text-xs text-text-muted tracking-wide uppercase"
                  >
                    Contanos tu proyecto
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    required
                    placeholder="Describí brevemente lo que necesitás construir..."
                    className="bg-bg-surface border border-bg-border text-text-primary font-sans text-sm px-4 py-3.5 placeholder:text-text-muted focus:outline-none focus:border-brand-blue transition-colors duration-200 resize-none"
                  />
                </div>

                <MagneticButton className="self-start">
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center gap-3 bg-brand-blue text-white px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase hover:bg-brand-blue-hover transition-colors duration-300 disabled:opacity-60 active:scale-[0.98]"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={16} weight="bold" />
                        Enviar consulta
                      </>
                    )}
                  </button>
                </MagneticButton>
              </form>
            )}
          </FadeIn>

          {/* ── Info de contacto ── */}
          <div className="flex flex-col gap-10 lg:pt-2">
            <FadeIn delay={0.2}>
              <p className="font-sans text-text-secondary leading-relaxed text-[0.97rem] max-w-[38ch]">
                Preferís hablar directamente? Escribinos por WhatsApp o
                seguinos en Instagram para ver nuestros trabajos en detalle.
              </p>
            </FadeIn>

            {/* WhatsApp */}
            <FadeIn delay={0.3}>
              <a
                href="https://wa.me/5491100000000?text=Hola!%20Vi%20su%20web%20y%20quiero%20consultar%20sobre%20un%20proyecto"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group border border-bg-border hover:border-green-600/40 p-5 transition-all duration-300 hover:bg-green-50"
              >
                <div className="p-3 bg-green-100 text-green-700 group-hover:bg-green-200 transition-colors">
                  <WhatsappLogo size={22} weight="fill" />
                </div>
                <div>
                  <p className="font-sans font-medium text-text-primary text-sm">
                    WhatsApp
                  </p>
                  <p className="font-sans text-text-muted text-xs mt-0.5">
                    Respuesta en minutos
                  </p>
                </div>
              </a>
            </FadeIn>

            {/* Instagram */}
            <FadeIn delay={0.38}>
              <a
                href="https://instagram.com/ac.tucasa"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 group border border-bg-border hover:border-pink-400/40 p-5 transition-all duration-300 hover:bg-pink-50"
              >
                <div className="p-3 bg-pink-100 text-pink-600 group-hover:bg-pink-200 transition-colors">
                  <InstagramLogo size={22} weight="fill" />
                </div>
                <div>
                  <p className="font-sans font-medium text-text-primary text-sm">
                    @ac.tucasa
                  </p>
                  <p className="font-sans text-text-muted text-xs mt-0.5">
                    Proyectos y novedades
                  </p>
                </div>
              </a>
            </FadeIn>

            {/* Separador */}
            <FadeIn delay={0.44}>
              <div className="border-t border-bg-border pt-8">
                <p className="section-label mb-2">Zona de trabajo</p>
                <p className="font-sans text-text-secondary text-sm leading-relaxed">
                  Buenos Aires y Gran Buenos Aires.
                  <br />
                  Consultanos por proyectos en otras provincias.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
