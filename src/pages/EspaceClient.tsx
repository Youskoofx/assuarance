// src/pages/EspaceClient.tsx
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
  Phone,
  Calendar,
  MapPin,
  Info,
  Loader2,
} from "lucide-react";

/* ───────────────────────────────────────────────────────────── */

type Mode = "login" | "signup";
const MIN_PWD = 8;

export default function EspaceClient() {
  const [mode, setMode] = useState<Mode>("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [capsOn, setCapsOn] = useState(false);
  const [remember, setRemember] = useState(true);

  const navigate = useNavigate();
  const { signIn, signUp, signInWithGoogle } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    // inscription
    prenom: "",
    nom: "",
    telephone: "",
    date_naissance: "",
    adresse: "",
    code_postal: "",
    ville: "",
    cgu_ok: false,
  });

  /* ── Validation helpers ───────────────────────────────────── */
  const emailOk = useMemo(
    () => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()),
    [form.email]
  );
  const phoneOk = useMemo(
    () => (form.telephone ? form.telephone.replace(/\D/g, "").length >= 8 : true),
    [form.telephone]
  );
  const cpOk = useMemo(
    () => (form.code_postal ? /^\d{4,5}$/.test(form.code_postal.trim()) : true),
    [form.code_postal]
  );
  const pwdScore = useMemo(() => {
    const p = form.password;
    let s = 0;
    if (p.length >= MIN_PWD) s++;
    if (/[a-z]/.test(p)) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/\d/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s; // 0..5
  }, [form.password]);

  const canLogin = emailOk && form.password.length > 0;
  const canSignup =
    emailOk &&
    form.password.length >= MIN_PWD &&
    form.prenom.trim() &&
    form.nom.trim() &&
    phoneOk &&
    cpOk &&
    form.ville.trim() &&
    form.adresse.trim() &&
    form.date_naissance &&
    form.cgu_ok;

  const canSubmit = mode === "login" ? canLogin : Boolean(canSignup);

  /* ── UX: CapsLock detection ───────────────────────────────── */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.getModifierState) setCapsOn(e.getModifierState("CapsLock"));
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKey);
    };
  }, []);

  /* ── Submit handlers ──────────────────────────────────────── */
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setError("");
    setLoading(true);
    try {
      if (mode === "login") {
        await signIn(form.email, form.password, { remember });
      } else {
        await signUp(form.email, form.password, {
          prenom: form.prenom,
          nom: form.nom,
          telephone: form.telephone,
          date_naissance: form.date_naissance,
          adresse: form.adresse,
          code_postal: form.code_postal,
          ville: form.ville,
          cgu_ok: form.cgu_ok,
        });
      }
      navigate("/espace-client/dashboard");
    } catch (err: any) {
      setError(humanizeAuthError(err?.message || "Une erreur est survenue."));
    } finally {
      setLoading(false);
    }
  };

  const google = async () => {
    setError("");
    setLoading(true);
    try {
      await signInWithGoogle();
      navigate("/espace-client/dashboard");
    } catch (err: any) {
      setError(humanizeAuthError(err?.message || "Connexion Google impossible."));
    } finally {
      setLoading(false);
    }
  };

  /* ── UI ───────────────────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-[radial-gradient(1000px_600px_at_10%_0%,rgba(20,184,166,.12),transparent),radial-gradient(900px_600px_at_90%_0%,rgba(34,211,238,.12),transparent)]">
      {/* Cap sombre derrière le header */}
      <div className="fixed top-0 left-0 right-0 h-28 z-40 pointer-events-none bg-gradient-to-b from-slate-900/80 via-slate-900/45 to-transparent" />

      {/* container sous le header */}
      <div className="mx-auto max-w-6xl px-6 pt-28 pb-16 relative z-10">
        {/* onglets */}
        <div className="mx-auto mb-5 flex max-w-3xl overflow-hidden rounded-xl border border-slate-200 bg-white/70 p-1 backdrop-blur">
          <Tab active={mode === "login"} onClick={() => setMode("login")}>
            Connexion
          </Tab>
          <Tab active={mode === "signup"} onClick={() => setMode("signup")}>
            Inscription
          </Tab>
        </div>

        <section className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.1fr_.9fr]">
          {/* Card form */}
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-xl backdrop-blur md:p-8">
            {/* heading */}
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-teal-100">
                <Shield className="h-5 w-5 text-teal-700" />
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                {mode === "login" ? "Connexion" : "Créer un compte"}
              </h1>
              <p className="mt-1 text-sm text-slate-600">
                {mode === "login"
                  ? "Accédez à votre espace personnel"
                  : "Complétez vos informations pour activer votre espace"}
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700 animate-[shake_.25s_ease]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <Button
              variant="outline"
              className="mb-4 w-full border-slate-300"
              onClick={google}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Chargement…
                </>
              ) : (
                <>
                  <GoogleIcon className="mr-2 h-4 w-4" />
                  Continuer avec Google
                </>
              )}
            </Button>

            <OrDivider />

            <form onSubmit={submit} className="space-y-4">
              {mode === "signup" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <FloatField
                      id="prenom"
                      label="Prénom"
                      icon={User}
                      value={form.prenom}
                      onChange={(v) => setForm({ ...form, prenom: v })}
                      required
                    />
                    <FloatField
                      id="nom"
                      label="Nom"
                      icon={User}
                      value={form.nom}
                      onChange={(v) => setForm({ ...form, nom: v })}
                      required
                    />
                  </div>

                  <FloatField
                    id="telephone"
                    label="Téléphone"
                    icon={Phone}
                    type="tel"
                    value={form.telephone}
                    onChange={(v) => setForm({ ...form, telephone: v })}
                    invalid={!!form.telephone && !phoneOk}
                    hint={form.telephone && !phoneOk ? "Numéro invalide (min. 8 chiffres)" : ""}
                    required
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FloatField
                      id="date_naissance"
                      label="Date de naissance"
                      icon={Calendar}
                      type="date"
                      value={form.date_naissance}
                      onChange={(v) => setForm({ ...form, date_naissance: v })}
                      required
                    />
                    <FloatField
                      id="ville"
                      label="Ville"
                      icon={MapPin}
                      value={form.ville}
                      onChange={(v) => setForm({ ...form, ville: v })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <FloatField
                      id="adresse"
                      label="Adresse"
                      icon={MapPin}
                      value={form.adresse}
                      onChange={(v) => setForm({ ...form, adresse: v })}
                      required
                    />
                    <FloatField
                      id="code_postal"
                      label="Code postal"
                      icon={MapPin}
                      value={form.code_postal}
                      onChange={(v) => setForm({ ...form, code_postal: v })}
                      invalid={!!form.code_postal && !cpOk}
                      hint={form.code_postal && !cpOk ? "Format 4 ou 5 chiffres" : ""}
                      required
                    />
                  </div>
                </>
              )}

              <FloatField
                id="email"
                label="Email"
                icon={Mail}
                type="email"
                value={form.email}
                onChange={(v) => setForm({ ...form, email: v })}
                invalid={!!form.email && !emailOk}
                hint={form.email && !emailOk ? "Adresse e-mail invalide" : ""}
                required
              />

              <PasswordField
                value={form.password}
                onChange={(v) => setForm({ ...form, password: v })}
                showPwd={showPwd}
                setShowPwd={setShowPwd}
                capsOn={capsOn}
                mode={mode}
                score={pwdScore}
              />

              {mode === "login" ? (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-teal-600"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Se souvenir de moi
                  </label>
                  <button
                    type="button"
                    className="text-sm font-medium text-teal-700 hover:underline"
                    onClick={() => alert("Branche le flux de réinitialisation 🙂")}
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              ) : (
                <label className="flex items-start gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 accent-teal-600"
                    checked={form.cgu_ok}
                    onChange={(e) => setForm({ ...form, cgu_ok: e.target.checked })}
                  />
                  <span>
                    J’accepte les <span className="underline">CGU</span> et la{" "}
                    <span className="underline">politique de confidentialité</span>.
                  </span>
                </label>
              )}

              <Button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 font-bold text-white hover:from-teal-600 hover:to-cyan-600 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Chargement…
                  </>
                ) : mode === "login" ? (
                  "Se connecter"
                ) : (
                  "Créer mon compte"
                )}
              </Button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500">
              <BadgeLine text="Données chiffrées" />
              <BadgeLine text="Connexion sécurisée" />
              <BadgeLine text="Aucune revente" />
            </div>
          </div>

          {/* Side panel (benefits) */}
          <aside className="relative hidden overflow-hidden rounded-2xl border border-slate-200 bg-white/70 shadow-xl backdrop-blur md:block">
            <div
              className="absolute inset-0 -z-10 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1600&auto=format&fit=crop)",
              }}
            />
            <div className="absolute inset-0 -z-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
            <div className="relative z-10 p-8 text-white">
              <h3 className="mb-6 text-2xl font-bold">Pourquoi créer votre compte ?</h3>
              <ul className="space-y-4">
                {[
                  "Suivi de vos contrats en temps réel",
                  "Espace documents sécurisé (attestations, quittances)",
                  "Échanges rapides avec votre conseiller",
                  "Devis et souscription en ligne",
                ].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-teal-300" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 rounded-xl bg-white/10 p-4 text-sm leading-relaxed backdrop-blur">
                <p className="flex items-center gap-2">
                  <Info className="h-4 w-4" /> Astuce sécurité
                </p>
                <p className="mt-1 text-white/90">
                  Utilisez un mot de passe unique et activez l’option “Se souvenir de moi” uniquement
                  sur vos appareils personnels.
                </p>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {/* keyframes */}
      <style>{`
        @keyframes shake { 10%,90%{transform:translateX(-1px)} 20%,80%{transform:translateX(2px)} 30%,50%,70%{transform:translateX(-4px)} 40%,60%{transform:translateX(4px)} }
      `}</style>
    </div>
  );
}

/* ───────────────────────── Sub-components ───────────────────────── */

function Tab({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "flex-1 rounded-lg px-4 py-2 text-sm font-semibold transition",
        active ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function OrDivider() {
  return (
    <div className="relative my-5">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200" />
      </div>
      <div className="relative flex justify-center">
        <span className="bg-white/80 px-3 text-xs font-medium uppercase tracking-wide text-slate-500">
          OU AVEC VOTRE EMAIL
        </span>
      </div>
    </div>
  );
}

function BadgeLine({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center gap-1">
      <CheckCircle2 className="h-3.5 w-3.5 text-teal-600" />
      {text}
    </span>
  );
}

function FloatField({
  id,
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  invalid,
  hint,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: any;
  invalid?: boolean;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <div
        className={[
          "relative rounded-lg border bg-white transition focus-within:ring-2",
          invalid
            ? "border-red-500 focus-within:ring-red-200"
            : "border-slate-300 focus-within:border-teal-500 focus-within:ring-teal-200",
        ].join(" ")}
      >
        {Icon && (
          <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        )}
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={["border-0 bg-transparent pl-9 pr-3 pt-5 pb-1 focus-visible:ring-0"].join(" ")}
          placeholder=" "
        />
        <Label
          htmlFor={id}
          className="pointer-events-none absolute left-9 top-1.5 origin-left bg-white px-1 text-xs font-semibold text-slate-500 transition-all"
        >
          {label}
        </Label>
      </div>
      {hint ? <p className="mt-1 text-xs text-red-600">{hint}</p> : null}
    </div>
  );
}

function PasswordField({
  value,
  onChange,
  showPwd,
  setShowPwd,
  capsOn,
  mode,
  score,
}: {
  value: string;
  onChange: (v: string) => void;
  showPwd: boolean;
  setShowPwd: (b: boolean) => void;
  capsOn: boolean;
  mode: Mode;
  score: number;
}) {
  const color =
    score <= 1
      ? "bg-red-500"
      : score === 2
      ? "bg-amber-500"
      : score === 3
      ? "bg-yellow-500"
      : "bg-teal-600";
  const pct = Math.min(100, Math.max(0, (score / 5) * 100));

  return (
    <div>
      <div className="relative rounded-lg border border-slate-300 bg-white transition focus-within:border-teal-500 focus-within:ring-2 focus-within:ring-teal-200">
        <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          id="password"
          type={showPwd ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-0 bg-transparent pl-9 pr-10 pt-5 pb-1 focus-visible:ring-0"
          placeholder=" "
          autoComplete="current-password"
        />
        <Label
          htmlFor="password"
          className="pointer-events-none absolute left-9 top-1.5 origin-left bg-white px-1 text-xs font-semibold text-slate-500 transition-all"
        >
          Mot de passe
        </Label>
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {mode === "signup" && (
        <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-slate-200">
            <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-1 flex items-center gap-2 text-xs text-slate-600">
            <Info className="h-3.5 w-3.5" />
            Minimum {MIN_PWD} caractères, idéalement majuscules, minuscules, chiffres et symbole.
          </p>
        </div>
      )}

      {capsOn && (
        <p className="mt-2 text-xs font-medium text-amber-600">⚠️ Verr. Maj activée — attention.</p>
      )}
    </div>
  );
}

function GoogleIcon(props: any) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

/* ───────────────────────── small util ───────────────────────── */
function humanizeAuthError(msg: string) {
  const m = msg.toLowerCase();
  if (m.includes("invalid") || m.includes("wrong") || m.includes("credentials"))
    return "Identifiants incorrects. Vérifiez votre e-mail et votre mot de passe.";
  if (m.includes("password")) return "Mot de passe invalide ou trop faible.";
  if (m.includes("network")) return "Problème réseau. Merci de réessayer.";
  return msg;
}