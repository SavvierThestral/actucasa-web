import type { Metadata } from "next";
import { DM_Sans, Playfair_Display, Merriweather } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

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
  title: "ACTuCasa — Steel Framing & Construcción en Seco",
  description:
    "Construcción en steel framing con precisión milimétrica. Módulos habitacionales, oficinas anexas y estructuras de hierro diseñadas para durar. Buenos Aires, Argentina.",
  keywords: "steel framing, construcción en seco, módulos habitacionales, oficinas, estructuras de hierro, ACTuCasa",
  openGraph: {
    title: "ACTuCasa — Steel Framing",
    description: "Construcción en seco con precisión milimétrica.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${dmSans.variable} ${playfair.variable} ${merriweather.variable} h-full`}>
      <body className="min-h-full bg-bg-base text-text-primary antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
