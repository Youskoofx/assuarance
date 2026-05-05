import { useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { sendPersonalEmail } from "@/lib/emails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ShieldCheck,
  Hammer,
  Building2,
  HardHat,
  Wrench,
  Layers,
  Droplets,
  AlertTriangle,
  CheckCircle2,
  Timer,
  HelpCircle,
  Star,
} from "lucide-react";

type FormState = {
  nom: string;
  prenom: string;
  entreprise: string;
  siret: string;
  email: string;
  telephone: string;
  activite: string;
  ville: string;
  ca: string;
  message: string;
  accepte_cgu: boolean;
};

type Status = { type: "idle" | "success" | "error"; message?: string };

const initialForm: FormState = {
  nom: "",
  prenom: "",
  entreprise: "",
  siret: "",
  email: "",
  telephone: "",
  activite: "",
  ville: "",
  ca: "",
  message: "",
  accepte_cgu: false,
};

const activites = [
  "Maçonnerie",
  "Plomberie",
  "Électricité",
  "Menuiserie",
  "Couverture",
  "Autre",
];

const chiffreAffaires = ["< 50k€", "50k-100k€", "100k-250k€", "250k-500k€", "> 500k€"];

export default function AssuranceDecennale() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()), [form.email]);
  const telOk = useMemo(
    () => form.telephone.trim().replace(/\D/g, "").length >= 8,
    [form.telephone]
  );

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (form.nom.trim().length < 2) newErrors.nom = "Nom requis";
    if (form.prenom.trim().length < 2) newErrors.prenom = "Prénom requis";
    if (!form.entreprise.trim()) newErrors.entreprise = "Entreprise requise";
    if (!emailOk) newErrors.email = "Email invalide";
    if (!telOk) newErrors.telephone = "Téléphone requis";
    if (!form.activite) newErrors.activite = "Sélectionne ton activité";
    if (!form.ville.trim()) newErrors.ville = "Ville requise";
    if (!form.ca) newErrors.ca = "Chiffre d'affaires requis";
    if (!form.accepte_cgu) newErrors.accepte_cgu = "Accepte les CGU";
    return newErrors;
  };

  const handleChange = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async () => {
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setLoading(true);
    setStatus({ type: "idle" });

    const payload = {
      type_assurance: "Assurance Décennale",
      details: {
        ...form,
        submitted_at: new Date().toISOString(),
      },
    };

    const composedMessage = [
      `Entreprise: ${form.entreprise}`,
      form.siret ? `SIRET: ${form.siret}` : null,
      `Activité: ${form.activite}`,
      `Chiffre d'affaires: ${form.ca}`,
      `Ville: ${form.ville}`,
      form.message ? `Message: ${form.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      const { error } = await supabase.from("devis").insert([payload]);
      if (error) throw error;

      void sendPersonalEmail({
        nom: form.nom,
        prenom: form.prenom,
        email: form.email,
        telephone: form.telephone,
        type_assurance: "Assurance Décennale",
        ville: form.ville,
        message: composedMessage,
      });

      setStatus({ type: "success", message: "Votre demande a bien été envoyée." });
      setForm(initialForm);
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "Impossible d'envoyer la demande pour le moment. Réessayez dans un instant.",
      });
    } finally {
      setLoading(false);
    }
  };

  const labelClass = "text-sm font-medium text-slate-100 flex items-center gap-2";
  const inputClass =
    "bg-white/10 border border-white/10 text-white placeholder:text-white/60 rounded-xl px-4 py-3 w-full focus-visible:ring-2 focus-visible:ring-teal-400/70 focus-visible:border-teal-300 transition";

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Hero avec photo BTP plein cadre */}
      <section className="relative overflow-hidden min-h-[640px] sm:min-h-[680px] lg:min-h-[720px] flex items-center">
        {/* Image de fond */}
        <img
          src="https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=1920"
          alt="Chantier de construction — assurance décennale"
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          decoding="async"
        />
        {/* Overlays pour lisibilité (compense aussi le header transparent) */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/70 to-slate-950/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-950/40 to-transparent" />

        {/* Contenu — padding-top pour ne pas chevaucher le Header fixe */}
        <div
          className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12"
          style={{ paddingTop: "calc(120px + env(safe-area-inset-top, 0px))" }}
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="space-y-5 sm:space-y-6">
              <p className="inline-flex items-center gap-2 text-teal-200 text-xs sm:text-sm font-semibold bg-teal-400/10 border border-teal-300/30 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
                <ShieldCheck className="w-4 h-4" />
                Protection des professionnels du bâtiment
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight drop-shadow-lg">
                Assurance{" "}
                <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  Décennale
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-200 max-w-2xl leading-relaxed">
                Sécurisez vos chantiers et votre réputation avec une couverture
                décennale conçue pour les artisans, entreprises générales et maîtres
                d'œuvre. Une protection solide, une souscription rapide, un
                accompagnement expert.
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-4 pt-2">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white px-6 py-3 rounded-xl shadow-lg shadow-teal-500/30 transition-all hover:scale-[1.02]"
                  onClick={() =>
                    document
                      .getElementById("form-devis")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Obtenir mon devis
                </Button>
                <div className="flex items-center gap-2 text-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-teal-300" />
                  <span>Réponse sous 24h</span>
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-5 sm:p-6 shadow-2xl">
                <div className="flex items-center gap-3 text-white mb-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-cyan-500 shadow-lg shadow-teal-500/30">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-teal-200">
                      Couverture 10 ans
                    </p>
                    <p className="text-base sm:text-lg font-semibold">
                      Responsabilité civile décennale
                    </p>
                  </div>
                </div>
                <ul className="space-y-3 text-slate-100/95 text-sm sm:text-base">
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-teal-300 flex-shrink-0" />
                    <span>Obligatoire pour la majorité des travaux de construction.</span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-teal-300 flex-shrink-0" />
                    <span>
                      Prend en charge les dommages compromettant la solidité ou la
                      destination de l'ouvrage.
                    </span>
                  </li>
                  <li className="flex gap-2 items-start">
                    <CheckCircle2 className="w-5 h-5 mt-0.5 text-teal-300 flex-shrink-0" />
                    <span>Protège votre trésorerie et votre image auprès des clients.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qu'est-ce que l'assurance décennale */}
      <section className="bg-slate-900/60 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-teal-300 font-semibold text-sm">Comprendre</p>
            <h2 className="text-3xl font-bold">Qu'est-ce que l'assurance décennale ?</h2>
            <p className="text-slate-200 leading-relaxed">
              L'assurance décennale couvre, pendant 10 ans après la réception des travaux, les
              dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa
              destination. Elle est obligatoire pour la plupart des professionnels du bâtiment.
            </p>
            <p className="text-slate-200 leading-relaxed">
              Elle protège à la fois vos clients et votre entreprise : en cas de sinistre, c'est
              l'assureur qui prend en charge les réparations, évitant un impact financier majeur sur
              votre activité.
            </p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, label: "Obligatoire" },
                { icon: Timer, label: "10 ans de couverture" },
                { icon: Layers, label: "Protection solidité" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-teal-300" />
                  <span className="text-sm text-slate-200">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: HardHat, title: "Obligation légale", desc: "Indispensable pour intervenir sur chantier." },
              { icon: HelpCircle, title: "Protection clients", desc: "Rassure vos clients et sécurise vos marchés." },
              { icon: AlertTriangle, title: "Gestion du risque", desc: "L'assureur couvre les réparations majeures." },
              { icon: Star, title: "Crédibilité", desc: "Valorise votre sérieux auprès des donneurs d'ordre." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-4 shadow-lg flex gap-3"
              >
                <item.icon className="w-6 h-6 text-teal-300 shrink-0" />
                <div>
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="text-sm text-slate-200/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À qui s'adresse */}
      <section className="bg-slate-950 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-teal-300 font-semibold text-sm">Public concerné</p>
              <h2 className="text-3xl font-bold">À qui s'adresse cette assurance ?</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Hammer, title: "Artisans du bâtiment", desc: "Maçons, couvreurs, électriciens, plombiers." },
              { icon: Building2, title: "Entrepreneurs", desc: "Entreprises générales et gros œuvre." },
              { icon: Wrench, title: "Sous-traitants", desc: "Intervenants spécialisés sur chantier." },
              { icon: Layers, title: "Maîtres d'œuvre", desc: "Coordination et suivi des travaux." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:-translate-y-1 transition transform shadow-lg"
              >
                <item.icon className="w-6 h-6 text-teal-300 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-200/90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est couvert */}
      <section className="bg-slate-900/60 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-teal-300 font-semibold text-sm">Garanties clés</p>
              <h2 className="text-3xl font-bold">Ce qui est couvert</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: ShieldCheck, title: "Solidité de l'ouvrage", desc: "Dommages compromettant la structure." },
              { icon: Layers, title: "Vices cachés", desc: "Défauts apparaissant après la réception." },
              { icon: AlertTriangle, title: "Malfaçons graves", desc: "Travaux non conformes mettant en danger." },
              { icon: Building2, title: "Défauts de construction", desc: "Erreurs d'exécution ou de conception." },
              { icon: Droplets, title: "Problèmes d'étanchéité", desc: "Infiltrations, fissures, fuites majeures." },
              { icon: HardHat, title: "Dommages structurels", desc: "Affaissement, effondrement partiel ou total." },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg hover:-translate-y-1 transition transform"
              >
                <item.icon className="w-6 h-6 text-teal-300 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-200/90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulaire de devis */}
      <section id="form-devis" className="bg-slate-950 py-16 px-6">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <p className="text-teal-300 font-semibold text-sm">Demande en ligne</p>
            <h2 className="text-3xl font-bold">Obtenez votre devis</h2>
            <p className="text-slate-200 leading-relaxed">
              Remplissez ce formulaire, nous revenons vers vous sous 24h avec une proposition
              personnalisée pour votre assurance décennale.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { icon: Timer, title: "Réponse sous 24h" },
                { icon: CheckCircle2, title: "Devis personnalisé" },
                { icon: ShieldCheck, title: "Accompagnement expert" },
                { icon: Star, title: "Meilleurs tarifs" },
              ].map((item) => (
                <div
                  key={item.title}
                  className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center gap-2"
                >
                  <item.icon className="w-5 h-5 text-teal-300" />
                  <span className="text-sm text-slate-200">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Nom *</label>
                <Input
                  className={inputClass}
                  value={form.nom}
                  onChange={(e) => handleChange("nom", e.target.value)}
                  placeholder="Dupont"
                />
                {errors.nom && <p className="text-sm text-red-300 mt-1">{errors.nom}</p>}
              </div>
              <div>
                <label className={labelClass}>Prénom *</label>
                <Input
                  className={inputClass}
                  value={form.prenom}
                  onChange={(e) => handleChange("prenom", e.target.value)}
                  placeholder="Jean"
                />
                {errors.prenom && <p className="text-sm text-red-300 mt-1">{errors.prenom}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Entreprise *</label>
              <Input
                className={inputClass}
                value={form.entreprise}
                onChange={(e) => handleChange("entreprise", e.target.value)}
                placeholder="Entreprise Générale BTP"
              />
              {errors.entreprise && <p className="text-sm text-red-300 mt-1">{errors.entreprise}</p>}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>SIRET</label>
                <Input
                  className={inputClass}
                  value={form.siret}
                  onChange={(e) => handleChange("siret", e.target.value)}
                  placeholder="123 456 789 00012"
                />
              </div>
              <div>
                <label className={labelClass}>Ville *</label>
                <Input
                  className={inputClass}
                  value={form.ville}
                  onChange={(e) => handleChange("ville", e.target.value)}
                  placeholder="Paris"
                />
                {errors.ville && <p className="text-sm text-red-300 mt-1">{errors.ville}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Email *</label>
                <Input
                  className={inputClass}
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="contact@entreprise.fr"
                />
                {errors.email && <p className="text-sm text-red-300 mt-1">{errors.email}</p>}
              </div>
              <div>
                <label className={labelClass}>Téléphone *</label>
                <Input
                  className={inputClass}
                  value={form.telephone}
                  onChange={(e) => handleChange("telephone", e.target.value)}
                  placeholder="06 12 34 56 78"
                />
                {errors.telephone && <p className="text-sm text-red-300 mt-1">{errors.telephone}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Activité principale *</label>
                <select
                  className={`${inputClass} text-slate-900 rounded-xl bg-white`}
                  value={form.activite}
                  onChange={(e) => handleChange("activite", e.target.value)}
                >
                  <option value="">Sélectionner</option>
                  {activites.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.activite && <p className="text-sm text-red-300 mt-1">{errors.activite}</p>}
              </div>
              <div>
                <label className={labelClass}>Chiffre d'affaires annuel *</label>
                <select
                  className={`${inputClass} text-slate-900 rounded-xl bg-white`}
                  value={form.ca}
                  onChange={(e) => handleChange("ca", e.target.value)}
                >
                  <option value="">Sélectionner</option>
                  {chiffreAffaires.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.ca && <p className="text-sm text-red-300 mt-1">{errors.ca}</p>}
              </div>
            </div>

            <div>
              <label className={labelClass}>Message complémentaire</label>
              <Textarea
                className={`${inputClass} min-h-[120px]`}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                placeholder="Décrivez votre activité, vos chantiers, vos attentes..."
              />
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="cgu"
                checked={form.accepte_cgu}
                onCheckedChange={(checked) => handleChange("accepte_cgu", Boolean(checked))}
              />
              <label htmlFor="cgu" className="text-sm text-slate-200">
                J'accepte les conditions générales d'utilisation *
              </label>
            </div>
            {errors.accepte_cgu && <p className="text-sm text-red-300 mt-1">{errors.accepte_cgu}</p>}

            <Button
              disabled={loading}
              onClick={onSubmit}
              className="w-full bg-gradient-to-r from-teal-400 to-cyan-500 hover:from-teal-500 hover:to-cyan-600 text-white font-semibold py-3 rounded-xl shadow-lg shadow-teal-500/30 hover:scale-[1.01] transition"
            >
              {loading ? "Envoi en cours..." : "Envoyer ma demande"}
            </Button>

            {status.type === "success" && (
              <div className="bg-emerald-500/10 border border-emerald-400/30 text-emerald-100 px-4 py-3 rounded-lg">
                {status.message}
              </div>
            )}
            {status.type === "error" && (
              <div className="bg-red-500/10 border border-red-400/30 text-red-100 px-4 py-3 rounded-lg">
                {status.message}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Pourquoi choisir */}
      <section className="bg-slate-900/60 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
            <div>
              <p className="text-teal-300 font-semibold text-sm">Pourquoi nous</p>
              <h2 className="text-3xl font-bold">Pourquoi choisir Prévoyance Services ?</h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Timer, title: "Réponse sous 24h", desc: "Un conseiller vous recontacte rapidement." },
              { icon: CheckCircle2, title: "Devis personnalisé", desc: "Une offre adaptée à votre activité." },
              { icon: ShieldCheck, title: "Accompagnement expert", desc: "Support dédié pour la souscription." },
              { icon: Star, title: "Meilleurs tarifs", desc: "Optimisation des garanties et du budget." },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-lg">
                <item.icon className="w-6 h-6 text-teal-300 mb-3" />
                <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-slate-200/90 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
