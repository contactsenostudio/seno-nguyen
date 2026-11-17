import Link from "next/link";

/* Liens vers les pages de référencement local, en bas de page (09/11/2026, 7 pages ajoutées le 17/11/2026) :
   Google suit ces liens et comprend que ces pages comptent. */
export const PAGES_LOCALES = [
  { href: "/photographe-bordeaux", label: "Photographe Bordeaux" },
  { href: "/shooting-photo-bordeaux", label: "Shooting photo & studio Bordeaux" },
  { href: "/photographe-mariage-bordeaux", label: "Photographe mariage Bordeaux" },
  { href: "/photographe-famille-bordeaux", label: "Photographe famille Bordeaux" },
  { href: "/shooting-photo-couple-bordeaux", label: "Shooting couple Bordeaux" },
  { href: "/shooting-photo-entre-amis-bordeaux", label: "Shooting entre amis Bordeaux" },
  { href: "/photographe-mode-book-bordeaux", label: "Photographe mode & book Bordeaux" },
  { href: "/photographe-portrait-bordeaux", label: "Photographe portrait Bordeaux" },
  { href: "/photographe-produit-packshot-bordeaux", label: "Photographe produit Bordeaux" },
  { href: "/photographe-evenementiel-bordeaux", label: "Photographe événementiel Bordeaux" },
  { href: "/photographe-entreprise-bordeaux", label: "Photographe entreprise Bordeaux" },
  { href: "/photographe-immobilier-bordeaux", label: "Photographe immobilier Bordeaux" },
];

export default function LiensLocaux({ couleur = "rgba(255,255,255,0.55)" }: { couleur?: string }) {
  return (
    <nav aria-label="Prestations à Bordeaux" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "6px 22px", fontFamily: "var(--sans)", fontSize: 12 }}>
      {PAGES_LOCALES.map(p => (
        <Link key={p.href} href={p.href} style={{ color: couleur, textDecoration: "none" }}>{p.label}</Link>
      ))}
    </nav>
  );
}
