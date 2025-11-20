// src/pages/EspaceClient.tsx
import { useEffect, useMemo, useState, type ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
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
  Sparkles,
  PhoneCall,
} from "lucide-react";
import { isAdminUser } from "@/components/AdminRoute";
import { cn } from "@/lib/utils";

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

  const playfulFacts = [
    { icon: Shield, label: "Contrats & attestations en 1 clic" },
    { icon: PhoneCall, label: "Chat direct avec votre conseiller" },
    { icon: Sparkles, label: "Activation express en 2 minutes" },
  ] as const;

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
        const loggedUser = await signIn(form.email, form.password);
        const destination = isAdminUser(loggedUser ?? null)
          ? "/admin"
          : "/espace-client/dashboard";
        navigate(destination);
        return;
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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(1400px_800px_at_5%_-10%,rgba(59,130,246,0.16),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_95%_-10%,rgba(20,184,166,0.16),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.94)0%,rgba(15,23,42,0.9)40%,rgba(15,23,42,0.97)100%)]" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-16 md:py-24">
        <div className="space-y-5 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.32em] text-teal-100">
            <Sparkles className="h-3.5 w-3.5 text-teal-200" />
            Mon espace client
          </span>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            Une interface simple et ludique pour gérer vos assurances.
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/70">
            Connectez-vous pour retrouver vos contrats, documents et conversations. Nouveau venu ?
            Créez votre espace en quelques clics et profitez d’un suivi personnalisé.
          </p>
        </div>

        <div className="mt-10 w-full overflow-hidden rounded-[32px] border border-white/10 bg-white/95 text-slate-900 shadow-[0_35px_110px_rgba(15,23,42,0.5)]">
          <div className="bg-gradient-to-r from-teal-400/15 via-sky-400/15 to-blue-500/15 px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.32em] text-teal-600">
            {mode === "login" ? "Ravi de vous revoir !" : "Bienvenue parmi nous"}
          </div>

          <div className="px-6 py-8 sm:px-10 sm:py-10">
            <div className="mx-auto flex max-w-sm rounded-full bg-slate-100 p-1">
              <Tab active={mode === "login"} onClick={() => setMode("login")}>
                Connexion
              </Tab>
              <Tab active={mode === "signup"} onClick={() => setMode("signup")}>
                Inscription
              </Tab>
            </div>
            <p className="mt-4 text-center text-sm text-slate-500">
              {mode === "login"
                ? "Entrez vos identifiants pour accéder à votre tableau de bord."
                : "Complétez simplement vos informations afin de débloquer votre espace sécurisé."}
            </p>

            {error && (
              <div className="mt-6 flex items-start gap-2 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-sm text-rose-700 animate-[shake_.25s_ease]">
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <Button
              variant="outline"
              className="mt-8 w-full border-slate-200 bg-white/90 text-slate-900 shadow-sm transition hover:bg-white"
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

            <form onSubmit={submit} className="space-y-6">
              {mode === "signup" && (
                <div className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <LabeledInput
                      id="prenom"
                      label="Prénom"
                      icon={User}
                      value={form.prenom}
                      onChange={(v) => setForm({ ...form, prenom: v })}
                      required
                    />
                    <LabeledInput
                      id="nom"
                      label="Nom"
                      icon={User}
                      value={form.nom}
                      onChange={(v) => setForm({ ...form, nom: v })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <LabeledInput
                      id="telephone"
                      label="Téléphone"
                      icon={Phone}
                      type="tel"
                      value={form.telephone}
                      onChange={(v) => setForm({ ...form, telephone: v })}
                      errorText={
                        form.telephone && !phoneOk ? "Numéro invalide (min. 8 chiffres)" : undefined
                      }
                      required
                    />
                    <LabeledInput
                      id="date_naissance"
                      label="Date de naissance"
                      icon={Calendar}
                      type="date"
                      value={form.date_naissance}
                      onChange={(v) => setForm({ ...form, date_naissance: v })}
                      required
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <LabeledInput
                      id="adresse"
                      label="Adresse"
                      icon={MapPin}
                      value={form.adresse}
                      onChange={(v) => setForm({ ...form, adresse: v })}
                      required
                    />
                    <LabeledInput
                      id="ville"
                      label="Ville"
                      icon={MapPin}
                      value={form.ville}
                      onChange={(v) => setForm({ ...form, ville: v })}
                      required
                    />
                  </div>
                  <LabeledInput
                    id="code_postal"
                    label="Code postal"
                    icon={MapPin}
                    value={form.code_postal}
                    onChange={(v) => setForm({ ...form, code_postal: v })}
                    errorText={
                      form.code_postal && !cpOk ? "Format attendu : 4 ou 5 chiffres" : undefined
                    }
                    required
                  />
                </div>
              )}

              <div className="space-y-4">
                <LabeledInput
                  id="email"
                  label="Email"
                  icon={Mail}
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  errorText={form.email && !emailOk ? "Adresse e-mail invalide" : undefined}
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
              </div>

              {mode === "login" ? (
                <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                      checked={remember}
                      onChange={(e) => setRemember(e.target.checked)}
                    />
                    Se souvenir de moi
                  </label>
                  <button
                    type="button"
                    className="font-medium text-teal-600 hover:underline"
                    onClick={() => alert("Branche le flux de réinitialisation 🙂")}
                  >
                    Mot de passe oublié ?
                  </button>
                </div>
              ) : (
                <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    className="mt-1 h-5 w-5 rounded border-slate-300 text-teal-600 focus:ring-teal-500"
                    checked={form.cgu_ok}
                    onChange={(e) => setForm({ ...form, cgu_ok: e.target.checked })}
                  />
                  <span>
                    J’accepte les{" "}
                    <a href="/cgu" className="font-semibold text-teal-600 underline">
                      CGU
                    </a>{" "}
                    et la{" "}
                    <a href="/politique-confidentialite" className="font-semibold text-teal-600 underline">
                      politique de confidentialité
                    </a>
                    .
                  </span>
                </label>
              )}

              <Button
                type="submit"
                disabled={!canSubmit || loading}
                className="w-full rounded-2xl bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-500 py-3 text-base font-semibold text-white shadow-lg shadow-teal-500/25 transition hover:from-teal-400 hover:to-sky-400 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Traitement en cours…
                  </>
                ) : mode === "login" ? (
                  "Se connecter"
                ) : (
                  "Activer mon espace"
                )}
              </Button>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50/85 p-4 text-sm text-slate-600">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-teal-500" />
                Besoin d’aide ?
              </p>
              <p className="mt-1">
                Contactez un conseiller au{" "}
                <a href="tel:+33180050050" className="font-semibold text-teal-600 hover:underline">
                  01 80 05 00 50
                </a>{" "}
                ou lancez le chat en bas à droite.
              </p>
            </div>
          </div>
        </div>

        <ul className="mt-10 grid w-full gap-3 text-sm text-white/75 sm:grid-cols-3">
          {playfulFacts.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3"
            >
              <Icon className="h-5 w-5 text-teal-200" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </div>

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
      className={cn(
        "flex-1 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-200",
        active
          ? "bg-white text-slate-900 shadow-md shadow-slate-300/40"
          : "text-slate-500 hover:text-slate-700"
      )}
    >
      {children}
    </button>
  );
}

function OrDivider() {
  return (
    <div className="relative my-6">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-slate-200/70" />
      </div>
      <div className="relative flex justify-center">
        <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">
          OU AVEC VOTRE EMAIL
        </span>
      </div>
    </div>
  );
}

function LabeledInput({
  id,
  label,
  value,
  onChange,
  type = "text",
  icon: Icon,
  errorText,
  required,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  icon?: ComponentType<{ className?: string }>;
  errorText?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
        {Icon && <Icon className="h-4 w-4 text-teal-500" />}
        {label}
      </span>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        className={cn(
          "h-11 rounded-xl border border-slate-200 bg-white/95 text-sm font-medium text-slate-900 shadow-sm transition focus-visible:border-teal-500 focus-visible:ring-2 focus-visible:ring-teal-200",
          errorText && "border-rose-300 focus-visible:border-rose-400 focus-visible:ring-rose-200"
        )}
      />
      {errorText ? (
        <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-rose-600">
          <AlertCircle className="h-3 w-3" />
          {errorText}
        </span>
      ) : null}
    </label>
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
      <div className="group relative rounded-2xl border border-slate-200 bg-white/90 shadow-sm transition focus-within:border-teal-500 focus-within:shadow-md focus-within:ring-2 focus-within:ring-teal-200/80">
        <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition group-focus-within:text-teal-500" />
        <Input
          id="password"
          type={showPwd ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="border-0 bg-transparent pl-11 pr-12 pt-6 pb-2 text-sm font-medium text-slate-900 placeholder:text-transparent focus-visible:ring-0"
          placeholder=" "
          autoComplete="current-password"
        />
        <Label
          htmlFor="password"
          className="pointer-events-none absolute left-11 top-2 origin-left rounded bg-white/90 px-1 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 transition-all group-focus-within:-translate-y-1 group-focus-within:scale-[0.92] group-focus-within:text-teal-600"
        >
          Mot de passe
        </Label>
        <button
          type="button"
          onClick={() => setShowPwd(!showPwd)}
          aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
        >
          {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      {mode === "signup" && (
        <div className="mt-2">
          <div className="h-2 w-full rounded-full bg-slate-200/70">
            <div className={`h-2 rounded-full ${color}`} style={{ width: `${pct}%`, transition: "width 0.2s ease" }} />
          </div>
          <p className="mt-2 flex items-center gap-2 text-xs text-slate-600">
            <Info className="h-3.5 w-3.5" />
            Minimum {MIN_PWD} caractères, idéalement majuscules, minuscules, chiffres et symbole.
          </p>
        </div>
      )}

      {capsOn && (
        <p className="mt-2 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-700">
          ⚠️ Verr. Maj activée — attention lors de la saisie de votre mot de passe.
        </p>
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
