import { useEffect, useMemo, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase";
import type { Database } from "@/types/supabase";
import {
  Download,
  FileText,
  Loader2,
  FolderOpen,
  AlarmClock,
  Search,
  Shield,
  CheckCircle2,
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type DbDocument = Database["public"]["Tables"]["documents"]["Row"];

const typeLabels: Record<string, { label: string; description: string }> = {
  attestation: {
    label: "Attestation",
    description: "Document officiel confirmant votre couverture actuelle.",
  },
  notice: {
    label: "Notice",
    description: "Détail des garanties, exclusions et modalités de prise en charge.",
  },
  conditions: {
    label: "Conditions particulières",
    description: "Spécificités de votre contrat et options éventuelles.",
  },
  quittance: {
    label: "Quittance",
    description: "Justificatif de paiement de votre prime d’assurance.",
  },
};

function formatDate(value: string | null) {
  if (!value) return "—";
  try {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(value));
  } catch {
    return "—";
  }
}

function getTypeLabel(type: string | null) {
  if (!type) return "Document";
  return typeLabels[type]?.label ?? type.charAt(0).toUpperCase() + type.slice(1);
}

export default function MesDocuments() {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<DbDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (!user?.id) return;

    let isMounted = true;

    async function fetchDocuments() {
      setLoading(true);
      setError(null);
      try {
        const { data, error: fetchError } = await supabase
          .from("documents")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (fetchError) throw fetchError;
        if (isMounted) {
          setDocuments(data ?? []);
        }
      } catch (err) {
        console.error(err);
        if (isMounted) {
          setError(
            "Vos documents ne peuvent pas être chargés pour le moment. Merci de réessayer."
          );
          setDocuments([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    void fetchDocuments();

    return () => {
      isMounted = false;
    };
  }, [user?.id]);

  const stats = useMemo(() => {
    return documents.reduce(
      (acc, doc) => {
        const key = doc.type ?? "autres";
        if (!acc[key]) {
          acc[key] = 0;
        }
        acc[key] += 1;
        return acc;
      },
      {} as Record<string, number>
    );
  }, [documents]);

  const filteredDocuments = useMemo(() => {
    const term = search.trim().toLowerCase();
    return documents.filter((doc) => {
      const matchesType = typeFilter === "all" ? true : doc.type === typeFilter;
      const matchesSearch =
        !term ||
        doc.nom?.toLowerCase().includes(term) ||
        doc.type?.toLowerCase().includes(term);
      return matchesType && matchesSearch;
    });
  }, [documents, typeFilter, search]);

  const mostRecent = filteredDocuments.slice(0, 5);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_10%_-10%,rgba(56,189,248,0.12),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_85%_-10%,rgba(20,184,166,0.16),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 pt-24">
        <header className="mb-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
          <Badge className="mb-4 bg-cyan-500/20 text-cyan-100">
            Mon coffre-fort numérique
          </Badge>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold tracking-tight">
                Mes documents d’assurance
              </h1>
              <p className="max-w-2xl text-lg text-white/70">
                Attestations, notices, quittances… retrouvez l’ensemble de vos documents dans un
                espace sécurisé disponible 24h/24.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <Card className="bg-white/[0.05] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/50">
                    <FolderOpen className="h-4 w-4 text-cyan-200" />
                    Documents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-semibold">{documents.length}</p>
                  <p className="text-sm text-white/60">Disponibles immédiatement</p>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.05] text-white">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/50">
                    <Shield className="h-4 w-4 text-teal-200" />
                    Sécurité
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-semibold">
                    Stockage chiffré & téléchargements illimités
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </header>

        <section className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <Card className="border-white/10 bg-white/[0.05] text-white">
            <CardHeader className="pb-6">
              <div className="flex flex-col gap-6 xl:flex-row xl:items-end xl:justify-between">
                <div>
                  <CardTitle className="text-2xl font-semibold">
                    Bibliothèque sécurisée
                  </CardTitle>
                  <CardDescription className="text-white/60">
                    Filtrez, recherchez et téléchargez vos documents en un clic.
                  </CardDescription>
                </div>
                <div className="flex flex-wrap gap-3 text-sm text-white/60">
                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200/40 bg-cyan-200/10 px-3 py-1">
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" />
                    Signature électronique acceptée
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-200/40 bg-teal-200/10 px-3 py-1">
                    <AlarmClock className="h-4 w-4 text-teal-200" />
                    Archivage 5 ans minimum
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-4 lg:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
                  <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Rechercher un document par nom ou type…"
                    className="h-11 border-white/10 bg-white/10 pl-10 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  <Button
                    variant="outline"
                    onClick={() => setTypeFilter("all")}
                    className={cn(
                      "border-white/20 bg-white/10 text-sm text-white hover:bg-white/20",
                      typeFilter === "all" && "bg-white text-slate-900"
                    )}
                  >
                    Tous
                  </Button>
                  {Object.entries(typeLabels).map(([key, value]) => (
                    <Button
                      key={key}
                      variant="outline"
                      onClick={() =>
                        setTypeFilter(typeFilter === key ? "all" : key)
                      }
                      className={cn(
                        "border-white/20 bg-white/10 text-sm text-white hover:bg-white/20",
                        typeFilter === key && "bg-white text-slate-900"
                      )}
                    >
                      {value.label}
                    </Button>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex h-48 flex-col items-center justify-center gap-4 text-white/70">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-200" />
                  <p>Téléchargement sécurisé en cours…</p>
                </div>
              ) : error ? (
                <div className="rounded-2xl border border-rose-300/40 bg-rose-600/10 p-6 text-center text-rose-100">
                  <p>{error}</p>
                </div>
              ) : filteredDocuments.length === 0 ? (
                <div className="flex flex-col items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.03] p-12 text-center text-white/70">
                  <FileText className="h-10 w-10 text-cyan-200" />
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      Aucun document disponible
                    </h3>
                    <p className="mt-2">
                      Dès qu’un document sera émis, il apparaîtra automatiquement ici.
                    </p>
                  </div>
                  <Button asChild className="bg-cyan-500 hover:bg-cyan-400">
                    <a href="/contact">Demander un document</a>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredDocuments.map((doc) => (
                    <article
                      key={doc.id}
                      className="group flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:bg-white/[0.08]"
                    >
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="text-lg font-semibold text-white group-hover:text-white">
                            {doc.nom}
                          </h3>
                          <Badge className="border border-white/20 bg-white/10 text-xs uppercase tracking-wide text-white/70">
                            {getTypeLabel(doc.type)}
                          </Badge>
                        </div>
                        <p className="text-sm text-white/60">
                          {typeLabels[doc.type ?? ""]?.description ??
                            "Document associé à votre contrat."}
                        </p>
                        <p className="text-xs uppercase tracking-[0.2em] text-white/40">
                          Mis en ligne le {formatDate(doc.created_at)}
                        </p>
                      </div>
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="border-white/30 bg-white/10 text-white hover:bg-white/20"
                      >
                        <a
                          href={doc.url ?? "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Download className="mr-2 h-4 w-4" />
                          Télécharger
                        </a>
                      </Button>
                    </article>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Dernières publications
                </CardTitle>
                <CardDescription className="text-white/60">
                  Un aperçu rapide des documents récemment ajoutés.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {mostRecent.length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/70">
                    Les nouveaux documents apparaîtront dès qu’ils seront disponibles.
                  </p>
                ) : (
                  <ScrollArea className="h-[360px] pr-4">
                    <div className="space-y-4">
                      {mostRecent.map((doc) => (
                        <div
                          key={doc.id}
                          className="rounded-2xl border border-white/10 bg-white/[0.05] p-4"
                        >
                          <p className="text-sm uppercase tracking-[0.2em] text-white/50">
                            {getTypeLabel(doc.type)}
                          </p>
                          <p className="mt-1 text-base font-semibold text-white">
                            {doc.nom}
                          </p>
                          <p className="mt-2 text-xs text-white/60">
                            Ajouté le {formatDate(doc.created_at)}
                          </p>
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="mt-3 h-8 px-2 text-sm text-cyan-200 hover:text-white"
                          >
                            <a
                              href={doc.url ?? "#"}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Ouvrir le document
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/[0.05] text-white">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">
                  Répartition par catégorie
                </CardTitle>
                <CardDescription className="text-white/60">
                  Comprenez rapidement la typologie de vos documents.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.keys(stats).length === 0 ? (
                  <p className="rounded-xl border border-white/10 bg-white/[0.05] p-4 text-sm text-white/70">
                    Le détail apparaîtra lorsque des documents seront disponibles.
                  </p>
                ) : (
                  Object.entries(stats).map(([type, count]) => {
                    const total = documents.length || 1;
                    const percentage = Math.round((count / total) * 100);
                    return (
                      <div
                        key={type}
                        className="rounded-xl border border-white/10 bg-white/[0.04] p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-semibold text-white">
                              {getTypeLabel(type)}
                            </p>
                            <p className="text-xs text-white/60">
                              {typeLabels[type]?.description ??
                                "Document associé à vos contrats."}
                            </p>
                          </div>
                          <span className="text-lg font-semibold text-cyan-100">
                            {count}
                          </span>
                        </div>
                        <div className="mt-3 h-2 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })
                )}
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
