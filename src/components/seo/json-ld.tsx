import type { Tour, TourCard } from "@/types/tour";
import { getSiteUrl } from "@/lib/site-url";

export function TravelAgencyJsonLd() {
  const baseUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "MiAfrica",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description:
      "Curated luxury travel experiences and tour operator across South Africa including Garden Route, Safaris, Winelands, and Cape Town.",
    telephone: "+27 74 750 6555",
    email: "info@miafrica.co.za",
    address: {
      "@type": "PostalAddress",
      streetAddress: "14 Safari Drive, Victoria & Alfred Waterfront",
      addressLocality: "Cape Town",
      postalCode: "8001",
      addressCountry: "ZA",
    },
    areaServed: {
      "@type": "Country",
      name: "South Africa",
    },
    priceRange: "$$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TouristTripJsonLd({ tour }: { tour: Tour }) {
  const baseUrl = getSiteUrl();
  const pageUrl = `${baseUrl}/tours/${tour.slug}`;

  const itineraryItems = tour.itinerary.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "TouristAttraction",
      name: item.title,
      description: item.summary ? item.summary.replace(/<[^>]*>/g, "") : undefined,
    },
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.shortDescription,
    url: pageUrl,
    image: tour.heroMedia?.url ? [tour.heroMedia.url] : undefined,
    touristType: ["Adventure", "Luxury", "Cultural"],
    provider: {
      "@type": "TravelAgency",
      name: "MiAfrica",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      url: pageUrl,
      priceCurrency: "ZAR",
      availability: "https://schema.org/InStock",
    },
    ...(itineraryItems.length > 0
      ? {
        itinerary: {
          "@type": "ItemList",
          numberOfItems: itineraryItems.length,
          itemListElement: itineraryItems,
        },
      }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function TourCatalogJsonLd({ tours }: { tours: TourCard[] }) {
  const baseUrl = getSiteUrl();

  const itemList = tours.map((tour, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: `${baseUrl}/tours/${tour.slug}`,
    name: tour.title,
    description: tour.shortDescription,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "MiAfrica Curated South Africa Tours",
    description: "Full list of curated luxury tours across South Africa.",
    numberOfItems: tours.length,
    itemListElement: itemList,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ContactPageJsonLd() {
  const baseUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact MiAfrica Concierge",
    description: "Get in touch with MiAfrica travel specialists in Cape Town.",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "TravelAgency",
      name: "MiAfrica",
      telephone: "+27 74 750 6555",
      email: "info@miafrica.co.za",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
