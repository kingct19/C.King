import { OVERVIEW, SITE, SOCIAL_LINKS, SOZO, STACK } from "@/config/site";

export function JsonLd() {
  const sameAs = SOCIAL_LINKS.filter((link) => !link.href.startsWith("mailto:")).map(
    (link) => link.href
  );

  const knowsAbout = STACK.flatMap((group) => group.items);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}${SITE.avatar}`,
    jobTitle: "Software Engineer",
    email: `mailto:${OVERVIEW.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    worksFor: {
      "@type": "Organization",
      name: SOZO.name,
      url: SOZO.url,
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
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
