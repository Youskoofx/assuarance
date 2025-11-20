import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import {
  BadgeCheck,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Shield,
  Calendar,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

type DbUser = Database["public"]["Tables"]["users"]["Row"];

type ProfileForm = {
  prenom: string;
  nom: string;
  telephone: string;
  date_naissance: string;
  adresse: string;
  code_postal: string;
  ville: string;
  notes: string;
};

const initialForm: ProfileForm = {
  prenom: "",
  nom: "",
  telephone: "",
  date_naissance: "",
  adresse: "",
  code_postal: "",
  ville: "",
  notes: "",
};

function normalize(value: string | null | undefined) {
  return value ?? "";
}

export default function MonProfil() {
  const { user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<DbUser | null>(null);
  const [form, setForm] = useState<ProfileForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!user?.id) return;
    let isMounted = true;

    async function fetchProfile() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("users")
          .select("*")
          .eq("id", user.id)
          .maybeSingle();

        if (fetchError) throw fetchError;
        if (isMounted) {
          setProfile(data ?? null);
          setForm({
            prenom: normalize(data?.prenom),
            nom: normalize(data?.nom),
            telephone: normalize(data?.telephone),
            date_naissance: normalize(data?.date_naissance ?? undefined),
            adresse: normalize(data?.adresse),
            code_postal: normalize(data?.code_postal),
            ville: normalize(data?.ville),
            notes: "",
          });
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            "Impossible de charger vos informations. Merci de réessayer dans un instant."
          );
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchProfile();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const hasChanges = useMemo(() => {
    if (!profile) return false;
    return (
      form.prenom !== normalize(profile.prenom) ||
      form.nom !== normalize(profile.nom) ||
      form.telephone !== normalize(profile.telephone) ||
      form.date_naissance !== normalize(profile.date_naissance ?? undefined) ||
      form.adresse !== normalize(profile.adresse) ||
      form.code_postal !== normalize(profile.code_postal) ||
      form.ville !== normalize(profile.ville)
    );
  }, [form, profile]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user?.id || !hasChanges) return;

    setSaving(true);
    setError(null);
    try {
      const payload = {
        prenom: form.prenom.trim() || null,
        nom: form.nom.trim() || null,
        telephone: form.telephone.trim() || null,
        date_naissance: form.date_naissance || null,
        adresse: form.adresse.trim() || null,
        code_postal: form.code_postal.trim() || null,
        ville: form.ville.trim() || null,
        notes: form.notes.trim() || null,
      };

      const { error: updateError, data } = await supabase
        .from("users")
        .update(payload)
        .eq("id", user.id)
        .select()
        .maybeSingle();

      if (updateError) throw updateError;

      setProfile((prev) => (prev ? { ...prev, ...data } : prev));

      toast({
        title: "Profil mis à jour",
        description:
          "Vos informations personnelles ont été enregistrées avec succès.",
      });
      setForm((prev) => ({ ...prev, notes: "" }));
    } catch (err) {
      console.error(err);
      setError("Impossible d’enregistrer les modifications pour le moment.");
    } finally {
      setSaving(false);
    }
  };

  const sendPasswordReset = async () => {
    if (!user?.email) return;
    setSaving(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        user.email,
        {
          redirectTo: `${window.location.origin}/espace-client`,
        }
      );
      if (resetError) throw resetError;

      toast({
        title: "Email de réinitialisation envoyé",
        description:
          "Consultez votre boîte de réception pour choisir un nouveau mot de passe.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Envoi impossible",
        description:
          "Nous n’avons pas pu envoyer l’email de réinitialisation. Réessayez dans un instant.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_18%_-10%,rgba(99,102,241,0.18),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(20,184,166,0.18),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24">
        <header className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <BadgeCheck className="h-10 w-10 text-indigo-200" />
              <div>
                <p className="text-sm uppercase tracking-[0.4em] text-white/50">
                  Espace client sécurisé
                </p>
                <h1 className="mt-2 text-4xl font-semibold tracking-tight">
                  Mon Profil & Préférences
                </h1>
                <p className="mt-3 max-w-2xl text-lg text-white/70">
                  Actualisez vos coordonnées, gérez vos préférences de contact et
                  demandez un nouveau mot de passe en toute autonomie.
                </p>
              </div>
            </div>
            <Card className="w-full max-w-sm border-white/10 bg-white/[0.06] text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold">
                  Identité de connexion
                </CardTitle>
                <CardDescription className="text-white/60">
                  Email et rôle utilisés pour sécuriser votre espace.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <Mail className="h-4 w-4 text-indigo-200" />
                  <span className="text-sm text-white/80">
                    {user?.email ?? "—"}
                  </span>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-3">
                  <Shield className="h-4 w-4 text-teal-200" />
                  <span className="text-sm text-white/80">
                    {profile?.role === "admin"
                      ? "Administrateur"
                      : "Client assuré"}
                  </span>
                </div>
                <Button
                  onClick={sendPasswordReset}
                  variant="outline"
                  className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  Réinitialiser mon mot de passe
                </Button>
              </CardContent>
            </Card>
          </div>
        </header>

        <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_360px]">
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-semibold">
                    Informations personnelles
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Ces informations nous permettent de mieux vous accompagner et de préparer vos
                    dossiers.
                  </CardDescription>
                </div>
                <Button
                  type="submit"
                  form="profile-form"
                  disabled={!hasChanges || saving}
                  className="bg-indigo-500 hover:bg-indigo-400"
                >
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sauvegarde…
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Enregistrer
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-48 flex-col items-center justify-center gap-4 text-white/70">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-200" />
                  <p>Chargement de vos informations…</p>
                </div>
              ) : (
                <form
                  id="profile-form"
                  onSubmit={handleSubmit}
                  className="grid gap-6"
                >
                  {error && (
                    <div className="flex items-start gap-2 rounded-xl border border-rose-200/50 bg-rose-500/15 p-4 text-sm text-rose-100">
                      <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="prenom">Prénom</Label>
                      <Input
                        id="prenom"
                        name="prenom"
                        value={form.prenom}
                        onChange={handleChange}
                        placeholder="Votre prénom"
                        className="border-white/10 bg-white/10 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nom">Nom</Label>
                      <Input
                        id="nom"
                        name="nom"
                        value={form.nom}
                        onChange={handleChange}
                        placeholder="Votre nom"
                        className="border-white/10 bg-white/10 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="telephone">Téléphone</Label>
                      <div className="relative">
                        <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                          id="telephone"
                          name="telephone"
                          value={form.telephone}
                          onChange={handleChange}
                          placeholder="+33 6 00 00 00 00"
                          className="border-white/10 bg-white/10 pl-10 text-white placeholder:text-white/40"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="date_naissance">Date de naissance</Label>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                        <Input
                          id="date_naissance"
                          name="date_naissance"
                          type="date"
                          value={form.date_naissance}
                          onChange={handleChange}
                          className="border-white/10 bg-white/10 pl-10 text-white [color-scheme:dark]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <div className="relative">
                      <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/40" />
                      <Textarea
                        id="adresse"
                        name="adresse"
                        value={form.adresse}
                        onChange={handleChange}
                        placeholder="Numéro et rue"
                        className="min-h-[88px] border-white/10 bg-white/10 pl-10 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="code_postal">Code postal</Label>
                      <Input
                        id="code_postal"
                        name="code_postal"
                        value={form.code_postal}
                        onChange={handleChange}
                        placeholder="75000"
                        className="border-white/10 bg-white/10 text-white placeholder:text-white/40"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ville">Ville</Label>
                      <Input
                        id="ville"
                        name="ville"
                        value={form.ville}
                        onChange={handleChange}
                        placeholder="Paris"
                        className="border-white/10 bg-white/10 text-white placeholder:text-white/40"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes pour votre conseiller</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      placeholder="Indiquez un changement de situation, un besoin spécifique ou précisez vos horaires de rappel."
                      className="min-h-[120px] border-white/10 bg-white/10 text-white placeholder:text-white/40"
                    />
                    <p className="text-xs text-white/50">
                      Ces informations sont transmises directement à votre conseiller dédié.
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Besoin d’actualiser d’autres informations ?
                </CardTitle>
                <CardDescription className="text-white/60">
                  Votre conseiller reste disponible pour finaliser vos demandes.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  asChild
                  className="w-full bg-white text-slate-900 hover:bg-slate-100"
                >
                  <a href="mailto:gestion@assurance.fr?subject=Mise%20%C3%A0%20jour%20profil">
                    Contacter mon conseiller
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full border-white/30 bg-white/10 text-white hover:bg-white/20"
                >
                  <a href="/contact">Planifier un rendez-vous</a>
                </Button>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                  <p className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-teal-200" />
                    Nous mettons à jour vos informations sous 24h ouvrées.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Sécurité de votre espace
                </CardTitle>
                <CardDescription className="text-white/60">
                  Nos équipes surveillent en permanence la protection de vos données.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-white/70">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-200" />
                  Données chiffrées et stockées en France
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-200" />
                  Authentification sécurisée (Supabase)
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-200" />
                  Traçabilité des accès et des modifications
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
