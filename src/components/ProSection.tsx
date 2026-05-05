import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HardHat,
  Briefcase,
  Building2,
  Truck,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

const DECENNALE_IMG =
  "https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=1600";

const secondary = [
  {
    icon: Briefcase,
    title: "RC Pro",
    description:
      "Couvre les dommages causés à vos clients ou tiers dans l'exercice de votre activité.",
    href: "/pro/rc-pro",
  },
  {
    icon: Building2,
    title: "Multirisque Pro",
    description:
      "Locaux, matériel, stock, perte d'exploitation : votre entreprise protégée.",
    href: "/pro/multirisque",
  },
  {
    icon: Truck,
    title: "Flotte Auto",
    description:
      "Une seule police pour tous les véhicules de votre entreprise.",
    href: "/pro/flotte-auto",
  },
];

const decennalePoints = [
  "Obligatoire avant chaque chantier",
  "10 ans de couverture sur l'ouvrage",
  "Tous corps d'état : maçonnerie, plomberie, électricité, couverture…",
];

export default function ProSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-semibold text-teal-700">
            <ShieldCheck className="h-4 w-4" />
            Vous êtes professionnel ?
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
            Des assurances pensées pour votre entreprise
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600">
            Artisan, indépendant, dirigeant : sécurisez votre activité avec des
            garanties solides, dont la décennale obligatoire pour le BTP.
          </p>
        </motion.div>

        {/* Grid 2 colonnes */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* === Card "feature" Décennale avec photo === */}
          <motion.article
            className="group relative overflow-hidden rounded-3xl shadow-xl lg:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55 }}
          >
            {/* Image background */}
            <img
              src={DECENNALE_IMG}
              alt="Artisan du BTP sur un chantier"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Overlays pour lisibilité */}
            <div className="absolute inset-0 bg-gradient-to-tr from-slate-950 via-slate-950/80 to-slate-950/30" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-transparent" />

            {/* Contenu */}
            <div className="relative flex min-h-[400px] sm:min-h-[440px] md:min-h-[460px] flex-col justify-end p-6 sm:p-8 md:p-10">
              <div className="mb-5 flex items-center gap-3">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30">
                  <HardHat className="h-6 w-6 text-white" />
                </span>
                <span className="rounded-full bg-teal-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal-200 ring-1 ring-teal-300/30">
                  Obligation légale BTP
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
                Assurance Décennale
              </h3>
              <p className="mt-3 max-w-xl text-base leading-relaxed text-slate-200">
                Protégez vos chantiers pendant 10 ans contre les dommages qui
                affectent la solidité de l'ouvrage ou le rendent impropre à sa
                destination.
              </p>

              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {decennalePoints.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-slate-100/90"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-teal-300" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/pro/assurance-decennale"
                  className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02] hover:shadow-teal-500/50"
                >
                  Découvrir la Décennale
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
                <Link
                  to="/devis"
                  className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/5 px-6 py-3 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                >
                  Devis gratuit
                </Link>
              </div>
            </div>
          </motion.article>

          {/* === Stack secondaire : RC Pro / Multirisque / Flotte === */}
          <div className="flex flex-col gap-5 lg:col-span-5">
            {secondary.map((offer, i) => (
              <motion.div
                key={offer.href}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
                className="flex-1"
              >
                <Link
                  to={offer.href}
                  className="group flex h-full items-start gap-5 rounded-2xl border-2 border-slate-100 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-teal-300 hover:shadow-lg"
                >
                  <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-teal-50 transition-colors group-hover:bg-teal-100">
                    <offer.icon className="h-6 w-6 text-teal-600" />
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-bold text-slate-900">
                        {offer.title}
                      </h4>
                      <ArrowRight className="h-4 w-4 text-teal-600 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                      {offer.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link
            to="/devis"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-3.5 font-bold text-white shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02] hover:shadow-teal-500/40"
          >
            Devis Pro gratuit
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-7 py-3.5 font-semibold text-slate-700 transition-colors hover:border-teal-300 hover:text-teal-700"
          >
            Parler à un conseiller
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
