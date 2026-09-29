import { whatsappUrl, siteConfig } from "@/lib/config";

const faqs: { q: string; a: string }[] = [
  {
    q: "¿Qué es un módulo habitacional en steel framing?",
    a: "Es un espacio construido en taller con una estructura de acero galvanizado, aislación termoacústica y terminaciones interiores y exteriores. Se fabrica completo, se traslada y se instala en tu terreno, sin obra húmeda.",
  },
  {
    q: "¿Cuánto se tarda en construir con steel framing?",
    a: "Al fabricarse en taller y no depender del clima, los tiempos se reducen hasta un 40% frente a la construcción tradicional con hormigón y ladrillos. El plazo exacto depende de los metros cuadrados y las terminaciones de cada proyecto.",
  },
  {
    q: "¿Cuánto cuesta una casa o un módulo en steel framing?",
    a: "El valor depende de la superficie, el diseño, las terminaciones y la ubicación del terreno. Contanos qué necesitás por WhatsApp o desde el formulario de contacto y te preparamos un presupuesto para tu proyecto.",
  },
  {
    q: "¿Cuánto dura una estructura de steel framing?",
    a: "La estructura de acero galvanizado tiene una protección anticorrosión que le da más de 50 años de vida útil estructural. Además es resistente a sismos, viento e insectos.",
  },
  {
    q: "¿Qué tipos de proyectos hacen?",
    a: "Módulos habitacionales, oficinas modulares y ampliaciones de viviendas existentes. Las oficinas son relocalizables y quedan listas para operar.",
  },
  {
    q: "¿En qué zonas trabajan?",
    a: `Nuestra base está en ${siteConfig.address}. Trabajamos en la provincia de Buenos Aires; escribinos con la ubicación de tu terreno y te confirmamos si podemos llegar.`,
  },
  {
    q: "¿El steel framing es sustentable?",
    a: "Sí. El acero es 100% reciclable, se genera menos escombro en obra y el edificio terminado tiene mayor eficiencia energética gracias a su aislación.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  inLanguage: "es-AR",
  mainEntity: faqs.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section id="preguntas-frecuentes" className="bg-bg-surface border-t border-bg-border py-14 md:py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-20">
        <div>
          <p className="section-label mb-6">Preguntas frecuentes</p>
          <h2
            className="font-display font-bold leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(1.775rem, 4vw, 3.25rem)", color: "#3c3c3c", fontWeight: 900 }}
          >
            Lo que más nos preguntan sobre construir en steel frame
          </h2>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-8 font-sans text-sm text-brand-blue underline underline-offset-4"
          >
            ¿Otra consulta? Escribinos por WhatsApp
          </a>
        </div>

        <div className="border-t border-bg-border">
          {faqs.map(({ q, a }) => (
            <details key={q} className="group border-b border-bg-border py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-sans font-medium text-text-primary [&::-webkit-details-marker]:hidden">
                <h3 className="text-base md:text-lg font-medium">{q}</h3>
                <span
                  aria-hidden="true"
                  className="text-xl text-brand-blue transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[62ch] font-sans text-sm md:text-base leading-relaxed text-text-secondary">
                {a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
