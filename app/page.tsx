import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import LoadingScreen from "@/components/LoadingScreen";
import PhotoStrips from "@/components/PhotoStrips";
import ScrollPhrase from "@/components/ScrollPhrase";
import WhoAmI from "@/components/WhoAmI";
import Stats from "@/components/Stats";
import WorkSection from "@/components/WorkSection";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Cursor />
      <Nav />
      <Hero />
      <PhotoStrips />
      <ScrollPhrase />
      <WhoAmI />
      <Stats />
      <WorkSection />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
