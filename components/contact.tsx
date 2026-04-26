"use client";

import { motion } from "framer-motion";
import { useState, FormEvent } from "react";
import emailjs from "@emailjs/browser";

import {
  WhatsappLogo,
  InstagramLogo,
  PaperPlaneTilt,
  CheckCircle,
  EnvelopeSimple,
  MapPin,
} from "@phosphor-icons/react";
import { whatsappUrl, instagramUrl, siteConfig } from "@/lib/config";

const PROJECT_TYPES = ["Estructura de hierro", "Obra in situ", "Módulo", "Otro"];

const inputStyle = {
  backgroundColor: "#044282",
  border: "1px solid rgba(98,160,199,0.3)",
  color: "#ffffff",
};

const focusOn = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
  (e.target.style.borderColor = "#62A0C7");
const focusOff = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
  (e.target.style.borderColor = "rgba(98,160,199,0.3)");

function Label({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="font-sans text-xs tracking-wide uppercase" style={{ color: "#62A0C7" }}>
      {children}
    </label>
  );
}

function FadeIn({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
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
  const [error, setError] = useState("");
  const [showOtro, setShowOtro] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const form = e.currentTarget;
    const data = {
      from_name: (form.elements.namedItem("from_name") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      from_email: (form.elements.namedItem("from_email") as HTMLInputElement).value,
      project_type: (form.elements.namedItem("project_type") as HTMLSelectElement).value,
      other_project: showOtro
        ? (form.elements.namedItem("other_project") as HTMLInputElement)?.value
        : "",
    };

    try {
      await emailjs.send(
        "service_0lcepw8",
        "template_hcq2e8s",
        data,
        { publicKey: "l7A4T1Yo1E8euNiXM" }
      );
      setSent(true);
    } catch {
      setError(`Error al enviar. Escribinos a ${siteConfig.email}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contacto"
      className="border-t border-[#3a78b5]/20 py-12 md:py-20 relative overflow-hidden"
      style={{ backgroundColor: "#055196" }}
    >
      {/* Textura */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "url(/bg-texture.png)", backgroundSize: "cover" }}
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
            style={{ color: "#62A0C7" }}
          >
            Hablemos
          </motion.p>
          <h2
            className="font-display font-bold leading-[0.9] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.975rem, 6vw, 4.875rem)", color: "#ffffff", fontWeight: 900 }}
          >
            Empezá tu proyecto
          </h2>
        </div>

        {/* Grid */}
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
                <CheckCircle size={48} weight="light" style={{ color: "#62A0C7" }} />
                <h3 className="font-display font-bold text-3xl tracking-tight" style={{ color: "#ffffff" }}>
                  Consulta enviada
                </h3>
                <p className="font-sans max-w-[40ch]" style={{ color: "#62A0C7" }}>
                  Gracias por contactarnos. Te respondemos en menos de 24 horas hábiles.
                </p>
                <button
                  onClick={() => { setSent(false); setShowOtro(false); }}
                  className="mt-4 font-sans text-sm underline underline-offset-4"
                  style={{ color: "#62A0C7" }}
                >
                  Enviar otra consulta
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nombre + Teléfono */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="from_name">Nombre completo</Label>
                    <input
                      id="from_name"
                      name="from_name"
                      type="text"
                      required
                      placeholder="Nicolás Ferreyra"
                      className="font-sans text-sm px-4 py-3.5 focus:outline-none transition-colors duration-200"
                      style={inputStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+54 9 2932 000000"
                      className="font-sans text-sm px-4 py-3.5 focus:outline-none transition-colors duration-200"
                      style={inputStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="from_email">Correo electrónico</Label>
                  <input
                    id="from_email"
                    name="from_email"
                    type="email"
                    required
                    placeholder="juan@ejemplo.com"
                    className="font-sans text-sm px-4 py-3.5 focus:outline-none transition-colors duration-200"
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                  />
                </div>

                {/* Tipo de proyecto */}
                <div className="flex flex-col gap-2">
                  <Label htmlFor="project_type">Tipo de proyecto</Label>
                  <select
                    id="project_type"
                    name="project_type"
                    required
                    defaultValue=""
                    className="font-sans text-sm px-4 py-3.5 focus:outline-none transition-colors duration-200 appearance-none cursor-pointer"
                    style={inputStyle}
                    onFocus={focusOn}
                    onBlur={focusOff}
                    onChange={(e) => setShowOtro(e.target.value === "Otro")}
                  >
                    <option value="" disabled style={{ color: "#62A0C7", backgroundColor: "#044282" }}>
                      Seleccioná una opción
                    </option>
                    {PROJECT_TYPES.map((t) => (
                      <option key={t} value={t} style={{ backgroundColor: "#044282" }}>
                        {t}
                      </option>
                    ))}
                  </select>

                  {/* Campo "Otro" condicional */}
                  {showOtro && (
                    <input
                      name="other_project"
                      type="text"
                      maxLength={20}
                      placeholder="Describí tu proyecto (máx. 20 caracteres)"
                      className="font-sans text-sm px-4 py-3.5 focus:outline-none transition-colors duration-200 mt-2"
                      style={inputStyle}
                      onFocus={focusOn}
                      onBlur={focusOff}
                    />
                  )}
                </div>

                {/* Error */}
                {error && (
                  <p className="font-sans text-sm px-4 py-3" style={{ backgroundColor: "rgba(239,68,68,0.15)", color: "#fca5a5" }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="relative overflow-hidden inline-flex items-center gap-3 px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase disabled:opacity-60 active:scale-[0.98] group self-start"
                  style={{ backgroundColor: "#62A0C7", color: "#ffffff" }}
                >
                  <span
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-0 group-active:translate-x-0 transition-transform duration-300 ease-out"
                    style={{ backgroundColor: "#ffffff" }}
                  />
                  <span className="relative z-10 inline-flex items-center gap-3 transition-colors duration-300 group-hover:text-[#055196] group-active:text-[#055196]">
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Enviando...
                      </>
                    ) : (
                      <>
                        <PaperPlaneTilt size={16} weight="bold" />
                        Enviar consulta
                      </>
                    )}
                  </span>
                </button>
              </form>
            )}
          </FadeIn>

          {/* ── Info de contacto ── */}
          <div className="flex flex-col gap-6 lg:pt-2">
            <FadeIn delay={0.2}>
              <ul className="space-y-4">
                <li>
                  <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 group">
                    <div className="p-2 flex-shrink-0" style={{ border: "1px solid rgba(98,160,199,0.35)", color: "#ffffff" }}>
                      <EnvelopeSimple size={18} weight="light" />
                    </div>
                    <span className="font-sans text-sm" style={{ color: "#62A0C7" }}>{siteConfig.email}</span>
                  </a>
                </li>
                <li>
                  <a href={siteConfig.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="p-2 flex-shrink-0" style={{ border: "1px solid rgba(98,160,199,0.35)", color: "#ef4444" }}>
                      <MapPin size={18} weight="light" />
                    </div>
                    <span className="font-sans text-sm" style={{ color: "#62A0C7" }}>{siteConfig.address}</span>
                  </a>
                </li>
                <li>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="p-2 flex-shrink-0" style={{ border: "1px solid rgba(98,160,199,0.35)", color: "#4ade80" }}>
                      <WhatsappLogo size={18} weight="fill" />
                    </div>
                    <span className="font-sans text-sm" style={{ color: "#62A0C7" }}>WhatsApp</span>
                  </a>
                </li>
                <li>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="p-2 flex-shrink-0" style={{ border: "1px solid rgba(98,160,199,0.35)", color: "#f472b6" }}>
                      <InstagramLogo size={18} weight="fill" />
                    </div>
                    <span className="font-sans text-sm" style={{ color: "#62A0C7" }}>@{siteConfig.instagramHandle}</span>
                  </a>
                </li>
              </ul>
            </FadeIn>

            {/* Mapa */}
            <FadeIn delay={0.28}>
              <div className="relative overflow-hidden" style={{ height: "220px" }}>
                <iframe
                  src={siteConfig.mapsEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Ubicación ACTuCasa"
                />
              </div>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-sans text-xs text-white/40 hover:text-white/70 transition-colors mt-2"
              >
                Abrir en Google Maps ↗
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
