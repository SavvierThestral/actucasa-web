"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 60);
  });

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-400"
        style={{
          backgroundColor: scrolled ? "rgba(255,255,255,0.94)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(214,219,225,0.8)"
            : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-[72px] flex items-center justify-between">

          {/* Logo — blanco en hero, oscuro al scrollear */}
          <Link href="/" className="relative flex items-center group">
            <div className="relative w-11 h-11">
              <Image
                src="/logo.webp"
                alt="ACTuCasa"
                fill
                className={`object-contain transition-all duration-300 ${
                  scrolled ? "invert" : ""
                }`}
              />
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-sans text-sm tracking-wide transition-colors duration-300 relative group ${
                  scrolled
                    ? "text-text-secondary hover:text-text-primary"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0.5 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 ${
                    scrolled ? "bg-brand-blue" : "bg-white"
                  }`}
                />
              </Link>
            ))}

            {/* Botón Consultanos — azul al scrollear, blanco en hero */}
            <a
              href="#contacto"
              className={`px-5 py-2.5 font-sans text-sm tracking-wide transition-all duration-300 active:scale-[0.97] ${
                scrolled
                  ? "bg-brand-blue text-white hover:bg-brand-blue-hover"
                  : "bg-white text-brand-blue hover:bg-white/90"
              }`}
            >
              Consultanos
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              scrolled ? "text-text-primary" : "text-white"
            }`}
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu — siempre blanco sin importar el scroll */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-40 bg-white/97 backdrop-blur-md flex flex-col pt-24 px-8 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {links.map((link, i) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -20 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display font-bold text-3xl text-text-primary tracking-tight"
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-4 self-start bg-brand-blue text-white px-6 py-3 font-sans text-sm tracking-wide"
          >
            Consultanos
          </motion.a>
        </nav>
      </motion.div>
    </>
  );
}
