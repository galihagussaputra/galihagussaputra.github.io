import { defaultLocale, type Lang } from './ui';

export function getLangFromUrl(url: URL): Lang {
  const first = url.pathname.split('/').filter(Boolean)[0];
  return first === 'id' ? 'id' : 'en';
}

export function stripLocale(pathname: string): string {
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const stripped = path.replace(/^\/id(?=\/|$)/, '');
  return stripped === '' ? '/' : stripped;
}

export function localizePath(pathname: string, lang: Lang): string {
  const path = stripLocale(pathname);
  if (lang === defaultLocale) return path;
  return path === '/' ? '/id/' : `/id${path}`;
}

export function getAlternatePaths(pathname: string): { en: string; id: string } {
  const path = stripLocale(pathname);
  return {
    en: path,
    id: path === '/' ? '/id/' : `/id${path}`,
  };
}

export function formatDate(date: Date | string, lang: Lang, style: 'short' | 'long' = 'short'): string {
  return new Intl.DateTimeFormat(lang === 'id' ? 'id-ID' : 'en-GB', {
    ...(style === 'long' ? { weekday: 'long' as const } : {}),
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatYear(date: Date | string): string {
  return new Intl.DateTimeFormat('en', { year: 'numeric' }).format(new Date(date));
}
