interface LogoSVGProps {
  dark?: boolean;
  height?: number;
}

/*
  Reproduction pixel-fidèle du logo Gemini :
  - Icône : 50.5 × 100 (ratio 0.505:1)
    • Coin haut-gauche coupé en diagonale : de (23.7, 0) à (0, 44.7)
    • Trou rectangulaire intérieur haut-centre : (27.1, 6.3) → (46.6, 50.6)
    • Orange visible DERRIÈRE via even-odd fill
  - Texte : "Seno" / "studio" empilés, Nunito 900, même taille que l'icône
*/
export default function LogoSVG({ dark = true, height = 52 }: LogoSVGProps) {
  const ink    = dark ? "#0a0a0a" : "#ffffff";
  const orange = "#e05a2b";
  const iconH  = height;
  const iconW  = iconH * 0.505;
  const fs     = iconH * 0.47; // font-size par ligne (~92% total height sur 2 lignes)

  return (
    <div style={{ display: "flex", alignItems: "center", gap: iconH * 0.1, lineHeight: 1 }}>

      {/* ── Icône SVG ── */}
      <svg
        width={iconW}
        height={iconH}
        viewBox="0 0 50.5 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        {/* Orange derrière, visible via le trou */}
        <rect x="27.1" y="6.3" width="19.5" height="44.3" fill={orange} />

        {/*
          Even-odd :
          - Outer : pentagone (coin haut-gauche coupé)
          - Inner : rectangle trou (chemin inversé pour créer le trou)
        */}
        <path
          fillRule="evenodd"
          d={[
            "M 23.7,0 L 50.5,0 L 50.5,100 L 0,100 L 0,44.7 Z",
            "M 27.1,6.3 L 46.6,6.3 L 46.6,50.6 L 27.1,50.6 Z",
          ].join(" ")}
          fill={ink}
        />
      </svg>

      {/* ── Texte ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        <span style={{
          fontFamily: "var(--font-nunito, var(--sans))",
          fontWeight: 900,
          fontSize: fs,
          color: ink,
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
          display: "block",
        }}>Seno</span>
        <span style={{
          fontFamily: "var(--font-nunito, var(--sans))",
          fontWeight: 900,
          fontSize: fs,
          color: ink,
          letterSpacing: "-0.02em",
          lineHeight: 0.9,
          display: "block",
        }}>studio</span>
      </div>
    </div>
  );
}
