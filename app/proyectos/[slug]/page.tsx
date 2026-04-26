import type { Metadata } from "next";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ProjectGalleryClient } from "@/components/project-gallery-client";
import { projects, categoryLabels } from "@/data/projects";
import { MapPin, CalendarBlank, ArrowLeft, ArrowUpRight, Ruler, Tag } from "@phosphor-icons/react/dist/ssr";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://actucasa.com.ar";

function getPhotos(folder: string): string[] {
  const dir = path.join(process.cwd(), "public", "proyectos", folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => /\.webp$/i.test(f))
    .sort()
    .map((f) => {
      const segments = ["proyectos", ...folder.split("/"), f];
      return "/" + segments.map(encodeURIComponent).join("/");
    });
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  const label = categoryLabels[project.category];
  const title = `${project.title} — ACTuCasa`;
  const description = [
    `${project.title}: ${label}`,
    project.location && `en ${project.location}`,
    project.area && `Superficie: ${project.area}`,
    project.year && `Año ${project.year}`,
  ]
    .filter(Boolean)
    .join(". ") + ".";

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}/proyectos/${slug}` },
    openGraph: {
      title,
      description,
      url: `${BASE_URL}/proyectos/${slug}`,
      images: [{ url: project.image, width: 1200, height: 800, alt: project.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const photos = getPhotos(project.folder);

  const ficha = [
    { label: "Tipo", value: categoryLabels[project.category], icon: "tag" },
    { label: "Zona", value: project.location, icon: "pin" },
    { label: "Año", value: project.year, icon: "cal" },
    { label: "Superficie", value: project.area, icon: "ruler" },
  ].filter((f) => f.value);

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* Header */}
        <section className="pt-36 pb-12 bg-bg-base border-b border-bg-border">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 font-sans text-xs text-text-muted hover:text-brand-blue transition-colors mb-8 tracking-wide"
            >
              <ArrowLeft size={14} />
              Todos los proyectos
            </Link>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div>
                <p className="section-label mb-4">{categoryLabels[project.category]}</p>
                <h1
                  className="font-display font-bold leading-[0.95] tracking-[-0.02em] text-text-primary"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900 }}
                >
                  {project.title}
                </h1>
              </div>
            </div>
          </div>
        </section>

        {/* Galería */}
        <section className="bg-bg-surface py-12 md:py-16">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <ProjectGalleryClient
              photos={photos.length > 0 ? photos : [project.image]}
              title={project.title}
            />
          </div>
        </section>

        {/* Ficha técnica + descripción */}
        {(ficha.length > 0 || project.description) && (
          <section className="bg-bg-base border-t border-bg-border py-14 md:py-20">
            <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr] gap-12 md:gap-20 items-start">

                {/* Ficha técnica */}
                {ficha.length > 0 && (
                  <div>
                    <p className="section-label mb-6">Ficha técnica</p>
                    <dl className="divide-y divide-bg-border">
                      {ficha.map((f) => (
                        <div key={f.label} className="flex items-start justify-between gap-4 py-4">
                          <dt className="flex items-center gap-2 font-sans text-xs tracking-[0.15em] uppercase text-text-muted min-w-[80px]">
                            {f.icon === "pin" && <MapPin size={13} weight="fill" className="text-brand-blue flex-shrink-0" />}
                            {f.icon === "cal" && <CalendarBlank size={13} weight="fill" className="text-brand-blue flex-shrink-0" />}
                            {f.icon === "ruler" && <Ruler size={13} weight="fill" className="text-brand-blue flex-shrink-0" />}
                            {f.icon === "tag" && <Tag size={13} weight="fill" className="text-brand-blue flex-shrink-0" />}
                            {f.label}
                          </dt>
                          <dd className="font-sans text-sm text-text-primary font-medium text-right">
                            {f.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Descripción */}
                {project.description && (
                  <div>
                    <p className="section-label mb-6">Descripción</p>
                    <p className="font-sans text-text-secondary leading-relaxed text-[0.97rem]">
                      {project.description}
                    </p>
                  </div>
                )}

              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="bg-bg-base border-t border-bg-border py-16">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-display font-bold text-text-primary text-2xl tracking-tight mb-1">
                ¿Te interesa un proyecto similar?
              </p>
              <p className="font-sans text-text-secondary text-sm">
                Consultanos sin compromiso.
              </p>
            </div>
            <a
              href="/#contacto"
              className="relative overflow-hidden inline-flex items-center gap-2.5 bg-brand-blue text-white px-8 py-4 font-sans font-medium text-sm tracking-[0.06em] uppercase group"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out bg-white" />
              <span className="relative z-10 inline-flex items-center gap-2 transition-colors duration-300 group-hover:text-brand-blue">
                Contactar
                <ArrowUpRight size={16} />
              </span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
