// Valores centralizados del sitio.
// Editá las variables en .env.local (desarrollo) o en el panel de Vercel (producción).
// Nunca hardcodeés datos de contacto o URLs sensibles directamente en los componentes.

export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://actucasa.com.ar",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Hola! Vi su web y quiero consultar sobre un proyecto",

  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "ac.tucasa",

  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? undefined,
} as const;

// URLs derivadas — no las toques, se generan solas
export const whatsappUrl = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`
  : "#contacto";

export const whatsappUrlPlain = siteConfig.whatsappNumber
  ? `https://wa.me/${siteConfig.whatsappNumber}`
  : "#contacto";

export const instagramUrl = `https://instagram.com/${siteConfig.instagramHandle}`;
