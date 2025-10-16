// src/pages/AssuranceHabitation.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Home as HomeIcon,
  ShieldCheck,
  Flame,
  Droplets,
  HandCoins,
  Hammer,
  Sparkles,
  AlarmSmoke,
  KeyRound,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export default function AssuranceHabitation() {
  const garanties = [
    { icon: Flame, title: "Incendie & explosion", desc: "Dommages consécutifs à un incendie, explosion, fumées." },
    { icon: Droplets, title: "Dégâts des eaux", desc: "Fuite, infiltration, débordement, gel : prise en charge des réparations." },
    { icon: HandCoins, title: "Vol & vandalisme", desc: "Cambriolage, effraction, vandalisme : protection des biens mobiliers." },
    { icon: AlarmSmoke, title: "Bris de glace", desc: "Fenêtres, baies vitrées, vérandas : réparation ou remplacement." },
    { icon: Hammer, title: "Catastrophes naturelles", desc: "Tempête, grêle, inondation, catastrophe technologique (selon arrêté)." },
    { icon: ShieldCheck, title: "Responsabilité civile", desc: "Dommages causés à autrui par vous, vos enfants ou vos animaux." },
  ];

  const situations = [
    {
      title: "Locataire",
      image:
        "https://images.pexels.com/photos/3826679/pexels-photo-3826679.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "L’assurance habitation est obligatoire pour les locataires. Protégez vos biens et votre responsabilité.",
    },
    {
      title: "Propriétaire occupant",
      image:
        "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "Maison ou appartement : des garanties complètes pour votre résidence principale.",
    },
    {
      title: "Propriétaire non-occupant (PNO)",
      image:
        "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      desc: "Protégez votre bien mis en location : dégât des eaux, incendie, recours du locataire…",
    },
  ];

  const formules = [
    {
      badge: "Essentiel",
      title: "Formule Base",
      points: [
        "Responsabilité civile",
        "Incendie / explosion",
        "Dégâts des eaux",
        "Défense & recours",
      ],
      note: "Le strict nécessaire pour être conforme et serein.",
    },
    {
      badge: "Populaire",
      title: "Formule Confort",
      points: [
        "Vol & vandalisme",
        "Bris de glace",
        "Catastrophes naturelles",
        "Assistance 24/7",
      ],
      note: "L’équilibre idéal garanties / budget.",
      popular: true,
    },
    {
      badge: "Premium",
      title: "Formule Sérénité",
      points: [
        "Valeur à neuf (selon conditions)",
        "Objets de valeur (plafonds renforcés)",
        "Dommages électriques",
        "Dommages immatériels consécutifs",
      ],
      note: "Pour une protection haut de gamme et des plafonds élevés.",
    },
  ];

  const steps = [
    { title: "1. Votre logement", text: "Type, surface, nombre de pièces et niveau de sécurité." },
    { title: "2. Comparaison", text: "Nous comparons les offres de plusieurs assureurs partenaires." },
    { title: "3. Recommandation", text: "Vous recevez une proposition claire et personnalisée." },
    { title: "4. Souscription", text: "Signature en ligne, attestation immédiate." },
  ];

  const faqs = [
    {
      q: "L’assurance habitation est-elle obligatoire ?",
      a: "Pour les locataires, oui. Pour les propriétaires occupants, elle est fortement recommandée, et souvent exigée par la copropriété ou la banque.",
    },
    {
      q: "Comment est calculée la prime ?",
      a: "Selon le type de logement, sa surface, sa localisation, votre profil et les garanties choisies.",
    },
    {
      q: "Que couvre la responsabilité civile ?",
      a: "Les dommages accidentels causés à autrui (dégâts des eaux chez le voisin, casse involontaire, etc.).",
    },
    {
      q: "Puis-je assurer mes objets de valeur ?",
      a: "Oui, avec des options dédiées et des plafonds renforcés (bijoux, œuvres d’art, matériel high-tech…).",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO — image Pexels plein écran */}
      <section className="relative h-[64vh] min-h-[480px] w-full overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Devis gratuit • Réponse sous 2h
            </div>
            <h1 className="mb-3 text-4xl font-extrabold leading-[1.1] text-white drop-shadow md:text-6xl">
              Assurance Habitation
            </h1>
            <p className="max-w-2xl text-lg text-white/90 md:text-xl">
              Protégez votre foyer avec des garanties claires, adaptées à votre logement et à votre budget.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                <Link to="/devis" className="flex items-center gap-2">
                  Demander un devis
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
              >
                <Link to="/contact">Parler à un conseiller</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* GARANTIES CLÉS */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {garanties.map((g) => (
            <div key={g.title} className="rounded-2xl border border-slate-200 p-6 transition hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                <g.icon className="h-6 w-6 text-teal-700" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-slate-900">{g.title}</h3>
              <p className="text-slate-600">{g.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SITUATIONS COUVERTES */}
      <section className="bg-slate-50 px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Selon votre situation
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {situations.map((s) => (
              <article
                key={s.title}
                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-slate-900">{s.title}</h3>
                  <p className="text-slate-600">{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FORMULES (sans prix) */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Des formules flexibles, sans superflu
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            {formules.map((f) => (
              <article
                key={f.title}
                className={`relative rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl ${
                  f.popular ? "ring-2 ring-teal-500" : ""
                }`}
              >
                {f.popular && (
                  <span className="absolute -top-3 left-6 rounded-full bg-teal-600 px-3 py-1 text-xs font-bold text-white">
                    Le plus choisi
                  </span>
                )}
                <div className="mb-2 text-sm font-semibold text-teal-600">{f.badge}</div>
                <h3 className="mb-4 text-2xl font-bold text-slate-900">{f.title}</h3>
                <ul className="mb-6 space-y-3">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-600" />
                      {p}
                    </li>
                  ))}
                </ul>
                <p className="mb-6 text-sm text-slate-600">{f.note}</p>
                <Button asChild className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                  <Link to="/devis">Recevoir une proposition</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="bg-slate-50 px-8 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Comment ça marche ?
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                  {i + 1}
                </div>
                <p className="mb-1 font-semibold text-slate-900">{s.title}</p>
                <p className="text-sm text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Questions fréquentes
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-teal-600" />
                    <span className="font-semibold text-slate-900">{f.q}</span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 transition group-open:rotate-90" />
                </summary>
                <p className="mt-3 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINALE */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-20">
        <div className="mx-auto max-w-4xl text-center text-white">
          <HomeIcon className="mx-auto mb-4 h-10 w-10 opacity-90" />
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Protégez votre foyer dès aujourd’hui</h2>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Recevez un devis clair et personnalisé. Aucun engagement, accompagnement par un courtier dédié.
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