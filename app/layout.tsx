import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";
import { siteConfig, instagramUrl } from "@/lib/config";

const BASE_URL = siteConfig.siteUrl;

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-merriweather",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ACTuCasa — Construcción Modular en Steel Framing | Buenos Aires",
    template: "%s | ACTuCasa",
  },
  description:
    "Construcción modular en steel framing: módulos habitacionales, oficinas anexas y ampliaciones. Fabricados en taller, instalados en tu terreno. Buenos Aires y GBA.",
  keywords: [
    "steel framing",
    "construcción en seco",
    "módulos habitacionales",
    "oficinas modulares",
    "construcción modular",
    "ACTuCasa",
    "steel frame Buenos Aires",
    "construcción Buenos Aires",
    "ampliaciones steel framing",
  ],
  authors: [{ name: "ACTuCasa", url: BASE_URL }],
  creator: "ACTuCasa",
  publisher: "ACTuCasa",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: BASE_URL,
    siteName: "ACTuCasa",
    title: "ACTuCasa — Construcción Modular en Steel Framing",
    description:
      "Módulos habitacionales, oficinas y ampliaciones en steel framing. Fabricados en taller, instalados en tu terreno. Buenos Aires y GBA.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "ACTuCasa — Construcción modular en steel framing, Buenos Aires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ACTuCasa — Construcción Modular en Steel Framing",
    description:
      "Módulos habitacionales, oficinas y ampliaciones en steel framing. Buenos Aires y GBA.",
    images: ["/opengraph-image"],
    creator: "@actucasa",
  },
  verification: {
    google: siteConfig.googleVerification,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "ACTuCasa",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.webp`,
        width: 120,
        height: 120,
      },
      sameAs: [instagramUrl],
    },
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#localbusiness`,
      name: "ACTuCasa",
      description:
        "Construcción modular en steel framing: módulos habitacionales, oficinas anexas y ampliaciones. Fabricados en taller e instalados en tu terreno.",
      url: BASE_URL,
      image: `${BASE_URL}/og-image.jpg`,
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Buenos Aires",
        addressRegion: "Buenos Aires",
        addressCountry: "AR",
      },
      areaServed: [
        {
          "@type": "AdministrativeArea",
          name: "Buenos Aires",
        },
        {
          "@type": "AdministrativeArea",
          name: "Gran Buenos Aires",
        },
      ],
      knowsAbout: [
        "Steel Framing",
        "Construcción en seco",
        "Módulos habitacionales",
        "Oficinas modulares",
        "Construcción industrializada",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de construcción modular",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Módulos habitacionales",
              description:
                "Módulos diseñados para vivir, con terminaciones interiores y exteriores, instalaciones certificadas y aislación termoacústica.",
            },
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Oficinas modulares",
              description:
                "Espacios de trabajo profesionales fabricados en taller e instalados sin obra húmeda. Relocalizables y listos para operar.",
            },
          },
        ],
      },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "ACTuCasa",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "es-AR",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} ${merriweather.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-base text-text-primary antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
