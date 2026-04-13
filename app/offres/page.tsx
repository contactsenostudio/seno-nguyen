import type { Metadata } from "next";
import OffresPage from "@/components/OffresPage";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Offres — Seno Nguyen Photographe Mariage",
  description:
    "Reportage photo, film cinématique, Magazine Box, album QR code, shooting engagement, drone — toutes les prestations de Seno Nguyen pour votre mariage.",
};

export default function Offres() {
  return (
    <>
      <CustomCursor />
      <OffresPage />
    </>
  );
}
