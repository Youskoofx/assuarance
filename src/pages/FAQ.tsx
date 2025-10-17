import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  MessageCircle,
  HelpCircle,
  Inbox,
  Sparkles,
  ShieldPlus,
  HeartPulse,
  CarFront,
  Home,
  Stars,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

/* ----------------------------- Données FAQ ----------------------------- */

type FAQItem = { question: string; answer: string };
type FAQMap = Record<"sante" | "prevoyance" | "iard" | "general", FAQItem[]>;

const FAQ_PAGE: FAQMap = {
  sante: [
    {
      question:
        "Quelle est la différence entre la Sécurité Sociale et une mutuelle ?",
      answer:
        "La Sécurité Sociale rembourse une partie des frais médicaux selon un tarif de base. La mutuelle complète ces remboursements pour réduire ou supprimer le reste à charge.",
    },
    {
      question: "Puis-je changer de mutuelle à tout moment ?",
      answer:
        "Après la première année d’engagement initial, la résiliation est possible à tout moment (préavis d’un mois) selon la réglementation en vigueur.",
    },
    {
      question: "Les soins dentaires sont-ils bien remboursés ?",
      answer:
        "Cela dépend de la formule. Les niveaux supérieurs renforcent les remboursements sur l’orthodontie, les prothèses et certains actes spécifiques.",
    },
    {
      question: "Combien de temps pour être remboursé ?",
      answer:
        "En moyenne sous 48h après la télétransmission. Les délais peuvent varier selon les organismes.",
    },
    {
      question: "Puis-je ajouter mes enfants sur mon contrat ?",
      answer:
        "Oui, via une formule familiale qui couvre conjoint et enfants à charge.",
    },
  ],
  prevoyance: [
    {
      question: "À quoi sert une assurance prévoyance ?",
      answer:
        "Elle protège vos proches en cas de décès, d’invalidité ou d’incapacité, afin de maintenir un niveau de vie et faire face aux imprévus.",
    },
    {
      question: "Quelle différence entre incapacité et invalidité ?",
      answer:
        "L’incapacité est temporaire (arrêt de travail). L’invalidité est permanente et reconnue après consolidation.",
    },
    {
      question: "Le capital décès est-il imposable ?",
      answer:
        "Il bénéficie d’un régime fiscal spécifique et peut être exonéré dans certaines limites, selon la situation au moment du versement.",
    },
    {
      question: "Puis-je choisir mes bénéficiaires ?",
      answer:
        "Oui. Vous désignez librement vos bénéficiaires à la souscription et pouvez les modifier par la suite.",
    },
    {
      question: "Y a-t-il un délai de carence ?",
      answer:
        "Un délai peut s’appliquer à certaines garanties (ex. incapacité). Les délais exacts dépendent du contrat choisi.",
    },
  ],
  iard: [
    {
      question: "L’assurance auto est-elle obligatoire ?",
      answer:
        "Oui. À minima, la responsabilité civile (formule Tiers) est obligatoire pour circuler.",
    },
    {
      question: "Que couvre l’assurance habitation ?",
      answer:
        "Les dommages au logement (incendie, dégâts des eaux, vol, bris de glace) et la responsabilité civile vis-à-vis des tiers, selon les options souscrites.",
    },
    {
      question: "Comment fonctionne le bonus-malus ?",
      answer:
        "Chaque année sans sinistre responsable améliore votre coefficient (bonus). Un sinistre responsable l’augmente (malus).",
    },
    {
      question: "Puis-je assurer une voiture de collection ?",
      answer:
        "Oui, via des contrats spécifiques avec garanties adaptées à l’usage et à la valeur du véhicule.",
    },
    {
      question: "Que faire en cas de sinistre ?",
      answer:
        "Contactez-nous rapidement. Nous vous guidons pour la déclaration, l’expertise et le suivi du dossier.",
    },
  ],
  general: [
    {
      question: "Comment obtenir un devis ?",
      answer:
        "Remplissez le formulaire en ligne ou contactez-nous par téléphone. Un conseiller vous répond sous 24h en moyenne.",
    },
    {
      question: "Vos services sont-ils payants ?",
      answer:
        "Oui, nous appliquons des frais de dossier lors de la souscription. Leur montant varie en fonction du type de contrat choisi.",
    },
    {
      question: "Puis-je gérer mes contrats en ligne ?",
      answer:
        "Oui. Dans votre espace client, consultez vos contrats, téléchargez vos documents et envoyez vos demandes.",
    },
    {
      question: "Combien de temps pour souscrire ?",
      answer:
        "Après validation du dossier, l’activation peut être rapide. Certaines garanties prévoient un délai d’attente.",
    },
    {
      question: "Puis-je résilier mon contrat ?",
      answer:
        "Les conditions dépendent du contrat et de son ancienneté. Elles sont précisées dans vos documents contractuels.",
    },
  ],
};

/* ---------------------- Médias & Icônes de catégories ---------------------- */

const ICONS = {
  sante: <HeartPulse className="w-5 h-5" />,
  prevoyance: <ShieldPlus className="w-5 h-5" />,
  iard: <CarFront className="w-5 h-5" />,
  general: <Home className="w-5 h-5" />,
} as const;

const MEDIA: Record<
  keyof FAQMap,
  { img: string; label: string; sub: string }
> = {
  sante: {
    img: "https://images.pexels.com/photos/7578801/pexels-photo-7578801.jpeg?auto=compress&cs=tinysrgb&w=1920",
    label: "Santé",
    sub: "Remboursements, hospitalisation, optique…",
  },
  prevoyance: {
    img: "https://images.pexels.com/photos/3184416/pexels-photo-3184416.jpeg?auto=compress&cs=tinysrgb&w=1920",
    label: "Prévoyance",
    sub: "Capital décès, incapacité, invalidité…",
  },
  iard: {
    img: "https://images.pexels.com/photos/1399704/pexels-photo-1399704.jpeg?auto=compress&cs=tinysrgb&w=1920",
    label: "IARD",
    sub: "Auto, habitation, responsabilité…",
  },
  general: {
    img: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1920",
    label: "Général",
    sub: "Devis, souscription, espace client…",
  },
};

/* -------------------------- Highlight utilitaire -------------------------- */
function Highlight({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;
  const safe = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`(${safe})`, "ig");
  const parts = text.split(re);
  return (
    <>
      {parts.map((part, i) =>
        re.test(part) ? (
          <mark key={i} className="bg-teal-100 text-teal-800 rounded px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

/* ================================== PAGE ================================== */

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<keyof FAQMap>("sante");
  const [stickyShadow, setStickyShadow] = useState(false);
  const tabsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => setStickyShadow(window.scrollY > 120);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resultsCount = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const counts = { sante: 0, prevoyance: 0, iard: 0, general: 0 } as Record<
      keyof FAQMap,
      number
    >;
    (Object.keys(FAQ_PAGE) as (keyof FAQMap)[]).forEach((k) => {
      counts[k] = FAQ_PAGE[k].filter(
        (it) =>
          !q ||
          it.question.toLowerCase().includes(q) ||
          it.answer.toLowerCase().includes(q)
      ).length;
    });
    return counts;
  }, [searchQuery]);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = FAQ_PAGE[activeTab];
    if (!q) return list;
    return list.filter(
      (it) =>
        it.question.toLowerCase().includes(q) ||
        it.answer.toLowerCase().includes(q)
    );
  }, [activeTab, searchQuery]);

  const suggestions = [
    "remboursement",
    "résiliation",
    "sinistre",
    "bonus-malus",
    "hospitalisation",
  ];

  return (
    <div className="bg-white text-slate-800">
      {/* =============================== HERO =============================== */}
      <section className="relative h-[52vh] flex items-center overflow-hidden">
        {/* Image */}
        <img
          src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Conseillers Prévoyance Services"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Dégradés + motifs */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/75 via-teal-600/65 to-cyan-600/60" />
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_20%_20%,white_0,transparent_30%),radial-gradient(circle_at_80%_30%,white_0,transparent_28%),radial-gradient(circle_at_60%_80%,white_0,transparent_25%)]" />
        {/* Contenu */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-8">
          <motion.nav
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white/80 text-sm mb-3"
            aria-label="Fil d’Ariane"
          >
            <Link to="/" className="hover:text-white">
              Accueil
            </Link>{" "}
            / <span className="text-white">FAQ</span>
          </motion.nav>

          <motion.h1
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="text-5xl md:text-6xl font-bold text-white mb-3 tracking-tight"
          >
            Questions fréquentes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-white/90 text-lg md:text-xl max-w-3xl"
          >
            Des réponses nettes sur la santé, la prévoyance et l’IARD — avec un
            accompagnement humain, à chaque étape.
          </motion.p>
        </div>

        {/* Carte recherche flottante */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-[min(92%,900px)]"
        >
          <div className="rounded-2xl bg-white/70 backdrop-blur border border-white/60 shadow-xl">
            <div className="p-5 sm:p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  type="text"
                  placeholder="Rechercher une question… (ex. remboursement, résiliation)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 py-6 text-lg border-slate-200 rounded-xl focus:ring-2 focus:ring-teal-500"
                  aria-label="Rechercher une question dans la FAQ"
                />
                <div className="absolute -right-1 -top-1 hidden md:flex items-center gap-1 rounded-full bg-white/90 shadow px-2 py-1 text-[11px] text-slate-600">
                  <Sparkles className="w-3.5 h-3.5" />
                  Astuce : utilisez des mots-clés précis
                </div>
              </div>

              {/* Suggestions */}
              <div className="mt-3 flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSearchQuery(s)}
                    className="px-3 py-1.5 text-sm rounded-full border border-slate-200 text-slate-600 hover:border-teal-500 hover:text-teal-600 transition"
                    aria-label={`Chercher ${s}`}
                  >
                    #{s}
                  </button>
                ))}
              </div>
            </div>

            {/* progress dynamique */}
            <div className="h-1 w-full overflow-hidden rounded-b-2xl bg-slate-100">
              <motion.div
                key={activeTab + searchQuery}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-teal-400 via-cyan-400 to-teal-500"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Spacer sous la carte */}
      <div className="h-24" />

      {/* ===================== STICKY NAV + MEDIA CATEGORIE ===================== */}
      <div
        ref={tabsRef}
        className={`sticky top-0 z-30 backdrop-blur bg-white/70 transition-shadow ${
          stickyShadow ? "shadow-md" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 py-4">
          <div className="grid lg:grid-cols-3 gap-6 items-center">
            {/* Media */}
            <div className="hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={MEDIA[activeTab].img}
                  alt={MEDIA[activeTab].label}
                  className="w-full h-[180px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur px-3 py-1 text-white">
                    {ICONS[activeTab]}
                    <span className="font-medium">{MEDIA[activeTab].label}</span>
                  </div>
                  <p className="text-white/85 text-sm mt-2">{MEDIA[activeTab].sub}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="lg:col-span-2">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as keyof FAQMap)}
                className="w-full"
              >
                <TabsList className="grid grid-cols-4 bg-slate-100 rounded-xl p-2">
                  {(Object.keys(MEDIA) as (keyof FAQMap)[]).map((key) => (
                    <TabsTrigger
                      key={key}
                      value={key}
                      className="text-sm md:text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-teal-600 data-[state=active]:shadow"
                    >
                      <span className="mr-2 hidden sm:inline">{ICONS[key]}</span>
                      {MEDIA[key].label}
                      {searchQuery && (
                        <span className="ml-2 text-[11px] text-slate-500">
                          ({resultsCount[key]})
                        </span>
                      )}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {(Object.keys(MEDIA) as (keyof FAQMap)[]).map((key) => (
                  <TabsContent key={key} value={key} />
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* ================================ CONTENU ================================ */}
      <section className="py-16 px-8">
        <div className="max-w-7xl mx-auto">
          {filtered.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((faq, idx) => (
                <motion.div
                  key={`${activeTab}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.03 }}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-0.5 transition"
                >
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item" className="px-5">
                      <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-teal-600 py-5">
                        <Highlight text={faq.question} query={searchQuery} />
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed pb-5">
                        <Highlight text={faq.answer} query={searchQuery} />
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
              <Inbox className="w-10 h-10 mx-auto mb-3 text-slate-400" />
              <p className="font-semibold text-slate-800 mb-1">
                Aucun résultat pour “{searchQuery}”
              </p>
              <p className="text-slate-600">
                Essayez un autre mot-clé, ou{" "}
                <Link
                  to="/contact"
                  className="text-teal-600 hover:underline font-medium"
                >
                  contactez-nous
                </Link>{" "}
                pour une réponse personnalisée.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ================================ CTA FINAL ================================ */}
      <section className="relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Conseiller à l'écoute"
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-teal-700/85 via-teal-600/75 to-cyan-600/75" />
        <div className="absolute -left-10 -bottom-10 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -right-10 -top-10 w-[360px] h-[360px] rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-8 py-20 text-center text-white">
          <Stars className="w-14 h-14 mx-auto mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Besoin d’un accompagnement humain&nbsp;?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Nos conseillers vous répondent rapidement avec des solutions claires et adaptées.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-white text-teal-700 hover:bg-slate-50 font-bold px-8 py-6 text-lg"
              asChild
            >
              <Link to="/contact">Contacter un conseiller</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white/85 text-white hover:bg-white/10 font-bold px-8 py-6 text-lg"
              asChild
            >
              <Link to="/devis">Demander un devis</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-white/85 text-sm">
            <HelpCircle className="w-4 h-4" />
            <span>Disponibles du lundi au vendredi 9h–18h, samedi 9h–12h</span>
          </div>
        </div>
      </section>
    </div>
  );
}