// Valores centralizados del sitio.
// Editá las variables en .env.local (desarrollo) o en el panel de Vercel (producción).
// Nunca hardcodeés datos de contacto o URLs sensibles directamente en los componentes.

export const siteConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://actucasa.com.ar",

  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5492932578585",
  whatsappMessage:
    process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE ||
    "Hola! Vi su web y quiero consultar sobre un proyecto",

  instagramHandle: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "ac.tucasa",

  email: process.env.NEXT_PUBLIC_EMAIL || "ac-tucasa@hotmail.com",
  phone: process.env.NEXT_PUBLIC_PHONE || "+54 9 2932 578585",
  address: process.env.NEXT_PUBLIC_ADDRESS || "Villa Gral. Arias, Pcia. de Buenos Aires",
  mapsUrl: process.env.NEXT_PUBLIC_MAPS_URL || "https://maps.app.goo.gl/a6LTnqtQ4ZhWQvuy7",
  mapsEmbed: process.env.NEXT_PUBLIC_MAPS_EMBED ||
    "https://maps.google.com/maps?q=6V6P%2BVR+AC+TuCasa,+Villa+Gral.+Arias,+Provincia+de+Buenos+Aires&z=16&output=embed",

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
