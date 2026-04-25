// ─────────────────────────────────────────────────────────────
//  PROYECTOS — Editá este archivo para agregar tus obras.
//
//  Para cada proyecto completá:
//    title       → nombre del proyecto
//    category    → "modulo" | "oficina" | "remodelacion" | "wood-frame" | "tradicional"
//    location    → barrio / ciudad
//    year        → año de entrega
//    area        → superficie en m² (opcional, "" para omitir)
//    description → descripción corta visible en la card
//    image       → URL de la foto (Unsplash, hosting propio, etc.)
//    tags        → etiquetas que aparecen debajo de la card
// ─────────────────────────────────────────────────────────────

export type ProjectCategory = "modulo" | "oficina" | "remodelacion" | "wood-frame" | "tradicional";

export type Project = {
  id: number;
  title: string;
  category: ProjectCategory;
  location: string;
  year: string;
  area: string;
  description: string;
  image: string;
  tags: string[];
};

export const categoryLabels: Record<ProjectCategory, string> = {
  modulo: "Módulo habitacional",
  oficina: "Oficina modular",
  remodelacion: "Remodelación",
  "wood-frame": "Wood Frame",
  tradicional: "Construcción tradicional",
};

// ─── AGREGA TUS PROYECTOS AQUÍ ───────────────────────────────
export const projects: Project[] = [
  {
    id: 1,
    title: "Casa unifamiliar Palermo",
    category: "modulo",
    location: "Palermo, CABA",
    year: "2024",
    area: "85m²",
    description:
      "Módulo habitacional completo en steel frame. Dos dormitorios, living-comedor y baño. Obra terminada en 90 días.",
    // https://unsplash.com/photos/1570129477492-45c003edd2be
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80",
    tags: ["Steel Frame", "85m²", "90 días"],
  },
  {
    id: 2,
    title: "Oficina home-office Belgrano",
    category: "oficina",
    location: "Belgrano, CABA",
    year: "2024",
    area: "24m²",
    description:
      "Anexo de oficina en jardín trasero. Aislación acústica premium, instalación eléctrica trifásica y ventilación.",
    // https://unsplash.com/photos/1497366216548-37526070297c
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    tags: ["Oficina", "24m²", "Aislación acústica"],
  },
  {
    id: 3,
    title: "Galpón industrial San Martín",
    category: "tradicional",
    location: "San Martín, GBA",
    year: "2023",
    area: "320m²",
    description:
      "Estructura de alta resistencia para uso industrial. Cubierta con chapa termopanel y portón seccional.",
    // https://unsplash.com/photos/1587300003388-59208cc962cb
    image:
      "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
    tags: ["Tradicional", "320m²", "Industrial"],
  },
  {
    id: 4,
    title: "Dúplex Caballito",
    category: "modulo",
    location: "Caballito, CABA",
    year: "2023",
    area: "120m²",
    description:
      "Dúplex en planta alta sobre vivienda existente. Estructura en steel frame, terminaciones de primera calidad.",
    // https://unsplash.com/photos/1486325212027-8081e485255e
    image:
      "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    tags: ["Steel Frame", "Dúplex", "120m²"],
  },
  {
    id: 5,
    title: "Estudio profesional Martínez",
    category: "oficina",
    location: "Martínez, GBA Norte",
    year: "2023",
    area: "36m²",
    description:
      "Estudio profesional con sala de reuniones. Piso de porcelanato, cielorraso americano y aire central.",
    // https://unsplash.com/photos/1524758631624-e2822e304c36
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=80",
    tags: ["Oficina", "36m²", "Reuniones"],
  },
  {
    id: 6,
    title: "Casa Remodelada La Matanza",
    category: "remodelacion",
    location: "La Matanza, GBA Oeste",
    year: "2022",
    area: "580m²",
    description:
      "Remodelación integral de vivienda existente. Renovación completa de interiores, fachada y distribución de ambientes.",
    // https://unsplash.com/photos/1460472178825-e5240623afd5
    image:
      "https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&q=80",
    tags: ["Remodelación", "580m²", "Integral"],
  },
];
