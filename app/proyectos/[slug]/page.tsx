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
import { ArrowLeft } from "@phosphor-icons/react/dist/ssr";

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
    { label: "Tipo", value: categoryLabels[project.category] },
    { label: "Zona", value: project.location },
    { label: "Año", value: project.year },
    { label: "Superficie", value: project.area },
  ].filter((f) => f.value);

  // Subtitle line: "Zona · Año · Superficie"
  const subtitle = [project.location, project.year, project.area]
    .filter(Boolean)
    .join(" · ");

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main className="bg-bg-base min-h-screen">

        {/* Back link */}
        <div className="pt-28 pb-0">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <Link
              href="/proyectos"
              className="inline-flex items-center gap-2 font-sans text-xs text-text-muted hover:text-brand-blue transition-colors tracking-wide"
            >
              <ArrowLeft size={13} />
              Todos los proyectos
            </Link>
          </div>
        </div>

        {/* Main: galería izquierda + info derecha */}
        <section className="py-8 md:py-12">
          <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-10 lg:gap-16 items-start">

              {/* ── Galería (sticky en desktop) ── */}
              <div className="lg:sticky lg:top-24">
                <ProjectGalleryClient
                  photos={photos.length > 0 ? photos : [project.image]}
                  title={project.title}
                />
              </div>

              {/* ── Panel de info ── */}
              <div className="flex flex-col">

                {/* Encabezado */}
                <p className="section-label mb-3">{categoryLabels[project.category]}</p>
                <h1
                  className="font-display font-black leading-[0.95] tracking-[-0.025em] text-text-primary"
                  style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)" }}
                >
                  {project.title}
                </h1>

                {subtitle && (
                  <p className="font-sans text-sm text-text-muted mt-3 tracking-wide">
                    {subtitle}
                  </p>
                )}

                {/* Ficha técnica — grilla con bordes */}
                {ficha.length > 0 && (
                  <div
                    className="mt-8 grid grid-cols-2 border-t border-l"
                    style={{ borderColor: "var(--color-bg-border)" }}
                  >
                    {ficha.map((f) => (
                      <div
                        key={f.label}
                        className="border-b border-r px-5 py-4"
                        style={{ borderColor: "var(--color-bg-border)" }}
                      >
                        <p className="font-sans text-[10px] tracking-[0.18em] uppercase text-text-muted mb-1.5">
                          {f.label}
                        </p>
                        <p className="font-sans text-sm font-semibold text-text-primary">
                          {f.value}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Descripción */}
                {project.description && (
                  <div
                    className="mt-8 pt-8 border-t"
                    style={{ borderColor: "var(--color-bg-border)" }}
                  >
                    <p className="section-label mb-4">Descripción</p>
                    <p className="font-sans text-text-secondary leading-relaxed text-[0.96rem]">
                      {project.description}
                    </p>
                  </div>
                )}

                {/* Link volver al final en mobile */}
                <div className="mt-10 lg:hidden">
                  <Link
                    href="/proyectos"
                    className="inline-flex items-center gap-2 font-sans text-xs text-text-muted hover:text-brand-blue transition-colors tracking-wide"
                  >
                    <ArrowLeft size={13} />
                    Ver todos los proyectos
                  </Link>
                </div>

              </div>
            </div>
          </div>
        </section>


      </main>
      <Footer />
    </>
  );
}
