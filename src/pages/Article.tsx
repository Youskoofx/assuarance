import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Tag,
  User,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import {
  demoArticles,
  findRelatedArticles,
  formatArticleDate,
  getArticleExcerpt,
  type ArticleRecord,
} from '@/lib/articles'
import { estimateReadingTime } from '@/lib/text'

type FetchState = 'loading' | 'ready' | 'error' | 'not-found'

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1522206024047-9c9254216757?q=80&w=1600&auto=format&fit=crop'

const allowedTags = new Set([
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'ul',
  'ol',
  'li',
  'blockquote',
  'strong',
  'em',
  'a',
  'img',
  'figure',
  'figcaption',
  'code',
  'pre',
  'table',
  'thead',
  'tbody',
  'tr',
  'td',
  'th',
  'hr',
  'br',
])

const allowedAttributes = new Set(['href', 'target', 'rel', 'src', 'alt', 'title', 'loading'])
const allowedProtocols = new Set(['http:', 'https:', 'mailto:', 'tel:'])
const allowedSrcProtocols = new Set(['http:', 'https:'])

function sanitizeArticleContent(raw: string) {
  if (typeof window === 'undefined' || typeof DOMParser === 'undefined') return raw
  const parser = new DOMParser()
  const doc = parser.parseFromString(raw, 'text/html')
  const elements = doc.body.querySelectorAll<HTMLElement>('*')

  elements.forEach((element) => {
    const tag = element.tagName.toLowerCase()
    if (!allowedTags.has(tag)) {
      const parent = element.parentNode
      if (!parent) {
        element.remove()
        return
      }
      while (element.firstChild) {
        parent.insertBefore(element.firstChild, element)
      }
      parent.removeChild(element)
      return
    }

    Array.from(element.attributes).forEach((attribute) => {
      const name = attribute.name.toLowerCase()
      if (!allowedAttributes.has(name)) {
        element.removeAttribute(attribute.name)
        return
      }

      if (name === 'href') {
        try {
          const url = new URL(attribute.value, window.location.href)
          if (!allowedProtocols.has(url.protocol)) {
            element.removeAttribute(attribute.name)
            return
          }
          element.setAttribute('rel', 'noopener noreferrer')
          element.setAttribute('target', '_blank')
        } catch {
          element.removeAttribute(attribute.name)
        }
      }

      if (name === 'src') {
        try {
          const url = new URL(attribute.value, window.location.href)
          if (!allowedSrcProtocols.has(url.protocol)) {
            element.removeAttribute(attribute.name)
            return
          }
          element.setAttribute('loading', 'lazy')
        } catch {
          element.removeAttribute(attribute.name)
        }
      }
    })
  })

  return doc.body.innerHTML
}

function mergeRelatedCandidates(
  items: ArticleRecord[],
  extras: ArticleRecord[]
): ArticleRecord[] {
  const bySlug = new Map<string, ArticleRecord>()
  ;[...items, ...extras].forEach((item) => {
    if (!item.slug) return
    if (!bySlug.has(item.slug)) {
      bySlug.set(item.slug, item)
    }
  })
  return Array.from(bySlug.values())
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const [article, setArticle] = useState<ArticleRecord | null>(null)
  const [related, setRelated] = useState<ArticleRecord[]>([])
  const [shareMessage, setShareMessage] = useState<string | null>(null)
  const [state, setState] = useState<FetchState>('loading')

  const fetchArticle = useCallback(async () => {
    if (!slug) return
    setState('loading')
    setShareMessage(null)

    let currentArticle: ArticleRecord | null = null
    let relatedCandidates: ArticleRecord[] = []

    try {
      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('slug', slug)
        .maybeSingle()

      if (error) {
        console.error('Erreur lors du chargement de l’article:', error.message)
      }

      if (data) {
        currentArticle = data

        const { data: relatedData, error: relatedError } = await supabase
          .from('articles')
          .select('*')
          .eq('is_published', true)
          .neq('slug', slug)
          .order('published_at', { ascending: false })
          .limit(6)

        if (relatedError) {
          console.error('Erreur lors du chargement des articles liés:', relatedError.message)
        } else if (relatedData?.length) {
          relatedCandidates = relatedData
        }
      }

      if (!currentArticle) {
        currentArticle = demoArticles.find((item) => item.slug === slug) ?? null
      }

      if (!currentArticle) {
        setArticle(null)
        setRelated([])
        setState('not-found')
        return
      }

      const pool = mergeRelatedCandidates(relatedCandidates, demoArticles)
      const relatedArticles = findRelatedArticles(currentArticle, pool, 3)

      setArticle(currentArticle)
      setRelated(relatedArticles)
      setState('ready')
    } catch (err) {
      console.error('Erreur inattendue lors du chargement de l’article:', err)
      const fallbackArticle = demoArticles.find((item) => item.slug === slug) ?? null
      if (fallbackArticle) {
        setArticle(fallbackArticle)
        setRelated(findRelatedArticles(fallbackArticle, demoArticles, 3))
        setState('ready')
      } else {
        setArticle(null)
        setRelated([])
        setState('error')
      }
    }
  }, [slug])

  useEffect(() => {
    void fetchArticle()
  }, [fetchArticle])

  useEffect(() => {
    if (!article?.title) return
    const previousTitle = document.title
    document.title = `${article.title} | Actualités assurance`
    return () => {
      document.title = previousTitle
    }
  }, [article?.title])

  const sanitizedContent = useMemo(() => {
    if (!article?.content) return ''
    return sanitizeArticleContent(article.content)
  }, [article?.content])

  const readingTime = useMemo(() => estimateReadingTime(article?.content), [article?.content])

  const handleShare = async () => {
    if (!article) return
    setShareMessage(null)
    const url = typeof window !== 'undefined' ? window.location.href : ''
    try {
      if (navigator && 'share' in navigator) {
        await (navigator as unknown as { share: (data: ShareData) => Promise<void> }).share({
          title: article.title,
          text: getArticleExcerpt(article, 140),
          url,
        })
        return
      }

      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(url)
        setShareMessage('Lien copié dans le presse-papiers.')
        return
      }

      setShareMessage("Copiez l'adresse du navigateur pour partager l'article.")
    } catch (err) {
      console.error('Partage impossible:', err)
      setShareMessage("Partage impossible. Copiez l'adresse du navigateur.")
    }
  }

  if (state === 'loading') {
    return <ArticlePageSkeleton />
  }

  if (state === 'not-found') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-rose-100 px-4 py-2 text-rose-600">
            <AlertCircle className="h-4 w-4" />
            Article introuvable
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Oups, impossible de trouver cet article.
          </h1>
          <p className="text-slate-600">
            Il a peut-être été retiré ou le lien est incorrect. Parcourez nos actualités pour
            découvrir d'autres conseils assurance.
          </p>
          <Button asChild size="lg" className="bg-teal-600 hover:bg-teal-500">
            <Link to="/actualites">Retour aux actualités</Link>
          </Button>
        </div>
      </div>
    )
  }

  if (state === 'error') {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-white px-6 text-center">
        <div className="max-w-xl space-y-6">
          <div className="inline-flex items-center gap-3 rounded-full bg-amber-100 px-4 py-2 text-amber-600">
            <AlertCircle className="h-4 w-4" />
            Problème de chargement
          </div>
          <h1 className="text-3xl font-bold text-slate-900">
            Impossible de charger cet article pour le moment.
          </h1>
          <p className="text-slate-600">
            Vérifiez votre connexion Internet et réessayez dans quelques instants ou explorez nos
            autres articles de blog.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => void fetchArticle()} className="bg-teal-600 hover:bg-teal-500">
              Réessayer
            </Button>
            <Button asChild variant="outline" className="border-slate-300 text-slate-700">
              <Link to="/actualites">Voir toutes les actualités</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (!article) {
    return null
  }

  const cover = article.cover_url || article.thumbnail_url || FALLBACK_IMAGE
  const date = formatArticleDate(article)

  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_720px_at_18%_-10%,rgba(45,212,191,0.18),transparent),radial-gradient(900px_600px_at_82%_-10%,rgba(56,189,248,0.16),transparent)]" />

      <div className="relative">
        <section className="relative min-h-[62vh] overflow-hidden">
          <img
            src={cover}
            alt={article.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/20" />

          <div className="relative z-10 flex h-full items-end">
            <div className="mx-auto w-full max-w-5xl px-6 pb-28 pt-32 text-white">
              <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-white/80">
                <Link
                  to="/actualites"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-[11px] tracking-[0.4em] transition hover:bg-white/20"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Retour
                </Link>
                <span className="rounded-full bg-white/10 px-3 py-1">Publié le {date}</span>
                {readingTime > 0 && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1">
                    <Clock className="h-3.5 w-3.5" />
                    {readingTime} min
                  </span>
                )}
              </div>

              <div className="mt-8 flex flex-col gap-5">
                {article.category && (
                  <Badge className="w-fit bg-white/20 text-xs font-semibold uppercase tracking-[0.35em] text-white backdrop-blur">
                    {article.category}
                  </Badge>
                )}
                <h1 className="text-4xl font-semibold leading-tight tracking-tight md:text-6xl md:leading-tight">
                  {article.title}
                </h1>
                <div className="flex flex-wrap items-center gap-5 text-sm text-white/85">
                  {article.author_name && (
                    <span className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {article.author_name}
                    </span>
                  )}
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {date}
                  </span>
                  {article.tags?.length ? (
                    <span className="flex flex-wrap items-center gap-2">
                      <Tag className="h-4 w-4 text-white/70" />
                      {article.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-sm text-white/80">
                          #{tag}
                        </span>
                      ))}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative z-10 -mt-28 px-4 pb-24 md:px-6">
          <div className="mx-auto max-w-5xl">
            <article className="rounded-[32px] border border-white/10 bg-white/95 p-6 shadow-[0_35px_120px_rgba(15,23,42,0.28)] backdrop-blur-lg md:p-14">
              <header className="mb-10 flex flex-col gap-4 border-b border-slate-200 pb-8 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Article assurance
                  </p>
                  {article.excerpt && (
                    <p className="mt-3 text-lg text-slate-600">{getArticleExcerpt(article, 200)}</p>
                  )}
                </div>
                {article.tags?.length ? (
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-slate-500"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                ) : null}
              </header>

              <div className="prose prose-lg max-w-none prose-headings:scroll-mt-32 prose-headings:text-slate-900 prose-h2:mt-12 prose-h2:text-3xl prose-h3:mt-10 prose-h3:text-2xl prose-p:text-slate-700 prose-li:text-slate-700 prose-blockquote:border-l-4 prose-blockquote:border-teal-500 prose-blockquote:bg-teal-50/70 prose-blockquote:py-4 prose-blockquote:pl-6 prose-blockquote:text-slate-700 prose-code:rounded prose-code:bg-slate-900/90 prose-code:px-2 prose-code:py-1 prose-code:text-teal-200 prose-a:text-teal-600 hover:prose-a:text-teal-500">
                <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
              </div>

              <div className="mt-14 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
                    Partager l'article
                  </p>
                  <p className="mt-2 text-sm text-slate-600">
                    Faites découvrir cette ressource à vos clients, partenaires ou collègues.
                  </p>
                  {shareMessage && (
                    <p className="mt-3 text-sm font-medium text-teal-600">{shareMessage}</p>
                  )}
                </div>
                <Button
                  onClick={handleShare}
                  variant="outline"
                  className="h-12 border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Partager ce contenu
                </Button>
              </div>
            </article>
          </div>
        </section>

        {related.length > 0 && (
          <section className="relative z-10 border-t border-white/10 bg-slate-900/40 px-6 py-20 backdrop-blur">
            <div className="mx-auto max-w-6xl">
              <div className="mb-10 text-center md:text-left">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                  Continuez votre lecture
                </p>
                <h2 className="mt-3 text-3xl font-bold text-white">
                  D'autres conseils pour mieux vous assurer
                </h2>
              </div>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => {
                  const thumbnail = item.thumbnail_url || item.cover_url || FALLBACK_IMAGE
                  const relatedDate = formatArticleDate(item)
                  const excerpt = getArticleExcerpt(item, 140)
                  return (
                    <article
                      key={item.slug}
                      className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/95 shadow-[0_20px_60px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.4)]"
                    >
                      <Link
                        to={`/actualites/${item.slug}`}
                        className="relative block h-48 overflow-hidden"
                      >
                        <img
                          src={thumbnail}
                          alt={item.title}
                          className="h-full w-full object-cover transition duration-300 hover:scale-105"
                          loading="lazy"
                        />
                        {item.category && (
                          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-800 shadow">
                            <Tag className="h-3 w-3" />
                            {item.category}
                          </span>
                        )}
                      </Link>
                      <div className="flex flex-1 flex-col p-6">
                        <Link
                          to={`/actualites/${item.slug}`}
                          className="text-lg font-semibold text-slate-900 transition hover:text-teal-600"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-3 flex-1 text-sm text-slate-600 line-clamp-3">{excerpt}</p>
                        <div className="mt-6 flex items-center justify-between text-xs font-medium uppercase tracking-wide text-slate-500">
                          <span className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            {relatedDate}
                          </span>
                          {item.author_name && (
                            <span className="flex items-center gap-2">
                              <User className="h-3.5 w-3.5" />
                              {item.author_name}
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

function ArticlePageSkeleton() {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(1200px_720px_at_18%_-10%,rgba(45,212,191,0.18),transparent),radial-gradient(900px_600px_at_82%_-10%,rgba(56,189,248,0.16),transparent)]" />

      <div className="relative pb-24">
        <div className="relative min-h-[62vh] overflow-hidden">
          <Skeleton className="absolute inset-0 h-full w-full rounded-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/20" />
          <div className="relative z-10 mx-auto flex h-full w-full max-w-5xl items-end px-6 pb-28 pt-32">
            <div className="space-y-4 text-white/70">
              <Skeleton className="h-8 w-40 rounded-full bg-white/20" />
              <Skeleton className="h-12 w-[320px] rounded-full bg-white/20" />
              <Skeleton className="h-16 w-[480px] rounded-2xl bg-white/20" />
            </div>
          </div>
        </div>

        <div className="-mt-28 px-4 md:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="rounded-[32px] border border-white/10 bg-white/90 p-6 shadow-[0_35px_120px_rgba(15,23,42,0.28)] backdrop-blur md:p-14">
              <div className="mb-8 flex flex-wrap gap-3">
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-28 rounded-full" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full rounded-md" />
                ))}
              </div>
              <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <Skeleton className="h-10 w-48 rounded-full" />
                <Skeleton className="h-12 w-52 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
