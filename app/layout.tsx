import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
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
    <html lang="es" className={`${dmSans.variable} h-full`}>
      <body className="min-h-full bg-bg-base text-text-primary antialiased">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
