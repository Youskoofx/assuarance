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
import { supabase } from "@/lib/supabase";
import { sendPersonalEmail } from "@/lib/emails";

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
  const [toast, setToast] = useState<{ message: string; variant: "success" | "error" } | null>(
    null
  );
  const adminEmails = useMemo(
    () =>
      (import.meta.env.VITE_ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    []
  );

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

  const handleSubmit = async () => {
    if (!currentValid) return;
    setLoading(true);
    try {
      const payload = {
        type_assurance: formData.type_assurance || "Autre",
        details: {
          ...formData,
          submitted_at: new Date().toISOString(),
        },
      };

      const { error } = await supabase.from("devis").insert([payload]);
      if (error) throw error;

      void sendPersonalEmail({
        nom: formData.nom,
        prenom: formData.prenom,
        email: formData.email,
        telephone: formData.telephone,
        type_assurance: formData.type_assurance,
        ville: formData.ville,
        message: formData.message || formData.details,
      }).catch((err) => console.error("Notification admin failure:", err));

      setToast({ message: "Demande envoyée avec succès !", variant: "success" });
      localStorage.removeItem(DRAFT_KEY);
      setStep(1);
      setFormData(initialForm);
    } catch (err) {
      console.error(err);
      setToast({
        message: "L'envoi du devis a échoué. Merci de réessayer dans un instant.",
        variant: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Stepper sidebar
  const steps = [
    { id: 1, label: "Informations", icon: User2 },
    { id: 2, label: "Type d’assurance", icon: Layers },
    { id: 3, label: "Détails", icon: FileText },
    { id: 4, label: "Finalisation", icon: ShieldCheck },
  ];

  const fieldBase =
    "w-full bg-[#0f1523] border border-white/10 text-slate-50 placeholder:text-white/45 rounded-xl px-4 py-3 text-[14px] shadow-sm transition duration-150 ease-out hover:border-white/20 focus-visible:border-sky-500 focus-visible:ring-2 focus-visible:ring-sky-500/40";
  const errorClass =
    "border-red-500 ring-2 ring-red-400/40 focus-visible:border-red-500 focus-visible:ring-red-400/60";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] to-[#0b0f1a] flex flex-col text-slate-50">
      {/* Hero */}
      <section className="h-[40vh] bg-gradient-to-r from-sky-600 to-cyan-500 flex flex-col justify-center items-center text-white text-center shadow-lg">
        <h1 className="text-5xl font-bold mb-3 tracking-tight drop-shadow-lg">Demande de devis</h1>
        <p className="text-lg opacity-90 max-w-2xl">Obtenez votre devis personnalisé en quelques minutes.</p>
      </section>

      {/* Contenu principal */}
      <section className="flex flex-col lg:flex-row justify-center items-start w-full max-w-7xl mx-auto mt-[-4rem] mb-16 px-6 gap-6">
        {/* Barre latérale */}
        <aside className="lg:w-64 bg-white/5 backdrop-blur-md rounded-3xl shadow-lg p-6 space-y-6 border border-white/10 animate-[fadeIn_.5s_ease]">
          {steps.map((s) => {
            const Icon = s.icon;
            const active = s.id === step;
            const completed = s.id < step;
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all shadow-sm ${
                    completed
                      ? "bg-sky-500 border-sky-500 text-white shadow-md"
                      : active
                      ? "border-sky-400 text-sky-300"
                      : "border-white/15 text-slate-400"
                  }`}
                >
                  {completed ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                </div>
                <span
                  className={`font-medium text-sm ${active ? "text-slate-50" : "text-slate-400"}`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
          <div className="mt-6">
            <Progress value={progress} className="h-2 rounded-full bg-white/10" />
          </div>
        </aside>

        {/* Formulaire principal */}
        <div
          ref={containerRef}
          className="flex-1 bg-[#0b101d] rounded-3xl shadow-2xl border border-white/10 p-8 md:p-12 animate-[slideIn_.5s_ease]"
        >
          {step === 1 && (
            <Step1
              formData={formData}
              setFormData={setFormData}
              touched={touched}
              markTouched={markTouched}
              errorClass={errorClass}
              validators={{ emailOk, telOk, cpOk }}
            />
          )}
          {step === 2 && (
            <Step2 formData={formData} setFormData={setFormData} markTouched={markTouched} />
          )}
          {step === 3 && (
            <Step3
              formData={formData}
              setFormData={setFormData}
              touched={touched}
              markTouched={markTouched}
              errorClass={errorClass}
            />
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
        .form-field {
          background-color: #0f1523;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #f8fafc;
          padding: 12px 16px;
          font-size: 14px;
          transition: border-color 160ms ease, box-shadow 160ms ease, background-color 160ms ease;
        }
        .form-field::placeholder { color: rgba(255, 255, 255, 0.45); }
        .form-field:hover { border-color: rgba(255, 255, 255, 0.18); }
        .form-field:focus { outline: none; border-color: #38bdf8; box-shadow: 0 0 0 2px rgba(56, 189, 248, 0.35); }
        .form-field.error { border-color: #f97373; box-shadow: 0 0 0 2px rgba(249, 115, 115, 0.5); }
        select.form-field {
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 14px;
          padding-inline-end: 40px;
        }
        select.form-field:invalid,
        select.form-field option[value=""],
        select.form-field option[disabled] {
          color: rgba(255, 255, 255, 0.45);
        }
        .toast {
          position: fixed;
          right: 20px;
          bottom: 20px;
          z-index: 50;
          min-width: 260px;
          padding: 14px 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.12);
          background: #0b1220;
          box-shadow: 0 15px 45px rgba(0,0,0,0.45);
          display: flex;
          align-items: center;
          gap: 12px;
          color: #f8fafc;
        }
        .toast-success { border-color: rgba(74, 222, 128, 0.4); }
        .toast-error { border-color: rgba(248, 113, 113, 0.5); }
      `}</style>
      {toast && (
        <div className={`toast ${toast.variant === "success" ? "toast-success" : "toast-error"}`}>
          {toast.variant === "success" ? (
            <Check className="h-5 w-5 text-emerald-400" />
          ) : (
            <ShieldCheck className="h-5 w-5 text-rose-400" />
          )}
          <span className="text-sm">{toast.message}</span>
          <button
            className="ml-auto text-white/60 hover:text-white"
            onClick={() => setToast(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

/* Étapes */
function Step1({ formData, setFormData, touched, markTouched, errorClass, validators }: any) {
  const nomInvalid = touched.nom && formData.nom.trim().length < 2;
  const prenomInvalid = touched.prenom && formData.prenom.trim().length < 2;
  const emailInvalid = touched.email && !validators.emailOk;
  const telInvalid = touched.telephone && !validators.telOk;
  const cpInvalid = touched.code_postal && !validators.cpOk;
  const villeInvalid = touched.ville && formData.ville.trim().length < 2;

  const fieldClass = (invalid: boolean) => `form-field ${invalid ? errorClass : ""}`;

  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-white mb-2">Vos informations personnelles</h2>
      <div>
        <Label>Civilité *</Label>
        <RadioGroup
          value={formData.civilite}
          onValueChange={(val) => setFormData({ ...formData, civilite: val })}
        >
          <div className="flex gap-6 mt-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="M" id="m" className="border-white/20 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500" />
              <span>M.</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <RadioGroupItem value="Mme" id="mme" className="border-white/20 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500" />
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
            placeholder="Dupont"
            className={fieldClass(nomInvalid)}
          />
          {nomInvalid && <p className="text-sm text-red-600 mt-1">2 caractères minimum.</p>}
        </div>
        <div>
          <Label htmlFor="prenom">Prénom *</Label>
          <Input
            id="prenom"
            value={formData.prenom}
            onChange={(e) => setFormData({ ...formData, prenom: e.target.value })}
            onBlur={() => markTouched("prenom")}
            placeholder="Camille"
            className={fieldClass(prenomInvalid)}
          />
          {prenomInvalid && <p className="text-sm text-red-600 mt-1">2 caractères minimum.</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <Label>Email *</Label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            onBlur={() => markTouched("email")}
            placeholder="vous@example.com"
            className={fieldClass(emailInvalid)}
          />
          {emailInvalid && <p className="text-sm text-red-600 mt-1">Format d'email invalide.</p>}
        </div>
        <div>
          <Label>Téléphone *</Label>
          <Input
            type="tel"
            value={formData.telephone}
            onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
            onBlur={() => markTouched("telephone")}
            placeholder="06 12 34 56 78"
            className={fieldClass(telInvalid)}
          />
          {telInvalid && <p className="text-sm text-red-600 mt-1">8 chiffres minimum.</p>}
        </div>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <Label>Date de naissance *</Label>
          <Input
            type="date"
            value={formData.date_naissance}
            onChange={(e) => setFormData({ ...formData, date_naissance: e.target.value })}
            onBlur={() => markTouched("date_naissance")}
            className={fieldClass(touched.date_naissance && !formData.date_naissance)}
          />
        </div>
        <div>
          <Label>Code postal *</Label>
          <Input
            value={formData.code_postal}
            onChange={(e) => setFormData({ ...formData, code_postal: e.target.value })}
            onBlur={() => markTouched("code_postal")}
            placeholder="75001"
            className={fieldClass(cpInvalid)}
          />
          {cpInvalid && <p className="text-sm text-red-600 mt-1">4 à 5 chiffres requis.</p>}
        </div>
        <div>
          <Label>Ville *</Label>
          <Input
            value={formData.ville}
            onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
            onBlur={() => markTouched("ville")}
            placeholder="Paris"
            className={fieldClass(villeInvalid)}
          />
          {villeInvalid && <p className="text-sm text-red-600 mt-1">Ville requise.</p>}
        </div>
      </div>
    </div>
  );
}

function Step2({ formData, setFormData }: any) {
  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-white mb-2">Type d’assurance souhaitée</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {["Santé", "Prévoyance", "Auto", "Habitation", "Animaux"].map((t) => (
          <button
            key={t}
            onClick={() => setFormData({ ...formData, type_assurance: t })}
            className={`p-6 border-2 rounded-xl text-left transition-all shadow-sm ${
              formData.type_assurance === t
                ? "border-sky-500 bg-sky-500/10 shadow-md text-slate-50"
                : "border-white/10 bg-white/[0.03] text-slate-200 hover:border-sky-400/60 hover:-translate-y-0.5"
            }`}
            aria-pressed={formData.type_assurance === t}
          >
            <span className="font-semibold">{t}</span>
            {formData.type_assurance === t && <Check className="text-sky-400 w-5 h-5 ml-2 inline" />}
          </button>
        ))}
      </div>
    </div>
  );
}

function Step3({ formData, setFormData, touched, markTouched, errorClass }: any) {
  const detailsInvalid = touched.details && formData.details.trim().length < 10;

  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-white mb-2">Vos besoins</h2>
      <Textarea
        rows={6}
        placeholder="Décrivez vos besoins pour le type choisi..."
        value={formData.details}
        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
        onBlur={() => markTouched("details")}
        className={`form-field min-h-[140px] ${
          detailsInvalid ? errorClass : ""
        }`}
      />
      {detailsInvalid && <p className="text-sm text-red-600">Merci de détailler votre besoin (10 caractères min.).</p>}
    </div>
  );
}

function Step4({ formData, setFormData }: any) {
  return (
    <div className="space-y-6 animate-[fadeIn_.4s_ease]">
      <h2 className="text-3xl font-bold text-white mb-2">Finalisation</h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <Checkbox
            className="border-2 border-white/20 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500"
            checked={formData.accepte_contact}
            onCheckedChange={(checked) => setFormData({ ...formData, accepte_contact: !!checked })}
          />
          <Label>J'accepte d'être contacté par Prévoyance Services *</Label>
        </div>
        <div className="flex items-start gap-3">
          <Checkbox
            className="border-2 border-white/20 data-[state=checked]:border-sky-500 data-[state=checked]:bg-sky-500"
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
          className="form-field"
        />
      </div>
    </div>
  );
}
