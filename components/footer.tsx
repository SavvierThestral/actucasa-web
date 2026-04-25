import Image from "next/image";
import Link from "next/link";
import { InstagramLogo, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";

const services = [
  { label: "Módulos habitacionales", href: "#servicios" },
  { label: "Oficinas anexas", href: "#servicios" },
  { label: "Estructuras de hierro", href: "#servicios" },
];

const nav = [
  { label: "Nosotros", href: "#nosotros" },
  { label: "Servicios", href: "#servicios" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "Contacto", href: "#contacto" },
];

export function Footer() {
  return (
    <footer className="bg-bg-surface border-t border-bg-border">
      {/* Main footer grid */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-8">
          {/* Columna brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-9 h-9">
                <Image src="/logo.webp" alt="ACTuCasa" fill className="object-contain invert" />
              </div>
            </Link>

            <p className="font-sans text-text-muted text-sm leading-relaxed max-w-[30ch] mb-8">
              Construcción en seco con steel framing. Precisión, eficiencia y
              diseño para tu próximo proyecto.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com/ac.tucasa"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram ACTuCasa"
                className="p-2.5 border border-bg-border text-text-muted hover:text-text-primary hover:border-white/20 transition-all duration-200"
              >
                <InstagramLogo size={18} />
              </a>
              <a
                href="https://wa.me/5491100000000"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp ACTuCasa"
                className="p-2.5 border border-bg-border text-text-muted hover:text-text-primary hover:border-white/20 transition-all duration-200"
              >
                <WhatsappLogo size={18} />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <p className="font-sans text-xs text-text-muted tracking-[0.2em] uppercase mb-5">
              Servicios
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <p className="font-sans text-xs text-text-muted tracking-[0.2em] uppercase mb-5">
              Navegar
            </p>
            <ul className="space-y-3">
              {nav.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="font-sans text-xs text-text-muted tracking-[0.2em] uppercase mb-5">
              Contacto
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://instagram.com/ac.tucasa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  @ac.tucasa
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5491100000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
                >
                  WhatsApp
                </a>
              </li>
              <li className="font-sans text-sm text-text-muted leading-relaxed">
                Buenos Aires,
                <br />
                Argentina
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-bg-border">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-text-muted text-xs tracking-wide">
            &copy; {new Date().getFullYear()} ACTuCasa. Todos los derechos reservados.
          </p>
          <p className="font-sans text-text-muted text-xs">
            Steel Framing &middot; Construcción en Seco &middot; Argentina
          </p>
        </div>
      </div>
    </footer>
  );
}
