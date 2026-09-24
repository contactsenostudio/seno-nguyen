import type { Metadata } from "next";
import Nav from "@/components/Nav";
import EntrepriseContent from "@/components/EntrepriseContent";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Photographe & Vidéaste Corporate Bordeaux",
  description: "Film institutionnel, photo corporate, contenu réseaux sociaux, événements d'entreprise à Bordeaux. Image premium pour votre marque.",
};

export default function EntreprisePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <EntrepriseContent />
      <Contact />
      <Footer />
    </>
  );
}
