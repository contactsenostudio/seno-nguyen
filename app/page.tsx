"use client";

import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import AudienceSelector from "@/components/AudienceSelector";
import Univers from "@/components/Univers";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import PhotoGallery from "@/components/PhotoGallery";
import SocialProof from "@/components/SocialProof";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <Hero />
      <AudienceSelector />
      <Univers />
      <Services />
      <Process />
      <Pricing />
      <PhotoGallery />
      <SocialProof />
      <Contact />
      <Footer />
    </>
  );
}
