import 'server-only'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { convertLexicalToHTML, defaultHTMLConverters } from '@payloadcms/richtext-lexical'
import configPromise from '@payload-config'
import type { Tour, TourCard } from '@/types/tour'

/* eslint-disable @typescript-eslint/no-explicit-any */

const payload = await getPayload({ config: configPromise })

const R2_PUBLIC_BASE = process.env.R2_PUBLIC_URL || 'https://pub-6b436ff2d3c345dcb470af66f325dda3.r2.dev'

function resolveMediaUrl(rawUrl?: string, filename?: string): string {
  if (!rawUrl && filename) {
    return `${R2_PUBLIC_BASE}/${encodeURIComponent(filename)}`
  }
  if (!rawUrl) return ''

  if (rawUrl.startsWith('http://') || rawUrl.startsWith('https://')) {
    return rawUrl
  }

  if (rawUrl.startsWith('/api/media/file/')) {
    const file = rawUrl.replace('/api/media/file/', '')
    return `${R2_PUBLIC_BASE}/${file}`
  }

  if (rawUrl.startsWith('/')) {
    return `${R2_PUBLIC_BASE}${rawUrl}`
  }

  return `${R2_PUBLIC_BASE}/${rawUrl}`
}

function toMediaRef(media: unknown): Tour['heroMedia'] | null {
  if (!media || typeof media !== 'object') return undefined
  const m = media as Record<string, unknown>
  const rawUrl = (m.url as string) || ((m.sizes as Record<string, { url?: string }>)?.card?.url)
  const filename = m.filename as string | undefined
  const finalUrl = resolveMediaUrl(rawUrl, filename)

  return {
    id: String(m.id),
    url: finalUrl,
    alt: (m.alt as string) || '',
    caption: m.caption as string | undefined,
    mediaType: m.mediaType as 'image' | 'video' | undefined,
    filename,
    mimeType: m.mimeType as string | undefined,
    width: m.width as number | undefined,
    height: m.height as number | undefined,
  }
}

async function lexicalToHtml(data: unknown): Promise<string | undefined> {
  if (!data || typeof data !== 'object') return undefined
  try {
    const html = await convertLexicalToHTML({
      converters: defaultHTMLConverters,
      data: data as any,
      payload,
    })
    return html
  } catch {
    return undefined
  }
}

async function toTour(row: unknown): Promise<Tour> {
  const r = row as Record<string, unknown>
  const [overview, practicalInformation, seasonalInformation] = await Promise.all([
    lexicalToHtml(r.overview),
    lexicalToHtml(r.practicalInformation),
    lexicalToHtml(r.seasonalInformation),
  ])

  const itinerary = await Promise.all(
    ((r.itinerary as Array<Record<string, unknown>>) || []).map(async (item) => ({
      ...item,
      summary: await lexicalToHtml(item.summary),
    })),
  )

  const optionalExtras = await Promise.all(
    ((r.optionalExtras as Array<Record<string, unknown>>) || []).map(async (extra) => ({
      ...extra,
      description: await lexicalToHtml(extra.description),
    })),
  )

  return {
    id: String(r.id),
    title: r.title as string,
    slug: r.slug as string,
    shortDescription: r.shortDescription as string,
    heroMedia: toMediaRef(r.heroMedia) || undefined,
    gallery: ((r.gallery as Array<Record<string, unknown>>) || []).map((g) => ({
      media: toMediaRef(g.media) || { id: '', url: '', alt: '' },
      caption: g.caption as string | undefined,
    })),
    tourType: r.tourType as Tour['tourType'],
    durationLabel: r.durationLabel as string | undefined,
    overview,
    itinerary: itinerary as Tour['itinerary'],
    highlights: (r.highlights as Tour['highlights']) || [],
    included: (r.included as Tour['included']) || [],
    notIncluded: (r.notIncluded as Tour['notIncluded']) || [],
    practicalInformation,
    seasonalInformation,
    optionalExtras: optionalExtras as Tour['optionalExtras'],
    status: r.status as Tour['status'],
    featured: r.featured as boolean,
    sortOrder: r.sortOrder as number,
    seo: r.seo as Tour['seo'] | undefined,
  }
}

function toTourCard(row: unknown): TourCard {
  const r = row as Record<string, unknown>
  const hero = toMediaRef(r.heroMedia)
  return {
    id: String(r.id),
    title: r.title as string,
    slug: r.slug as string,
    shortDescription: r.shortDescription as string,
    heroMedia: hero ? { url: hero.url || '', alt: hero.alt || '' } : undefined,
    tourType: r.tourType as TourCard['tourType'],
    durationLabel: r.durationLabel as string | undefined,
    featured: r.featured as boolean,
    sortOrder: r.sortOrder as number,
  }
}

export const getPublishedTours = cache(async (): Promise<TourCard[]> => {
  try {
    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'published' },
      },
      sort: 'sortOrder',
      depth: 2,
    })
    return result.docs.map((doc) => toTourCard(doc as unknown))
  } catch {
    return []
  }
})

export const getFeaturedTours = cache(async (): Promise<TourCard[]> => {
  try {
    const result = await payload.find({
      collection: 'tours',
      where: {
        featured: { equals: true },
      },
      sort: 'sortOrder',
      depth: 2,
      limit: 6,
    })
    return result.docs.map((doc) => toTourCard(doc as unknown))
  } catch {
    return []
  }
})

export const getTourBySlug = cache(async (slug: string): Promise<Tour> => {
  let result
  try {
    result = await payload.find({
      collection: 'tours',
      where: {
        slug: { equals: slug },
      },
      depth: 3,
      limit: 1,
    })
  } catch {
    notFound()
  }

  if (!result || result.docs.length === 0) {
    notFound()
  }

  return toTour(result.docs[0] as unknown)
})

export const getTourSlugs = cache(async (): Promise<string[]> => {
  try {
    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'published' },
      },
      select: { slug: true },
      limit: 0,
    })
    const slugs = result.docs.map((doc) => (doc as Record<string, unknown>).slug as string)
    return slugs.length > 0 ? slugs : ['__placeholder__']
  } catch {
    return ['__placeholder__']
  }
})

export const getSitemapTours = cache(async (): Promise<Array<{ slug: string; updatedAt?: string }>> => {
  try {
    const result = await payload.find({
      collection: 'tours',
      where: {
        status: { equals: 'published' },
      },
      select: { slug: true, updatedAt: true },
      limit: 0,
    })
    return result.docs.map((doc) => ({
      slug: (doc as Record<string, unknown>).slug as string,
      updatedAt: (doc as Record<string, unknown>).updatedAt as string | undefined,
    }))
  } catch {
    return []
  }
})