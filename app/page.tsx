import Nav from "@/components/Nav";
import HeroCanvas from "@/components/HeroCanvas";
import HomeSplit from "@/components/HomeSplit";
import MagazineBox from "@/components/MagazineBox";
import SocialProof from "@/components/SocialProof";
import Process from "@/components/Process";
import BookingCTA from "@/components/BookingCTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <HeroCanvas />
      <HomeSplit />
      <MagazineBox />
      <SocialProof />
      <Process />
      <BookingCTA />
      <Contact />
      <Footer />
    </>
  );
}
