import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Excluir fotos de proyectos del bundle serverless — Vercel las sirve como CDN estático
  outputFileTracingExcludes: {
    "**": ["./public/proyectos/**/*"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
