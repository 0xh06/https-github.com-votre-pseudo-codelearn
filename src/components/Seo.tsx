import { useEffect } from 'react';
import { SITE } from '../data/site';

type SeoProps = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  noIndex?: boolean;
};

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export default function Seo({ title, description, image, url, noIndex }: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.name;
    document.title = fullTitle;

    const metaDescription = description ?? SITE.description;
    setMeta('name', 'description', metaDescription);

    const pageUrl = url ?? (typeof window !== 'undefined' ? window.location.href : SITE.url);
    const ogImage = image ?? SITE.ogImage;
    const absoluteImage = ogImage.startsWith('http') ? ogImage : `${SITE.url.replace(/\/$/, '')}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', metaDescription);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', absoluteImage);
    setMeta('property', 'og:type', 'website');
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', metaDescription);

    if (noIndex) {
      setMeta('name', 'robots', 'noindex,nofollow');
    } else {
      setMeta('name', 'robots', 'index,follow');
    }
  }, [title, description, image, url, noIndex]);

  return null;
}
