"use client";
import { useState } from "react";

interface Option { label: string; value: string; sub?: string }
interface Question { id: string; question: string; options: Option[]; free?: boolean; hasOther?: boolean }

const flow: Record<string, Question[]> = {
  mariage: [
    {
      id: "formule", question: "Ce qui vous intéresse ?", hasOther: true,
      options: [
        { label: "Photo seule", value: "Photo" },
        { label: "Vidéo seule", value: "Vidéo" },
        { label: "Photo + Vidéo", value: "Photo + Vidéo" },
        { label: "Trio complet", value: "Photo + Vidéo + Magazine Box", sub: "Photo · Vidéo · Magazine Box" },
      ],
    },
    {
      id: "date", question: "Vous avez une date ?",
      options: [
        { label: "Oui, date fixée", value: "Date fixée" },
        { label: "En cours de définition", value: "Date en cours" },
        { label: "Pas encore", value: "Pas de date" },
      ],
    },
    {
      id: "lieu", question: "Où se passe le mariage ?",
      options: [
        { label: "Bordeaux / Gironde", value: "Bordeaux/Gironde" },
        { label: "Autre région France", value: "Autre région France" },
        { label: "À l'étranger", value: "International" },
      ],
    },
    {
      id: "invites", question: "Combien d'invités ?",
      options: [
        { label: "Moins de 50", value: "<50 invités" },
        { label: "50 à 100", value: "50-100 invités" },
        { label: "100 à 200", value: "100-200 invités" },
        { label: "Plus de 200", value: ">200 invités" },
      ],
    },
    {
      id: "budget", question: "Votre budget photo/vidéo ?",
      options: [
        { label: "Autour de 1 500€", value: "~1 500€" },
        { label: "2 000 – 3 500€", value: "2 000-3 500€" },
        { label: "3 500 – 5 000€", value: "3 500-5 000€" },
        { label: "5 000€ et plus", value: "5 000€+" },
      ],
    },
  ],
  entreprise: [
    {
      id: "contenu", question: "Quel type de contenu ?", hasOther: true,
      options: [
        { label: "Film institutionnel", value: "Film institutionnel" },
        { label: "Photo corporate", value: "Photo corporate" },
        { label: "Événement pro", value: "Événement corporate" },
        { label: "Réseaux sociaux", value: "Contenu social media" },
      ],
    },
    {
      id: "urgence", question: "Quelle urgence ?",
      options: [
        { label: "Dans le mois", value: "< 1 mois" },
        { label: "Sous 3 mois", value: "Sous 3 mois" },
        { label: "Sous 6 mois", value: "Sous 6 mois" },
        { label: "Pas encore défini", value: "Pas pressé" },
      ],
    },
    {
      id: "structure", question: "Votre structure ?", hasOther: true,
      options: [
        { label: "Startup", value: "Startup" },
        { label: "PME", value: "PME" },
        { label: "Grande entreprise", value: "Grande entreprise" },
        { label: "Indépendant", value: "Indépendant" },
      ],
    },
    {
      id: "budget", question: "Budget envisagé ?",
      options: [
        { label: "Moins de 500€", value: "<500€" },
        { label: "500 – 1 500€", value: "500-1 500€" },
        { label: "1 500 – 3 000€", value: "1 500-3 000€" },
        { label: "Plus de 3 000€", value: "3 000€+" },
      ],
    },
    { id: "precisions", question: "Des précisions à partager ?", options: [], free: true },
  ],
  evenement: [
    {
      id: "type", question: "Quel type d'événement ?", hasOther: true,
      options: [
        { label: "Soirée privée", value: "Soirée privée" },
        { label: "Anniversaire", value: "Anniversaire" },
        { label: "EVJF / EVG", value: "EVJF/EVG" },
        { label: "Gala professionnel", value: "Gala pro" },
      ],
    },
    {
      id: "quand", question: "C'est pour quand ?",
      options: [
        { label: "Dans le mois", value: "Dans le mois" },
        { label: "Sous 3 mois", value: "Sous 3 mois" },
        { label: "Sous 6 mois", value: "Sous 6 mois" },
        { label: "Plus tard", value: "Plus tard" },
      ],
    },
    {
      id: "lieu", question: "Où ?",
      options: [
        { label: "Bordeaux / Gironde", value: "Bordeaux/Gironde" },
        { label: "Autre région France", value: "Autre région France" },
        { label: "À l'étranger", value: "International" },
      ],
    },
    {
      id: "personnes", question: "Combien de personnes ?",
      options: [
        { label: "Moins de 30", value: "<30 personnes" },
        { label: "30 à 80", value: "30-80 personnes" },
        { label: "80 à 150", value: "80-150 personnes" },
        { label: "Plus de 150", value: ">150 personnes" },
      ],
    },
    {
      id: "budget", question: "Budget envisagé ?",
      options: [
        { label: "Moins de 500€", value: "<500€" },
        { label: "500 – 1 500€", value: "500-1 500€" },
        { label: "1 500 – 3 000€", value: "1 500-3 000€" },
        { label: "Plus de 3 000€", value: "3 000€+" },
      ],
    },
  ],
  autre: [
    {
      id: "type", question: "Ce qui vous intéresse ?",
      options: [
        { label: "Portrait", value: "Portrait" },
        { label: "Photo produit", value: "Photo produit" },
        { label: "Famille / Naissance", value: "Famille/Naissance" },
        { label: "Autre", value: "Autre" },
      ],
    },
    {
      id: "usage", question: "Pour quel usage ?", hasOther: true,
      options: [
        { label: "Usage personnel", value: "Personnel" },
        { label: "Réseaux sociaux", value: "Réseaux sociaux" },
        { label: "Professionnel", value: "Professionnel" },
      ],
    },
    {
      id: "quand", question: "C'est pour quand ?",
      options: [
        { label: "Dans le mois", value: "Dans le mois" },
        { label: "Sous 3 mois", value: "Sous 3 mois" },
        { label: "Plus tard", value: "Plus tard" },
      ],
    },
    {
      id: "cadre", question: "Quel cadre ?", hasOther: true,
      options: [
        { label: "En studio", value: "Studio" },
        { label: "En extérieur", value: "Extérieur" },
        { label: "Chez moi", value: "Domicile" },
      ],
    },
    {
      id: "budget", question: "Budget envisagé ?",
      options: [
        { label: "Moins de 200€", value: "<200€" },
        { label: "200 – 500€", value: "200-500€" },
        { label: "500 – 1 000€", value: "500-1 000€" },
        { label: "1 000€ et plus", value: "1 000€+" },
      ],
    },
  ],
};

const q1Options = [
  { label: "Mariage", value: "mariage", sub: "Photo · Vidéo · Magazine Box" },
  { label: "Entreprise", value: "entreprise", sub: "Film · Corporate · Événement" },
  { label: "Événement", value: "evenement", sub: "Soirée · EVJF · Gala" },
  { label: "Autre", value: "autre", sub: "Portrait · Produit · Famille" },
];

const typeLabels: Record<string, string> = {
  mariage: "Mariage",
  entreprise: "Corporate / Entreprise",
  evenement: "Événement",
  autre: "Autre",
};

interface Props {
  onComplete: (type: string, summary: string) => void;
}

export default function ProjectQuiz({ onComplete }: Props) {
  const [projectType, setProjectType] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [otherInput, setOtherInput] = useState("");
  const [showOther, setShowOther] = useState(false);
  const [animating, setAnimating] = useState(false);

  const questions = projectType ? flow[projectType] : [];
  const totalSteps = projectType ? questions.length + 1 : 1;
  const progress = (step / totalSteps) * 100;

  const go = (next: () => void) => {
    setAnimating(true);
    setTimeout(() => { next(); setAnimating(false); }, 220);
  };

  const advance = (newAnswers: Record<string, string>, nextStep: number) => {
    if (nextStep > questions.length) {
      const parts = [typeLabels[projectType!], ...Object.values(newAnswers).filter(Boolean)];
      onComplete(typeLabels[projectType!], parts.join(" · "));
    } else {
      go(() => { setStep(nextStep); setShowOther(false); setOtherInput(""); });
    }
  };

  const selectQ1 = (val: string) => {
    go(() => { setProjectType(val); setStep(1); });
  };

  const selectAnswer = (q: Question, val: string) => {
    if (val === "__other__" || val === "Autre") {
      setAnswers(a => ({ ...a, [q.id]: "" }));
      setShowOther(true);
      return;
    }
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    advance(newAnswers, step + 1);
  };

  const validateOther = (q: Question) => {
    const val = otherInput.trim() || "Autre";
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    advance(newAnswers, step + 1);
  };

  const validateFree = (q: Question) => {
    const val = otherInput.trim() || "Aucune précision";
    const newAnswers = { ...answers, [q.id]: val };
    setAnswers(newAnswers);
    advance(newAnswers, step + 1);
  };

  const back = () => {
    setShowOther(false);
    setOtherInput("");
    if (step === 1) {
      go(() => { setProjectType(null); setStep(0); setAnswers({}); });
    } else {
      go(() => setStep(s => s - 1));
    }
  };

  const currentQ = step > 0 ? questions[step - 1] : null;

  const cardStyle = (selected: boolean): React.CSSProperties => ({
    background: selected ? "rgba(201,168,76,0.1)" : "rgba(255,255,255,0.02)",
    border: `1px solid ${selected ? "rgba(201,168,76,0.5)" : "rgba(255,255,255,0.07)"}`,
    padding: "14px 18px", textAlign: "left", cursor: "pointer",
    transition: "all 0.25s ease",
  });

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Barre de progression */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
        <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 0, top: 0, height: "100%", background: "var(--or)", width: `${progress}%`, transition: "width 0.4s ease" }} />
        </div>
        <span style={{ fontSize: 10, letterSpacing: "0.2em", color: "var(--gris2)", whiteSpace: "nowrap" }}>
          {step} / {totalSteps}
        </span>
      </div>

      <div style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(6px)" : "translateY(0)", transition: "opacity 0.22s ease, transform 0.22s ease" }}>

        {/* Q1 */}
        {step === 0 && (
          <>
            <p style={{ fontSize: 13, fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--blanc2)", marginBottom: 16 }}>
              C&apos;est pour quel projet ?
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {q1Options.map(opt => (
                <button key={opt.value} type="button" onClick={() => selectQ1(opt.value)} style={cardStyle(false)}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.4)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.05)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)"; }}>
                  <div style={{ fontSize: 13, fontWeight: 500, color: "var(--blanc)", marginBottom: 4 }}>{opt.label}</div>
                  <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--gris2)" }}>{opt.sub}</div>
                </button>
              ))}
            </div>
          </>
        )}

        {/* Questions suivantes */}
        {step > 0 && currentQ && (
          <>
            <p style={{ fontSize: 13, fontFamily: "var(--serif)", fontStyle: "italic", color: "var(--blanc2)", marginBottom: 16 }}>
              {currentQ.question}
            </p>

            {/* Champ texte libre (question free ou "Autre" sélectionné) */}
            {(currentQ.free || showOther) ? (
              <div>
                <textarea
                  value={otherInput}
                  onChange={e => setOtherInput(e.target.value)}
                  placeholder={currentQ.free ? "Optionnel — vos envies, contraintes, inspirations..." : "Précisez..."}
                  className="form-textarea"
                  style={{ marginBottom: 12 }}
                  autoFocus
                />
                <button type="button"
                  onClick={() => currentQ.free ? validateFree(currentQ) : validateOther(currentQ)}
                  className="btn btn-gold" style={{ padding: "12px 28px" }}>
                  Continuer →
                </button>
              </div>
            ) : (
              /* Choix multiples */
              <div style={{ display: "grid", gridTemplateColumns: currentQ.options.length <= 3 && !currentQ.hasOther ? "1fr" : "1fr 1fr", gap: 8 }}>
                {currentQ.options.map(opt => {
                  const selected = answers[currentQ.id] === opt.value;
                  return (
                    <button key={opt.value} type="button" onClick={() => selectAnswer(currentQ, opt.value)}
                      style={cardStyle(selected)}
                      onMouseEnter={e => { if (!selected) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.04)"; } }}
                      onMouseLeave={e => { if (!selected) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)"; } }}>
                      <div style={{ fontSize: 12, fontWeight: 500, color: selected ? "var(--or)" : "var(--blanc)", marginBottom: opt.sub ? 3 : 0 }}>{opt.label}</div>
                      {opt.sub && <div style={{ fontSize: 10, letterSpacing: "0.1em", color: "var(--gris2)" }}>{opt.sub}</div>}
                    </button>
                  );
                })}
                {currentQ.hasOther && (
                  <button type="button" onClick={() => selectAnswer(currentQ, "__other__")}
                    style={cardStyle(showOther)}
                    onMouseEnter={e => { if (!showOther) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(201,168,76,0.35)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(201,168,76,0.04)"; } }}
                    onMouseLeave={e => { if (!showOther) { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.07)"; (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.02)"; } }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: showOther ? "var(--or)" : "var(--blanc)" }}>Autre</div>
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {step > 0 && (
        <button type="button" onClick={back}
          style={{ marginTop: 16, background: "none", border: "none", cursor: "pointer", fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gris2)", padding: 0, transition: "color 0.2s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--gris)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--gris2)")}>
          ← Précédent
        </button>
      )}
    </div>
  );
}
