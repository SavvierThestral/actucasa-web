import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { WhatModules } from "@/components/what-modules";
import { WhySteelFrame } from "@/components/why-steel";
import { Services } from "@/components/services";
import { Gallery } from "@/components/gallery";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <WhatModules />
        <WhySteelFrame />
        <Services />
        <Gallery />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
