import Nav from "@/components/Nav";
import PortfolioContent from "@/components/PortfolioContent";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export const metadata = {
  title: "Portfolio — Seno Nguyen · Photographe Bordeaux",
  description: "Galerie de photos — Mariage, Portrait, Corporate. Photographe indépendant basé à Bordeaux.",
};

export default function PortfolioPage() {
  return (
    <>
      <Cursor />
      <Nav />
      <main style={{ paddingTop: 0 }}>
        <PortfolioContent />
      </main>
      <Footer />
    </>
  );
}
