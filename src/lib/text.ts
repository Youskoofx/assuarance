export function stripHtml(value: string) {
  if (!value) return ''
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

export function estimateReadingTime(
  html: string | null | undefined,
  wordsPerMinute = 190
) {
  if (!html) return 0
  const clean = stripHtml(html)
  if (!clean) return 0
  const words = clean.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / wordsPerMinute))
}
