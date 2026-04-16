import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PrestationsContent from "@/components/PrestationsContent";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Prestations — Magazine Box, Événements & Plus",
  description: "Magazine Box photobooth premium, événements, EVJF, anniversaires, portrait & branding à Bordeaux. Toutes les prestations Seno Studio.",
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
