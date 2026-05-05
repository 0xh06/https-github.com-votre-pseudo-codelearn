import { useEffect } from 'react';
import { SITE } from '../data/site';

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
};

export default function Seo({
  title,
  description,
  noIndex
}: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
    document.title = fullTitle;

    const metaDescription = description ?? SITE.description;
    const descTag = document.querySelector('meta[name="description"]');
    if (descTag) descTag.setAttribute('content', metaDescription);

    if (noIndex) {
      const robotsTag = document.querySelector('meta[name="robots"]');
      if (robotsTag) robotsTag.setAttribute('content', 'noindex,nofollow');
    }
  }, [title, description, noIndex]);

  return null;
}
