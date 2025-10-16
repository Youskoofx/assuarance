// src/pages/FlotteAuto.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Car,
  ShieldCheck,
  Users2,
  CheckCircle2,
  FileText,
  LifeBuoy,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export default function FlotteAuto() {
  const garanties = [
    {
      icon: ShieldCheck,
      title: "Responsabilité civile flotte",
      desc: "Couverture pour chaque véhicule de votre parc en responsabilité civile obligatoire.",
    },
    {
      icon: Car,
      title: "Tous risques partiel / complet",
      desc: "Bris de glace, vol, incendie, collision entre véhicules de la flotte.",
    },
    {
      icon: LifeBuoy,
      title: "Assistance & dépannage",
      desc: "Remorquage, véhicule relais, dépannage sur site pour vos conducteurs.",
    },
    {
      icon: Users2,
      title: "Conducteurs multiples",
      desc: "Couverture pour plusieurs conducteurs, avec options conducteurs occasionnels.",
    },
  ];

  const avantages = [
    {
      icon: FileText,
      title: "Gestion simplifiée",
      desc: "Un contrat unique pour toute votre flotte, reporting centralisé.",
    },
    {
      icon: CheckCircle2,
      title: "Tarifs optimisés",
      desc: "Négociation selon volume et bon comportement, remises possibles.",
    },
    {
      icon: Sparkles,
      title: "Outils connectés",
      desc: "Télématique, suivi des usages, alertes en temps réel (optionnelles).",
    },
  ];

  const faqs = [
    {
      q: "Quelle taille de flotte peut être gérée ?",
      a: "Que vous ayez 2 véhicules ou 100+, nous pouvons adapter le contrat à vos besoins.",
    },
    {
      q: "Puis-je ajouter ou retirer un véhicule en cours d’année ?",
      a: "Oui, avec flexibilité selon votre contrat, vous pouvez ajuster votre flotte.",
    },
    {
      q: "Y a-t-il des conditions d’usage ?",
      a: "Oui, nous déterminons les usages (pro, livraison, mobilité), kilométrage, zones géographiques.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HERO — vidéo Vimeo FULL-BLEED */}
      <section className="relative h-[65vh] min-h-[480px] w-full overflow-hidden">
        {/* Vidéo en arrière-plan, largeur écran, hauteur section */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <iframe
            src="https://player.vimeo.com/video/1127844673?background=1&autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&controls=0"
            className="absolute top-0 left-1/2 h-full w-[100vw] -translate-x-1/2 pointer-events-none"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title="Vidéo Flotte Auto"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Contenu */}
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Couverture flotte • devis gratuit
            </div>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight text-white drop-shadow md:text-6xl">
              Assurance Flotte <span className="text-teal-300">Auto Pro</span>
            </h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90 md:text-xl">
              Gérez tous vos véhicules sous un seul contrat avec des garanties adaptées et
              centralisées.
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
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {garanties.map((g) => (
              <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg">
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

      {/* Avantages */}
      <section className="bg-slate-50 px-8 py-16">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-10 text-center text-3xl font-bold md:text-4xl">Pourquoi choisir la flotte auto ?</h2>
          <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
            {avantages.map((a) => (
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
              <details key={f.q} className="group rounded-xl border border-slate-200 bg-white p-6 transition hover:shadow-sm">
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

      {/* CTA final */}
      <section className="px-8 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-slate-900">Gérez votre flotte en toute sérénité</h2>
          <p className="mb-8 text-slate-600">
            Un expert vous accompagne pour construire une solution sur-mesure selon la taille de votre parc auto.
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