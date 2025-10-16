import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  User2,
  Layers,
  FileText,
  ShieldCheck,
} from "lucide-react";

/**
 * Formulaire Devis — Version haut de gamme avec barre latérale animée
 */

const DRAFT_KEY = "devis_stepper_draft_v2";

type FormData = {
  civilite: "" | "M" | "Mme";
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  date_naissance: string;
  code_postal: string;
  ville: string;
  type_assurance: "" | "Santé" | "Prévoyance" | "Auto" | "Habitation" | "Animaux";
  details: string;
  message: string;
  accepte_contact: boolean;
  accepte_cgu: boolean;
};

const initialForm: FormData = {
  civilite: "",
  nom: "",
  prenom: "",
  email: "",
  telephone: "",
  date_naissance: "",
  code_postal: "",
  ville: "",
  type_assurance: "",
  details: "",
  message: "",
  accepte_contact: false,
  accepte_cgu: false,
};

export default function Devis() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Restore autosave
  useEffect(() => {
    const raw = localStorage.getItem(DRAFT_KEY);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as FormData;
        setFormData({ ...initialForm, ...parsed });
      } catch {}
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(DRAFT_KEY, JSON.stringify(formData));
  }, [formData]);

  // Helpers validations
  const emailOk = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()), [formData.email]);
  const telOk = useMemo(() => formData.telephone.trim().replace(/\D/g, "").length >= 8, [formData.telephone]);
  const cpOk = useMemo(() => /^\d{4,5}$/.test(formData.code_postal.trim()), [formData.code_postal]);

  const step1Valid =
    !!formData.civilite &&
    formData.nom.length > 1 &&
    formData.prenom.length > 1 &&
    emailOk &&
    telOk &&
    !!formData.date_naissance &&
    cpOk &&
    formData.ville.length > 1;

  const step2Valid = !!formData.type_assurance;
  const step3Valid = formData.details.trim().length >= 10;
  const step4Valid = formData.accepte_contact && formData.accepte_cgu;

  const currentValid = [step1Valid, step2Valid, step3Valid, step4Valid][step - 1];
  const progress = (step / 4) * 100;

  const markTouched = (name: string) => setTouched((t) => ({ ...t, [name]: true }));

  // Keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter") next();
      if (e.key === "Escape") localStorage.removeItem(DRAFT_KEY);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, currentValid]);

  const next = () => {
    if (!currentValid) return;
    setStep((s) => Math.min(4, s + 1));
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const handleSubmit = () => {
    if (!currentValid) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("✅ Demande envoyée avec succès !");
      localStorage.removeItem(DRAFT_KEY);
      setStep(1);
      setFormData(initialForm);
    }, 1200);
  };

  // Stepper sidebar
  const steps = [
    { id: 1, label: "Informations", icon: User2 },
    { id: 2, label: "Type d’assurance", icon: Layers },
    { id: 3, label: "Détails", icon: FileText },
    { id: 4, label: "Finalisation", icon: ShieldCheck },
  ];

  const errorClass =
    "border-red-500 focus-visible:ring-red-200 focus-visible:border-red-500";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Hero */}
      <section className="h-[40vh] bg-gradient-to-r from-teal-500 to-cyan-600 flex flex-col justify-center items-center text-white text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-3 tracking-tight">Demande de devis</h1>
        <p className="text-lg opacity-90 max-w-2xl">Obtenez votre devis personnalisé en quelques minutes.</p>
      </section>

      {/* Contenu principal */}
      <section className="flex flex-col lg:flex-row justify-center items-start w-full max-w-7xl mx-auto mt-[-4rem] mb-16 px-6 gap-6">
        {/* Barre latérale */}
        <aside className="lg:w-64 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg p-6 space-y-6 border border-slate-100 animate-[fadeIn_.5s_ease]">
          {steps.map((s) => {
            const Icon = s.icon;
            const active = s.id === step;
            const completed = s.id < step;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    completed
                      ? "bg-teal-500 border-teal-500 text-white"
                      : active
                      ? "border-teal-500 text-teal-600"
                      : "border-slate-300 text-slate-400"
                  }`}
                >
                  {completed ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`font-medium text-sm ${
                    active ? "text-teal-700" : "text-slate-600"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
          <div className="mt-6">
            <Progress value={progress} className="h-2 rounded-full" />
          </div>
        </aside>

        {/* Formulaire principal */}
        <div
          ref={containerRef}
          className="flex-1 bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 animate-[slideIn_.5s_ease]"
        >
          {step === 1 && (
            <Step1 formData={formData} setFormData={setFormData} markTouched={markTouched} errorClass={errorClass} />
          )}
          {step === 2 && (
            <Step2 formData={formData} setFormData={setFormData} markTouched={markTouched} />
          )}
          {step === 3 && (
            <Step3 formData={formData} setFormData={setFormData} markTouched={markTouched} errorClass={errorClass} />
          )}
          {step === 4 && (
            <Step4 formData={formData} setFormData={setFormData} markTouched={markTouched} />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-10 pt-8 border-t border-slate-200">
            {step > 1 ? (
              <Button variant="outline" onClick={prev} className="border-2 border-slate-300">
                <ArrowLeft className="w-4 h-4 mr-2" /> Précédent
              </Button>
            ) : (
              <div />
            )}
            {step < 4 ? (
              <Button
                onClick={next}
                disabled={!currentValid}
                className="ml-auto bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold disabled:opacity-60"
              >
                Suivant <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!currentValid || loading}
                className="ml-auto bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold disabled:opacity-60"
              >
                {loading ? "Envoi en cours..." : "Envoyer ma demande"}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* animations */}
      <style>{`
        @keyframes fadeIn { from { opacity:0; transform: translateY(10px);} to {opacity:1; transform:translateY(0);} }
        @keyframes slideIn { from { opacity:0; transform:translateX(15px);} to {opacity:1; transform:translateX(0);} }
      `}</style>
    </div>
  );
}

/* Étapes */
function Step1({ formData, setFormData, markTouched, errorClass }: any) {
  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Vos informations personnelles</h2>
      <div>
        <Label>Civilité *</Label>
        <RadioGroup
          value={formData.civilite}
          onValueChange={(val) => setFormData({ ...formData, civilite: val })}
        >
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="M" id="m" />
              <span>M.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="Mme" id="mme" />
              <span>Mme</span>
            </label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nom">Nom *</Label>
          <Input
            id="nom"
            value={formData.nom}
            onChange={(e) => setFormData({ ...formData, nom: e.target.value })}
            onBlur={() => markTouched("nom")}
            className={!formData.nom ? errorClass : ""}
          />
        </div>
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            value={formData.prom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Email *</Label>
          <Input
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <div>
          <Label>Téléphone *</Label>
          <Input
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
          />
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label>Date de naissance *</Label>
          <Input
            type="date"
            value={formData.date_naissance}
            onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
          />
        </div>
        <div>
          <Label>Code postal *</Label>
          <Input
            value={formData.code_postal}
            onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
          />
        </div>
        <div>
          <Label>Ville *</Label>
          <Input
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
          />
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, setFormData }: any) {
  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Type d’assurance souhaitée</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {["Santé", "Prévoyance", "Auto", "Habitation", "Animaux"].map((t) => (
          <button
            key={t}
            onClick={() => setFormData({ ...formData, type_assurance: t })}
            className={`p-6 border-2 rounded-xl text-left transition-all ${
              formData.type_assurance === t
                ? "border-teal-500 bg-teal-50"
                : "border-slate-200 hover:border-teal-300"
            }`}
          >
            <span className="font-semibold">{t}</span>
            {formData.type_assurance === t && <Check className="text-teal-600 w-5 h-5 ml-2 inline" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3({ formData, setFormData }: any) {
  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Vos besoins</h2>
      <Textarea
        rows={6}
        placeholder="Décrivez vos besoins pour le type choisi..."
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
      />
    </div>
  );
}

function Step4({ formData, setFormData }: any) {
  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-slate-900 mb-2">Finalisation</h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            checked={formData.accepte_contact}
            onCheckedChange={(checked) => setFormData({ ...formData, accepte_contact: !!checked })}
          />
          <Label>J'accepte d'être contacté par Prévoyance Services *</Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={formData.accepte_cgu}
            onCheckedChange={(checked) => setFormData({ ...formData, accepte_cgu: !!checked })}
          />
          <Label>J'accepte les conditions générales d'utilisation *</Label>
        </div>
      </div>
      <div>
        <Label>Message complémentaire</Label>
        <Textarea
          rows={3}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          placeholder="Ajoutez des précisions si nécessaire..."
        />
      </div>
    </div>
  );
}