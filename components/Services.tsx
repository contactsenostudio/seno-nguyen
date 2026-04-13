"use client";

import { useEffect, useRef, useState } from "react";

type Service = {
  num: string;
  title: string;
  tagline: string;
  desc: string;
  features: string[];
  image: string;
  badge?: string;
  featured?: boolean;
};

const data: Record<string, Service[]> = {
  Mariage: [
    { num: "01", title: "Reportage Photo", tagline: "Immortaliser chaque regard", desc: "Couverture complète de votre journée, des préparatifs aux dernières danses. 300+ photos retouchées livrées en galerie privée.", features: ["Préparatifs → soirée", "300+ photos retouchées", "Galerie privée en ligne", "Droit d'impression inclus", "Livraison sous 4 semaines"], image: "/images/wedding-bride.jpg" },
    { num: "02", title: "Film Cinématique", tagline: "Vivre le moment à jamais", desc: "Un court-métrage de votre mariage en 4K. Chaque plan pensé, chaque coupe rythmée. Un film de 3-5 min que vous reverrez des années.", features: ["Film 3-5 minutes en 4K", "Teaser 60s réseaux sociaux", "Captation vœux & discours", "Bande-son licenciée", "Livraison sous 6 semaines"], image: "/images/wedding-ceremony.jpg", featured: true },
    { num: "03", title: "Magazine Box", tagline: "L'animation de vos invités", desc: "Un photobooth premium avec impressions magazine personnalisées. L'animation qui marque les esprits et donne un souvenir physique unique.", features: ["Cabine premium sur place", "Impressions format magazine", "Personnalisation mariage", "Animateur inclus", "Galerie numérique"], image: "/images/wedding-laugh.jpg" },
    { num: "04", title: "Album QR Code", tagline: "Le souvenir digital", desc: "Vos invités scannent un QR code et accèdent instantanément à leur galerie privée. Accessible à vie, aucune app requise.", features: ["QR code personnalisé", "Galerie en ligne à vie", "Haute résolution", "Partage illimité", "Mise en ligne sous 48h"], image: "/images/wedding-dance.jpg" },
    { num: "05", title: "Shooting Engagement", tagline: "Avant le grand jour", desc: "Une séance photo en amoureux avant le mariage. On apprend à se connaître, vous êtes à l'aise le Jour J.", features: ["1h30 à 2h en extérieur", "Lieu de votre choix", "50+ photos retouchées", "Livraison sous 3 semaines", "Idéal pour faire-parts"], image: "/images/wedding-couple.jpg" },
    { num: "06", title: "Drone Cinématique", tagline: "Vu du ciel", desc: "Des plans aériens 4K qui donnent une dimension épique à votre film. Le domaine et vos invités vus du ciel.", features: ["Pilote certifié DGAC", "4K aérien", "Plans lieu & cérémonie", "Intégration au film", "Autorisation de vol gérée"], image: "/images/wedding-venue.jpg" },
  ],
  Entreprise: [
    { num: "01", title: "Photo Corporate", tagline: "L'image qui inspire", desc: "Portraits de dirigeants, photos d'équipe et reportage de vos locaux. Une identité visuelle professionnelle et cohérente.", features: ["Portraits dirigeants", "Photos d'équipe", "Reportage locaux", "Livraison sous 2 semaines", "Droits commerciaux inclus"], image: "/images/photographer.jpg" },
    { num: "02", title: "Film Institutionnel", tagline: "Racontez votre histoire", desc: "Un film qui capture l'âme de votre entreprise, ses valeurs et ses équipes. L'outil de communication le plus puissant.", features: ["Film 2-5 minutes", "Script & storyboard", "Tournage professionnel", "Motion design", "Livraison sous 4 semaines"], image: "/images/hero-4k-1.jpg", badge: "Populaire", featured: true },
    { num: "03", title: "Soirée d'Entreprise", tagline: "L'événement mémorable", desc: "Reportage photo et vidéo de vos événements corporate. Des souvenirs professionnels que vous partagerez avec fierté.", features: ["Couverture complète", "Photos & vidéo", "Livraison rapide", "Format réseaux sociaux", "Galerie privée en ligne"], image: "/images/hero-4k-2.jpg" },
    { num: "04", title: "Contenu Social Media", tagline: "Votre présence en ligne", desc: "Création de contenu photo et vidéo optimisé pour vos réseaux sociaux. Posts, stories, reels — un flux cohérent et premium.", features: ["30+ visuels par session", "Formats optimisés", "Instagram, LinkedIn, TikTok", "Livraison sous 1 semaine", "Droits d'utilisation inclus"], image: "/images/hero-4k-3.jpg" },
    { num: "05", title: "Photo Produit", tagline: "Sublimer vos créations", desc: "Photographie de produits haut de gamme. Des images qui vendent, qui séduisent, qui racontent l'histoire de votre marque.", features: ["Studio ou en situation", "Retouche avancée", "Fond blanc ou lifestyle", "Livraison sous 1 semaine", "Droits commerciaux inclus"], image: "/images/wedding-flowers.jpg" },
    { num: "06", title: "Témoignages Vidéo", tagline: "La preuve sociale", desc: "Films témoignages de vos clients ou collaborateurs. La forme de preuve sociale la plus convaincante pour votre business.", features: ["Tournage interview", "Montage professionnel", "Format 16/9 et vertical", "Sous-titres inclus", "Livraison sous 2 semaines"], image: "/images/hero-4k-4.jpg" },
  ],
  Événements: [
    { num: "01", title: "Baptême & Communion", tagline: "Un premier souvenir", desc: "Capturez ces moments de vie familiaux avec douceur et authenticité. Des images qui traverseront les générations.", features: ["Reportage complet", "100+ photos", "Galerie privée", "Livraison sous 3 semaines", "Format A4 imprimable"], image: "/images/LOANE 2.jpg" },
    { num: "02", title: "Anniversaire & Gala", tagline: "La grande célébration", desc: "Soirées d'anniversaire, galas de charité, remises de prix — chaque grand événement mérite une couverture à la hauteur.", features: ["Couverture photo + vidéo", "200+ photos retouchées", "Highlights vidéo 2 min", "Livraison sous 2 semaines", "Galerie partageable"], image: "/images/hero-4k-5.jpg", badge: "Populaire", featured: true },
    { num: "03", title: "Naissance & Famille", tagline: "Les premiers instants", desc: "Séances nouveau-né et portraits de famille dans un esprit doux et intime. Des souvenirs pour toute une vie.", features: ["Séance 1h-1h30", "50+ photos retouchées", "Domicile ou studio", "Livraison sous 3 semaines", "Retouche douce incluse"], image: "/images/hero-4k-7.jpg" },
    { num: "04", title: "EVJF & EVG", tagline: "La dernière soirée libre", desc: "Un reportage fun et spontané pour immortaliser la dernière grande soirée avant le mariage. Ambiance garantie.", features: ["Reportage photo 3-4h", "100+ photos", "Galerie partageable", "Livraison sous 2 semaines", "Format stories inclus"], image: "/images/hero-4k-8.jpg" },
    { num: "05", title: "Portrait & Branding", tagline: "Votre image personnelle", desc: "Séances portraits pour artistes, entrepreneurs et personnalités. Une image forte, authentique et mémorable.", features: ["1h30 de shooting", "3 tenues", "50+ photos retouchées", "Livraison sous 2 semaines", "Droits d'utilisation inclus"], image: "/images/wedding-portrait.jpg" },
    { num: "06", title: "Conférence & Salon", tagline: "L'événement professionnel", desc: "Couverture photo et vidéo de vos événements professionnels. Des images qui valorisent votre expertise.", features: ["Couverture complète", "200+ photos", "Highlights 60s", "Livraison sous 48h", "Droits de diffusion inclus"], image: "/images/hero-4k-9.jpg" },
  ],
  Expériences: [
    { num: "01", title: "Pack Expérience", tagline: "L'expérience signature", desc: "Photo complète + film cinématique + Magazine Box + Album QR Code. L'offre qui transforme votre mariage en une expérience unique.", features: ["Reportage photo complet", "Film cinématique 4K", "Magazine Box incluse", "Album QR Code invités", "Support dédié"], image: "/images/hero-maries.jpg", badge: "Signature", featured: true },
    { num: "02", title: "Magazine Box Solo", tagline: "L'animation unique", desc: "Ajoutez la Magazine Box à votre mariage indépendamment du reste. Location complète avec animateur pour une soirée mémorable.", features: ["Location cabine premium", "Impressions illimitées", "Personnalisation complète", "Animateur inclus", "Galerie digitale"], image: "/images/wedding-dance.jpg" },
    { num: "03", title: "Pack Destination", tagline: "Au bout du monde", desc: "Mariages en Italie, Espagne, Portugal, Grèce — je vous suis partout en Europe pour capturer votre mariage de destination.", features: ["Déplacement Europe inclus", "Photo + vidéo", "Couverture 2 jours possible", "Livraison premium", "Sur devis uniquement"], image: "/images/wedding-flowers.jpg" },
    { num: "04", title: "Pack Anniversaire Premium", tagline: "Fêter en grand", desc: "Photo + vidéo pour votre grand anniversaire. Un souvenir cinématique de votre célébration, dans le même esprit que pour un mariage.", features: ["Couverture complète", "Film highlights 2-3 min", "200+ photos retouchées", "Galerie partageable", "Livraison sous 3 semaines"], image: "/images/hero-4k-10.jpg" },
    { num: "05", title: "Pack Corporate Premium", tagline: "L'image d'entreprise", desc: "Photos corporate + film institutionnel en une seule prestation. Une cohérence visuelle totale pour votre communication.", features: ["Portrait dirigeants", "Film institutionnel 3 min", "Contenu réseaux sociaux", "Livraison sous 4 semaines", "Droits commerciaux inclus"], image: "/images/hero-4k-11.jpg" },
    { num: "06", title: "Pack Famille & Portraits", tagline: "Tous ensemble", desc: "Séance famille complète avec portraits individuels, de couple et de groupe. Un souvenir de famille pour traverser les années.", features: ["2h de séance", "80+ photos retouchées", "Intérieur ou extérieur", "Livraison sous 3 semaines", "Tirage A3 offert"], image: "/images/hero-maries2.jpg" },
  ],
};

const TABS = ["Mariage", "Entreprise", "Événements", "Expériences"] as const;

export default function Services() {
  const [activeTab, setActiveTab] = useState<string>("Mariage");
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } });
    }, { threshold: 0.08 });
    section.querySelectorAll(".reveal").forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      const tab = (e as CustomEvent<{ tab: string }>).detail?.tab;
      if (tab && TABS.includes(tab as typeof TABS[number])) {
        setActiveTab(tab);
        setTimeout(animateCards, 10);
      }
    };
    window.addEventListener("switch-service-tab", handler);
    return () => window.removeEventListener("switch-service-tab", handler);
  }, []);

  const animateCards = () => {
    const grid = gridRef.current;
    if (!grid) return;
    Array.from(grid.querySelectorAll<HTMLElement>(".service-card")).forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(20px)";
      setTimeout(() => {
        card.style.transition = "opacity .5s ease, transform .5s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 70);
    });
  };

  const switchTab = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
    setTimeout(animateCards, 10);
  };

  useEffect(() => { animateCards(); }, []);

  return (
    <section ref={sectionRef} id="prestations" className="services" style={{ background: "var(--noir)" }}>
      <div className="services-header reveal">
        <div>
          <p className="section-label">Mes prestations</p>
          <h2 className="section-title">
            Ce que je<br /><em>propose.</em>
          </h2>
        </div>
        <p className="services-intro">
          Chaque prestation est pensée pour s&apos;adapter à votre projet. Mariage, entreprise, événement — je vous accompagne avec la même exigence.
        </p>
      </div>

      <div className="services-tabs reveal reveal-delay-1">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn${activeTab === tab ? " active" : ""}`}
            onClick={() => switchTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div ref={gridRef} className="services-grid">
        {data[activeTab].map((s) => (
          <div key={s.num} className={`service-card${s.featured ? " featured" : ""}`}>
            {s.badge && <span className="service-badge">{s.badge}</span>}
            <div className="service-card-img">
              <img src={s.image} alt={s.title} />
            </div>
            <div className="service-num">{s.num}</div>
            <h3 className="service-name">{s.title}</h3>
            <p className="service-tagline">{s.tagline}</p>
            <p className="service-desc">{s.desc}</p>
            <ul className="service-features">
              {s.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <a
              href="#contact"
              className="service-link"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            >
              Demander un devis →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
