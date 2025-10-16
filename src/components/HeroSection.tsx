// src/components/HeroSection.tsx
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";

type HeroSectionProps = {
  city?: string;
  bgImageUrl?: string;
  /**
   * Hauteur approx. du header (en px) pour le calcul de l'offset mobile.
   * Si tu changes la hauteur du Header, ajuste cette valeur.
   */
  headerHeight?: number;
};

export default function HeroSection({
  city = "Gennevilliers",
  bgImageUrl = "https://images.pexels.com/photos/4262010/pexels-photo-4262010.jpeg?auto=compress&cs=tinysrgb&w=1920",
  headerHeight = 88, // ~logo + padding
}: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate flex min-h-[86vh] items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Fond */}
      <div className="absolute inset-0 -z-20">
        <img
          src={bgImageUrl}
          alt=""
          className="h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* Overlays */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/45 to-black/60 md:from-black/55 md:via-black/35 md:to-black/55" />
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(1200px_600px_at_50%_0%,rgba(255,255,255,.06),transparent)]" />

      {/* Contenu */}
      <div
        className="relative z-10 mx-auto w-full max-w-7xl px-6 text-center"
        /* Offset mobile : headerHeight + safe area iOS */
        style={{
          paddingTop: `calc(${headerHeight}px + env(safe-area-inset-top, 0px))`,
        }}
      >
        <motion.h1
          id="hero-heading"
          className="mx-auto max-w-4xl text-balance font-extrabold text-white
                     leading-[1.08] sm:leading-[1.05]
                     text-[clamp(1.9rem,5.8vw,4.6rem)]"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          Votre courtier d’assurances <br className="hidden sm:block" />
          à <span className="text-teal-300">{city}</span>
        </motion.h1>

        <motion.p
          className="mx-auto mt-3 max-w-2xl text-pretty text-base/7 text-white/90 md:text-lg/8"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 16 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.1 }}
        >
          Des solutions d’assurance personnalisées pour votre santé, votre famille et vos biens.
        </motion.p>

        {/* Badges */}
        <motion.div
          className="mx-auto mt-5 mb-8 flex max-w-3xl flex-wrap items-center justify-center gap-2"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 12 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15 }}
        >
          {[
            "⭐ 94% de satisfaction",
            "⚡ Réponse sous 2h",
            "🔒 Données chiffrées",
          ].map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm"
            >
              {pill}
            </span>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col items-center justify-center gap-3 sm:flex-row"
          initial={prefersReducedMotion ? undefined : { opacity: 0, y: 14 }}
          animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut", delay: 0.2 }}
        >
          <Button
            size="lg"
            className="group bg-gradient-to-r from-teal-400 to-cyan-500 px-7 py-6 text-base font-bold text-white
                       shadow-2xl shadow-teal-500/20 transition-all hover:from-teal-500 hover:to-cyan-600 hover:shadow-teal-500/30"
            asChild
          >
            <Link to="/devis" aria-label="Demander un devis">
              Demander un devis
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white/55 bg-white/0 px-7 py-6 text-base text-white
                       backdrop-blur-sm transition-colors hover:bg-white/10"
            asChild
          >
            <Link to="#services" aria-label="Découvrir nos services">
              Découvrir nos services
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Indicateur scroll */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={prefersReducedMotion ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <ChevronDown className="h-9 w-9 text-white/70" />
      </motion.div>
    </section>
  );
}