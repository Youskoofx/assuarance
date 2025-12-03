import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  HardHat,
  ShieldCheck,
  ClipboardCheck,
  Hammer,
  Building2,
  HelpCircle,
  ArrowRight,
  FileText,
} from "lucide-react";

export default function DecennalePro() {
  const garanties = [
    {
      icon: ShieldCheck,
      title: "Responsabilité décennale",
      desc: "Couvre les dommages compromettant la solidité ou rendant l’ouvrage impropre à sa destination pendant 10 ans.",
    },
    {
      icon: ClipboardCheck,
      title: "Attestations chantier rapides",
      desc: "Attestations nominatives pour vos maîtres d’ouvrage et donneurs d’ordre, délivrées rapidement.",
    },
    {
      icon: Hammer,
      title: "Sous-traitants & co-traitants",
      desc: "Prise en compte de vos sous-traitants et co-traitants selon votre organisation de chantier.",
    },
  ];

  const metiers = [
    "Gros œuvre (maçonnerie, béton)",
    "Second œuvre (plomberie, électricité, CVC)",
    "Couvreur, étancheur, charpentier",
    "Plaquiste, plâtrier, menuisier",
    "Carreleur, peintre, façadier",
    "Pisciniste, terrassier, VRD",
  ];

  const faqs = [
    {
      q: "La décennale est-elle obligatoire ?",
      a: "Oui, pour la plupart des métiers du BTP impliquant la structure ou l’enveloppe de l’ouvrage, la garantie décennale est obligatoire.",
    },
    {
      q: "Quand fournir une attestation ?",
      a: "Avant l’ouverture d’un chantier ou la signature d’un marché. Les donneurs d’ordre l’exigent pour démarrer les travaux.",
    },
    {
      q: "Quels éléments fournir pour un devis ?",
      a: "Activité précise, chiffre d’affaires, sinistralité éventuelle, sous-traitance, zones géographiques d’intervention.",
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
              "url(https://images.pexels.com/photos/585419/pexels-photo-585419.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <HardHat className="h-4 w-4" />
              BTP / Construction
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
              Garantie <span className="text-amber-300">Décennale</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90 md:text-xl">
              Protégez vos chantiers et vos clients pendant 10 ans avec une couverture conforme aux obligations légales du BTP.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                <Link to="/devis" className="flex items-center gap-2">
                  Obtenir un devis
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
          <div className="grid gap-6 md:grid-cols-3">
            {garanties.map((g) => (
              <div
                key={g.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100">
                  <g.icon className="h-6 w-6 text-amber-700" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-slate-900">{g.title}</h3>
                <p className="text-slate-600">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Métiers couverts */}
      <section className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">Métiers couverts</h2>
              <p className="text-slate-600 mb-6">
                Nous couvrons la majorité des corps d’état du BTP, pour les chantiers neufs, rénovations ou extensions.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {metiers.map((m) => (
                  <div key={m} className="flex items-center gap-3 rounded-xl border border-amber-100 bg-white p-4">
                    <HardHat className="h-5 w-5 text-amber-600" />
                    <span className="text-slate-700 font-medium">{m}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700">
                <FileText className="h-4 w-4" />
                Devis rapide
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Documents souvent demandés</h3>
              <p className="text-slate-600 mb-4">
                Préparez ces éléments pour accélérer votre devis décennale.
              </p>
              <ul className="space-y-3">
                {[
                  "SIRET et activité précise",
                  "Chiffre d’affaires et ventilation par activité",
                  "Historique sinistres (si existants)",
                  "Attestations sous-traitants le cas échéant",
                  "Zones géographiques d’intervention",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Building2 className="h-5 w-5 text-amber-600 mt-0.5" />
                    <span className="text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold text-slate-900">{f.q}</span>
                  <HelpCircle className="h-4 w-4 text-amber-600" />
                </summary>
                <p className="mt-3 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-8 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">Obtenez votre attestation rapidement</h2>
          <p className="mb-8 text-slate-600">
            Un conseiller dédié vous accompagne pour finaliser votre garantie décennale et délivrer vos attestations chantier.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
            <Link to="/devis" className="flex items-center gap-2">
              Demander un devis
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
