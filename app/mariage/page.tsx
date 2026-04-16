import type { Metadata } from "next";
import Nav from "@/components/Nav";
import MariageContent from "@/components/MariageContent";
import Process from "@/components/Process";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Photographe & Vidéaste Mariage Bordeaux Gironde — Photo + Film + Magazine Box",
  description: "Seul prestataire en Gironde à proposer photo + film cinématique 4K + Magazine Box avec un seul artiste. Reportage mariage Bordeaux, Gironde et France entière.",
};

export default function MariagePage() {
  return (
    <>
      <Nav />
      <MariageContent />
      <Process />
      <SocialProof />
      <Contact />
      <Footer />
    </>
  );
}
