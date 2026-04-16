import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import QuickChoice from "@/components/QuickChoice";
import MagazineBox from "@/components/MagazineBox";
import SocialProof from "@/components/SocialProof";
import Process from "@/components/Process";
import BookingCTA from "@/components/BookingCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <QuickChoice />
      <MagazineBox />
      <SocialProof />
      <Process />
      <BookingCTA />
      <Contact />
      <Footer />
    </>
  );
}
