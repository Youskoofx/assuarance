// src/pages/MultirisquePro.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  ShieldCheck,
  Factory,
  Warehouse,
  Briefcase,
  Flame,
  Droplets,
  Zap,
  Lock,
  LifeBuoy,
  FileCheck,
  HelpCircle,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function MultirisquePro() {
  const garanties = [
    {
      icon: ShieldCheck,
      title: "Responsabilité civile professionnelle",
      desc: "Couvre les dommages corporels, matériels et immatériels causés à des tiers dans l’exercice de votre activité.",
    },
    {
      icon: Flame,
      title: "Incendie & événements assimilés",
      desc: "Dégâts suite à incendie, explosion, fumées… prise en charge des dommages et frais annexes.",
    },
    {
      icon: Droplets,
      title: "Dégâts des eaux",
      desc: "Fuites, infiltrations, ruptures de canalisation ou débordements accidentels.",
    },
    {
      icon: Zap,
      title: "Bris de machine & électrique",
      desc: "Dommages aux équipements (électriques/électroniques) selon conditions et options souscrites.",
    },
    {
      icon: Lock,
      title: "Vol & vandalisme",
      desc: "Vol avec effraction, tentative de vol, vandalisme sur locaux et contenus (selon garanties).",
    },
    {
      icon: LifeBuoy,
      title: "Pertes d’exploitation",
      desc: "Maintien de l’activité après sinistre (indemnisation de la marge brute selon limites).",
    },
  ];

  const secteurs = [
    { icon: Building2, label: "Bureaux & services" },
    { icon: Factory, label: "Artisans & ateliers" },
    { icon: Warehouse, label: "Commerces & dépôts" },
    { icon: Briefcase, label: "Professions libérales" },
  ];

  const formules = [
    {
      badge: "Essentiel",
      title: "Couverture de base",
      points: [
        "RC Pro",
        "Incendie / Explosion",
        "Dégâts des eaux",
        "Événements climatiques",
      ],
      pitch: "L’indispensable pour démarrer en sécurité.",
    },
    {
      badge: "Populaire",
      title: "Couverture Équilibre",
      popular: true,
      points: [
        "Vol / Vandalisme",
        "Bris de glaces",
        "Bris électrique",
        "Assistance sinistre 24/7",
      ],
      pitch: "Le meilleur équilibre garanties / budget.",
    },
    {
      badge: "Premium",
      title: "Couverture Étendue",
      points: [
        "Pertes d’exploitation",
        "Valeur à neuf (selon conditions)",
        "Protection juridique pro",
        "Équipements spécifiques",
      ],
      pitch: "Pour une continuité d’activité maximale.",
    },
  ];

  const etapes = [
    {
      title: "1. Diagnostic gratuit",
      text: "Quelques questions sur vos locaux, matériels et activité.",
    },
    {
      title: "2. Comparaison",
      text: "Étude multi-assureurs et sélection des meilleures garanties.",
    },
    { title: "3. Proposition", text: "Offre claire, personnalisée et sans engagement." },
    {
      title: "4. Souscription",
      text: "Démarches simples et attestation immédiate.",
    },
  ];

  const faqs = [
    {
      q: "En quoi consiste une Multirisque Pro ?",
      a: "C’est un contrat modulable qui regroupe RC Pro, dommages aux biens (incendie, dégât des eaux, vol…), et des options comme la perte d’exploitation.",
    },
    {
      q: "Est-ce obligatoire ?",
      a: "La RC Pro peut être obligatoire pour certaines professions ; la Multirisque Pro est fortement recommandée pour protéger vos locaux et votre activité.",
    },
    {
      q: "Puis-je adapter les garanties à mon secteur ?",
      a: "Oui, le contrat est personnalisable par secteur et taille d’entreprise (artisans, commerces, libéraux, bureaux…).",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative h-[60vh] min-h-[480px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/50 to-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Pour TPE • PME • Indépendants
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.1] text-white drop-shadow md:text-6xl">
              Multirisque <span className="text-teal-300">Professionnelle</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90 md:text-xl">
              Protégez vos locaux, vos biens et votre responsabilité. Des
              garanties modulables pour la continuité de votre activité.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                <Link to="/devis" className="flex items-center gap-2">
                  Obtenir un devis gratuit
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

      {/* Garanties */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Garanties clés</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {garanties.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <g.icon className="h-6 w-6 text-teal-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{g.title}</h3>
                <p className="text-slate-600">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secteurs */}
      <section className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Secteurs couverts</h2>
          <div className="mx-auto grid max-w-3xl gap-6 sm:grid-cols-2 md:grid-cols-4">
            {secteurs.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-md"
              >
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <s.icon className="h-6 w-6 text-teal-700" />
                </div>
                <p className="font-semibold text-slate-800">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formules (sans prix) */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
            Des niveaux de protection adaptés
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
                <p className="mb-6 text-sm text-slate-600">{f.pitch}</p>
                <Button asChild className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
                  <Link to="/devis">Recevoir une proposition</Link>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Processus */}
      <section className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">Comment ça marche ?</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {etapes.map((e, i) => (
              <div key={e.title} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                  {i + 1}
                </div>
                <p className="mb-1 font-semibold text-slate-900">{e.title}</p>
                <p className="text-sm text-slate-600">{e.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-sm"
              >
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

      {/* CTA finale */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
            Protégez votre entreprise, aujourd’hui
          </h2>
        <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Un expert vous accompagne pour bâtir un contrat parfaitement adapté à votre activité.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 font-bold"
          >
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