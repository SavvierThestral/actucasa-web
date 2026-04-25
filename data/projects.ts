// ─────────────────────────────────────────────────────────────
//  PROYECTOS — Completá cada entrada con sus datos y fotos.
//
//  Campos:
//    category    → "modulo" | "oficina" | "remodelacion" | "wood-frame" | "tradicional"
//    location    → barrio / ciudad (ej: "Tigre, GBA Norte")
//    year        → año de entrega (ej: "2024")
//    area        → superficie (ej: "85m²") — dejá "" para no mostrar
//    description → texto corto visible en la card (1-2 oraciones)
//    image       → copiá la foto a /public/proyectos/ y ponés "/proyectos/nombre.jpg"
//    tags        → etiquetas debajo de la card
// ─────────────────────────────────────────────────────────────

export type ProjectCategory =
  | "modulo"
  | "oficina"
  | "remodelacion"
  | "wood-frame"
  | "tradicional";

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

export const projects: Project[] = [
  {
    id: 1,
    title: "Proyecto V",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/proyecto-v.jpg",
    tags: [],
  },
  {
    id: 2,
    title: "Roca",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/roca.jpg",
    tags: [],
  },
  {
    id: 3,
    title: "Pinar",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/pinar.jpg",
    tags: [],
  },
  {
    id: 4,
    title: "Sauce",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/sauce.jpg",
    tags: [],
  },
  {
    id: 5,
    title: "Lavanda",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/lavanda.jpg",
    tags: [],
  },
  {
    id: 6,
    title: "Milano",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/milano.jpg",
    tags: [],
  },
  {
    id: 7,
    title: "Rubik",
    category: "modulo",       // ← cambiar según corresponda
    location: "",
    year: "",
    area: "",
    description: "",
    image: "/proyectos/rubik.jpg",
    tags: [],
  },
];
