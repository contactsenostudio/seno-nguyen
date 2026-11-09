import type { Metadata } from "next";
import Landing from "@/components/Landing";
import Cursor from "@/components/Cursor";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <>
      <Cursor />
      <Landing />
    </>
  );
}
