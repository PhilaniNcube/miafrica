import configPromise from '../payload.config'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Seed script for MiAfrica tour data.
 *
 * Run with: npx tsx src/payload/seed.ts
 *
 * This creates the eight initial tour records with content extracted from
 * the supplied tour descriptions. Media must be uploaded separately via
 * the Payload admin panel and then attached to each tour.
 */

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

const tours = [
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
      { item: 'Selected meals' },
    ],
    notIncluded: [
      { item: 'Flights to and from Cape Town' },
      { item: 'Optional adventure activities' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [
      {
        title: 'Bloukrans Bridge Bungee Jump',
        type: 'optional',
        description: '<p>The world\'s highest commercial bungee jump at 216 metres.</p>',
      },
      {
        title: 'Extra Night — Cape Agulhas & Hermanus',
        type: 'optional',
        description: '<p>Extend your trip to visit the southernmost tip of Africa and enjoy wine tasting and whale watching in Hermanus.</p>',
      },
      {
        title: 'Kayaking in Storms River Gorge',
        type: 'optional',
        description: '<p>Paddle up the narrow river gorges of Tsitsikamma.</p>',
      },
    ],
    seo: {
      title: 'Garden Route Tour — Multi-Day Cape Town Expedition | MiAfrica',
      description:
        "Journey along South Africa's legendary Garden Route. Oudtshoorn, Cango Caves, Knysna, Tsitsikamma and more on this multi-day coastal adventure.",
    },
  },
  {
    slug: 'city-tour-kirstenbosch',
    title: 'City Tour Kirstenbosch',
    shortDescription:
      'A full-day journey through the heart of Cape Town — Table Mountain, Bo-Kaap, Company\'s Garden, Castle of Good Hope and Kirstenbosch Botanical Garden.',
    tourType: 'day',
    durationLabel: 'Full day',
    status: 'published',
    featured: true,
    sortOrder: 2,
    overview:
      "<p>Embark on an unforgettable journey through the heart, history, and natural splendor of South Africa's Mother City. This comprehensive tour blends iconic landmarks, vibrant local culture, rich heritage, and world-class nature into one seamless day.</p>",
    itinerary: [
      {
        type: 'stop',
        title: 'Table Mountain Cableway',
        summary:
          "<p>Your morning begins high above the city as you ascend Table Mountain aboard the revolving Cableway. Taking in panoramic 360-degree views of the Atlantic Seaboard, City Bowl, and Robben Island, you will gain an immediate appreciation for Cape Town's unique topography and dramatic coastal backdrop.</p>",
      },
      {
        type: 'stop',
        title: 'Bo-Kaap',
        summary:
          '<p>Descending back into the city, the journey shifts from natural wonder to vibrant culture as you step into the Bo-Kaap. Wandering through its cobblestone streets, you will be immersed in a tapestry of brightly painted historic homes, aromatic Cape Malay spice markets, and the calling of historic minarets.</p>',
      },
      {
        type: 'stop',
        title: "Company's Garden",
        summary:
          "<p>From there, take a leisurely stroll through the peaceful green pathways of the Company's Gardens. Founded in the 1650s as a refreshment station for passing ships, this shaded haven leads you past Parliament and historical monuments, serving as a tranquil bridge to Cape Town's early colonial past.</p>",
      },
      {
        type: 'stop',
        title: 'Castle of Good Hope & City Hall',
        summary:
          '<p>Stepping out of the gardens, history comes alive at the Castle of Good Hope, South Africa\'s oldest surviving colonial structure. Nearby at the Grand Parade, you will stand before Cape Town City Hall to admire the bronze statue of Nelson Mandela on the very balcony where he delivered his historic first speech as a free man in 1990.</p>',
      },
      {
        type: 'stop',
        title: 'Truth Coffee',
        summary:
          "<p>After soaking in centuries of history, it is time for a world-famous caffeine break at Truth Coffee. Renowned globally for its extraordinary steampunk aesthetic and artisanal micro-roasted coffee, this stop offers a lively, sensory recharge in the city's creative district.</p>",
      },
      {
        type: 'stop',
        title: 'Kirstenbosch National Botanical Garden',
        summary:
          '<p>To conclude your day, leave the urban center behind and head to the eastern slopes of Table Mountain for an afternoon at Kirstenbosch National Botanical Garden. Set against a dramatic mountain amphitheater, you can stroll along the tree-canopy walkway known as the "Boomslang" and wander through lush indigenous flora, ending your Cape Town adventure surrounded by the natural serenity of a UNESCO World Heritage site.</p>',
      },
    ],
    highlights: [
      { highlight: 'Table Mountain Cableway with 360-degree views' },
      { highlight: 'Bo-Kaap colourful houses and Cape Malay culture' },
      { highlight: "Company's Garden and historical monuments" },
      { highlight: 'Castle of Good Hope — oldest colonial structure' },
      { highlight: 'Nelson Mandela statue at City Hall' },
      { highlight: 'Truth Coffee steampunk cafe' },
      { highlight: 'Kirstenbosch Botanical Garden and Boomslang canopy walk' },
    ],
    included: [
      { item: 'Professional tour guide' },
      { item: 'Transport in comfortable vehicle' },
      { item: 'Table Mountain Cableway ticket' },
    ],
    notIncluded: [
      { item: 'Lunch and beverages' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [],
    seo: {
      title: 'Cape Town City Tour & Kirstenbosch — Full Day | MiAfrica',
      description:
        "Discover the essence of Cape Town in one day: Table Mountain, Bo-Kaap, Company's Garden, Castle of Good Hope, Truth Coffee and Kirstenbosch Botanical Garden.",
    },
  },
  {
    slug: 'langa-township',
    title: 'Township Experience (Langa Township)',
    shortDescription:
      'A deeply authentic journey into Cape Town\'s oldest township — local guides, cultural centres, heritage museums, traditional healers and Xhosa cuisine.',
    tourType: 'day',
    durationLabel: 'Half day',
    status: 'published',
    featured: false,
    sortOrder: 3,
    overview:
      '<p>Step beyond the typical tourist paths and experience the true heart, resilient spirit, and rich cultural tapestry of South Africa. As Cape Town\'s oldest township, established in 1923, Langa offers a deeply authentic journey into the history, traditions, and vibrant everyday life of the Xhosa community.</p><p>Led entirely by local resident guides born and raised in Langa, this walking and driving experience provides a respectful, eye-opening immersion into community life, where warm greetings, lively street culture, and powerful personal stories welcome you at every corner.</p>',
    itinerary: [
      {
        type: 'stop',
        title: "Guga S'Thebe Arts & Cultural Centre",
        summary:
          '<p>Your cultural journey begins at the Guga S\'Thebe Cultural Centre, a vibrant hub dedicated to community empowerment, art, and heritage. Housed in a striking building adorned with colorful mosaic murals, the center features active pottery workshops, metalwork studios, local craft markets, and a unique eco-theatre constructed from recycled shipping containers and straw-clay modules. Here, you will see local artisans at work and experience how creative expression drives social upliftment.</p>',
      },
      {
        type: 'stop',
        title: 'The Langa Heritage Museum (Dompas Building)',
        summary:
          '<p>Gain a profound historical understanding of South Africa\'s journey at the Langa Heritage Museum, situated in the historic court and pass office building — the former administrative center where black South Africans were required to carry "dompasses" during the Apartheid era. Standing in this preserved landmark offers an honest, powerful glimpse into the systemic struggles of the past and the incredible resilience that built the community seen today.</p>',
      },
      {
        type: 'stop',
        title: 'Community Walking Tour & Local Encounters',
        summary:
          '<p>Stroll alongside your local guide through the diverse neighborhoods of Langa, from historical brick homes and hostelleries to vibrant residential streets. Along the way, you will meet local entrepreneurs running spaza shops, experience the lively rhythm of township life, and witness firsthand how the spirit of Ubuntu ("I am because we are") shapes daily interactions.</p>',
      },
      {
        type: 'stop',
        title: 'Consultation with a Traditional Healer (Sangoma)',
        summary:
          '<p>A uniquely authentic aspect of the tour is a respectful visit with a practicing traditional healer (Sangoma or Inyanga). You will learn about ancestral customs, sacred herbs, and the vital role traditional spiritual healing plays alongside modern medicine in contemporary African society.</p>',
      },
      {
        type: 'stop',
        title: 'Culinary & Cultural Expressions',
        summary:
          '<p>Taste traditional Xhosa dishes or sip locally brewed sorghum beer (umqombothi) while enjoying spontaneous street performances, traditional drumming, and choir melodies that reflect the soul of the township.</p>',
      },
    ],
    highlights: [
      { highlight: "Guga S'Thebe Arts & Cultural Centre" },
      { highlight: 'Langa Heritage Museum (Dompas Building)' },
      { highlight: 'Community walking tour with local guides' },
      { highlight: 'Traditional healer (Sangoma) consultation' },
      { highlight: 'Traditional Xhosa cuisine and sorghum beer' },
      { highlight: '100% locally guided — direct economic benefit' },
    ],
    included: [
      { item: 'Local resident guide' },
      { item: 'Transport to and from Langa' },
      { item: 'Cultural centre entrance' },
      { item: 'Heritage museum entrance' },
    ],
    notIncluded: [
      { item: 'Optional purchases from local artisans' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [],
    seo: {
      title: 'Langa Township Cultural Experience — Cape Town | MiAfrica',
      description:
        "An authentic, locally guided journey into Cape Town's oldest township. Visit Guga S'Thebe, the Heritage Museum, meet a Sangoma and taste Xhosa cuisine.",
    },
  },
  {
    slug: 'winelands',
    title: 'Cape Winelands',
    shortDescription:
      'A journey through Stellenbosch, Franschhoek and Paarl — rolling vineyards, Cape Dutch architecture, world-class tastings and farm-to-table cuisine.',
    tourType: 'day',
    durationLabel: 'Full day',
    status: 'published',
    featured: true,
    sortOrder: 4,
    overview:
      '<p>Escape into a world of rolling vineyards, dramatic mountain amphitheaters, and centuries-old winemaking heritage on a journey through the Cape Winelands. Located just outside Cape Town, this world-renowned region brings together picturesque historic towns, exceptional architecture, award-winning vintages, and a vibrant culinary scene, offering an unforgettable senses-first day in the countryside.</p>',
    itinerary: [
      {
        type: 'stop',
        title: 'Stellenbosch',
        summary:
          '<p>Your journey begins in Stellenbosch, the historic heart of South African wine culture and the second-oldest town in the country. Framed by majestic mountains, its oak-lined streets are adorned with beautifully preserved Cape Dutch, Georgian, and Victorian architecture. Here, you will visit celebrated wine estates where centuries of traditional craftsmanship meet modern viticulture. Guided by top local sommeliers, you will explore the nuance of the local terroir while tasting refined Cabernet Sauvignons, robust Shiraz, and South Africa\'s signature indigenous varietal, Pinotage.</p>',
      },
      {
        type: 'stop',
        title: 'Franschhoek',
        summary:
          '<p>From Stellenbosch, the tour winds through scenic mountain passes toward Franschhoek, widely celebrated as the culinary capital of South Africa. Originally settled by French Huguenots in the late 17th century, this idyllic valley retains a distinct French flair reflected in its boutique vineyards, charming art galleries, and world-class bistros. Whether taking in panoramic valley views from high-altitude tasting decks or riding the famous open-air Franschhoek Wine Tram between historic farms, you will experience an elegant blend of countryside relaxation and refined hospitality.</p>',
      },
      {
        type: 'stop',
        title: 'Paarl',
        summary:
          '<p>The journey also takes you through the lush valley of Paarl, famous for its grand granite outcrops, warm-climate wines, and historic cellars. Known for producing exceptional Chenin Blancs, crisp Chardonnays, and elegant sparkling Méthode Cap Classique (MCC), Paarl offers a diverse contrast in landscapes and tasting styles.</p>',
      },
    ],
    highlights: [
      { highlight: 'Stellenbosch — historic wine capital' },
      { highlight: 'Franschhoek — culinary capital with French heritage' },
      { highlight: 'Franschhoek Wine Tram' },
      { highlight: 'Paarl — granite outcrops and MCC sparkling wines' },
      { highlight: 'Farm-to-table fine dining' },
      { highlight: 'Cape Dutch, Georgian and Victorian architecture' },
    ],
    included: [
      { item: 'Professional tour guide' },
      { item: 'Transport in comfortable vehicle' },
      { item: 'Wine tastings at selected estates' },
    ],
    notIncluded: [
      { item: 'Lunch' },
      { item: 'Additional wine purchases' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [
      {
        title: 'Franschhoek Wine Tram',
        type: 'optional',
        description: '<p>Ride the famous open-air wine tram between historic Franschhoek farms.</p>',
      },
      {
        title: 'Multi-Course Gourmet Lunch',
        type: 'optional',
        description: '<p>Enjoy a multi-course farm-to-table lunch overlooking vine-draped valleys.</p>',
      },
    ],
    seo: {
      title: 'Cape Winelands Tour — Stellenbosch, Franschhoek & Paarl | MiAfrica',
      description:
        'Indulge in the magic of the Cape Winelands. Visit Stellenbosch, Franschhoek and Paarl for world-class wine tastings, Cape Dutch architecture and farm-to-table cuisine.',
    },
  },
  {
    slug: 'goodhope-tour',
    title: 'Goodhope Tour',
    shortDescription:
      'The ultimate Cape Peninsula journey — Atlantic Seaboard, Chapman\'s Peak, Cape of Good Hope, Cape Point, Boulders Beach penguins and Muizenberg.',
    tourType: 'day',
    durationLabel: 'Full day',
    status: 'published',
    featured: true,
    sortOrder: 5,
    overview:
      '<p>Embark on a breathtaking coastal expedition to the legendary southwestern tip of Africa, where two oceans meet amidst dramatic landscapes and rich biodiversity. This full-day journey guides you along some of the most scenic coastal roads in the world, combining rugged mountain passes, pristine beaches, endemic wildlife, and rich maritime heritage.</p>',
    itinerary: [
      {
        type: 'stop',
        title: 'Atlantic Seaboard & Hout Bay',
        summary:
          '<p>Setting off from Cape Town, your journey begins along the magnificent Atlantic Seaboard. Sweeping past trendy coastal suburbs, you will marvel at the majestic Twelve Apostles mountain range rising dramatically above the sparkling ocean. The route leads to the picturesque fishing harbor of Hout Bay, surrounded by soaring peaks and lively ocean waters.</p>',
      },
      {
        type: 'stop',
        title: "Chapman's Peak Drive",
        summary:
          "<p>Ascending onto the world-renowned Chapman's Peak Drive, carved directly into the vertical cliff faces high above the sea, this engineering marvel offers unmatched, panoramic photo opportunities at every winding curve.</p>",
      },
      {
        type: 'stop',
        title: 'Cape of Good Hope & Cape Point',
        summary:
          '<p>Descend through Noordhoek and enter the wild expanse of the Cape of Good Hope section within Table Mountain National Park. Immersed in the unique Cape Floral Kingdom, dominated by Fynbos, keep your eyes open for native wildlife including bontebok, eland, ostriches, mountain zebras, and Chacma baboons. At Cape Point, board the iconic Flying Dutchman Funicular up to the historic upper lighthouse for spectacular views where the Atlantic and False Bay stretch to the horizon. A short drive away lies the famous Cape of Good Hope, the most south-western point of the African continent.</p>',
        activities: [
          { activity: 'Flying Dutchman Funicular ride' },
        ],
      },
      {
        type: 'stop',
        title: "Boulders Beach — African Penguins",
        summary:
          "<p>Leaving the wild tip behind, the tour traces the warm, sheltered shores of False Bay. A highlight awaits at Boulders Beach in historic Simon's Town, where wooden boardwalks allow you to walk alongside a thriving, wild colony of African penguins as they waddle across the white sand and swim in the turquoise waters.</p>",
      },
      {
        type: 'stop',
        title: 'Muizenberg',
        summary:
          '<p>Continuing north along the False Bay coastline, you will pass through the vibrant seaside village of Muizenberg, famous for its colorful beachfront beach huts and laid-back surf culture, before a comfortable drive back into Cape Town.</p>',
      },
    ],
    highlights: [
      { highlight: 'Atlantic Seaboard scenic drive' },
      { highlight: "Chapman's Peak Drive — cliffside engineering marvel" },
      { highlight: 'Cape of Good Hope — southwestern tip of Africa' },
      { highlight: 'Cape Point lighthouse via Flying Dutchman Funicular' },
      { highlight: 'Boulders Beach African penguin colony' },
      { highlight: 'Muizenberg colourful beach huts' },
    ],
    included: [
      { item: 'Professional tour guide' },
      { item: 'Transport in comfortable vehicle' },
      { item: 'Table Mountain National Park entry' },
    ],
    notIncluded: [
      { item: 'Flying Dutchman Funicular ticket' },
      { item: 'Lunch and beverages' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [
      {
        title: 'Flying Dutchman Funicular',
        type: 'optional',
        description: '<p>An environmentally friendly cable railway that glides up to the historic upper lighthouse at Cape Point.</p>',
      },
    ],
    seo: {
      title: 'Cape of Good Hope Tour — Cape Peninsula Full Day | MiAfrica',
      description:
        "Experience the ultimate Cape Peninsula journey: Atlantic Seaboard, Chapman's Peak, Cape of Good Hope, Cape Point, Boulders Beach penguins and Muizenberg.",
    },
  },
  {
    slug: 'safari',
    title: 'Safari',
    shortDescription:
      'From Western Cape day safaris to multi-country expeditions — track the Big Five, explore iconic national parks and discover Southern Africa\'s wild heart.',
    tourType: 'day',
    durationLabel: 'Flexible — day trips to multi-country expeditions',
    status: 'published',
    featured: true,
    sortOrder: 6,
    overview:
      '<p>Whether you have just one day to spare near Cape Town or are looking to embark on a multi-country expedition across Southern Africa, our curated safari experiences bring you face-to-face with the continent\'s iconic wildlife, breathtaking landscapes, and rich biodiversity.</p>',
    itinerary: [
      {
        type: 'section',
        title: 'Western Cape & Cape Town Day Safaris',
        summary:
          '<p>Ideal for short-stay travelers looking to experience wild big game without leaving the Western Cape.</p>',
        activities: [
          { activity: 'Aquila Private Game Reserve — Big Five, 2hr from Cape Town, malaria-free' },
          { activity: 'Inverdoorn Game Reserve — cheetah conservation and wildlife tracking' },
          { activity: 'Gondwana Game Reserve — free-roaming wildlife in fynbos valleys' },
        ],
      },
      {
        type: 'section',
        title: "South Africa's Iconic National Parks",
        summary:
          '<p>Classic overland and fly-in safaris into world-renowned conservation havens.</p>',
        activities: [
          { activity: 'Greater Kruger National Park — flagship predator density, Sabi Sands' },
          { activity: 'Addo Elephant National Park — huge elephant herds, malaria-free' },
        ],
      },
      {
        type: 'section',
        title: 'Zimbabwe & Victoria Falls',
        summary:
          '<p>Experience wild game drives in Hwange National Park before taking in the grandeur of the "Smoke that Thunders" — the world\'s largest sheet of falling water at Victoria Falls.</p>',
      },
      {
        type: 'section',
        title: 'Zambia & The Zambezi',
        summary:
          '<p>Explore the raw, untamed wilderness of South Luangwa and Lower Zambezi, legendary for walking safaris and river excursions alongside hippos and elephants.</p>',
      },
      {
        type: 'section',
        title: "Botswana's Chobe & Okavango Delta",
        summary:
          '<p>Just across the border from Victoria Falls, Chobe National Park is famous for holding Africa\'s largest concentration of elephants, best explored via river safaris along the Chobe Riverfront.</p>',
      },
      {
        type: 'section',
        title: "Namibia's Arid Wilderness",
        summary:
          '<p>Discover Etosha National Park, where lions, rhinos, and giraffes gather around shimmering salt pans, or explore the rugged desert terrain of Damaraland to track desert-adapted wildlife.</p>',
      },
      {
        type: 'section',
        title: 'Safari Styles Tailored to You',
        summary:
          '<p>Every safari is tailored to your preferences. Available styles include:</p>',
        activities: [
          { activity: 'Day trips & short stays — private transfers to Western Cape reserves' },
          { activity: 'Classic 4x4 game drives — open-vehicle morning and evening drives' },
          { activity: 'River & water safaris — pontoon cruises and canoe trips' },
          { activity: 'Multi-country fly-in expeditions — light aircraft between destinations' },
        ],
      },
    ],
    highlights: [
      { highlight: 'Big Five game drives (lion, leopard, elephant, rhino, buffalo)' },
      { highlight: 'Aquila Private Game Reserve — malaria-free, 2hr from Cape Town' },
      { highlight: 'Greater Kruger and Sabi Sands luxury concessions' },
      { highlight: 'Victoria Falls — the Smoke that Thunders' },
      { highlight: 'Chobe River safaris — Africa\'s largest elephant herds' },
      { highlight: 'Etosha salt pans and Namibian desert wildlife' },
      { highlight: 'Walking safaris in South Luangwa, Zambia' },
    ],
    included: [
      { item: 'Professional ranger guides' },
      { item: 'Game drives in open 4x4 vehicles' },
      { item: 'Transport and transfers as per itinerary' },
    ],
    notIncluded: [
      { item: 'International flights' },
      { item: 'Optional multi-country fly-in transfers' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [
      {
        title: 'Multi-Country Fly-In Expedition',
        type: 'upgrade',
        description: '<p>Seamless light aircraft transfers linking Cape Town, Victoria Falls, and regional game reserves.</p>',
      },
      {
        title: 'River Safari Cruise',
        type: 'optional',
        description: '<p>Pontoon cruises and traditional canoe trips along tranquil waterways in Chobe and the Okavango Delta.</p>',
      },
      {
        title: 'Overnight Safari Stay',
        type: 'optional',
        description: '<p>Extend your day safari with an overnight stay at a private game reserve.</p>',
      },
    ],
    seo: {
      title: 'African Safari Tours — Day Trips to Multi-Country Expeditions | MiAfrica',
      description:
        'Experience the magic of an African safari. From Western Cape day trips to Kruger, Victoria Falls, Botswana and Namibia expeditions.',
    },
  },
  {
    slug: 'hiking',
    title: 'Hiking',
    shortDescription:
      'Discover the wild heart of South Africa — Table Mountain, Lion\'s Head, Cape Point trails, the Whale Trail, Kogelberg and Cederberg wilderness.',
    tourType: 'day',
    durationLabel: 'Half-day to multi-day treks',
    status: 'published',
    featured: false,
    sortOrder: 7,
    overview:
      '<p>Cape Town and the Western Cape province offer some of the most extraordinary hiking trails in the world, where soaring coastal peaks meet unique fynbos flora. Whether you are seeking a half-day summit walk high above the Atlantic, a serene woodland stroll, or an immersive multi-day trekking adventure with overnight stays in pristine nature reserves, our curated guided tours deliver seamless logistics and expert local insights.</p>',
    itinerary: [
      {
        type: 'section',
        title: 'Table Mountain National Park',
        summary:
          "<p>Dominating the city skyline, Table Mountain features a wealth of routes tailored to every experience level. Adventurers can ascend via the classic, direct route of Platteklip Gorge or take the dramatic Kasteelspoort trail along the Twelve Apostles wall, which rewards hikers with sweeping ocean views. For a shaded ascent, Skeleton Gorge leads up from Kirstenbosch National Botanical Garden through dense indigenous forest before topping out at the mountain's highest peak, Maclear's Beacon.</p>",
        activities: [
          { activity: 'Platteklip Gorge — classic direct ascent' },
          { activity: 'Kasteelspoort — Twelve Apostles with ocean views' },
          { activity: "Skeleton Gorge — shaded ascent from Kirstenbosch to Maclear's Beacon" },
        ],
      },
      {
        type: 'section',
        title: "Signal Hill & Lion's Head",
        summary:
          '<p>For shorter hikes with maximum visual impact, Signal Hill and its neighboring peak, Lion\'s Head, are unmissable. Signal Hill provides a gentle ridge walk with panoramic vistas over the Cape Town City Bowl and Table Bay, making it a favorite for late-afternoon strolls. Meanwhile, the spiral ascent around Lion\'s Head involves exciting ladders and chains, culminating in a 360-degree view of the Atlantic coastline that is world-famous for sunrise and sunset.</p>',
        activities: [
          { activity: "Signal Hill — gentle ridge walk, city and bay views" },
          { activity: "Lion's Head — spiral ascent with ladders and chains, 360-degree views" },
        ],
      },
      {
        type: 'section',
        title: 'Constantia Nek & Surrounds',
        summary:
          '<p>Positioned between the lush Constantia Valley and Hout Bay, Constantia Nek serves as a central gateway to the southern reaches of the mountain. Gentle jeep tracks and forest paths wind past shade-dappled trees and trickling waterfalls toward the historic mountain reservoirs, including De Villiers Dam. From Constantia Nek, trails connect effortlessly into Cecilia Forest, Kirstenbosch, or higher mountain passes, offering flexible options for relaxed family walks or steady altitude gain.</p>',
        activities: [
          { activity: 'Cecilia Forest paths' },
          { activity: 'De Villiers Dam and mountain reservoirs' },
          { activity: 'Kirstenbosch connects' },
        ],
      },
      {
        type: 'section',
        title: 'Cape Point Overnight Trail',
        summary:
          '<p>Located within the southern sector of Table Mountain National Park, the Cape Point Trail is a spectacular two-day coastal trek. Hikers traverse dramatic ocean cliffs, pristine fynbos, and isolated beaches while spotting Cape mountain zebra and ocean birdlife. Overnights are spent in solar-powered coastal huts perched high above the crashing waves.</p>',
      },
      {
        type: 'section',
        title: 'De Hoop Nature Reserve & The Whale Trail',
        summary:
          '<p>Further east along the Overberg coast, De Hoop Nature Reserve hosts the renowned Whale Trail. Over five days, this famous route leads trekkers across the Potberg mountain range and down to limestone sea cliffs overlooking marine protected waters. Hikers stay each night in comfortable, fully equipped solar-powered huts with sweeping views of the Indian Ocean, where southern right whales can often be spotted close to shore during winter and spring.</p>',
      },
      {
        type: 'section',
        title: 'Kogelberg & Cederberg Wilderness Areas',
        summary:
          '<p>For those seeking true mountain solitude, the UNESCO-protected Kogelberg Nature Reserve offers wild multi-day walks through the kingdom of fynbos along the Palmiet River. Farther inland, the rugged Cederberg Wilderness features multi-day routes past giant sandstone arches, ancient San rock art, and crystal-clear mountain streams, with overnight accommodations ranging from rustic stone huts to open-air wilderness camps under starlit skies.</p>',
      },
    ],
    highlights: [
      { highlight: 'Table Mountain — Platteklip Gorge, Kasteelspoort, Skeleton Gorge' },
      { highlight: "Lion's Head — 360-degree Atlantic views at sunrise or sunset" },
      { highlight: 'Cape Point Overnight Trail — solar-powered coastal huts' },
      { highlight: 'De Hoop Whale Trail — 5-day trek with whale sightings' },
      { highlight: 'Kogelberg UNESCO Biosphere — fynbos kingdom' },
      { highlight: 'Cederberg — San rock art and sandstone arches' },
    ],
    included: [
      { item: 'Professional hiking guide' },
      { item: 'Trail permits and entry fees' },
      { item: 'Safety gear' },
      { item: 'Overnight hut reservations (multi-day trails)' },
    ],
    notIncluded: [
      { item: 'Hiking equipment and boots' },
      { item: 'Personal expenses' },
      { item: 'Travel insurance' },
    ],
    optionalExtras: [],
    seo: {
      title: 'Hiking Tours Cape Town — Table Mountain, Whale Trail & More | MiAfrica',
      description:
        "Discover the wild heart of South Africa. Guided hikes on Table Mountain, Lion's Head, Cape Point, the Whale Trail, Kogelberg and Cederberg.",
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

async function seed() {
  const { getPayload } = await import('payload')
  const payload = await getPayload({ config: configPromise })

  console.log('Deleting existing tours...')

  const existing = await payload.find({
    collection: 'tours',
    limit: 0,
  })

  for (const doc of existing.docs) {
    await payload.delete({
      collection: 'tours',
      id: (doc as any).id,
    })
  }

  console.log(`Deleted ${existing.docs.length} existing tours.`)
  console.log('Seeding tours...')

  for (const tour of tours) {
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

    console.log(`  Creating: ${tour.title}`)
    await payload.create({
      collection: 'tours',
      data: tourData as any,
    })
  }

  console.log('Seeding complete.')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})