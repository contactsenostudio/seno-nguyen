"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FormData {
  nom: string;
  email: string;
  telephone: string;
  dateMariage: string;
  lieu: string;
  formule: string;
  budget: string;
  message: string;
}

export default function Booking() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    nom: "",
    email: "",
    telephone: "",
    dateMariage: "",
    lieu: "",
    formule: "",
    budget: "",
    message: "",
  });

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const form = formRef.current;
    const info = infoRef.current;

    if (!section || !header) return;

    const sts: ScrollTrigger[] = [];

    gsap.set(header, { y: 30, opacity: 0 });

    if (form) {
      const groups = form.querySelectorAll(".form-group");
      gsap.set(groups, { y: 30, opacity: 0 });
      const submitBtn = form.querySelector(".submit-btn");
      if (submitBtn) gsap.set(submitBtn, { y: 20, opacity: 0 });

      const st1 = ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onEnter: () => {
          gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
          gsap.to(groups, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08,
            delay: 0.2,
          });
          if (submitBtn) {
            gsap.to(submitBtn, { y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: 0.8 });
          }
        },
      });
      sts.push(st1);
    }

    if (info) gsap.set(info, { y: 30, opacity: 0 });

    const st2 = ScrollTrigger.create({
      trigger: section,
      start: "top 75%",
      onEnter: () => {
        gsap.to(header, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        if (info) {
          gsap.to(info, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.4 });
        }
      },
    });
    sts.push(st2);

    return () => { sts.forEach((t) => t.kill()); };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      ref={sectionRef}
      id="booking"
      className="py-24 md:py-32 bg-charcoal"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <p className="text-xs tracking-[0.3em] uppercase text-gold/60 mb-6">
            08 — Parlons de votre projet
          </p>
          <h2
            className="font-display italic font-light leading-[0.95] mb-4"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5.5rem)" }}
          >
            <span className="block text-cream">Réservez votre</span>
            <span className="block text-gold">appel gratuit.</span>
          </h2>
          <p className="text-sm text-cream/45 max-w-md">
            30 minutes pour tout vous expliquer et répondre à vos questions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12 lg:gap-20">
          {/* Form */}
          <div>
            {submitted ? (
              <div className="flex flex-col items-start gap-6 py-12">
                <div className="w-16 h-px bg-gold" />
                <h3 className="font-display italic text-3xl md:text-4xl text-cream">
                  Merci pour votre message.
                </h3>
                <p className="text-cream/50 text-sm max-w-md leading-relaxed">
                  Nous avons bien reçu votre demande et vous répondrons sous 24 heures
                  pour organiser votre appel gratuit. À très bientôt !
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs tracking-[0.2em] uppercase text-gold/60 hover:text-gold border-b border-gold/30 pb-0.5 transition-colors duration-300"
                >
                  Envoyer une autre demande
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-8">
                {/* Row 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="form-group">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                      Prénom & Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      required
                      placeholder="Emma & Lucas Martin"
                      value={formData.nom}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="form-group">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      placeholder="+33 6 00 00 00 00"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                      Date du mariage
                    </label>
                    <input
                      type="date"
                      name="dateMariage"
                      value={formData.dateMariage}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>

                {/* Row 3 */}
                <div className="form-group">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                    Lieu du mariage
                  </label>
                  <input
                    type="text"
                    name="lieu"
                    placeholder="Château de Provence, Aix-en-Provence..."
                    value={formData.lieu}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                {/* Row 4 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="form-group">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                      Formule souhaitée
                    </label>
                    <select
                      name="formule"
                      value={formData.formule}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Choisir une formule</option>
                      <option value="essentiel">Essentiel</option>
                      <option value="experience">Expérience</option>
                      <option value="premium">Premium</option>
                      <option value="indecis">Je ne sais pas encore</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                      Budget approximatif
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-input"
                    >
                      <option value="">Sélectionner</option>
                      <option value="moins-1500">Moins de 1 500€</option>
                      <option value="1500-2500">1 500 – 2 500€</option>
                      <option value="2500-4000">2 500 – 4 000€</option>
                      <option value="plus-4000">Plus de 4 000€</option>
                      <option value="discuter">À discuter</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="form-group">
                  <label className="block text-[10px] tracking-[0.25em] uppercase text-cream/35 mb-2">
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Parlez-nous de votre mariage, de vos envies, de votre vision..."
                    value={formData.message}
                    onChange={handleChange}
                    className="form-input resize-none"
                  />
                </div>

                {/* Submit */}
                <div className="submit-btn">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 px-10 py-4 bg-gold text-charcoal text-xs tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors duration-300"
                  >
                    Réserver mon appel
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Info */}
          <div ref={infoRef} className="flex flex-col gap-8">
            {/* Badges */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-4 border border-cream/8">
                <span className="text-gold text-lg">✓</span>
                <div>
                  <p className="text-sm text-cream font-medium">Réponse sous 24h</p>
                  <p className="text-xs text-cream/35 mt-0.5">Nous répondons rapidement à chaque demande</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 border border-cream/8">
                <span className="text-gold text-lg">✓</span>
                <div>
                  <p className="text-sm text-cream font-medium">Appel gratuit sans engagement</p>
                  <p className="text-xs text-cream/35 mt-0.5">30 minutes pour découvrir nos services</p>
                </div>
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5 pt-4 border-t border-cream/8">
              <a
                href="mailto:contact@senonguyen.fr"
                className="flex items-center gap-3 text-sm text-cream/50 hover:text-gold transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50 group-hover:text-gold transition-colors duration-300">
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                contact@senonguyen.fr
              </a>
              <a
                href="tel:+33600000000"
                className="flex items-center gap-3 text-sm text-cream/50 hover:text-gold transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50 group-hover:text-gold transition-colors duration-300">
                  <path d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
                +33 6 00 00 00 00
              </a>
              <a
                href="https://www.instagram.com/senonguyen"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-cream/50 hover:text-gold transition-colors duration-300 group"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50 group-hover:text-gold transition-colors duration-300">
                  <path d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                </svg>
                @senonguyen
              </a>
              <div className="flex items-center gap-3 text-sm text-cream/50">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 text-gold/50">
                  <path d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
                France entière
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
