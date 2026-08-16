import 'server-only'
import { cache } from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import type { ReviewCard } from '@/types/review'

const getPayloadClient = cache(async () => {
  return await getPayload({ config: configPromise })
})

export const getHomepageReviews = cache(async (): Promise<ReviewCard[]> => {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'reviews',
      where: {
        and: [
          { status: { equals: 'published' } },
          { rating: { in: [4, 5] } },
        ],
      },
      sort: '-createdAt',
      limit: 8,
      depth: 1,
    })

    return result.docs.map((doc) => {
      const r = doc as unknown as Record<string, unknown>
      let tourTitle: string | undefined
      let tourSlug: string | undefined

      if (r.tour && typeof r.tour === 'object') {
        const tourObj = r.tour as Record<string, unknown>
        if (typeof tourObj.title === 'string') tourTitle = tourObj.title
        if (typeof tourObj.slug === 'string') tourSlug = tourObj.slug
      }

      return {
        id: String(r.id || ''),
        author: (r.author as string) || 'Anonymous Explorer',
        location: (r.location as string) || undefined,
        rating: typeof r.rating === 'number' ? r.rating : 5,
        title: (r.title as string) || undefined,
        content: (r.content as string) || '',
        tourTitle,
        tourSlug,
        reviewDate: (r.reviewDate as string) || undefined,
        createdAt: (r.createdAt as string) || undefined,
      }
    })
  } catch {
    return []
  }
})
