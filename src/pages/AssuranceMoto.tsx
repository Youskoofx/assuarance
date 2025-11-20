import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Bike,
  ShieldCheck,
  Sparkles,
  GaugeCircle,
  MapPin,
  HeartPulse,
  Wrench,
  FileCheck,
  AlarmClock,
  UserCheck,
  ArrowRight,
  Info,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const protections = [
  {
    icon: ShieldCheck,
    title: "Responsabilité civile renforcée",
    description:
      "Protection indispensable en cas de dommages causés à un tiers, avec extension conducteur incluse.",
  },
  {
    icon: HeartPulse,
    title: "Protection du conducteur",
    description:
      "Indemnisation corporelle jusqu’à 1 000 000 € pour maintenir vos revenus, même en cas d’accident responsable.",
  },
  {
    icon: Wrench,
    title: "Assistance panne & accident",
    description:
      "Dépannage 0 km, véhicule de remplacement et rapatriement des personnes, 24h/24 en France et en Europe.",
  },
  {
    icon: Sparkles,
    title: "Dommages tous accidents",
    description:
      "Prise en charge des réparations ou de la valeur du véhicule en cas de chute, vandalisme ou catastrophe naturelle.",
  },
];

const profils = [
  {
    title: "Moto de collection",
    description:
      "Valeur agréée, pièces rares, roulages occasionnels. Contrat calibré pour vos sorties passion.",
  },
  {
    title: "Deux-roues au quotidien",
    description:
      "Scooter, 125cc, trail ou roadster : assistance 0 km et équipements assurés pour vos trajets urbains.",
  },
  {
    title: "Usage intensif",
    description:
      "Moto A2, sportive ou grande routière : couverture maximale et options premium sur mesure.",
  },
  {
    title: "VTC / coursiers",
    description:
      "Responsabilité professionnelle, garantie revenus et prêts de véhicule pour un service ininterrompu.",
  },
];

const garanties = [
  {
    label: "Responsabilité civile",
    detail: "Obligatoire. Incluse dans toutes nos offres.",
    level: "Essentiel",
  },
  {
    label: "Protection conducteur jusqu’à 1 M€",
    detail: "Rente et capital en cas de blessures graves.",
    level: "Essentiel",
  },
  {
    label: "Bris d’équipement & accessoires",
    detail: "Casques, gants, top-case, GPS… jusqu’à 2 500 €.",
    level: "Confort",
  },
  {
    label: "Vol et incendie",
    detail: "Indemnisation à valeur à neuf sur 24 mois.",
    level: "Confort",
  },
  {
    label: "Dommages tous accidents",
    detail: "Chute, vandalisme, catastrophes naturelles.",
    level: "Premium",
  },
  {
    label: "Garantie équipements pilotes",
    detail: "Combinaisons et airbags certifiés assurés sans vétusté.",
    level: "Premium",
  },
];

const faq = [
  {
    question: "Comment est calculée ma cotisation ?",
    answer:
      "Elle dépend de votre véhicule (cylindrée, valeur, modifications), de votre bonus/malus, de vos kilomètres annuels, de vos antécédents et des options choisies. Nos conseillers vous accompagnent pour optimiser le rapport garanties/prix.",
  },
  {
    question: "Puis-je assurer ma moto uniquement pour l’hiver ?",
    answer:
      "Oui. Avec l’option saisonnière, vous bénéficiez d’une couverture modulée selon votre usage annuel : baisse de cotisation pendant l’hivernage tout en conservant les protections essentielles (incendie, vol, dommages stockage).",
  },
  {
    question: "Que se passe-t-il si je prête ma moto ?",
    answer:
      "Nos contrats incluent la conduite occasionnelle. Si le conducteur prêté est en permis probatoire, signalez-le pour ajuster la franchise et conserver votre indemnisation optimale.",
  },
  {
    question: "Comment déclarer un sinistre ?",
    answer:
      "Déclarez en ligne, via notre messagerie sécurisée ou par téléphone. Nous missionnons un expert sous 48h et assurons le suivi des réparations jusqu’à la restitution du véhicule.",
  },
];

export default function AssuranceMoto() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1600&q=80"
            alt="Motard sur route"
            className="h-full w-full object-cover brightness-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/90 via-slate-950/70 to-slate-950/95" />
        </div>

        <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-6 pb-24 pt-36 lg:flex-row lg:items-center">
          <div className="space-y-6 lg:w-1/2">
            <Badge className="bg-emerald-500/20 text-emerald-100">
              Assurance deux-roues
            </Badge>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Assurance moto premium, pensée pour les passionnés et les pros
            </h1>
            <p className="text-lg text-white/70">
              Une couverture sur-mesure pour chaque style de conduite : route,
              urbain, sportive ou collection. Garanties renforcées, assistance
              immédiate et accompagnement sinistre avec réparation certifiée.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-white text-slate-900 hover:bg-slate-100"
              >
                <Link to="/devis">
                  Obtenir un devis immédiat
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                <Link to="/contact">Être rappelé par un expert</Link>
              </Button>
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/60">
              <span className="flex items-center gap-2">
                <GaugeCircle className="h-4 w-4 text-emerald-200" />
                Tarifs adaptés aux permis A2 & customs
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-emerald-200" />
                Assistance France & Europe 24/7
              </span>
            </div>
          </div>
          <div className="lg:w-1/2">
            <Card className="border-white/10 bg-white/10 backdrop-blur">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-3 text-lg text-white">
                  <Bike className="h-5 w-5 text-emerald-200" />
                  Exemples de protections incluses
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                {protections.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex items-center gap-3 text-white">
                      <item.icon className="h-5 w-5 text-emerald-200" />
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                    </div>
                    <p className="mt-2 text-sm text-white/70">
                      {item.description}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          {profils.map((profil) => (
            <Card
              key={profil.title}
              className="border-white/10 bg-white/[0.04] text-white transition hover:bg-white/[0.06]"
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  {profil.title}
                  <Badge variant="outline" className="border-white/20 text-xs">
                    Sur mesure
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="text-white/70">
                {profil.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="relative bg-slate-900/60 py-20">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Badge className="bg-emerald-500/20 text-emerald-100">
                Comparatif clair
              </Badge>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                Trois niveaux de protection pour vos besoins
              </h2>
              <p className="mt-2 text-white/70">
                Chaque formule inclut les garanties essentielles avec possibilité
                de personnaliser options et franchises.
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-white/5 text-white hover:bg-white/10"
            >
              <Link to="/devis">Comparer via un conseiller</Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
            <ScrollArea className="h-[460px]">
              <div className="divide-y divide-white/5">
                {garanties.map((garantie) => (
                  <div
                    key={garantie.label}
                    className="grid gap-6 px-6 py-5 sm:grid-cols-[2fr_3fr_1fr]"
                  >
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {garantie.label}
                      </h3>
                      <p className="mt-1 text-sm text-white/60">
                        {garantie.detail}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-white/70">
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50">
                        Couverture nationale
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white/50">
                        Assistance incluse
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      <Badge className="border border-emerald-200/40 bg-emerald-500/20 text-emerald-100">
                        {garantie.level}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <Badge className="bg-white/10 text-white">Nos engagements</Badge>
            <h2 className="text-3xl font-semibold">
              Un accompagnement humain, des garanties hautement protectrices
            </h2>
            <div className="space-y-4 text-white/70">
              <p>
                Nous assurons plus de 2 500 motards, conducteurs urbains comme
                passionnés, avec des solutions pour chaque profil : scooter,
                moto 125, sportive, custom, trail, enduro, moto rétro, side-car…
              </p>
              <p>
                Chaque dossier est audité par un conseiller dédié afin
                d’optimiser prix, franchises, extensions (équipements pilote,
                accessoires, valeur d’achat prolongée) et options saisonnières.
              </p>
              <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="flex items-center gap-2 text-sm text-white/60">
                  <Info className="h-4 w-4 text-emerald-200" />
                  En cas de sinistre, vous êtes accompagné par un gestionnaire
                  dédié jusqu’à l’indemnisation finale. Accès direct depuis
                  l’espace client ou via notre messagerie chiffrée.
                </p>
              </div>
            </div>
          </div>
          <Card className="border-white/10 bg-white/[0.06] text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <FileCheck className="h-5 w-5 text-emerald-200" />
                Prendre la route en 3 étapes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 text-sm text-white/70">
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-semibold text-emerald-100">
                  1
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Devis personnalisé en 5 minutes
                  </h3>
                  <p className="mt-1">
                    Renseignez votre moto et vos besoins, nos experts comparent
                    les meilleures garanties du marché.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-semibold text-emerald-100">
                  2
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Signature électronique et attestation instantanée
                  </h3>
                  <p className="mt-1">
                    Validez votre contrat en ligne, recevez vos attestations
                    immédiates dans l’espace client sécurisé.
                  </p>
                </div>
              </div>
              <div className="flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-lg font-semibold text-emerald-100">
                  3
                </span>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Accompagnement sinistre premium
                  </h3>
                  <p className="mt-1">
                    Déclarez en ligne, suivi par un expert dédié, réparation
                    dans le réseau agréé ou garage partenaire de votre choix.
                  </p>
                </div>
              </div>
              <Button
                asChild
                className="mt-4 w-full bg-white text-slate-900 hover:bg-slate-100"
              >
                <Link to="/espace-client">Créer mon espace client</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="relative bg-slate-900/70 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Badge className="bg-white/10 text-white">Questions fréquentes</Badge>
              <h2 className="mt-3 text-3xl font-semibold">
                Tout savoir sur nos assurances moto
              </h2>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-white/30 bg-white/10 text-white hover:bg-white/20"
            >
              <Link to="/contact">Parler à un expert</Link>
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {faq.map((item) => (
              <Card
                key={item.question}
                className="border-white/10 bg-white/[0.05] text-white"
              >
                <CardHeader>
                  <CardTitle className="flex items-start gap-2 text-lg">
                    <UserCheck className="mt-1 h-5 w-5 text-emerald-200" />
                    {item.question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-white/70">
                  {item.answer}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 via-cyan-500 to-sky-500" />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-6 py-16 text-center text-white">
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Prêt à prendre la route ? Obtenez votre attestation en moins de 24h.
          </h2>
          <p className="max-w-2xl text-lg text-white/80">
            Remplissez notre formulaire sécurisé ou contactez directement un
            conseiller moto. Nous préparons un devis comparatif et activons vos
            garanties à la date souhaitée.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-black/80 text-white hover:bg-black/70"
            >
              <Link to="/devis">Demander un devis moto</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/60 bg-white/10 text-white hover:bg-white/20"
            >
              <a href="tel:+33180050050">01 80 05 00 50</a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
