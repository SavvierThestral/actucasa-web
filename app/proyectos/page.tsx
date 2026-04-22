import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { ProjectsClient } from "@/components/projects-client";

export const metadata: Metadata = {
  title: "Proyectos — ACTuCasa Steel Framing",
  description:
    "Obras realizadas por ACTuCasa: módulos habitacionales, oficinas anexas y estructuras de hierro en steel framing.",
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
