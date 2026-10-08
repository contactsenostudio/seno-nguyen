import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import WhoAmI from "@/components/WhoAmI";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "À propos — Seno Nguyen · Photographe Bordeaux",
  description: "Seno Nguyen, photographe et vidéaste indépendant à Bordeaux : parcours, chiffres clés et témoignages de clients.",
};

export default function AProposPage() {
  return (
    <>
      <Cursor />
      <TopBar />
      <main>
        <WhoAmI />
        <Stats />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
