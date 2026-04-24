import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PrestationsContent from "@/components/PrestationsContent";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Particulier — Magazine Box & Shooting Bordeaux Gironde",
  description: "Magazine Box photobooth premium, shooting portrait, événements, EVJF, anniversaires à Bordeaux et Gironde. Impressions magazine personnalisées, galerie digitale.",
};

export default function PrestationsPage() {
  return (
    <>
      <Nav />
      <PrestationsContent />
      <Contact />
      <Footer />
    </>
  );
}
