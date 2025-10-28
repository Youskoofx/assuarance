// src/pages/Actualites.tsx
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowRight, Calendar, Tag, User, AlertCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { ArticleRecord } from '@/lib/articles'
import { demoArticles, formatArticleDate, getArticleExcerpt, sortArticles } from '@/lib/articles'

type Article = ArticleRecord

const ARTICLES_PER_PAGE = 9

// Images
const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1522206024047-9c9254216757?q=80&w=1600&auto=format&fit=crop'
const PAGE_BACKGROUND =
  'https://images.unsplash.com/photo-1483721310020-03333e577078?q=80&w=2000&auto=format&fit=crop'
const HERO_BG =
  'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop'

// normalise pour comparer des catégories
const norm = (s?: string) =>
  (s ?? '')
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase()

export default function Actualites() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)

  const fetchArticles = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('articles')
      .select('*')
      .eq('is_published', true)
    if (fetchError) throw new Error(fetchError.message)
    const source = data && data.length ? data : demoArticles
    return sortArticles(source)
  }, [])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchArticles()
        if (!cancelled) setArticles(data)
      } catch (e: unknown) {
        console.error(e)
        const fallback = sortArticles(demoArticles)
        if (!cancelled) {
          setArticles(fallback)
          setError(fallback.length ? null : "Impossible de charger les articles pour le moment.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [fetchArticles])

  const handleRetry = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await fetchArticles()
      setArticles(data)
    } catch (e) {
      console.error(e)
      const fallback = sortArticles(demoArticles)
      setArticles(fallback)
      setError(fallback.length ? null : "Impossible de charger les articles pour le moment.")
    } finally {
      setLoading(false)
    }
  }

  const categories = useMemo(() => {
    const unique = new Set<string>()
    articles.forEach((a) => {
      const c = a.category?.trim()
      if (c) unique.add(c)
    })
    return ['Tous', ...Array.from(unique).sort((a, b) => a.localeCompare(b, 'fr'))]
  }, [articles])

  useEffect(() => setCurrentPage(1), [selectedCategory])

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'Tous') return articles
    const target = norm(selectedCategory)
    return articles.filter((a) => norm(a.category) === target)
  }, [articles, selectedCategory])

  const totalPages = filteredArticles.length
    ? Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE)
    : 0

  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) setCurrentPage(totalPages)
  }, [totalPages, currentPage])

  const paginatedArticles = useMemo(() => {
    if (!filteredArticles.length) return []
    const start = (currentPage - 1) * ARTICLES_PER_PAGE
    return filteredArticles.slice(start, start + ARTICLES_PER_PAGE)
  }, [filteredArticles, currentPage])

  const featuredArticle = currentPage === 1 ? paginatedArticles[0] ?? null : null
  const gridArticles = featuredArticle ? paginatedArticles.slice(1) : paginatedArticles
  const highlightDeck = featuredArticle ? gridArticles.slice(0, 3) : []
  const remainingArticles = featuredArticle ? gridArticles.slice(highlightDeck.length) : gridArticles

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900/70 to-slate-50 pb-24 text-slate-900">
      {/* Background photo & dégradé sombre */}
      <div
        className="pointer-events-none fixed inset-0 -z-10"
        style={{
          backgroundImage: `linear-gradient(
              180deg,
              rgba(6,13,30,0.92) 0%,
              rgba(8,20,37,0.78) 35%,
              rgba(243,246,250,0.94) 100%
            ), url(${PAGE_BACKGROUND})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.72) brightness(0.95)',
        }}
        aria-hidden
      />

      <BackdropAura />

      {/* HERO */}
      <section className="relative z-10 flex min-h-[52vh] items-center overflow-hidden px-6 pt-28 md:pt-32">
        <div className="absolute inset-0" aria-hidden>
          <img
            src={HERO_BG}
            alt=""
            className="h-full w-full object-cover opacity-28"
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950/92 via-slate-950/86 to-slate-900/82" />
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-slate-900/10 to-white/6" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-6 text-white drop-shadow-[0_18px_32px_rgba(2,6,23,0.4)]">
          <nav className="text-sm text-white/70">
            <Link to="/" className="transition hover:text-white">Accueil</Link> /{' '}
            <span className="text-white">Actualités</span>
          </nav>

          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-200/80">
                Édition du jour
              </p>
              <h1 className="mt-2 text-4xl font-bold leading-tight md:text-6xl">
                Actualités & Guides d’assurance
              </h1>
              <p className="mt-4 max-w-3xl text-base text-white/85 md:text-[17px]">
                Décryptages, retours d’expérience et analyses de nos experts pour vous guider dans vos choix d’assurance.
              </p>
            </div>

            {articles.length > 0 && (
              <div className="rounded-full border border-white/20 bg-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-md">
                {articles.length} article{articles.length > 1 ? 's' : ''} publiés
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Filtres */}
      <section className="relative z-10 border-y border-slate-200/80 bg-white px-6 py-8 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="mx-auto flex max-w-6xl flex-wrap gap-4 md:gap-6">
          {categories.map((category) => {
            const active = selectedCategory === category
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={active}
                className={[
                  'rounded-full border px-5 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500',
                  active
                    ? 'border-teal-600 bg-teal-600 text-white shadow-[0_12px_30px_rgba(13,148,136,0.35)]'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700 hover:shadow-[0_10px_26px_rgba(15,23,42,0.08)]',
                ].join(' ')}
              >
                {category}
              </button>
            )
          })}
        </div>
      </section>

      {/* Contenu */}
      <section className="relative z-10 px-6 pt-16">
        <div className="mx-auto max-w-6xl space-y-14">
          {error && !loading && articles.length === 0 && (
            <div className="rounded-3xl border border-rose-200 bg-rose-50/90 p-8 text-rose-600 shadow-[0_20px_45px_rgba(244,114,182,0.15)] backdrop-blur">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-1 h-5 w-5" />
                <div>
                  <p className="text-lg font-semibold">Oups, un incident est survenu</p>
                  <p className="mt-2 text-sm text-rose-500">{error}</p>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-5 border-rose-300 bg-white text-rose-600 hover:bg-rose-100"
                onClick={handleRetry}
              >
                Réessayer le chargement
              </Button>
            </div>
          )}

          {loading && articles.length === 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: ARTICLES_PER_PAGE }).map((_, i) => (
                <ArticleSkeleton key={i} />
              ))}
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center text-slate-600 shadow-[0_25px_60px_rgba(15,23,42,0.12)]">
              <h2 className="text-2xl font-bold text-slate-900">Aucun article pour cette catégorie</h2>
              <p className="mt-3">
                Revenez bientôt : nous publions régulièrement de nouveaux contenus.
              </p>
            </div>
          ) : (
            <>
              {featuredArticle && (
                <div className="space-y-12">
                  <LeadStory article={featuredArticle} />
                  <JournalDeck articles={highlightDeck} />
                </div>
              )}

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {remainingArticles.map((article, index) => (
                  <ArticleCard key={article.id} article={article} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onChange={setCurrentPage}
                />
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

/* ---------- Sous-composants ---------- */

function LeadStory({ article }: { article: Article }) {
  const cover = article.cover_url || article.thumbnail_url || FALLBACK_IMAGE
  const date = formatArticleDate(article)
  const excerpt = getArticleExcerpt(article, 260)

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      viewport={{ once: true }}
      className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-[0_35px_120px_rgba(15,23,42,0.18)]"
    >
      <Link to={`/actualites/${article.slug}`} className="group block h-full">
        <div className="absolute inset-0">
          <img
            src={cover}
            alt={article.title || 'Couverture article'}
            className="h-full w-full object-cover opacity-25 transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white/80 to-white/35" />
        </div>

        <div className="relative z-10 grid gap-6 p-8 md:grid-cols-[1.2fr_1fr] md:p-14 text-slate-900">
          <div className="space-y-4">
            {article.category && (
              <span className="inline-flex w-max items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-teal-700">
                <Tag className="h-3 w-3" />
                {article.category}
              </span>
            )}
            <h2 className="text-3xl font-semibold leading-tight md:text-5xl">
              {article.title}
            </h2>
            <p className="text-base text-slate-700 md:text-lg">{excerpt}</p>
            <div className="flex flex-wrap items-center gap-5 text-sm text-slate-500">
              {article.author_name && (
                <span className="flex items-center gap-2">
                  <User className="h-4 w-4 text-teal-600" />
                  {article.author_name}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-teal-600" />
                {date}
              </span>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-3xl border border-slate-200 bg-white p-6 text-slate-700 shadow-[0_18px_40px_rgba(15,23,42,0.12)]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                Résumé
              </p>
              <p className="mt-3 text-sm text-slate-600">
                {excerpt.slice(0, 180)}
                {excerpt.length > 180 ? '…' : ''}
              </p>
            </div>
            <div className="flex items-center justify-between text-sm text-teal-700">
              <span>Lire l'article</span>
              <ArrowRight className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function JournalDeck({ articles }: { articles: Article[] }) {
  if (!articles.length) return null
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_25px_60px_rgba(15,23,42,0.12)]"
    >
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            Chroniques
          </p>
          <h3 className="text-xl font-semibold text-slate-900">
            Les articles à ne pas manquer
          </h3>
        </div>
        <span className="rounded-full border border-teal-100 bg-teal-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-teal-700">
          Journal
        </span>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {articles.map((article, index) => (
          <JournalCard key={article.id} article={article} index={index} />
        ))}
      </div>
    </motion.div>
  )
}

function JournalCard({ article, index }: { article: Article; index: number }) {
  const cover = article.thumbnail_url || article.cover_url || FALLBACK_IMAGE
  const date = formatArticleDate(article)
  const excerpt = getArticleExcerpt(article, 140)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05 }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 text-slate-900 shadow-[0_18px_45px_rgba(15,23,42,0.12)]"
    >
      <div className="absolute right-6 top-6 text-lg font-semibold text-slate-400">
        {String(index + 1).padStart(2, '0')}
      </div>
      <Link to={`/actualites/${article.slug}`} className="flex flex-col gap-4">
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={cover}
            alt={article.title || 'Couverture article'}
            className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
          <div className="absolute left-4 bottom-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
            <Calendar className="h-4 w-4 text-white" />
            {date}
          </div>
        </div>
        <h3 className="text-lg font-semibold text-slate-900 transition group-hover:text-teal-600">
          {article.title}
        </h3>
        <p className="text-sm text-slate-600 line-clamp-3">{excerpt}</p>
      </Link>
      {article.author_name && (
        <div className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-500">
          <span>{article.author_name}</span>
          <span className="text-teal-600">Lire →</span>
        </div>
      )}
    </motion.article>
  )
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const cover = article.thumbnail_url || article.cover_url || FALLBACK_IMAGE
  const date = formatArticleDate(article)
  const excerpt = getArticleExcerpt(article, 180)

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_25px_60px_rgba(15,23,42,0.18)]"
    >
      <Link to={`/actualites/${article.slug}`} className="relative block h-48 overflow-hidden">
        <img
          src={cover}
          alt={article.title || 'Couverture article'}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {article.category && (
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-teal-700 shadow">
            <Tag className="h-3 w-3" />
            {article.category}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-4 p-6 text-slate-700">
        <Link
          to={`/actualites/${article.slug}`}
          className="text-xl font-semibold text-slate-900 transition hover:text-teal-600"
        >
          {article.title}
        </Link>
        <p className="text-sm text-slate-600 line-clamp-3">{excerpt}</p>

        <div className="mt-auto flex items-center justify-between text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
          <span className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-teal-600" />
            {date}
          </span>
          {article.author_name && (
            <span className="flex items-center gap-2">
              <User className="h-3.5 w-3.5 text-teal-600" />
              {article.author_name}
            </span>
          )}
        </div>

        <Button
          asChild
          className="mt-5 w-full rounded-full border border-teal-600 bg-teal-600 text-sm font-semibold text-white transition hover:border-teal-700 hover:bg-teal-700"
        >
          <Link to={`/actualites/${article.slug}`} className="flex items-center justify-center gap-2">
            Lire la suite
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </motion.article>
  )
}

function Pagination({
  totalPages,
  currentPage,
  onChange,
}: {
  totalPages: number
  currentPage: number
  onChange: (page: number) => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
      <Button
        variant="outline"
        disabled={currentPage === 1}
        onClick={() => onChange(Math.max(1, currentPage - 1))}
        className="border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:text-teal-700 disabled:bg-slate-100 disabled:text-slate-400"
      >
        Page précédente
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => {
        const active = currentPage === n
        return (
          <button
            key={n}
            onClick={() => onChange(n)}
            className={`h-10 w-10 rounded-full text-sm font-semibold transition ${
              active
                ? 'bg-teal-600 text-white shadow-[0_12px_30px_rgba(13,148,136,0.35)]'
                : 'border border-slate-200 bg-white text-slate-600 hover:border-teal-200 hover:text-teal-700'
            }`}
            aria-current={active ? 'page' : undefined}
          >
            {n}
          </button>
        )
      })}

      <Button
        variant="outline"
        disabled={currentPage === totalPages}
        onClick={() => onChange(Math.min(totalPages, currentPage + 1))}
        className="border border-slate-200 bg-white text-slate-700 hover:border-teal-200 hover:text-teal-700 disabled:bg-slate-100 disabled:text-slate-400"
      >
        Page suivante
      </Button>
    </div>
  )
}

function ArticleSkeleton() {
  return (
    <div className="flex h-full animate-pulse flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white">
      <div className="h-48 w-full bg-slate-200/70" />
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="h-4 w-2/3 rounded-full bg-slate-200/70" />
        <div className="h-4 w-1/2 rounded-full bg-slate-200/70" />
        <div className="h-4 w-3/4 rounded-full bg-slate-200/70" />
        <div className="mt-auto h-10 w-full rounded-full bg-slate-200/70" />
      </div>
    </div>
  )
}

function BackdropAura() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden>
      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-teal-400/25 blur-[140px]" />
      <div className="absolute right-[-120px] top-[240px] h-[360px] w-[360px] rounded-full bg-sky-300/25 blur-[130px]" />
      <div className="absolute bottom-[-220px] left-1/2 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-cyan-300/20 blur-[160px]" />
    </div>
  )
}
