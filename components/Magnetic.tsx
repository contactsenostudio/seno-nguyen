"use client";
import { useEffect } from "react";

/* Rend tous les .magnetic physiquement attirés par le curseur */
export default function Magnetic() {
  useEffect(() => {
    const RADIUS   = 120;   // px — zone d'attraction
    const PULL     = 0.42;  // intensité du déplacement max
    const LERP_IN  = 0.16;  // vitesse d'attraction
    const LERP_OUT = 0.09;  // vitesse de retour (plus lent = plus élastique)

    type Item = {
      el:   HTMLElement;
      tx:   number; ty:   number;  // cible
      cx:   number; cy:   number;  // position courante (spring)
    };

    const items: Item[] = [];
    let mx = -9999, my = -9999;
    let raf: number;

    const collect = () => {
      items.length = 0;
      document.querySelectorAll<HTMLElement>(".magnetic").forEach(el => {
        items.push({ el, tx: 0, ty: 0, cx: 0, cy: 0 });
      });
    };

    collect();
    const mo = new MutationObserver(collect);
    mo.observe(document.body, { childList: true, subtree: true });

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener("mousemove", onMove);

    const loop = () => {
      for (const item of items) {
        const r = item.el.getBoundingClientRect();
        const ecx = r.left + r.width  / 2;
        const ecy = r.top  + r.height / 2;
        const dx  = mx - ecx;
        const dy  = my - ecy;
        const d   = Math.sqrt(dx * dx + dy * dy);

        if (d < RADIUS) {
          const t = (1 - d / RADIUS);
          item.tx = dx * t * PULL * (r.width  / 100 + 1);
          item.ty = dy * t * PULL * (r.height / 100 + 1);
        } else {
          item.tx = 0;
          item.ty = 0;
        }

        const lerp = (item.tx === 0 && item.ty === 0) ? LERP_OUT : LERP_IN;
        item.cx += (item.tx - item.cx) * lerp;
        item.cy += (item.ty - item.cy) * lerp;

        const snap = Math.abs(item.cx) < 0.08 && Math.abs(item.cy) < 0.08;
        item.el.style.transform = snap ? "" : `translate(${item.cx.toFixed(2)}px, ${item.cy.toFixed(2)}px)`;
      }

      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      mo.disconnect();
      items.forEach(i => { i.el.style.transform = ""; });
    };
  }, []);

  return null;
}
