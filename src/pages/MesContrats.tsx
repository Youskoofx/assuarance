import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import {
  CalendarDays,
  FileText,
  Loader2,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

type DbContrat = Database["public"]["Tables"]["contrats"]["Row"];

const statusLabels: Record<string, string> = {
  actif: "Actif",
  suspendu: "Suspendu",
  resilie: "Résilié",
};

const statusColors: Record<string, string> = {
  actif: "bg-emerald-100 text-emerald-700 border-emerald-200",
  suspendu: "bg-amber-100 text-amber-700 border-amber-200",
  resilie: "bg-rose-100 text-rose-700 border-rose-200",
};

const typeLabels: Record<string, string> = {
  auto: "Assurance Auto",
  moto: "Assurance Moto",
  habitation: "Assurance Habitation",
  sante: "Santé",
  prevoyance: "Prévoyance",
  flotte: "Flotte Auto",
  rc_pro: "Responsabilité Civile Pro",
  multirisque: "Multirisque",
};

function formatAmount(value: string | number | null | undefined) {
  if (value == null) return "—";
  const numeric = typeof value === "string" ? parseFloat(value) : value;
  if (Number.isNaN(numeric)) return "—";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(numeric);
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

export default function MesContrats() {
  const { user } = useAuth();
  const [contrats, setContrats] = useState<DbContrat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    async function fetchContrats() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("contrats")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        if (isMounted) {
          setContrats(data ?? []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            "Impossible de récupérer vos contrats pour le moment. Merci de réessayer plus tard."
          );
          setContrats([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchContrats();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const filteredContrats = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();

    return contrats.filter((contrat) => {
      const matchesStatus =
        statusFilter === "all" ? true : contrat.statut === statusFilter;
      const matchesType =
        typeFilter === "all" ? true : contrat.type === typeFilter;
      const matchesSearch =
        !searchTerm ||
        contrat.numero_contrat?.toLowerCase().includes(searchTerm) ||
        contrat.type?.toLowerCase().includes(searchTerm);
      return matchesStatus && matchesType && matchesSearch;
    });
  }, [contrats, statusFilter, typeFilter, search]);

  const activeContrats = useMemo(
    () => contrats.filter((contrat) => contrat.statut === "actif"),
    [contrats]
  );

  const nextRenewals = useMemo(() => {
    return [...contrats]
      .filter((contrat) => contrat.date_fin)
      .sort((a, b) => {
        const aDate = new Date(a.date_fin ?? "").getTime();
        const bDate = new Date(b.date_fin ?? "").getTime();
        return aDate - bDate;
      })
      .slice(0, 3);
  }, [contrats]);

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(20,184,166,0.15),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_90%_-10%,rgba(56,189,248,0.12),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24 text-white">
        <header className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Badge className="mb-4 bg-teal-500/20 text-teal-200">
                Mon espace
              </Badge>
              <h1 className="text-4xl font-semibold tracking-tight">
                Mes contrats d’assurance
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-white/70">
                Visualisez vos contrats en cours, vos échéances et vos documents associés.
                Ajustez votre couverture à tout moment, notre équipe vous accompagne.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="bg-white/[0.08] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
                    <ShieldCheck className="h-4 w-4 text-teal-200" />
                    Contrats actifs
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-semibold">
                    {activeContrats.length}
                  </p>
                  <p className="text-sm text-white/60">
                    {activeContrats.length > 0
                      ? "Couverture opérationnelle"
                      : "Aucun contrat actif"}
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.08] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/60">
                    <CalendarDays className="h-4 w-4 text-sky-200" />
                    Prochaines échéances
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-semibold">
                    {nextRenewals.length}
                  </p>
                  <p className="text-sm text-white/60">
                    Surveillez les renouvellements à venir
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr_360px]">
          <Card className="border-white/10 bg-white/[0.04] text-white">
            <CardHeader className="pb-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">
                    Vue d’ensemble
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Filtrez par statut ou par type de contrat pour retrouver une information spécifique.
                  </CardDescription>
                </div>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full min-w-[160px] bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="Statut" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-white">
                      <SelectItem value="all">Tous les statuts</SelectItem>
                      <SelectItem value="actif">Actif</SelectItem>
                      <SelectItem value="suspendu">Suspendu</SelectItem>
                      <SelectItem value="resilie">Résilié</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full min-w-[180px] bg-white/10 text-white border-white/20">
                      <SelectValue placeholder="Type de contrat" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 text-white">
                      <SelectItem value="all">Tous les types</SelectItem>
                      {Object.entries(typeLabels).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher par numéro ou type de contrat…"
                className="mt-6 bg-white/10 text-white placeholder:text-white/50 border-white/10"
              />
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-48 flex-col items-center justify-center gap-4 text-white/70">
                  <Loader2 className="h-8 w-8 animate-spin text-teal-200" />
                  <p>Chargement de vos contrats…</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center gap-3 rounded-2xl border border-rose-300/40 bg-rose-500/10 p-6 text-center text-rose-50">
                  <AlertTriangle className="h-6 w-6" />
                  <p>{error}</p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Réessayer
                  </Button>
                </div>
              ) : filteredContrats.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.02] p-10 text-center text-white/70">
                  <FileText className="h-10 w-10 text-teal-200" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Aucun contrat trouvé
                    </h3>
                    <p className="mt-2">
                      Vous pouvez démarrer une nouvelle souscription en quelques minutes.
                    </p>
                  </div>
                  <Button asChild className="bg-teal-500 hover:bg-teal-400">
                    <a href="/devis">
                      Demander un devis
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto rounded-2xl border border-white/10">
                  <Table>
                    <TableHeader className="bg-white/[0.06]">
                      <TableRow className="border-white/10 text-white/70">
                        <TableHead className="min-w-[140px]">
                          Numéro de contrat
                        </TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Début</TableHead>
                        <TableHead>Fin</TableHead>
                        <TableHead>Prime annuelle</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredContrats.map((contrat) => (
                        <TableRow
                          key={contrat.id}
                          className="border-white/5 hover:bg-white/5"
                        >
                          <TableCell className="font-medium text-white">
                            {contrat.numero_contrat}
                          </TableCell>
                          <TableCell className="text-white/80">
                            {typeLabels[contrat.type ?? ""] ??
                              contrat.type ??
                              "—"}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
                                statusColors[contrat.statut ?? ""] ??
                                "bg-white/10 text-white border-white/20"
                              }`}
                            >
                              {statusLabels[contrat.statut ?? ""] ??
                                contrat.statut ??
                                "—"}
                            </span>
                          </TableCell>
                          <TableCell className="text-white/70">
                            {formatDate(contrat.date_debut)}
                          </TableCell>
                          <TableCell className="text-white/70">
                            {formatDate(contrat.date_fin)}
                          </TableCell>
                          <TableCell className="text-white">
                            {formatAmount(contrat.montant)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <CalendarDays className="h-5 w-5 text-sky-200" />
                  Échéances à surveiller
                </CardTitle>
                <CardDescription className="text-white/60">
                  Préparez vos renouvellements ou renégociations en un coup d’œil.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {nextRenewals.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/70">
                    Aucune échéance planifiée pour le moment.
                  </p>
                ) : (
                  nextRenewals.map((contrat) => (
                    <div
                      key={`${contrat.id}-renewal`}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                    >
                      <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                          {typeLabels[contrat.type ?? ""] ??
                            contrat.type ??
                            "Contrat"}
                        </p>
                        <Badge
                          className={`border ${
                            statusColors[contrat.statut ?? ""] ??
                            "bg-white/10 text-white border-white/20"
                          }`}
                        >
                          {statusLabels[contrat.statut ?? ""] ??
                            contrat.statut ??
                            "—"}
                        </Badge>
                      </div>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {contrat.numero_contrat}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/70">
                        <span className="inline-flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-sky-200" />
                          Fin le {formatDate(contrat.date_fin)}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <TrendingUp className="h-4 w-4 text-teal-200" />
                          {formatAmount(contrat.montant)} / an
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <AlertTriangle className="h-5 w-5 text-amber-200" />
                  Besoin d’un ajustement ?
                </CardTitle>
                <CardDescription className="text-white/60">
                  Renforcez vos garanties ou signalez un changement de situation.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-white/70">
                  Notre équipe vous accompagne pour adapter vos contrats à l’évolution de vos
                  besoins. Déclarez un sinistre, modifiez un conducteur ou demandez une extension de
                  garanties en quelques minutes.
                </p>
                <div className="flex flex-col gap-3">
                  <Button
                    asChild
                    className="bg-white text-slate-900 hover:bg-slate-100"
                  >
                    <a href="/contact">
                      Contacter un conseiller
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="border-white/40 bg-white/[0.08] text-white hover:bg-white/20"
                  >
                    <a href="mailto:gestion@assurance.fr?subject=Demande%20de%20modification%20de%20contrat">
                      Demander une modification
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <FileText className="h-5 w-5 text-teal-200" />
                  Documents associés
                </CardTitle>
                <CardDescription className="text-white/60">
                  Retrouver l’ensemble de vos attestations et notices d’information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-white/70">
                  Les attestations et notices sont centralisées dans l’onglet{" "}
                  <strong className="text-white">Mes documents</strong>. Vous pouvez les télécharger
                  à tout moment.
                </p>
                <Button
                  asChild
                  variant="outline"
                  className="border-white/30 bg-white/[0.08] text-white hover:bg-white/20"
                >
                  <a href="/espace-client/documents">
                    Accéder à mes documents
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
