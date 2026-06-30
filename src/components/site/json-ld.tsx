import { SITE, SOCIAL_LINKS, SOZO } from "@/config/site";

export function JsonLd() {
  const sameAs = SOCIAL_LINKS.filter((link) => !link.href.startsWith("mailto:")).map(
    (link) => link.href
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE.name,
    url: SITE.url,
    image: `${SITE.url}${SITE.avatar}`,
    jobTitle: "Founder & Agentic Engineer",
    worksFor: {
      "@type": "Organization",
      name: SOZO.name,
      url: SOZO.url,
    },
    sameAs,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
