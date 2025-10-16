// src/pages/PrevoyancePro.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Shield,
  BriefcaseBusiness,
  HeartPulse,
  HandHeart,
  Baby,
  LifeBuoy,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  FileText,
  PiggyBank,
  Users2,
  Sparkles,
} from "lucide-react";

export default function PrevoyancePro() {
  const garanties = [
    {
      icon: HeartPulse,
      title: "Arrêt de travail",
      desc: "Indemnités journalières pour compenser votre perte de revenus en cas de maladie ou accident (franchise au choix).",
    },
    {
      icon: Shield,
      title: "Invalidité",
      desc: "Rente d’invalidité selon le taux reconnu, pour sécuriser durablement votre niveau de vie.",
    },
    {
      icon: HandHeart,
      title: "Décès",
      desc: "Capital versé aux bénéficiaires, avec options double effet & garanties spécifiques prêt pro.",
    },
    {
      icon: Baby,
      title: "Rente éducation & conjoint",
      desc: "Protection de la famille : rente mensuelle dédiée aux enfants et/ou au conjoint survivant.",
    },
  ];

  const atouts = [
    {
      icon: PiggyBank,
      title: "Fiscalité Madelin (TNS)",
      desc: "Cotisations potentiellement déductibles* dans le cadre Madelin (selon votre situation).",
    },
    {
      icon: FileText,
      title: "Contrats souples",
      desc: "Franchises au choix, options modulables, capitaux personnalisés selon vos charges fixes.",
    },
    {
      icon: Users2,
      title: "Métiers couverts",
      desc: "Artisans, commerçants, professions libérales, dirigeants… Solutions adaptées à chaque métier.",
    },
    {
      icon: LifeBuoy,
      title: "Assistance & services",
      desc: "Accompagnement administratif, téléconseil, aide au retour à l’activité.",
    },
  ];

  const faqs = [
    {
      q: "À qui s’adresse la prévoyance pro ?",
      a: "Aux indépendants (TNS), professions libérales, artisans, commerçants, dirigeants assimilés salariés, freelances… bref, à tous ceux dont le revenu dépend directement de leur activité.",
    },
    {
      q: "Comment choisir mes franchises ?",
      a: "On calcule ensemble votre trésorerie de sécurité et votre capacité à encaisser un aléa. Plus la franchise est longue, plus la cotisation diminue — on trouve le bon équilibre.",
    },
    {
      q: "Quelles pièces fournir pour la souscription ?",
      a: "Pièces d’identité, justificatifs professionnels (Kbis, URSSAF/INSEE, etc.), relevés fiscaux récents, RIB. Selon le capital, un questionnaire de santé peut être demandé.",
    },
    {
      q: "La fiscalité Madelin s’applique-t-elle à moi ?",
      a: "Si vous êtes TNS au réel (BIC/BNC), les cotisations peuvent être déductibles dans les limites réglementaires (*à valider avec votre conseil fiscal*).",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* HERO - Image Pexels */}
      <section className="relative h-[64vh] min-h-[460px] w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url(https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=1920)",
          }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/60" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-8">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
              <Sparkles className="h-4 w-4" />
              Courtiers à vos côtés • Devis gratuit
            </div>
            <h1 className="mb-3 text-4xl font-extrabold leading-[1.1] text-white drop-shadow md:text-6xl">
              Prévoyance <span className="text-teal-300">Professionnels</span>
            </h1>
            <p className="max-w-2xl text-lg text-white/90 md:text-xl">
              Sécurisez vos revenus et protégez vos proches : arrêt de travail, invalidité, décès,
              rente éducation. Des solutions sur-mesure pour TNS & professions libérales.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
                <Link to="/devis" className="flex items-center gap-2">
                  Obtenir un devis
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
                <Link to="/contact">Parler à un courtier</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Pourquoi la prévoyance est indispensable quand on est indépendant ?
          </h2>
          <p className="mt-5 text-lg text-slate-600">
            En cas d’imprévu, vos revenus peuvent chuter brutalement alors que les charges fixes,
            elles, continuent. Une <strong className="text-slate-900">préoyance bien calibrée</strong> sécurise votre activité
            et votre famille, pour traverser les aléas sans mettre en péril votre entreprise.
          </p>
        </div>
      </section>

      {/* Garanties clés */}
      <section className="bg-slate-50 px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-12 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Les garanties essentielles
          </h3>
          <div className="grid gap-6 md:grid-cols-4">
            {garanties.map((g) => (
              <div key={g.title} className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <g.icon className="h-6 w-6 text-teal-700" />
                </div>
                <h4 className="mb-2 text-lg font-bold text-slate-900">{g.title}</h4>
                <p className="text-slate-600">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Atouts pour pros */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-3xl text-center">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">Pensé pour les pros</h3>
            <p className="mt-4 text-slate-600">
              On ajuste les niveaux d’indemnisation à vos charges, à votre trésorerie et à vos objectifs personnels.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-4">
            {atouts.map((a) => (
              <div key={a.title} className="rounded-2xl border border-slate-200 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100">
                  <a.icon className="h-6 w-6 text-teal-700" />
                </div>
                <p className="font-semibold text-slate-900">{a.title}</p>
                <p className="mt-1 text-sm text-slate-600">{a.desc}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-xs text-slate-500">
            *Les informations fiscales sont données à titre indicatif et ne constituent pas un conseil fiscal.
            Rapprochez-vous de votre expert-comptable.
          </p>
        </div>
      </section>

      {/* Process simple */}
      <section className="bg-slate-50 px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h3 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">
            Notre méthode en 4 étapes
          </h3>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              { step: 1, title: "Diagnostic", text: "On analyse vos revenus, charges et besoins." },
              { step: 2, title: "Comparaison", text: "On compare plusieurs assureurs & options." },
              { step: 3, title: "Recommandation", text: "Vous recevez une proposition claire et précise." },
              { step: 4, title: "Souscription", text: "Process 100% en ligne, suivi dédié." },
            ].map((s) => (
              <div key={s.step} className="rounded-2xl border border-slate-200 bg-white p-6">
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 font-bold text-white">
                  {s.step}
                </div>
                <p className="font-semibold text-slate-900">{s.title}</p>
                <p className="text-sm text-slate-600">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bandeau témoignage / rassurance */}
      <section className="px-8 py-14">
        <div className="mx-auto max-w-5xl rounded-2xl border border-slate-200 p-8 md:p-10">
          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-2xl font-bold text-slate-900">
                “Grâce à la prévoyance, j’ai pu maintenir mes revenus pendant 3 mois d’arrêt.”
              </p>
              <p className="mt-1 text-slate-600">Camille — Graphiste freelance</p>
            </div>
            <div className="flex gap-3">
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                ✓ Sans engagement
              </span>
              <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                🔒 Données sécurisées
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-8 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <h3 className="mb-10 text-center text-3xl font-bold text-slate-900 md:text-4xl">Questions fréquentes</h3>
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

      {/* CTA finale */}
      <section className="bg-gradient-to-r from-teal-600 to-cyan-600 px-8 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h3 className="mb-4 text-3xl font-bold text-white md:text-4xl">Sécurisez votre revenu dès maintenant</h3>
          <p className="mx-auto mb-8 max-w-2xl text-white/90">
            Recevez votre proposition de prévoyance personnalisée — simple, clair, et adapté à votre métier.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100 font-bold">
              <Link to="/devis" className="flex items-center justify-center gap-2">
                Demander un devis
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10">
              <Link to="/contact">Besoin de conseils ?</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}