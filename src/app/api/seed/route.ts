import { NextResponse } from 'next/server'
import configPromise from '@payload-config'
import { convertHTMLToLexical, defaultEditorConfig, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical'
import { JSDOM } from 'jsdom'

let sanitizedConfig: Awaited<ReturnType<typeof sanitizeServerEditorConfig>> | undefined

async function getSanitizedConfig() {
  if (!sanitizedConfig) {
    const { getPayload } = await import('payload')
    const payloadInstance = await getPayload({ config: configPromise })
    sanitizedConfig = await sanitizeServerEditorConfig(defaultEditorConfig, payloadInstance.config)
  }
  return sanitizedConfig
}

async function htmlToLexical(html: string) {
  const editorConfig = await getSanitizedConfig()
  return convertHTMLToLexical({ editorConfig, html, JSDOM: JSDOM as any })
}

const targetTours = [
  {
    slug: 'garden-route',
    title: 'Garden Route',
    shortDescription:
      "South Africa's ultimate road trip — dramatic mountain passes, ancient forests, pristine estuaries and wild marine reserves on a multi-day coastal escape.",
    tourType: 'multi-day',
    durationLabel: '4-5 days',
    status: 'published',
    featured: true,
    sortOrder: 1,
    overview:
      "<p>Embark on South Africa's ultimate road trip along the legendary Garden Route. Journeying east from Cape Town, this multi-day coastal escape weaves together dramatic mountain passes, semi-desert landscapes, ancient indigenous forests, pristine estuaries, and wild marine reserves for a true bucket-list experience.</p>",
    itinerary: [
      {
        type: 'day',
        dayNumber: 1,
        title: 'Into the Klein Karoo: Oudtshoorn, Caves & Ostriches',
        summary:
          "<p>Leaving Cape Town behind, the tour ventures inland along the scenic Route 62 into the Klein Karoo to the semi-desert valley of Oudtshoorn. Famous worldwide as the ostrich capital of the world, guests can tour an authentic working ostrich farm to learn about these magnificent birds, hand-feed them, and discover the region's rich farming history. Nearby, explore the subterranean wonder of the Cango Caves, a vast underground network of towering limestone formations, stalactites, and sculpted dripstone caverns carved over millions of years. Overnighting in Oudtshoorn offers a serene evening under the brilliant stars of the Karoo sky.</p>",
        activities: [
          { activity: 'Route 62 scenic drive' },
          { activity: 'Ostrich farm tour' },
          { activity: 'Cango Caves exploration' },
        ],
      },
      {
        type: 'day',
        dayNumber: 2,
        title: 'Crossing the Outeniqua Pass to George & Wilderness',
        summary:
          '<p>From Oudtshoorn, the journey crosses the majestic Outeniqua Pass, a spectacular mountain route offering sweeping vistas as the arid Karoo shifts into lush coastal greenery. Descending through the town of George — the agricultural and commercial heart of the Garden Route — you reach the coastal haven of Wilderness. Here, endless golden beaches meet peaceful lagoon estuaries, surrounded by the dense, protected indigenous canopy of the Garden Route National Park.</p>',
        activities: [
          { activity: 'Outeniqua Pass drive' },
          { activity: 'Wilderness beaches and lagoon' },
        ],
      },
      {
        type: 'day',
        dayNumber: 3,
        title: 'Knysna & Elephant Encounters',
        summary:
          "<p>Continuing east, arrive in the lagoon town of Knysna, nestled around an expansive estuarine bay framed by the dramatic sandstone cliffs known as the Knysna Heads. Guests can enjoy sunset lagoon cruises, taste fresh local oysters, and explore lively waterfront markets. Nearby, visit dedicated elephant sanctuaries and rehabilitation parks, where guests can enjoy close, educational interactions with rescued African elephants, learning about their conservation while walking alongside these gentle giants.</p>",
        activities: [
          { activity: 'Knysna lagoon cruise' },
          { activity: 'Elephant sanctuary visit' },
          { activity: 'Waterfront market' },
        ],
      },
      {
        type: 'day',
        dayNumber: 4,
        title: 'Tsitsikamma National Park & Storms River',
        summary:
          '<p>The journey reaches its wild, dramatic climax in the heart of the Tsitsikamma Forest. Within Tsitsikamma National Park, ancient yellowwood trees tower over rocky coastal gorges where river waters flow into the pounding Indian Ocean. Guests can walk the forested boardwalk trail to cross the famous Storms River Suspension Bridge, hovering directly above the river mouth. For adventure enthusiasts, options abound — from kayaking up narrow river gorges to taking the ultimate leap at the nearby Bloukrans Bridge, home to the world\'s highest commercial bungee jump.</p>',
        activities: [
          { activity: 'Storms River Suspension Bridge walk' },
          { activity: 'Kayaking' },
          { activity: 'Bloukrans bungee jump (optional)' },
        ],
      },
      {
        type: 'section',
        title: 'Optional Extension: Cape Agulhas & Hermanus',
        summary:
          '<p>Tracing back toward Cape Town along the scenic coastline, an extra night can be added to explore the Southernmost point in Africa, Cape Agulhas, where the Indian and Atlantic Ocean officially meet. From there, wine tasting can be enjoyed on route to the beautiful coastal town of Hermanus for an overnight stay. If in season, whale watching would be a delight before the drive back to Cape Town early next morning.</p>',
        activities: [
          { activity: 'Cape Agulhas visit' },
          { activity: 'Wine tasting' },
          { activity: 'Hermanus overnight' },
        ],
      },
    ],
    highlights: [
      { highlight: 'Scenic Route 62 through the Klein Karoo' },
      { highlight: 'Cango Caves limestone formations' },
      { highlight: 'Ostrich farm experience in Oudtshoorn' },
      { highlight: 'Outeniqua Pass mountain views' },
      { highlight: 'Knysna lagoon and the Knysna Heads' },
      { highlight: 'Elephant sanctuary encounters' },
      { highlight: 'Tsitsikamma National Park and Storms River' },
      { highlight: 'World\'s highest commercial bungee at Bloukrans Bridge' },
    ],
    included: [
      { item: 'Professional tour guide' },
      { item: 'Transport in comfortable vehicle' },
      { item: 'Accommodation as per itinerary' },
    ],
    notIncluded: [
      { item: 'Personal expenses' },
      { item: 'Optional activities (bungee jump, etc.)' },
      { item: 'Meals not specified' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [
      {
        title: 'Bloukrans Bungee Jump',
        type: 'optional',
        description: '<p>The world\'s highest commercial bridge bungee jump (216m) at Storms River.</p>',
      },
      {
        title: 'Sea Kayaking & Storms River Gorge',
        type: 'optional',
        description: '<p>Guided sea and river kayaking into the heart of the Tsitsikamma gorge.</p>',
      },
    ],
    seasonalInformation:
      '<p>Operates year-round. Autumn and spring offer ideal hiking weather. Winter (June to August) brings crisp days and whale sightings along the coastal sections.</p>',
    practicalInformation:
      '<p>Sturdy walking shoes, layers for changing coastal weather, sun protection, and a camera are recommended. Suitable for all fitness levels.</p>',
    seo: {
      title: 'Garden Route Tour — 4-5 Day Coastal Escapes | MiAfrica',
      description:
        "South Africa's ultimate road trip. Journey from Cape Town through Route 62, Oudtshoorn, Knysna, and Tsitsikamma National Park.",
    },
  },
  {
    slug: 'whale-watching',
    title: 'Whale Watching',
    shortDescription:
      'A full-day coastal journey to Hermanus — world-class land-based whale watching, cliffside ocean drives, seafood dining and the Stony Point penguin colony.',
    tourType: 'day',
    durationLabel: 'Full day (June to November)',
    status: 'published',
    featured: false,
    sortOrder: 8,
    overview:
      '<p>Embark on an unforgettable coastal journey to Hermanus, globally recognized as one of the finest land-based whale-watching destinations on Earth. Running along the edge of False Bay and through the heart of the Overberg coastline, this full-day tour weaves together breathtaking cliffside ocean drives, exceptional seafood dining, up-close marine encounters, and charming coastal villages.</p>',
    itinerary: [
      {
        type: 'stop',
        title: 'The Coastal Drive: Clarence Drive (R44)',
        summary:
          "<p>Leaving Cape Town, your morning route skirts False Bay to connect with Clarence Drive, an extraordinary stretch of road carved into the sheer mountain slopes between Gordon's Bay and Kleinmond. Flanked by the soaring peaks of the Kogelberg Biosphere on one side and the pounding ocean on the other, every turn provides sweeping views across the water — often revealing early sightings of southern right whales breaching just offshore.</p>",
      },
      {
        type: 'stop',
        title: 'Hermanus Waterfront & World-Class Whale Watching',
        summary:
          '<p>Arriving in Hermanus during whale season (June through November), you step right into the vibrant waterfront precinct and historic Old Harbour area. From the elevated, winding cliff paths that meander along Walker Bay, visitors enjoy spectacular land-based whale watching as mothers and calves shelter in the calm, shallow waters close to the rocks.</p>',
        activities: [
          { activity: 'Cliff path land-based whale watching' },
          { activity: 'Optional boat-based whale-watching cruise' },
        ],
      },
      {
        type: 'stop',
        title: 'Coastal Lunch Experience',
        summary:
          '<p>After a morning spent tracking marine life, unwind at one of the top restaurants along the Hermanus waterfront or atop the dramatic cliffs. Dine on fresh, locally caught seafood and gourmet dishes paired with award-winning wines from the nearby Hemel-en-Aarde Valley, all while enjoying panoramic, uninterrupted views of the ocean below.</p>',
      },
      {
        type: 'stop',
        title: "Stony Point Penguin Colony at Betty's Bay",
        summary:
          "<p>Beginning the relaxed return journey toward Cape Town, the tour pauses in the quiet coastal hamlet of Betty's Bay to visit the Stony Point Nature Reserve. Here, wooden boardwalks wind past the historic site of an old whaling station, leading you directly into one of the largest mainland breeding colonies of wild African penguins. Guests can observe these charismatic flightless birds, along with cormorants and resident rock hyraxes (dassies), as they go about their day without disruption.</p>",
      },
      {
        type: 'stop',
        title: 'Return Journey',
        summary:
          '<p>To conclude the tour, relax as the late-afternoon sun casts a golden glow over False Bay while tracing the scenic pass back toward Cape Town, arriving at your hotel by early evening with unforgettable marine memories.</p>',
      },
    ],
    highlights: [
      { highlight: 'Clarence Drive (R44) — one of the world\'s most scenic coastal roads' },
      { highlight: 'Hermanus — world\'s finest land-based whale watching' },
      { highlight: 'Southern right whales, humpback whales and dolphins' },
      { highlight: 'Hemel-en-Aarde Valley wine pairing at lunch' },
      { highlight: "Stony Point Penguin Colony at Betty's Bay" },
    ],
    included: [
      { item: 'Professional tour guide' },
      { item: 'Transport in comfortable vehicle' },
      { item: 'Coastal lunch' },
    ],
    notIncluded: [
      { item: 'Optional boat-based whale-watching cruise' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [
      {
        title: 'Boat-Based Whale Watching Cruise',
        type: 'optional',
        description: '<p>Embark on an eco-friendly boat cruise into Walker Bay to observe southern right whales, humpback whales and dolphins up close.</p>',
      },
    ],
    seasonalInformation:
      '<p>Whale season runs from June through November. Southern right whales are most commonly sighted from July to October. Outside whale season, the tour still offers spectacular coastal scenery, the penguin colony, and the Hemel-en-Aarde wine valley.</p>',
    seo: {
      title: 'Hermanus Whale Watching Tour — Full Day from Cape Town | MiAfrica',
      description:
        "The ultimate whale watching day excursion from Cape Town to Hermanus. Clarence Drive, cliff path whale watching, coastal lunch and Stony Point penguins.",
    },
  },
]

export async function GET() {
  try {
    const { getPayload } = await import('payload')
    const payload = await getPayload({ config: configPromise })

    const logs: string[] = []
    logs.push('Starting targeted seed for garden-route and whale-watching...')

    for (const tour of targetTours) {
      const existing = await payload.find({
        collection: 'tours',
        where: {
          slug: { equals: tour.slug },
        },
        limit: 10,
      })

      for (const doc of existing.docs) {
        logs.push(`  Deleting existing tour: ${tour.slug} (ID: ${doc.id})`)
        await payload.delete({
          collection: 'tours',
          id: doc.id as any,
        })
      }

      const tourData: Record<string, unknown> = { ...tour }

      if (typeof tourData.overview === 'string') {
        tourData.overview = await htmlToLexical(tourData.overview as string)
      }
      if (typeof tourData.practicalInformation === 'string') {
        tourData.practicalInformation = await htmlToLexical(tourData.practicalInformation as string)
      }
      if (typeof tourData.seasonalInformation === 'string') {
        tourData.seasonalInformation = await htmlToLexical(tourData.seasonalInformation as string)
      }

      if (Array.isArray(tourData.itinerary)) {
        tourData.itinerary = await Promise.all(
          (tourData.itinerary as Array<Record<string, unknown>>).map(async (item) => {
            if (typeof item.summary === 'string') {
              return { ...item, summary: await htmlToLexical(item.summary as string) }
            }
            return item
          }),
        )
      }

      if (Array.isArray(tourData.optionalExtras)) {
        tourData.optionalExtras = await Promise.all(
          (tourData.optionalExtras as Array<Record<string, unknown>>).map(async (extra) => {
            if (typeof extra.description === 'string') {
              return { ...extra, description: await htmlToLexical(extra.description as string) }
            }
            return extra
          }),
        )
      }

      logs.push(`  Creating tour with Lexical content: ${tour.title} (${tour.slug})`)
      await payload.create({
        collection: 'tours',
        data: tourData as any,
      })
    }

    logs.push('Targeted seed complete for garden-route and whale-watching!')
    return NextResponse.json({ ok: true, logs })
  } catch (error: any) {
    return NextResponse.json({ ok: false, error: error?.message || String(error) }, { status: 500 })
  }
}
