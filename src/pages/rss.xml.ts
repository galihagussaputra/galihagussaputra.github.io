import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { site } from '../data/site';
import { getPosts, entrySlug } from '../i18n/content';

export async function GET(context: APIContext) {
  const posts = await getPosts('en');

  return rss({
    title: `${site.brand} — Notes`,
    description: 'Essays and notes on web development, performance, and software craft.',
    site: context.site ?? new URL(site.url),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${entrySlug(post)}/`,
    })),
    customData: '<language>en</language>',
  });
}
