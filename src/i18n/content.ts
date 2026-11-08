import { getCollection } from 'astro:content';
import { defaultLocale, type Lang } from './ui';

type LocalizableData = {
  lang?: Lang;
  translationKey?: string;
  routeSlug?: string;
};

export function entryLang(entry: { data: unknown }): Lang {
  const data = entry.data as LocalizableData;
  return data.lang ?? 'id';
}

export function entrySlug(entry: { slug: string; data: unknown }): string {
  const data = entry.data as LocalizableData;
  return data.routeSlug ?? entry.slug;
}

export function entryKey(entry: { slug: string; data: unknown }): string {
  const data = entry.data as LocalizableData;
  return data.translationKey ?? entry.slug;
}

export async function getLocalizedCollection(collection: 'posts' | 'projects', lang: Lang) {
  const entries = await getCollection(collection);
  return entries.filter((entry) => entryLang(entry) === lang);
}

export async function getProjects(lang: Lang) {
  const projects = await getLocalizedCollection('projects', lang);
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export async function getPosts(lang: Lang) {
  const posts = await getLocalizedCollection('posts', lang);
  return posts
    .filter((post) => !post.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export async function getAbout(lang: Lang) {
  const entries = await getCollection('about');
  return (
    entries.find((entry) => entryLang(entry) === lang) ??
    entries.find((entry) => entryLang(entry) === defaultLocale) ??
    entries[0]
  );
}

export async function getSkillEntries() {
  return getCollection('skills');
}

export function localizedSkill(
  skill: { data: { title: string; description: string; title_en?: string; description_en?: string } },
  lang: Lang
) {
  if (lang === 'en') {
    return {
      title: skill.data.title_en ?? skill.data.title,
      description: skill.data.description_en ?? skill.data.description,
    };
  }
  return {
    title: skill.data.title,
    description: skill.data.description,
  };
}

export async function getTranslation(
  collection: 'posts' | 'projects',
  key: string,
  lang: Lang
) {
  const entries = await getCollection(collection);
  return entries.find((entry) => entryKey(entry) === key && entryLang(entry) === lang);
}

export function readingTime(body: string | undefined, lang: Lang): number {
  if (!body) return 1;
  const words = body
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`\-]/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}
