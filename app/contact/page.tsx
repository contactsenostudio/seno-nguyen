import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "Contact — Photographe Bordeaux",
  description: "Contactez Seno Studio pour votre mariage, projet corporate ou prestation à Bordeaux. Réponse sous 24h.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Cursor />
      <TopBar />
      <Contact />
      <Footer />
    </>
  );
}
