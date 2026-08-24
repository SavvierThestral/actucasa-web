import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ProjectsClient } from "@/components/projects-client";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ac-tucasa.com";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "Obras realizadas por ACTuCasa en steel framing: módulos habitacionales, oficinas modulares y ampliaciones en Buenos Aires y Gran Buenos Aires.",
  alternates: {
    canonical: `${BASE_URL}/proyectos`,
  },
  openGraph: {
    title: "Proyectos — ACTuCasa Steel Framing",
    description:
      "Obras realizadas en steel framing: módulos habitacionales, oficinas y ampliaciones. Buenos Aires y GBA.",
    url: `${BASE_URL}/proyectos`,
    images: [
      {
        url: "/proyectos/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Proyectos ACTuCasa — obras en steel framing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Proyectos — ACTuCasa Steel Framing",
    description:
      "Obras en steel framing: módulos habitacionales, oficinas y ampliaciones. Buenos Aires y GBA.",
    images: ["/proyectos/opengraph-image"],
  },
};

export default function ProyectosPage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <ProjectsClient />
      </main>
      <Footer />
    </>
  );
}
