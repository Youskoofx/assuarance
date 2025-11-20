import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Users,
  FileText,
  ShieldCheck,
  RefreshCw,
  Search,
  Phone,
  Mail,
  MapPin,
  Calendar,
  AlertTriangle,
  Loader2,
  MessageCircle,
  Send,
  UserPlus,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Database } from "@/types/supabase";
import { sendPersonalEmail } from "@/lib/emails";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

type DbUser = Database["public"]["Tables"]["users"]["Row"];
type DbDevis = Database["public"]["Tables"]["devis"]["Row"];
type DbContrat = Database["public"]["Tables"]["contrats"]["Row"];
type DbMessage = Database["public"]["Tables"]["messages_chat"]["Row"];

type AdminDevis = DbDevis & {
  client?: Pick<DbUser, "prenom" | "nom" | "email" | "role"> | null;
};

type AdminContrat = DbContrat & {
  client?: Pick<DbUser, "prenom" | "nom" | "email" | "role"> | null;
};

const devisStatusOptions = [
  { value: "en_attente", label: "En attente" },
  { value: "en_cours", label: "En cours de traitement" },
  { value: "accepte", label: "Accepté" },
  { value: "refuse", label: "Refusé" },
];

const contratStatusOptions = [
  { value: "actif", label: "Actif" },
  { value: "suspendu", label: "Suspendu" },
  { value: "resilie", label: "Résilié" },
];

const roleOptions = [
  { value: "client", label: "Client" },
  { value: "prospect", label: "Prospect" },
  { value: "partenaire", label: "Partenaire" },
  { value: "admin", label: "Administrateur" },
];

const devisStatusStyle: Record<string, string> = {
  en_attente: "bg-amber-100 text-amber-700 border-amber-200",
  en_cours: "bg-blue-100 text-blue-700 border-blue-200",
  accepte: "bg-emerald-100 text-emerald-700 border-emerald-200",
  refuse: "bg-rose-100 text-rose-700 border-rose-200",
};

const contratStatusStyle: Record<string, string> = {
  actif: "bg-emerald-100 text-emerald-700 border-emerald-200",
  suspendu: "bg-amber-100 text-amber-700 border-amber-200",
  resilie: "bg-rose-100 text-rose-700 border-rose-200",
};

const dateFormatter = new Intl.DateTimeFormat("fr-FR", { dateStyle: "medium" });
const timeFormatter = new Intl.DateTimeFormat("fr-FR", {
  hour: "2-digit",
  minute: "2-digit",
});
const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const defaultFormState = {
  prenom: "",
  nom: "",
  email: "",
  telephone: "",
  date_naissance: "",
  adresse: "",
  code_postal: "",
  ville: "",
  role: "client",
};

export default function Admin() {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const [clients, setClients] = useState<DbUser[]>([]);
  const [devis, setDevis] = useState<AdminDevis[]>([]);
  const [contrats, setContrats] = useState<AdminContrat[]>([]);
  const [activeClientId, setActiveClientId] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [roleDraft, setRoleDraft] = useState("client");
  const [roleUpdatingId, setRoleUpdatingId] = useState<string | null>(null);

  const [createForm, setCreateForm] = useState(defaultFormState);
  const [createLoading, setCreateLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState<DbMessage[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatSending, setChatSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const adminEmails = useMemo(
    () =>
      (import.meta.env.VITE_ADMIN_EMAILS || "")
        .split(",")
        .map((email) => email.trim())
        .filter(Boolean),
    []
  );

  const [updatingDevisId, setUpdatingDevisId] = useState<string | null>(null);
  const [updatingContratId, setUpdatingContratId] = useState<string | null>(null);

  useEffect(() => {
    if (!statusMessage) return;
    const timeout = window.setTimeout(() => setStatusMessage(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [statusMessage]);

  useEffect(() => {
    if (!error) return;
    const timeout = window.setTimeout(() => setError(null), 5000);
    return () => window.clearTimeout(timeout);
  }, [error]);

  const filteredClients = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return clients;
    return clients.filter((client) => {
      const fullname = `${client.prenom ?? ""} ${client.nom ?? ""}`.toLowerCase();
      return (
        fullname.includes(term) ||
        (client.email ?? "").toLowerCase().includes(term) ||
        (client.ville ?? "").toLowerCase().includes(term) ||
        (client.role ?? "").toLowerCase().includes(term)
      );
    });
  }, [clients, search]);

  const activeClient = activeClientId
    ? clients.find((client) => client.id === activeClientId) ?? null
    : null;

  useEffect(() => {
    setRoleDraft(activeClient?.role ?? "client");
  }, [activeClient?.id, activeClient?.role]);

  const stats = useMemo(() => {
    const contratsActifs = contrats.filter((c) => c.statut === "actif").length;
    const devisEnAttente = devis.filter((d) => d.statut === "en_attente").length;

    return {
      clients: clients.length,
      devisEnAttente,
      contratsActifs,
    };
  }, [clients.length, devis, contrats]);

  const recentActivity = useMemo(() => {
    const items: Array<{
      id: string;
      type: "devis" | "contrat";
      label: string;
      created_at: string | null;
      status?: string | null;
      user?: string;
    }> = [];

    devis.forEach((item) => {
      const fullname =
        item.client?.prenom || item.client?.nom
          ? `${item.client?.prenom ?? ""} ${item.client?.nom ?? ""}`.trim()
          : item.client?.email ?? "";

      items.push({
        id: `devis-${item.id}`,
        type: "devis",
        label: `${item.type_assurance}`,
        created_at: item.created_at,
        status: item.statut,
        user: fullname,
      });
    });

    contrats.forEach((contrat) => {
      const fullname =
        contrat.client?.prenom || contrat.client?.nom
          ? `${contrat.client?.prenom ?? ""} ${contrat.client?.nom ?? ""}`.trim()
          : contrat.client?.email ?? "";

      items.push({
        id: `contrat-${contrat.id}`,
        type: "contrat",
        label: `${contrat.type} · ${contrat.numero_contrat}`,
        created_at: contrat.created_at,
        status: contrat.statut,
        user: fullname,
      });
    });

    return items
      .filter((item) => item.created_at)
      .sort((a, b) => (b.created_at ?? "").localeCompare(a.created_at ?? ""))
      .slice(0, 8);
  }, [devis, contrats]);

  const fetchChatMessages = useCallback(
    async (clientId: string) => {
      setChatLoading(true);
      setChatError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("messages_chat")
          .select("*")
          .eq("user_id", clientId)
          .order("created_at", { ascending: true });

        if (fetchError) throw fetchError;
        setChatMessages(data ?? []);
      } catch (err) {
        console.error(err);
        setChatError("Impossible de charger les messages de discussion.");
        setChatMessages([]);
      } finally {
        setChatLoading(false);
      }
    },
    []
  );

  const fetchAllData = useCallback(async () => {
    setRefreshing(true);
    setError(null);
    try {
      const [usersRes, devisRes, contratsRes] = await Promise.all([
        supabase.from("users").select("*").order("created_at", { ascending: false }),
        supabase
          .from("devis")
          .select("*, client:users(prenom, nom, email, role)")
          .order("created_at", { ascending: false }),
        supabase
          .from("contrats")
          .select("*, client:users(prenom, nom, email, role)")
          .order("created_at", { ascending: false }),
      ]);

      if (usersRes.error) throw usersRes.error;
      if (devisRes.error) throw devisRes.error;
      if (contratsRes.error) throw contratsRes.error;

      setClients(usersRes.data ?? []);
      setDevis((devisRes.data as AdminDevis[]) ?? []);
      setContrats((contratsRes.data as AdminContrat[]) ?? []);

      if (!activeClientId && usersRes.data?.length) {
        setActiveClientId(usersRes.data[0].id);
      }

      if (activeClientId) {
        fetchChatMessages(activeClientId);
      }
    } catch (err) {
      console.error(err);
      setError("Impossible de récupérer les données. Merci de réessayer dans un instant.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [activeClientId, fetchChatMessages]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  useEffect(() => {
    if (!activeClientId) {
      setChatMessages([]);
      setChatError(null);
      return;
    }
    fetchChatMessages(activeClientId);
  }, [activeClientId, fetchChatMessages]);

  useEffect(() => {
    const channel = supabase
      .channel("admin-chat-stream")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages_chat",
        },
        (payload) => {
          const newMessage = payload.new as unknown as DbMessage;
          if (!newMessage?.user_id) return;

          if (newMessage.user_id === activeClientId) {
            setChatMessages((prev) => {
              if (prev.some((msg) => msg.id === newMessage.id)) {
                return prev;
              }
              return [...prev, newMessage];
            });
          }
        }
      );

    channel.subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [activeClientId]);

  const updateDevisStatus = async (id: string, statut: string) => {
    setUpdatingDevisId(id);
    setStatusMessage(null);
    try {
      const { error: updateError } = await supabase.from("devis").update({ statut }).eq("id", id);
      if (updateError) throw updateError;
      setDevis((prev) => prev.map((item) => (item.id === id ? { ...item, statut } : item)));
      setStatusMessage("Statut du devis mis à jour.");
    } catch (err) {
      console.error(err);
      setError("La mise à jour du statut du devis a échoué.");
    } finally {
      setUpdatingDevisId(null);
    }
  };

  const updateContratStatus = async (id: string, statut: string) => {
    setUpdatingContratId(id);
    setStatusMessage(null);
    try {
      const { error: updateError } = await supabase
        .from("contrats")
        .update({ statut })
        .eq("id", id);
      if (updateError) throw updateError;
      setContrats((prev) => prev.map((item) => (item.id === id ? { ...item, statut } : item)));
      setStatusMessage("Statut du contrat mis à jour.");
    } catch (err) {
      console.error(err);
      setError("La mise à jour du statut du contrat a échoué.");
    } finally {
      setUpdatingContratId(null);
    }
  };

  const handleRoleUpdate = async () => {
    if (!activeClient) return;
    setRoleUpdatingId(activeClient.id);
    setStatusMessage(null);
    try {
      const { error: updateError } = await supabase
        .from("users")
        .update({ role: roleDraft })
        .eq("id", activeClient.id);
      if (updateError) throw updateError;
      setClients((prev) =>
        prev.map((client) =>
          client.id === activeClient.id ? { ...client, role: roleDraft } : client
        )
      );
      setStatusMessage("Rôle du client mis à jour.");
    } catch (err) {
      console.error(err);
      setError("Impossible de mettre à jour le rôle.");
    } finally {
      setRoleUpdatingId(null);
    }
  };

  const handleCreateUser = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!emailRegex.test(createForm.email.trim())) {
      setError("Merci de fournir une adresse email valide.");
      return;
    }

    setCreateLoading(true);
    setStatusMessage(null);
    try {
      const normalizedEmail = createForm.email.trim().toLowerCase();
      const existingUser = clients.find(
        (client) => (client.email ?? "").toLowerCase() === normalizedEmail
      );

      const payload = {
        email: normalizedEmail,
        prenom: createForm.prenom.trim() || null,
        nom: createForm.nom.trim() || null,
        telephone: createForm.telephone.trim() || null,
        date_naissance: createForm.date_naissance || null,
        adresse: createForm.adresse.trim() || null,
        code_postal: createForm.code_postal.trim() || null,
        ville: createForm.ville.trim() || null,
        role: createForm.role || "client",
      };

      const { data, error: upsertError } = await supabase
        .from("users")
        .upsert(payload, { onConflict: "email" })
        .select()
        .maybeSingle();

      if (upsertError) throw upsertError;

      setStatusMessage(
        `Profil ${payload.email} enregistré. Utilisez la page Espace Client pour finaliser la création du mot de passe.`
      );
      setCreateForm(defaultFormState);
      if (!existingUser && payload.email) {
        const origin = typeof window !== "undefined" ? window.location.origin : "";
        void sendPersonalEmail({
          to: payload.email,
          template: "invitation",
          data: {
            prenom: payload.prenom,
            nom: payload.nom,
            email: payload.email,
            actionUrl: origin ? `${origin}/espace-client` : undefined,
          },
        }).catch((mailErr) => console.error("Invitation email failure:", mailErr));

        if (adminEmails.length) {
          void sendPersonalEmail({
            to: adminEmails,
            template: "admin-new-user",
            data: {
              prenom: payload.prenom,
              nom: payload.nom,
              email: payload.email,
              origin,
            },
          }).catch((mailErr) =>
            console.error("Notification admin failure:", mailErr)
          );
        }
      }
      await fetchAllData();

      if (data?.id) {
        setActiveClientId(data.id);
      }
    } catch (err) {
      console.error(err);
      setError(
        "La création ou mise à jour du compte a échoué. Vérifiez les droits de la table Supabase."
      );
    } finally {
      setCreateLoading(false);
    }
  };

  const sendAdminMessage = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!activeClientId || !chatInput.trim()) return;

    setChatSending(true);
    setChatError(null);
    try {
      const messageToSend = {
        user_id: activeClientId,
        message: chatInput.trim(),
        sender: "admin",
      } as const;

      const { data, error: insertError } = await supabase
        .from("messages_chat")
        .insert([messageToSend])
        .select()
        .single();

      if (insertError) throw insertError;
      if (data) {
        setChatMessages((prev) => {
          const exists = prev.some((msg) => msg.id === data.id);
          return exists ? prev : [...prev, data as DbMessage];
        });
      }
      setChatInput("");
    } catch (err) {
      console.error(err);
      setChatError("L'envoi du message a échoué.");
    } finally {
      setChatSending(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#060f1e] text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-teal-400/80 to-sky-500/80">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-transparent border-t-white border-l-white" />
          </div>
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Chargement du back-office
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#060f1e] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_15%_-10%,rgba(45,212,191,0.22),transparent),radial-gradient(1000px_520px_at_85%_0%,rgba(14,165,233,0.22),transparent)] opacity-80" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,14,30,0.95)0%,rgba(6,14,30,0.88)32%,rgba(6,14,30,0.96)100%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-14">
        <div className="grid gap-10">

          <header className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 shadow-[0_35px_120px_rgba(14,165,233,0.18)] backdrop-blur-md">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.4em] text-teal-200/80">
                  Back-office
                </span>
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
                    Administration & suivi des clients
                  </h1>
                  <p className="mt-3 max-w-3xl text-sm text-white/70 md:text-base">
                    Pilotez vos comptes, attribuez des rôles, surveillez l’activité commerciale et
                    répondez aux échanges clients depuis une interface unifiée. Les connexions
                    régulières (email + Google) restent disponibles côté Espace Client.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button
                    variant="outline"
                    onClick={fetchAllData}
                    disabled={refreshing}
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? "animate-spin" : ""}`} />
                    Actualiser les données
                  </Button>
                  <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
                    <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                    Supabase connecté
                  </span>
                </div>
              </div>
              <div className="w-full rounded-2xl border border-white/10 bg-slate-900/50 p-4 text-sm text-white/70 md:w-60">
                <p className="text-xs uppercase tracking-wide text-white/60">Résumé rapide</p>
                <p className="mt-3 flex items-center justify-between">
                  Connexions OAuth <span className="text-white">Google</span>
                </p>
                <p className="mt-2 flex items-center justify-between">
                  Dernière sync{" "}
                  <span className="text-white">
                    {new Date().toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </p>
                <p className="mt-2 flex items-center justify-between">
                  Clients actifs <span className="text-white">{stats.clients}</span>
                </p>
              </div>
            </div>
          </header>

          {error && (
            <div className="rounded-2xl border border-rose-400/30 bg-rose-500/15 px-4 py-3 text-sm text-rose-100 shadow-[0_20px_60px_rgba(244,63,94,0.25)]">
              <div className="flex items-start gap-3">
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {statusMessage && (
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/15 px-4 py-2 text-sm text-emerald-200 shadow-[0_15px_45px_rgba(16,185,129,0.25)]">
              {statusMessage}
            </div>
          )}

          <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,212,191,0.28),transparent)] opacity-80 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/75">Clients</CardTitle>
                <Users className="h-5 w-5 text-teal-100" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-semibold">{stats.clients}</div>
                <p className="text-xs text-white/70">Profils référencés via Supabase</p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.32),transparent)] opacity-80 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/75">
                  Devis en attente
                </CardTitle>
                <FileText className="h-5 w-5 text-cyan-100" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-semibold">{stats.devisEnAttente}</div>
                <p className="text-xs text-white/70">À relancer dans les plus brefs délais</p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.32),transparent)] opacity-80 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/75">
                  Contrats actifs
                </CardTitle>
                <ShieldCheck className="h-5 w-5 text-emerald-100" />
              </CardHeader>
              <CardContent className="relative">
                <div className="text-3xl font-semibold">{stats.contratsActifs}</div>
                <p className="text-xs text-white/70">Contrats en cours de validité</p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border border-white/10 bg-white/5 backdrop-blur">
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(203,213,225,0.28),transparent)] opacity-80 transition-opacity group-hover:opacity-100" />
              <CardHeader className="relative flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-white/75">
                  Activité récente
                </CardTitle>
                <MessageCircle className="h-5 w-5 text-sky-100" />
              </CardHeader>
              <CardContent className="relative space-y-1 text-xs text-white/70">
                {recentActivity.length === 0 ? (
                  <p>Aucune activité enregistrée.</p>
                ) : (
                  recentActivity.slice(0, 3).map((item) => (
                    <div key={item.id}>
                      <p className="text-white/85">
                        {item.type === "devis" ? "Devis" : "Contrat"} · {item.label}
                      </p>
                      <p>{item.user}</p>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </section>
        </div>

        <section className="grid gap-6 xl:grid-cols-[1.7fr_2fr]">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="space-y-4 pb-6">
              <div>
                <CardTitle className="text-xl font-semibold">Clients</CardTitle>
                <CardDescription className="text-sm text-white/60">
                  Sélectionnez un client pour consulter sa fiche et interagir avec lui.
                </CardDescription>
              </div>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-white/50" />
                <Input
                  placeholder="Rechercher par nom, email, ville ou rôle…"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="h-12 rounded-xl border-white/10 bg-slate-900/60 pl-10 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                />
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="max-h-[460px] overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/40">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-900/70">
                      <TableHead className="text-white/80">Client</TableHead>
                      <TableHead className="text-white/80">Email</TableHead>
                      <TableHead className="text-white/80">Ville</TableHead>
                      <TableHead className="text-white/80">Rôle</TableHead>
                      <TableHead className="text-white/80">Création</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredClients.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="py-6 text-center text-white/60">
                          Aucun client ne correspond à votre recherche.
                        </TableCell>
                      </TableRow>
                    )}
                    {filteredClients.map((client) => {
                      const fullname = `${client.prenom ?? ""} ${client.nom ?? ""}`.trim();
                      return (
                        <TableRow
                          key={client.id}
                          className={`cursor-pointer transition ${
                            activeClientId === client.id
                              ? "bg-teal-500/20 hover:bg-teal-400/25"
                              : "hover:bg-white/5"
                          }`}
                          onClick={() => setActiveClientId(client.id)}
                        >
                          <TableCell className="font-medium text-white">
                            {fullname || "—"}
                          </TableCell>
                          <TableCell className="text-white/80">{client.email}</TableCell>
                          <TableCell className="text-white/80">
                            {client.ville ?? "—"}
                          </TableCell>
                          <TableCell className="text-white/80 capitalize">
                            {client.role ?? "client"}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {client.created_at
                              ? dateFormatter.format(new Date(client.created_at))
                              : "—"}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold text-white">
                Fiche client & discussions
              </CardTitle>
              <CardDescription className="text-sm text-white/60">
                Visualisez les coordonnées, mettez à jour le rôle et suivez les échanges du chat.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {activeClient ? (
                <>
                  <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-5 shadow-inner">
                    <div className="flex flex-col gap-1">
                      <h3 className="text-lg font-semibold text-white">
                        {(activeClient.prenom || activeClient.nom) ? (
                          <>
                            {activeClient.prenom ?? ""} {activeClient.nom ?? ""}
                          </>
                        ) : (
                          activeClient.email
                        )}
                      </h3>
                      <p className="text-xs uppercase tracking-wide text-white/50">
                        Client depuis{" "}
                        {activeClient.created_at
                          ? dateFormatter.format(new Date(activeClient.created_at))
                          : "date inconnue"}
                      </p>
                    </div>

                    <div className="mt-3 grid gap-2 text-sm text-white/80">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-teal-400" />
                        <span>{activeClient.email}</span>
                      </p>
                      {activeClient.telephone && (
                        <p className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-teal-400" />
                          <span>{activeClient.telephone}</span>
                        </p>
                      )}
                      {(activeClient.ville || activeClient.adresse) && (
                        <p className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-teal-400" />
                          <span>
                            {activeClient.adresse ? `${activeClient.adresse}, ` : ""}
                            {activeClient.code_postal ? `${activeClient.code_postal} ` : ""}
                            {activeClient.ville ?? ""}
                          </span>
                        </p>
                      )}
                      {activeClient.date_naissance && (
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-teal-400" />
                          <span>
                            {dateFormatter.format(new Date(activeClient.date_naissance))}
                          </span>
                        </p>
                      )}
                    </div>

                    <div className="mt-4 space-y-2">
                      <p className="text-xs font-semibold uppercase text-white/60">
                        Rôle attribué
                      </p>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                        <Select value={roleDraft} onValueChange={setRoleDraft}>
                          <SelectTrigger className="w-full sm:w-60 border-white/10 bg-slate-900/60 text-white">
                            <SelectValue placeholder="Choisir un rôle" />
                          </SelectTrigger>
                          <SelectContent>
                            {roleOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          onClick={handleRoleUpdate}
                          disabled={roleUpdatingId === activeClient.id || roleDraft === activeClient.role}
                          className="bg-teal-500 hover:bg-teal-400"
                        >
                          {roleUpdatingId === activeClient.id ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Mise à jour…
                            </>
                          ) : (
                            "Enregistrer le rôle"
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 lg:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                        Derniers devis
                      </h4>
                      <div className="mt-2 space-y-3">
                        {devis
                          .filter((item) => item.user_id === activeClient.id)
                          .slice(0, 3)
                          .map((item) => (
                            <div
                              key={item.id}
                              className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white/80"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-white">
                                  {item.type_assurance}
                                </span>
                                <Badge className={devisStatusStyle[item.statut ?? ""] ?? ""}>
                                  {
                                    devisStatusOptions.find((opt) => opt.value === item.statut)
                                      ?.label
                                  }
                                </Badge>
                              </div>
                              <p className="mt-1 text-xs text-white/60">
                                {item.created_at
                                  ? dateFormatter.format(new Date(item.created_at))
                                  : "Date inconnue"}
                              </p>
                            </div>
                          ))}
                        {devis.filter((item) => item.user_id === activeClient.id).length === 0 && (
                          <p className="text-sm text-white/60">
                            Aucun devis enregistré pour ce client.
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                        Derniers contrats
                      </h4>
                      <div className="mt-2 space-y-3">
                        {contrats
                          .filter((contrat) => contrat.user_id === activeClient.id)
                          .slice(0, 3)
                          .map((contrat) => (
                            <div
                              key={contrat.id}
                              className="rounded-xl border border-white/10 bg-slate-900/70 p-3 text-sm text-white/80"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-white">{contrat.type}</span>
                                <Badge className={contratStatusStyle[contrat.statut ?? ""] ?? ""}>
                                  {
                                    contratStatusOptions.find((opt) => opt.value === contrat.statut)
                                      ?.label
                                  }
                                </Badge>
                              </div>
                              <p className="mt-1 text-xs text-white/60">
                                N° {contrat.numero_contrat} — échéance{" "}
                                {contrat.date_fin
                                  ? dateFormatter.format(new Date(contrat.date_fin))
                                  : "non renseignée"}
                              </p>
                            </div>
                          ))}
                        {contrats.filter((contrat) => contrat.user_id === activeClient.id).length ===
                          0 && (
                          <p className="text-sm text-white/60">
                            Aucun contrat enregistré pour ce client.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-white/60">
                      Discussions
                    </h4>
                    <div className="mt-2 rounded-2xl border border-white/10 bg-slate-950/40 shadow-inner">
                      {chatLoading ? (
                        <div className="flex h-48 items-center justify-center text-white/60">
                          <Loader2 className="mr-2 h-5 w-5 animate-spin text-teal-400" />
                          Chargement des messages…
                        </div>
                      ) : (
                        <ScrollArea className="h-60 px-4 py-3">
                          <div className="space-y-3">
                            {chatMessages.length === 0 ? (
                              <p className="text-sm text-white/60">
                                Pas encore de messages pour ce client.
                              </p>
                            ) : (
                              chatMessages.map((msg) => {
                                const label =
                                  msg.sender === "user"
                                    ? "Client"
                                    : msg.sender === "admin"
                                    ? "Admin"
                                    : "Assistant";
                                return (
                                  <div
                                    key={msg.id}
                                    className={`rounded-xl border p-3 ${
                                      msg.sender === "admin"
                                        ? "border-teal-400/40 bg-teal-500/20"
                                        : msg.sender === "user"
                                        ? "border-white/15 bg-white/10"
                                        : "border-white/5 bg-white/5"
                                    }`}
                                  >
                                    <div className="mb-1 flex items-center justify-between text-xs text-white/60">
                                      <span className="font-semibold text-white/80">{label}</span>
                                      {msg.created_at && (
                                        <span className="text-white/50">
                                          {dateFormatter.format(new Date(msg.created_at))} ·{" "}
                                          {timeFormatter.format(new Date(msg.created_at))}
                                        </span>
                                      )}
                                    </div>
                                    <p className="text-sm text-white/85 whitespace-pre-wrap">
                                      {msg.message}
                                    </p>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </ScrollArea>
                      )}

                      {chatError && (
                        <p className="px-4 pt-2 text-sm text-rose-300">{chatError}</p>
                      )}

                      <form
                        onSubmit={sendAdminMessage}
                        className="border-t border-white/10 p-4 space-y-2"
                      >
                        <Textarea
                          value={chatInput}
                          onChange={(event) => setChatInput(event.target.value)}
                          placeholder="Votre réponse au client…"
                          className="min-h-[80px] resize-none border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                          disabled={chatSending}
                        />
                        <div className="flex items-center justify-end">
                          <Button
                            type="submit"
                            disabled={chatSending || chatInput.trim().length === 0}
                            className="bg-teal-500 hover:bg-teal-400"
                          >
                            {chatSending ? (
                              <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Envoi…
                              </>
                            ) : (
                              <>
                                Envoyer
                                <Send className="ml-2 h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </div>
                      </form>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-white/60">
                  Sélectionnez un client dans la liste pour afficher sa fiche.
                </p>
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="flex flex-col gap-2 pb-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-500/30">
                  <UserPlus className="h-5 w-5 text-teal-200" />
                </div>
                <div>
                  <CardTitle className="text-lg text-white">
                    Créer ou mettre à jour un compte client
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Ajoutez un profil et assignez un rôle. Le client finalise son mot de passe via
                    la page Espace Client ou connexion Google.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateUser} className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Prénom</label>
                  <Input
                    value={createForm.prenom}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, prenom: event.target.value }))
                    }
                    placeholder="Alex"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Nom</label>
                  <Input
                    value={createForm.nom}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, nom: event.target.value }))
                    }
                    placeholder="Dupont"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-white/70">
                    Email (utilisé pour la connexion)
                  </label>
                  <Input
                    required
                    value={createForm.email}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, email: event.target.value }))
                    }
                    placeholder="client@email.fr"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Téléphone</label>
                  <Input
                    value={createForm.telephone}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, telephone: event.target.value }))
                    }
                    placeholder="+33 6 12 34 56 78"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Date de naissance</label>
                  <Input
                    type="date"
                    value={createForm.date_naissance}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, date_naissance: event.target.value }))
                    }
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2 md:col-span-2">
                  <label className="text-sm font-medium text-white/70">Adresse</label>
                  <Input
                    value={createForm.adresse}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, adresse: event.target.value }))
                    }
                    placeholder="12 rue de la Paix"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Code postal</label>
                  <Input
                    value={createForm.code_postal}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, code_postal: event.target.value }))
                    }
                    placeholder="75000"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Ville</label>
                  <Input
                    value={createForm.ville}
                    onChange={(event) =>
                      setCreateForm((prev) => ({ ...prev, ville: event.target.value }))
                    }
                    placeholder="Paris"
                    className="border-white/10 bg-slate-900/60 text-white placeholder:text-slate-400 focus-visible:ring-teal-400"
                  />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-white/70">Rôle</label>
                  <Select
                    value={createForm.role}
                    onValueChange={(value) =>
                      setCreateForm((prev) => ({ ...prev, role: value }))
                    }
                  >
                    <SelectTrigger className="border-white/10 bg-slate-900/60 text-white">
                      <SelectValue placeholder="Sélectionner un rôle" />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-end justify-end md:col-span-2">
                  <Button type="submit" disabled={createLoading} className="bg-teal-500 hover:bg-teal-400">
                    {createLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Enregistrement…
                      </>
                    ) : (
                      "Enregistrer le profil"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Activité récente</CardTitle>
              <CardDescription className="text-white/60">
                Un aperçu rapide des derniers devis et contrats générés.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.length === 0 ? (
                <p className="text-sm text-white/60">Aucune activité enregistrée pour le moment.</p>
              ) : (
                recentActivity.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 rounded-xl border border-white/10 bg-slate-900/70 p-3"
                  >
                    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                      {item.type === "devis" ? (
                        <FileText className="h-5 w-5 text-teal-300" />
                      ) : (
                        <ShieldCheck className="h-5 w-5 text-emerald-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">
                        {item.label}
                      </p>
                      <p className="text-xs text-white/70">{item.user}</p>
                      {item.created_at && (
                        <p className="text-xs text-white/50">
                          {dateFormatter.format(new Date(item.created_at))}
                        </p>
                      )}
                      {item.status && (
                        <p className="mt-1 text-xs uppercase tracking-wide text-white/50">
                          Statut : {item.status}
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Tous les devis</CardTitle>
              <CardDescription className="text-white/60">
                Gérez les statuts des devis pour accélérer le traitement commercial.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="max-h-[420px] overflow-y-auto rounded-lg border border-white/10 bg-slate-950/40">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-900/70">
                      <TableHead className="text-white/80">Client</TableHead>
                      <TableHead className="text-white/80">Type</TableHead>
                      <TableHead className="text-white/80">Créé le</TableHead>
                      <TableHead className="text-white/80">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {devis.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={4} className="py-6 text-center text-white/60">
                          Aucun devis enregistré.
                        </TableCell>
                      </TableRow>
                    )}
                    {devis.map((item) => {
                      const fullname =
                        item.client?.prenom || item.client?.nom
                          ? `${item.client?.prenom ?? ""} ${item.client?.nom ?? ""}`.trim()
                          : item.client?.email ?? "Client inconnu";
                      return (
                        <TableRow key={item.id} className="hover:bg-white/5">
                          <TableCell className="font-medium text-white">
                            {fullname}
                          </TableCell>
                          <TableCell className="text-white/80">
                            {item.type_assurance}
                          </TableCell>
                          <TableCell className="text-white/80">
                            {item.created_at
                              ? dateFormatter.format(new Date(item.created_at))
                              : "—"}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={item.statut ?? "en_attente"}
                              onValueChange={(value) => updateDevisStatus(item.id, value)}
                              disabled={updatingDevisId === item.id}
                            >
                              <SelectTrigger className="w-[160px] border-white/10 bg-slate-900/60 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {devisStatusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-white/10 bg-slate-900/80 text-white shadow-[0_25px_70px_rgba(15,23,42,0.45)] backdrop-blur">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-white">Tous les contrats</CardTitle>
              <CardDescription className="text-white/60">
                Surveillez les échéances et les montants associés à chaque contrat.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="max-h-[420px] overflow-y-auto rounded-lg border border-white/10 bg-slate-950/40">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-900/70">
                      <TableHead className="text-white/80">Contrat</TableHead>
                      <TableHead className="text-white/80">Client</TableHead>
                      <TableHead className="text-white/80">Fin</TableHead>
                      <TableHead className="text-white/80">Montant</TableHead>
                      <TableHead className="text-white/80">Statut</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contrats.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={5} className="py-6 text-center text-white/60">
                          Aucun contrat enregistré.
                        </TableCell>
                      </TableRow>
                    )}
                    {contrats.map((contrat) => {
                      const fullname =
                        contrat.client?.prenom || contrat.client?.nom
                          ? `${contrat.client?.prenom ?? ""} ${contrat.client?.nom ?? ""}`.trim()
                          : contrat.client?.email ?? "Client inconnu";
                      return (
                        <TableRow key={contrat.id} className="hover:bg-white/5">
                          <TableCell className="font-medium text-white">
                            {contrat.numero_contrat}
                          </TableCell>
                          <TableCell className="text-white/80">{fullname}</TableCell>
                          <TableCell className="text-white/80">
                            {contrat.date_fin
                              ? dateFormatter.format(new Date(contrat.date_fin))
                              : "—"}
                          </TableCell>
                          <TableCell className="text-white/80">
                            {Number.isFinite(contrat.montant)
                              ? currencyFormatter.format(Number(contrat.montant))
                              : "—"}
                          </TableCell>
                          <TableCell>
                            <Select
                              value={contrat.statut ?? "actif"}
                              onValueChange={(value) => updateContratStatus(contrat.id, value)}
                              disabled={updatingContratId === contrat.id}
                            >
                              <SelectTrigger className="w-[160px] border-white/10 bg-slate-900/60 text-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {contratStatusOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />
    </div>
  );
}
