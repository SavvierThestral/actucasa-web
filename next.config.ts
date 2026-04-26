import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Excluir fotos de proyectos del bundle serverless — Vercel las sirve como CDN estático
  outputFileTracingExcludes: {
    "**": ["./public/proyectos/**/*"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
