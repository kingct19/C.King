import { OVERVIEW, SITE, SOCIAL_LINKS, SOZO, STACK } from "@/config/site";

export function JsonLd() {
  const sameAs = SOCIAL_LINKS.filter((link) => !link.href.startsWith("mailto:")).map(
    (link) => link.href
  );

  const businessSameAs = SOCIAL_LINKS.filter(
    (link) => link.name === "GitHub" || link.name === "LinkedIn"
  ).map((link) => link.href);

  const knowsAbout = STACK.flatMap((group) => group.items);

  const personId = `${SITE.url}/#person`;
  const sozoId = `${SITE.url}/#sozo`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: SITE.name,
        url: SITE.url,
        image: `${SITE.url}${SITE.avatar}`,
        jobTitle: "Software Engineer",
        email: `mailto:${OVERVIEW.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kansas City",
          addressRegion: "MO",
          addressCountry: "US",
        },
        worksFor: {
          "@id": sozoId,
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Texas A&M University–Commerce",
          url: "https://www.tamuc.edu",
        },
        hasCredential: [
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: "M.S. Computer Science, AI Concentration",
          },
          {
            "@type": "EducationalOccupationalCredential",
            credentialCategory: "degree",
            name: "B.S. Computer Science, AI Concentration",
          },
        ],
        knowsAbout,
        sameAs,
      },
      {
        "@type": "LocalBusiness",
        "@id": sozoId,
        name: SOZO.name,
        url: SITE.url,
        logo: `${SITE.url}/images/sozo-banner.png`,
        image: `${SITE.url}/images/sozo-banner.png`,
        email: OVERVIEW.email,
        telephone: "+1-903-424-4805",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Kansas City",
          addressRegion: "MO",
          addressCountry: "US",
        },
        areaServed: {
          "@type": "City",
          name: "Kansas City",
          containedInPlace: {
            "@type": "State",
            name: "Missouri",
          },
        },
        sameAs: businessSameAs,
        founder: {
          "@id": personId,
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
