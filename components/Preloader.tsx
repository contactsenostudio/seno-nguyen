"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const preRef  = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const pre  = preRef.current;
    const name = nameRef.current;
    const bar  = barRef.current;
    if (!pre || !name || !bar) return;

    gsap.set(name, { y: 50, opacity: 0 });

    const tl = gsap.timeline();
    tl.to(name, { y: 0, opacity: 1, duration: 1, ease: "power3.out" }, 0.2);

    let cur = 0;
    const iv = setInterval(() => {
      cur += Math.floor(Math.random() * 15) + 5;
      if (cur >= 100) { cur = 100; clearInterval(iv); }
      setCount(cur);
      gsap.to(bar, { width: `${cur}%`, duration: 0.3, ease: "power2.out" });
    }, 80);

    const exit = setTimeout(() => {
      clearInterval(iv);
      setCount(100);
      gsap.timeline({ onComplete: () => { document.body.classList.remove("is-loading"); if (pre) pre.style.display = "none"; } })
        .to(name, { y: -30, opacity: 0, duration: 0.5, ease: "power2.in" })
        .to(pre,  { clipPath: "inset(0 0 100% 0)", duration: 0.9, ease: "power4.inOut" }, "-=0.2");
    }, 2400);

    return () => { clearInterval(iv); clearTimeout(exit); };
  }, []);

  return (
    <div ref={preRef} id="preloader" style={{ clipPath: "inset(0 0 0% 0)" }}>
      <div ref={nameRef} className="text-center">
        <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: "var(--or)", opacity: 0.7 }}>
          Bordeaux · France
        </p>
        <h1
          className="font-display font-light italic"
          style={{ fontSize: "clamp(3rem, 8vw, 6rem)", color: "var(--blanc)" }}
        >
          Seno <span style={{ color: "var(--or)" }}>Nguyen</span>
        </h1>
        <div className="mt-8 w-48 mx-auto h-px relative" style={{ background: "rgba(248,245,239,0.08)" }}>
          <div
            ref={barRef}
            className="absolute top-0 left-0 h-full"
            style={{ width: "0%", background: "var(--or)" }}
          />
        </div>
        <p className="mt-3 text-xs font-mono" style={{ color: "rgba(248,245,239,0.25)", letterSpacing: "0.2em" }}>
          {String(count).padStart(3, "0")}
        </p>
      </div>
    </div>
  );
}
