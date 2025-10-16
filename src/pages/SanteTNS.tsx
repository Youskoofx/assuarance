// src/pages/SanteTNS.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Stethoscope,
  HeartPulse,
  Shield,
  HandHeart,
  BadgeCheck,
  Sparkles,
  HelpCircle,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function SanteTNS() {
  const garanties = [
    {
      icon: Stethoscope,
      title: "Soins courants",
      desc: "Consultations, analyses, imagerie, spécialistes.",
    },
    {
      icon: Shield,
      title: "Hospitalisation",
      desc: "Frais hospitaliers, séjours, interventions chirurgicales.",
    },
    {
      icon: HandHeart,
      title: "Médecines douces",
      desc: "Ostéopathie, chiropractie, psychothérapie, etc.",
    },
    {
      icon: BadgeCheck,
      title: "Prévention & bien-être",
      desc: "Bilans santé, dépistages, vaccinations.",
    },
  ];

  const faqs = [
    {
      q: "Qu’est-ce que la complémentaire Santé TNS ?",
      a: "C’est une mutuelle adaptée aux travailleurs non salariés (artisans, commerçants, professions libérales), qui complète le régime obligatoire.",
    },
    {
      q: "Les cotisations sont-elles déductibles ?",
      a: "Oui, dans le cadre de la loi Madelin, sous conditions de statut et de revenus déclarés.",
    },
    {
      q: "Puis-je inclure ma famille ?",
      a: "Oui, les formules peuvent couvrir le conjoint, les enfants selon vos besoins.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/7578801/pexels-photo-7578801.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Dédié aux indépendants
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white md:text-6xl">
              Mutuelle Santé <span className="text-teal-300">TNS</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90">
              Une couverture sur-mesure pour les indépendants : consultations, hospitalisation, prévention.
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
      <section className="px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">Nos garanties clés</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* FAQ */}
      <section className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-10 text-center text-3xl font-bold text-slate-900">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-sm"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                  <span className="font-semibold">{f.q}</span>
                  <HelpCircle className="h-4 w-4 text-teal-600" />
                </summary>
                <p className="mt-3 text-slate-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="px-8 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">Prêt à vous protéger ?</h2>
          <p className="mb-8 text-slate-600">
            Recevez votre mutuelle santé personnalisée. Simple, clair, sans surprise.
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