"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

/* Barres orange : au premier chargement, puis à chaque changement de page.
   Au clic sur un lien interne, on lance les barres, on navigue quand l'écran est couvert,
   et la nouvelle page apparaît pendant qu'elles sortent. */

const BARS = [
  { flex: 2, delay: 0   },
  { flex: 1, delay: 55  },
  { flex: 3, delay: 110 },
  { flex: 1, delay: 165 },
  { flex: 2, delay: 220 },
];
const NAVIGATE_AT = 420;   // ms : écran entièrement couvert
const TOTAL       = 920;   // ms : fin du balayage

export default function PageTransition() {
  const router   = useRouter();
  const pathname = usePathname();
  const [run, setRun] = useState(1);              // > 0 = animation en cours (1 dès le premier rendu)
  const navigating = useRef(false);
  const lastPath   = useRef(pathname);
  const timer      = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback(() => {
    setRun(r => r + 1);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setRun(0), TOTAL);
  }, []);

  /* Fin de l'animation du premier chargement */
  useEffect(() => {
    timer.current = setTimeout(() => setRun(0), TOTAL);
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, []);

  /* Changement de page non déclenché par un clic (bouton précédent, etc.) */
  useEffect(() => {
    if (pathname === lastPath.current) return;
    lastPath.current = pathname;
    if (navigating.current) { navigating.current = false; return; }
    const id = setTimeout(play, 0);
    return () => clearTimeout(id);
  }, [pathname, play]);

  /* Clics sur les liens internes */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (!/^(http|https):$/.test(url.protocol)) return;
      const dest = url.pathname + url.search;
      if (url.pathname === location.pathname && url.hash) return;      // ancre dans la page
      if (dest === location.pathname + location.search) { e.preventDefault(); return; }
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      e.preventDefault();
      navigating.current = true;
      play();
      setTimeout(() => router.push(dest), NAVIGATE_AT);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router, play]);

  if (!run) return null;

  return (
    <div key={run} className="pt" aria-hidden style={{
      position: "fixed", inset: 0, zIndex: 9990, pointerEvents: "none", overflow: "hidden",
      display: "flex", flexDirection: "column", gap: 7,
    }}>
      {BARS.map((bar, i) => (
        <div key={i} style={{ flex: bar.flex, position: "relative" }}>
          <div style={{
            position: "absolute", top: 0, bottom: 0, left: "-20%", width: "140%",
            background: "linear-gradient(to right, #5c1505, #b03010 12%, #e05a2b 35%, #ff7040 52%, #ffac7a 62%, #e05a2b 78%, #881e08 92%, #5c1505)",
            animation: `ptBar 0.60s cubic-bezier(0.77,0,0.175,1) ${bar.delay}ms both`,
          }} />
        </div>
      ))}
      <style>{`
        @keyframes ptBar {
          0%   { transform: skewX(-18deg) translateX(-92%); }
          44%  { transform: skewX(-18deg) translateX(0%);   }
          100% { transform: skewX(-18deg) translateX(92%);  }
        }
        @media (prefers-reduced-motion: reduce) { .pt { display: none !important; } }
      `}</style>
    </div>
  );
}
