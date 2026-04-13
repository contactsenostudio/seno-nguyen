"use client";

import { useEffect, useRef, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<unknown>(null);

  useEffect(() => {
    let lenis: {
      raf: (time: number) => void;
      destroy: () => void;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      on: (event: any, cb: any) => void;
    } | null = null;

    const initLenis = async () => {
      const LenisModule = await import("lenis");
      const Lenis = LenisModule.default;

      lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // ── Connecter Lenis à GSAP ScrollTrigger ──────────
      // Sans ça, ScrollTrigger ne reçoit pas les événements
      // de scroll de Lenis et les animations ne déclenchent pas.
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add((time) => {
        lenis?.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove((time) => lenis?.raf(time * 1000));
        lenis?.destroy();
      };
    };

    const cleanup = initLenis();

    return () => {
      cleanup.then((fn) => fn?.());
    };
  }, []);

  return <>{children}</>;
}
