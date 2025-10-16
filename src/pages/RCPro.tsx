// src/pages/RCPro.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  Users2,
  FileText,
  Briefcase,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function RCPro() {
  const garanties = [
    {
      icon: ShieldCheck,
      title: "Responsabilité civile entreprise",
      desc: "Couvre les dommages corporels, matériels et immatériels causés à des tiers dans le cadre de votre activité.",
    },
    {
      icon: Briefcase,
      title: "Missions ponctuelles",
      desc: "Couverture même pour interventions ponctuelles ou hors site.",
    },
    {
      icon: Users2,
      title: "Sous-traitants",
      desc: "Couverture adaptée si vous faites appel à des sous-traitants pendant vos prestations.",
    },
  ];

  const atouts = [
    {
      icon: FileText,
      title: "Contrat simple",
      desc: "Conditions claires, sans jargon, avec garanties modulaires.",
    },
    {
      icon: Sparkles,
      title: "Tarifs personnalisés",
      desc: "Basés sur votre secteur, chiffre d’affaires et le degré de risque.",
    },
  ];

  const faqs = [
    {
      q: "Qu’est-ce que la RC Pro couvre exactement ?",
      a: "Les dommages causés à autrui par votre activité (dommages corporels, matériels, immatériels consécutifs).",
    },
    {
      q: "Dois-je souscrire une RC Pro ?",
      a: "Pour de nombreuses professions, oui, légalement. Dans tous les cas, c’est fortement recommandé pour se prémunir de risques majeurs.",
    },
    {
      q: "Puis-je ajouter des extensions ?",
      a: "Oui : RC exploitation, RC après livraison, dommages immatériels, etc.",
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
              "url(https://images.pexels.com/photos/669619/pexels-photo-669619.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Protection essentielle pro
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
              RC <span className="text-teal-300">Professionnelle</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90 md:text-xl">
              Protégez votre responsabilité civile dans le cadre de votre activité professionnelle.
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
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Garanties incluses</h2>
          <div className="grid gap-6 md:grid-cols-3">
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

      {/* Atouts */}
      <section className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Nos atouts</h2>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
            {atouts.map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 bg-white p-6 text-center transition hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 mx-auto">
                  <a.icon className="h-6 w-6 text-teal-700" />
                </div>
                <p className="font-semibold text-slate-900">{a.title}</p>
                <p className="mt-1 text-sm text-slate-600">{a.desc}</p>
              </div>
            ))}
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
                  <HelpCircle className="h-4 w-4 text-teal-600" />
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
          <h2 className="mb-4 text-3xl font-bold text-slate-900">Soyez protégé dès maintenant</h2>
          <p className="mb-8 text-slate-600">
            Recevez une proposition RC Pro adaptée à votre métier et à votre entreprise.
          </p>
          <Button asChild size="lg" className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
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