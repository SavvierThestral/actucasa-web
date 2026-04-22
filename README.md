# ACTuCasa — Sitio web premium

Sitio web de la empresa **ACTuCasa**, especializada en construcción en seco con steel framing, módulos habitacionales, oficinas anexas y estructuras de hierro.

## Stack

- **Next.js 16** con App Router
- **Tailwind CSS v4** (config CSS-first con `@theme`)
- **Framer Motion 12** — animaciones, parallax, scroll-reveal, lightbox
- **Lenis** — smooth scroll
- **Phosphor Icons** — iconografía
- **Donovan Display** (local) + **DM Sans** (Google Fonts) — tipografía

## Instalación y uso local

```bash
# 1. Instalar dependencias
npm install

# 2. Servidor de desarrollo
npm run dev
# → http://localhost:3000

# 3. Build de producción
npm run build
npm run start
```

## Estructura de componentes

```
components/
├── providers/smooth-scroll.tsx   # Lenis smooth scroll wrapper
├── ui/
│   ├── scroll-progress.tsx       # Barra de progreso de scroll
│   ├── magnetic-button.tsx       # Botón con efecto magnético
│   └── reveal-text.tsx           # Animación de revelado de texto por palabras
├── nav.tsx                       # Navbar fija con blur on scroll + menú mobile
├── hero.tsx                      # Hero asimétrico con parallax
├── about.tsx                     # Sección nosotros con stats
├── services.tsx                  # Servicios en zig-zag + card full-width
├── gallery.tsx                   # Galería masonry con lightbox
├── contact.tsx                   # Formulario + WhatsApp + Instagram
└── footer.tsx                    # Footer completo
```

## Personalización rápida

### Número de WhatsApp
Buscar y reemplazar `5491100000000` con el número real de la empresa (formato internacional sin `+`).

### Imágenes de galería
Cada imagen en `components/gallery.tsx` tiene un comentario con la URL original de Unsplash. Para reemplazarlas con fotos propias, cambiar las rutas `src` y `srcFull`.

### Imágenes de servicios y hero
Misma lógica en `components/hero.tsx`, `components/about.tsx`, y `components/services.tsx`.

## Deploy en Vercel

```bash
# Instalar CLI de Vercel
npm i -g vercel

# Deploy
vercel

# Deploy a producción
vercel --prod
```

El archivo `next.config.ts` ya tiene configurado el `remotePatterns` para imágenes de Unsplash.

## Fuentes locales

Los archivos `.ttf` de **Donovan Display** están en `public/fonts/` y se cargan vía `@font-face` en `app/globals.css`.
