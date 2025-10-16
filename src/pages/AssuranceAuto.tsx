// src/pages/AssuranceAuto.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Car,
  ShieldCheck,
  Wrench,
  Lock,
  AlertTriangle,
  Gauge,
  Users,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

/** ====== Fond vidéo plein écran, SANS image fallback ====== */
function FullscreenVimeoBg({
  videoId = "1127830767",
}: {
  videoId?: string;
}) {
  const src = `https://player.vimeo.com/video/${videoId}?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&controls=0`;
  return (
    <>
      {/* Vidéo Vimeo en background */}
      <iframe
        className="fixed inset-0 h-full w-full -z-20"
        src={src}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Background video"
        style={{ pointerEvents: "none" }}
      />
      {/* Overlay pour lisibilité */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-b from-black/60 via-black/55 to-black/60" />
      {/* Accessibilité : si motion réduit, on masque la vidéo */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          iframe[title="Background video"] { display: none; }
          /* on garde l'overlay pour fond sombre propre */
        }
      `}</style>
    </>
  );
}

export default function AssuranceAuto() {
  const features = [
    {
      icon: ShieldCheck,
      title: "Responsabilité civile",
      desc: "Couvre les dommages matériels et corporels causés à autrui. Inclus dans toutes les formules.",
    },
    {
      icon: AlertTriangle,
      title: "Protection du conducteur",
      desc: "Indemnisation en cas de blessures du conducteur, avec plafonds adaptés selon la formule.",
    },
    {
      icon: Wrench,
      title: "Assistance & dépannage 24/7",
      desc: "Dépannage sur place ou remorquage, avec véhicule de remplacement selon options.",
    },
    {
      icon: Lock,
      title: "Vol, incendie & bris de glace",
      desc: "Prise en charge des sinistres majeurs et remplacement/réparation des vitrages (selon formule).",
    },
  ];

  const formulas = [
    {
      badge: "Essentiel",
      title: "Formule Tiers",
      points: ["Responsabilité civile obligatoire", "Défense & recours", "Assistance de base"],
      highlight: "Idéal pour petits budgets et véhicules anciens.",
    },
    {
      badge: "Populaire",
      title: "Formule Tiers +",
      points: ["Bris de glace", "Vol & incendie", "Catastrophes naturelles", "Assistance 0 km (option)"],
      highlight: "Excellent compromis garanties / coût.",
      popular: true,
    },
    {
      badge: "Premium",
      title: "Formule Tous Risques",
      points: [
        "Dommages tous accidents",
        "Valeur à neuf / majorée (selon âge du véhicule)",
        "Assistance étendue & véhicule relais",
      ],
      highlight: "Pour véhicules récents ou de forte valeur.",
    },
  ];

  const steps = [
    { title: "1. Votre besoin", text: "Dites-nous comment vous roulez (usage, stationnement, bonus/malus, etc.)." },
    { title: "2. Comparaison", text: "Nous comparons rapidement de nombreux assureurs partenaires." },
    { title: "3. Recommandation", text: "Vous recevez une proposition claire et personnalisée." },
    { title: "4. Souscription", text: "Signature simple et 100% en ligne, carte verte immédiate." },
  ];

  const faqs = [
    {
      q: "Quelle formule choisir ?",
      a: "La formule dépend de l’âge et de la valeur du véhicule, de votre usage et de votre budget. « Tous risques » convient aux véhicules récents ; « Tiers + » est un bon équilibre ; « Tiers » protège l’essentiel.",
    },
    {
      q: "Puis-je assurer un jeune conducteur ?",
      a: "Oui. Nous proposons des solutions spécifiques avec accompagnement pour optimiser la prime et les garanties.",
    },
    {
      q: "Quelles pièces fournir ?",
      a: "Permis de conduire, carte grise, relevé d’information (bonus/malus) et un RIB pour la souscription.",
    },
    {
      q: "Assistance 0 km, c’est quoi ?",
      a: "Vous êtes dépanné devant chez vous, sans distance minimale, y compris pour une simple panne.",
    },
  ];

  return (
    <div className="relative min-h-screen text-white">
      {/* Vidéo plein écran derrière TOUTE la page */}
      <FullscreenVimeoBg videoId="1127830767" />

      {/* HERO compact */}
      <section className="px-8 pb-10 pt-28 md:pt-36">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Devis gratuit • Réponse sous 2h
          </div>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] drop-shadow md:text-6xl">
            Assurance Auto
          </h1>
          <p className="mt-3 max-w-2xl text-lg text-white/90 md:text-xl">
            Roulez en toute sérénité : des garanties claires, une assistance réactive et des démarches simplifiées.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
              <Link to="/devis" className="flex items-center gap-2">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              <Link to="/contact">Parler à un conseiller</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Avantages — cartes translucides */}
      <section className="px-8 py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-white/25 bg-white/15 p-6 shadow-2xl backdrop-blur-md transition hover:bg-white/20"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/25">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{f.title}</h3>
              <p className="text-white/95">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Formules (sans prix) */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl drop-shadow">
            Des formules adaptées à votre voiture
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {formulas.map((f) => (
              <article
                key={f.title}
                className={`relative rounded-2xl border border-white/25 bg-white/15 p-8 shadow-2xl backdrop-blur-md transition hover:-translate-y-1 hover:bg-white/20 ${
                  f.popular ? "ring-2 ring-teal-400/70" : ""
                }`}
              >
                {f.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-teal-500/90 px-3 py-1 text-xs font-bold backdrop-blur">
                    Le plus choisi
                  </span>
                )}
                <div className="mb-2 text-sm font-semibold text-teal-200">{f.badge}</div>
                <h3 className="mb-4 text-2xl font-bold">{f.title}</h3>
                <ul className="mb-6 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-300" />
                      <span className="text-white/95">{p}</span>
                    </li>
                  ))}
                </ul>
                <p className="mb-6 text-sm text-white/85">{f.highlight}</p>
                <Button asChild className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-xl">
                  <Link to="/devis">Recevoir une proposition</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl drop-shadow">Comment ça marche ?</h2>

          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-white/25 bg-white/15 p-6 backdrop-blur-md">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/25 font-bold">
                  {i + 1}
                </div>
                <p className="mb-1 font-semibold">{s.title}</p>
                <p className="text-white/90 text-sm">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl drop-shadow">Documents à prévoir</h2>
            <p className="mb-10 text-white/90">Pour une souscription rapide, préparez ces éléments :</p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
            {[
              { title: "Permis de conduire", icon: Users },
              { title: "Carte grise (certificat d’immatriculation)", icon: Car },
              { title: "Relevé d’information (bonus/malus)", icon: Gauge },
              { title: "RIB pour le prélèvement", icon: Lock },
            ].map((d) => (
              <div
                key={d.title}
                className="flex items-center gap-4 rounded-xl border border-white/25 bg-white/15 p-4 backdrop-blur-md"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/25">
                  <d.icon className="h-6 w-6" />
                </div>
                <p className="font-medium">{d.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl drop-shadow">Questions fréquentes</h2>

        <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-white/25 bg-white/15 p-6 backdrop-blur-md">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-teal-200" />
                    <span className="font-semibold">{f.q}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-white/70 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-white/90">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA finale */}
      <section className="px-8 pb-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-white/25 bg-white/15 p-10 text-center shadow-2xl backdrop-blur-md">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl drop-shadow">Prêt à rouler sereinement ?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Recevez votre devis personnalisé en quelques minutes. Sans engagement.
          </p>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
            <Link to="/devis" className="flex items-center justify-center gap-2">
              Demander un devis gratuit
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}