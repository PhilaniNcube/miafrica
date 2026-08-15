'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'

export type ReviewResult = { ok: true } | { ok: false; error: string }

export async function createReview(
  _prevState: ReviewResult | null,
  formData: FormData,
): Promise<ReviewResult> {
  const payload = await getPayload({ config: configPromise })

  const author = formData.get('author')
  const location = formData.get('location')
  const tourId = formData.get('tourId')
  const ratingRaw = formData.get('rating')
  const title = formData.get('title')
  const content = formData.get('content')
  const reviewDate = formData.get('reviewDate')

  console.log('[createReview Action] Received form submission:', {
    author,
    location,
    tourId,
    ratingRaw,
    title,
    content,
    reviewDate,
  })

  if (typeof author !== 'string' || author.trim().length === 0) {
    return {
      ok: false,
      error: 'Please provide your name.',
    }
  }

  if (typeof content !== 'string' || content.trim().length === 0) {
    return {
      ok: false,
      error: 'Please share your thoughts in the review message.',
    }
  }

  const parsedRating = typeof ratingRaw === 'string' ? parseInt(ratingRaw, 10) : 5
  const rating = !isNaN(parsedRating) && parsedRating >= 1 && parsedRating <= 5 ? parsedRating : 5

  const parsedTourId = typeof tourId === 'string' && tourId.trim() ? parseInt(tourId, 10) : undefined

  const trimmedAuthor = author.trim()
  const trimmedLocation = (typeof location === 'string' && location.trim()) || undefined
  const trimmedTitle = (typeof title === 'string' && title.trim()) || undefined
  const trimmedContent = content.trim()
  const formattedDate = (typeof reviewDate === 'string' && reviewDate.trim()) || undefined

  try {
    const reviewData: any = {
      author: trimmedAuthor,
      rating,
      content: trimmedContent,
      status: 'pending',
    }

    if (trimmedLocation) reviewData.location = trimmedLocation
    if (trimmedTitle) reviewData.title = trimmedTitle
    if (formattedDate) reviewData.reviewDate = formattedDate
    if (parsedTourId && !isNaN(parsedTourId)) {
      reviewData.tour = parsedTourId
    }

    await payload.create({
      collection: 'reviews',
      data: reviewData,
    })

    return { ok: true }
  } catch (err) {
    console.error('[Review Submission Error]', err)
    return {
      ok: false,
      error: 'Something went wrong submitting your review. Please try again.',
    }
  }
}
