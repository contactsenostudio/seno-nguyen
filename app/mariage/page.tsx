import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MariageContent from "@/components/MariageContent";
import Process from "@/components/Process";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Photographe & Vidéaste Mariage Bordeaux",
  description: "Reportage photo mariage, film cinématique 4K, shooting engagement, drone, Magazine Box à Bordeaux et Gironde. Disponible partout en France.",
};

export default function MariagePage() {
  return (
    <>
      <Cursor />
      <Nav />
      <MariageContent />
      <Process />
      <SocialProof />
      <Contact />
      <Footer />
    </>
  );
}
