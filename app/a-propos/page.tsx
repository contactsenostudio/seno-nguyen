import type { Metadata } from "next";
import TopBar from "@/components/TopBar";
import APropos from "@/components/APropos";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = {
  title: "À propos — Seno Nguyen, photographe à Bordeaux",
  description: "Seno Nguyen, photographe et vidéaste indépendant à Mérignac et Bordeaux : mariage, portrait, entreprise, immobilier.",
  alternates: { canonical: "/a-propos" },
};

export default function AProposPage() {
  return (
    <>
      <Cursor />
      <TopBar />
      <main>
        <APropos />
      </main>
      <Footer />
    </>
  );
}
