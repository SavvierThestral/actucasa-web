"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { List, X } from "@phosphor-icons/react";

const links = [
  { href: "#nosotros", label: "Nosotros" },
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
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
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: scrolled ? "rgba(10, 13, 15, 0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(30,37,45,0.8)" : "1px solid transparent",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative flex items-center gap-3 group">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.webp"
                alt="ACTuCasa logo"
                fill
                className="object-contain"
              />
            </div>
            <span
              className="text-text-primary font-display font-bold text-lg tracking-tight"
              style={{ letterSpacing: "-0.02em" }}
            >
              ACTuCasa
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-text-secondary hover:text-text-primary font-sans text-sm tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-[1px] bg-brand-blue group-hover:w-full transition-all duration-300" />
              </a>
            ))}
            <a
              href="#contacto"
              className="border border-brand-blue text-brand-blue px-5 py-2 font-sans text-sm tracking-wide hover:bg-brand-blue hover:text-white transition-all duration-300"
            >
              Consultanos
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-text-primary p-2"
            aria-label="Menú"
          >
            {menuOpen ? <X size={22} /> : <List size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-40 bg-bg-base/95 backdrop-blur-md flex flex-col pt-24 px-8 md:hidden ${
          menuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <nav className="flex flex-col gap-6">
          {links.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              initial={{ opacity: 0, x: -20 }}
              animate={menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-bold text-3xl text-text-primary tracking-tight"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#contacto"
            onClick={() => setMenuOpen(false)}
            initial={{ opacity: 0 }}
            animate={menuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.28 }}
            className="mt-4 self-start border border-brand-blue text-brand-blue px-6 py-3 font-sans text-sm tracking-wide"
          >
            Consultanos
          </motion.a>
        </nav>
      </motion.div>
    </>
  );
}
