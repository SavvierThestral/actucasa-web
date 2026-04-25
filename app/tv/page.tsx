import type { Metadata } from "next";
import { TvSlideshow } from "./tv-slideshow";

export const metadata: Metadata = {
  title: "ACTuCasa Display",
  robots: { index: false, follow: false },
};

export default function TvPage() {
  return <TvSlideshow />;
}
