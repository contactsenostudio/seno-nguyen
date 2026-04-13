import type { Metadata } from "next";
import ServicesPage from "@/components/ServicesPage";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Nos Prestations — Seno Nguyen Photographe Mariage",
  description:
    "Découvrez toutes nos prestations : reportage photo, film cinématique, Magazine Box, album QR code, shooting engagement et drone. Une seule équipe pour une expérience complète.",
};

export default function Prestations() {
  return (
    <>
      <CustomCursor />
      <ServicesPage />
    </>
  );
}
