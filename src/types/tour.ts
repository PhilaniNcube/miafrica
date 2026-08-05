export type TourType = 'day' | 'multi-day'

export type TourStatus = 'draft' | 'published'

export interface TourItineraryItem {
  id?: string
  type: 'day' | 'section' | 'stop'
  dayNumber?: number
  title: string
  summary?: string
  locations?: string[]
  activities?: { activity: string }[]
  image?: string
}

export interface TourHighlight {
  highlight: string
}

export interface TourOptionalExtra {
  id?: string
  title: string
  description?: string
  type: 'included' | 'optional' | 'upgrade'
  location?: string
  image?: string
}

export interface TourSEO {
  title?: string
  description?: string
  ogImage?: string
}

export interface TourMediaRef {
  id: string
  url?: string
  alt?: string
  caption?: string
  mediaType?: 'image' | 'video'
  filename?: string
  mimeType?: string
  width?: number
  height?: number
}

export interface Tour {
  id: string
  title: string
  slug: string
  shortDescription: string
  heroMedia?: TourMediaRef
  gallery?: { media: TourMediaRef; caption?: string }[]
  tourType: TourType
  durationLabel?: string
  overview?: string
  itinerary: TourItineraryItem[]
  highlights: TourHighlight[]
  included: { item: string }[]
  notIncluded: { item: string }[]
  practicalInformation?: string
  seasonalInformation?: string
  optionalExtras: TourOptionalExtra[]
  status: TourStatus
  featured: boolean
  sortOrder: number
  seo?: TourSEO
}

export interface TourCard {
  id: string
  title: string
  slug: string
  shortDescription: string
  heroMedia?: { url: string; alt: string }
  tourType: TourType
  durationLabel?: string
  featured: boolean
  sortOrder: number
}