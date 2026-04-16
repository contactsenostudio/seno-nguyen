import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact — Seno Studio",
  description: "Contactez Seno Studio pour votre mariage, projet corporate ou prestation à Bordeaux. Réponse sous 24h.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <Contact />
      <Footer />
    </>
  );
}
